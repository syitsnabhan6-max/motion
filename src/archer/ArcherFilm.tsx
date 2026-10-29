import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import { Logo } from "./Brand";
import { Ball, Bell, Check, SphereSkin, Title } from "./v5/Primitives";
import { Signal } from "./v5/Signal";
import { Notification, Setup } from "./v5/Setup";
import { Phone } from "./v5/Phone";
import { C, heroPose, move } from "./v5/motion";

// Revision 5: one orb carries the product story, from signal to notification.
// Native 3:1 layout. PULSE's focus changes, restrained text and glossy depth remain.
export const ArcherFilm: React.FC = () => {
  const t = useCurrentFrame() / useVideoConfig().fps,
    p = heroPose(t);
  const intro = 1 - move(t, 3.25, 5.1),
    end = move(t, 29.1, 30.5);
  return (
    <AbsoluteFill
      style={{
        background: C.black,
        fontFamily: "Inter, sans-serif",
        color: C.white,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -180,
          background: `radial-gradient(ellipse at ${72 + Math.sin(t * 0.25) * 8}% ${72 + Math.sin(t * 0.3) * 10}%,#9f122635,transparent 53%),radial-gradient(ellipse at ${33 + Math.cos(t * 0.15) * 12}% 115%,#c51e3228,transparent 54%),linear-gradient(115deg,#060609,#11090e 72%,#170a12)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 760 + Math.sin(t * 0.2) * 100,
          top: 270,
          width: 1100,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(ellipse,#c52a3c24,transparent 68%)",
          transform: `rotate(${-14 + Math.sin(t * 0.14) * 6}deg)`,
        }}
      />
      <svg
        width="1800"
        height="600"
        style={{ position: "absolute", opacity: 0.24 }}
      >
        <defs>
          <linearGradient id="ambientArc">
            <stop stopColor="#711d2e" stopOpacity="0" />
            <stop offset=".6" stopColor="#ce3b4d" stopOpacity=".48" />
            <stop offset="1" stopColor="#631b31" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse
          cx={1190 + Math.sin(t * 0.16) * 85}
          cy="630"
          rx="970"
          ry="360"
          stroke="url(#ambientArc)"
          strokeWidth="1"
          fill="none"
          transform={`rotate(${-12 + Math.sin(t * 0.12) * 5} 1100 600)`}
        />
        <ellipse
          cx="1180"
          cy="620"
          rx="1030"
          ry="405"
          stroke="url(#ambientArc)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
      {/* Floor and orbit make the opening impacts spatially readable. */}
      <div
        style={{
          position: "absolute",
          left: p.x - 230,
          top: 497,
          width: 460,
          height: 44,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse,#f0324040,#0007 40%,transparent 70%)",
          filter: "blur(12px)",
          opacity: intro * 0.8,
          transform: `scale(${0.45 + Math.max(0, p.y) / 600},1)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 1000,
          top: 80,
          width: 670,
          height: 430,
          borderRadius: "50%",
          border: "1px solid #ff647e35",
          transform: `perspective(1600px) rotateX(66deg) rotateY(-12deg) rotateZ(${-30 + t * 5}deg)`,
          opacity: intro * 0.7,
          boxShadow: "0 0 15px #f0324010",
        }}
      />
      {intro > 0 && (
        <>
          <div
            style={{
              position: "absolute",
              left: 1580 + Math.sin(t * 0.75) * 25,
              top: 65 + Math.cos(t * 0.65) * 18,
              opacity: intro,
              filter: "blur(.7px)",
            }}
          >
            <Ball t={t} size={77} white />
          </div>
          <div
            style={{
              position: "absolute",
              left: 1660 - Math.sin(t * 0.5) * 28,
              top: 430 + Math.cos(t * 0.6) * 22,
              opacity: intro,
              filter: "blur(3px)",
            }}
          >
            <Ball t={t} size={207} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 955 + Math.cos(t * 0.5) * 19,
              top: 72 + Math.sin(t * 0.7) * 13,
              opacity: intro * 0.75,
            }}
          >
            <Ball t={t} size={39} />
          </div>
        </>
      )}
      {t >= 21.1 && t < 29.6 && <Phone t={t} />}
      <div
        style={{
          position: "absolute",
          left: p.x - p.w / 2,
          top: p.y - p.h / 2,
          width: p.w,
          height: p.h,
          borderRadius:
            p.open > 0.99
              ? 48
              : (Math.min(p.w, p.h) / 2) * (1 - p.open) + 48 * p.open,
          overflow: "hidden",
          transform: `perspective(2500px) scale(${p.scale * p.sx},${p.scale * p.sy}) rotateY(${p.ry}deg) rotateZ(${p.rz}deg)`,
          boxShadow: `inset 0 1px 2px #ffe5eb66,inset 0 -1px 2px #ff829f55,0 35px 85px #0008,0 0 ${30 + 25 * (1 - p.open)}px #f0324015`,
          border: "1px solid #e7899a4a",
          boxSizing: "border-box",
        }}
      >
        <SphereSkin t={t} open={p.open} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            opacity: 1 - move(p.open, 0.12, 0.5),
            filter: "drop-shadow(0 3px 4px #5e0e2444)",
            transform: `rotate(${p.rz * -1}deg)`,
          }}
        >
          {t < 7.8 || t >= 28.2 ? (
            <Logo size={Math.min(p.w, p.h) * 0.56} white />
          ) : t < 21.1 ? (
            <Check size={Math.min(p.w, p.h) * 0.5} />
          ) : (
            <Bell size={Math.min(p.w, p.h) * 0.46} />
          )}
        </div>
        {t > 3.65 && t < 11.55 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: move(p.open, 0.35, 0.82),
            }}
          >
            <Signal t={t} />
          </div>
        )}
        {t >= 11.55 && t < 21 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: move(p.open, 0.35, 0.82),
            }}
          >
            <Setup t={t} />
          </div>
        )}
        {t >= 23.1 && t < 30.3 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: move(p.open, 0.72, 0.98),
            }}
          >
            <Notification t={t} />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "inherit",
            boxShadow: `inset 0 ${1 + 8 * (1 - p.open)}px ${2 + 18 * (1 - p.open)}px #ffffff15,inset 0 -${1 + 12 * (1 - p.open)}px ${2 + 18 * (1 - p.open)}px #07010b80`,
          }}
        />
      </div>
      <Title
        t={t}
        at={0.2}
        until={3.2}
        lines={["Sebelum entry", "Temukan arah"]}
        x={130}
        y={185}
        size={103}
      />
      <Title
        t={t}
        at={4.65}
        until={7.25}
        lines={["Tunggu", "konfirmasi"]}
        x={110}
        y={211}
        size={71}
        direction="left"
      />
      <Title
        t={t}
        at={7.85}
        until={10.4}
        lines={["Sinyal", "terkonfirmasi"]}
        x={95}
        y={213}
        size={60}
      />
      <Title
        t={t}
        at={12.6}
        until={14.55}
        lines={["Entry", "terukur"]}
        x={106}
        y={201}
        size={70}
        direction="left"
      />
      <Title
        t={t}
        at={15}
        until={16.6}
        lines={["Batas risiko", "jelas"]}
        x={95}
        y={222}
        size={61}
      />
      <Title
        t={t}
        at={17}
        until={19.55}
        lines={["Target", "ditetapkan"]}
        x={106}
        y={207}
        size={66}
        direction="left"
      />
      <Title
        t={t}
        at={20.8}
        until={23.15}
        lines={["Tetap", "terhubung"]}
        x={145}
        y={200}
        size={88}
      />
      <Title
        t={t}
        at={24.85}
        until={27.7}
        lines={["Langsung lewat notifikasi"]}
        x={310}
        y={107}
        size={59}
        direction="left"
        accent={-1}
      />
      <div
        style={{
          position: "absolute",
          left: 802,
          top: 207,
          opacity: end,
          transform: `translateX(${(1 - end) * 75}px)`,
        }}
      >
        <div
          style={{
            fontSize: 89,
            fontWeight: 500,
            letterSpacing: "-.06em",
            lineHeight: 1.1,
          }}
        >
          Cupang <span style={{ color: C.light }}>Archer</span>
        </div>
        <div
          style={{
            marginTop: 34,
            display: "inline-flex",
            alignItems: "center",
            gap: 50,
            borderRadius: 40,
            padding: "16px 26px",
            border: "1px solid #ff9eae40",
            background: "linear-gradient(115deg,#ec314124,#f0324009)",
            fontSize: 25,
            color: "#f5d9de",
            boxShadow: "inset 0 1px 0 #ffffff13",
          }}
        >
          Coba sekarang
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 20L20 5M6 5H20V19" />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
