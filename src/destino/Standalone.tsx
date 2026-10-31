import React,{useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {Player,PlayerRef} from '@remotion/player';
import {DestinoFilm} from './DestinoFilm';
import {defaultOutlook,FORMAT} from './content';

const App=()=>{
 const ref=useRef<PlayerRef>(null);
 const query=new URLSearchParams(location.search),debug=query.has('debug');
 useEffect(()=>{
  const api={seek:(seconds:number)=>ref.current?.seekTo(Math.round(seconds*60)),play:()=>ref.current?.play(),pause:()=>ref.current?.pause()};
  (window as unknown as {DESTINO:typeof api}).DESTINO=api;
  const start=()=>{ref.current?.play();};
  const key=(e:KeyboardEvent)=>{if(e.code==='Space'){e.preventDefault();ref.current?.toggle();}if(e.key.toLowerCase()==='r'){ref.current?.seekTo(0);start();}};
  window.addEventListener('keydown',key);window.addEventListener('pointerdown',start,{once:true});
  return()=>{window.removeEventListener('keydown',key);window.removeEventListener('pointerdown',start);};
 },[]);
 return <Player ref={ref} component={DestinoFilm} inputProps={defaultOutlook} compositionWidth={1080} compositionHeight={1920} durationInFrames={FORMAT.seconds*60} fps={60} loop controls={debug} autoPlay={false} clickToPlay={false} spaceKeyToPlayOrPause={false} showVolumeControls={debug} style={{height:'100vh',maxWidth:'100vw',aspectRatio:'9/16'}}/>;
};
createRoot(document.getElementById('app')!).render(<App/>);
