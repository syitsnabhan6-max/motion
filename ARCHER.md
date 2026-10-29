# Archer Indicator — revision 2

Editable Remotion film for Trade With Cupang. Designed natively at **1800 × 600 (3:1), 60 fps, 34 seconds**. Silent, with no voice-over. Composition ID: `Archer`.

## Open and render

```sh
npm ci
npm run dev
npm run typecheck
npm run render:archer
```

Select `Archer` in Remotion Studio. Render output: `out/archer-v2.mp4`. Local Chromium is used when available; otherwise Remotion uses its managed browser. `CHROME_PATH` can select another executable.

## Revision direction

- Red and black moving gradients, white depth discs with red Cupang marks, stronger edge glow and luminous central typography.
- The old two-pair coin sequence is replaced by a curved translucent panel meeting a Cupang medallion, following the Beliv reference.
- Chart is rebuilt for the wide format with drawing tools, a toolbar, price scale, volume bars, XAUUSD/BTC watchlist, and Archer status. Price levels remain straight and correctly ordered.
- Explanatory copy appears centrally while chart focus softens. Entry, SL and TP have local labels with short damped pops.
- A layered phone mockup enters close to camera, recedes and lands beside the chart. Background blur decreases as it lands. Its lockscreen receives a notification; camera moves in and then pulls back.
- Closing: `Archer Indicator`, a luminous glass capsule with Cupang icon and `Coba Sekarang`, followed by the brand tagline. No separate Trade With Cupang text above the title.

## Timing and copy

| Seconds | Content |
|---|---|
| 0–4.5 | Trading / Dengan arah yang jelas; glowing depth discs |
| 4.5–8 | Cupang medallion in curved panel; Konfirmasi / Entry / SL & TP |
| 8–10 | Cupang Archer; reveal the detailed chart |
| 10.7–12.4 | Menunggu konfirmasi; centered copy and focus transition |
| 12.4–15.4 | Chart continues; Konfirmasi hadir |
| 15.45–19 | BUY, then area entry, SL, TP with local labels |
| 19.4–20.5 | Di TradingView |
| 20–22.7 | Phone arrives close and recedes to right; chart regains focus |
| 23–27.4 | Notification, camera push-in, Langsung lewat notifikasi, pullback |
| 28.6–34 | Archer Indicator / Coba Sekarang / Permudah Jalan Trading Anda Bersama Cupang. |

## Editable source map

- `src/archer/ArcherFilm.tsx`: camera positions, composition, timeline and central text.
- `Intro.tsx`: glowing depth coins and curved panel transition.
- `Atmosphere.tsx`: moving gradient light fields.
- `Chart.tsx`: SVG candles, price levels, labels, sidebar and toolbar.
- `Phone.tsx`: phone geometry, lockscreen, notification, camera path and depth blur.
- `Closing.tsx`: medallion-to-capsule CTA and traveling highlight.
- `Titles.tsx`: word reveal and text glow.
- `Brand.tsx`: Cupang mark, bullion symbol and Bitcoin icon.
- `motion.ts`: deterministic easing functions.

All components use frame-based time. No video reference footage is embedded in the output. The phone, chart, typography, gradients and CTA remain editable components.

## Assets and illustrative UI

The Cupang mark comes from the user's supplied image, prepared as a red transparent PNG using image editing. It is not the original vector master; replace `public/archer/cupang.png` with an official transparent export when available.

Bitcoin icon: https://github.com/spothq/cryptocurrency-icons/blob/master/svg/color/btc.svg — CC0, license included. XAUUSD uses an original bullion SVG with the Au symbol; XAUUSD has no single official brand logo.

Chart candles, prices, OHLC figures, watchlist graphics, indicator controls and notification are illustrative rather than real market data or verified product screenshots. The demonstrated logic follows the client brief: no Archer annotations before confirmation; BUY followed by entry, SL and TP. No future price move or achieved profit is depicted.

The lockscreen is a stylized phone mockup with a fixed display date/time for deterministic rendering. The CTA inside the MP4 is visual; an actual website button should be an HTML link to the correct product URL.

## Delivery and verification

- MP4: `downloads/archer-v2.mp4` (H.264, yuv420p, fast-start).
- Editable project: `downloads/archer-v2-remotion.zip`.
- Poster: `downloads/archer-v2-poster.png`.
- Checks: TypeScript; inspected keyframes for intro, chart, phone focus and CTA; transition-frame sheets from encoded MP4; duration/frame count; full video decode; standalone ZIP source validation.

The previous 1920×1080 film remains in `downloads/archer.mp4` for comparison. Unrelated paused PULSE work is not part of this revision.
