import { classify } from "../public/danh-gia-nguy-co-can-thi/classify.mjs";
import { appendLead } from "./_googleSheets.js";
import { parseRequest, respondError, timestampVN } from "./_response.js";
import { validateScreening } from "./_validation.js";

const FIELDS = ["age", "sex", "onset", "degree", "progression", "parents", "outdoor", "near", "concern"];

/** Gửi thông báo sau khi Sheet đã ghi; lỗi email không thay đổi kết quả lưu khảo sát. */
async function notifyScreening(submittedAt) {
  const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_SCREENING_TEMPLATE_ID;
  const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) return null;

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          notification_subject: "Có khảo sát nguy cơ cận thị mới",
          submitted_at: submittedAt,
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
    const screening = validateScreening(body);
    if (!screening) return res.status(400).json({ error: "INVALID_SCREENING" });

    const risk = classify(Object.fromEntries(FIELDS.map((field) => [field, screening.answers[field].value])));
    const submittedAt = timestampVN();
    const spreadsheetId = process.env.SCREENING_SHEET_ID;
    const row = [screening.requestId, submittedAt, "screening-page",
      ...FIELDS.map((field) => screening.answers[field].label), risk, "yes"];
    const { duplicate } = await appendLead({
      spreadsheetId,
      range: "'Trang tính1'!A:N",
      requestId: screening.requestId,
      row,
    });
    const notificationSent = duplicate ? null : await notifyScreening(submittedAt);
    return res.status(200).json({ saved: true, risk, notificationSent });
  } catch (error) {
    return respondError(res, error);
  }
}
