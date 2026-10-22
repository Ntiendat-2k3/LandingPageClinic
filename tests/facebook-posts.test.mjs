import assert from "node:assert/strict";
import test from "node:test";

import facebookPostsHandler from "../api/facebook-posts.js";

function response() {
  return {
    statusCode: 200,
    headers: {},
    setHeader(name, value) { this.headers[name] = value; return this; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

test("API bài viết yêu cầu Page token và không tiết lộ token cho trình duyệt", async () => {
  const originalId = process.env.FACEBOOK_PAGE_ID;
  const originalToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const originalFetch = globalThis.fetch;
  try {
    delete process.env.FACEBOOK_PAGE_ID;
    delete process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    const unavailable = response();
    await facebookPostsHandler({ method: "GET" }, unavailable);
    assert.equal(unavailable.statusCode, 503);

    process.env.FACEBOOK_PAGE_ID = "123456";
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN = "private-page-token";
    let graphRequest;
    globalThis.fetch = async (url, options) => {
      graphRequest = { url: String(url), options };
      return { ok: true, json: async () => ({ data: [
        { id: "123456_2", message: "Bài mới", permalink_url: "https://www.facebook.com/pkmatdrtrantuan/posts/2", created_time: "2026-10-15T08:00:00+0000" },
        { id: "123456_1", message: "Bài cũ", permalink_url: "https://malicious.example/post/1" },
      ] }) };
    };
    const res = response();
    await facebookPostsHandler({ method: "GET" }, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.body.posts.length, 1);
    assert.equal(res.body.posts[0].message, "Bài mới");
    assert.match(graphRequest.url, /\/123456\/posts\?/);
    assert.doesNotMatch(graphRequest.url, /private-page-token/);
    assert.equal(graphRequest.options.headers.Authorization, "Bearer private-page-token");
    assert.doesNotMatch(JSON.stringify(res.body), /private-page-token/);
    assert.match(res.headers["Cache-Control"], /s-maxage=300/);
  } finally {
    if (originalId === undefined) delete process.env.FACEBOOK_PAGE_ID;
    else process.env.FACEBOOK_PAGE_ID = originalId;
    if (originalToken === undefined) delete process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    else process.env.FACEBOOK_PAGE_ACCESS_TOKEN = originalToken;
    globalThis.fetch = originalFetch;
  }
});
