import { createSign } from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_URL = "https://sheets.googleapis.com/v4/spreadsheets";
let cachedToken = null;

function encodeJson(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

/** Lấy access token bằng service account; khóa riêng chỉ được đọc trong Function. */
async function getAccessToken() {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value;

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !privateKey) throw new Error("GOOGLE_CREDENTIALS_MISSING");

  const now = Math.floor(Date.now() / 1000);
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
  const assertion = `${unsigned}.${signature}`;
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
  });
  if (!response.ok) throw new Error("GOOGLE_AUTH_FAILED");
  const token = await response.json();
  if (typeof token.access_token !== "string") throw new Error("GOOGLE_AUTH_FAILED");
  cachedToken = { value: token.access_token, expiresAt: Date.now() + Math.max(0, token.expires_in - 120) * 1000 };
  return cachedToken.value;
}

async function sheetsRequest(spreadsheetId, range, options = {}) {
  const token = await getAccessToken();
  const url = `${SHEETS_URL}/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}${options.append ? ":append?valueInputOption=RAW&insertDataOption=INSERT_ROWS" : ""}`;
  const response = await fetch(url, {
    method: options.append ? "POST" : "GET",
    headers: { Authorization: `Bearer ${token}`, ...(options.append ? { "Content-Type": "application/json" } : {}) },
    ...(options.append ? { body: JSON.stringify({ majorDimension: "ROWS", values: [options.row] }) } : {}),
  });
  if (!response.ok) throw new Error("GOOGLE_SHEETS_FAILED");
  return response.json();
}

/** Đối soát mã gửi trước khi thêm dòng để lần thử lại không tạo bản ghi thứ hai. */
export async function appendLead({ spreadsheetId, range, requestId, row }) {
  if (!spreadsheetId) throw new Error("SHEET_ID_MISSING");
  const sheetName = range.includes("!") ? `${range.split("!")[0]}!` : "";
  const existing = await sheetsRequest(spreadsheetId, `${sheetName}A:A`);
  if (existing.values?.some(([id]) => id === requestId)) return { duplicate: true };
  await sheetsRequest(spreadsheetId, range, { append: true, row });
  return { duplicate: false };
}
