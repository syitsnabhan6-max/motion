import React, {useLayoutEffect, useRef} from 'react';
import * as THREE from 'three';
import {C} from './content';
import {m, path} from './motion';

type Rig = {renderer:THREE.WebGLRenderer; scene:THREE.Scene; camera:THREE.PerspectiveCamera; coin:THREE.Group; bars:THREE.Group; orbit:THREE.Group};

// The PULSE WebGL lifecycle, bevels, physical materials and deterministic camera
// are retained; the hero is a new generic XAU coin, never a traced brand symbol.
export const Objects3D:React.FC<{t:number;mode?:'hero'|'close'|'cover'}>=({t,mode='hero'})=>{
 const canvas=useRef<HTMLCanvasElement>(null), rig=useRef<Rig|null>(null);
 useLayoutEffect(()=>{
  const renderer=new THREE.WebGLRenderer({canvas:canvas.current!,alpha:true,antialias:true,preserveDrawingBuffer:true});
  // PBR surface uses a 720p buffer; titles/charts stay native 1080p vectors.
  renderer.setSize(720,1280,false);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,1080/1920,.1,100);
  scene.add(new THREE.AmbientLight('#adcfff',2.8));
  const key=new THREE.DirectionalLight('#ffffff',5.5);key.position.set(-4,7,9);scene.add(key);
  const rim=new THREE.DirectionalLight('#297fff',8);rim.position.set(5,1,-4);scene.add(rim);
  const fill=new THREE.DirectionalLight('#afdfff',3);fill.position.set(-4,-3,2);scene.add(fill);
  const blue=new THREE.MeshPhysicalMaterial({color:C.blue,metalness:.55,roughness:.22,clearcoat:1,clearcoatRoughness:.08});
  const silver=new THREE.MeshPhysicalMaterial({color:'#c1d9f0',metalness:.78,roughness:.18,clearcoat:1});
  const dark=new THREE.MeshPhysicalMaterial({color:'#0b2043',metalness:.65,roughness:.25,clearcoat:1});
  const coin=new THREE.Group();
  const core=new THREE.Mesh(new THREE.CylinderGeometry(1.38,1.38,.27,80,1),blue);core.rotation.x=Math.PI/2;coin.add(core);
  const rimMesh=new THREE.Mesh(new THREE.TorusGeometry(1.32,.055,12,96),silver);rimMesh.position.z=.155;coin.add(rimMesh);
  const backRim=rimMesh.clone();backRim.position.z=-.155;coin.add(backRim);
  const art=document.createElement('canvas');art.width=art.height=512;const ctx=art.getContext('2d')!;
  ctx.clearRect(0,0,512,512);ctx.fillStyle='#eaf5ff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='600 174px sans-serif';ctx.fillText('Au',256,229);ctx.font='36px sans-serif';ctx.fillStyle='#9dd1ff';ctx.fillText('XAU / USD',256,348);
  const tex=new THREE.CanvasTexture(art);tex.colorSpace=THREE.SRGBColorSpace;
  const face=new THREE.Mesh(new THREE.PlaneGeometry(2.35,2.35),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));face.position.z=.153;coin.add(face);
  for(let i=0;i<40;i++){const a=i/40*Math.PI*2;const mark=new THREE.Mesh(new THREE.BoxGeometry(.026,.065,.035),silver);mark.position.set(Math.sin(a)*1.22,Math.cos(a)*1.22,.15);mark.rotation.z=-a;coin.add(mark);}
  scene.add(coin);
  const bars=new THREE.Group();
  [1.1,1.65,2.35].forEach((h,i)=>{
   const shape=new THREE.Shape(),w=.43,r=.08;
   shape.moveTo(-w/2+r,-h/2);shape.lineTo(w/2-r,-h/2);shape.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);shape.lineTo(w/2,h/2-r);shape.quadraticCurveTo(w/2,h/2,w/2-r,h/2);shape.lineTo(-w/2+r,h/2);shape.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);shape.lineTo(-w/2,-h/2+r);shape.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);
   const geo=new THREE.ExtrudeGeometry(shape,{depth:.42,bevelEnabled:true,bevelSegments:3,bevelSize:.055,bevelThickness:.055,curveSegments:8});geo.translate(0,0,-.21);
   const g=new THREE.Group();g.add(new THREE.Mesh(geo,i===1?dark:blue));g.add(new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,h+.6,8),silver));g.position.set((i-1)*.66,h/2-.9,0);bars.add(g);
  });scene.add(bars);
  const orbit=new THREE.Group();const ring=new THREE.Mesh(new THREE.TorusGeometry(2.75,.012,8,128),new THREE.MeshStandardMaterial({color:'#4976a6',metalness:.5,roughness:.4}));ring.rotation.x=1.14;ring.rotation.z=-.3;orbit.add(ring);
  for(let i=0;i<3;i++){const sphere=new THREE.Mesh(new THREE.SphereGeometry(.12+i*.025,20,16),i===1?silver:blue);orbit.add(sphere);}scene.add(orbit);
  rig.current={renderer,scene,camera,coin,bars,orbit};
  return()=>{tex.dispose();scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(mat=>mat.dispose());}});renderer.dispose();rig.current=null;};
 },[]);
 useLayoutEffect(()=>{
  const r=rig.current;if(!r)return;
  const closing=mode==='close', cover=mode==='cover';
  const exit=closing||cover?0:m(t,5.8,7.3);
  r.camera.position.set(path(t,[0,2.4,5.5,7.3],[1.5,-.2,.4,0]),.55,cover?10.8:closing?11.5:path(t,[0,1.4,4.4,7.3],[9.6,12.4,11.2,8.8]));r.camera.lookAt(0,.25,0);
  r.coin.rotation.set(-.18+Math.sin(t*.75)*.12,path(t,[0,2,5,8],[-.95,-.18,.2,.5]),-.13+Math.sin(t*.4)*.06);
  r.coin.position.set(cover?.45:closing?0:.4,cover?-.55:closing?.0:-.75+Math.sin(t*.8)*.12-exit*4.4,.2);
  r.coin.scale.setScalar(cover?1.05:closing?.85:1);
  r.bars.position.set(cover?-1.1:closing?-.9:-1.3,cover?-1.3:closing?-1.0:-1.2-exit*3,-.8);r.bars.rotation.set(-.12,-.4,-.12);r.bars.scale.setScalar(cover?.85:.7);
  r.bars.children.forEach((b,i)=>{b.position.y+=0; b.scale.y=.92+.08*Math.sin(t*.9+i);});
  r.orbit.rotation.z=-.12+Math.sin(t*.25)*.12;r.orbit.position.y=closing?0:-.6-exit*3;r.orbit.scale.setScalar(closing?.65:cover?.70:1);
  r.orbit.children.slice(1).forEach((obj,i)=>{const a=t*.42+i*2.094;obj.position.set(Math.cos(a)*2.75,Math.sin(a)*1.15,Math.sin(a)*1.6);});
  r.renderer.render(r.scene,r.camera);
 },[t,mode]);
 return <canvas ref={canvas} style={{position:'absolute',inset:0,width:1080,height:1920,pointerEvents:'none'}}/>;
};
