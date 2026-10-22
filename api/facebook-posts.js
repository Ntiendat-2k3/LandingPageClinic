/** Lấy bài mới của fanpage ở phía server để không lộ Page Access Token ra trình duyệt. */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
  }

  const pageId = process.env.FACEBOOK_PAGE_ID;
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!/^\d+$/.test(pageId || "") || !token) {
    return res.status(503).json({ error: "FACEBOOK_NOT_CONFIGURED" });
  }

  const url = new URL(`https://graph.facebook.com/v26.0/${pageId}/posts`);
  url.searchParams.set("fields", "message,permalink_url,full_picture,created_time");
  url.searchParams.set("limit", "3");

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`GRAPH_${response.status}`);
    const result = await response.json();
    if (!Array.isArray(result.data)) throw new Error("INVALID_FACEBOOK_RESPONSE");

    const posts = result.data.flatMap((post) => {
      if (!post || typeof post.id !== "string" || typeof post.permalink_url !== "string") return [];
      let permalink;
      try {
        permalink = new URL(post.permalink_url);
      } catch {
        return [];
      }
      if (permalink.protocol !== "https:" || !/(^|\.)facebook\.com$/.test(permalink.hostname)) return [];

      return [{
        id: String(post.id),
        message: typeof post.message === "string" ? post.message : "",
        permalink: permalink.href,
        image: typeof post.full_picture === "string" && post.full_picture.startsWith("https://")
          ? post.full_picture : null,
        createdTime: typeof post.created_time === "string" && Number.isFinite(Date.parse(post.created_time))
          ? post.created_time : null,
      }];
    });

    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json({ posts });
  } catch (error) {
    console.error("Không thể lấy bài viết Facebook:", error instanceof Error ? error.message : "UNKNOWN_ERROR");
    return res.status(503).json({ error: "FACEBOOK_UNAVAILABLE" });
  }
}
