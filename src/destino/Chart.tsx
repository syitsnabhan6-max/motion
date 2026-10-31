import React from 'react';
import {C,structureSketch} from './content';
import {enter,m,path,clamp} from './motion';
import {Glass} from './Primitives';

const plot={x:64,y:112,w:680,h:650};
const Y=(v:number)=>plot.y+(4700-v)/1000*plot.h;
const hist=structureSketch.map((v,i)=>[plot.x+i/(structureSketch.length-1)*plot.w,Y(v)]);
const line=(points:number[][])=>points.map((p,i)=>`${i?'L':'M'}${p[0]} ${p[1]}`).join(' ');
const sample=(points:number[][],p:number)=>{const n=clamp(p)*(points.length-1),i=Math.min(Math.floor(n),points.length-2),f=n-i;return points[i].map((v,k)=>v+(points[i+1][k]-v)*f);};

export const Chart:React.FC<{t:number;mode?:'structure'|'bear'|'reclaim'|'cover';at?:number}>=({t,mode='structure',at=0})=>{
 const s=t-at,isStructure=mode==='structure'||mode==='cover';
 const y=(v:number)=>isStructure?Y(v):plot.y+(4250-v)/500*plot.h;
 const p=enter(s,.25,2.2);
 const demo=mode==='bear' ? [[70,y(4080)],[150,y(4000)],[260,y(3875)],[355,y(3955)],[435,y(3880)],[500,y(3860)],[560,y(3870)],[650,y(3800)]] : [[70,y(4035)],[150,y(3875)],[240,y(3950)],[340,y(4030)],[430,y(4005)],[505,y(4075)],[590,y(4100)],[675,y(4200)]];
 const points=isStructure?hist:demo;
 const draw=isStructure?p:m(s,.5,8.2);
 const dot=sample(points,draw),focus=isStructure?m(s,2.8,4.2)*(1-m(s,6.1,8)):m(s,2.3,4)*(1-m(s,8.1,9.8));
 const z=mode==='cover'?1:1+.14*focus;
 return <div style={{position:'absolute',left:100,top:570,width:830,height:860,perspective:1700,transform:`translate(${focus*-15}px,${-focus*35}px) scale(${z})`}}>
  <Glass style={{position:'absolute',inset:0,transformOrigin:'50% 50%',transform:`rotateX(${path(s,[0,2.2,6,10],[21,10,5,13])}deg) rotateY(${path(s,[0,3.6,8,12],[-22,9,-7,-12])}deg) rotateZ(${path(s,[0,4.4,10],[-8,-3,-5])}deg)`,padding:0}}>
   <svg width="830" height="860" viewBox="0 0 830 860" style={{overflow:'visible',fontFamily:'DM Sans',fontVariantNumeric:'tabular-nums'}}>
    <defs><linearGradient id={`area-${mode}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor={C.royal} stopOpacity=".4"/><stop offset="1" stopColor={C.blue} stopOpacity="0"/></linearGradient></defs>
    <text x="64" y="65" fill={C.white} fontSize="36" fontWeight="600">XAUUSD</text><text x="670" y="65" fill={C.mute} fontSize="30">{isStructure?'D1 / H4':'SKENARIO'}</text>
    {(isStructure?[4600,4400,4200,4000,3800]:[4200,4100,4000,3900,3800]).map(v=><g key={v}><path d={`M64 ${y(v)}H744`} stroke={v===4000?'#8dcaff99':'#8dcaff20'} strokeWidth={v===4000?2:1} strokeDasharray={v===4000?'8 10':undefined}/><text x="65" y={y(v)-11} fontSize="30" fill={v===4000?C.white:C.mute}>{(v/1000).toFixed(1).replace('.',',')}k</text></g>)}
    {Array.from({length:8},(_,i)=><path key={i} d={`M${64+i*97} 112V762`} stroke="#8dcaff14"/>)}
    {isStructure&&<path d={line(hist)+`L744 762H64Z`} fill={`url(#area-${mode})`} opacity={p*.55}/>}
    <path d={line(points)} fill="none" stroke={C.ice} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray={isStructure?'1':'0.012 .008'} strokeDashoffset={isStructure?1-draw:0} opacity={isStructure?1:.2}/>
    {!isStructure&&<path d={line(points)} fill="none" stroke={C.ice} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-draw}/>}
    {draw>0&&<><circle cx={dot[0]} cy={dot[1]} r={12+Math.sin(s*3)*2} fill={C.ice} opacity=".16"/><circle cx={dot[0]} cy={dot[1]} r="5" fill={C.white}/></>}
    {isStructure&&<g opacity={enter(s,3.4)}>
     <path d="M364 156L716 557" fill="none" stroke="#b2d9ff" strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset={1-m(s,3.6,5.7)}/>
     {[ [373,Y(4660)], [480,Y(4415)], [620,Y(4170)] ].map(([x,y],i)=><g key={i} opacity={enter(s,3.5+i*.6)}><circle cx={x} cy={y} r="17" stroke={C.white} strokeWidth="2" fill="#0c2b54"/><text x={x-20} y={y-29} fontSize="30" fill={C.white}>LH</text></g>)}
    </g>}
    {!isStructure&&<g opacity={enter(s,3.8)}><rect x="403" y={y(mode==='bear'?3890:4020)} width="81" height="45" rx="10" stroke={C.ice} strokeWidth="2" fill="#1267db30"/><text x="400" y={y(mode==='bear'?3890:4020)-15} fontSize="30" fill={C.white}>Retest</text></g>}
    <text x="64" y="818" fill={C.mute} fontSize="30">{isStructure?'Skema struktur · acuan chart user':'Jalur ilustratif · menunggu konfirmasi'}</text>
   </svg>
  </Glass>
 </div>;
};
