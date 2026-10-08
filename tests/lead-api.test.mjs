import assert from "node:assert/strict";
import { generateKeyPairSync, randomUUID } from "node:crypto";
import test from "node:test";

import bookingHandler from "../api/booking.js";
import screeningHandler from "../api/screening.js";
import { validateBooking } from "../api/_validation.js";

const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = "test@example.invalid";
process.env.GOOGLE_PRIVATE_KEY = privateKey.export({ format: "pem", type: "pkcs8" });
process.env.BOOKING_SHEET_ID = "booking-test";
process.env.SCREENING_SHEET_ID = "screening-test";

function response() {
  return {
    statusCode: 200,
    headers: {},
    setHeader(name, value) { this.headers[name] = value; return this; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

function request(body) {
  return { method: "POST", headers: { origin: "https://clinic.test", host: "clinic.test", "content-type": "application/json" }, body };
}

const tomorrow = (() => {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date()).map(({ type, value }) => [type, value]));
  const date = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day) + 1));
  return date.toISOString().slice(0, 10);
})();

const booking = () => ({ requestId: randomUUID(), name: "Nguyễn Văn A", phone: "0387 812 321", date: tomorrow, time: "08:00 - 09:00", message: "Tư vấn" });
const screening = () => ({
  requestId: randomUUID(), consent: true,
  answers: {
    age: { value: "2", label: "Dưới 6 tuổi" }, sex: { value: "0", label: "Nam" },
    onset: { value: "3", label: "Dưới 9 tuổi" }, degree: { value: "2", label: "Từ -6,00D trở lên" },
    progression: { value: "3", label: "Tăng từ 0,75D/năm trở lên" },
    parents: { value: "2", label: "Có cả hai người" }, outdoor: { value: "2", label: "Dưới 1 giờ" },
    near: { value: "2", label: "Từ 3 giờ trở lên" }, concern: { value: "Tăng độ cận nhanh", label: "Bé tăng độ cận nhanh" },
  },
});

test("ngày đặt lịch theo múi giờ Việt Nam được kiểm tra đúng", () => {
  assert.equal(validateBooking(booking())?.date, tomorrow);
  assert.equal(validateBooking({ ...booking(), date: "2026-02-30" }), null);
});

test("đặt lịch chỉ xác nhận sau khi Sheets ghi thành công và dùng RAW", async () => {
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url: String(url), options });
    if (String(url).includes("oauth2")) return { ok: true, json: async () => ({ access_token: "test-token", expires_in: 3600 }) };
    if (options.method === "GET") return { ok: true, json: async () => ({ values: [] }) };
    return { ok: true, json: async () => ({ updates: { updatedRows: 1 } }) };
  };
  const res = response();
  await bookingHandler(request(booking()), res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.saved, true);
  const append = calls.find(({ options }) => options.method === "POST" && options.headers.Authorization);
  assert.match(append.url, /booking-test/);
  assert.match(append.url, /valueInputOption=RAW/);
  assert.equal(JSON.parse(append.options.body).values[0][4], "0387812321");
});

test("khảo sát tính lại mức nguy cơ và ghi đúng Sheet", async () => {
  let written;
  globalThis.fetch = async (url, options) => {
    if (options.method === "GET") return { ok: true, json: async () => ({ values: [] }) };
    written = { url: String(url), body: JSON.parse(options.body) };
    return { ok: true, json: async () => ({ updates: { updatedRows: 1 } }) };
  };
  const res = response();
  await screeningHandler(request(screening()), res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.risk, "high");
  assert.match(written.url, /screening-test/);
  assert.equal(written.body.values[0].length, 14);
  assert.equal(written.body.values[0][12], "high");
});

test("dữ liệu thiếu đồng ý hoặc lỗi Sheets không được báo thành công", async () => {
  const invalid = response();
  await screeningHandler(request({ ...screening(), consent: false }), invalid);
  assert.equal(invalid.statusCode, 400);
  globalThis.fetch = async () => ({ ok: false, json: async () => ({}) });
  const failed = response();
  await bookingHandler(request(booking()), failed);
  assert.equal(failed.statusCode, 503);
});

test("gửi lại cùng mã không thêm hàng thứ hai", async () => {
  const payload = booking();
  let appendCount = 0;
  globalThis.fetch = async (_url, options) => {
    if (options.method === "GET") return { ok: true, json: async () => ({ values: [[payload.requestId]] }) };
    appendCount += 1;
    return { ok: true, json: async () => ({}) };
  };
  const res = response();
  await bookingHandler(request(payload), res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.saved, true);
  assert.equal(appendCount, 0);
});

test("không chấp nhận Origin khác và dữ liệu quá lớn", async () => {
  const foreign = request(booking());
  foreign.headers.origin = "https://foreign.test";
  const foreignRes = response();
  await bookingHandler(foreign, foreignRes);
  assert.equal(foreignRes.statusCode, 403);

  const large = request(booking());
  large.headers["content-length"] = "20000";
  const largeRes = response();
  await bookingHandler(large, largeRes);
  assert.equal(largeRes.statusCode, 413);
});
