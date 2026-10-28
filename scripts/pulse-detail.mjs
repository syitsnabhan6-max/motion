import {bundle} from '@remotion/bundler';
import {renderStill,selectComposition} from '@remotion/renderer';
const serveUrl=await bundle({entryPoint:'src/index.ts'});
const browserExecutable=process.env.CHROME_PATH||'/usr/bin/chromium';
const composition=await selectComposition({serveUrl,id:'Pulse',browserExecutable});
for(const sec of [12.7,13.4,15.5,16.15,20,22.5]){await renderStill({serveUrl,composition,browserExecutable,output:`out/pulse-detail-${sec}.png`,frame:Math.round(sec*60),scale:.4});console.log(sec)}
