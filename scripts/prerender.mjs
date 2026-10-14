import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer, loadEnv } from "vite";

const outputPath = resolve("dist/index.html");
const html = await readFile(outputPath, "utf8");
const { seo: { clinicName } } = JSON.parse(await readFile(resolve("src/locales/vi.json"), "utf8"));
const siteUrl = (process.env.SITE_URL || loadEnv("production", process.cwd(), "SITE_URL").SITE_URL)?.replace(/\/+$/, "");
if (siteUrl) {
  const parsed = new URL(siteUrl);
  if (parsed.protocol !== "https:" || parsed.pathname !== "/" || parsed.search || parsed.hash) {
    throw new Error("SITE_URL phải là origin HTTPS của tên miền chính, không có đường dẫn.");
  }
}

const escapeHtml = (value) => value.replace(/[&"<>]/g, (char) => ({
  "&": "&amp;", '"': "&quot;", "<": "&lt;", ">": "&gt;",
})[char]);

const addMetadata = (page, path, imagePath) => {
  const title = page.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = page.match(/<meta name="description" content="([^"]+)"\s*\/>/)?.[1];
  if (!title || !description) throw new Error(`Thiếu title hoặc description: ${path}`);

  const tags = [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="vi_VN" />`,
    `<meta property="og:site_name" content="${escapeHtml(clinicName)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  ];

  if (siteUrl) {
    const url = `${siteUrl}${path}`;
    tags.push(`<link rel="canonical" href="${escapeHtml(url)}" />`);
    tags.push(`<meta property="og:url" content="${escapeHtml(url)}" />`);
    tags.push(`<meta property="og:image" content="${escapeHtml(siteUrl + imagePath)}" />`);
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  }

  return page.replace("</head>", `  ${tags.join("\n  ")}\n  </head>`);
};

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  optimizeDeps: { noDiscovery: true, include: [] },
  resolve: {
    alias: [{ find: /^react-router-dom$/, replacement: resolve("node_modules/react-router-dom/dist/index.mjs") }],
  },
  ssr: {
    noExternal: ["react-router-dom"],
  },
});

try {
  const { renderHome, getStructuredData } = await vite.ssrLoadModule("/src/entry-server.tsx");
  const markup = renderHome();
  if (!markup.includes("id=\"booking\"") || !markup.includes("id=\"faq\"")) {
    throw new Error("Nội dung trang chủ chưa được render đầy đủ.");
  }

  const structuredData = JSON.stringify(getStructuredData(siteUrl)).replace(/</g, "\\u003c");
  const home = addMetadata(html, "/", "/images/clinic-sign.webp")
    .replace("</head>", `  <script type="application/ld+json">${structuredData}</script>\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  await writeFile(outputPath, home);

  const confirmation = html
    .replace(/<title>[^<]*<\/title>/, "<title>Cảm ơn bạn đã liên hệ | Dr Trần Tuấn</title>")
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, '<meta name="description" content="Xác nhận yêu cầu tại Phòng khám chuyên khoa Mắt Dr Trần Tuấn." />')
    .replace("</head>", '  <meta name="robots" content="noindex, nofollow" />\n  </head>');
  await writeFile(resolve("dist/_confirmation.html"), confirmation);

  for (const [file, path] of [
    ["danh-gia-nguy-co-can-thi/index.html", "/danh-gia-nguy-co-can-thi/"],
    ["danh-gia-nguy-co-can-thi/privacy.html", "/danh-gia-nguy-co-can-thi/privacy.html"],
  ]) {
    const pagePath = resolve("dist", file);
    const page = await readFile(pagePath, "utf8");
    await writeFile(pagePath, addMetadata(page, path, "/images/clinic-sign.webp"));
  }

  if (siteUrl) {
    const urls = ["/", "/danh-gia-nguy-co-can-thi/", "/danh-gia-nguy-co-can-thi/privacy.html"];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((path) => `  <url><loc>${escapeHtml(siteUrl + path)}</loc></url>`).join("\n")}\n</urlset>\n`;
    await writeFile(resolve("dist/sitemap.xml"), sitemap);
    await writeFile(resolve("dist/robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  }
} finally {
  await vite.close();
}
