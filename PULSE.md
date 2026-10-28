# PULSE — neon-purple trading journal film

A new 24-second film. Black / neon purple palette, clean Inter typography inspired by Apple's restrained product titles, original Three.js candlesticks and pulse mark, editable illustrative journal UI, original synthesized audio.

## Downloads

- [Watch / download PULSE](https://github.com/syitsnabhan6-max/motion/raw/refs/heads/main/downloads/pulse-trading.mp4) — 1080 × 1920, 60 fps.
- [Standalone editable Remotion project](https://github.com/syitsnabhan6-max/motion/raw/refs/heads/main/downloads/pulse-remotion.zip).
- [Research and creative direction](src/pulse/direction.md).

The master composition is 1080 × 1920. PULSE is a fictional trading journal concept. Charts, trade records and product states are illustrative, not verified trading performance. No return promises.

## Start and render

```sh
npm ci
npm run dev
```

Select `Pulse` in Remotion Studio.

```sh
npm run preview:pulse
npm run render:pulse
npm run typecheck
```

The standalone ZIP uses `npm run preview` / `npm run render` instead.

Node.js 22+ recommended. Uses `/usr/bin/chromium` when available, otherwise Remotion's browser installation. Set `CHROME_PATH` to use another browser. The 3D scene requires WebGL; this cloud render was tested with Chromium's software renderer.

## Edit

- `src/pulse/PulseFilm.tsx` — composition, headline copy, text timing and background.
- `src/pulse/UI.tsx` — journal form, save action, list, pattern view, risk control and cursor.
- `src/pulse/Objects3D.tsx` — fully editable Three.js candlesticks, materials, lighting, camera and pulse mark.
- `src/pulse/motion.ts` — palette, quintic easing and event times.
- `public/pulse/soundtrack.m4a` — original 24-second audio bed and UI cues.
- `scripts/pulse-audio.py` — optional audio regeneration (Python + NumPy + FFmpeg).

All scene elements are code, including the 3D objects. No footage from the previous revisions is used. The font is Inter, not Apple's proprietary SF Pro.

The opening camera intentionally crops the outer candles in a macro shot. Important headlines and controls remain inside the portrait frame. The interface camera zooms toward the save and pattern interactions; text remains outside that camera rig.

## Research limits

GitHub searches used `animation SaaS` and `saas remotion video`. Sources and actual viewing methods are recorded in `src/pulse/direction.md`. YouTube and Dribbble were blocked by the cloud network (403); no claim is made of viewing those search results. A GitHub-hosted animated editor demo was inspected, and public production notes were read. No third-party assets or code are included.
