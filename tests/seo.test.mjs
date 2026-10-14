import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const readOutput = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), "utf8");

test("trang chủ có nội dung và cấu trúc SEO trong HTML ban đầu", async () => {
  const html = await readOutput("index.html");
  assert.match(html, /<html lang="vi">/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /id="faq"/);
  assert.match(html, /id="booking"/);
  assert.match(html, /href="\/danh-gia-nguy-co-can-thi\/"/);
  assert.match(html, /<meta name="description"/);

  const json = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1];
  assert.ok(json);
  const graph = JSON.parse(json)["@graph"];
  assert.equal(graph[0]["@type"], "MedicalClinic");
  assert.equal(graph[1]["@type"], "FAQPage");
  assert.equal(graph[1].mainEntity.length, 4);
});

test("trang cảm ơn không phát nội dung trang chủ và không được index", async () => {
  const html = await readOutput("_confirmation.html");
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(html, /<div id="root"><\/div>/);
  assert.doesNotMatch(html, /id="faq"/);
});

test("trang khảo sát và chính sách có metadata riêng", async () => {
  for (const path of ["danh-gia-nguy-co-can-thi/index.html", "danh-gia-nguy-co-can-thi/privacy.html"]) {
    const html = await readOutput(path);
    assert.match(html, /<html lang="vi">/);
    assert.match(html, /<title>[^<]+<\/title>/);
    assert.match(html, /<meta name="description"/);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  }
});
