import { mkdir } from "node:fs/promises";
import { bundle } from "@remotion/bundler";
import {
  openBrowser,
  renderStill,
  selectComposition,
} from "@remotion/renderer";

// Always render both source compositions at identical frame numbers BEFORE export.
const times = process.argv.slice(2).map(Number);
const checkpoints = times.length
  ? times
  : [1, 2.5, 4.5, 5.9, 7.8, 9, 11.5, 13, 15, 16.5, 18.7, 20, 22.5];
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
const browserExecutable = process.env.CHROME_PATH || "/usr/bin/chromium";
const browser = await openBrowser("chrome", { browserExecutable });
await mkdir("out/cupang-compare", { recursive: true });
try {
  for (const id of ["Pulse", "Cupang"]) {
    const composition = await selectComposition({
      serveUrl,
      id,
      puppeteerInstance: browser,
    });
    for (const sec of checkpoints) {
      await renderStill({
        serveUrl,
        composition,
        puppeteerInstance: browser,
        output: `out/cupang-compare/${id}-${sec}.png`,
        frame: Math.round(sec * 60),
        scale: id === "Pulse" ? 0.25 : 0.6,
      });
      console.log(`${id}: ${sec}s / frame ${Math.round(sec * 60)}`);
    }
  }
} finally {
  await browser.close({ silent: true });
}
