import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, interpolateColors, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import {claims, palette as P, settings} from './content';
const ease = Easing.bezier(.22,1,.36,1);
const smooth = Easing.bezier(.65,0,.35,1);
const tween=(t:number,a:number,b:number,x=0,y=1)=>interpolate(t,[a,b],[x,y],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
const track=(t:number,times:number[],values:number[])=>interpolate(t,times,values,{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:smooth});
const windowAt=(t:number,a:number,b:number)=>tween(t,a,a+.7)*(1-tween(t,b-.45,b));
const mono:React.CSSProperties={fontVariantNumeric:'tabular-nums',letterSpacing:'-.03em'};
const card:React.CSSProperties={borderRadius:36,border:'1.5px solid rgba(255,255,255,.16)',boxShadow:'0 30px 80px rgba(0,16,50,.16)',overflow:'hidden'};

const Graph:React.FC<{t:number;positive?:boolean;light?:boolean}> = ({t,positive=false,light=false}) => {
 const points=positive?'0,170 65,145 125,164 195,95 260,125 330,65 395,90 470,30 540,52 610,5':'0,20 65,45 125,32 195,95 260,70 330,128 395,112 470,168 540,146 610,195';
 const color=positive?P.sky:P.red;
 return <svg viewBox="0 0 610 220" width="100%" height="220" style={{overflow:'visible'}}>
 <defs><linearGradient id={positive?'area-up':'area-down'} x1="0" y1="0" x2="0" y2="1"><stop stopColor={color} stopOpacity=".18"/><stop offset="1" stopColor={color} stopOpacity="0"/></linearGradient></defs>
 {[20,85,150,215].map(y=><line key={y} x1="0" x2="610" y1={y} y2={y} stroke={light?'#dbe5ef':'#ffffff12'}/>)}
 <polygon points={`0,220 ${points} 610,220`} fill={`url(#${positive?'area-up':'area-down'})`} opacity={tween(t,0,1)}/>
 <polyline points={points} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-tween(t,0,1.8)}/>
 </svg>;
};

const Transaction:React.FC<{t:number;light?:boolean;index?:number}> = ({t,light=false,index=0}) => <div style={{...card,background:light?'#fff':'linear-gradient(140deg,#183553,#0e213c)',color:light?P.ink:P.ice,padding:38,width:690}}>
 <div style={{display:'flex',justifyContent:'space-between',fontSize:25,color:light?'#64758a':'#99adc7'}}><span>Transaksi ditutup</span><span>0{index+1}</span></div>
 <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',margin:'22px 0 30px'}}><span style={{fontSize:54,fontWeight:600}}>Loss</span><span style={{...mono,fontSize:54,color:P.red}}>−${[250,180,320][index%3]}</span></div>
 <Graph t={t}/><div style={{fontSize:23,marginTop:18,color:'#8399b6'}}>Riwayat trading <span style={{float:'right'}}>Closed</span></div>
 </div>;

const Heading:React.FC<{t:number;light:boolean}> = ({t,light}) => <>{claims.map((c,i)=>{
 const opacity=windowAt(t,c.start,c.end);if(opacity===0)return null;
 return <div key={i} style={{position:'absolute',top:i===6?365:285,left:70,right:70,textAlign:'center',color:light?P.ink:'#f7fbff',fontSize:i===5?88:82,fontWeight:600,letterSpacing:'-.055em',lineHeight:1.09}}>
 {c.lines.map((line,j)=>{const p=tween(t,c.start+j*.16,c.start+.9+j*.16);return <div key={line} style={{opacity:p*(1-tween(t,c.end-.45,c.end)),transform:`translateY(${(1-p)*40-tween(t,c.end-.45,c.end)*16}px)`,filter:`blur(${(1-p)*7}px)`,paddingBottom:8,color:j===1?(light?P.blue:P.sky):undefined}}>{line}</div>})}
 </div>;
 })}</>;

