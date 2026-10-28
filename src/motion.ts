import {Easing,interpolate} from 'remotion';
export const ease=Easing.bezier(.22,1,.36,1);
export const cinematic=Easing.bezier(.65,0,.35,1);
export const move=(t:number,a:number,b:number,x=0,y=1)=>interpolate(t,[a,b],[x,y],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
export const camera=(t:number,times:number[],values:number[])=>interpolate(t,times,values,{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:cinematic});
export const visible=(t:number,a:number,b:number)=>move(t,a,a+.55)*(1-move(t,b-.4,b));
