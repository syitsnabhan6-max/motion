import React from "react";
// Large, feathered fields move continuously. No raster backdrop is stretched.
export const Atmosphere: React.FC<{ t: number }> = ({ t }) => {
  const a = Math.sin(t * 0.32),
    b = Math.cos(t * 0.23);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#100608",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -180,
          background: `radial-gradient(ellipse at ${24 + a * 13}% ${18 + b * 19}%,#bd1739dc,transparent 53%),radial-gradient(ellipse at ${88 - a * 15}% ${100 - b * 14}%,#b10d37bb,transparent 50%),linear-gradient(115deg,#23070f,#070609 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -350 + a * 220,
          top: -230 + b * 70,
          width: 2200,
          height: 650,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse,#f356772d 0%,#dc31542b 28%,transparent 68%)",
          transform: `rotate(${-11 + a * 5}deg)`,
          filter: "blur(32px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 40 - a * 210,
          top: 350 + b * 50,
          width: 2100,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(ellipse,#d8376933,transparent 65%)",
          transform: `rotate(${-9 + b * 4}deg)`,
          filter: "blur(24px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%,transparent 15%,#03030670 100%)",
        }}
      />
    </div>
  );
};
