import React from "react";
import { m, out } from "./motion";
export const Words: React.FC<{
  text: string;
  t: number;
  at: number;
  leave?: number;
  size?: number;
  glow?: boolean;
  style?: React.CSSProperties;
}> = ({ text, t, at, leave = 100, size = 72, glow = true, style }) => {
  const exit = m(t, leave, leave + 0.4);
  return (
    <div
      style={{
        fontSize: size,
        fontWeight: 550,
        letterSpacing: -size * 0.045,
        lineHeight: 1.1,
        textShadow: glow ? "0 0 14px #ffe7ed55,0 0 42px #ff536f66" : undefined,
        ...style,
      }}
    >
      {text.split(" ").map((w, i) => {
        const p = out(t, at + i * 0.075, 0.72);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              marginRight: ".24em",
              opacity: p * (1 - exit),
              transform: `translateY(${(1 - p) * 38 - exit * 32}px) rotateX(${(1 - p) * 25}deg)`,
              filter: `blur(${(1 - p) * 8 + exit * 7}px)`,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
