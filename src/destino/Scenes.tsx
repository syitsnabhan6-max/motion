import React from 'react';
import {staticFile} from 'remotion';
import {C,calendar,headlines,OutlookProps} from './content';
import {m,enter,path,impact,bounce,curve} from './motion';
import {Brand,DISPLAY,Glass,Label,Orb,Type} from './Primitives';
import {Objects3D} from './Objects3D';
import {Chart} from './Chart';
import {NewsWorld} from './NewsWorld';

export const Hook:React.FC<{t:number;config:OutlookProps}>=({t,config})=><>
 <div style={{position:'absolute',left:88,top:205}}><Brand logoSrc={config.logoSrc}/></div>
 <Label top={295} size={34}>{config.week}</Label>
 <Type t={t} at={.12} top={405} lines={['Emas kehilangan']} size={76}/>
 <div style={{position:'absolute',left:76,top:520,fontFamily:DISPLAY,fontSize:248,fontWeight:700,letterSpacing:'-.075em',transform:`scale(${path(t,[0,1.3,3.3,6],[1.3,1,1,1.04])}) rotate(${Math.sin(t*.6)*1.2}deg)`,transformOrigin:'40% 50%',color:C.white,opacity:enter(t,0,.6)}}>
  {'4.000'.split('').map((v,i)=><span key={i} style={{display:'inline-block',transform:`translateY(${m(t,1.45+i*.05,2.45+i*.06)*(i%2===0?16:-12)}px) rotate(${m(t,1.45,2.3)*(i-2)*2}deg)`}}>{v}</span>)}
 </div>
 <Objects3D t={t}/>
 <Type t={t} at={3.25} top={1605} size={59} lines={['Pantulan atau lanjutan?']} accent={0}/>
</>;

export const Structure:React.FC<{t:number;config:OutlookProps}>=({t,config})=>{
 const s=t-7;
 return <>
  <Type t={s} at={.35} top={260} lines={s<5.8?['Puncak makin','rendah']:['Di bawah','4.000']} size={118} accent={1}/>
  <Chart t={s}/>
  <div style={{position:'absolute',left:120,top:1490,opacity:enter(s,5.6),transform:`translateY(${(1-enter(s,5.6))*70}px)`}}>
   <div style={{fontFamily:DISPLAY,fontSize:72,fontWeight:600,color:C.ice,letterSpacing:'-.03em'}}>{config.spot}</div>
   <div style={{fontSize:30,color:C.mute}}>Acuan spot · chart user</div>
  </div>
 </>;
};

export const Fed:React.FC<{t:number}>=({t})=>{
 const s=t-17,p=m(s,1.85,3.1),gone=1-m(s,8.1,9.0);
 const [x,y]=curve(p,[540,1050],[790,880],[410,870],[520,1010]);
 const size=160+(790-160)*p,height=160+(600-160)*p;
 const focus=m(s,4.5,5.8)*(1-m(s,7.5,8.9));
 return <>
  <Type t={s} at={.2} top={270} lines={['Ditahan.','Belum melonggar.']} size={99} accent={1}/>
  {p<.01&&<Orb t={s} at={0} floor={1050}/>}
  {p>0&&<Glass style={{position:'absolute',left:x-size/2,top:y-height/2,width:size,height,borderRadius:80-38*p,transform:`translateY(${-focus*30}px) rotateY(${-22*(1-p)}deg) rotateZ(${-12*(1-p)}deg) scale(${1+focus*.15})`,overflow:'hidden'}}>
   <div style={{width:790,height:600,opacity:m(s,2.75,3.25),padding:'52px 55px',boxSizing:'border-box'}}>
    <div style={{fontSize:34,color:C.mute}}>FOMC · 28 Oktober 2026</div>
    <div style={{fontFamily:DISPLAY,fontSize:93,fontWeight:650,letterSpacing:'-.055em',marginTop:35}}>3,75–4,00<span style={{fontSize:60}}>%</span></div>
    <div style={{fontSize:44,color:C.ice,marginTop:15}}>Target suku bunga ditahan</div>
    <div style={{display:'flex',gap:15,marginTop:65}}>{Array.from({length:12},(_,i)=><div key={i} style={{width:42,height:42,borderRadius:30,background:i<10?'linear-gradient(140deg,#73bdff,#0753a6)':C.white,boxShadow:'inset 2px 3px 4px #fff5,0 8px 14px #0005',transform:`translateY(${(1-enter(s,4+i*.065))*70}px)`,opacity:enter(s,4+i*.065)}}/>)}</div>
    <div style={{display:'flex',justifyContent:'space-between',fontSize:34,marginTop:27,color:C.mute}}><span>10 memilih hold</span><span style={{color:C.white}}>2 memilih +25 bp</span></div>
   </div>
  </Glass>}
  <div style={{position:'absolute',left:110,top:1415,opacity:enter(s,5.5)*gone,fontSize:41,color:C.ice}}>Inflasi masih tinggi</div>
  <div style={{position:'absolute',left:110,top:1415,opacity:enter(s,8.8),fontSize:41,color:C.ice}}>Hold ≠ sinyal pelonggaran</div>
  <Label top={1530} size={30}>Sumber: Federal Reserve · interpretasi bersyarat</Label>
 </>;
};

