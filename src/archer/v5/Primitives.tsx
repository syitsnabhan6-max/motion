import React from "react";
import { Logo } from "../Brand";
import { C, move, reveal } from "./motion";

export const Check: React.FC<{ progress?: number; size?: number }> = ({
  progress = 1,
  size = 72,
}) => (
  <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
    <path
      d="M17 36L30 49L55 23"
      pathLength="1"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="1"
      strokeDashoffset={1 - progress}
    />
  </svg>
);
export const Bell: React.FC<{ size?: number; rotate?: number }> = ({
  size = 58,
  rotate = 0,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <path
      d="M15 43C21 36 18 31 20 23C23 11 42 10 45 23C47 31 44 36 50 43Q51 47 47 47H18Q13 47 15 43Z"
      stroke="currentColor"
      strokeWidth="3"
    />
    <path
      d="M26 53Q32 60 39 53M32 10V6"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// A single material family: crimson lacquer, soft-box reflections, deep rim shadow.
export const SphereSkin: React.FC<{
  t: number;
  open?: number;
  children?: React.ReactNode;
}> = ({ t, open = 0, children }) => (
  <>
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg,#251014,#110c10 55%,#1c0d12)",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 1 - open,
        background: `radial-gradient(ellipse at ${31 + Math.sin(t * 0.7) * 5}% 21%,#fff9ed 0%,#ffc4c3 3%,#ff7b80 11%,#f52c40 30%,#ad112c 52%,#390919 74%,#100710 89%,#df344c 100%)`,
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 1 - open,
        background:
          "radial-gradient(ellipse at 75% 78%,#ff607c66,transparent 31%),radial-gradient(ellipse at 30% 20%,transparent 45%,#000000b0 90%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: open,
        background: `radial-gradient(ellipse at ${76 + Math.sin(t * 0.37) * 8}% -30%,#ed344530,transparent 62%),linear-gradient(${118 + Math.sin(t * 0.4) * 9}deg,#ffffff09,transparent 42%,#ff516309 75%,#ffffff08)`,
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: "4%",
        borderRadius: "inherit",
        border: "1px solid #ffffff12",
        opacity: 1 - open,
      }}
    />
    {children}
  </>
);

export const Ball: React.FC<{
  t: number;
  size: number;
  white?: boolean;
  mark?: boolean;
}> = ({ t, size, white = false, mark = false }) => (
  <div
    style={{
      position: "relative",
      width: size,
      height: size,
      borderRadius: "50%",
      overflow: "hidden",
      background: white ? "#eee7e7" : C.red,
      boxShadow:
        "inset -6px -12px 22px #0009,0 18px 35px #0008,0 0 32px #f0324017",
    }}
  >
    {white ? (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 32% 21%,#fff 1%,#f8f2f1 18%,#a7959a 55%,#20151c 86%,#f28f9f 100%)",
        }}
      />
    ) : (
      <SphereSkin t={t} />
    )}
    {mark && (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          transform: "rotate(-9deg)",
        }}
      >
        <Logo white={!white} size={size * 0.55} />
      </div>
    )}
  </div>
);

export const Title: React.FC<{
  t: number;
  at: number;
  until: number;
  lines: string[];
  x?: number;
  y?: number;
  size?: number;
  direction?: "up" | "left";
  accent?: number;
}> = ({
  t,
  at,
  until,
  lines,
  x = 110,
  y = 195,
  size = 84,
  direction = "up",
  accent = 1,
}) => {
  if (t < at || t > until + 0.5) return null;
  const exit = move(t, until, until + 0.5);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        fontSize: size,
        fontWeight: 500,
        letterSpacing: "-.055em",
        lineHeight: 1.09,
        transform: `translateY(${-exit * 22}px)`,
        opacity: 1 - exit,
      }}
    >
      {lines.map((line, i) => {
        const p = reveal(t, at + i * 0.15, 0.9),
          blur = (1 - p) * 13 + exit * 8;
        const id = `word-${at}-${i}`;
        return (
          <div
            key={line}
            style={{
              position: "relative",
              paddingBottom: 8,
              whiteSpace: "nowrap",
              color: i === accent ? C.light : C.white,
              opacity: p,
              transform: `translate(${direction === "left" ? (1 - p) * -65 : 0}px,${direction === "up" ? (1 - p) * 36 : 0}px)`,
              filter: blur > 0.05 ? `url(#${id})` : undefined,
            }}
          >
            <svg width="0" height="0" style={{ position: "absolute" }}>
              <filter id={id} x="-30%" y="-100%" width="160%" height="300%">
                <feGaussianBlur
                  stdDeviation={
                    direction === "up"
                      ? `${blur * 0.08} ${blur}`
                      : `${blur} ${blur * 0.08}`
                  }
                />
              </filter>
            </svg>
            {line}
          </div>
        );
      })}
    </div>
  );
};

export const Cursor: React.FC<{
  x: number;
  y: number;
  opacity: number;
  press: number;
}> = ({ x, y, opacity, press }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      opacity,
      transform: `scale(${1 - press * 0.17})`,
      filter: "drop-shadow(0 4px 5px #0008)",
    }}
  >
    <svg width="32" height="42" viewBox="0 0 32 42">
      <path
        d="M3 2L5 33L13 24L21 38L28 34L20 21L30 19Z"
        fill="#fff6f4"
        stroke="#18080d"
        strokeWidth="1.5"
      />
    </svg>
  </div>
);