export const Film:React.FC=()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const t=frame/fps;
 const light= t<7.5 || (t>=23.7&&t<32.1) || t>=43.8;
 const bg=interpolateColors(t,[0,6.7,7.7,22.7,23.7,31.4,32.4,38.6,39.6,43,44,53.5],[P.ice,P.ice,P.ink,P.ink,P.ice,P.ice,P.ink,P.ink,P.blue,P.blue,P.ice,P.ice]);
 const panelX=track(t,[0,6,8,14,16,22.5,24,31,33,38,40,43,45],[0,0,0,0,65,65,-1150,-1150,0,0,0,0,0]);
 const panelY=track(t,[0,5.8,7.7,13.5,16,22.5,24,31,33,38.5,40,43,45],[770,770,740,740,760,760,760,760,735,735,840,840,930]);
 const panelScale=track(t,[0,5.8,7.7,13,16,22.5,24,31,33,38.5,40,43,45],[.92,.92,1,1,1.05,1.05,.9,.9,1,1,.85,.85,.86]);
 const panelOpacity=1-tween(t,38.5,39.5)+tween(t,43,44);
 return <AbsoluteFill style={{background:bg,fontFamily:'DM Sans',overflow:'hidden'}}>
 {settings.audio&&<Audio src={staticFile('original-audio.m4a')}/>}
 <div style={{position:'absolute',inset:-250,background:`radial-gradient(ellipse at ${52+Math.sin(t*.24)*17}% ${42+Math.cos(t*.18)*17}%, ${light?'#b5d4f76b':'#245bba45'}, transparent 60%)`,transform:`rotate(${Math.sin(t*.1)*10}deg)`}}/>
 <div style={{position:'absolute',inset:0,backgroundImage:`linear-gradient(${light?'#245ba109':'#d4e8ff06'} 1px, transparent 1px),linear-gradient(90deg,${light?'#245ba109':'#d4e8ff06'} 1px,transparent 1px)`,backgroundSize:'90px 90px',opacity:.5,transform:`translateY(${Math.sin(t*.15)*15}px)`}}/>
 {/* One persistent UI world: the same card survives zoom, lift, diagram and pause. */}
 <div style={{position:'absolute',top:panelY,left:155,transform:`translateX(${panelX}px) scale(${panelScale*(1+Math.sin(t*.32)*.012)}) rotate(${track(t,[0,6,8,14,16,23],[-2,-2,0,0,-3,-3])}deg)`,transformOrigin:'center center',opacity:Math.min(1,panelOpacity)}}>
 <div style={{...card,position:'absolute',width:780,height:675,left:-30,top:-115,background:light?'#ffffffa8':'#152c497d',opacity:1-tween(t,7,9),padding:30}}>
 <div style={{fontSize:28,color:light?'#74869b':'#a2b7d3',display:'flex',justifyContent:'space-between'}}><span>Trading journal</span><span>•••</span></div>
 </div>
 {[2,1].map(i=><div key={i} style={{position:'absolute',top:track(t,[7,9,14,16,22],[35*i,155*i,155*i,105*i,105*i]),left:track(t,[7,9,14,16],[12*i,-45*i,-45*i,-55*i]),transform:`scale(${1-i*.075}) rotate(${-i*3}deg)`,opacity:tween(t,7.4+i*.15,8.5+i*.15)*(1-tween(t,43,44))*.6}}><Transaction t={t-7-i*.2} index={i}/></div>)}
 <div style={{position:'relative',transform:`translateY(${tween(t,0,1.5,45,0)}px)`}}><Transaction t={t-.4} light={light}/></div>
 <div style={{position:'absolute',inset:-8,border:`3px solid ${P.blue}`,borderRadius:42,opacity:windowAt(t,4.7,7.4),boxShadow:'0 0 0 10px #2463f50b'}}/>
 <svg width="70" height="85" viewBox="0 0 70 85" style={{position:'absolute',left:track(t,[3,5,6],[790,570,570]),top:track(t,[3,5,6],[640,120,120]),opacity:windowAt(t,3.4,7)}}><path d="M8 5L12 65L29 48L44 75L57 68L42 43L65 38Z" fill="white" stroke={P.ink} strokeWidth="3"/></svg>
 </div>
 {/* UI expands into a decision diagram, retaining the transaction's blue action color. */}
 <div style={{position:'absolute',left:95,right:95,top:740,transform:`translateX(${track(t,[22.8,24.2,30.7,32.3],[1200,0,0,-1200])}px)`,opacity:windowAt(t,22.8,32.3)}}>
 <div style={{...card,background:'#fff',padding:'38px 44px',fontSize:35,color:P.ink,display:'flex',justifyContent:'space-between'}}><span>Uang yang sudah hilang</span><span style={{color:P.red}}>−$750</span></div>
 <svg width="890" height="180" style={{display:'block'}}><path d="M445 0V100Q445 125 420 125H180Q155 125 155 150V180M445 100Q445 125 470 125H710Q735 125 735 150V180" fill="none" stroke={P.blue} strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset={1-tween(t,25,26.5)}/></svg>
 <div style={{display:'flex',gap:28}}>{['Keputusan baru','Beban masa lalu'].map((label,i)=><div key={label} style={{...card,flex:1,padding:32,height:210,background:i?'#dfeaff':'white',transform:`translateY(${tween(t,25.5+i*.25,26.5+i*.25,35,0)}px)`,opacity:tween(t,25.5+i*.25,26.5+i*.25),fontSize:32,color:P.ink}}><svg width="64" height="64" viewBox="0 0 64 64" style={{display:'block',marginBottom:24}}><path d={i?'M18 24H43Q55 24 55 38Q55 52 38 52M18 24L31 11M18 24L31 37':'M12 52L49 15M20 15H49V44'} fill="none" stroke={P.blue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>{label}</div>)}</div>
 </div>
 {/* Chart takes over the UI plane for market / capital beats. */}
 <div style={{position:'absolute',left:90,right:90,top:750,opacity:windowAt(t,32,39.1),transform:`translateY(${tween(t,32,33,70,0)}px)`,background:'linear-gradient(160deg,#142d4c,#0d1e35)',...card,padding:46}}>
 <div style={{fontSize:30,color:'#a4b6cc',marginBottom:42}}>Market terus bergerak</div><Graph t={t-32} positive/>
 <div style={{height:1,background:'#ffffff15',margin:'36px 0'}}/>
 <div style={{fontSize:27,color:'#a4b6cc'}}>Riwayat deposit</div>
 {[250,500,750].map((n,i)=><div key={n} style={{display:'flex',justifyContent:'space-between',marginTop:25,fontSize:32,opacity:tween(t,34+i*.45,34.8+i*.45),transform:`translateY(${tween(t,34+i*.45,34.8+i*.45,20,0)}px)`}}><span style={{color:'#dfeafb'}}>Deposit 0{i+1}</span><span style={{color:P.sky,...mono}}>+${n}</span></div>)}
 </div>
 <div style={{position:'absolute',top:850,left:160,width:760,height:760,border:'1px solid #ffffff23',borderRadius:'50%',opacity:windowAt(t,39,43.8),transform:`scale(${tween(t,39,43,.6,1.05)})`}}><div style={{position:'absolute',inset:90,border:'1px solid #ffffff23',borderRadius:'50%'}}/><div style={{position:'absolute',inset:190,border:'1px solid #ffffff23',borderRadius:'50%'}}/><svg width="180" height="180" viewBox="0 0 64 64" style={{position:'absolute',left:290,top:290}}><path d="M12 52L49 15M20 15H49V44" stroke="#e9f3ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></div>
 {/* Pause state is an action on the same card. */}
 <div style={{position:'absolute',top:700,left:435,width:210,height:210,borderRadius:70,background:P.blue,display:'flex',alignItems:'center',justifyContent:'center',gap:24,boxShadow:'0 24px 70px #2463f53b',opacity:tween(t,43.6,44.7),transform:`translateY(${tween(t,43.6,44.7,90,0)}px) scale(${tween(t,43.6,44.7,.85,1)})`}}>{[0,1].map(i=><div key={i} style={{width:22,height:80,borderRadius:8,background:'white'}}/>)}</div>
 <Heading t={t} light={light}/>
 <div style={{position:'absolute',top:track(t,[0,23,24,32,44],[1450,1630,1380,1560,1530]),left:110,right:110,textAlign:'center',fontSize:35,lineHeight:1.5,letterSpacing:'-.025em',color:light?'#50647a':'#b5c9df'}}>
 {[
 [2.4,7.1,'Satu pertanyaan yang bisa memperpanjang kerugian.'],
 [17,23.2,'Bukan peluangnya yang membaik.\nKamu merasa sudah terlalu banyak berkorban.'],
 [26.7,31.8,'Kerugian yang sudah terjadi\nmemengaruhi keputusan berikutnya.'],
 [47,53.3,'Kadang, jeda adalah cara\nuntuk tidak kehilangan lebih banyak.']
 ].map(([a,b,txt])=><div key={a} style={{position:'absolute',left:0,right:0,whiteSpace:'pre-line',opacity:windowAt(t,a as number,b as number),transform:`translateY(${tween(t,a as number,(a as number)+.8,22,0)}px)`}}>{txt}</div>)}
 </div>
 <div style={{position:'absolute',bottom:110,left:0,right:0,textAlign:'center',fontSize:26,letterSpacing:'.02em',color:light?'#71859b':'#8da3c0',opacity:tween(t,50,51)}}>@destino_ct</div>
 </AbsoluteFill>;
};
