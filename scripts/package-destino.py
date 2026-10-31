"""Package only the editable Destino film plus an offline browser preview."""
from pathlib import Path
import json, shutil, zipfile

root=Path(__file__).resolve().parents[1]
folder=root/'out/destino-package'
folder.mkdir(parents=True,exist_ok=True)
for name in ['src/destino','public/destino','docs/destino-sources']:
    shutil.copytree(root/name,folder/'remotion'/name,dirs_exist_ok=True)
files=['src/index.ts','src/cupang/motion.ts','src/archer/v5/motion.ts','public/lens-map.png','remotion.config.ts','tsconfig.json','scripts/destino-check.mjs','scripts/destino-player.mjs','scripts/destino-audio.py','DESTINO.md','DESTINO-VO.md']
for name in files:
    target=folder/'remotion'/name;target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(root/name,target)
(folder/'remotion/src/Root.tsx').write_text('''import React from 'react';
import {Composition} from 'remotion';
import {DestinoFilm} from './destino/DestinoFilm';
import {DestinoCover} from './destino/DestinoCover';
import {defaultOutlook,FORMAT} from './destino/content';
export const Root:React.FC=()=> <>
<Composition id="DestinoOutlook" component={DestinoFilm} defaultProps={defaultOutlook} width={1080} height={1920} fps={60} durationInFrames={FORMAT.seconds*60}/>
<Composition id="DestinoCover" component={DestinoCover} defaultProps={defaultOutlook} width={1080} height={1920} fps={60} durationInFrames={1}/>
</>;
''')
pkg=json.loads((root/'package.json').read_text());pkg['name']='destino-market-outlook'
pkg['scripts']={k:v for k,v in pkg['scripts'].items() if k in ['dev','typecheck'] or ':destino' in k}
(folder/'remotion/package.json').write_text(json.dumps(pkg,indent=2)+'\n')
lock=json.loads((root/'package-lock.json').read_text());lock['name']=pkg['name'];lock['packages']['']['name']=pkg['name']
(folder/'remotion/package-lock.json').write_text(json.dumps(lock,indent=2)+'\n')
shutil.copy2(root/'out/destino-review/index.html',folder/'index.html')
shutil.copy2(root/'out/destino-cover.png',folder/'thumbnail.png')
(folder/'START-HERE.txt').write_text('DESTINO CT — XAUUSD 2–6 NOVEMBER 2026\n\nBuka index.html di Chrome/Edge. Klik sekali untuk memulai gambar dan suara bersama. Spasi: jeda. R: ulang.\nPreview menyertakan font, gambar, VO dan musik, tanpa CDN atau npm.\nUntuk edit: buka folder remotion, npm ci, npm run dev. Pilih DestinoOutlook.\nVideo: 1080×1920, 60 fps, 84 detik. Thumbnail: DestinoCover.\nLogo file asli belum tersedia: tulisan DestinoCT sementara. Ubah logoSrc di src/destino/content.ts setelah memasukkan logo asli.\nBaca DESTINO.md untuk sumber pasar, batas diagram, dan catatan lisensi suara.\n')
dest=root/'downloads/destino-market-outlook-remotion.zip'
with zipfile.ZipFile(dest,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
    for p in sorted(folder.rglob('*')):
        if p.is_file() and not any(part in ['node_modules','.git','out'] for part in p.relative_to(folder).parts):
            z.write(p,Path('destino-market-outlook')/p.relative_to(folder))
print(f'{dest}: {dest.stat().st_size/1024/1024:.1f} MiB')
