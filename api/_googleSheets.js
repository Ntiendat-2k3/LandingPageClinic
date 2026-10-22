import { createSign } from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_URL = "https://sheets.googleapis.com/v4/spreadsheets";
let cachedToken = null;

function encodeJson(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function createAssertion(email, privateKey, now) {
  const header = encodeJson({ alg: "RS256", typ: "JWT" });
  const claim = encodeJson({
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  });
  const unsigned = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = signer.sign(privateKey).toString("base64url");
  return `${unsigned}.${signature}`;
}

async function requestToken(assertion) {
  return fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
  });
}

/** Lấy token; chỉ thử lại khi Google xác nhận JWT lệch thời gian với đồng hồ máy. */
async function getAccessToken() {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value;

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !privateKey) throw new Error("GOOGLE_CREDENTIALS_MISSING");

  let response = await requestToken(createAssertion(email, privateKey, Math.floor(Date.now() / 1000)));
  let token = await response.json();
  if (!response.ok && token.error === "invalid_grant" && /iat|exp|timeframe/i.test(token.error_description || "")) {
    const serverTime = Date.parse(response.headers.get("date") || "");
    const offset = serverTime - Date.now();
    if (Number.isFinite(serverTime) && Math.abs(offset) > 60_000 && Math.abs(offset) < 86_400_000) {
      response = await requestToken(createAssertion(email, privateKey, Math.floor(serverTime / 1000)));
      token = await response.json();
    }
  }
  if (!response.ok) throw new Error(`GOOGLE_AUTH_${response.status}_${token.error || "UNKNOWN"}`);
  if (typeof token.access_token !== "string") throw new Error("GOOGLE_AUTH_FAILED");
  cachedToken = { value: token.access_token, expiresAt: Date.now() + Math.max(0, token.expires_in - 120) * 1000 };
  return cachedToken.value;
}

async function sheetsRequest(spreadsheetId, range, options = {}) {
  const token = await getAccessToken();
  const writeQuery = options.update ? "?valueInputOption=RAW" : options.append ? ":append?valueInputOption=RAW&insertDataOption=INSERT_ROWS" : "";
  const url = `${SHEETS_URL}/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}${writeQuery}`;
  const response = await fetch(url, {
    method: options.update ? "PUT" : options.append ? "POST" : "GET",
    headers: { Authorization: `Bearer ${token}`, ...(options.append || options.update ? { "Content-Type": "application/json" } : {}) },
    ...(options.append || options.update ? { body: JSON.stringify({ majorDimension: "ROWS", values: [options.row] }) } : {}),
  });
  if (!response.ok) {
    const detail = await response.json().catch(() => null);
    throw new Error(`GOOGLE_SHEETS_${response.status}_${detail?.error?.status || "UNKNOWN"}`);
  }
  return response.json();
}

export async function readValues(spreadsheetId, range) {
  if (!spreadsheetId) throw new Error("SHEET_ID_MISSING");
  return sheetsRequest(spreadsheetId, range);
}

export async function updateValues(spreadsheetId, range, row) {
  if (!spreadsheetId) throw new Error("SHEET_ID_MISSING");
  return sheetsRequest(spreadsheetId, range, { update: true, row });
}

/** Đối soát mã gửi trước khi thêm dòng để lần thử lại không tạo bản ghi thứ hai. */
export async function appendLead({ spreadsheetId, range, requestId, row }) {
  if (!spreadsheetId) throw new Error("SHEET_ID_MISSING");
  if (process.env.BOOKING_SHEET_ID && process.env.BOOKING_SHEET_ID === process.env.SCREENING_SHEET_ID) {
    throw new Error("SHEET_IDS_MUST_BE_DISTINCT");
  }
  const sheetName = range.includes("!") ? `${range.split("!")[0]}!` : "";
  const existing = await sheetsRequest(spreadsheetId, `${sheetName}A:A`);
  if (existing.values?.some(([id]) => id === requestId)) return { duplicate: true };
  const header = await sheetsRequest(spreadsheetId, `${sheetName}1:1`);
  if (header.values?.[0]?.length !== row.length) throw new Error("SHEET_SCHEMA_MISMATCH");
  await sheetsRequest(spreadsheetId, range, { append: true, row });
  return { duplicate: false };
}
