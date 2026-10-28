import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import { Atmosphere } from "./Atmosphere";
import { Intro } from "./Intro";
import { Chart } from "./Chart";
import { Words } from "./Titles";
import { Logo } from "./Brand";
import { m, path, spring, win, chartPose } from "./motion";
export const ArcherFilm: React.FC = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = f / fps;
  const { scale, tx, ty, ry, rx, rz } = chartPose(t);
  return (
    <AbsoluteFill
      style={{
        fontFamily: "Inter, sans-serif",
        color: "#faf7f8",
        overflow: "hidden",
      }}
    >
      <Atmosphere t={t} />
      {t > 8.8 && t < 30.2 && (
        <div
          style={{
            position: "absolute",
            left: 210,
            top: 240,
            transformOrigin: "1125px 395px",
            transform: `perspective(2200px) translate(${tx}px,${ty}px) scale(${scale}) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
            opacity: m(t, 8.8, 9.7) * (1 - m(t, 28.6, 30)),
            filter: `blur(${m(t, 28.7, 30, 0, 9)}px)`,
          }}
        >
          <Chart t={t} />
        </div>
      )}
      {t > 11 && t < 21 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 310,
            background: "linear-gradient(#080708e8,#080708b8 48%,transparent)",
            opacity: m(t, 11, 13) * (1 - m(t, 19, 21)),
          }}
        />
      )}
      {t < 10.5 && <Intro t={t} />}
      {t > 9 && t < 12.8 && (
        <Words
          text="Cupang Archer"
          t={t}
          at={9.4}
          leave={11.8}
          size={80}
          style={{ position: "absolute", left: 140, top: 95 }}
        />
      )}
      {t > 11.7 && t < 16.9 && (
        <Words
          text="Menunggu konfirmasi"
          t={t}
          at={12.1}
          leave={16.1}
          size={74}
          style={{ position: "absolute", left: 140, top: 95 }}
        />
      )}
      {t > 16 && t < 19.3 && (
        <div style={{ position: "absolute", left: 140, top: 95 }}>
          <Words
            text="Konfirmasi hadir"
            t={t}
            at={16.4}
            leave={18.55}
            size={65}
          />
          <Words
            text="Sinyal muncul"
            t={t}
            at={17.25}
            leave={18.55}
            size={82}
            style={{ marginTop: 15, color: "#ffafb5" }}
          />
        </div>
      )}
      {t > 18.6 && t < 24.1 && (
        <div style={{ position: "absolute", left: 140, top: 95 }}>
          <Words text="Area entry" t={t} at={19} leave={20.2} size={78} />
          <Words
            text="SL dan TP lengkap"
            t={t}
            at={20.55}
            leave={23.3}
            size={78}
            style={{ position: "absolute", top: 0, width: 1000 }}
          />
        </div>
      )}
      {t > 23.3 && t < 29.2 && (
        <Words
          text="Lihat di TradingView"
          t={t}
          at={23.7}
          leave={28.3}
          size={75}
          style={{ position: "absolute", top: 110, left: 140 }}
        />
      )}
      {t > 25 && t < 29.7 && (
        <div style={{ opacity: 1 - m(t, 28.4, 29.4) }}>
          <svg
            width="1920"
            height="1080"
            style={{ position: "absolute", inset: 0 }}
          >
            <path
              d="M936 750 C1110 750 1030 445 1200 445"
              fill="none"
              stroke="#ff6170"
              strokeWidth="2.5"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - m(t, 25, 26)}
            />
            <circle
              cx={(() => {
                const p = m(t, 25, 26);
                return (
                  (1 - p) ** 3 * 936 +
                  3 * (1 - p) ** 2 * p * 1110 +
                  3 * (1 - p) * p * p * 1030 +
                  p ** 3 * 1200
                );
              })()}
              cy={(() => {
                const p = m(t, 25, 26);
                return (
                  (1 - p) ** 3 * 750 +
                  3 * (1 - p) ** 2 * p * 750 +
                  3 * (1 - p) * p * p * 445 +
                  p ** 3 * 445
                );
              })()}
              r="5"
              fill="#ffb6be"
              opacity={win(t, 25, 26.2)}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              left: 1200,
              top: 370,
              width: 570,
              transform: `translateY(${(1 - spring(t, 25.6)) * 65}px) scale(${0.85 + 0.15 * spring(t, 25.6)})`,
              opacity: m(t, 25.6, 25.95),
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 23,
                padding: "30px 32px",
                borderRadius: 25,
                background: "linear-gradient(125deg,#3b2229ee,#21191fee)",
                border: "1px solid #f071804d",
                boxShadow: "0 20px 60px #0007,inset 0 1px 0 #ffffff19",
              }}
            >
              <div
                style={{
                  width: 67,
                  height: 67,
                  borderRadius: 18,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Logo size={53} />
              </div>
              <div>
                <div style={{ fontSize: 27, fontWeight: 600, marginBottom: 9 }}>
                  Archer{" "}
                  <span
                    style={{
                      fontSize: 17,
                      fontWeight: 400,
                      color: "#a699a1",
                      marginLeft: 70,
                    }}
                  >
                    sekarang
                  </span>
                </div>
                <div style={{ fontSize: 24, color: "#e9dfe4" }}>
                  Sinyal BUY terkonfirmasi
                </div>
                <div style={{ fontSize: 18, color: "#b4a2ab", marginTop: 8 }}>
                  XAUUSD · Area entry, SL & TP
                </div>
              </div>
            </div>
            <Words
              text="Atau lewat notifikasi"
              t={t}
              at={26.2}
              size={43}
              style={{ marginTop: 36, letterSpacing: -1.5 }}
            />
          </div>
        </div>
      )}
      {t > 28.7 && (
        <div
          style={{ position: "absolute", inset: 0, opacity: m(t, 28.7, 29.6) }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 170,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              transform: `translateY(${m(t, 28.7, 30, 45, 0)}px)`,
            }}
          >
            <Logo size={76} />
            <span
              style={{ fontSize: 30, fontWeight: 500, letterSpacing: -0.7 }}
            >
              Trade With Cupang
            </span>
          </div>
          <Words
            text="Archer"
            t={t}
            at={29.2}
            size={132}
            style={{
              position: "absolute",
              left: 200,
              right: 200,
              top: 285,
              textAlign: "center",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 480,
              left: 250,
              right: 250,
              textAlign: "center",
            }}
          >
            <Words
              text="Permudah Jalan Trading Anda"
              t={t}
              at={29.9}
              size={55}
            />
            <Words
              text="Bersama Cupang."
              t={t}
              at={30.35}
              size={55}
              style={{ color: "#ffabb3", marginTop: 7 }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: 690,
              left: 730,
              width: 460,
              height: 85,
              borderRadius: 50,
              background: "linear-gradient(125deg,#f64c58,#d61c30)",
              boxShadow: "inset 0 1px 0 #ffb4bb,0 16px 70px #dc293333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 500,
              gap: 28,
              opacity: m(t, 31, 31.5),
              transform: `translateY(${m(t, 31, 31.8, 24, 0)}px)`,
            }}
          >
            Coba Archer Sekarang{" "}
            <svg width="25" height="25" viewBox="0 0 24 24">
              <path
                d="M5 19L19 5M5 5H19V19"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div
            style={{
              position: "absolute",
              width: 290,
              height: 290,
              borderRadius: "50%",
              left: -80 + Math.sin(t * 0.6) * 15,
              top: 830,
              background: "linear-gradient(135deg,#fff,#cdbfc3)",
              transform: "perspective(900px) rotateY(35deg) rotateX(15deg)",
              filter: "blur(3px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Logo size={190} />
          </div>
          <div
            style={{
              position: "absolute",
              width: 190,
              height: 190,
              borderRadius: "50%",
              right: 50,
              top: 210 + Math.cos(t * 0.6) * 18,
              background: "linear-gradient(135deg,#fff,#a9949c)",
              transform: "perspective(900px) rotateY(-38deg)",
              filter: "blur(1px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Logo size={124} />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
