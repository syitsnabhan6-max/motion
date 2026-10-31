import {build} from 'esbuild';
import {readFile,mkdir,writeFile,readdir} from 'node:fs/promises';
const revision=process.argv.includes('--revision');
const out=revision?'out/destino-revision-review':'out/destino-review';
await mkdir(out,{recursive:true});
const result=await build({entryPoints:[revision?'src/destino/revision/Standalone.tsx':'src/destino/Standalone.tsx'],bundle:true,write:false,outdir:out,minify:true,format:'iife',loader:{'.woff':'dataurl','.woff2':'dataurl'},define:{'process.env.NODE_ENV':'"production"'}});
const js=result.outputFiles.find(f=>f.path.endsWith('.js')).text;
const css=result.outputFiles.find(f=>f.path.endsWith('.css'))?.text||'';
const mimeTypes={png:'image/png',svg:'image/svg+xml',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp',wav:'audio/wav',m4a:'audio/mp4',mp3:'audio/mpeg'};
const media=revision?[['destino/grain.png','image/png'],['destino/revision/voiceover.wav','audio/wav'],['destino/revision/music-sfx.m4a','audio/mp4']]:[['lens-map.png','image/png']];
for(const file of revision?[]:await readdir('public/destino')){
 const mime=mimeTypes[file.split('.').at(-1).toLowerCase()];
 if(mime)media.push([`destino/${file}`,mime]);
}
const staticFiles=[];
for(const[name,mime]of media){const data=await readFile(`public/${name}`);staticFiles.push({name,src:`data:${mime};base64,${data.toString('base64')}`,sizeInBytes:data.length,lastModified:0});}
const html=`<!doctype html><html lang="id"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DestinoCT — XAUUSD 2–6 Nov 2026</title><style>html,body{margin:0;background:#03060c;overflow:hidden}#app{height:100vh;display:flex;justify-content:center;align-items:center}${css}</style><div id="app"></div><script>window.remotion_staticFiles=${JSON.stringify(staticFiles)};</script><script>${js.replaceAll('</script','<\\/script')}</script></html>`;
await writeFile(`${out}/index.html`,html);
console.log(`Standalone offline review: ${(html.length/1024/1024).toFixed(1)} MiB. Click once for synchronized sound. Space pause / R replay / ?debug=1 controls.`);
