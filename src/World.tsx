import React from 'react';
import {staticFile} from 'remotion';
import {camera,move} from './motion';
import {palette as P} from './content';
const losses=[250,180,120,320,90,210,150,420];
export const Chart:React.FC<{id:string;progress?:number;up?:boolean}> = ({id,progress=1,up=false}) => {
 const path=up?'M0 165L45 130L92 152L145 88L195 113L245 42L295 67L350 12':'M0 15L42 40L86 28L130 76L177 57L220 111L265 95L310 148L350 136';
 return <svg width="100%" height="150" viewBox="0 0 350 180" preserveAspectRatio="none" style={{overflow:'visible'}}><defs><linearGradient id={id} x2="0" y2="1"><stop stopColor={up?P.sky:P.red} stopOpacity=".2"/><stop offset="1" stopColor={up?P.sky:P.red} stopOpacity="0"/></linearGradient></defs>
 <path d={path+'L350 180H0Z'} fill={`url(#${id})`} opacity={progress}/>
 {[40,100,160].map(y=><path key={y} d={`M0 ${y}H350`} stroke="#aac8ff13"/>)}
 <path d={path} fill="none" stroke={up?P.sky:P.red} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress}/></svg>;
};
export const LedgerCard:React.FC<{i:number;deposit?:boolean;hero?:boolean}> = ({i,deposit=false,hero=false}) => <div style={{width:450,height:320,boxSizing:'border-box',padding:30,borderRadius:30,background:'linear-gradient(145deg,#18395b,#0e203b 75%)',border:'1.5px solid #88baff47',boxShadow:hero?'0 25px 75px #0006, inset 0 1px 2px #ffffff30':'0 20px 45px #0004',color:'#eff6ff'}}>
 <div style={{display:'flex',justifyContent:'space-between',fontSize:19,letterSpacing:'.04em',color:'#9cb4d1'}}><span>{deposit?'RIWAYAT DEPOSIT':'TRANSAKSI DITUTUP'}</span><span>0{i%8+1}</span></div>
 <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',margin:'20px 0',fontVariantNumeric:'tabular-nums'}}><span style={{fontSize:43,fontWeight:600}}>{deposit?'Deposit':'Loss'}</span><span style={{fontSize:30,color:deposit?P.sky:P.red}}>{deposit?'+':'−'}${losses[i%8]}</span></div>
 {deposit?<div style={{height:145,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{height:100,width:100,borderRadius:50,background:'radial-gradient(circle at 30% 20%,#679dcc,#16345a 80%)',boxShadow:'inset 0 2px 3px #abcfff30,0 10px 30px #0004',display:'flex',alignItems:'center',justifyContent:'center',fontSize:64,color:P.sky,fontWeight:500}}>+</div></div>:<Chart id={`chart-${i}`}/>}
 <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:16,color:'#7993b5'}}><span>{deposit?'USD':'XAUUSD'}</span><span>{deposit?'COMPLETED':'CLOSED'}</span></div>
 </div>;

// Three-dimensional scrolling wall with true per-pixel radial displacement.
// Text overlays are outside this lens and remain sharp.
export const LedgerWorld:React.FC<{t:number;deposit?:boolean;focus?:number;zoom?:number}> = ({t,deposit=false,focus=0,zoom=1}) => {
 const speed=deposit?235:155;
 const scroll=t*speed;
 return <div style={{position:'absolute',inset:-180,perspective:1100,overflow:'hidden',transform:`scale(${zoom}) rotate(${Math.sin(t*.3)*2-4}deg)`,filter:`url(#lens-${deposit?'d':'l'})`}}>
 <svg width="0" height="0" style={{position:'absolute'}}><defs><filter id={`lens-${deposit?'d':'l'}`} x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB"><feImage href={staticFile('lens-map.png')} result="warp" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none"/><feDisplacementMap in="SourceGraphic" in2="warp" scale={140+80*Math.sin(t*.2)} xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg>
 <div style={{position:'absolute',left:'50%',top:'50%',transformStyle:'preserve-3d'}}>
 {Array.from({length:35},(_,i)=>{const col=i%5-2;const row=Math.floor(i/5);const y=((row*390+scroll*(col%2===0?1:-.75))%2730+2730)%2730-1365;
 const x=col*480+Math.sin(t*.23)*45;
 const z=-Math.abs(col)*135-Math.abs(y)*.06;
 return <div key={i} style={{position:'absolute',left:x-225,top:y-160,transform:`translateZ(${z}px) rotateY(${-col*12}deg) rotateX(${y*.006}deg)`,opacity:1-Math.abs(col)*.13,filter:`blur(${focus*(1+Math.abs(col)*1.1)}px)`}}><LedgerCard i={i} deposit={deposit}/></div>})}
 </div>
 </div>;
};

export const GlossIcon:React.FC<{t:number;kind:'pause'|'minus'|'arrow';size?:number}> = ({t,kind,size=260})=><div style={{width:size,height:size,perspective:1100}}><div style={{width:'100%',height:'100%',borderRadius:size*.26,background:'linear-gradient(145deg,#8bc5ff 0%,#397cff 25%,#245df1 64%,#153fab 100%)',border:'2px solid #a5ccff80',boxShadow:`inset 0 3px 5px #ffffff80,inset -6px -8px 15px #0b2b9660,12px 18px 0 #1747b0,16px 38px 65px #1c4bd54a`,display:'flex',alignItems:'center',justifyContent:'center',transform:`rotateX(${10+Math.sin(t*.6)*5}deg) rotateY(${-15+Math.sin(t*.4)*10}deg) rotateZ(${Math.sin(t*.5)*3}deg)`,position:'relative',overflow:'hidden'}}>
 <div style={{position:'absolute',inset:-100,background:'linear-gradient(120deg,transparent 36%,#ffffff25 49%,transparent 59%)',transform:`translateX(${Math.sin(t*.5)*120}px)`}}/>
 <svg width="45%" height="45%" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round">{kind==='pause'?<><path d="M33 22V78"/><path d="M67 22V78"/></>:kind==='minus'?<path d="M20 50H80"/>:<path d="M20 75L75 20M25 20H75V70"/>}</svg>
 </div></div>;

export const MarketPath:React.FC<{t:number}> = ({t}) => <div style={{position:'absolute',inset:0,perspective:1200}}><svg width="1600" height="900" viewBox="0 0 1600 900" style={{position:'absolute',top:600,left:camera(t,[31,33,35],[50,-350,-650]),transform:`rotateY(-15deg) rotateZ(-10deg) scale(${camera(t,[31,33,35],[1.5,1.25,1])})`,overflow:'visible'}}>
 {[0,1,2,3,4].map(i=><path key={i} d={`M0 ${200*i}H1600`} stroke="#8dccff13"/>)}
 <path d="M0 700L200 500L370 580L580 270L750 400L1000 80L1210 230L1510 -100" fill="none" stroke="#72baff" strokeWidth="6" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-move(t,31.3,33.4)}/>
 <circle cx={580} cy={270} r={17} fill="white"/><circle cx={580} cy={270} r={36+Math.sin(t*2)*6} fill="none" stroke="#98d5ff60" strokeWidth="2"/>
 </svg></div>;
