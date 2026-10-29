import React from "react";
import { Logo } from "./Brand";
import { m, mix, path, win, out } from "./motion";
import { Words } from "./Titles";
export const Coin: React.FC<{
  size: number;
  angle?: number;
  tilt?: number;
  white?: boolean;
  t: number;
}> = ({ size, angle = 0, tilt = 0, white = true, t }) => (
  <div
    style={{
      width: size,
      height: size,
      position: "relative",
      transform: `perspective(900px) rotateY(${angle}deg) rotateX(${tilt}deg) rotateZ(-9deg)`,
      transformStyle: "preserve-3d",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: -size * 0.23,
        borderRadius: "50%",
        background:
          "radial-gradient(circle,#ffafbb44,#ff244c33 45%,transparent 72%)",
        filter: "blur(12px)",
        transform: "translateZ(-20px)",
      }}
    />
    {[0, 1, 2, 3, 4].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          transform: `translateZ(${i * 2}px)`,
          border: "1px solid #ffe0e777",
          background:
            i === 4
              ? white
                ? "linear-gradient(140deg,#fff,#fff7fa 55%,#cbbac0)"
                : "radial-gradient(circle at 30% 20%,#ff8fa1,#cd203f 48%,#450919)"
              : "linear-gradient(100deg,#9d475b,#fff2f7 35%,#892b45)",
          boxShadow:
            i === 0
              ? "0 0 24px #ff385ea0,0 0 70px #ff24445c,0 25px 50px #09030688"
              : undefined,
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "translateZ(11px)",
        filter: "drop-shadow(0 0 9px #ff34594d)",
      }}
    >
      <Logo size={size * 0.69} white={!white} />
    </div>
    <div
      style={{
        position: "absolute",
        inset: 4,
        border: "2px solid #ffffffa0",
        borderRadius: "50%",
        transform: "translateZ(12px)",
        boxShadow: "inset 0 0 14px #fff4",
      }}
    />
  </div>
);
export const Intro: React.FC<{ t: number }> = ({ t }) => {
  const settle = m(t, 4.5, 5.65),
    leave = m(t, 7.4, 8.5);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - leave }}>
      <div
        style={{
          position: "absolute",
          left: 330,
          right: 330,
          top: path(t, [0, 1.6, 2.5], [210, 210, 145]),
          textAlign: "center",
          transform: `scale(${m(t, 1.6, 2.5, 1, 0.62)})`,
        }}
      >
        <Words compact text="Trading" t={t} at={0.2} leave={4.1} size={114} />
      </div>
      <Words
        compact
        text="Dengan arah yang jelas"
        t={t}
        at={2.05}
        leave={4.1}
        size={76}
        style={{
          position: "absolute",
          top: 270,
          left: 300,
          right: 300,
          textAlign: "center",
        }}
      />
      {[0, 1, 2, 3].map((i) => {
        const pos = [
          [340, 380, 156],
          [1400, 200, 144],
          [1010, 65, 90],
          [1630, 650, 290],
        ][i];
        const s = mix(pos[2], i === 0 ? 162 : pos[2] * 0.6, settle);
        const x = mix(
          pos[0] + Math.sin(t * 0.85 + i) * 22,
          i === 0 ? 1100 : pos[0] + (i === 1 ? 400 : 0),
          settle,
        );
        const y = mix(
          pos[1] + Math.cos(t * 0.75 + i) * 15,
          i === 0 ? 300 : pos[1] - 220,
          settle,
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - s / 2,
              top: y - s / 2,
              opacity: i === 0 ? 1 - m(t, 5.5, 5.9) : 1 - settle,
              filter:
                i === 3 ? "blur(11px)" : i === 2 ? "blur(1.4px)" : undefined,
            }}
          >
            <Coin
              size={s}
              t={t}
              angle={mix(
                [-24, 26, 35, -30][i] + Math.sin(t * 0.7 + i) * 9,
                0,
                settle,
              )}
              tilt={mix(12, 0, settle)}
            />
          </div>
        );
      })}
      {t > 4.3 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: settle,
            transform: `scale(${1 + leave * 0.6})`,
            transformOrigin: "1100px 300px",
          }}
        >
          <svg width="1800" height="600" style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="panelRed">
                <stop stopColor="#a3243e" stopOpacity=".05" />
                <stop offset=".8" stopColor="#ed3753" stopOpacity=".32" />
                <stop offset="1" stopColor="#ffb4c1" stopOpacity=".75" />
              </linearGradient>
              <filter
                id="panelGlow"
                x="-40%"
                y="-60%"
                width="180%"
                height="220%"
              >
                <feGaussianBlur stdDeviation="14" />
              </filter>
            </defs>
            <path
              d="M-50 -120H1100V182 C1100 208 988 208 988 300 C988 392 1100 392 1100 418V720H-50Z"
              fill="url(#panelRed)"
              stroke="#ff9aaf"
              strokeWidth="2"
            />
            <path
              d="M1100 -120V182 C1100 208 988 208 988 300 C988 392 1100 392 1100 418V720"
              fill="none"
              stroke="#ff6987"
              strokeWidth="14"
              opacity=".6"
              filter="url(#panelGlow)"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              left: 1019,
              top: 219,
              opacity: m(t, 5.5, 5.9),
            }}
          >
            <Coin size={162} t={t} white={false} />
          </div>
          {["Konfirmasi", "Entry", "SL & TP"].map((word, i) => {
            const p = out(t, 4.9 + i * 0.22, 0.65);
            return (
              <div
                key={word}
                style={{
                  position: "absolute",
                  left: 440,
                  top: 125 + i * 140,
                  width: 420,
                  boxSizing: "border-box",
                  textAlign: "center",
                  transform: `translateY(${(1 - p) * 18}px) scale(${0.9 + 0.1 * p})`,
                  opacity: p,
                  background:
                    "linear-gradient(110deg,#ffffff03,#ffffff19,#ffffff05)",
                  border: "1px solid #ffc5d21f",
                  padding: "12px 40px",
                  borderRadius: 8,
                  fontSize: 52,
                  lineHeight: 1.15,
                  fontWeight: 550,
                  letterSpacing: -1.5,
                  textShadow: "0 0 20px #ffd2df77",
                }}
              >
                {word}
              </div>
            );
          })}
          <div
            style={{
              position: "absolute",
              left: 1260,
              top: 255,
              fontSize: 40,
              fontWeight: 500,
              letterSpacing: -1,
              opacity: win(t, 5.8, 7.35),
              textShadow: "0 0 28px #ff879d",
            }}
          >
            Cupang
            <br />
            <span style={{ color: "#ffb7c8" }}>Archer</span>
          </div>
        </div>
      )}
    </div>
  );
};
