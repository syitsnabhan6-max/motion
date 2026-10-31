// Reuse the tested Cupang/PULSE easing and Archer cubic paths explicitly requested.
export {clamp, q, m, out, path} from '../cupang/motion';
export {curve} from '../archer/v5/motion';
import {clamp, m, out} from '../cupang/motion';

export const enter = (t: number, at: number, duration = .8) => out(t, at, at + duration);
export const impact = (t: number, at: number, width = .12) => Math.exp(-(((t - at) / width) ** 2));
export const windowed = (t: number, a: number, b: number) => m(t, a, a + .22) * (1 - m(t, b - .25, b));
export const back = (t: number, a: number, duration = .8) => {
  const x = clamp((t-a)/duration)-1;
  return 1 + 2.2*x*x*x + 1.2*x*x;
};

// Ground-contact parabola, followed by two diminishing ballistic rebounds.
export const bounce = (t: number, at: number, floor: number, height = 630) => {
  const s=t-at;
  if(s<0) return floor-height;
  if(s<.64) return floor-height+height*(s/.64)**2;
  if(s<1.36) return floor-220*Math.sin(Math.PI*(s-.64)/.72);
  if(s<1.86) return floor-72*Math.sin(Math.PI*(s-1.36)/.5);
  return floor;
};

// Continuous vertical world: each chapter inhabits a different part of the same stage.
// Stops are eased with zero velocity/acceleration, including the horizontal arc.
export const travel = (t: number) => {
  const cuts=[7,17,29,36,48,60,76];
  return cuts.reduce((sum,c)=>sum+m(t,c-.65,c+.65),0);
};
