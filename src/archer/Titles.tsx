import React from "react";
import { m, out } from "./motion";
export const Words: React.FC<{
  text: string;
  t: number;
  at: number;
  leave?: number;
  size?: number;
  style?: React.CSSProperties;
}> = ({ text, t, at, leave = 100, size = 82, style }) => {
  const exit = m(t, leave, leave + 0.48);
  return (
    <div
      style={{
        fontSize: size,
        fontWeight: 550,
        letterSpacing: -size * 0.05,
        lineHeight: 1.13,
        ...style,
      }}
    >
      {text.split(" ").map((w, i) => {
        const p = out(t, at + i * 0.09, 0.82);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              marginRight: ".24em",
              opacity: p * (1 - exit),
              transform: `translateY(${(1 - p) * 52 - exit * 48}px) rotateX(${(1 - p) * 35}deg)`,
              filter: `blur(${(1 - p) * 9 + exit * 8}px)`,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
