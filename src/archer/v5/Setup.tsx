import React from "react";
import { Logo } from "../Brand";
import { C, demo, T, move, pulse, reveal } from "./motion";
import { Bell, Check, Cursor } from "./Primitives";

const closes = [
  96, 99, 94, 102, 108, 103, 112, 118, 113, 125, 129, 123, 133, 137, 131, 140,
  145, 139, 151, 155, 148, 158, 166, 161,
];
// An illustrative miniature supports the setup; the level editor carries the scene.
const ContextChart: React.FC<{ t: number }> = ({ t }) => (
  <svg width="270" height="165" viewBox="0 0 270 165">
    {[30, 70, 110, 150].map((y) => (
      <path key={y} d={`M0 ${y}H270`} stroke="#ffffff08" />
    ))}
    {closes.map((c, i) => {
      const o = i ? closes[i - 1] : 91,
        up = c > o,
        y = 170 - Math.max(c, o) * 0.7,
        h = Math.max(4, Math.abs(c - o) * 0.7);
      return (
        <g key={i} opacity={reveal(t, 12.6 + i * 0.035, 0.6)}>
          <path
            d={`M${9 + i * 10.5} ${y - 8}V${y + h + 8}`}
            stroke={up ? "#e9d8de" : "#7e424e"}
            strokeWidth="1.3"
          />
          <rect
            x={6 + i * 10.5}
            y={y}
            width="6"
            height={h}
            rx="1"
            fill={up ? "#e9d8de" : "#7e424e"}
          />
        </g>
      );
    })}
    <path
      d="M0 58H270"
      stroke="#f03240"
      strokeDasharray="4 5"
      opacity={move(t, T.entry, T.entry + 0.5) * 0.65}
    />
  </svg>
);

export const Setup: React.FC<{ t: number }> = ({ t }) => {
  const alert = move(t, 19, 19.3);
  const levels = [
    {
      label: "Take profit",
      tag: "TP",
      value: demo.tp,
      at: T.tp,
      y: 108,
      color: "#f4e5e9",
    },
    {
      label: "Area entry",
      tag: "Entry",
      value: demo.entry,
      at: T.entry,
      y: 207,
      color: "#ff9a9f",
    },
    {
      label: "Stop loss",
      tag: "SL",
      value: demo.sl,
      at: T.sl,
      y: 306,
      color: "#e65c6c",
    },
  ];
  return (
    <div
      style={{
        position: "absolute",
        width: 1160,
        height: 420,
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 34,
          top: 23,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 19,
          color: "#c7a8b0",
        }}
      >
        <Logo size={27} />
        <span>Archer</span>
        <span style={{ marginLeft: 14, color: C.muted }}>Rencana trading</span>
      </div>
      <div style={{ position: "absolute", left: 34, top: 84, width: 285 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 31, fontWeight: 500 }}>{demo.symbol}</span>
          <span
            style={{
              fontSize: 16,
              padding: "7px 13px",
              borderRadius: 20,
              border: "1px solid #f0324055",
              color: "#ffabad",
              background: "#f0324015",
            }}
          >
            BUY
          </span>
        </div>
        <ContextChart t={t} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 17,
            color: "#c4abb2",
            marginTop: -3,
          }}
        >
          <Check size={22} />
          <span>Sinyal terkonfirmasi</span>
        </div>
        <div style={{ height: 1, background: C.line, margin: "21px 0 15px" }} />
        <div
          style={{
            position: "relative",
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 18,
            color: alert > 0.5 ? C.white : C.muted,
          }}
        >
          <span>Notifikasi</span>
          <div
            style={{
              width: 53,
              height: 28,
              borderRadius: 20,
              background: alert > 0.5 ? C.red : "#393039",
              padding: 4,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
                background: C.white,
                transform: `translateX(${alert * 25}px)`,
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 360,
          top: 82,
          bottom: 40,
          width: 1,
          background: "linear-gradient(transparent,#ffffff1c,transparent)",
        }}
      />
      <svg
        width="730"
        height="420"
        style={{ position: "absolute", left: 400, top: 0, overflow: "visible" }}
      >
        <defs>
          <linearGradient id="setupArea" x1="0" x2="1">
            <stop stopColor="#f0324016" />
            <stop offset="1" stopColor="#f0324000" />
          </linearGradient>
        </defs>
        <rect
          x="15"
          y="108"
          width="695"
          height="99"
          fill="url(#setupArea)"
          opacity={move(t, T.tp, T.tp + 0.7)}
        />
        <rect
          x="15"
          y="207"
          width="695"
          height="99"
          fill="url(#setupArea)"
          opacity={move(t, T.sl, T.sl + 0.7) * 0.7}
        />
        {levels.map((v) => {
          const p = reveal(t, v.at, 0.8);
          return (
            <g
              key={v.tag}
              opacity={p}
              transform={`translate(0 ${(1 - p) * 14})`}
            >
              <path
                d={`M16 ${v.y}H710`}
                stroke={v.color}
                strokeWidth={v.tag === "Entry" ? 1.8 : 1}
                opacity=".45"
                strokeDasharray={v.tag === "Entry" ? undefined : "4 5"}
                pathLength="1"
                strokeDashoffset={0}
              />
              <circle cx="16" cy={v.y} r="5" fill={v.color} />
              <circle
                cx="16"
                cy={v.y}
                r={6 + pulse(t, v.at + 0.18, 0.2) * 15}
                fill="none"
                stroke={v.color}
                opacity={pulse(t, v.at + 0.18, 0.2)}
              />
              <text
                x="38"
                y={v.y - 15}
                fontSize="31"
                fontWeight="500"
                fill={v.color}
                letterSpacing="-1"
              >
                {v.tag}
              </text>
              <text x="162" y={v.y - 16} fontSize="21" fill="#a48e98">
                {v.label}
              </text>
              <text
                x="710"
                y={v.y - 14}
                fontSize="40"
                fontWeight="500"
                textAnchor="end"
                fill={C.white}
                letterSpacing="-1.4"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {v.value}
              </text>
            </g>
          );
        })}
        <text
          x="16"
          y="368"
          fontSize="18"
          fill="#a48e98"
          opacity={move(t, 17.6, 18.3)}
        >
          Setup lengkap
        </text>
        <text
          x="710"
          y="368"
          textAnchor="end"
          fontSize="18"
          fill="#e6c5cc"
          opacity={move(t, 17.6, 18.3)}
        >
          Entry · Stop loss · Take profit
        </text>
      </svg>
      <Cursor
        x={move(t, 18.35, 18.9, 425, 296)}
        y={move(t, 18.35, 18.9, 460, 348)}
        opacity={move(t, 18.3, 18.6) * (1 - move(t, 19.5, 19.85))}
        press={pulse(t, 19, 0.13)}
      />
    </div>
  );
};

