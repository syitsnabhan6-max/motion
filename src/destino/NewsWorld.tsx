import React,{useLayoutEffect,useRef} from 'react';
import * as THREE from 'three';
import {headlines} from './content';
import {path} from './motion';

type Rig={renderer:THREE.WebGLRenderer;scene:THREE.Scene;camera:THREE.PerspectiveCamera;cards:THREE.Mesh[];target:THREE.WebGLRenderTarget;post:THREE.Scene;screen:THREE.OrthographicCamera;warp:THREE.ShaderMaterial;};

// SunkCost's scrolling cylinder and radial lens, rendered as a true 3D scene.
// Textures are drawn once. The lens samples one bounded render target, avoiding
// the unbounded SVG displacement surface during vertical world transitions.
export const NewsWorld:React.FC<{t:number}>=({t})=>{
 const canvas=useRef<HTMLCanvasElement>(null),rig=useRef<Rig|null>(null);
 useLayoutEffect(()=>{
  const renderer=new THREE.WebGLRenderer({canvas:canvas.current!,alpha:true,antialias:true,preserveDrawingBuffer:true});
  renderer.setSize(720,1280,false);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(56,1080/1920,.1,100);
  const textures=headlines.map(h=>{
   const image=document.createElement('canvas');image.width=1000;image.height=680;const ctx=image.getContext('2d')!;
   const g=ctx.createLinearGradient(0,0,800,680);g.addColorStop(0,'#173a60');g.addColorStop(.65,'#081c35');g.addColorStop(1,'#041123');
   ctx.beginPath();ctx.roundRect(8,8,984,664,50);ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='#78b7f97a';ctx.lineWidth=3;ctx.stroke();
   ctx.textBaseline='top';ctx.fillStyle='#87bfff';ctx.font='500 50px "DM Sans",sans-serif';ctx.fillText(h.publisher,70,70);
   ctx.fillStyle='#f4f8ff';ctx.font='600 78px "Bricolage Grotesque",sans-serif';
   const lines=h.publisher.includes('Wall')?['Gold and Silver','Futures Fall to','1-Year Lows']:['Gold Just Hit','a New Low'];
   lines.forEach((s,i)=>ctx.fillText(s,70,180+i*86));
   ctx.fillStyle='#a4b8d1';ctx.font='500 45px "DM Sans",sans-serif';ctx.fillText('30 Okt 2026 · headline',70,565);
   const tex=new THREE.CanvasTexture(image);tex.colorSpace=THREE.SRGBColorSpace;return tex;
  });
  const cards=Array.from({length:18},(_,i)=>{
   const mesh=new THREE.Mesh(new THREE.PlaneGeometry(2.65,1.802),new THREE.MeshBasicMaterial({map:textures[i%2],transparent:true,side:THREE.DoubleSide,opacity:i%3===1?.85:.48}));scene.add(mesh);return mesh;
  });
  const target=new THREE.WebGLRenderTarget(720,1280,{depthBuffer:true,samples:2});
  const warp=new THREE.ShaderMaterial({transparent:true,uniforms:{image:{value:target.texture},strength:{value:.26}},vertexShader:`varying vec2 uv0;void main(){uv0=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform sampler2D image;uniform float strength;varying vec2 uv0;void main(){vec2 p=uv0*2.-1.;vec2 a=p*vec2(.5625,1.);float r=dot(a,a);vec2 sampleUV=.5+.5*p/(1.+strength*r);gl_FragColor=texture2D(image,sampleUV);#include <colorspace_fragment>}`.replace(';#include',';\n#include')});
  const post=new THREE.Scene(),screen=new THREE.OrthographicCamera(-1,1,1,-1,0,1);post.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),warp));
  rig.current={renderer,scene,camera,cards,target,post,screen,warp};
  return()=>{textures.forEach(tex=>tex.dispose());cards.forEach(c=>{c.geometry.dispose();(c.material as THREE.Material).dispose();});post.traverse(o=>{if(o instanceof THREE.Mesh)o.geometry.dispose();});warp.dispose();target.dispose();renderer.dispose();rig.current=null;};
 },[]);
 useLayoutEffect(()=>{
  const r=rig.current;if(!r)return;
  const zoom=path(t,[0,1.7,5,7],[1.4,1,1.05,1.24]);
  r.camera.position.set(Math.sin(t*.25)*.12,0,7.2/zoom);r.camera.rotation.z=-.13;
  r.cards.forEach((card,i)=>{const col=i%3-1,row=Math.floor(i/3);const y=((row*2.15+t*(col===0?.62:-.46))%12.9+12.9)%12.9-6.45;card.position.set(col*2.8,y,-Math.abs(col)*.5);card.rotation.set(y*.018,-col*.15,.04*col);});
  r.warp.uniforms.strength.value=.3+Math.sin(t*.5)*.06;
  r.renderer.setRenderTarget(r.target);r.renderer.setClearColor(0x000000,0);r.renderer.render(r.scene,r.camera);
  r.renderer.setRenderTarget(null);r.renderer.clear();r.renderer.render(r.post,r.screen);
 },[t]);
 return <canvas ref={canvas} style={{position:'absolute',inset:0,width:1080,height:1920}}/>;
};
