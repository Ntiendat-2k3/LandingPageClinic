import assert from "node:assert/strict";
import { generateKeyPairSync, randomUUID } from "node:crypto";
import test from "node:test";

test("xác thực lại theo giờ Google khi đồng hồ máy bị lệch", async () => {
  const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = "test@example.invalid";
  process.env.GOOGLE_PRIVATE_KEY = privateKey.export({ format: "pem", type: "pkcs8" });
  process.env.BOOKING_SHEET_ID = "booking-test";
  process.env.SCREENING_SHEET_ID = "screening-test";

  const serverDate = new Date(Date.now() + 7 * 60 * 60 * 1000).toUTCString();
  const assertions = [];
  const calls = [];
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async (url, options) => {
      calls.push({ url: String(url), method: options.method });
      if (String(url).includes("oauth2")) {
        const assertion = new URLSearchParams(options.body).get("assertion");
        assertions.push(JSON.parse(Buffer.from(assertion.split(".")[1], "base64url")));
        if (assertions.length === 1) {
          return {
            ok: false, status: 400,
            headers: { get: () => serverDate },
            json: async () => ({ error: "invalid_grant", error_description: "Invalid JWT iat and exp timeframe" }),
          };
        }
        return { ok: true, json: async () => ({ access_token: "test-token", expires_in: 3600 }) };
      }
      if (options.method === "GET") return { ok: true, json: async () => ({ values: String(url).includes("1%3A1") ? [Array(8).fill("Tiêu đề")] : [] }) };
      return { ok: true, json: async () => ({ updates: { updatedRows: 1 } }) };
    };

    const { appendLead } = await import("../api/_googleSheets.js?clock-skew-test");
    await appendLead({ spreadsheetId: "booking-test", range: "'Trang tính1'!A:H", requestId: randomUUID(), row: Array(8).fill("test") });
    assert.equal(assertions.length, 2);
    assert.ok(Math.abs(assertions[1].iat - Date.parse(serverDate) / 1000) < 2);
    assert.equal(calls.filter(({ url }) => url.includes("oauth2")).length, 2);
    assert.equal(calls.filter(({ url, method }) => url.includes("sheets.googleapis.com") && method === "POST").length, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
