import React from 'react';
import {AbsoluteFill,Audio,OffthreadVideo,Sequence,interpolateColors,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import {palette as P,settings,copy} from './content';
import {move,camera,visible} from './motion';
import {Type,Note} from './Type';
import {LedgerWorld,LedgerCard,GlossIcon,MarketPath} from './World';

export const Film:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 const background=interpolateColors(t,[0,3.4,4.5,8,8.8,23.2,24.1,30.8,31.6,38.8,39.6,43.2,44],[P.ink,P.ink,P.ice,P.ice,P.ink,P.ink,P.ice,P.ice,P.ink,P.ink,P.blue,P.blue,P.ice]);
 return <AbsoluteFill style={{background,fontFamily:'DM Sans',overflow:'hidden'}}>
 {settings.audio&&<Audio src={staticFile('original-audio.m4a')}/>}
 <div style={{position:'absolute',inset:-300,background:`radial-gradient(ellipse at ${45+Math.sin(t*.24)*25}% ${58+Math.cos(t*.18)*20}%,#4b86e735,transparent 65%),radial-gradient(ellipse at 85% 90%,#b7ddff25,transparent 55%)`,transform:`rotate(${Math.sin(t*.2)*10}deg)`}}/>
 {/* Opening: camera passes the edge of a loss card; type stays in screen space. */}
 {t<4.6&&<>
 <div style={{position:'absolute',left:camera(t,[0,1.3,3.2,4.5],[-240,-40,-50,170]),top:camera(t,[0,1.3,3.2,4.5],[880,1120,1090,700]),perspective:1200,opacity:1-move(t,3.3,4.5),transform:`scale(${camera(t,[0,1.3,3.2,4.5],[1.9,1.35,1.35,2.1])}) rotate(-12deg) rotateY(18deg)`}}><LedgerCard i={0} hero/></div>
 <div style={{position:'absolute',left:680,top:1320,opacity:.3*(1-move(t,3.3,4.5)),transform:`translateY(${Math.sin(t)*25}px) rotate(15deg)`}}><LedgerCard i={1}/></div>
 <Type t={t} start={.25} end={4.1} lines={['Udah rugi','banyak,']} top={390} size={125} accent={1}/>
 <Type t={t} start={2} end={4.1} lines={['masa berhenti?']} top={770} size={78} accent={-1}/>
 </>}
 {/* Question card moves as a dimensional object, with a long readable settle. */}
 {t>=3.5&&t<8.9&&<div style={{position:'absolute',inset:0,perspective:1600}}>
 <div style={{position:'absolute',width:770,height:960,left:155,top:390,boxSizing:'border-box',borderRadius:64,background:'linear-gradient(150deg,#fff,#e6f1fe)',border:'2px solid #fff',boxShadow:'0 65px 100px #203c672b,inset 0 -3px 4px #7195d52a',transform:`translateY(${move(t,3.5,4.7,700,0)-move(t,8,8.85)*1600}px) rotateY(${camera(t,[3.5,4.8,7.7,8.85],[-35,-8,7,30])}deg) rotateX(${camera(t,[3.5,4.8,7.7,8.85],[15,3,-3,20])}deg) scale(${camera(t,[3.5,4.7,7.7,8.85],[.75,1,1.02,1.2])})`}}>
 <div style={{position:'absolute',left:60,right:60,top:95,fontSize:26,letterSpacing:'.12em',color:'#8298b0'}}>PERTANYAAN DI KEPALA SENDIRI</div>
 <Type t={t} start={4} end={8.8} lines={['Udah rugi','banyak,']} top={210} size={103} dark accent={1}/>
 <Type t={t} start={4.6} end={8.8} lines={['masa','berhenti?']} top={475} size={96} dark accent={-1}/>
 <div style={{position:'absolute',left:70,right:70,height:12,bottom:110,borderRadius:20,background:'#2463f511'}}><div style={{height:'100%',width:`${move(t,4.9,7.8)*100}%`,background:P.blue,borderRadius:20}}/></div>
 </div>
 <Note t={t} start={5.5} end={8.6} top={1480} dark text={'Satu kalimat yang bisa bikin\nkerugian makin panjang'}/>
 </div>}
 {/* The character is the user's original footage, preserved rather than approximated. */}
 <Sequence from={Math.round(8.8*fps)} durationInFrames={Math.round(5.2*fps)} layout="none">
 <div style={{position:'absolute',left:0,top:600,width:1080,height:1320,maskImage:'linear-gradient(to bottom,transparent,black 13%,black 90%,transparent)',opacity:move(t,8.8,9.2)*(1-move(t,13.55,14))}}><OffthreadVideo src={staticFile('character-original.mp4')} muted style={{width:'100%',height:'100%'}}/></div>
 </Sequence>
 <Type t={t} start={9.15} end={13.6} lines={copy.pain} top={315} size={120}/>
 {/* Lens transition: the original close-up becomes a wide scrolling cylinder. */}
 {t>=13.45&&t<23.9&&<div style={{position:'absolute',inset:0,opacity:move(t,13.45,14.1)*(1-move(t,23.5,23.9))}}>
 <LedgerWorld t={t-13.4} zoom={camera(t,[13.45,14.1,15.8,18,23.9],[2.4,2.1,1.02,.98,1.07])} focus={move(t,15.8,17,0,2.4)}/>
 <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,#031123df 0%,#03112399 25%,#03112308 78%)',opacity:move(t,15.8,16.8)}}/>
 </div>}
 <Type t={t} start={16.1} end={23.6} lines={copy.trapped} top={710} size={115}/>
 <Note t={t} start={18.1} end={23.5} top={1110} text={'Bukan karena peluangnya semakin bagus,\ntapi karena merasa sudah terlalu\nbanyak berkorban'}/>
 {/* Blue token carries the cut into the sunk-cost world. */}
 {t>22.9&&t<31.7&&<div style={{position:'absolute',left:400,top:660,transform:`translateY(${camera(t,[22.9,24.1,25.3,30.7,31.7],[1250,0,0,-30,-1300])}px) scale(${camera(t,[22.9,23.6,24.1,25.3,30.7,31.7],[.4,6,.95,1,1.08,2.3])})`,opacity:move(t,22.9,23.2)}}><GlossIcon t={t} kind="minus" size={280}/></div>}
 <Type t={t} start={24.35} end={31.6} lines={copy.definition} top={1005} size={115} dark/>
 <Note t={t} start={26.5} end={31.5} top={1360} dark text={'Uang yang sudah hilang\nmemengaruhi keputusan berikutnya'}/>
 {/* Satellites orbit the lost-money token; the next decision gets pulled back. */}
 {t>24&&t<31.7&&<div style={{position:'absolute',inset:0,opacity:visible(t,24.4,31.7)}}>
 <svg width="1080" height="750" style={{position:'absolute',top:410}}><ellipse cx="540" cy="390" rx="380" ry="135" fill="none" stroke="#2463f51c" strokeWidth="2" transform="rotate(-16 540 390)"/></svg>
 {[0,1,2].map(i=>{const a=(t-24)*.45+i*Math.PI*2/3;return <div key={i} style={{position:'absolute',left:500+Math.cos(a)*360,top:775+Math.sin(a)*130,width:92,height:92,borderRadius:28,background:i===1?'#15365d':'linear-gradient(145deg,white,#cfddf1)',border:'1px solid #fff8',boxShadow:'10px 20px 35px #193b6f20',transform:`rotate(${Math.sin(a)*16}deg) scale(${.8+(Math.sin(a)+1)*.15})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:38,color:i===1?'#9dcfff':P.blue}}>{i===1?'?':'$'}</div>})}
 </div>}
 {t>=31&&t<35.3&&<div style={{opacity:visible(t,31,35.3)}}><MarketPath t={t}/></div>}
 <Type t={t} start={32} end={35} lines={copy.market} top={440} size={86} accent={-1}/>
 {/* Deposit wall keeps moving; no static list, no empty hold. */}
 {t>=34.6&&t<39.4&&<div style={{position:'absolute',inset:0,opacity:visible(t,34.6,39.4)}}><LedgerWorld deposit t={t-34.6} zoom={camera(t,[34.6,36.2,39.4],[1.3,1.03,1.1])} focus={1.2}/><div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,#041127ed 0%,#041127aa 25%,transparent 75%)'}}/></div>}
 <Type t={t} start={35.25} end={39.3} lines={copy.capital} top={700} size={98} accent={2}/>
 {/* The deposit's plus becomes the next glossy object and takes the color field with it. */}
 {t>=38.8&&t<44.2&&<div style={{position:'absolute',left:415,top:600,transform:`translateY(${camera(t,[38.8,39.8,42.6,44.2],[600,0,-30,-1400])}px) scale(${camera(t,[38.8,39.8,42.6,44.2],[.6,1,1.07,2])})`,opacity:visible(t,38.8,44.2)}}><GlossIcon t={t} kind="arrow" size={250}/></div>}
 <Type t={t} start={39.5} end={44} lines={copy.reality} top={1030} size={80} accent={-1}/>
 {/* Pause emerges with inertia, then camera pulls back into a calm finish. */}
 {t>=43.2&&<div style={{position:'absolute',left:400,top:650,transform:`translateY(${camera(t,[43.2,44.6,46.2,53.5],[1050,-40,0,-30])}px) scale(${camera(t,[43.2,44.6,46.2,53.5],[.65,1.12,1,1.04])})`,opacity:move(t,43.2,44.2)}}><GlossIcon t={t} kind="pause" size={280}/></div>}
 <Type t={t} start={44.4} end={53.5} lines={copy.end} top={1080} size={87} dark/>
 <Note t={t} start={47} end={53.5} top={1420} dark text={'Kadang, itu satu-satunya cara\nuntuk tidak kehilangan lebih banyak'}/>
 <div style={{position:'absolute',bottom:110,left:0,right:0,textAlign:'center',fontSize:28,color:'#738ba6',opacity:move(t,50,51)}}>@destino_ct</div>
 </AbsoluteFill>;
};
