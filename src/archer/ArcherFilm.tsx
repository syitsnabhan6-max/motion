import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import { Atmosphere } from "./Atmosphere";
import { Intro } from "./Intro";
import { Chart } from "./Chart";
import { Words } from "./Titles";
import { Phone, phoneBlur } from "./Phone";
import { Closing } from "./Closing";
import { m, path, win } from "./motion";
// Master layout is designed at 1800 × 600. All timing is measured in seconds.
export const ArcherFilm: React.FC = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = f / fps;
  const times = [
    7.7, 9.4, 10.2, 12.6, 14.2, 15.75, 17.6, 19, 20, 22.65, 23.5, 24.8, 25.8,
    27.4, 28.4, 29.3,
  ];
  const s = path(
    t,
    times,
    [
      0.36, 0.93, 1, 0.98, 1, 1.2, 1.2, 0.97, 0.97, 0.75, 0.75, 0.66, 0.66,
      0.75, 0.75, 0.4,
    ],
  );
  const x = path(
    t,
    times,
    [
      1100, 900, 900, 900, 880, 740, 740, 900, 900, 690, 690, 360, 360, 690,
      690, 250,
    ],
  );
  const y = path(
    t,
    times,
    [
      340, 310, 305, 305, 305, 300, 300, 305, 305, 305, 305, 315, 315, 305, 305,
      670,
    ],
  );
  const ry = path(
    t,
    times,
    [-25, -7, 0, 3, 1, -3, -3, 0, 0, 4, 4, 9, 9, 4, 4, 15],
  );
  const rx = path(t, times, [20, 6, 0, 1, 0, 0, 0, 0, 0, 2, 2, 3, 3, 2, 2, 12]);
  const rz = path(
    t,
    times,
    [-7, -2, 0, 0.5, 0, -0.5, -0.5, 0, 0, -1, -1, -3, -3, -1, -1, -8],
  );
  const headlineBlur =
    win(t, 8, 9.15) * 10 +
    win(t, 10.65, 11.95) * 10 +
    win(t, 14.05, 14.85) * 10 +
    win(t, 19.3, 20.05) * 9;
  const textDim =
    win(t, 8, 9.15) * 0.3 +
    win(t, 10.65, 11.95) * 0.4 +
    win(t, 14.05, 14.85) * 0.4 +
    win(t, 19.3, 20.05) * 0.35;
  return (
    <AbsoluteFill
      style={{
        fontFamily: "Inter, sans-serif",
        color: "#fff8fc",
        overflow: "hidden",
      }}
    >
      <Atmosphere t={t} />
      {t > 7.7 && t < 29.4 && (
        <div
          style={{
            position: "absolute",
            left: x - 720,
            top: y - 235,
            width: 1440,
            height: 470,
            transform: `perspective(2400px) scale(${s}) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
            filter: `blur(${headlineBlur + phoneBlur(t)}px)`,
            opacity: m(t, 7.7, 8.6) * (1 - m(t, 28.5, 29.3)) * (1 - textDim),
          }}
        >
          <Chart t={t} />
        </div>
      )}
      {t < 8.6 && <Intro t={t} />}
      {t > 8 && t < 9.8 && (
        <Words
          text="Cupang Archer"
          t={t}
          at={8.15}
          leave={9.15}
          size={76}
          style={{
            position: "absolute",
            left: 300,
            right: 300,
            top: 245,
            textAlign: "center",
          }}
        />
      )}
      {t > 10.5 && t < 12.6 && (
        <Words
          text="Menunggu konfirmasi"
          t={t}
          at={10.75}
          leave={11.95}
          size={69}
          style={{
            position: "absolute",
            left: 220,
            right: 220,
            top: 255,
            textAlign: "center",
          }}
        />
      )}
      {t > 14 && t < 15.4 && (
        <Words
          text="Konfirmasi hadir"
          t={t}
          at={14.1}
          leave={14.85}
          size={72}
          style={{
            position: "absolute",
            left: 250,
            right: 250,
            top: 250,
            textAlign: "center",
          }}
        />
      )}
      {t > 19.2 && t < 20.6 && (
        <Words
          text="Di TradingView"
          t={t}
          at={19.4}
          leave={20.05}
          size={72}
          style={{
            position: "absolute",
            left: 250,
            right: 250,
            top: 250,
            textAlign: "center",
          }}
        />
      )}
      {t > 20 && t < 29.3 && <Phone t={t} />}
      {t > 28.6 && <Closing t={t} />}
    </AbsoluteFill>
  );
};
