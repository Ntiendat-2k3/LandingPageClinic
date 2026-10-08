export const TIME_SLOTS = new Set([
  "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "14:00 - 15:00",
  "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00", "18:00 - 19:00",
]);

export const SCREENING_VALUES = {
  age: ["0", "1", "2"],
  sex: ["0", "1"],
  onset: ["0", "1", "3"],
  degree: ["0", "1", "2"],
  progression: ["0", "1", "2", "3"],
  parents: ["0", "1", "2"],
  outdoor: ["0", "1", "2"],
  near: ["0", "1", "2"],
  concern: ["Tăng độ cận nhanh", "Đánh giá nguy cơ", "Kiểm soát cận thị", "Vấn đề khác"],
};

export function isRequestId(value) {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export function normalizePhone(value) {
  if (typeof value !== "string") return null;
  const phone = value.replace(/[\s.()-]/g, "");
  const normalized = phone.startsWith("+84") ? `0${phone.slice(3)}` : phone;
  return /^0(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])\d{7}$/.test(normalized) ? normalized : null;
}

export function validateBooking(body) {
  if (!body || !isRequestId(body.requestId) || typeof body.name !== "string" || typeof body.message !== "string") return null;
  const name = body.name.trim();
  const phone = normalizePhone(body.phone);
  if (name.length < 2 || name.length > 50 || !/^[\p{L}\s]+$/u.test(name) || /\s{2,}/.test(name) || !phone || body.message.length > 500) return null;
  if (typeof body.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(body.date) || !TIME_SLOTS.has(body.time)) return null;
  const [year, month, day] = body.date.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date()).map(({ type, value }) => [type, value]));
  const today = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day)));
  const latest = new Date(today);
  latest.setUTCMonth(latest.getUTCMonth() + 6);
  if (date < today || date > latest) return null;
  return { requestId: body.requestId, name, phone, date: body.date, time: body.time, message: body.message.trim() };
}

export function validateScreening(body) {
  if (!body || !isRequestId(body.requestId) || body.consent !== true || typeof body.answers !== "object" || body.answers === null) return null;
  const answers = {};
  for (const [field, allowed] of Object.entries(SCREENING_VALUES)) {
    const answer = body.answers[field];
    if (!answer || typeof answer.label !== "string" || answer.label.length < 1 || answer.label.length > 180 || !allowed.includes(answer.value)) return null;
    answers[field] = { label: answer.label.trim(), value: answer.value };
  }
  return { requestId: body.requestId, answers };
}
