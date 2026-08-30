import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const sourceRoot = path.resolve("src");
const translatedAttributes = new Set([
  "alt",
  "answer",
  "age",
  "benefit",
  "aria-label",
  "description",
  "placeholder",
  "title",
]);
const translatedProperties = new Set([
  "alt",
  "buttonText",
  "content",
  "description",
  "details",
  "desc",
  "duration",
  "education",
  "experience",
  "features",
  "highlights",
  "label",
  "location",
  "message",
  "name",
  "origin",
  "price",
  "question",
  "role",
  "specialty",
  "text",
  "title",
]);

const sourceFiles = [];

const collectFiles = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      collectFiles(absolutePath);
    } else if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith(".d.ts")) {
      sourceFiles.push(absolutePath);
    }
  }
};

const hasReadableText = (value) =>
  /[\p{L}]/u.test(value) &&
  value.trim().length > 1 &&
  !/^(text|bg|border|from|to|via|ring|shadow)-/.test(value.trim());

const propertyName = (node) => {
  if (!node) return null;
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text;
  return null;
};

const findOwningProperty = (node) => {
  let current = node.parent;

  while (current && !ts.isSourceFile(current)) {
    if (ts.isPropertyAssignment(current)) return propertyName(current.name);
    if (ts.isJsxElement(current) || ts.isJsxSelfClosingElement(current)) return null;
    current = current.parent;
  }

  return null;
};

const findings = [];

collectFiles(sourceRoot);

for (const absolutePath of sourceFiles) {
  const content = fs.readFileSync(absolutePath, "utf8");
  const sourceFile = ts.createSourceFile(
    absolutePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    absolutePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );

  const report = (node, value, kind) => {
    const normalized = value.replace(/\s+/g, " ").trim();
    if (!hasReadableText(normalized)) return;

    const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
    findings.push({
      file: path.relative(process.cwd(), absolutePath).replaceAll("\\", "/"),
      line: position.line + 1,
      kind,
      text: normalized,
    });
  };

  const visit = (node) => {
    if (ts.isJsxText(node)) {
      report(node, node.getText(sourceFile), "jsx-text");
    } else if (ts.isJsxAttribute(node)) {
      const name = node.name.getText(sourceFile);
      if (
        translatedAttributes.has(name) &&
        node.initializer &&
        ts.isStringLiteral(node.initializer)
      ) {
        report(node.initializer, node.initializer.text, `attribute:${name}`);
      }
    } else if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const ownProperty = ts.isPropertyAssignment(node.parent)
        ? propertyName(node.parent.name)
        : findOwningProperty(node);

      if (ownProperty && translatedProperties.has(ownProperty)) {
        report(node, node.text, `property:${ownProperty}`);
      }
    } else if (ts.isTemplateExpression(node)) {
      const isTranslatedAttribute =
        ts.isJsxExpression(node.parent) &&
        ts.isJsxAttribute(node.parent.parent) &&
        translatedAttributes.has(node.parent.parent.name.getText(sourceFile));

      if (isTranslatedAttribute) {
        report(node, node.getText(sourceFile), "attribute-template");
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
}

if (findings.length > 0) {
  for (const finding of findings) {
    process.stdout.write(
      `${finding.file}:${finding.line} [${finding.kind}] ${finding.text}\n`
    );
  }
  process.exitCode = 1;
} else {
  process.stdout.write("Không phát hiện nội dung hiển thị hard-code trong src.\n");
}
