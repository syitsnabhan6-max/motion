import {bundle} from '@remotion/bundler';
import {renderStill,selectComposition} from '@remotion/renderer';
const serveUrl=await bundle({entryPoint:'src/index.ts'});
const browserExecutable=process.env.CHROME_PATH || '/usr/bin/chromium';
const composition=await selectComposition({serveUrl,id:'SunkCost',browserExecutable});
for(const sec of [1.5,5.5,10.5,13.8,15,18,23.6,26,33,36.5,41,45,49]){
 await renderStill({serveUrl,composition,browserExecutable,output:`out/check-${sec}.png`,frame:Math.round(sec*60),scale:.35});
 console.log('Checked frame',sec);
}
