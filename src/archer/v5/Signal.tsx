import React from "react";
import { Logo } from "../Brand";
import { Check } from "./Primitives";
import { C, demo, T, move, reveal } from "./motion";

export const Signal: React.FC<{ t: number }> = ({ t }) => {
  const ready = move(t, T.confirm, T.confirm + 0.6),
    scan = move(t, 5, 7.8);
  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 420,
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 42,
          top: 28,
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#dbbabe",
          fontSize: 20,
          letterSpacing: ".02em",
        }}
      >
        <Logo size={28} />
        <span>Archer</span>
        <span style={{ color: "#82727b", marginLeft: 10 }}>
          Konfirmasi sinyal
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 33,
          top: 89,
          width: 355,
          height: 276,
        }}
      >
        <svg width="355" height="276" viewBox="0 0 355 276" fill="none">
          <defs>
            <radialGradient id="signalLight">
              <stop stopColor="#f0324032" />
              <stop offset="1" stopColor="#f0324000" />
            </radialGradient>
            <linearGradient id="signalArc">
              <stop stopColor="#ffbcc5" />
              <stop offset="1" stopColor="#e32640" />
            </linearGradient>
          </defs>
          <circle cx="177" cy="138" r="136" fill="url(#signalLight)" />
          {[91, 114, 135].map((r, i) => (
            <circle
              key={r}
              cx="177"
              cy="138"
              r={r}
              stroke="#ff9baf"
              opacity={0.18 - i * 0.05}
              strokeWidth="1"
            />
          ))}
          <g transform={`rotate(${-90 + scan * 210 * (1 - ready)} 177 138)`}>
            <circle
              cx="177"
              cy="138"
              r="91"
              stroke="url(#signalArc)"
              strokeWidth="4"
              pathLength="1"
              strokeDasharray={`${0.15 + scan * 0.85} 1`}
              strokeLinecap="round"
            />
          </g>
          {Array.from({ length: 32 }, (_, i) => {
            const a = (i * Math.PI) / 16;
            return (
              <path
                key={i}
                d={`M${177 + Math.cos(a) * 123} ${138 + Math.sin(a) * 123}L${177 + Math.cos(a) * 129} ${138 + Math.sin(a) * 129}`}
                stroke="#ffb5b7"
                opacity={i / 32 < scan ? 0.45 : 0.12}
              />
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            left: 130,
            top: 91,
            width: 94,
            height: 94,
            display: "grid",
            placeItems: "center",
            color: C.white,
          }}
        >
          <div
            style={{
              opacity: 1 - ready,
              position: "absolute",
              transform: `scale(${1 - ready * 0.2})`,
            }}
          >
            <Logo size={89} white />
          </div>
          <div
            style={{
              position: "absolute",
              transform: `scale(${0.75 + ready * 0.25})`,
              opacity: ready,
            }}
          >
            <Check
              size={86}
              progress={move(t, T.confirm + 0.12, T.confirm + 0.7)}
            />
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 430, top: 104, right: 42 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            color: "#c9bfc3",
          }}
        >
          {demo.symbol}
          <span style={{ fontSize: 18, color: C.muted }}>Gold / US Dollar</span>
        </div>
        <div
          style={{
            marginTop: 24,
            height: 82,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: 56,
              letterSpacing: "-.045em",
              color: "#b7a7af",
              position: "absolute",
              transform: `translateY(${-ready * 90}px)`,
              opacity: 1 - ready,
            }}
          >
            Membaca sinyal
          </div>
          <div
            style={{
              fontSize: 58,
              letterSpacing: "-.05em",
              position: "absolute",
              color: C.white,
              transform: `translateY(${(1 - ready) * 90}px)`,
            }}
          >
            BUY terkonfirmasi
          </div>
        </div>
        <div
          style={{
            height: 44,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 20,
            color: C.muted,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 10,
              background: ready > 0.5 ? C.red : "#83757a",
              boxShadow: ready > 0.5 ? "0 0 15px #f03240" : undefined,
            }}
          />
          {ready > 0.5 ? "Konfirmasi diterima" : "Menunggu penutupan candle"}
        </div>
        <div
          style={{
            position: "relative",
            marginTop: 25,
            height: 36,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          {Array.from({ length: 48 }, (_, i) => {
            const h =
              7 + (1 + Math.sin(i * 0.74)) * (8 + Math.sin(i * 0.3) * 5);
            return (
              <div
                key={i}
                style={{
                  width: 5,
                  height: h * (1 - ready * 0.58),
                  borderRadius: 5,
                  background: i / 48 < scan ? "#fa5365" : "#35242b",
                  opacity: reveal(t, 4.9 + i * 0.018, 0.5),
                }}
              />
            );
          })}
          <div style={{ marginLeft: 18, fontSize: 18, color: "#d3b5bd" }}>
            {Math.round(scan * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
};
