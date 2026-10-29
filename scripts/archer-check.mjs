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
      0.6, 1.8, 3.8, 5.6, 6.4, 7.5, 9.4, 10.5, 12.8, 15, 17.8, 19.7, 21.8, 25.2,
      27.3, 30.2, 32.5,
    ]) {
  await renderStill({
    serveUrl,
    composition,
    browserExecutable,
    output: `out/archer-v3-${sec}.png`,
    frame: Math.round(sec * 60),
    scale: 0.75,
  });
  console.log("Checked", sec);
}
