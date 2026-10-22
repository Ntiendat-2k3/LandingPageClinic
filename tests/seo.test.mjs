import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const readOutput = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), "utf8");
const { methodGuides } = JSON.parse(await readFile(new URL("../src/locales/vi.json", import.meta.url), "utf8"));

test("trang chủ có nội dung và cấu trúc SEO trong HTML ban đầu", async () => {
  const html = await readOutput("index.html");
  assert.match(html, /<html lang="vi">/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /id="faq"/);
  assert.match(html, /id="booking"/);
  assert.match(html, /href="\/danh-gia-nguy-co-can-thi\/"/);
  assert.match(html, /<title>Dr Trần Tuấn - Trung tâm kiểm soát cận thị trẻ em tại Hà Nội<\/title>/);
  assert.match(html, /<meta name="description" content="Khám và kiểm soát cận thị trẻ em tại Hà Nội cùng Dr Trần Tuấn\./);
  assert.match(html, /<link rel="icon" type="image\/png" href="\/images\/logo\.png"/);
  assert.match(html, /<link rel="preload" as="image" href="\/images\/clinic-sign\.webp"/);
  assert.match(html, /src="\/images\/clinic-sign\.webp"/);

  const json = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1];
  assert.ok(json);
  const graph = JSON.parse(json)["@graph"];
  assert.equal(graph[0]["@type"], "MedicalClinic");
  assert.equal(graph.length, 1);
  for (const guide of methodGuides.pages) assert.match(html, new RegExp(`href="${guide.path}"`));
  assert.match(html, /Xem báo cáo nghiên cứu của International Myopia Institute/);
});

test("các phương pháp có trang HTML riêng, nội dung tham khảo và liên kết nội bộ", async () => {
  for (const guide of methodGuides.pages) {
    const html = await readOutput(`${guide.path.slice(1)}index.html`);
    assert.match(html, /<html lang="vi">/);
    assert.ok(html.includes(`<title>${guide.title}</title>`));
    assert.ok(html.includes(`<h1 class="`) && html.includes(`>${guide.heading}</h1>`));
    assert.ok(html.includes(guide.description));
    assert.ok(html.includes(guide.image));
    assert.match(html, /International Myopia Institute/);
    assert.match(html, /href="\/#booking"/);
    assert.doesNotMatch(html, /<meta name="robots" content="noindex/);
    for (const other of methodGuides.pages) {
      if (other.path !== guide.path) assert.ok(html.includes(`href="${other.path}"`));
    }
  }
});

test("robots và sitemap thống nhất với các trang có thể index", async () => {
  const robots = await readOutput("robots.txt");
  assert.match(robots, /User-agent: \*\s+Allow: \//);
  const siteUrl = robots.match(/^Sitemap: (https:\/\/[^\s]+)\/sitemap\.xml$/m)?.[1];
  if (!siteUrl) {
    await assert.rejects(readOutput("sitemap.xml"), { code: "ENOENT" });
    return;
  }
  const sitemap = await readOutput("sitemap.xml");
  for (const path of ["/", ...methodGuides.pages.map((guide) => guide.path), "/danh-gia-nguy-co-can-thi/", "/danh-gia-nguy-co-can-thi/privacy.html"]) {
    assert.ok(sitemap.includes(`<loc>${siteUrl}${path}</loc>`), path);
  }
  assert.doesNotMatch(sitemap, /form-thong-tin|cam-on/);
  for (const path of [
    "index.html",
    ...methodGuides.pages.map((guide) => `${guide.path.slice(1)}index.html`),
    "danh-gia-nguy-co-can-thi/index.html",
    "danh-gia-nguy-co-can-thi/privacy.html",
  ]) {
    const html = await readOutput(path);
    const urlPath = path === "index.html" ? "/" : `/${path.replace(/index\.html$/, "")}`;
    assert.ok(html.includes(`<link rel="canonical" href="${siteUrl}${urlPath}" />`), path);
    assert.ok(html.includes(`<meta property="og:image" content="${siteUrl}/images/clinic-sign.webp" />`));
  }
});

test("trang cảm ơn không phát nội dung trang chủ và không được index", async () => {
  const html = await readOutput("_confirmation.html");
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(html, /<div id="root"><\/div>/);
  assert.doesNotMatch(html, /id="faq"/);
});

test("trang khảo sát, liên hệ và chính sách có metadata riêng", async () => {
  for (const path of ["danh-gia-nguy-co-can-thi/index.html", "danh-gia-nguy-co-can-thi/form-thong-tin/index.html", "danh-gia-nguy-co-can-thi/privacy.html"]) {
    const html = await readOutput(path);
    assert.match(html, /<html lang="vi">/);
    assert.match(html, /<title>[^<]+<\/title>/);
    assert.match(html, /<meta name="description"/);
    assert.match(html, /<link rel="icon" type="image\/png" href="\/images\/logo\.png"/);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  }
  const contact = await readOutput("danh-gia-nguy-co-can-thi/form-thong-tin/index.html");
  assert.match(contact, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(contact, /id="contactForm"/);
});

test("Google tag có đúng một lần trên mỗi trang HTML", async () => {
  for (const path of [
    "index.html",
    "_confirmation.html",
    ...methodGuides.pages.map((guide) => `${guide.path.slice(1)}index.html`),
    "danh-gia-nguy-co-can-thi/index.html",
    "danh-gia-nguy-co-can-thi/form-thong-tin/index.html",
    "danh-gia-nguy-co-can-thi/privacy.html",
  ]) {
    const html = await readOutput(path);
    assert.equal((html.match(/gtag\/js\?id=AW-649593202/g) ?? []).length, 1, path);
    assert.equal((html.match(/gtag\("config", "AW-649593202"\)/g) ?? []).length, 1, path);
  }
});
