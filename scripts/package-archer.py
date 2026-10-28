from pathlib import Path
import shutil,json,zipfile
root=Path(__file__).resolve().parents[1]
stage=root/'out'/'archer-remotion'
if stage.exists(): shutil.rmtree(stage)
(stage/'src').mkdir(parents=True)
(stage/'public').mkdir()
shutil.copytree(root/'src'/'archer',stage/'src'/'archer')
shutil.copytree(root/'public'/'archer',stage/'public'/'archer')
for f in ['package.json','package-lock.json','tsconfig.json','remotion.config.ts']:
 shutil.copy(root/f,stage/f)
shutil.copy(root/'ARCHER.md',stage/'README.md')
(stage/'src'/'index.ts').write_text("import {registerRoot} from 'remotion';\nimport {Root} from './Root';\nregisterRoot(Root);\n")
(stage/'src'/'Root.tsx').write_text("import React from 'react';\nimport {Composition} from 'remotion';\nimport {ArcherFilm} from './archer/ArcherFilm';\nexport const Root:React.FC=()=> <Composition id=\"Archer\" component={ArcherFilm} width={1920} height={1080} fps={60} durationInFrames={2040}/>;\n")
p=stage/'package.json';d=json.loads(p.read_text());d['scripts']={k:v for k,v in d['scripts'].items() if k in ['dev','typecheck','render:archer','preview:archer']};p.write_text(json.dumps(d,indent=2)+'\n')
(root/'downloads').mkdir(exist_ok=True)
with zipfile.ZipFile(root/'downloads'/'archer-remotion.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(stage.rglob('*')):
  if p.is_file():z.write(p,p.relative_to(stage.parent))
print('Packaged Archer editable source')
