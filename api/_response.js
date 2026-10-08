/** Chỉ nhận JSON nhỏ từ cùng website để tránh ghi dữ liệu tùy ý vào Sheet. */
export function parseRequest(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
    return null;
  }
  const origin = req.headers.origin;
  const host = req.headers.host;
  let originHost;
  try { originHost = origin ? new URL(origin).host : host; }
  catch { originHost = null; }
  if (originHost !== host) {
    res.status(403).json({ error: "ORIGIN_NOT_ALLOWED" });
    return null;
  }
  if (!req.headers["content-type"]?.startsWith("application/json")) {
    res.status(415).json({ error: "INVALID_CONTENT_TYPE" });
    return null;
  }
  if (Number(req.headers["content-length"] || 0) > 16_384) {
    res.status(413).json({ error: "BODY_TOO_LARGE" });
    return null;
  }
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  if (!body || typeof body !== "object" || Array.isArray(body) || JSON.stringify(body).length > 16_384) {
    res.status(400).json({ error: "INVALID_BODY" });
    return null;
  }
  return body;
}

export function respondError(res, error) {
  if (error instanceof SyntaxError) return res.status(400).json({ error: "INVALID_JSON" });
  console.error("Không thể ghi Google Sheets:", error instanceof Error ? error.message : "UNKNOWN_ERROR");
  return res.status(503).json({ error: "SHEET_UNAVAILABLE" });
}

export function timestampVN() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).format(new Date());
}
