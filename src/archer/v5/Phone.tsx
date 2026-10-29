import React from "react";
import { Logo } from "../Brand";
import { C, demo, move, phonePose } from "./motion";

export const Phone: React.FC<{ t: number }> = ({ t }) => {
  const p = phonePose(t),
    alert = move(t, 23.1, 23.6),
    detached = move(t, 23.4, 24.85);
  return (
    <div
      style={{
        position: "absolute",
        left: p.x - 134,
        top: p.y - 280,
        width: 268,
        height: 560,
        transform: `perspective(1800px) scale(${p.scale}) rotateY(${p.ry}deg) rotateZ(${p.rz}deg)`,
        opacity: p.opacity,
        transformStyle: "preserve-3d",
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 43,
            background:
              "linear-gradient(105deg,#48393d,#dec6c9 25%,#2d242b 36%,#56414a 65%,#cfacb7)",
            transform: `translateZ(${-10 + i * 3}px)`,
            border: "1px solid #847078",
            boxShadow:
              i === 0 ? "0 35px 60px #000b,0 0 70px #ec34421c" : undefined,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          inset: 3,
          borderRadius: 40,
          background: "#060508",
          border: "1px solid #9a818a",
          overflow: "hidden",
          transform: "translateZ(3px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 7,
            borderRadius: 33,
            background:
              "radial-gradient(ellipse at 15% 0%,#8b152c,#240d18 50%,#0b090e)",
            overflow: "hidden",
          }}
        >
          <svg
            width="248"
            height="540"
            viewBox="0 0 248 540"
            style={{ position: "absolute", inset: 0 }}
          >
            <defs>
              <linearGradient id="phoneRibbon" x1="0" y1="0" x2="1" y2=".9">
                <stop stopColor="#ff8392" />
                <stop offset=".4" stopColor="#d52440" />
                <stop offset="1" stopColor="#3c0b20" />
              </linearGradient>
            </defs>
            <path
              d="M240 -60C-120 60 350 165 130 285S-75 485 300 625"
              fill="none"
              stroke="url(#phoneRibbon)"
              strokeWidth="150"
            />
            <path
              d="M240 -60C-120 60 350 165 130 285S-75 485 300 625"
              fill="none"
              stroke="#ffa4af"
              strokeOpacity=".3"
              strokeWidth="1"
              transform="translate(-73 0)"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 82,
              width: 83,
              height: 23,
              borderRadius: 20,
              background: "#020204",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 15,
              width: 22,
              height: 10,
              borderRadius: 3,
              border: "1px solid #ffe3e8",
              boxShadow: "inset 0 0 0 2px #572036",
              background: "#fff4f4",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 68,
              left: 0,
              right: 0,
              textAlign: "center",
              color: "#ffe4ea",
            }}
          >
            <div style={{ fontSize: 15 }}>Kamis, 29 Oktober</div>
            <div
              style={{
                fontSize: 68,
                letterSpacing: -4,
                fontWeight: 500,
                marginTop: 5,
              }}
            >
              09:41
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: 251,
              left: 11,
              right: 11,
              borderRadius: 20,
              padding: "13px 12px",
              background: "linear-gradient(120deg,#f8dfe4e8,#d9b5c4e0)",
              color: "#2e101d",
              opacity: alert * (1 - detached * 0.6),
              transform: `scale(${0.86 + 0.14 * alert})`,
              boxShadow: "0 10px 25px #14031144",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              <Logo size={24} />
              <span>ARCHER</span>
              <span
                style={{ fontSize: 9, marginLeft: "auto", fontWeight: 400 }}
              >
                sekarang
              </span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 9 }}>
              Sinyal BUY terkonfirmasi
            </div>
            <div style={{ fontSize: 11, marginTop: 5 }}>
              {demo.symbol} · Entry {demo.entry}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: 82,
              width: 83,
              height: 4,
              borderRadius: 4,
              background: C.white,
            }}
          />
        </div>
      </div>
    </div>
  );
};
