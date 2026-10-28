import React from 'react';
import {C,m,out,path,vis,timing} from './motion';

const small:React.CSSProperties={fontSize:24,color:C.muted,letterSpacing:'-.015em'};
const pane:React.CSSProperties={background:'linear-gradient(145deg,#19151f,#0e0c12)',border:'1px solid #ffffff12',borderRadius:28};
const row=(label:string,value:string,active=false)=><div style={{...pane,padding:'25px 28px',borderColor:active?'#a862ff70':'#ffffff12'}}><div style={small}>{label}</div><div style={{fontSize:34,marginTop:13,color:active?C.lavender:C.white,fontWeight:500}}>{value}</div></div>;
export const PulseGlyph:React.FC<{size?:number}> = ({size=45})=><svg width={size} height={size} viewBox="0 0 50 50" fill="none"><path d="M4 28H15L20 17L27 37L34 10L39 28H47" stroke={C.lavender} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const trades=[['XAUUSD','Breakout','+1.8R'],['EURUSD','Pullback','−1.0R'],['XAUUSD','Breakout','+2.0R'],['GBPUSD','Reversal','−1.0R']];
export const ProductUI:React.FC<{t:number}>=({t})=>{
 const enter=out(t,2.7,3.9),leave=m(t,17.5,19.1);
 const journal=m(t,6.7,7.6),analysis=m(t,10,10.9),plan=m(t,13.8,14.7);
 const zoom=path(t,[2.7,4,5.3,6.2,7.8,9.7,11,12.4,13.6,14.8,17.5,19.1],[.72,1,1.015,1.1,.92,.94,1.08,1.08,1.2,.97,1,.15]);
 const cy=path(t,[2.7,4,6.6,7.8,9.7,11,13.6,14.8,17.5,19.1],[1100,610,595,410,410,610,590,625,600,780]);
 const tilt=path(t,[2.7,4,6.6,7.8,9.7,11,13.6,14.8,17.5,19.1],[22,-3,-1,-7,-4,0,1,-2,0,30]);
 return <div style={{position:'absolute',left:80,top:cy,width:920,height:1050,perspective:1800,opacity:enter*(1-leave)}}>
 {/* Layers are attached to the same screen rather than independent slides. */}
 {[2,1].map(i=><div key={i} style={{position:'absolute',inset:0,borderRadius:40,background:'#1a1125',border:'1px solid #c28aff20',transform:`translate(${i*16*journal}px,${-i*28*journal}px) scale(${zoom*(1-i*.025)}) rotateX(${tilt}deg)`,opacity:journal*.55}}/>)}
 <div style={{width:'100%',height:'100%',position:'relative',borderRadius:40,background:'linear-gradient(135deg,#1a1422 0%,#0e0b13 55%,#130e1d)',border:'1.5px solid #ad83cc48',boxShadow:'0 45px 130px #000b,0 0 80px #802dda15,inset 0 1px 1px #ffffff25',overflow:'hidden',transform:`scale(${zoom}) rotateX(${tilt}deg) rotateY(${path(t,[2.7,4,7,10,14,18,19.1],[-16,4,0,-4,2,0,26])}deg) rotateZ(${path(t,[2.7,4,7.8,11,14.8,18],[-8,0,-3,1,0,0])}deg)`}}>
 <div style={{position:'absolute',inset:0,pointerEvents:'none',background:`linear-gradient(${110+Math.sin(t*.4)*15}deg,transparent 28%,#ffffff04 45%,transparent 70%)`}}/>
 <div style={{height:112,display:'flex',alignItems:'center',padding:'0 38px',borderBottom:'1px solid #ffffff0b',gap:14}}><PulseGlyph/><span style={{fontSize:29,fontWeight:600,letterSpacing:'.12em'}}>PULSE</span><span style={{marginLeft:'auto',fontSize:23,color:C.muted}}>Workspace pribadi</span><div style={{width:40,height:40,borderRadius:20,background:'#8c50d5',marginLeft:10,display:'grid',placeItems:'center',fontSize:19}}>A</div></div>
 <div style={{display:'flex',height:90,alignItems:'center',gap:38,padding:'0 40px',fontSize:25,borderBottom:'1px solid #ffffff0b'}}>{['Catat','Jurnal','Pola','Rencana'].map((x,i)=>{const selected=i===0?1-journal:i===1?journal-analysis:i===2?analysis-plan:plan;return <div key={x} style={{color:selected>.5?C.white:C.muted,position:'relative'}}>{x}<div style={{position:'absolute',bottom:-27,left:0,right:0,height:3,borderRadius:3,background:C.purple,opacity:selected}}/></div>})}</div>
 <div style={{position:'absolute',top:240,left:38,right:38,bottom:35,overflow:'hidden'}}>
 {/* Form and journal are horizontally connected parts of one interface. */}
 <div style={{position:'absolute',inset:0,transform:`translateX(${-journal*1000}px)`}}>
 <div style={{fontSize:48,fontWeight:600,letterSpacing:'-.045em'}}>Simpan alasannya.</div><div style={{...small,marginTop:14}}>Satu catatan untuk setiap keputusan.</div>
 <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginTop:36,transform:`translateY(${(1-out(t,3.5,4.3))*30}px)`,opacity:out(t,3.5,4.3)}}>{row('Instrumen','XAUUSD')}{row('Setup','Breakout',true)}</div>
 <div style={{marginTop:20,opacity:out(t,4,4.6)}}>{row('Alasan entry','Break & retest di area support')}</div>
 <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginTop:20,opacity:out(t,4.35,4.95)}}>{row('Risiko','1R')}{row('Kondisi','Tenang')}</div>
 <div style={{position:'absolute',bottom:0,left:0,right:0,height:92,borderRadius:24,background:'linear-gradient(110deg,#9147ef,#b470ff)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:30,fontWeight:600,boxShadow:'inset 0 1px 1px #ffffff50,0 12px 35px #983cff25',transform:`scale(${1-.025*Math.exp(-Math.pow((t-timing.save)/.14,2))})`}}>{t<6?'Simpan trade':'✓  Tersimpan'}</div>
 </div>
 <div style={{position:'absolute',inset:0,transform:`translateX(${(1-journal)*1000-analysis*1000}px)`}}>
 <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><div style={{fontSize:48,fontWeight:600,letterSpacing:'-.045em'}}>Jejak keputusan.</div><span style={{...small}}>Minggu ini</span></div>
 <div style={{height:1,background:'#ffffff10',margin:'30px 0'}}/>
 {trades.map((v,i)=>{const p=out(t,7.15+i*.11,7.85+i*.11);return <div key={i} style={{...pane,marginBottom:17,padding:'27px 25px',display:'flex',alignItems:'center',gap:20,transform:`translateX(${(1-p)*120}px)`,opacity:p,borderColor:i===0?'#ae74ff70':'#ffffff12',background:i===0?'linear-gradient(100deg,#30213f,#171020)':undefined}}><div style={{width:56,height:56,borderRadius:17,background:'#ffffff08',display:'grid',placeItems:'center',fontSize:24}}>{i===0?'↗':'↔'}</div><div><div style={{fontSize:30,fontWeight:500}}>{v[0]}</div><div style={{...small,fontSize:22,marginTop:7}}>{v[1]}</div></div><span style={{marginLeft:'auto',fontSize:30,color:i%2===0?C.green:'#d89fb6'}}>{v[2]}</span></div>})}
 <div style={{...small,marginTop:25}}>Catatan, setup, dan hasil. Dalam satu tempat.</div>
 </div>
 <div style={{position:'absolute',inset:0,transform:`translateX(${(1-analysis)*1000-plan*1000}px)`}}>
 <div style={{fontSize:46,fontWeight:600,letterSpacing:'-.045em'}}>Apa yang berulang?</div>
 <div style={{display:'flex',gap:14,marginTop:30}}>{['Semua setup','Breakout'].map((x,i)=><div key={x} style={{padding:'17px 26px',borderRadius:40,fontSize:25,background:i===1&&t>timing.filter?'#a862ff':'#ffffff09',color:i===1&&t>timing.filter?'#fff':'#a39aac',border:'1px solid #ffffff12'}}>{x}</div>)}</div>
 <div style={{...pane,marginTop:28,padding:30,height:390,position:'relative',overflow:'hidden'}}>
 <div style={{display:'flex',justifyContent:'space-between',fontSize:24,color:C.muted}}><span>Konsistensi mengikuti rencana</span><span>Contoh 8 sesi</span></div>
 <div style={{display:'flex',height:260,alignItems:'end',gap:16,marginTop:26}}>{[.48,.65,.40,.75,.58,.89,.80,.96].map((h,i)=><div key={i} style={{flex:1,height:240*h*out(t,10.8+i*.085,11.7+i*.085),borderRadius:'12px 12px 3px 3px',background:i<5?'linear-gradient(#643a99,#271a3c)':'linear-gradient(#dab5ff,#8c44ed)',boxShadow:i===7?'0 0 24px #a257ff40':undefined}}/>)}</div>
 <div style={{display:'flex',justifyContent:'space-between',fontSize:21,color:C.muted,marginTop:17}}><span>Sesi 01</span><span>Sesi 08</span></div>
 </div>
 <div style={{fontSize:29,lineHeight:1.5,marginTop:30,color:C.lavender,opacity:out(t,12,12.7)}}>Kenali kebiasaanmu.<br/><span style={{color:C.muted}}>Lalu tentukan yang perlu diubah.</span></div>
 </div>
 <div style={{position:'absolute',inset:0,transform:`translateX(${(1-plan)*1000}px)`}}>
 <div style={{fontSize:46,fontWeight:600,letterSpacing:'-.045em'}}>Entry berikutnya.</div>
 <div style={{...pane,marginTop:30,padding:30}}><div style={small}>Batas risiko per trade</div><div style={{fontSize:76,letterSpacing:'-.06em',marginTop:18}}>1<span style={{fontSize:36,color:C.lavender,marginLeft:6}}>R</span></div><div style={{height:9,background:'#ffffff0d',borderRadius:10,marginTop:30,position:'relative'}}><div style={{width:`${m(t,15.5,16.15,65,35)}%`,height:'100%',borderRadius:10,background:'linear-gradient(90deg,#6c36ac,#c79cff)'}}/><div style={{position:'absolute',top:-13,left:`${m(t,15.5,16.15,65,35)}%`,width:35,height:35,background:'#ecdcff',borderRadius:25,boxShadow:'0 0 30px #a862ff80',transform:'translateX(-50%)'}}/></div></div>
 {['Setup terkonfirmasi','Alasan entry jelas','Batas risiko ditetapkan'].map((v,i)=>{const p=out(t,16+i*.24,16.5+i*.24);return <div key={v} style={{display:'flex',alignItems:'center',gap:20,marginTop:28,fontSize:29,color:p>.5?C.white:C.muted}}><div style={{width:40,height:40,borderRadius:13,border:'1px solid #a862ff65',background:`rgba(168,98,255,${p*.35})`,display:'grid',placeItems:'center',color:C.lavender}}><span style={{opacity:p}}>✓</span></div>{v}</div>})}
 <div style={{fontSize:24,color:C.muted,marginTop:35}}>Ukuran R ditentukan dalam rencana pribadimu.</div>
 </div>
 </div>
 <Cursor t={t}/>
 </div>
 </div>;
};
const Cursor:React.FC<{t:number}>=({t})=>{
 const opacity=vis(t,4.8,6.6)+vis(t,10.5,12)+vis(t,15,16.9);
 let x=path(t,[4.8,5.6,6.6],[950,660,660]),y=path(t,[4.8,5.6,6.6],[1150,970,970]);
 if(t>10){x=path(t,[10.5,11.1,12],[940,420,420]);y=path(t,[10.5,11.1,12],[650,370,370]);}
 if(t>14){x=path(t,[15,15.5,16.15,16.9],[940,578,342,360]);y=path(t,[15,15.5,16.15,16.9],[800,530,530,590]);}
 const click=Math.exp(-Math.pow((t-(t<8?timing.save:t<14?timing.filter:timing.risk))/.11,2));
 return <div style={{position:'absolute',left:x,top:y,opacity,transform:`scale(${1-click*.16})`,pointerEvents:'none'}}><svg width="55" height="68" viewBox="0 0 55 68"><path d="M5 3L8 53L22 39L35 63L45 57L32 34L50 30Z" fill="#f9f3ff" stroke="#261539" strokeWidth="2"/></svg><div style={{position:'absolute',left:-25,top:-25,width:50,height:50,borderRadius:50,border:'2px solid #d4aaff',opacity:click,transform:`scale(${1+(1-click)*1.3})`}}/></div>;
};
