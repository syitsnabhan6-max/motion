import {mkdir} from 'node:fs/promises';
import {bundle} from '@remotion/bundler';
import {openBrowser,renderStill,selectComposition} from '@remotion/renderer';
const times=process.argv.slice(2).map(Number);
const checks=times.length?times:[.5,1.7,2.4,3.3,4.4,5.7,6.8,7.5,8.3,9.2,10.5,12.2,13.7,14.8];
const serveUrl=await bundle({entryPoint:'src/index.ts'});
const browser=await openBrowser('chrome',{browserExecutable:process.env.CHROME_PATH||'/usr/bin/chromium'});
await mkdir('out/destino-revision-check',{recursive:true});
try{
  const composition=await selectComposition({serveUrl,id:'DestinoRevision',puppeteerInstance:browser,inputProps:{audio:false}});
  for(const sec of checks){
    await renderStill({serveUrl,composition,puppeteerInstance:browser,inputProps:{audio:false},frame:Math.round(sec*60),scale:.5,output:`out/destino-revision-check/${String(sec).padStart(5,'0')}.png`});
    console.log('Frame',sec);
  }
}finally{await browser.close({silent:true});}
