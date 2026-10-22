import { classify } from "../public/danh-gia-nguy-co-can-thi/classify.mjs";
import { appendLead, readValues, updateValues } from "./_googleSheets.js";
import { parseRequest, respondError, timestampVN } from "./_response.js";
import { validateScreening, validateScreeningContact } from "./_validation.js";

const FIELDS = ["age", "sex", "onset", "degree", "progression", "parents", "outdoor", "near", "concern"];
const SHEET_NAME = "'Trang tính1'!";
const SCREENING_HEADERS = [
  "Mã lượt gửi", "Thời điểm (VN)", "Nguồn", "Tuổi", "Giới tính", "Tuổi phát hiện cận",
  "Độ cận gần nhất", "Tăng độ 12 tháng", "Cận thị ở bố/mẹ", "Thời gian ngoài trời",
  "Thời gian nhìn gần", "Nhu cầu tư vấn", "Mức nguy cơ", "Đồng ý chính sách",
];
const CONTACT_HEADERS = ["Họ tên phụ huynh", "Số điện thoại liên hệ", "Đồng ý liên hệ lúc (VN)"];

/** Chỉ thêm cột liên hệ khi Sheet còn đúng cấu trúc khảo sát cũ và các cột mới đang trống. */
async function ensureContactColumns(spreadsheetId) {
  if (!spreadsheetId) throw new Error("SHEET_ID_MISSING");
  if (spreadsheetId === process.env.BOOKING_SHEET_ID) throw new Error("SHEET_IDS_MUST_BE_DISTINCT");
  const header = (await readValues(spreadsheetId, `${SHEET_NAME}1:1`)).values?.[0] || [];
  if (!SCREENING_HEADERS.every((label, index) => header[index] === label)) throw new Error("SHEET_SCHEMA_MISMATCH");
  if (header.length === 17 && CONTACT_HEADERS.every((label, index) => header[14 + index] === label)) return;
  if (header.length !== 14) throw new Error("SHEET_SCHEMA_MISMATCH");
  const extra = (await readValues(spreadsheetId, `${SHEET_NAME}O:Q`)).values || [];
  if (extra.some((row) => row.some((cell) => cell !== ""))) throw new Error("SHEET_SCHEMA_MISMATCH");
  await updateValues(spreadsheetId, `${SHEET_NAME}O1:Q1`, CONTACT_HEADERS);
}

/** Gắn liên hệ vào đúng lượt khảo sát; lần gửi lại cùng dữ liệu không ghi đè hoặc gửi email lặp. */
async function saveScreeningContact(spreadsheetId, contact, submittedAt) {
  await ensureContactColumns(spreadsheetId);
  const ids = (await readValues(spreadsheetId, `${SHEET_NAME}A:A`)).values || [];
  const rowIndex = ids.findIndex(([id]) => id === contact.requestId);
  if (rowIndex < 1) return { notFound: true };
  const rowNumber = rowIndex + 1;
  const range = `${SHEET_NAME}O${rowNumber}:Q${rowNumber}`;
  const existing = (await readValues(spreadsheetId, range)).values?.[0] || [];
  if (existing.some(Boolean)) {
    return existing[0] === contact.name && existing[1] === contact.phone && Boolean(existing[2])
      ? { duplicate: true } : { conflict: true };
  }
  await updateValues(spreadsheetId, range, [contact.name, contact.phone, submittedAt]);
  return { duplicate: false };
}

/** Gửi thông báo sau khi Sheet đã ghi; lỗi email không thay đổi kết quả lưu khảo sát. */
async function notifyScreening(submittedAt, contact) {
  const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_SCREENING_TEMPLATE_ID;
  const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  if (!serviceId || !templateId || !publicKey) return null;
  if (templateId === process.env.VITE_EMAILJS_TEMPLATE_ID) {
    console.error("EMAILJS_TEMPLATES_MUST_BE_DISTINCT");
    return false;
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        ...(privateKey ? { accessToken: privateKey } : {}),
        template_params: {
          notification_subject: "Có khảo sát nguy cơ cận thị mới",
          submitted_at: submittedAt,
          parent_name: contact.name,
          parent_phone: contact.phone,
        },
      }),
    });
    if (!response.ok) {
      const detail = (await response.text()).replace(/\s+/g, " ").slice(0, 200);
      throw new Error(`EMAILJS_${response.status}${detail ? `: ${detail}` : ""}`);
    }
    return true;
  } catch (error) {
    const reason = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    const cause = error instanceof Error && error.cause instanceof Error ? error.cause.message : null;
    console.error("Không thể gửi thông báo khảo sát:", cause ? `${reason} (${cause})` : reason);
    return false;
  }
}

/** Tính lại kết quả trên máy chủ và chỉ xác nhận sau khi lưu đủ câu trả lời. */
export default async function handler(req, res) {
  try {
    const body = parseRequest(req, res);
    if (!body) return;
    const spreadsheetId = process.env.SCREENING_SHEET_ID;
    if (body.step === "contact") {
      const contact = validateScreeningContact(body);
      if (!contact) return res.status(400).json({ error: "INVALID_SCREENING_CONTACT" });
      const submittedAt = timestampVN();
      const saved = await saveScreeningContact(spreadsheetId, contact, submittedAt);
      if (saved.notFound) return res.status(404).json({ error: "SCREENING_NOT_FOUND" });
      if (saved.conflict) return res.status(409).json({ error: "SCREENING_CONTACT_ALREADY_SAVED" });
      const notificationSent = saved.duplicate ? null : await notifyScreening(submittedAt, contact);
      return res.status(200).json({ saved: true, notificationSent });
    }
    if (body.step !== undefined) return res.status(400).json({ error: "INVALID_SCREENING_STEP" });
    const screening = validateScreening(body);
    if (!screening) return res.status(400).json({ error: "INVALID_SCREENING" });

    const risk = classify(Object.fromEntries(FIELDS.map((field) => [field, screening.answers[field].value])));
    const submittedAt = timestampVN();
    await ensureContactColumns(spreadsheetId);
    const row = [screening.requestId, submittedAt, "screening-page",
      ...FIELDS.map((field) => screening.answers[field].label), risk, "yes", "", "", ""];
    await appendLead({
      spreadsheetId,
      range: `${SHEET_NAME}A:Q`,
      requestId: screening.requestId,
      row,
    });
    return res.status(200).json({ saved: true, risk });
  } catch (error) {
    return respondError(res, error);
  }
}
