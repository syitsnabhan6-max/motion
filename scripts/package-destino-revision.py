"""Minimal editable opening project with an offline single-file review player."""
from pathlib import Path
import json, shutil, zipfile
root=Path(__file__).resolve().parents[1]
stage=root/'out/destino-revision-package'
stage.mkdir(parents=True,exist_ok=True)
for directory in ['src/destino/revision','public/destino/revision']:
    shutil.copytree(root/directory,stage/directory,dirs_exist_ok=True)
for file in ['src/archer/v5/motion.ts','public/destino/grain.png','public/destino/VOICE-NOTES.md','docs/destino-sources/fomc-2026-10-28.pdf','docs/destino-sources/fomc-2026-10-28.txt','package-lock.json','tsconfig.json','remotion.config.ts','scripts/destino-revision-audio.py']:
    target=stage/file;target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(root/file,target)
package=json.loads((root/'package.json').read_text())
package['name']='destino-opening-revision'
package['scripts']={'dev':'remotion studio src/index.ts','typecheck':'tsc --noEmit','render':'remotion render src/index.ts DestinoRevision out/destino-revision.mp4 --crf=18'}
(stage/'package.json').write_text(json.dumps(package,indent=2)+'\n')
(stage/'src/index.ts').write_text("import {registerRoot} from 'remotion';\nimport {Root} from './Root';\nregisterRoot(Root);\n")
(stage/'src/Root.tsx').write_text('''import React from 'react';
import {Composition} from 'remotion';
import {DestinoRevision} from './destino/revision/Opening';
export const Root=()=> <Composition id="DestinoRevision" component={DestinoRevision} defaultProps={{audio:true}} width={1080} height={1920} fps={60} durationInFrames={900}/>;
''')
shutil.copy2(root/'DESTINO-REVISION.md',stage/'README.md')
shutil.copy2(root/'out/destino-revision-review/index.html',stage/'index.html')
for font in ['sora','dm-sans']:
    source=root/f'node_modules/@fontsource/{font}/LICENSE'
    if source.exists():
        target=stage/f'licenses/{font}.txt';target.parent.mkdir(exist_ok=True);shutil.copy2(source,target)
archive=root/'downloads/destino-revision-opening-remotion.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
    for file in sorted(stage.rglob('*')):
        if file.is_file() and not any(part in ['node_modules','.git','out'] for part in file.relative_to(stage).parts):
            z.write(file,'destino-revision/'+str(file.relative_to(stage)))
print(f'{archive.name}: {archive.stat().st_size:,} bytes')
