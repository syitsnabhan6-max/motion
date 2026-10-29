import { clamp, m, q } from "./motion";

// Reframe PULSE's existing UI, rather than adding scenes to its timeline.
export const UI = {
  width: 1120,
  height: 440,
  contentTop: 146,
  inset: 28,
  stride: 1120,
};
export const trade = {
  symbol: "XAUUSD",
  entry: "2,740",
  sl: "2,732",
  tp: "2,756",
};

// Shape-preserving cubic interpolation: same PULSE key times and values,
// but no artificial stop between consecutive moves in the same direction.
export function cameraPath(t: number, times: number[], values: number[]) {
  if (t <= times[0]) return values[0];
  if (t >= times[times.length - 1]) return values[values.length - 1];
  const slopes = values
    .slice(1)
    .map((v, i) => (v - values[i]) / (times[i + 1] - times[i]));
  const tangent = (i: number) => {
    if (i === 0 || i === values.length - 1) return 0;
    if (slopes[i - 1] * slopes[i] <= 0) return 0;
    return (2 * slopes[i - 1] * slopes[i]) / (slopes[i - 1] + slopes[i]);
  };
  let i = 0;
  while (t > times[i + 1]) i++;
  const h = times[i + 1] - times[i],
    p = (t - times[i]) / h;
  return (
    (2 * p * p * p - 3 * p * p + 1) * values[i] +
    (p * p * p - 2 * p * p + p) * h * tangent(i) +
    (-2 * p * p * p + 3 * p * p) * values[i + 1] +
    (p * p * p - p * p) * h * tangent(i + 1)
  );
}

export function reframe(t: number, sourceY: number, sourceZoom: number) {
  // Original vertical camera displacement becomes a shallow arc in the wide frame.
  const dy = (sourceY - 610) * 0.27;
  const focus = m(t, 10.65, 11.15) * (1 - m(t, 12.4, 13.6));
  const drag = m(t, 15, 15.5) * (1 - m(t, 16.25, 17.5));
  const zoom = sourceZoom * (1 + 0.085 * focus + 0.16 * drag);
  return {
    x: 1120 + Math.sin(((sourceY - 610) / 690) * Math.PI) * 26 + focus * 12,
    y: 300 + dy - focus * 8,
    zoom,
  };
}

export function ballCard(t: number, start: number, end: number) {
  const duration = end - start,
    u = clamp((t - start) / duration);
  const grow = q((u - 0.32) / 0.68);
  let y = 0;
  if (u < 0.3) y = -62 * (1 - (u / 0.3) ** 2);
  else if (u < 0.68) y = -23 * Math.sin((Math.PI * (u - 0.3)) / 0.38);
  const squash =
    Math.exp(-Math.pow((u - 0.3) / 0.055, 2)) * 0.21 +
    Math.exp(-Math.pow((u - 0.68) / 0.045, 2)) * 0.08;
  return { grow, y, sx: 1 + squash, sy: 1 - squash * 0.65 };
}

export function curveOffset(t: number, a: number, b: number, height: number) {
  return Math.sin(m(t, a, b) * Math.PI) * height;
}
