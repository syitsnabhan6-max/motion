import {interpolate} from 'remotion';
export const clamp=(n:number)=>Math.max(0,Math.min(1,n));
// Quintic easing has zero velocity AND acceleration at its boundaries.
export const q=(n:number)=>{const x=clamp(n);return x*x*x*(x*(x*6-15)+10)};
export const m=(t:number,a:number,b:number,x=0,y=1)=>x+(y-x)*q((t-a)/(b-a));
export const out=(t:number,a:number,b:number)=>1-Math.pow(1-clamp((t-a)/(b-a)),4);
export const vis=(t:number,a:number,b:number)=>out(t,a,a+.55)*(1-m(t,b-.4,b));
export const path=(t:number,stops:number[],vals:number[])=>interpolate(t,stops,vals,{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:q});
export const C={bg:'#050407',purple:'#A862FF',lavender:'#D2ADFF',white:'#F5F3FF',muted:'#85808F',green:'#A2E9C8'};
export const timing={save:5.8,filter:11.15,risk:16.1};
