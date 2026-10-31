import React from 'react';
import {staticFile} from 'remotion';
import {smooth} from './timing';

export const Surface: React.FC<{t: number}> = ({t}) => {
  const focus = smooth(t, 7.1, 9.4);
  return <>
    <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 12% 34%,#07192f 0%,#030711 63%)'}}/>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0}}>
      <defs>
        <linearGradient id="rev-flow" x1="0" y1="0" x2="1" y2=".55">
          <stop stopColor="#03101e"/><stop offset=".48" stopColor="#06438a"/><stop offset=".78" stopColor="#0b5bb4"/><stop offset="1" stopColor="#03101e"/>
        </linearGradient>
        <linearGradient id="rev-edge" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#061c37"/><stop offset=".5" stopColor="#09396f"/><stop offset="1" stopColor="#02060e"/>
        </linearGradient>
        <radialGradient id="rev-halo"><stop stopColor="#1269cc" stopOpacity=".23"/><stop offset="1" stopColor="#1269cc" stopOpacity="0"/></radialGradient>
      </defs>
      <g transform={`translate(${Math.sin(t*.25)*55-focus*190} ${Math.cos(t*.2)*80}) rotate(${-12+Math.sin(t*.15)*8} 540 960)`}>
        <path d="M900 -500 C400 0 1450 400 950 1050 C450 1700 600 1950 1400 2450 L1900 2000 C900 1560 1220 1320 1460 850 C1750 250 1000 -100 1500 -450Z" fill="url(#rev-flow)"/>
        <path d="M-500 -100 C400 350 -600 1150 150 1650 C560 1920 250 2200 -300 2400 L-800 2200 C-100 1680 -800 1250 -500 -100" fill="url(#rev-edge)"/>
      </g>
      <ellipse cx={540+Math.sin(t*.32)*240} cy={1200-focus*300} rx="700" ry="900" fill="url(#rev-halo)"/>
    </svg>
    <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 45% 45%,transparent 30%,#02040bb3 100%)'}}/>
    <div style={{position:'absolute',inset:-30,backgroundImage:`url(${staticFile('destino/grain.png')})`,backgroundRepeat:'repeat',backgroundSize:'192px 192px',opacity:.035,mixBlendMode:'screen',transform:`translate(${Math.sin(t*1.3)*12}px,${Math.cos(t*1.1)*10}px)`}}/>
  </>;
};

export const Words: React.FC<{text:string;t:number;at:number;size?:number;style?:React.CSSProperties}> = ({text,t,at,size=90,style}) => <div style={{fontFamily:'Sora',fontWeight:600,fontSize:size,letterSpacing:'-.065em',lineHeight:1.14,...style}}>
  {text.split(' ').map((word,i)=>{
    const p=smooth(t,at+i*.09,at+.5+i*.09);
    return <span key={`${word}-${i}`} style={{display:'inline-block',marginRight:'.24em',transform:`translateY(${(1-p)*70}px) rotateX(${(1-p)*-58}deg)`,opacity:p,filter:`blur(${(1-p)*8}px)`,transformOrigin:'50% 100%'}}>{word}</span>;
  })}
</div>;
