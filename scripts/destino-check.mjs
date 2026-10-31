import {mkdir} from 'node:fs/promises';
import {bundle} from '@remotion/bundler';
import {openBrowser,renderStill,selectComposition} from '@remotion/renderer';

const frames=process.argv.slice(2).map(Number);
const times=frames.length?frames:[0,1.8,4.8,7,9,13,17,19.5,22.5,27,29,31.5,36,39,44.5,48,51.5,56.5,60,62,67,72,76,79.5,83];
const serveUrl=await bundle({entryPoint:'src/index.ts'});
const browser=await openBrowser('chrome',{browserExecutable:process.env.CHROME_PATH||'/usr/bin/chromium',chromiumOptions:{gl:'swangle'}});
await mkdir('out/destino-check',{recursive:true});
try{
 const composition=await selectComposition({serveUrl,id:'DestinoOutlook',puppeteerInstance:browser});
 for(const sec of times){
  await renderStill({serveUrl,composition,puppeteerInstance:browser,frame:Math.round(sec*60),scale:.4,output:`out/destino-check/${String(sec).padStart(5,'0')}.png`,chromiumOptions:{gl:'swangle'}});
  console.log('Frame',sec);
 }
 const cover=await selectComposition({serveUrl,id:'DestinoCover',puppeteerInstance:browser});
 await renderStill({serveUrl,composition:cover,puppeteerInstance:browser,frame:0,output:'out/destino-cover.png',chromiumOptions:{gl:'swangle'}});
}finally{await browser.close({silent:true});}
