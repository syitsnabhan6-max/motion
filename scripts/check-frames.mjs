import {bundle} from '@remotion/bundler';
import {renderStill,selectComposition} from '@remotion/renderer';
const serveUrl=await bundle({entryPoint:'src/index.ts'});
const browserExecutable=process.env.CHROME_PATH || '/usr/bin/chromium';
const composition=await selectComposition({serveUrl,id:'SunkCost',browserExecutable});
for(const sec of [0,3,7.5,9,15,23.5,26,30,32,35,40,44,49,52]){
 await renderStill({serveUrl,composition,browserExecutable,output:`out/check-${sec}.png`,frame:Math.round(sec*60),scale:.35});
 console.log('Checked frame',sec);
}
