export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const ease = (x: number) => {
  x = clamp(x);
  return x * x * x * (x * (x * 6 - 15) + 10);
};
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
export const m = (t: number, a: number, b: number, x = 0, y = 1) =>
  mix(x, y, ease((t - a) / (b - a)));
export const out = (t: number, a: number, d: number) =>
  1 - Math.pow(1 - clamp((t - a) / d), 4);
export const path = (t: number, ts: number[], vs: number[]) => {
  if (t <= ts[0]) return vs[0];
  for (let i = 1; i < ts.length; i++)
    if (t <= ts[i]) return m(t, ts[i - 1], ts[i], vs[i - 1], vs[i]);
  return vs[vs.length - 1];
};
export const spring = (t: number, start: number) => {
  const x = Math.max(0, t - start);
  return t < start ? 0 : 1 - Math.exp(-8 * x) * Math.cos(11 * x);
};
export const win = (t: number, a: number, b: number) =>
  m(t, a, a + 0.6) * (1 - m(t, b, b + 0.5));
export const RED = "#f03240";
const shotTimes = [
  8.8, 10.4, 12.1, 14.5, 17.1, 18.7, 21.8, 23.4, 25.5, 28.3, 30,
];
const rawPose = (t: number) => ({
  scale: path(
    t,
    shotTimes,
    [0.28, 0.82, 1.02, 1.28, 1.6, 1.6, 0.91, 0.91, 0.64, 0.64, 0.22],
  ),
  tx: path(
    t,
    shotTimes,
    [0, 0, -40, -130, -280, -280, -50, -50, -415, -415, -760],
  ),
  ty: path(t, shotTimes, [0, 45, 60, 35, -15, -15, 0, 0, 30, 30, 250]),
  ry: path(t, shotTimes, [-29, -13, 5, 9, -7, -7, 0, 0, -5, -5, -20]),
  rx: path(t, shotTimes, [24, 10, 0, -3, 0, 0, 0, 0, 4, 4, 15]),
  rz: path(t, shotTimes, [-7, -3, 0, 1, -1, -1, 0, 0, -2, -2, -8]),
});
function rotatePoint(p: ReturnType<typeof rawPose>, x: number, y: number) {
  const r = Math.PI / 180,
    a = p.rz * r,
    b = p.ry * r,
    c = p.rx * r;
  const xx = x * Math.cos(a) - y * Math.sin(a),
    yy = x * Math.sin(a) + y * Math.cos(a);
  const xxx = xx * Math.cos(b),
    zz = -xx * Math.sin(b);
  return [
    xxx * p.scale,
    (yy * Math.cos(c) - zz * Math.sin(c)) * p.scale,
    (yy * Math.sin(c) + zz * Math.cos(c)) * p.scale,
  ];
}
export function chartPoint(p: ReturnType<typeof rawPose>, x = 51, y = 39) {
  const [a, b, c] = rotatePoint(p, x - 1125, y - 395),
    d = 1 - c / 2200;
  return [1335 + (a + p.tx) / d, 635 + (b + p.ty) / d];
}
export function chartPose(t: number) {
  const p = rawPose(t);
  if (t < 10.4) {
    const end = chartPoint(rawPose(10.4));
    const x = m(t, 8.8, 10.4, 710, end[0]),
      y = m(t, 8.8, 10.4, 570, end[1]);
    const [a, b, c] = rotatePoint(p, 51 - 1125, 39 - 395),
      d = 1 - c / 2200;
    p.tx = (x - 1335) * d - a;
    p.ty = (y - 635) * d - b;
  }
  return p;
}
