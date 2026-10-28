# Latest: PULSE

New trading-journal film in neon purple and black. [Video](https://github.com/syitsnabhan6-max/motion/raw/refs/heads/main/downloads/pulse-trading.mp4) · [Editable project ZIP](https://github.com/syitsnabhan6-max/motion/raw/refs/heads/main/downloads/pulse-remotion.zip) · [Editing guide and research](PULSE.md)

---

# Sunk cost — Remotion revision 2

A portrait motion graphic using Bang Motion's product-tour / claims approach, revised to retain the original character, restore the fisheye loss/deposit history, and improve readable, continuous typography.

## Download

- [Revision 2 video — 720 × 1280, 60 fps](https://github.com/syitsnabhan6-max/motion/raw/refs/heads/main/downloads/revision-2.mp4)
- [Revision 2 editable Remotion project ZIP](https://github.com/syitsnabhan6-max/motion/raw/refs/heads/main/downloads/remotion-revision-2.zip)

The composition is 1080 × 1920, 60 fps, 53.5 seconds. The supplied soundtrack is preserved. The review export is 720 × 1280. Version 1 downloads remain in the repository for comparison.

## Run

Node.js 22+ recommended.

```sh
npm ci
npm run dev
```

Select `SunkCost` in Remotion Studio. Play, pause and scrub frame by frame.

```sh
npm run typecheck
npm run preview  # lightweight 540 × 960 MP4
npm run render   # full 1080 × 1920 MP4
```

For the revision 2 review export:

```sh
npx remotion render src/index.ts SunkCost out/revision-2.mp4 --scale=0.6666666666666666 --crf=18
```

The cloud runtime uses `/usr/bin/chromium`. Other systems can use Remotion's browser installer, or set `CHROME_PATH` to an existing Chromium/Chrome executable.

## Edit

- `src/content.ts`: headline copy, palette, audio switch and composition dimensions.
- `src/Film.tsx`: scene timing, camera choreography, original-character footage, notes and transitions.
- `src/World.tsx`: editable loss/deposit cards, SVG graphs, scrolling cylinder, fisheye displacement, glossy icons and market camera path.
- `src/Type.tsx`: phrase-level text reveals, restrained blur, readable settling and exits.
- `src/motion.ts`: shared easing, camera and visibility helpers.
- `public/original-audio.m4a`: original audio, copied without re-encoding from the supplied IMG_5961.MP4.
- `public/character-original.mp4`: a 5.2-second crop from 8.8–14.0 seconds of the original video. Its original text area is excluded; editable Remotion typography is overlaid separately.
- `public/lens-map.png`: mathematical displacement map for the curved scrolling wall.

All timing is in seconds. Animation is driven by the current Remotion frame, with no CSS animation clock or random render-time state. The loss wall scrolls continuously into and behind the claims. The deposit wall uses the same world with a different scroll cadence. Text remains outside the lens distortion so it stays legible.

### Editing limits

The character and the cards inside that short original footage segment are baked into the supplied video. Their placement, timing, crop and surrounding text are editable; individual limbs and embedded cards are not separate layers. All rebuilt scrolling cards, charts, type and glossy icons are editable code. The MP4 export itself is flattened.

The trading UI and values are illustrative storytelling elements, not verified account records. The source video's handle is retained as text; no replacement logo was invented. The friend's reference supplied motion direction only; its footage and audio are not included.

## Validation

TypeScript checked. Key frames cover typography, original character, lens transition, scrolling walls, token transition and ending. Rendered review export is checked with ffprobe and a complete ffmpeg decode before delivery.
