import React from "react";
import { Img, staticFile } from "remotion";
import { C, m, out, path, vis, timing } from "./motion";
import {
  UI,
  trade,
  cameraPath,
  reframe,
  ballCard,
  curveOffset,
} from "./adaptation";

// Adapted from src/pulse/UI.tsx: same four connected panes, reveals, camera keys,
// save/filter/risk actions, cursor windows and exit. Changes are branding, wide
// layout, growing ball-cards and camera interpolation, not a new scene sequence.
const small: React.CSSProperties = {
  fontSize: 18,
  color: C.muted,
  letterSpacing: "-.015em",
};
const pane: React.CSSProperties = {
  background: "linear-gradient(145deg,#211216,#10090c)",
  border: "1px solid #ffffff12",
  borderRadius: 22,
};
const row = (label: string, value: string, active = false) => (
  <div
    style={{
      ...pane,
      padding: "12px 18px",
      height: 79,
      boxSizing: "border-box",
      borderColor: active ? "#f0324070" : "#ffffff12",
    }}
  >
    <div style={small}>{label}</div>
    <div
      style={{
        fontSize: 25,
        marginTop: 7,
        color: active ? C.lavender : C.white,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </div>
  </div>
);
export const CupangGlyph: React.FC<{ size?: number; white?: boolean }> = ({
  size = 36,
  white = false,
}) => (
  <Img
    src={staticFile("cupang/cupang.png")}
    style={{
      width: size,
      height: size,
      objectFit: "contain",
      filter: white ? "brightness(0) invert(1)" : undefined,
    }}
  />
);
const trades = [
  ["Konfirmasi", "BUY diterima", "✓"],
  ["Area entry", trade.symbol, trade.entry],
  ["Stop loss", "Batas risiko", trade.sl],
  ["Take profit", "Target harga", trade.tp],
];

export const ProductUI: React.FC<{ t: number }> = ({ t }) => {
  const enter = out(t, 2.7, 3.9),
    leave = m(t, 17.5, 19.1);
  const journal = m(t, 6.7, 7.6),
    analysis = m(t, 10, 10.9),
    plan = m(t, 13.8, 14.7);
  // PULSE's exact camera key times and values, interpolated more fluidly.
  const zoom = cameraPath(
    t,
    [2.7, 4, 5.3, 6.2, 7.8, 9.7, 11, 12.4, 13.6, 14.8, 17.5, 19.1],
    [0.72, 1, 1.015, 1.1, 0.92, 0.94, 1.08, 1.08, 1.2, 0.97, 1, 0.15],
  );
  const cy = cameraPath(
    t,
    [2.7, 4, 6.6, 7.8, 9.7, 11, 13.6, 14.8, 17.5, 19.1],
    [1100, 610, 595, 410, 410, 610, 590, 625, 600, 780],
  );
  const tilt = cameraPath(
    t,
    [2.7, 4, 6.6, 7.8, 9.7, 11, 13.6, 14.8, 17.5, 19.1],
    [22, -3, -1, -7, -4, 0, 1, -2, 0, 30],
  );
  const frame = reframe(t, cy, zoom),
    open = m(t, 2.7, 3.9) * (1 - leave);
  const ball = ballCard(t, 2.7, 3.9);
  const clip = `inset(${((UI.height - 124) * (1 - open)) / 2}px ${((UI.width - 124) * (1 - open)) / 2}px round ${62 - 22 * open}px)`;
  return (
    <div
      style={{
        position: "absolute",
        left: frame.x - UI.width / 2,
        top: frame.y - UI.height / 2 + ball.y,
        width: UI.width,
        height: UI.height,
        perspective: 1800,
        opacity: enter * (1 - leave),
      }}
    >
      {/* PULSE's stacked screen layers stay attached to the same interface. */}
      {[2, 1].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 40,
            background: "#231016",
            border: "1px solid #f68c9d20",
            clipPath: clip,
            transform: `translate(${i * 8 * journal}px,${-i * 12 * journal}px) scale(${frame.zoom * (1 - i * 0.025)}) rotateX(${tilt}deg)`,
            opacity: journal * 0.55,
          }}
        />
      ))}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: 40,
          background: "linear-gradient(135deg,#241217 0%,#10090d 55%,#1d0e15)",
          border: "1.5px solid #d7839348",
          boxShadow:
            "0 30px 85px #000b,0 0 70px #df234315,inset 0 1px 1px #ffffff25",
          overflow: "hidden",
          clipPath: clip,
          transform: `scale(${frame.zoom * ball.sx},${frame.zoom * ball.sy}) rotateX(${tilt}deg) rotateY(${cameraPath(t, [2.7, 4, 7, 10, 14, 18, 19.1], [-16, 4, 0, -4, 2, 0, 26])}deg) rotateZ(${cameraPath(t, [2.7, 4, 7.8, 11, 14.8, 18], [-8, 0, -3, 1, 0, 0])}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `linear-gradient(${110 + Math.sin(t * 0.4) * 15}deg,transparent 28%,#ffffff04 45%,transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 1 - open,
            background:
              "radial-gradient(ellipse at 48% 35%,#ffc7cb,#f03240 16%,#500e23 40%,#13080d 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            opacity: 1 - m(open, 0.1, 0.6),
          }}
        >
          <CupangGlyph size={77} white />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: m(open, 0.15, 0.75),
          }}
        >
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              padding: "0 28px",
              borderBottom: "1px solid #ffffff0b",
              gap: 12,
            }}
          >
            <CupangGlyph />
            <span
              style={{ fontSize: 23, fontWeight: 600, letterSpacing: ".09em" }}
            >
              CUPANG ARCHER
            </span>
            <span style={{ marginLeft: "auto", fontSize: 18, color: C.muted }}>
              Archer Indicator
            </span>
            <div
              style={{
                width: 31,
                height: 31,
                borderRadius: 20,
                background: "#ae203b",
                marginLeft: 8,
                display: "grid",
                placeItems: "center",
                fontSize: 16,
              }}
            >
              C
            </div>
          </div>
          <div
            style={{
              display: "flex",
              height: 58,
              alignItems: "center",
              gap: 38,
              padding: "0 28px",
              fontSize: 20,
              borderBottom: "1px solid #ffffff0b",
            }}
          >
            {["Konfirmasi", "Setup", "Level", "Notifikasi"].map((x, i) => {
              const selected =
                i === 0
                  ? 1 - journal
                  : i === 1
                    ? journal - analysis
                    : i === 2
                      ? analysis - plan
                      : plan;
              return (
                <div
                  key={x}
                  style={{
                    color: selected > 0.5 ? C.white : C.muted,
                    position: "relative",
                  }}
                >
                  {x}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -18,
                      left: 0,
                      right: 0,
                      height: 3,
                      borderRadius: 3,
                      background: C.purple,
                      opacity: selected,
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div
            style={{
              position: "absolute",
              top: UI.contentTop,
              left: UI.inset,
              right: UI.inset,
              bottom: 20,
              overflow: "hidden",
            }}
          >
            {/* Same PULSE form → list → graph → plan translation, remapped to a wide UI. */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: `translateX(${-journal * UI.stride}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  letterSpacing: "-.045em",
                }}
              >
                Sinyal berikutnya.
              </div>
              <div style={{ ...small, marginTop: 8 }}>
                Konfirmasi sebelum menentukan entry.
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 86,
                  width: 472,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  transform: `translateY(${(1 - out(t, 3.5, 4.3)) * 30}px)`,
                  opacity: out(t, 3.5, 4.3),
                }}
              >
                {row("Instrumen", trade.symbol)}
                {row("Konfirmasi", t < 6 ? "Menunggu" : "BUY", true)}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 490,
                  right: 0,
                  top: 86,
                  opacity: out(t, 4, 4.6),
                }}
              >
                {row("Area entry", t < 6 ? "Menunggu konfirmasi" : trade.entry)}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 181,
                  width: 472,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  opacity: out(t, 4.35, 4.95),
                }}
              >
                {row("Stop loss", t < 6 ? "Setelah sinyal" : trade.sl)}
                {row("Take profit", t < 6 ? "Setelah sinyal" : trade.tp)}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 11,
                  left: 490,
                  right: 0,
                  height: 68,
                  borderRadius: 21,
                  background: "linear-gradient(110deg,#c82139,#f75a68)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: 600,
                  boxShadow: "inset 0 1px 1px #ffffff50,0 12px 35px #f0324025",
                  transform: `scale(${1 - 0.025 * Math.exp(-Math.pow((t - timing.save) / 0.14, 2))})`,
                }}
              >
                {t < 6 ? "Pantau sinyal" : "✓  Sinyal terkonfirmasi"}
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: `translateX(${(1 - journal) * UI.stride - analysis * UI.stride}px)`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 600,
                    letterSpacing: "-.045em",
                  }}
                >
                  Setup terkonfirmasi.
                </div>
                <span style={small}>{trade.symbol}</span>
              </div>
              <div
                style={{ height: 1, background: "#ffffff10", margin: "14px 0" }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "13px 16px",
                }}
              >
                {trades.map((v, i) => {
                  const p = out(t, 7.15 + i * 0.11, 7.85 + i * 0.11);
                  const b = ballCard(t, 7.15 + i * 0.11, 7.85 + i * 0.11),
                    w = 74 + (524 - 74) * b.grow,
                    h = 74 + 18 * b.grow;
                  return (
                    <div key={i} style={{ height: 92, position: "relative" }}>
                      <div
                        style={{
                          ...pane,
                          position: "absolute",
                          left: (524 - w) / 2,
                          top: 0,
                          width: w,
                          height: h,
                          boxSizing: "border-box",
                          borderRadius: 37 - 15 * b.grow,
                          padding: "15px 20px",
                          display: "flex",
                          alignItems: "center",
                          gap: 15,
                          transform: `translate(${(1 - p) * 120}px,${b.y}px) scale(${b.sx},${b.sy})`,
                          opacity: p,
                          borderColor: i === 0 ? "#f0738970" : "#ffffff12",
                          background:
                            b.grow < 0.95
                              ? "radial-gradient(ellipse at 30% 18%,#ffd3d7,#f03240 28%,#520e24 75%)"
                              : i === 0
                                ? "linear-gradient(100deg,#401c29,#1b0d15)"
                                : undefined,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "grid",
                            placeItems: "center",
                            opacity: 1 - m(b.grow, 0.1, 0.5),
                          }}
                        >
                          <CupangGlyph size={43} white />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 15,
                            width: 482,
                            minWidth: 482,
                            opacity: m(b.grow, 0.86, 1),
                          }}
                        >
                          <div
                            style={{
                              width: 43,
                              height: 43,
                              borderRadius: 15,
                              background: "#ffffff08",
                              display: "grid",
                              placeItems: "center",
                              fontSize: 23,
                              flexShrink: 0,
                            }}
                          >
                            {i === 0
                              ? "✓"
                              : i === 1
                                ? "E"
                                : i === 2
                                  ? "SL"
                                  : "TP"}
                          </div>
                          <div>
                            <div style={{ fontSize: 23, fontWeight: 500 }}>
                              {v[0]}
                            </div>
                            <div
                              style={{ ...small, fontSize: 17, marginTop: 5 }}
                            >
                              {v[1]}
                            </div>
                          </div>
                          <span
                            style={{
                              marginLeft: "auto",
                              fontSize: 31,
                              color: i % 2 === 0 ? C.green : C.lavender,
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {v[2]}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: `translateX(${(1 - analysis) * UI.stride - plan * UI.stride}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  letterSpacing: "-.045em",
                }}
              >
                Satu arah. Tiga level.
              </div>
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  display: "flex",
                  gap: 12,
                }}
              >
                {["Semua level", "Entry / SL / TP"].map((x, i) => (
                  <div
                    key={x}
                    style={{
                      padding: "12px 20px",
                      borderRadius: 30,
                      fontSize: 18,
                      background:
                        i === 1 && t > timing.filter ? C.purple : "#ffffff09",
                      color: i === 1 && t > timing.filter ? "#fff" : "#ac929c",
                      border: "1px solid #ffffff12",
                    }}
                  >
                    {x}
                  </div>
                ))}
              </div>
              <div
                style={{
                  ...pane,
                  position: "absolute",
                  top: 68,
                  left: 0,
                  right: 0,
                  bottom: 30,
                  padding: "18px 24px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 17,
                    color: C.muted,
                  }}
                >
                  <span>{trade.symbol} · Setup Archer</span>
                  <span>Entry / SL / TP</span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 30,
                    right: 180,
                    bottom: 14,
                    display: "flex",
                    height: 118,
                    alignItems: "end",
                    gap: 20,
                  }}
                >
                  {[0.48, 0.65, 0.4, 0.75, 0.58, 0.89, 0.8, 0.96].map(
                    (h, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height:
                            118 *
                            h *
                            out(t, 10.8 + i * 0.085, 11.7 + i * 0.085),
                          borderRadius: "9px 9px 3px 3px",
                          background:
                            i < 5
                              ? "linear-gradient(#8b334b,#321321)"
                              : "linear-gradient(#ffd0d7,#e23754)",
                          boxShadow: i === 7 ? "0 0 24px #ef3b5640" : undefined,
                        }}
                      />
                    ),
                  )}
                </div>
                <svg
                  width="1016"
                  height="132"
                  viewBox="0 0 1016 132"
                  style={{
                    position: "absolute",
                    left: 24,
                    top: 34,
                    overflow: "visible",
                  }}
                >
                  {[
                    { name: "TP", value: trade.tp, y: 20, color: "#fff1f4" },
                    {
                      name: "Entry",
                      value: trade.entry,
                      y: 66,
                      color: "#ffbcc6",
                    },
                    { name: "SL", value: trade.sl, y: 112, color: "#f46780" },
                  ].map((v, i) => {
                    const draw = m(
                      t,
                      timing.filter + i * 0.12,
                      11.95 + i * 0.12,
                    );
                    return (
                      <g
                        key={v.name}
                        opacity={out(
                          t,
                          timing.filter + i * 0.12,
                          timing.filter + 0.35 + i * 0.12,
                        )}
                      >
                        <path
                          d={`M5 ${v.y}H850`}
                          stroke={v.color}
                          strokeWidth="1.5"
                          pathLength="1"
                          strokeDasharray="1"
                          strokeDashoffset={1 - draw}
                        />
                        <circle
                          cx={5 + 845 * draw}
                          cy={v.y}
                          r="3.5"
                          fill={v.color}
                        />
                        <text
                          x="880"
                          y={v.y + 6}
                          fontFamily="Inter"
                          fontSize="18"
                          fill={v.color}
                          opacity={draw}
                        >
                          {v.name}
                        </text>
                        <text
                          x="1010"
                          y={v.y + 6}
                          textAnchor="end"
                          fontFamily="Inter"
                          fontSize="24"
                          fill={C.white}
                          opacity={draw}
                        >
                          {v.value}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  fontSize: 17,
                  color: C.lavender,
                  opacity: out(t, 12, 12.7),
                }}
              >
                Entry, SL, TP dalam satu rencana.
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: `translateX(${(1 - plan) * UI.stride}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  letterSpacing: "-.045em",
                }}
              >
                Entry berikutnya.
              </div>
              <div
                style={{
                  ...pane,
                  position: "absolute",
                  left: 0,
                  top: 58,
                  width: 482,
                  height: 174,
                  padding: "17px 26px",
                  boxSizing: "border-box",
                }}
              >
                <div style={small}>Batas risiko per trade</div>
                <div
                  style={{
                    fontSize: 58,
                    letterSpacing: "-.06em",
                    marginTop: 6,
                  }}
                >
                  1
                  <span
                    style={{ fontSize: 28, color: C.lavender, marginLeft: 6 }}
                  >
                    R
                  </span>
                </div>
                <div
                  style={{
                    height: 7,
                    background: "#ffffff0d",
                    borderRadius: 10,
                    marginTop: 14,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: `${m(t, 15.5, 16.15, 65, 35)}%`,
                      height: "100%",
                      borderRadius: 10,
                      background: "linear-gradient(90deg,#9e2541,#ffb8c7)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: -9,
                      left: `${m(t, 15.5, 16.15, 65, 35)}%`,
                      width: 25,
                      height: 25,
                      background: "#ffe6eb",
                      borderRadius: 25,
                      boxShadow: "0 0 25px #f0324080",
                      transform: "translateX(-50%)",
                    }}
                  />
                </div>
              </div>
              <div
                style={{ position: "absolute", left: 530, top: 57, right: 0 }}
              >
                {[
                  "Setup terkonfirmasi",
                  "Entry, SL dan TP siap",
                  "Notifikasi aktif",
                ].map((v, i) => {
                  const p = out(t, 16 + i * 0.24, 16.5 + i * 0.24);
                  return (
                    <div
                      key={v}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        marginBottom: 16,
                        fontSize: 22,
                        color: p > 0.5 ? C.white : C.muted,
                      }}
                    >
                      <div
                        style={{
                          width: 29,
                          height: 29,
                          borderRadius: 10,
                          border: "1px solid #f0324065",
                          background: `rgba(240,50,64,${p * 0.35})`,
                          display: "grid",
                          placeItems: "center",
                          color: C.lavender,
                        }}
                      >
                        <span style={{ opacity: p }}>✓</span>
                      </div>
                      {v}
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  fontSize: 17,
                  color: C.muted,
                }}
              >
                Entry {trade.entry} · SL {trade.sl} · TP {trade.tp}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 530,
                  right: 0,
                  bottom: 0,
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  borderRadius: 17,
                  background: "linear-gradient(120deg,#612433,#2e1520)",
                  border: "1px solid #ff99b142",
                  transform: `translateY(${(1 - out(t, 16.7, 17.2)) * 45}px)`,
                  opacity: out(t, 16.7, 17.2),
                }}
              >
                <CupangGlyph size={35} white />
                <div>
                  <div style={{ fontSize: 21 }}>Sinyal BUY terkonfirmasi</div>
                  <div
                    style={{ fontSize: 15, color: C.lavender, marginTop: 3 }}
                  >
                    {trade.symbol} · Notifikasi Archer
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Cursor t={t} />
        </div>
      </div>
    </div>
  );
};
const Cursor: React.FC<{ t: number }> = ({ t }) => {
  const opacity = vis(t, 4.8, 6.6) + vis(t, 10.5, 12) + vis(t, 15, 16.9);
  // Keep PULSE's original cursor keyframes, then map the target controls to 3:1.
  let x = path(t, [4.8, 5.6, 6.6], [950, 660, 660]),
    y = path(t, [4.8, 5.6, 6.6], [1150, 970, 970]);
  if (t > 10) {
    x = path(t, [10.5, 11.1, 12], [940, 420, 420]);
    y = path(t, [10.5, 11.1, 12], [650, 370, 370]);
  }
  if (t > 14) {
    x = path(t, [15, 15.5, 16.15, 16.9], [940, 578, 342, 360]);
    y = path(t, [15, 15.5, 16.15, 16.9], [800, 530, 530, 590]);
  }
  let wx = 835 + (x - 660) * 0.7,
    wy = 368 + (y - 970) * 0.45;
  if (t < 8) wy -= curveOffset(t, 4.8, 5.6, 45);
  if (t > 10) {
    wx = 990 + (x - 420) * 0.35;
    wy = 171 + (y - 370) * 0.4 - curveOffset(t, 10.5, 11.1, 36);
  }
  if (t > 14) {
    wx = 54 + ((x - 342) / 236) * 129 + 150;
    wy = 340 + (y - 530) * 0.23 - curveOffset(t, 15, 15.5, 45);
  }
  const click = Math.exp(
    -Math.pow(
      (t - (t < 8 ? timing.save : t < 14 ? timing.filter : timing.risk)) / 0.11,
      2,
    ),
  );
  return (
    <div
      style={{
        position: "absolute",
        left: wx,
        top: wy,
        opacity,
        transform: `scale(${1 - click * 0.16})`,
        pointerEvents: "none",
      }}
    >
      <svg width="37" height="46" viewBox="0 0 55 68">
        <path
          d="M5 3L8 53L22 39L35 63L45 57L32 34L50 30Z"
          fill="#fff3f6"
          stroke="#39121e"
          strokeWidth="2"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: -18,
          top: -18,
          width: 36,
          height: 36,
          borderRadius: 50,
          border: "2px solid #ffbecb",
          opacity: click,
          transform: `scale(${1 + (1 - click) * 1.3})`,
        }}
      />
    </div>
  );
};
