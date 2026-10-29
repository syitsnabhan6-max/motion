import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

const parse = (p) =>
  ts.createSourceFile(
    p,
    readFileSync(p, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    p.endsWith("tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
const original = {
  film: parse("src/pulse/PulseFilm.tsx"),
  ui: parse("src/pulse/UI.tsx"),
  motion: parse("src/pulse/motion.ts"),
  objects: parse("src/pulse/Objects3D.tsx"),
};
const adaptation = {
  film: parse("src/cupang/CupangFilm.tsx"),
  ui: parse("src/cupang/UI.tsx"),
  motion: parse("src/cupang/motion.ts"),
  objects: parse("src/cupang/Objects3D.tsx"),
};
function nodes(root, predicate) {
  const out = [];
  const visit = (n) => {
    if (predicate(n)) out.push(n);
    ts.forEachChild(n, visit);
  };
  visit(root);
  return out;
}
function canonical(n) {
  if (ts.isNumericLiteral(n)) return Number(n.text);
  if (ts.isStringLiteral(n) || ts.isIdentifier(n)) return [n.kind, n.text];
  const children = [];
  ts.forEachChild(n, (c) => {
    children.push(canonical(c));
  });
  return [n.kind, children];
}
function variable(sf, name) {
  const n = nodes(
    sf,
    (n) => ts.isVariableDeclaration(n) && n.name.getText(sf) === name,
  )[0];
  assert(n, `Variable ${name}`);
  return n.initializer;
}
function heads(sf) {
  return nodes(
    sf,
    (n) => ts.isJsxSelfClosingElement(n) && n.tagName.getText(sf) === "Head",
  ).map((n) =>
    Object.fromEntries(
      n.attributes.properties
        .filter(ts.isJsxAttribute)
        .filter((a) => ["a", "b", "lines"].includes(a.name.text))
        .map((a) => [a.name.text, canonical(a.initializer.expression)]),
    ),
  );
}
const a = heads(original.film),
  b = heads(adaptation.film);
assert.equal(a.length, b.length);
for (let i = 0; i < a.length; i++) {
  assert.deepEqual([a[i].a, a[i].b], [b[i].a, b[i].b], `Title window ${i}`);
}
assert.deepEqual(a[0].lines, b[0].lines, "Original opening typography copy");
for (const name of ["clamp", "q", "m", "out", "vis", "path", "timing"])
  assert.deepEqual(
    canonical(variable(original.motion, name)),
    canonical(variable(adaptation.motion, name)),
    `PULSE motion helper ${name}`,
  );
for (const name of ["enter", "leave", "journal", "analysis", "plan"])
  assert.deepEqual(
    canonical(variable(original.ui, name)),
    canonical(variable(adaptation.ui, name)),
    `UI transition ${name}`,
  );
for (const name of ["zoom", "cy", "tilt"])
  assert.deepEqual(
    variable(original.ui, name).arguments.map(canonical),
    variable(adaptation.ui, name).arguments.map(canonical),
    `Original camera keyframes ${name}`,
  );
const paths = (sf) =>
  nodes(
    sf,
    (n) =>
      ts.isCallExpression(n) &&
      ts.isIdentifier(n.expression) &&
      ["path", "m", "outReveal"].includes(n.expression.text),
  ).map(canonical);
assert.deepEqual(
  paths(original.objects),
  paths(adaptation.objects),
  "3D object and camera choreography",
);
assert.deepEqual(
  canonical(variable(original.objects, "heights")),
  canonical(variable(adaptation.objects, "heights")),
  "Five original candlestick geometries",
);
assert(
  !/from ['"].*(?:archer|v5)/.test(
    readFileSync("src/cupang/CupangFilm.tsx", "utf8") +
      readFileSync("src/cupang/UI.tsx", "utf8"),
  ),
  "Archer must not supply animation components",
);
assert.deepEqual(
  readFileSync("public/pulse/soundtrack.m4a"),
  readFileSync("public/cupang/soundtrack.m4a"),
  "Original PULSE soundtrack",
);
assert.deepEqual(
  readFileSync("public/archer/cupang.png"),
  readFileSync("public/cupang/cupang.png"),
  "Existing Cupang logo",
);
console.log(
  "PASS: 6 title windows and opening copy; 7 motion helpers/timing; 5 UI transitions; all camera keyframes; 3D choreography/candles; original soundtrack and logo.",
);
