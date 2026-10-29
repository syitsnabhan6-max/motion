import React from "react";
import { Coin } from "./Intro";
import { m, path, win } from "./motion";
import { Words } from "./Titles";
export const Closing: React.FC<{ t: number }> = ({ t }) => {
  const p = m(t, 29.8, 31.2),
    start = m(t, 28.6, 29.65);
  const w = 148 + p * 365;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: start }}>
      <Words
        text="Archer Indicator"
        t={t}
        at={29.25}
        size={58}
        style={{
          position: "absolute",
          left: 300,
          right: 300,
          top: 86,
          textAlign: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 900 - w / 2,
          top: 218,
          width: w,
          height: 148,
          borderRadius: 90,
          transform: `scale(${0.72 + 0.28 * start})`,
          background:
            "linear-gradient(115deg,#fa456b66,#a5123866 55%,#300a1faa)",
          border: "1.5px solid #ffcfdf8a",
          boxShadow:
            "inset 0 0 0 7px #ffffff05,inset 0 2px 5px #ffe3ed66,0 0 35px #ff416e55,0 0 90px #f92e512a",
          overflow: "visible",
        }}
      >
        {[1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: -i * 13,
              borderRadius: 120,
              border: `${i === 1 ? 1.5 : 1}px solid #ffb3c${i === 1 ? "b44" : "b20"}`,
              boxShadow: i === 1 ? "0 0 20px #ff3f6540" : undefined,
              opacity: 0.65 + 0.15 * Math.sin(t * 1.8),
            }}
          />
        ))}
        <div style={{ position: "absolute", left: 10, top: 10 }}>
          <Coin size={126} t={t} white={false} angle={m(t, 28.7, 30, -55, 0)} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 165,
            top: 30,
            width: 320,
            opacity: m(t, 30.3, 31.1),
            transform: `translateX(${m(t, 30.3, 31.1, -25, 0)}px)`,
            fontSize: 43,
            fontWeight: 550,
            letterSpacing: -1.4,
            lineHeight: 1.06,
            textShadow: "0 0 16px #ffc4dd77",
          }}
        >
          Coba
          <br />
          Sekarang
        </div>
        <svg
          width={w + 80}
          height="208"
          style={{
            position: "absolute",
            left: -40,
            top: -30,
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <defs>
            <filter
              id="ctaBloom"
              x="-500%"
              y="-500%"
              width="1100%"
              height="1100%"
            >
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>
          <circle
            cx={40 + w * (0.5 + 0.5 * Math.sin((t - 30) * 1.5))}
            cy={30 + 74 - 74 * Math.cos((t - 30) * 1.5)}
            r="13"
            fill="#ff9dbd"
            opacity=".7"
            filter="url(#ctaBloom)"
          />
          <circle
            cx={40 + w * (0.5 + 0.5 * Math.sin((t - 30) * 1.5))}
            cy={30 + 74 - 74 * Math.cos((t - 30) * 1.5)}
            r="3"
            fill="#ffe7f4"
          />
        </svg>
      </div>
      <Words
        text="Permudah Jalan Trading Anda Bersama Cupang."
        t={t}
        at={31}
        size={27}
        style={{
          position: "absolute",
          top: 432,
          left: 210,
          right: 210,
          textAlign: "center",
          fontWeight: 400,
          letterSpacing: -0.6,
          color: "#edc3d0",
        }}
      />
    </div>
  );
};
