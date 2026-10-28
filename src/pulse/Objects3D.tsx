import React,{useLayoutEffect,useRef} from 'react';
import * as THREE from 'three';
import {m,path} from './motion';

type Rig={renderer:THREE.WebGLRenderer;scene:THREE.Scene;camera:THREE.PerspectiveCamera;candles:THREE.Group;mark:THREE.Group;ring:THREE.Mesh;light:THREE.PointLight};
export const Objects3D:React.FC<{t:number}>=({t})=>{
 const ref=useRef<HTMLCanvasElement>(null);const rig=useRef<Rig|null>(null);
 useLayoutEffect(()=>{
  const renderer=new THREE.WebGLRenderer({canvas:ref.current!,alpha:true,antialias:true,preserveDrawingBuffer:true});renderer.setSize(1080,1920);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
  const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(38,1080/1920,.1,100);
  scene.add(new THREE.AmbientLight('#c7a5ff',1.5));
  const key=new THREE.DirectionalLight('#ffffff',5);key.position.set(-5,6,8);scene.add(key);
  const rim=new THREE.DirectionalLight('#a15bff',8);rim.position.set(5,0,-2);scene.add(rim);
  const light=new THREE.PointLight('#a14eff',55,30,2);light.position.set(2,2,4);scene.add(light);
  const mat=new THREE.MeshPhysicalMaterial({color:'#9c58f5',metalness:.55,roughness:.18,clearcoat:1,clearcoatRoughness:.08,emissive:'#5b20aa',emissiveIntensity:.2});
  const dark=new THREE.MeshPhysicalMaterial({color:'#292033',metalness:.7,roughness:.21,clearcoat:1});
  const white=new THREE.MeshStandardMaterial({color:'#dcbaff',metalness:.5,roughness:.15,emissive:'#6d34bd',emissiveIntensity:.5});
  function bar(w:number,h:number,d:number){const r=.12,s=new THREE.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);const g=new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSegments:4,steps:1,bevelSize:.07,bevelThickness:.07,curveSegments:8});g.translate(0,0,-d/2);return g;}
  const candles=new THREE.Group();const heights=[1.1,1.9,1.35,2.6,1.8];
  heights.forEach((h,i)=>{const g=new THREE.Group();const body=new THREE.Mesh(bar(.55,h,.48),i===1?dark:mat);g.add(body);const wick=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,h+.9,10),white);g.add(wick);g.position.set((i-2)*.92,(i-2)*.18,Math.sin(i)*.2);candles.add(g)});scene.add(candles);
  const mark=new THREE.Group();const curve=new THREE.CatmullRomCurve3([[-2,0,0],[-1,0,0],[-.55,.45,0],[-.1,-.65,0],[.55,1,0],[1,.05,0],[2,.05,0]].map(p=>new THREE.Vector3(...p as [number,number,number])),false,'centripetal');
  const pulse=new THREE.Mesh(new THREE.TubeGeometry(curve,100,.12,16,false),mat);mark.add(pulse);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(2.5,.035,12,100),white);ring.rotation.x=.9;mark.add(ring);scene.add(mark);
  rig.current={renderer,scene,camera,candles,mark,ring,light};
  return ()=>{scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();(Array.isArray(o.material)?o.material:[o.material]).forEach(v=>v.dispose())}});renderer.dispose();rig.current=null};
 },[]);
 useLayoutEffect(()=>{const r=rig.current;if(!r)return;
  const c=m(t,2.65,3.6,1,0);r.candles.visible=t<3.6;r.candles.scale.setScalar(Math.max(.0001,c));r.candles.rotation.set(-.12, path(t,[0,1.5,3.6],[-.65,.12,.6]),-.1);r.candles.position.y=-.45+m(t,2.65,3.6,0,-1.2);
  r.candles.children.forEach((o,i)=>{o.position.y=(i-2)*.18+Math.sin(t*.7+i*.8)*.12;o.scale.y=.85+.15*outReveal(t,i*.09)});
  const reveal=m(t,18.1,20);r.mark.visible=t>18.1;r.mark.scale.setScalar(Math.max(.0001,reveal*path(t,[18,20,24],[.6,.7,.64])));r.mark.rotation.set(path(t,[18,20,24],[.4,-.08,.08]),path(t,[18,20,24],[-1.3,-.15,.22]),0);r.mark.position.y=path(t,[18,20,24],[.2,.6,.8]);r.ring.rotation.z=t*.16;
  r.camera.position.set(path(t,[0,3.6,18,20,24],[1.7,-.2,.2,.15,-.25]),1.1, path(t,[0,1.5,3.6,18,20,24],[11.3,10.4,8.8,11,10.5,11.5]));r.camera.lookAt(0,.3,0);r.light.position.x=Math.sin(t*.6)*4;r.renderer.render(r.scene,r.camera);
 },[t]);
 return <canvas ref={ref} style={{position:'absolute',inset:0,width:1080,height:1920}}/>;
};
const outReveal=(t:number,a:number)=>1-Math.pow(1-Math.min(1,Math.max(0,(t-a)/1.3)),4);
