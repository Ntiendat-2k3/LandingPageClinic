import { classify } from "../public/danh-gia-nguy-co-can-thi/classify.mjs";
import { appendLead } from "./_googleSheets.js";
import { parseRequest, respondError, timestampVN } from "./_response.js";
import { validateScreening } from "./_validation.js";

const FIELDS = ["age", "sex", "onset", "degree", "progression", "parents", "outdoor", "near", "concern"];

/** Tính lại kết quả trên máy chủ và chỉ xác nhận sau khi lưu đủ câu trả lời. */
export default async function handler(req, res) {
  try {
    const body = parseRequest(req, res);
    if (!body) return;
    const screening = validateScreening(body);
    if (!screening) return res.status(400).json({ error: "INVALID_SCREENING" });

    const risk = classify(Object.fromEntries(FIELDS.map((field) => [field, screening.answers[field].value])));
    const row = [screening.requestId, timestampVN(), "screening-page",
      ...FIELDS.map((field) => screening.answers[field].label), risk, "yes"];
    await appendLead({
      spreadsheetId: process.env.SCREENING_SHEET_ID,
      range: "'Trang tính1'!A:N",
      requestId: screening.requestId,
      row,
    });
    return res.status(200).json({ saved: true, risk });
  } catch (error) {
    return respondError(res, error);
  }
}
