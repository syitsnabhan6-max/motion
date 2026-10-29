import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import { Objects3D } from "./Objects3D";
import { ProductUI } from "./UI";
import { C, m, out, vis, path } from "./motion";
const Head: React.FC<{
  t: number;
  a: number;
  b: number;
  lines: string[];
  y: number;
  size?: number;
  x?: number;
  w?: number;
  align?: "center" | "left";
  accent?: number;
}> = ({
  t,
  a,
  b,
  lines,
  y,
  size = 104,
  x = 100,
  w = 620,
  align = "left",
  accent = -1,
}) => {
  if (t < a || t > b) return null;
  const exit = m(t, b - 0.4, b);
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        width: w,
        textAlign: align,
        lineHeight: 1.05,
        fontSize: size,
        fontWeight: 600,
        letterSpacing: "-.055em",
        opacity: 1 - exit,
        transform: `translateY(${-exit * 25}px)`,
      }}
    >
      {lines.map((line, i) => {
        const p = out(t, a + i * 0.16, a + 0.8 + i * 0.16);
        return (
          <div
            key={line}
            style={{
              color: i === accent ? C.lavender : C.white,
              transform: `translateY(${(1 - p) * 48}px)`,
              opacity: p,
              filter: `blur(${(1 - p) * 5}px)`,
              paddingBottom: 10,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};
// Direct adaptation of src/pulse/PulseFilm.tsx. All scene gates and title times are retained.
export const CupangFilm: React.FC = () => {
  const t = useCurrentFrame() / useVideoConfig().fps;
  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        fontFamily: "Inter",
        color: C.white,
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile("cupang/soundtrack.m4a")} />
      <div
        style={{
          position: "absolute",
          inset: -200,
          background: `radial-gradient(ellipse at ${48 + Math.sin(t * 0.28) * 12}% ${55 + Math.cos(t * 0.16) * 15}%,#b51b322c,transparent 54%),radial-gradient(ellipse at 75% 90%,#ff526518,transparent 45%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 550,
          top: 320,
          width: 1380,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse,#f0324018,transparent 65%)",
          transform: `scale(${1 + Math.sin(t * 0.4) * 0.1})`,
        }}
      />
      {(t < 3.7 || t > 18) && <Objects3D t={t} />}
      <Head
        t={t}
        a={0.15}
        b={3.25}
        lines={["Sebelum entry.", "Lihat polanya."]}
        y={165}
        size={96}
        w={700}
        accent={1}
      />
      {t > 2.7 && t < 19.1 && <ProductUI t={t} />}
      <Head
        t={t}
        a={3.4}
        b={6.9}
        lines={["Konfirmasi dulu.", "Baru entry."]}
        y={160}
        size={59}
        w={430}
        accent={1}
      />
      <Head
        t={t}
        a={7.3}
        b={10.1}
        lines={["Entry, SL, TP.", "Satu rencana."]}
        y={285}
        size={59}
        w={430}
        align="left"
        accent={1}
      />
      <Head
        t={t}
        a={10.5}
        b={12.9}
        lines={["Tentukan", "levelnya."]}
        y={140}
        size={69}
        w={420}
        accent={1}
      />
      <Head
        t={t}
        a={14.5}
        b={18.3}
        lines={["Rencana dulu.", "Baru entry."]}
        y={155}
        size={59}
        w={420}
        accent={1}
      />
      <div
        style={{
          position: "absolute",
          top: 155,
          left: 100,
          width: 750,
          textAlign: "left",
          fontSize: 65,
          fontWeight: 500,
          letterSpacing: ".15em",
          opacity: out(t, 19.2, 20.4),
          transform: `translateY(${(1 - out(t, 19.2, 20.4)) * 50}px)`,
        }}
      >
        CUPANG ARCHER
      </div>
      <Head
        t={t}
        a={20.6}
        b={24.6}
        lines={["Baca sinyal.", "Bukan firasat."]}
        y={285}
        size={58}
        w={630}
        accent={1}
      />
      <div
        style={{
          position: "absolute",
          bottom: 59,
          left: 100,
          width: 680,
          textAlign: "left",
          fontSize: 24,
          color: "#987b84",
          letterSpacing: ".03em",
          opacity: out(t, 22, 23),
        }}
      >
        Trade With Cupang.
      </div>
      {/* Lens glint follows the selected object during the brand reveal. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 300,
          height: 1,
          background:
            "linear-gradient(90deg,transparent,#ff8a9c90,transparent)",
          opacity: Math.exp(-Math.pow((t - 19.2) / 0.42, 2)) * 0.35,
          boxShadow: "0 0 55px 10px #f0324055",
        }}
      />
    </AbsoluteFill>
  );
};