export const Notification: React.FC<{ t: number }> = ({ t }) => (
  <div
    style={{
      position: "absolute",
      width: 880,
      height: 260,
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
      boxSizing: "border-box",
      padding: "31px 38px",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 17 }}>
      <div
        style={{
          width: 59,
          height: 59,
          borderRadius: 19,
          background: "linear-gradient(145deg,#f54855,#9b1029)",
          display: "grid",
          placeItems: "center",
          boxShadow: "inset 0 1px 1px #ffffff66,0 10px 24px #0005",
        }}
      >
        <Logo size={46} white />
      </div>
      <span style={{ fontSize: 23, fontWeight: 500, letterSpacing: ".01em" }}>
        Cupang Archer
      </span>
      <span style={{ fontSize: 17, color: C.muted, marginLeft: "auto" }}>
        sekarang
      </span>
      <span style={{ color: C.light, marginLeft: 6 }}>
        <Bell
          size={27}
          rotate={
            Math.sin((t - 24) * 18) * Math.exp(-Math.max(0, t - 24) * 3) * 12
          }
        />
      </span>
    </div>
    <div
      style={{
        fontSize: 42,
        fontWeight: 500,
        letterSpacing: "-.04em",
        marginTop: 20,
      }}
    >
      Sinyal BUY terkonfirmasi
    </div>
    <div
      style={{
        display: "flex",
        gap: 27,
        fontSize: 22,
        color: "#cbb8c1",
        marginTop: 22,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <span style={{ color: "#ffb5b7" }}>{demo.symbol}</span>
      <span>
        Entry <b style={{ fontWeight: 500, color: C.white }}>{demo.entry}</b>
      </span>
      <span>
        SL <b style={{ fontWeight: 500, color: C.white }}>{demo.sl}</b>
      </span>
      <span>
        TP <b style={{ fontWeight: 500, color: C.white }}>{demo.tp}</b>
      </span>
    </div>
  </div>
);
