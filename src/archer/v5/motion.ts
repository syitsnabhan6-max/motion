// Seconds, pixels and degrees on a native 1800 × 600 stage.
// All motion is evaluated from the Remotion frame, including impacts and light.
export const C = {
  red: "#F03240",
  light: "#FFB5B7",
  white: "#FFF6F4",
  black: "#070609",
  muted: "#A1959B",
  line: "#ffffff1c",
};
export const demo = {
  symbol: "XAUUSD",
  entry: "2,740",
  sl: "2,732",
  tp: "2,756",
};
export const T = { confirm: 7.8, entry: 13.1, sl: 15.1, tp: 17.1, alert: 23.1 };
export const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const smooth = (v: number) => {
  const p = clamp(v);
  return p * p * p * (p * (p * 6 - 15) + 10);
};
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
export const move = (t: number, a: number, b: number, from = 0, to = 1) =>
  mix(from, to, smooth((t - a) / (b - a)));
export const reveal = (t: number, a: number, duration = 0.75) =>
  1 - Math.pow(1 - clamp((t - a) / duration), 4);
export const pulse = (t: number, at: number, width = 0.12) =>
  Math.exp(-Math.pow((t - at) / width, 2));
export const track = (t: number, stops: number[], values: number[]) => {
  for (let i = 1; i < stops.length; i++)
    if (t < stops[i])
      return move(t, stops[i - 1], stops[i], values[i - 1], values[i]);
  return values[values.length - 1];
};
export type Point = [number, number];
export const curve = (
  p: number,
  a: Point,
  b: Point,
  c: Point,
  d: Point,
): Point => {
  const u = 1 - p;
  return [0, 1].map(
    (i) =>
      u * u * u * a[i] +
      3 * u * u * p * b[i] +
      3 * u * p * p * c[i] +
      p * p * p * d[i],
  ) as Point;
};
export const arc = (
  t: number,
  a: number,
  b: number,
  points: [Point, Point, Point, Point],
) => curve(move(t, a, b), ...points);

export function openingBounce(t: number) {
  if (t < 0.8) return mix(-230, 350, Math.pow(clamp(t / 0.8), 2));
  if (t < 1.8) return 350 - 210 * Math.sin(Math.PI * (t - 0.8));
  if (t < 2.6) return 350 - 86 * Math.sin((Math.PI * (t - 1.8)) / 0.8);
  if (t < 3.2) return 350 - 23 * Math.sin((Math.PI * (t - 2.6)) / 0.6);
  return 350;
}

export function heroPose(t: number) {
  let x = move(t, 0, 3.2, 1420, 1260),
    y = openingBounce(t),
    w = move(t, 0, 3.2, 185, 290),
    h = w;
  let open = 0,
    ry = -12,
    rz = -7,
    scale = 1;
  if (t >= 3.2 && t < 10.8) {
    const p = move(t, 3.2, 5.15);
    [x, y] = curve(p, [1260, 350], [1440, 220], [1010, 180], [1120, 310]);
    open = p;
    w = mix(290, 1080, p);
    h = mix(290, 420, p);
    ry = mix(-12, -4, p);
    rz = mix(-7, 0, p);
    // A real close-up on the confirming ring, with a curved return to the wide UI.
    const focus = move(t, 5.8, 7.25) * (1 - move(t, 8.35, 9.8));
    scale = 1 + focus * 0.4;
    x += focus * 160;
    y -= Math.sin(focus * Math.PI) * 18;
  } else if (t >= 10.8 && t < 12.7) {
    const shrink = move(t, 10.8, 11.55),
      expand = move(t, 11.55, 12.7);
    [x, y] = arc(t, 10.8, 12.7, [
      [1120, 310],
      [1400, 80],
      [850, 110],
      [1070, 306],
    ]);
    open = 1 - shrink + expand;
    w = 1080 - 790 * shrink + 870 * expand;
    h = 420 - 130 * shrink + 130 * expand;
    ry = mix(-4, 0, expand);
    rz = -6 * Math.sin(move(t, 10.8, 12.7) * Math.PI);
  } else if (t >= 12.7 && t < 20) {
    x = 1070;
    y = 306;
    w = 1160;
    h = 420;
    open = 1;
    ry = 0;
    rz = 0;
    const focus = move(t, 13.8, 15.1) * (1 - move(t, 17.5, 19.2));
    scale = 1 + 0.22 * focus - 0.03 * move(t, 18.2, 19.2);
    x += 50 * focus - move(t, 18.2, 19.5, 0, 10);
    y -= Math.sin(focus * Math.PI) * 10;
  } else if (t >= 20 && t < 23.1) {
    const p = move(t, 20, 23.1),
      shrink = move(t, 20, 20.8);
    [x, y] = curve(p, [1060, 306], [780, 520], [1750, -20], [1420, 315]);
    open = 1 - shrink;
    w = mix(1160, 180, shrink);
    h = mix(420, 180, shrink);
    scale = track(t, [20, 20.8, 21.65, 23.1], [0.97, 1, 2.2, 0.31]);
    rz = move(t, 20, 23.1, 0, 18);
    ry = move(t, 20, 23.1, 0, -8);
  } else if (t >= 23.1 && t < 28.2) {
    const p = move(t, 23.1, 24.85);
    [x, y] = curve(p, [1420, 315], [1310, 185], [650, 150], [750, 351]);
    open = p;
    w = mix(56, 880, p);
    h = mix(56, 260, p);
    ry = mix(-8, 0, p);
    rz = mix(18, 0, p);
    scale = move(t, 25.1, 27.7, 1, 1.035);
  } else if (t >= 28.2) {
    const p = move(t, 28.2, 30.3);
    [x, y] = curve(p, [750, 351], [1100, 500], [430, 510], [590, 300]);
    open = 1 - p;
    w = mix(880, 265, p);
    h = mix(260, 265, p);
    rz = mix(0, -9, p);
    ry = -9 * p;
    scale = mix(1.035, 1, p) * move(t, 30.3, 34, 1, 1.055);
  }
  const impact =
    t < 3.25
      ? pulse(t, 0.8, 0.1) * 0.23 +
        pulse(t, 1.8, 0.095) * 0.13 +
        pulse(t, 2.6, 0.085) * 0.07
      : 0;
  // Maintain one floor contact despite growth and squash; the bottom is y=495.
  if (t < 3.2) y += 145 - (h / 2) * (1 - impact * 0.72);
  return {
    x,
    y,
    w,
    h,
    open,
    ry,
    rz,
    scale,
    sx: 1 + impact,
    sy: 1 - impact * 0.72,
  };
}

export function phonePose(t: number) {
  const p = move(t, 21.1, 23.1);
  const [x, y] = curve(p, [2040, 920], [1790, -120], [1230, 100], [1420, 300]);
  const focus = move(t, 23.1, 24.85);
  const leave = move(t, 27.7, 29.6);
  return {
    x: x + focus * 30 + leave * 520,
    y: y + leave * 180,
    scale: mix(2.2, 0.94, p) - focus * 0.04 - leave * 0.3,
    ry: mix(-42, -10, p) + focus * 3,
    rz: mix(-19, 7, p) + leave * 18,
    opacity: 1 - leave,
  };
}