export const News:React.FC<{t:number}>=({t})=>{
 const s=t-29;
 return <>
  <NewsWorld t={s}/>
  <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 48%,#03060ced 0%,#03060ccc 26%,transparent 64%)'}}/>
  <Type t={s} at={.5} top={620} size={126} lines={['Emas dalam','tekanan']} accent={1}/>
  <Type t={s} at={2.8} top={1030} size={65} lines={['Headline bukan','konfirmasi entry']}/>
  <Label top={1510} size={30}>Sampel headline WSJ / Barron’s via Yahoo Finance</Label>
 </>;
};

export const Scenario:React.FC<{t:number;bull?:boolean}>=({t,bull=false})=>{
 const s=t-(bull?48:36),second=s>6.4;
 return <>
  <Type t={s} at={.25} top={270} size={97} lines={bull?['Rebut kembali','4.000']:['Jika support','gagal bertahan']} accent={1}/>
  <Chart t={s} mode={bull?'reclaim':'bear'}/>
  <div style={{position:'absolute',left:130,top:1460,fontFamily:DISPLAY,fontSize:74,fontWeight:650,letterSpacing:'-.035em',color:C.ice,opacity:enter(s,.7),transform:`translateY(${Math.sin(s*.6)*8}px)`}}>
   {bull?(second?'4.100–4.200':'3.980–4.020'):(second?'3.800':'3.870–3.880')}
  </div>
  <Label top={1555} left={130} size={32}>{bull?(second?'Area uji berikutnya · jika reclaim bertahan':'Reclaim + retest bertahan'):(second?'Level psikologis · jika breakdown terkonfirmasi':'Area acuan · bukan support teruji')}</Label>
  {bull&&<div style={{position:'absolute',left:100,top:1640,fontSize:34,color:C.mute,opacity:enter(s,7.1)}}>Satu wick belum cukup</div>}
 </>;
};

export const Calendar:React.FC<{t:number}>=({t})=>{
 const s=t-60,progress=path(s,[0,2.7,4.7,7.9,9.7,15.8],[0,0,1,1,2,2]);
 return <>
  <Type t={s} at={.15} top={265} lines={['Pekan penentu']} size={99}/>
  <Label top={420} color={C.ice} size={39}>2–6 November 2026</Label>
  <div style={{position:'absolute',left:125,top:700,width:780,height:710,perspective:1600}}>
   {calendar.map((event,i)=>{const d=i-progress,op=Math.max(0,1-Math.abs(d)*.6);return <Glass key={event.day} style={{position:'absolute',inset:0,padding:60,transformOrigin:'50% 75%',transform:`translate(${d*390}px,${Math.abs(d)*140+Math.sin(s*.8+i)*13}px) translateZ(${-Math.abs(d)*390}px) rotateY(${-d*28}deg) rotateZ(${d*7}deg) scale(${1-Math.min(.25,Math.abs(d)*.12)})`,opacity:op,zIndex:10-Math.round(Math.abs(d)*3)}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:34,color:C.mute}}><span>{event.weekday}</span><span>NOV 2026</span></div>
    <div style={{fontFamily:DISPLAY,fontSize:182,fontWeight:600,lineHeight:1.2,letterSpacing:'-.06em',color:C.ice}}>{event.day}</div>
    <div style={{fontFamily:DISPLAY,fontSize:62,fontWeight:650,letterSpacing:'-.04em'}}>{event.title}</div>
    <div style={{fontSize:32,marginTop:18,color:C.mute}}>{event.detail}</div>
    <div style={{fontSize:55,fontWeight:600,marginTop:63,paddingTop:28,borderTop:'2px solid #7bbaff30'}}>{event.time}</div>
   </Glass>;})}
  </div>
  <Label top={1505} size={38} color={C.ice}>Ekspektasi · revisi · dolar · yield</Label>
  <Label top={1585} size={30}>Sumber: BLS · jadwal dikonversi ke WIB</Label>
 </>;
};

export const Closing:React.FC<{t:number;config:OutlookProps}>=({t,config})=>{
 const s=t-76;
 return <>
  <div style={{position:'absolute',inset:0,transform:'translateY(-105px) scale(.86)'}}><Objects3D t={s+2} mode="close"/></div>
  <Type t={s} at={.3} top={310} lines={['Petakan level.','Tunggu konfirmasi.']} size={91} accent={1}/>
  <Type t={s} at={2.1} top={1330} lines={['Jangan kejar','candle pertama']} size={79}/>
  <div style={{position:'absolute',left:88,top:1555,opacity:enter(s,3.7)}}><Brand logoSrc={config.logoSrc} width={390}/></div>
  <Label top={1640} size={30} style={{opacity:enter(s,4.3)}}>Focus. Plan. Execute. Succeed.</Label>
 </>;
};
