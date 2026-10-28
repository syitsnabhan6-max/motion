import React from "react";
import { Logo, Gold } from "./Brand";
import { m, clamp, spring } from "./motion";
const closes = Array.from(
  { length: 64 },
  (_, i) =>
    425 +
    Math.sin(i * 0.22) * 76 +
    Math.cos(i * 0.49) * 34 -
    i * 0.5 +
    Math.sin(i * 1.82 + 1) * 22,
);
closes[62] = 413;
closes[63] = 380;
const candles = closes.map((c, i) => {
  const o = i ? closes[i - 1] : c + 12;
  return {
    o,
    c,
    h: Math.min(o, c) - 10 - 8 * Math.sin(i * 0.9) ** 2,
    l: Math.max(o, c) + 12 + 10 * Math.cos(i) ** 2,
  };
});
export const Chart: React.FC<{ t: number }> = ({ t }) => {
  const progress = m(t, 10, 16.65, 48, 64),
    signal = spring(t, 17.05),
    entry = m(t, 19.1, 20),
    sl = m(t, 20, 20.85),
    tp = m(t, 20.65, 21.5);
  return (
    <div
      style={{
        position: "relative",
        width: 1500,
        height: 790,
        borderRadius: 26,
        overflow: "hidden",
        background: "linear-gradient(125deg,#17171b,#0e0f14 65%)",
        border: "1.5px solid #635358",
        boxShadow: "0 30px 100px #0009,0 0 70px #df243018",
      }}
    >
      <div
        style={{
          height: 78,
          display: "flex",
          alignItems: "center",
          padding: "0 28px",
          gap: 19,
          borderBottom: "1px solid #ffffff12",
          background: "#ffffff03",
        }}
      >
        <Gold size={46} />
        <b style={{ fontSize: 26 }}>XAUUSD</b>
        <span style={{ color: "#8d8994", fontSize: 22 }}>⌄</span>
        <div
          style={{
            height: 28,
            width: 1,
            background: "#ffffff20",
            margin: "0 12px",
          }}
        />
        <span style={{ color: "#c9c5ce", fontSize: 23 }}>15m</span>
        <span style={{ color: "#7b7782", fontSize: 23 }}>1h</span>
        <span style={{ color: "#7b7782", fontSize: 23 }}>4h</span>
        <div style={{ flex: 1 }} />
        <Logo size={34} />
        <span style={{ fontSize: 23, letterSpacing: -0.4 }}>Cupang Archer</span>
        <span
          style={{
            marginLeft: 12,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#ec3949",
          }}
        />
      </div>
      <svg
        width="1500"
        height="650"
        viewBox="0 0 1500 650"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="entry-fill" x2="0" y2="1">
            <stop stopColor="#e73f59" stopOpacity=".2" />
            <stop offset="1" stopColor="#e73f59" stopOpacity=".06" />
          </linearGradient>
          <clipPath id="plot">
            <rect x="56" y="30" width="1325" height="570" />
          </clipPath>
        </defs>
        {[100, 180, 260, 340, 420, 500, 580].map((y, i) => (
          <g key={y}>
            <line
              x1="55"
              x2="1378"
              y1={y}
              y2={y}
              stroke="#ffffff"
              strokeOpacity=".055"
            />
            <text
              x="1400"
              y={y + 6}
              fill="#686570"
              fontSize="18"
              fontFamily="Inter"
            >
              {(2760 - i * 5).toFixed(2)}
            </text>
          </g>
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line
            key={i}
            x1={80 + i * 140}
            x2={80 + i * 140}
            y1="30"
            y2="600"
            stroke="#ffffff"
            strokeOpacity=".04"
          />
        ))}
        <g clipPath="url(#plot)">
          <rect
            x="70"
            y="364"
            width={1260 * entry}
            height="34"
            fill="url(#entry-fill)"
          />
          {[
            { p: entry, y: 380, c: "#f27b89" },
            { p: sl, y: 510, c: "#ed6270" },
            { p: tp, y: 230, c: "#7ed4bb" },
          ].map((r, i) => (
            <line
              key={i}
              x1="70"
              x2={70 + 1260 * r.p}
              y1={r.y}
              y2={r.y}
              stroke={r.c}
              strokeWidth="1.8"
              opacity={r.p}
              strokeDasharray={i === 0 ? "6 7" : undefined}
            />
          ))}
          {candles.map((v, i) => {
            const p = clamp(progress - i);
            const close = v.o + (v.c - v.o) * p;
            const x = 78 + i * 17;
            const green = v.c < v.o;
            return (
              <g key={i} opacity={p > 0 ? 1 : 0}>
                <line
                  x1={x}
                  x2={x}
                  y1={v.o + (v.h - v.o) * p}
                  y2={v.o + (v.l - v.o) * p}
                  stroke={green ? "#8dd4c0" : "#c66c7c"}
                  strokeWidth="1.5"
                />
                <rect
                  x={x - 4.4}
                  width="8.8"
                  y={Math.min(v.o, close)}
                  height={Math.max(1, Math.abs(close - v.o))}
                  rx="1"
                  fill={green ? "#8dd4c0" : "#c66c7c"}
                />
                <rect
                  x={x - 4.4}
                  width="8.8"
                  y={603 - (18 + Math.sin(i * 2.1) ** 2 * 44) * p}
                  height={(18 + Math.sin(i * 2.1) ** 2 * 44) * p}
                  fill={green ? "#8dd4c0" : "#c66c7c"}
                  opacity=".14"
                />
              </g>
            );
          })}
        </g>
        {t > 17.05 && (
          <g transform={`translate(1149 435) scale(${signal})`}>
            <path d="M0 -18L-8 -6H8Z" fill="#92dfc2" />
            <rect x="-36" y="-7" width="72" height="38" rx="9" fill="#92dfc2" />
            <text
              x="0"
              y="19"
              textAnchor="middle"
              fill="#13382c"
              fontFamily="Inter"
              fontSize="21"
              fontWeight="700"
            >
              BUY
            </text>
          </g>
        )}
        {t > 17.05 && t < 18.6 && (
          <circle
            cx="1149"
            cy="380"
            r={16 + m(t, 17.05, 18.6) * 90}
            stroke="#a8ffe0"
            strokeWidth="2"
            fill="none"
            opacity={1 - m(t, 17.05, 18.6)}
          />
        )}
        {[
          { p: entry, y: 380, c: "#ffc0c5", s: "Area entry" },
          { p: sl, y: 510, c: "#ef8791", s: "SL" },
          { p: tp, y: 230, c: "#99dcc5", s: "TP" },
        ].map((r, i) => (
          <g
            key={i}
            opacity={r.p}
            transform={`translate(${1275 + (1 - r.p) * 40} ${r.y})`}
          >
            <rect
              x="-65"
              y="-18"
              width="122"
              height="36"
              rx="7"
              fill="#18191e"
              stroke={r.c}
              strokeOpacity=".35"
            />
            <text
              x="-4"
              y="7"
              textAnchor="middle"
              fill={r.c}
              fontFamily="Inter"
              fontWeight="500"
              fontSize="20"
            >
              {r.s}
            </text>
          </g>
        ))}
        {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"].map((s, i) => (
          <text
            key={s}
            x={90 + i * 235}
            y="633"
            fill="#686570"
            fontSize="18"
            fontFamily="Inter"
          >
            {s}
          </text>
        ))}
      </svg>
      <div
        style={{
          display: "flex",
          padding: "4px 31px",
          gap: 30,
          fontSize: 18,
          color: "#77747f",
        }}
      >
        <span>Gold / US Dollar</span>
        <span style={{ marginLeft: "auto" }}>Ilustrasi tampilan Archer</span>
      </div>
    </div>
  );
};
