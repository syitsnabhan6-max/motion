import React from "react";
import { Logo, Gold, Bitcoin } from "./Brand";
import { m, mix, path, win, chartPose, chartPoint } from "./motion";
import { Words } from "./Titles";
const Disc: React.FC<{
  size: number;
  rotate: number;
  tilt: number;
  kind: number;
  t: number;
}> = ({ size, rotate, tilt, kind, t }) => (
  <div
    style={{
      width: size,
      height: size,
      transform: `perspective(1000px) rotateX(${tilt}deg) rotateY(${rotate}deg) rotateZ(-12deg)`,
      transformStyle: "preserve-3d",
    }}
  >
    {Array.from({ length: 7 }, (_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            i === 6
              ? "linear-gradient(140deg,#ffffff,#f2efef 65%,#c4c0c0)"
              : "linear-gradient(110deg,#8c7376,#f4e6e6 40%,#8d7277)",
          transform: `translateZ(${i * 2}px)`,
          boxShadow:
            i === 0 ? "0 30px 60px #05020470,0 0 35px #ee304b33" : undefined,
          border: "1px solid #ffffff77",
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: "translateZ(15px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          opacity: t < 6.325 ? 1 : 0,
          transform: `scaleX(${Math.abs(1 - 2 * m(t, 6, 6.65))})`,
        }}
      >
        <Logo size={size * 0.7} />
      </div>
      <div
        style={{
          opacity: t >= 6.325 ? 1 : 0,
          transform: `rotate(12deg) scaleX(${Math.abs(1 - 2 * m(t, 6, 6.65))})`,
        }}
      >
        {kind === 0 ? (
          <Gold size={size * 0.65} />
        ) : (
          <Bitcoin size={size * 0.54} />
        )}
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        inset: 6,
        border: "2px solid #ffffff99",
        borderRadius: "50%",
        transform: "translateZ(16px)",
      }}
    />
  </div>
);
export const Intro: React.FC<{ t: number }> = ({ t }) => {
  const pair = m(t, 5.5, 7.1),
    exit = m(t, 8.8, 10.35);
  const ts = [0, 3, 5.5, 7.2, 8.8, 10.35];
  return (
    <div style={{ position: "absolute", inset: 0, perspective: 1600 }}>
      {t < 6.4 && (
        <div
          style={{
            position: "absolute",
            left: 250,
            right: 250,
            top: path(t, [0, 2, 3.2], [370, 370, 310]),
            textAlign: "center",
            transform: `scale(${path(t, [0, 2, 3.2], [1, 1, 0.62])})`,
          }}
        >
          <Words text="Trading" t={t} at={0.2} leave={5.1} size={156} />
        </div>
      )}
      {t > 2.1 && t < 6.2 && (
        <Words
          text="Dengan arah yang jelas"
          t={t}
          at={2.4}
          leave={5.15}
          size={88}
          style={{
            position: "absolute",
            top: 475,
            left: 240,
            right: 240,
            textAlign: "center",
          }}
        />
      )}
      {t > 5.3 && t < 9.6 && (
        <Words
          text="Pair pilihanmu"
          t={t}
          at={5.8}
          leave={8.7}
          size={92}
          style={{
            position: "absolute",
            top: 205,
            left: 300,
            right: 300,
            textAlign: "center",
          }}
        />
      )}
      {[0, 1, 2, 3].map((i) => {
        const starts = [
          [380, 700, 225],
          [1460, 350, 180],
          [1120, 125, 125],
          [1680, 1130, 430],
        ][i];
        const targetX = i === 0 ? 710 : 1210;
        const targetY = 570;
        const x = mix(starts[0] + Math.sin(t * 0.75 + i) * 35, targetX, pair);
        const y =
          mix(starts[1] + Math.cos(t * 0.7 + i) * 25, targetY, pair) -
          Math.sin(pair * Math.PI) * 100;
        const s = mix(starts[2], i === 0 ? 260 : 240, pair);
        const anchor = chartPoint(chartPose(t));
        const finalX = i === 0 && t >= 8.8 ? anchor[0] : mix(x, 2240, exit);
        const finalY = i === 0 && t >= 8.8 ? anchor[1] : mix(y, 130, exit);
        const size = mix(s, i === 0 ? 46 * chartPose(t).scale : 360, exit);
        const opacity = i > 1 ? 1 - m(t, 5.2, 6.2) : 1 - m(t, 10.05, 10.4);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: finalX - size / 2,
              top: finalY - size / 2,
              opacity,
              filter:
                i === 3 ? "blur(15px)" : i === 2 ? "blur(1.8px)" : undefined,
              transform: `scale(${m(t, -0.2 + i * 0.12, 0.9 + i * 0.12, 0.7, 1)})`,
            }}
          >
            <Disc
              size={size}
              rotate={
                mix(
                  [-24, 27, 32, -35][i] + Math.sin(t * 0.55 + i) * 12,
                  i === 0 ? -8 : 12,
                  pair,
                ) *
                (1 - exit)
              }
              tilt={mix(14 + Math.sin(t * 0.6) * 8, 6, pair)}
              kind={i}
              t={t}
            />
            {i < 2 && (
              <div
                style={{
                  position: "absolute",
                  top: size + 46,
                  left: -100,
                  right: -100,
                  textAlign: "center",
                  opacity: win(t, 6.6, 8.75),
                  transform: "none",
                }}
              >
                <div
                  style={{ fontSize: 40, fontWeight: 550, letterSpacing: -1 }}
                >
                  {i === 0 ? "XAUUSD" : "BTC"}
                </div>
                <div style={{ fontSize: 23, color: "#ad9ea2", marginTop: 12 }}>
                  {i === 0 ? "Gold / US Dollar" : "Bitcoin"}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
