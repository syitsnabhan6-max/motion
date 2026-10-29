import React from "react";
import { Logo } from "./Brand";
import { m, spring, clamp } from "./motion";
import { Words } from "./Titles";
import { phonePose } from "./phoneMotion";
export const Phone: React.FC<{ t: number }> = ({ t }) => {
  const { x, y, s, ry, rz } = phonePose(t);
  const notif = spring(t, 23);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x - 150,
          top: y - 310,
          width: 300,
          height: 620,
          opacity: m(t, 20, 20.35) * (1 - m(t, 28.5, 29.2)),
          transform: `perspective(1800px) scale(${s}) rotateY(${ry}deg) rotateZ(${rz}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 45,
              background:
                "linear-gradient(100deg,#2b2531,#c3b8c3 25%,#4b424f 36%,#231a29 65%,#cbbfc7)",
              border: "1px solid #b5a0b5",
              transform: `translateZ(${-12 + i * 2}px)`,
              boxShadow:
                i === 0 ? "20px 25px 55px #0009,0 0 20px #ff8daf24" : undefined,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: -3,
            top: 100,
            width: 4,
            height: 32,
            background: "#877987",
            borderRadius: 3,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -3,
            top: 151,
            width: 4,
            height: 53,
            background: "#877987",
            borderRadius: 3,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -3,
            top: 160,
            width: 4,
            height: 70,
            background: "#877987",
            borderRadius: 3,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 2,
            borderRadius: 43,
            background: "#030205",
            border: "2px solid #564452",
            boxShadow: "inset 0 0 0 1px #c7aabb",
            overflow: "hidden",
            transform: "translateZ(2px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 7,
              borderRadius: 35,
              overflow: "hidden",
              background:
                "radial-gradient(ellipse at 20% 20%,#c82f54,#411326 44%,#09090e 80%)",
            }}
          >
            <svg
              width="282"
              height="602"
              style={{ position: "absolute", inset: 0 }}
            >
              <defs>
                <linearGradient id="wall">
                  <stop stopColor="#ffb1bf" />
                  <stop offset=".18" stopColor="#ed5579" />
                  <stop offset=".5" stopColor="#781b3d" />
                  <stop offset="1" stopColor="#160d1b" />
                </linearGradient>
              </defs>
              <path
                d="M330 -40C-110 20 380 260 75 400C-50 470 30 620 310 660L370 100Z"
                fill="url(#wall)"
              />
              <path
                d="M-70 310C270 100 70 340 300 360L310 680H-70Z"
                fill="#0b0913"
                opacity=".6"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 18,
                right: 18,
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              <span>9:41</span>
              <svg width="45" height="12" viewBox="0 0 45 12" fill="white">
                <rect x="0" y="7" width="3" height="5" rx=".5" />
                <rect x="5" y="4" width="3" height="8" rx=".5" />
                <rect x="10" y="1" width="3" height="11" rx=".5" />
                <path d="M19 6Q24 0 29 6L24 11Z" />
                <rect
                  x="33"
                  y="3"
                  width="10"
                  height="7"
                  rx="2"
                  fill="none"
                  stroke="white"
                />
                <rect x="35" y="5" width="6" height="3" rx="1" />
                <path d="M44 5V8" stroke="white" />
              </svg>
            </div>
            <div
              style={{
                position: "absolute",
                top: 9,
                left: 98,
                width: 86,
                height: 24,
                borderRadius: 20,
                background: "#030306",
                boxShadow: "inset 0 1px 0 #ffffff0a",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 65,
                textAlign: "center",
                color: "#ffe1e9",
              }}
            >
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="7" width="10" height="9" rx="2" />
                <path d="M5 7V4a3 3 0 016 0V7" />
              </svg>
              <div style={{ fontSize: 16, marginTop: 8 }}>
                Kamis, 29 Oktober
              </div>
              <div
                style={{
                  fontSize: 76,
                  fontWeight: 500,
                  letterSpacing: -5,
                  lineHeight: 1.15,
                }}
              >
                09:41
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                left: 11,
                right: 11,
                top: 304,
                padding: "13px 12px",
                borderRadius: 19,
                background: "linear-gradient(120deg,#e8d2dfdb,#c8afc8d9)",
                border: "1px solid #fff6",
                color: "#271925",
                opacity: clamp(notif),
                transform: `translateY(${(1 - notif) * -28}px) scale(${0.92 + 0.08 * notif})`,
                boxShadow: "0 8px 30px #160b2640",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 6,
                    width: 23,
                    height: 23,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Logo size={20} />
                </div>
                <b style={{ fontSize: 12 }}>ARCHER</b>
                <span
                  style={{ fontSize: 10, marginLeft: "auto", opacity: 0.65 }}
                >
                  sekarang
                </span>
              </div>
              <b style={{ fontSize: 14, letterSpacing: -0.3 }}>
                Sinyal BUY terkonfirmasi
              </b>
              <div style={{ fontSize: 12, lineHeight: 1.45, marginTop: 4 }}>
                XAUUSD
                <br />
                Area entry, SL, dan TP tersedia.
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 34,
                left: 29,
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "#ffffff1b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="15"
                height="18"
                viewBox="0 0 15 18"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              >
                <path d="M4 2H11V6L9 9V16H6V9L4 6Z" />
              </svg>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 34,
                right: 29,
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "#ffffff1b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                stroke="white"
                strokeWidth="1.3"
              >
                <path d="M2 5H5L6 2H12L13 5H16V14H2Z" />
                <circle cx="9" cy="9" r="3" />
              </svg>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: 94,
                width: 95,
                height: 4,
                borderRadius: 4,
                background: "#fff",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `linear-gradient(${105 + Math.sin(t * 0.4) * 10}deg,transparent 30%,#ffffff09 45%,transparent 53%)`,
            }}
          />
        </div>
      </div>
      {t > 23.8 && t < 26.6 && (
        <Words
          text="Langsung lewat notifikasi"
          t={t}
          at={24.1}
          leave={26}
          size={56}
          style={{
            position: "absolute",
            left: 200,
            width: 460,
            top: 225,
            lineHeight: 1.18,
          }}
        />
      )}
    </>
  );
};
