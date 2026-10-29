import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
const browserExecutable = "/usr/bin/chromium";
const composition = await selectComposition({
  serveUrl,
  id: "Archer",
  browserExecutable,
});
const times = process.argv.slice(2).map(Number);
for (const sec of times.length
  ? times
  : [
      0.8, 1.3, 2.6, 4, 5.7, 7.2, 8.9, 11.5, 13.9, 15.9, 17.9, 19.3, 21.7, 23.1,
      24.2, 25.5, 28.9, 31.5,
    ]) {
  await renderStill({
    serveUrl,
    composition,
    browserExecutable,
    output: `out/archer-v5-${sec}.png`,
    frame: Math.round(sec * 60),
    scale: 0.75,
  });
  console.log("Checked", sec);
}
