import fs from "node:fs";
import path from "node:path";

const localeDirectory = path.resolve("src/locales");
const referencePath = path.join(localeDirectory, "vi.json");
const localeFiles = fs
  .readdirSync(localeDirectory)
  .filter((fileName) => fileName.endsWith(".json"));

const collectShape = (value, prefix = "") => {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectShape(item, `${prefix}[${index}]`)
    );
  }

  if (value && typeof value === "object") {
    return Object.keys(value).flatMap((key) =>
      collectShape(value[key], prefix ? `${prefix}.${key}` : key)
    );
  }

  return [prefix];
};

const readLocale = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));
const referenceShape = collectShape(readLocale(referencePath)).sort();
let hasError = false;

for (const fileName of localeFiles) {
  const filePath = path.join(localeDirectory, fileName);
  const localeShape = collectShape(readLocale(filePath)).sort();
  const missing = referenceShape.filter((key) => !localeShape.includes(key));
  const extra = localeShape.filter((key) => !referenceShape.includes(key));

  if (missing.length || extra.length) {
    hasError = true;
    process.stderr.write(`${fileName} không khớp cấu trúc vi.json.\n`);
    if (missing.length) process.stderr.write(`Thiếu: ${missing.join(", ")}\n`);
    if (extra.length) process.stderr.write(`Thừa: ${extra.join(", ")}\n`);
  }
}

if (hasError) {
  process.exitCode = 1;
} else {
  process.stdout.write(`Đã kiểm tra ${localeFiles.length} file locale.\n`);
}
