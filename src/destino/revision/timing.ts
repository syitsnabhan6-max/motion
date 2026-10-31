// PULSE easing and Archer's cubic paths, with a new object-led camera route.
export {curve} from '../../archer/v5/motion';
export const clamp = (x: number) => Math.max(0, Math.min(1, x));
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
export const linear = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
export const smooth = (t: number, a: number, b: number) => {
  const p = linear(t, a, b);
  return p * p * p * (10 + p * (-15 + p * 6));
};
export const out = (t: number, a: number, b: number) => 1 - (1 - linear(t, a, b)) ** 4;
export const key = (t: number, stops: number[], values: number[]) => {
  if (t <= stops[0]) return values[0];
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i]) return mix(values[i - 1], values[i], smooth(t, stops[i - 1], stops[i]));
  }
  return values[values.length - 1];
};

export const REVISION = {width: 1080, height: 1920, fps: 60, seconds: 15};
export const ink = '#030711';
export const white = '#f4f7fc';
export const blue = '#1569d1';
export const ice = '#a9cfff';
