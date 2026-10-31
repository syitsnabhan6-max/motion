import React from 'react';
import {AbsoluteFill,Audio,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import '@fontsource/sora/600.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import {Surface,Words} from './Surface';
import {Ingot} from './Ingot';
import {ChartStage,chartPoint,tracePoint} from './ChartStage';
import {blue,curve,ice,ink,linear,mix,out,smooth,white} from './timing';

const orbSkin='radial-gradient(ellipse at 32% 23%,#dfedff 0%,#73abed 8%,#1d70ce 28%,#084084 54%,#020f27 82%)';

export const DestinoRevision:React.FC<{audio?:boolean}>=({audio=true})=>{
  const t=useCurrentFrame()/useVideoConfig().fps;
  const toChart=smooth(t,2.55,3.55),intro=1-smooth(t,2.5,3.2);
  const numberAnchor=chartPoint(t,825,580);
  const point=tracePoint(linear(t,3.05,6.45)),dot=chartPoint(t,point[0],point[1]);
  const endDot=chartPoint(7,755,745);
  const toFed=smooth(t,7,7.75);
  const [flightX,flightY]=curve(toFed,endDot,[1000,700],[200,510],[540,1000]);
  // Two diminishing contacts. Shape expansion starts only after landing.
  const bounce=t<7.75?0:t<8.18?-120*Math.sin(Math.PI*(t-7.75)/.43):t<8.42?-32*Math.sin(Math.PI*(t-8.18)/.24):0;
  const expand=smooth(t,8.42,9.25),voteMove=smooth(t,11.1,12);
  const diameter=mix(62,160,toFed);
  const w=mix(diameter,830,expand),h=mix(diameter,575,expand);
  const centerX=t<7?dot[0]:flightX,centerY=(t<7?dot[1]:flightY)+bounce-voteMove*145;
  const squash=Math.exp(-(((t-7.75)/.045)**2))*.16+Math.exp(-(((t-8.18)/.035)**2))*.08;
  const fedText=smooth(t,8.95,9.45);
  return <AbsoluteFill style={{overflow:'hidden',background:ink,color:white,fontFamily:'DM Sans'}}>
    {audio&&<><Audio src={staticFile('destino/revision/voiceover.wav')}/><Audio src={staticFile('destino/revision/music-sfx.m4a')}/></>}
    <Surface t={t}/>
    {/* Continuous subject: metal, chart point, then the Fed fact object. */}
    {t<3.7&&<Ingot t={t}/>}
    <div style={{position:'absolute',inset:0,opacity:intro,transform:`translateY(${-smooth(t,2.5,3.2)*170}px)`}}>
      <div style={{position:'absolute',left:100,top:mix(760,590,smooth(t,.65,1.3)),transformOrigin:'0 0',transform:`scale(${mix(1,.48,smooth(t,.65,1.3))})`}}><Words text="Emas" t={t} at={-.18} size={200}/></div>
      <Words text="di bawah" t={t} at={.9} size={95} style={{position:'absolute',left:100,top:705}}/>
    </div>
    {t>=2.55&&t<8.05&&<ChartStage t={t}/>}
    {t<7.75&&<div style={{position:'absolute',left:mix(92,Math.min(825,numberAnchor[0]-25),toChart),top:mix(832,numberAnchor[1]-50,toChart),fontFamily:'Sora',fontWeight:600,fontVariantNumeric:'tabular-nums',fontSize:mix(270,56,toChart),letterSpacing:'-.075em',lineHeight:1,whiteSpace:'nowrap',color:toChart>.8?ice:white,opacity:out(t,1.15,1.7)*(1-smooth(t,7.25,7.7)),transform:`translateY(${(1-out(t,1.15,1.7))*110}px)`,filter:`blur(${(1-out(t,1.15,1.7))*8}px)`}}>4.000</div>}
    <div style={{position:'absolute',left:90,right:70,top:385,opacity:1-smooth(t,6.85,7.5),transform:`translateX(${-smooth(t,6.85,7.5)*600}px)`}}>
      <Words text="Pantulan?" t={t} at={3.1} size={105}/>
      <Words text="Atau lanjut turun?" t={t} at={4.6} size={59} style={{color:ice,marginTop:18}}/>
    </div>
    {t>=3&&t<7.7&&<div style={{position:'absolute',left:90,top:1515,fontSize:32,color:'#8ba5c4',opacity:smooth(t,3,3.7)*(1-smooth(t,6.9,7.5))}}>XAUUSD · Skema struktur D1 / H4</div>}
    {t>=3.05&&<>
      <div style={{position:'absolute',left:centerX-w/2,top:centerY-h/2,width:w,height:h,opacity:smooth(t,3.05,3.3),transform:`perspective(1700px) rotateX(${expand*6-voteMove*4}deg) rotateY(${-expand*9+voteMove*6}deg) rotateZ(${-expand*4+voteMove*3}deg) scale(${1+squash},${1-squash})`,borderRadius:mix(120,48,expand),background:orbSkin,boxShadow:`inset 0 2px 2px #f0f6ff90, inset -8px -15px 20px #0005, 0 ${mix(10,50,expand)}px ${mix(20,110,expand)}px #0009`,overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,borderRadius:48,background:'linear-gradient(135deg,#1458a2 0%,#0b2445 36%,#071222 74%)',opacity:expand,border:'2px solid #96c9ff55'}}/>
        <div style={{position:'absolute',inset:1,borderRadius:47,background:`linear-gradient(${110+t*3}deg,transparent 32%,#c3e2ff0d 46%,transparent 63%)`,opacity:expand}}/>
        <div style={{position:'absolute',inset:0,padding:65,opacity:fedText,fontFamily:'Sora',transform:`translateY(${(1-fedText)*50}px)`}}>
          <div style={{fontFamily:'DM Sans',fontSize:34,color:'#aac6e7',display:'flex',justifyContent:'space-between'}}><span>The Fed</span><span>28 Okt 2026</span></div>
          <div style={{fontSize:151,fontWeight:600,letterSpacing:'-.075em',lineHeight:1,marginTop:55}}>Hold</div>
          <div style={{fontSize:85,fontWeight:600,letterSpacing:'-.065em',marginTop:35,whiteSpace:'nowrap'}}>3,75–4,00<span style={{fontSize:53,marginLeft:8,color:ice}}>%</span></div>
          <div style={{width:70,height:6,borderRadius:6,background:blue,marginTop:36}}/>
        </div>
      </div>
      <div style={{position:'absolute',left:440,top:1040,width:200,height:20,borderRadius:'50%',background:'#0009',filter:'blur(12px)',opacity:(1-expand)*smooth(t,7.3,7.75)*.6,transform:`scale(${1+bounce/250})`}}/>
    </>}
    <div style={{position:'absolute',left:110,right:70,top:465-voteMove*50}}><Words text="Setelah FOMC" t={t} at={7.55} size={83}/></div>
    <div style={{position:'absolute',left:146,top:1270,width:780,opacity:voteMove,transform:`translateY(${(1-voteMove)*65}px)`}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,46px)',gap:18,opacity:1-smooth(t,12.65,13.25)*.6}}>{Array.from({length:10},(_,i)=>{
          const p=out(t,11.65+i*.045,12.25+i*.045);
          return <div key={i} style={{width:46,height:46,borderRadius:'50%',background:orbSkin,transform:`translateY(${(1-p)*-80}px) scale(${p})`}}/>;
        })}</div>
        <div style={{display:'flex',gap:24,marginRight:20}}>{[0,1].map(i=>{
          const p=out(t,12.3+i*.18,12.9+i*.18);
          return <div key={i} style={{width:96,height:96,borderRadius:'50%',background:'radial-gradient(circle at 30% 25%,#fff,#c4ddfc 35%,#4171ad 73%,#153460)',boxShadow:'inset 0 2px 2px #fff,0 15px 30px #0008',transform:`translateY(${(1-p)*-200}px) scale(${p})`,display:'grid',placeItems:'center',fontSize:59,color:'#102a4e'}}>↑</div>;
        })}</div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:36,color:'#8aa8c9',marginTop:35}}><span>10 tahan</span><span style={{color:white,marginRight:30,opacity:smooth(t,12.5,13.1)}}>2 memilih naik</span></div>
    </div>
    <div style={{position:'absolute',left:90,bottom:255,display:'flex',alignItems:'center',gap:25,fontSize:32,color:'#6883a6',opacity:smooth(t,13.3,14)}}><span style={{color:'#b3c9e3',fontWeight:600}}>Destino<span style={{color:'#4491e9'}}>CT</span></span><span style={{width:30,height:1,background:'#476381'}}/><span>2–6 NOV 2026</span></div>
  </AbsoluteFill>;
};
