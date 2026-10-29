import { m, mix } from "./motion";

// One continuous spatial curve replaces the old stop-at-every-waypoint entrance.
const cubic = (a: number, b: number, c: number, d: number, p: number) =>
  (1 - p) ** 3 * a +
  3 * (1 - p) ** 2 * p * b +
  3 * (1 - p) * p * p * c +
  p ** 3 * d;
export const arrivalProgress = (t: number) => m(t, 20, 22.8);
export const phoneFocus = (t: number) =>
  t < 25.65 ? m(t, 23.5, 24.85) : 1 - m(t, 25.65, 27.8);
export const phoneBlur = (t: number) =>
  12 * m(t, 20, 20.55) * (1 - arrivalProgress(t)) + 9 * phoneFocus(t);

export function phonePose(t: number) {
  const a = arrivalProgress(t),
    focus = phoneFocus(t),
    exit = m(t, 28.4, 29.2);
  const x =
    t < 22.8
      ? cubic(1080, 900, 1510, 1460, a)
      : cubic(1460, 1450, 1190, 1040, focus);
  const y =
    t < 22.8 ? cubic(930, 180, 285, 300, a) : cubic(300, 295, 205, 225, focus);
  // Exponential magnification gives the pullback an even perceived speed.
  const s = t < 22.8 ? mix(1.75, 0.78, a) : 0.78 * Math.pow(1.4 / 0.78, focus);
  const ry = t < 22.8 ? mix(-35, -3, a) : -3 * (1 - focus);
  const rz = t < 22.8 ? mix(-10, 0, a) : 0;
  return {
    x: mix(x, 1660, exit),
    y: mix(y, 690, exit),
    s: mix(s, 0.5, exit),
    ry: mix(ry, 20, exit),
    rz: mix(rz, 8, exit),
  };
}

// The chart and phone share the same arrival / focus clock.
export function phoneChartPose(t: number) {
  const a = arrivalProgress(t),
    focus = phoneFocus(t);
  return {
    s: mix(mix(0.97, 0.75, a), 0.66, focus),
    x: mix(mix(900, 690, a), 360, focus),
    y: mix(305, 315, focus),
    ry: mix(mix(0, 4, a), 9, focus),
    rx: mix(mix(0, 2, a), 3, focus),
    rz: mix(mix(0, -1, a), -3, focus),
  };
}
