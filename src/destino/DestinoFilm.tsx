import React from 'react';
import {AbsoluteFill,Audio,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import '@fontsource/bricolage-grotesque/600.css';
import '@fontsource/bricolage-grotesque/700.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import {C,defaultOutlook,OutlookProps} from './content';
import {travel,m,curve} from './motion';
import {Background} from './Primitives';
import {Hook,Structure,Fed,News,Scenario,Calendar,Closing} from './Scenes';

export const DestinoFilm:React.FC<OutlookProps>=(props)=>{
 const config={...defaultOutlook,...props};
 const t=useCurrentFrame()/useVideoConfig().fps,camera=travel(t);
 const scenes=[<Hook t={t} config={config}/>,<Structure t={t} config={config}/>,<Fed t={t}/>,<News t={t}/>,<Scenario t={t}/>,<Scenario t={t} bull/>,<Calendar t={t}/>,<Closing t={t} config={config}/>];
 return <AbsoluteFill style={{background:C.ink,color:C.white,fontFamily:'DM Sans',overflow:'hidden'}}>
  {config.music&&<Audio src={staticFile('destino/music-sfx.m4a')} volume={config.voiceoverSrc ? 0.72 : 1}/>}
  {config.voiceoverSrc&&<Audio src={staticFile(config.voiceoverSrc)}/>}
  <Background t={t}/>
  <div style={{position:'absolute',inset:0,transformOrigin:'540px 960px',transform:`translate(${Math.sin(camera*Math.PI*2)*-65}px,${-camera*2280}px)`}}>
   {scenes.map((scene,i)=>Math.abs(i-camera)<1&&<div key={i} data-chapter={i} style={{position:'absolute',left:0,top:i*2280,width:1080,height:1920,overflow:'hidden'}}>{scene}</div>)}
  </div>
  {[7,17,36,60,76].map((cut,i)=>{
   if(t<cut-.7||t>cut+.7)return null;
   const p=m(t,cut-.7,cut+.7),[x,y]=curve(p,[-180,1530],[900,1420],[180,540],[1260,350]);
   const size=130+Math.sin(p*Math.PI)*210;
   return <div key={cut} style={{position:'absolute',left:(i%2?1080-x:x)-size/2,top:y-size/2,width:size,height:size,borderRadius:'50%',background:'radial-gradient(circle at 30% 24%,#addbff,#176fd5 25%,#064486 58%,#011527 84%)',boxShadow:'inset -15px -20px 30px #0007,inset 5px 5px 12px #bfe3ff75,0 40px 65px #0009',filter:`blur(${Math.sin(p*Math.PI)*1.2}px)`}}/>;
  })}
 </AbsoluteFill>;
};
