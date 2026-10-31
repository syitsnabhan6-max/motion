import React from 'react';
import {Img, staticFile} from 'remotion';
import {C, OutlookProps} from './content';
import {enter, m, impact, bounce} from './motion';

export const DISPLAY="'Bricolage Grotesque', sans-serif";

export const Brand: React.FC<{logoSrc: OutlookProps['logoSrc']; width?: number;}> = ({logoSrc,width=330}) => logoSrc
  ? <Img src={staticFile(logoSrc)} style={{width,height:width*.36,objectFit:'contain'}}/>
  : <div style={{fontFamily:DISPLAY,fontSize:width*.15,fontWeight:700,letterSpacing:'-.045em',whiteSpace:'nowrap'}}>Destino<span style={{color:C.ice}}>CT</span></div>;

export const Type: React.FC<{t:number; at:number; lines:string[]; top:number; size?:number; left?:number; end?:number; align?:'left'|'center'; accent?:number}> =
({t,at,lines,top,size=110,left=88,end=1000,align='left',accent=-1}) => {
  const leave=m(t,end-.5,end);
  return <div style={{position:'absolute',top,left,right:108,textAlign:align,fontFamily:DISPLAY,fontWeight:650,fontSize:size,lineHeight:1.01,letterSpacing:'-.055em',transform:`translateY(${-leave*90}px)`,opacity:1-leave}}>
    {lines.map((line,i)=>{const p=enter(t,at+i*.13,.9);return <div key={i} style={{overflow:'visible',paddingBottom:12,color:i===accent?C.ice:C.white,transform:`translate(${(1-p)*-24}px,${(1-p)*85}px) rotate(${(1-p)*-3}deg)`,opacity:p,filter:`blur(${(1-p)*7}px)`}}>{line}</div>;})}
  </div>;
};

export const Label: React.FC<{children:React.ReactNode; top:number; left?:number; color?:string; size?:number; style?:React.CSSProperties}> =
({children,top,left=88,color=C.mute,size=34,style}) => <div style={{position:'absolute',left,top,fontSize:size,color,lineHeight:1.3,...style}}>{children}</div>;

export const Background: React.FC<{t:number}> = ({t}) => <>
  <div style={{position:'absolute',inset:-300,background:`radial-gradient(ellipse at ${25+Math.sin(t*.21)*28}% ${62+Math.cos(t*.17)*25}%,#0753a65e,transparent 61%),radial-gradient(ellipse at ${85+Math.cos(t*.12)*15}% ${20+Math.sin(t*.15)*15}%,#1267db35,transparent 47%),linear-gradient(155deg,#03060c,#061428 57%,#03060c)`,transform:`rotate(${Math.sin(t*.13)*8}deg)`}}/>
  <svg width="1080" height="1920" style={{position:'absolute',inset:0,opacity:.38}}>
    <defs><linearGradient id="orbital" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1267db" stopOpacity=".05"/><stop offset=".6" stopColor="#438bd7" stopOpacity=".3"/><stop offset="1" stopColor="#1267db" stopOpacity=".03"/></linearGradient></defs>
    {[0,1,2].map(i=><ellipse key={i} cx={540+Math.sin(t*.18+i)*130} cy={1000+Math.cos(t*.12+i)*140} rx={540+i*190} ry={250+i*150} stroke="url(#orbital)" strokeWidth={1.5} fill="none" transform={`rotate(${-32+t*.7+i*16} 540 960)`}/>)}
  </svg>
  <div style={{position:'absolute',inset:-60,backgroundImage:`url(${staticFile('destino/grain.png')})`,opacity:.1,mixBlendMode:'soft-light',transform:`translate(${Math.floor(t*10)*37%50-25}px,${Math.floor(t*10)*19%50-25}px)`}}/>
  <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#03060c99,transparent 23%,transparent 80%,#03060cb0)',pointerEvents:'none'}}/>
</>;

export const Orb:React.FC<{t:number;at:number;x?:number;floor?:number;size?:number;expand?:number;children?:React.ReactNode}>=({t,at,x=540,floor=1080,size=160,expand=0,children})=>{
  const y=bounce(t,at,floor);
  const squash=.22*impact(t,at+.64)+.1*impact(t,at+1.36);
  return <div style={{position:'absolute',left:x-size/2,top:y-size/2,width:size,height:size,transform:`scale(${1+squash},${1-squash})`,borderRadius:'50%',background:'radial-gradient(circle at 32% 24%,#93d2ff 0%,#176fd5 24%,#064486 52%,#011527 82%)',boxShadow:'inset -14px -20px 32px #0007,inset 5px 5px 12px #bfe3ff75,0 34px 48px #0009',opacity:enter(t,at,.2)}}>
    <div style={{position:'absolute',inset:-12,borderRadius:'50%',border:'1px solid #93c9ff44',transform:`rotateX(63deg) rotateZ(${t*25}deg) scale(${1+expand})`}}/>{children}
  </div>;
};

export const Glass:React.FC<{children?:React.ReactNode;style?:React.CSSProperties}>=({children,style})=><div style={{borderRadius:42,background:'linear-gradient(145deg,#14375bed,#06142bf5 65%)',border:'1.5px solid #71b4f947',boxShadow:'0 38px 75px #0008,inset 0 2px 2px #cbebff35,0 10px 0 #031022',boxSizing:'border-box',...style}}>{children}</div>;
