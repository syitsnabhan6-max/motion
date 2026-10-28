import {bundle} from '@remotion/bundler';
import {renderStill,selectComposition} from '@remotion/renderer';
const serveUrl=await bundle({entryPoint:'src/index.ts'});
const browserExecutable=process.env.CHROME_PATH || '/usr/bin/chromium';
const composition=await selectComposition({serveUrl,id:'Pulse',browserExecutable});
for(const sec of [1,2.5,4.5,5.9,7.8,9,11.5,13,15,16.5,18.7,20,22.5]){
 await renderStill({serveUrl,composition,browserExecutable,output:`out/pulse-${sec}.png`,frame:Math.round(sec*60),scale:.4});
 console.log('Checked',sec);
}
