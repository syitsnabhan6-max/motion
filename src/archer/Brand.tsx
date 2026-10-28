import React from "react";
import { Img, staticFile } from "remotion";
export const Logo: React.FC<{ size?: number; white?: boolean }> = ({
  size = 90,
  white = false,
}) => (
  <Img
    src={staticFile("archer/cupang.png")}
    style={{
      width: size,
      height: size,
      objectFit: "contain",
      filter: white ? "brightness(0) invert(1)" : undefined,
    }}
  />
);
export const Gold: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120">
    <defs>
      <linearGradient id="gold" x2="1" y2="1">
        <stop stopColor="#ffefba" />
        <stop offset=".45" stopColor="#f5c96c" />
        <stop offset="1" stopColor="#b87516" />
      </linearGradient>
      <linearGradient id="side">
        <stop stopColor="#bd852f" />
        <stop offset="1" stopColor="#ffdc83" />
      </linearGradient>
    </defs>
    <path
      d="M29 46L81 35L101 68L43 84L17 68Z"
      fill="url(#gold)"
      stroke="#e9b85f"
      strokeWidth="2"
    />
    <path d="M17 68L43 84L101 68L101 83L43 100L17 82Z" fill="url(#side)" />
    <path
      d="M43 84V100M29 46L43 84M81 35L101 68"
      stroke="#fff1bb"
      strokeWidth="2"
      opacity=".7"
    />
    <text
      x="61"
      y="64"
      fontSize="20"
      textAnchor="middle"
      fill="#8c581c"
      fontFamily="Inter"
      fontWeight="600"
      transform="rotate(-13 61 64)"
    >
      Au
    </text>
  </svg>
);
export const Bitcoin: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <Img
    src={staticFile("archer/btc.svg")}
    style={{ width: size, height: size }}
  />
);
