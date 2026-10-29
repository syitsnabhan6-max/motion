import React from "react";
import { Logo, Gold, Bitcoin } from "./Brand";
import { m, clamp, spring } from "./motion";
const closes = Array.from(
  { length: 58 },
  (_, i) =>
    240 +
    Math.sin(i * 0.23) * 53 +
    Math.cos(i * 0.57) * 16 +
    Math.sin(i * 1.7) * 13,
);
closes[56] = 272;
closes[57] = 239;
const candles = closes.map((c, i) => {
  const o = i ? closes[i - 1] : c + 10;
  return {
    o,
    c,
    h: Math.min(o, c) - 7 - 5 * Math.sin(i) ** 2,
    l: Math.max(o, c) + 8 + 6 * Math.cos(i) ** 2,
  };
});
const labelStyle: React.CSSProperties = { fontSize: 15, color: "#8e8b99" };
export const Chart: React.FC<{ t: number }> = ({ t }) => {
  const progress = m(t, 10.3, 15.1, 50, 58),
    signal = spring(t, 15.45),
    entry = m(t, 16.4, 17.1),
    sl = m(t, 17.1, 17.85),
    tp = m(t, 17.75, 18.5);
  return (
    <div
      style={{
        position: "relative",
        width: 1440,
        height: 470,
        borderRadius: 19,
        background: "linear-gradient(130deg,#29232c,#12141c 40%,#19141d)",
        border: "1.5px solid #f2b5cb77",
        boxShadow:
          "0 1px 0 #fff7,inset 0 0 0 5px #ffffff04,0 12px 0 -5px #3a1b2c,0 14px 0 -5px #f4a4bc55,0 35px 60px #0009,0 0 60px #ef244b28",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 54,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 13,
          borderBottom: "1px solid #ffffff13",
          background: "linear-gradient(110deg,#ffffff0b,#ffffff02)",
        }}
      >
        <Logo size={28} />
        <b style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.5 }}>
          Archer
        </b>
        <span
          style={{
            fontSize: 12,
            color: "#d8a3b1",
            letterSpacing: 1.5,
            marginLeft: 5,
          }}
        >
          INDICATOR
        </span>
        <div
          style={{
            height: 20,
            width: 1,
            background: "#ffffff22",
            margin: "0 14px",
          }}
        />
        <Gold size={29} />
        <b style={{ fontSize: 15 }}>XAUUSD</b>
        <span style={labelStyle}>Gold / US Dollar</span>
        <div style={{ flex: 1 }} />
        <div
          style={{ display: "flex", gap: 22, fontSize: 13, color: "#bab2c0" }}
        >
          <span>Chart</span>
          <span>Watchlist</span>
          <span>Alerts</span>
        </div>
        <div
          style={{
            marginLeft: 20,
            padding: "7px 12px",
            border: "1px solid #fb496b77",
            background: "#9b20412b",
            borderRadius: 7,
            fontSize: 12,
            color: "#ffcad6",
          }}
        >
          Archer aktif
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 54,
          width: 48,
          bottom: 27,
          borderRight: "1px solid #ffffff12",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 22,
          paddingTop: 18,
          color: "#9b8c9e",
        }}
      >
        {Array.from({ length: 7 }, (_, i) => (
          <svg
            key={i}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          >
            {i === 0 ? (
              <path d="M10 1V19M1 10H19" />
            ) : i === 1 ? (
              <path d="M3 16L17 4M3 4V16H17" />
            ) : i === 2 ? (
              <path d="M2 5H18M2 10H14M2 15H10" />
            ) : i === 3 ? (
              <path d="M4 3H16M10 3V17M7 17H13" />
            ) : i === 4 ? (
              <rect x="4" y="4" width="12" height="12" rx="2" />
            ) : i === 5 ? (
              <path d="M2 14L7 6L11 12L18 3" />
            ) : (
              <circle cx="10" cy="10" r="6" />
            )}
          </svg>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 68,
          top: 66,
          display: "flex",
          gap: 19,
          alignItems: "center",
          fontSize: 12,
          color: "#b2a6b7",
        }}
      >
        <span
          style={{
            background: "#ff416c26",
            padding: "5px 9px",
            borderRadius: 5,
            color: "#ffd0dc",
          }}
        >
          15m
        </span>
        <span>1h</span>
        <span>4h</span>
        <span>1D</span>
        <span style={{ color: "#64606e" }}>│</span>
        <span>O 2738.0</span>
        <span>H 2742.1</span>
        <span>L 2737.2</span>
        <span style={{ color: "#c6f7e5" }}>C 2740.1</span>
      </div>
      <svg
        width="1184"
        height="390"
        viewBox="0 0 1184 390"
        style={{ position: "absolute", top: 53, left: 0 }}
      >
        <defs>
          <linearGradient id="areaBand" x2="0" y2="1">
            <stop stopColor="#f36588" stopOpacity=".26" />
            <stop offset="1" stopColor="#f36588" stopOpacity=".05" />
          </linearGradient>
          <linearGradient id="candleUp" x2="1" y2="1">
            <stop stopColor="#c5ffe9" />
            <stop offset="1" stopColor="#70cdb2" />
          </linearGradient>
          <linearGradient id="candleDown">
            <stop stopColor="#ffa1b8" />
            <stop offset="1" stopColor="#c66689" />
          </linearGradient>
          <clipPath id="clipChart">
            <rect x="60" y="65" width="1044" height="280" />
          </clipPath>
        </defs>
        {[85, 137, 189, 241, 293, 345].map((y, i) => (
          <g key={y}>
            <line
              x1="60"
              x2="1104"
              y1={y}
              y2={y}
              stroke="#c7c2d7"
              strokeOpacity=".09"
            />
            <text
              x="1113"
              y={y + 4}
              fill="#9d92aa"
              fontSize="11"
              fontFamily="Inter"
            >
              {(2755 - i * 5).toFixed(1)}
            </text>
          </g>
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={i}
            x1={80 + i * 127}
            x2={80 + i * 127}
            y1="65"
            y2="345"
            stroke="#c7c2d7"
            strokeOpacity=".065"
          />
        ))}
        <g clipPath="url(#clipChart)">
          <rect
            x="78"
            y="228"
            width={1018 * entry}
            height="23"
            fill="url(#areaBand)"
          />
          {[
            { p: entry, y: 239, c: "#ff8baa" },
            { p: sl, y: 320, c: "#ff7096" },
            { p: tp, y: 145, c: "#90e6c7" },
          ].map((r, i) => (
            <line
              key={i}
              x1="78"
              x2={78 + 1018 * r.p}
              y1={r.y}
              y2={r.y}
              stroke={r.c}
              strokeWidth="1.4"
              opacity={r.p}
              strokeDasharray={i === 0 ? "4 5" : undefined}
            />
          ))}
          {candles.map((v, i) => {
            const p = clamp(progress - i),
              close = v.o + (v.c - v.o) * p,
              x = 90 + i * 16,
              up = v.c < v.o;
            return (
              <g key={i} opacity={p > 0 ? 1 : 0}>
                <line
                  x1={x}
                  x2={x}
                  y1={v.o + (v.h - v.o) * p}
                  y2={v.o + (v.l - v.o) * p}
                  stroke={up ? "#b6f7dd" : "#f496b0"}
                  strokeWidth="1.1"
                />
                <rect
                  x={x - 4.2}
                  width="8.4"
                  y={Math.min(v.o, close)}
                  height={Math.max(1, Math.abs(close - v.o))}
                  fill={up ? "url(#candleUp)" : "url(#candleDown)"}
                  rx=".6"
                />
                <rect
                  x={x - 4.2}
                  y={346 - (10 + Math.sin(i * 2) ** 2 * 23) * p}
                  width="8.4"
                  height={(10 + Math.sin(i * 2) ** 2 * 23) * p}
                  fill={up ? "#8edcbf" : "#d983a1"}
                  opacity=".15"
                />
              </g>
            );
          })}
        </g>
        {t > 15.45 && (
          <g transform={`translate(1002 286) scale(${signal})`}>
            <path d="M0 -20L-7 -10H7Z" fill="#aff4d8" />
            <rect
              x="-30"
              y="-12"
              width="60"
              height="28"
              rx="7"
              fill="#aff4d8"
            />
            <text
              x="0"
              y="7"
              textAnchor="middle"
              fontSize="15"
              fontFamily="Inter"
              fontWeight="650"
              fill="#163c31"
            >
              BUY
            </text>
          </g>
        )}
        {t > 15.45 && t < 16.8 && (
          <circle
            cx="1002"
            cy="239"
            r={9 + m(t, 15.45, 16.8) * 55}
            fill="none"
            stroke="#b8ffe1"
            strokeWidth="1.6"
            opacity={1 - m(t, 15.45, 16.8)}
          />
        )}
        {[
          { a: 16.6, p: entry, y: 239, c: "#ffb0c6", s: "Area entry", w: 94 },
          { a: 17.35, p: sl, y: 320, c: "#ff8eaf", s: "SL", w: 48 },
          { a: 18, p: tp, y: 145, c: "#a9f0d6", s: "TP", w: 48 },
        ].map((r) => {
          const p = spring(t, r.a);
          return (
            <g
              key={r.s}
              opacity={clamp(p)}
              transform={`translate(1065 ${r.y}) scale(${Math.max(0, p)})`}
            >
              <rect
                x={-r.w / 2}
                y="-14"
                width={r.w}
                height="28"
                rx="7"
                fill="#292333"
                stroke={r.c}
                strokeOpacity=".7"
              />
              <text
                x="0"
                y="5"
                textAnchor="middle"
                fill={r.c}
                fontSize="14"
                fontFamily="Inter"
                fontWeight="550"
              >
                {r.s}
              </text>
            </g>
          );
        })}
        {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"].map((s, i) => (
          <text
            key={s}
            x={84 + i * 194}
            y="373"
            fill="#8b8195"
            fontSize="11"
            fontFamily="Inter"
          >
            {s}
          </text>
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 1184,
          top: 54,
          bottom: 27,
          width: 255,
          borderLeft: "1px solid #ffffff13",
          background: "linear-gradient(160deg,#30202e88,#161420)",
          padding: 20,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "#c6afc2",
            letterSpacing: 1.5,
            marginBottom: 16,
          }}
        >
          WATCHLIST
        </div>
        {[
          ["XAUUSD", "Gold / US Dollar"],
          ["BTC", "Bitcoin"],
        ].map((v, i) => (
          <div
            key={v[0]}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "13px 9px",
              margin: "0 -8px 4px",
              borderRadius: 9,
              background: i === 0 ? "#ff7da213" : "transparent",
              border: i === 0 ? "1px solid #ee86a02c" : "1px solid transparent",
            }}
          >
            {i === 0 ? <Gold size={30} /> : <Bitcoin size={25} />}
            <div>
              <b style={{ fontSize: 13, fontWeight: 550 }}>{v[0]}</b>
              <div style={{ fontSize: 10, color: "#b097ad", marginTop: 5 }}>
                {v[1]}
              </div>
            </div>
            <svg width="55" height="24" style={{ marginLeft: "auto" }}>
              <path
                d={
                  i === 0
                    ? "M0 21L9 15L17 17L25 8L34 12L43 3L55 8"
                    : "M0 5L9 12L17 8L25 19L34 14L43 22L55 12"
                }
                stroke={i === 0 ? "#b7c5ab" : "#c894ae"}
                strokeWidth="1.3"
                fill="none"
              />
            </svg>
          </div>
        ))}
        <div style={{ height: 1, background: "#ffffff11", margin: "18px 0" }} />
        <div style={{ fontSize: 12, color: "#c6afc2", letterSpacing: 1.5 }}>
          ARCHER
        </div>
        <div
          style={{
            display: "flex",
            gap: 7,
            alignItems: "center",
            fontSize: 12,
            color: t < 15.45 ? "#c6b8cb" : "#c3ffe4",
            marginTop: 15,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: t < 15.45 ? "#d38b9f" : "#b1f2d4",
              boxShadow: t > 15.45 ? "0 0 12px #afffd4" : undefined,
            }}
          />
          {t < 15.45 ? "Menunggu konfirmasi" : "BUY terkonfirmasi"}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 10,
            color: "#89788d",
            letterSpacing: 1,
          }}
        >
          SETUP
        </div>
        {[
          ["Area entry", entry],
          ["Stop loss", sl],
          ["Take profit", tp],
        ].map(([s, p]) => (
          <div
            key={String(s)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              padding: "7px 0",
              color: Number(p) > 0.5 ? "#eddae8" : "#63566d",
            }}
          >
            <span>{s}</span>
            <span>{Number(p) > 0.5 ? "Aktif" : "—"}</span>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 27,
          borderTop: "1px solid #ffffff0e",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          fontSize: 10,
          color: "#776b80",
          gap: 24,
        }}
      >
        <span>Gold / US Dollar</span>
        <span>15 menit</span>
        <span style={{ marginLeft: "auto" }}>Ilustrasi tampilan Archer</span>
      </div>
    </div>
  );
};
