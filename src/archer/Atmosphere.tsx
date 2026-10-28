import React from "react";
import { m } from "./motion";
export const Atmosphere: React.FC<{ t: number }> = ({ t }) => {
  const a = Math.sin(t * 0.27),
    b = Math.sin(t * 0.19 + 1);
  const dim = m(t, 9, 12, 1, 0.36) * m(t, 28, 31, 1, 2.3);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#080708",
      }}
    >
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="red-glow">
            <stop stopColor="#bd1429" />
            <stop offset=".48" stopColor="#640f1a" />
            <stop offset="1" stopColor="#16090d" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ribbon" x1="0" y1="0" x2=".3" y2="1">
            <stop stopColor="#ff6d73" stopOpacity=".33" />
            <stop offset=".24" stopColor="#b91a2a" stopOpacity=".28" />
            <stop offset=".85" stopColor="#29080e" stopOpacity="0" />
          </linearGradient>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="44" />
          </filter>
          <filter id="silk" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="32" />
          </filter>
        </defs>
        <g opacity={dim}>
          <ellipse
            cx={350 + a * 420}
            cy={130 + b * 140}
            rx="1000"
            ry="650"
            fill="url(#red-glow)"
          />
          <ellipse
            cx={1720 - a * 220}
            cy={950 + b * 120}
            rx="1100"
            ry="660"
            fill="url(#red-glow)"
          />
          <path
            d={`M-200 ${300 + a * 90} C400 ${-140 + b * 140} 660 ${650 + a * 140} 1140 ${260 + b * 140} S1800 ${200 - a * 200} 2160 100 L2100 730 C1400 840 400 350 -200 690Z`}
            fill="url(#ribbon)"
            filter="url(#soft)"
          />
          <path
            d={`M-200 ${900 + b * 90} C390 ${600 + a * 180} 880 ${1130 + b * 40} 1270 ${810 + a * 90} S1800 680 2110 920 L2100 1300 L-200 1300Z`}
            fill="url(#ribbon)"
            filter="url(#silk)"
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 45%,transparent 25%,#03030488 100%)",
        }}
      />
    </div>
  );
};
