import { appendLead } from "./_googleSheets.js";
import { parseRequest, respondError, timestampVN } from "./_response.js";
import { validateBooking } from "./_validation.js";

/** Xác nhận đặt lịch chỉ sau khi Google Sheets ghi thành công. */
export default async function handler(req, res) {
  try {
    const body = parseRequest(req, res);
    if (!body) return;
    const booking = validateBooking(body);
    if (!booking) return res.status(400).json({ error: "INVALID_BOOKING" });

    const row = [booking.requestId, timestampVN(), "landing-page", booking.name,
      booking.phone, booking.date, booking.time, booking.message];
    await appendLead({
      spreadsheetId: process.env.BOOKING_SHEET_ID,
      range: "'Trang tính1'!A:H",
      requestId: booking.requestId,
      row,
    });
    return res.status(200).json({ saved: true, requestId: booking.requestId });
  } catch (error) {
    return respondError(res, error);
  }
}
