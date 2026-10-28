import React from 'react';
import {AbsoluteFill,Audio,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import {Objects3D} from './Objects3D';
import {ProductUI,PulseGlyph} from './UI';
import {C,m,out,vis,path} from './motion';
const Head:React.FC<{t:number;a:number;b:number;lines:string[];y:number;size?:number;align?:'center'|'left';accent?:number}> = ({t,a,b,lines,y,size=104,align='center',accent=-1})=>{
 if(t<a||t>b)return null;
 const exit=m(t,b-.4,b);
 return <div style={{position:'absolute',top:y,left:75,right:75,textAlign:align,lineHeight:1.05,fontSize:size,fontWeight:600,letterSpacing:'-.055em',opacity:1-exit,transform:`translateY(${-exit*25}px)`}}>{lines.map((line,i)=>{const p=out(t,a+i*.16,a+.8+i*.16);return <div key={line} style={{color:i===accent?C.lavender:C.white,transform:`translateY(${(1-p)*48}px)`,opacity:p,filter:`blur(${(1-p)*5}px)`,paddingBottom:10}}>{line}</div>})}</div>;
};
export const PulseFilm:React.FC=()=>{
 const t=useCurrentFrame()/useVideoConfig().fps;
 return <AbsoluteFill style={{background:C.bg,fontFamily:'Inter',color:C.white,overflow:'hidden'}}>
 <Audio src={staticFile('pulse/soundtrack.m4a')}/>
 <div style={{position:'absolute',inset:-200,background:`radial-gradient(ellipse at ${48+Math.sin(t*.28)*12}% ${55+Math.cos(t*.16)*15}%,#6f21b82c,transparent 54%),radial-gradient(ellipse at 75% 90%,#bc6dff18,transparent 45%)`}}/>
 <div style={{position:'absolute',left:-150,top:1050,width:1380,height:600,borderRadius:'50%',background:'radial-gradient(ellipse,#b95bff18,transparent 65%)',transform:`scale(${1+Math.sin(t*.4)*.1})`}}/>
 {(t<3.7||t>18)&&<Objects3D t={t}/>}
 <Head t={t} a={.15} b={3.25} lines={['Sebelum entry.','Lihat polanya.']} y={330} size={111} accent={1}/>
 {t>2.7&&t<19.1&&<ProductUI t={t}/>}
 <Head t={t} a={3.4} b={6.9} lines={['Satu trade.','Satu pelajaran.']} y={230} size={98} accent={1}/>
 <Head t={t} a={7.3} b={10.1} lines={['Bukan sekadar','untung-rugi.']} y={1460} size={93} align="left" accent={1}/>
 <Head t={t} a={10.5} b={12.9} lines={['Temukan','kebiasaanmu.']} y={225} size={104} accent={1}/>
 <Head t={t} a={14.5} b={18.3} lines={['Rencana dulu.','Baru entry.']} y={230} size={100} accent={1}/>
 <div style={{position:'absolute',top:1220,left:0,right:0,textAlign:'center',fontSize:116,fontWeight:500,letterSpacing:'.15em',opacity:out(t,19.2,20.4),transform:`translateY(${(1-out(t,19.2,20.4))*50}px)`}}>PULSE</div>
 <Head t={t} a={20.6} b={24.6} lines={['Baca pola.','Bukan firasat.']} y={1430} size={66} accent={1}/>
 <div style={{position:'absolute',bottom:110,left:0,right:0,textAlign:'center',fontSize:24,color:'#766982',letterSpacing:'.03em',opacity:out(t,22,23)}}>Your trading journal.</div>
 {/* Lens glint follows the selected object during the brand reveal. */}
 <div style={{position:'absolute',left:0,right:0,top:900,height:1,background:'linear-gradient(90deg,transparent,#b774ff90,transparent)',opacity:Math.exp(-Math.pow((t-19.2)/.42,2))*.35,boxShadow:'0 0 55px 10px #9537ff55'}}/>
 </AbsoluteFill>;
};
