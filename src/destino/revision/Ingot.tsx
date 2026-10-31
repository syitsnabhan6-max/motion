import React, {useLayoutEffect,useRef} from 'react';
import * as THREE from 'three';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import {curve,key,linear,mix,out,smooth} from './timing';
import {chartPoint,tracePoint} from './ChartStage';

type Rig={renderer:THREE.WebGLRenderer;scene:THREE.Scene;camera:THREE.PerspectiveCamera;bar:THREE.Group};

// Actual bevelled geometry, studio reflections and a labelled face. No raster
// stock asset or fabricated Destino logo is used.
export const Ingot:React.FC<{t:number}>=({t})=>{
  const canvas=useRef<HTMLCanvasElement>(null),rig=useRef<Rig|null>(null);
  useLayoutEffect(()=>{
    const renderer=new THREE.WebGLRenderer({canvas:canvas.current!,alpha:true,antialias:true,preserveDrawingBuffer:true});
    renderer.setSize(720,1280,false);renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
    const scene=new THREE.Scene();
    const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();
    const environment=pmrem.fromScene(room,.03);scene.environment=environment.texture;
    const camera=new THREE.PerspectiveCamera(40,1080/1920,1,10000);
    camera.position.set(0,0,960/Math.tan(20*Math.PI/180));
    const light=new THREE.DirectionalLight('#d9eaff',3);light.position.set(-900,1300,2000);scene.add(light);
    const rim=new THREE.DirectionalLight('#1474ef',6);rim.position.set(1000,-200,400);scene.add(rim);
    const gold=new THREE.MeshPhysicalMaterial({color:'#e3c17c',metalness:1,roughness:.14,clearcoat:.8,envMapIntensity:1.65});
    const shape=new THREE.Shape();
    shape.moveTo(-103,-188);shape.lineTo(103,-188);shape.quadraticCurveTo(127,-188,123,-164);shape.lineTo(104,172);shape.quadraticCurveTo(103,194,82,194);shape.lineTo(-82,194);shape.quadraticCurveTo(-103,194,-104,172);shape.lineTo(-123,-164);shape.quadraticCurveTo(-127,-188,-103,-188);
    const geometry=new THREE.ExtrudeGeometry(shape,{depth:54,bevelEnabled:true,bevelSegments:5,steps:1,bevelSize:13,bevelThickness:16,curveSegments:16});geometry.translate(0,0,-27);
    const bar=new THREE.Group();bar.add(new THREE.Mesh(geometry,gold));scene.add(bar);
    const art=document.createElement('canvas');art.width=512;art.height=768;
    const ctx=art.getContext('2d')!;ctx.textAlign='center';ctx.fillStyle='#3d3525';ctx.textBaseline='middle';
    ctx.font='500 150px "Sora",sans-serif';ctx.fillText('Au',256,300);
    ctx.font='500 34px "DM Sans",sans-serif';ctx.fillText('FINE GOLD',256,432);
    ctx.font='500 58px "DM Sans",sans-serif';ctx.fillText('999.9',256,514);
    ctx.strokeStyle='#5d5139';ctx.lineWidth=3;ctx.strokeRect(58,60,396,648);
    const texture=new THREE.CanvasTexture(art);texture.colorSpace=THREE.SRGBColorSpace;
    const lettering=new THREE.Mesh(new THREE.PlaneGeometry(208,330),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1}));lettering.position.z=44;bar.add(lettering);
    rig.current={renderer,scene,camera,bar};
    return()=>{scene.traverse(obj=>{if(obj instanceof THREE.Mesh){obj.geometry.dispose();(Array.isArray(obj.material)?obj.material:[obj.material]).forEach(m=>m.dispose());}});texture.dispose();environment.dispose();room.dispose();pmrem.dispose();renderer.dispose();rig.current=null;};
  },[]);
  useLayoutEffect(()=>{
    const r=rig.current;if(!r)return;
    const arrival=out(t,.25,1.3),departure=smooth(t,2.35,3.1);
    const p=tracePoint(linear(t,3.05,6.45));
    const endpoint=chartPoint(t,p[0],p[1]);
    const [x,y]=curve(departure,[775,650],[1080,920],[-40,1110],endpoint);
    r.bar.position.set(x-540,960-y+(1-arrival)*500,0);
    r.bar.rotation.set(key(t,[.2,1.3,2.35,3.65],[.6,-.23,-.15,.3]),key(t,[.2,1.3,2.35,3.65],[-1,.35,.48,1.4]),key(t,[.2,1.3,2.35,3.65],[.5,-.28,-.2,-1.2]));
    r.bar.scale.setScalar(mix(.85,.15,departure)*arrival);
    r.renderer.render(r.scene,r.camera);
  },[t]);
  return <canvas ref={canvas} style={{position:'absolute',inset:0,width:1080,height:1920,opacity:1-smooth(t,2.95,3.15)}}/>;
};
