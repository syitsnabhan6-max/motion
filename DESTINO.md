# DestinoCT — Market outlook XAUUSD

Instagram Reels, **1080 × 1920, 60 fps, 84 seconds**. Compositions:
`DestinoOutlook` (film), `DestinoCover` (thumbnail). All typography,
charts, lens distortion, camera paths, spheres, physical 3D coin and candles,
and calendar objects remain editable in Remotion.

## Edit and render

```sh
npm ci
npm run dev
npm run typecheck
node scripts/destino-check.mjs
npm run render:destino
npm run cover:destino
```

Chromium is detected at `/usr/bin/chromium`, or specify `CHROME_PATH`.
In Remotion Studio choose **DestinoOutlook**. `src/destino/content.ts` contains
the week, quote, default logo and audio paths, palette, calendar, and narration.
The eight chapter boundaries are 0 / 7 / 17 / 29 / 36 / 48 / 60 / 76 / 84 seconds.
`Scenes.tsx` contains the actual compositions; `Chart.tsx` the diagram and drawing;
`Objects3D.tsx` the physical coin/candle scene. `motion.ts` reuses the earlier
Cupang/PULSE quintic easing and Archer cubic Bézier paths.

`npm run player:destino` builds `out/destino-review/index.html`, embedding fonts,
images, narration and music. Open in Chrome/Edge and click once for synchronized
audio. Space pauses, R replays; `?debug=1` enables the scrub controls. A managed
browser may forbid `file://`; use a local web server in that case. No CDN is used.
The 3D surface uses a 720 × 1280 antialiased buffer; text and diagrams render at
the native composition size. The grain tile is prerendered to reduce per-frame cost.

### Brand asset

The supplied logo is visible in the chat but was not exposed as a downloadable
image file in this workspace. `logoSrc` therefore remains `null`: the film
uses a plain **DestinoCT** text credit, not a fabricated version of the logo.
Put the actual supplied logo in `public/destino/logo.png` and change `logoSrc`
to `destino/logo.png`. The TMGM mark in the thumbnail reference is not added:
it does not identify the chart's broker or establish a sponsor for this episode.

## Direction

The user requested the combination of existing motion techniques: fisheye,
scroll, bounce, 3D assets, tilted charts, and smooth motivated zooms. The submitted
Finqube reference (45.35 s, 720 × 1280, 60 fps) was studied as a rhythm reference:
short type reveals, curved prop entries, staggered document fields, close-ups
followed by wide framing, and transitions carried by an object.

Palette: logo-derived blue, darkened as requested: `#0753A6`; navy `#071A35`;
black `#03060C`; white `#F4F8FF`; lighter blue `#72B8FF` for legibility.
Bricolage Grotesque gives the titles a rounded, heavy character; DM Sans carries
chart labels. Blue metal and glass belong to one family. A moving layered
gradient, slow orbital curves, and subtle animated grain form the background.
The continuous vertical world connects the eight chapters. The key moment is
a bouncing sphere expanding into the FOMC object; the headline wall uses the
scrolling-cylinder and radial-lens logic from SunkCost, now a bounded WebGL
postprocess over actual 3D cards for efficient frame rendering. Original earlier
compositions are unchanged.

| Seconds | Content | Action |
| --- | --- | --- |
| 0–7 | Gold loses 4,000 | Large fractured number, physical XAU coin, camera pullback |
| 7–17 | Lower highs, below 4,000 | Tilted diagram draws, camera follows the structure |
| 17–29 | FOMC holds, two dissent for hike | Ball falls/bounces/expands, 12 voting spheres |
| 29–36 | Public headlines | Curved scrolling wall, fisheye, sharp foreground type |
| 36–48 | Conditional continuation | Price path draws through failed retest toward 3,800 |
| 48–60 | Conditional recovery | Reclaim/retest of 4,000, then 4,100–4,200 |
| 60–76 | Catalysts | Calendar objects scroll in perspective, three local times |
| 76–84 | Wait for confirmation | Return to the coin, brand credit, readable hold |

## Evidence and limits

Analysis is dated **31 October 2026**, for **2–6 November 2026**. The spot quote
3,875.645 is read from the user's TradingView screenshots. Broker/feed is unknown.
The daily screenshot's top OHLC belongs to an old hovered candle; it was not used
as the current quote. The H4 displayed low of 3,870.320 is not called a weekly low.

The chart is labelled **Skema struktur · acuan chart user**. Its line is an
illustrative reconstruction, not an invented OHLC dataset. Scenario paths are
explicitly illustrative and conditional. Observation zones: 3,870–3,880;
psychological 3,800; reclaim zone 3,980–4,020; broad overhead zone 4,100–4,200.
The current-price area is not presented as proven support. No specific entry,
stop loss, or guaranteed target is claimed from these zoomed-out screenshots.

Verified primary sources retrieved during the preceding analysis:

Archived statement PDF/text and the retrieved BLS calendar are in
`docs/destino-sources/` for review without browsing.

- [Fed statement, 28 October 2026](https://www.federalreserve.gov/monetarypolicy/files/monetary20261028a1.pdf):
  10–2 to hold at 3.75–4.00%; Cook and Hammack prefer +25 basis points;
  inflation remains elevated. “Hold does not imply easing” is our interpretation.
- [BLS November 2026 calendar](https://www.bls.gov/schedule/2026/11_sched.htm):
  JOLTS Sep: 3 Nov, 10:00 ET = 22:00 WIB; productivity/costs preliminary Q3:
  5 Nov, 08:30 ET = 20:30 WIB; October employment: 6 Nov, 08:30 ET = 20:30 WIB.
  US standard time applies in this week. The calendar can be revised.
- [WSJ headline via Yahoo](https://finance.yahoo.com/m/5dcf998d-21c7-3395-9d43-2a07378da7fe/gold-and-silver-futures-fall.html):
  “Gold and Silver Futures Fall to 1-Year Lows”.
- [Barron's headline via Yahoo](https://finance.yahoo.com/m/4d5c1d4e-32f0-3fab-8e35-61dc0af1e9d0/gold-just-hit-a-new-low..html):
  “Gold Just Hit a New Low. Here's Where Traders Are Finding Safety Instead.”
  Only the dated headline records were available, not full articles. The film
  therefore describes a sample of headlines, never a measured public consensus.

GC=F futures were cross-checked separately, but their exact prices are not used
as spot XAUUSD levels. No unverified ISM date or consensus estimate is included.
No simple causal claim that rising yields caused the selloff is made.

## Sound and reference rights

The Indonesian voice is synthetic and uses a generic local TTS speaker. It does
not imitate a person. Music and sound design are procedurally composed for this
film by `scripts/destino-audio.py`; the uploaded reference's audio is not copied.
Rendered stems are included, so the TTS model is not needed for Remotion playback.
See `public/destino/VOICE-NOTES.md` for the exact voice model provenance.
The user supplied motion reference is for study only and is not redistributed.
Bang Motion skill: `.agents/skills/bang-motion/SKILL.md` (MIT, Bang Tutorial).

No deployment, social publication, or environment reconfiguration is performed.
