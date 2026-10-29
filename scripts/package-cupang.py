"""Package the actual PULSE adaptation together with its source for comparison."""
from pathlib import Path
import json
import shutil
import zipfile

root = Path(__file__).resolve().parents[1]
stage = root / 'out' / 'cupang-pulse-remotion'
if stage.exists():
    shutil.rmtree(stage)
for folder in ['src/cupang', 'src/pulse', 'public/cupang', 'public/pulse']:
    shutil.copytree(root / folder, stage / folder)
(stage / 'public/archer').mkdir(parents=True)
shutil.copy(root / 'public/archer/cupang.png', stage / 'public/archer/cupang.png')
(stage / 'scripts').mkdir()
for file in ['cupang-source-check.mjs', 'cupang-compare.mjs']:
    shutil.copy(root / 'scripts' / file, stage / 'scripts' / file)
for file in ['package.json', 'package-lock.json', 'tsconfig.json', 'remotion.config.ts', '.gitignore']:
    shutil.copy(root / file, stage / file)
shutil.copy(root / 'CUPANG.md', stage / 'README.md')
shutil.copy(root / 'CUPANG.md', stage / 'CUPANG.md')
(stage / 'src/index.ts').write_text("import {registerRoot} from 'remotion';\nimport {Root} from './Root';\nregisterRoot(Root);\n")
(stage / 'src/Root.tsx').write_text('''import React from 'react';
import {Composition} from 'remotion';
import {CupangFilm} from './cupang/CupangFilm';
import {PulseFilm} from './pulse/PulseFilm';
export const Root:React.FC=()=> <>
  <Composition id="Cupang" component={CupangFilm} width={1800} height={600} fps={60} durationInFrames={1440}/>
  <Composition id="Pulse" component={PulseFilm} width={1080} height={1920} fps={60} durationInFrames={1440}/>
</>;
''')
package = stage / 'package.json'
data = json.loads(package.read_text())
data['scripts'] = {k:v for k,v in data['scripts'].items() if k in ['dev','typecheck','render:cupang','preview:cupang','check:cupang','frames:cupang','render:pulse','preview:pulse']}
package.write_text(json.dumps(data, indent=2) + '\n')
dest = root / 'downloads' / 'cupang-pulse-remotion.zip'
with zipfile.ZipFile(dest, 'w', zipfile.ZIP_DEFLATED) as z:
    for p in sorted(stage.rglob('*')):
        if p.is_file():
            z.write(p, p.relative_to(stage.parent))
print(f'Packaged {dest.name}: Cupang and original Pulse compositions')
