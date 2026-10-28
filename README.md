# Sunk cost — Product tour with claims

Editable Remotion revision of IMG_5961.MP4. Portrait 1080 × 1920, 60 fps, 53.5 seconds. Uses the original audio track, copied without re-encoding.

## Downloads

- [Watch / download the preview MP4](https://github.com/syitsnabhan6-max/motion/raw/refs/heads/main/downloads/preview.mp4) — 540 × 960, 60 fps, original audio.
- [Download editable Remotion project ZIP](https://github.com/syitsnabhan6-max/motion/raw/refs/heads/main/downloads/sunk-cost-remotion.zip) — source, lockfile, audio and editing instructions.

## Run

Node.js 22+ recommended.

```sh
npm ci
npm run dev
```

Open the Studio address printed in your terminal. Select `SunkCost` to play and scrub the timeline.

```sh
npm run typecheck
npm run preview  # 540 × 960 review MP4
npm run render   # 1080 × 1920 final MP4
```

Remotion uses Chromium. The cloud environment uses `/usr/bin/chromium`; elsewhere Remotion can install its browser automatically. Set `CHROME_PATH` to use an existing Chrome/Chromium executable.

## Edit

- `src/content.ts`: headline copy, entry/exit times, palette, audio switch and composition settings.
- `src/Film.tsx`: editable transaction cards, SVG chart geometry, deposit rows, decision diagram, camera tracks and transitions.
- `public/original-audio.m4a`: original soundtrack from the uploaded video. Set `settings.audio` to false to mute, or replace the file.
- `src/Root.tsx`: composition registration.

Times are seconds. All animation is derived from Remotion's frame clock. Smooth cubic curves, phrase-level reveals, restrained blur, and persistent UI elements keep scrubbing deterministic. No live CSS transitions or random render-time behavior.

The trading UI and displayed deposit values are illustrative storytelling elements, not a live trading app or verified account records. The source video's handle is retained as text; no substitute logo has been invented. The final MP4 is flattened; edit the Remotion source to change individual elements.

The preview uses the supplied audio without retiming. The revised headlines condense the original message rather than providing verbatim subtitles.
