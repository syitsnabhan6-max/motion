import React from 'react';
import {Vector3, Euler} from 'three';
import {ice,key,linear,mix,out,smooth} from './timing';

// Schematic lower highs from the user's chart; these are not OHLC candles.
const points=[[40,150],[70,200],[95,160],[130,280],[165,245],[200,370],[245,285],[280,420],[315,388],[350,500],[400,405],[445,520],[480,470],[520,575],[560,525],[610,635],[655,590],[710,720],[755,745]];
const lengths=points.slice(1).map((p,i)=>Math.hypot(p[0]-points[i][0],p[1]-points[i][1]));
const total=lengths.reduce((a,b)=>a+b,0);
const d=points.map((p,i)=>`${i?'L':'M'}${p.join(' ')}`).join(' ');
export const tracePoint=(progress:number)=>{
  let distance=progress*total;
  for(let i=0;i<lengths.length;i++){
    if(distance<=lengths[i])return [mix(points[i][0],points[i+1][0],distance/lengths[i]),mix(points[i][1],points[i+1][1],distance/lengths[i])];
    distance-=lengths[i];
  }
  return points[points.length-1];
};
export const chartPose=(t:number)=>({
  x:key(t,[2.55,3.8,4.6,5.9,6.8,7.7],[65,0,-85,-115,0,-850]),
  y:key(t,[2.55,3.8,4.6,5.9,6.8,7.7],[620,0,30,-95,0,-250]),
  scale:key(t,[2.55,3.8,4.6,5.9,6.8,7.7],[.55,1.07,1.22,1.22,1,1.55]),
  rx:key(t,[2.55,3.8,5.9,6.8,7.7],[55,20,9,18,32]),
  ry:key(t,[2.55,3.8,5.9,6.8,7.7],[-28,-12,-4,-8,34]),
  rz:key(t,[2.55,3.8,5.9,6.8,7.7],[-20,-10,-3,-7,-26]),
});
export const chartPoint=(t:number,x:number,y:number):[number,number]=>{
  const pose=chartPose(t),r=Math.PI/180;
  const p=new Vector3((x-460)*pose.scale,(y-500)*pose.scale,0).applyEuler(new Euler(pose.rx*r,pose.ry*r,pose.rz*r,'XYZ'));
  const perspective=1800/(1800-p.z);
  return [540+pose.x+p.x*perspective,1080+pose.y+p.y*perspective];
};
export const ChartStage:React.FC<{t:number}>=({t})=>{
  const pose=chartPose(t),progress=linear(t,3.05,6.45);
  return <div style={{position:'absolute',left:80,top:580,width:920,height:1000,transformOrigin:'460px 500px',transform:`translate(${pose.x}px,${pose.y}px) perspective(1800px) rotateX(${pose.rx}deg) rotateY(${pose.ry}deg) rotateZ(${pose.rz}deg) scale(${pose.scale})`,opacity:out(t,2.7,3.45)}}>
    <svg width="920" height="1000" viewBox="0 0 920 1000" style={{overflow:'visible'}}>
      <defs>
        <linearGradient id="rev-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#146ada" stopOpacity=".3"/><stop offset="1" stopColor="#146ada" stopOpacity="0"/></linearGradient>
        <linearGradient id="rev-chart-floor" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0b203d" stopOpacity=".7"/><stop offset="1" stopColor="#030711" stopOpacity="0"/></linearGradient>
        <clipPath id="rev-chart-reveal"><rect x="0" y="0" width={tracePoint(progress)[0]} height="900"/></clipPath>
      </defs>
      <path d="M-80 -100H1080V980H-80Z" fill="url(#rev-chart-floor)"/>
      {[150,300,450,600,750,900].map(y=><path key={y} d={`M-30 ${y}H910`} stroke={y===600?'#4a84bd':'#d5e8ff'} strokeWidth={y===600?2:1} opacity={y===600?.65:.1}/>)}
      {[0,160,320,480,640,800].map(x=><path key={x} d={`M${x} 45V900`} stroke="#d5e8ff" opacity=".07"/>)}
      <g clipPath="url(#rev-chart-reveal)"><path d={`${d} L755 900H40Z`} fill="url(#rev-chart-fill)"/></g>
      <path d={d} fill="none" stroke="#2b7be4" strokeWidth="24" opacity=".12" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress}/>
      <path d={d} fill="none" stroke="#e3efff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress}/>
      {[{x:245,y:285,at:4.35},{x:400,y:405,at:4.95},{x:560,y:525,at:5.65}].map((p,i)=>{
        const reveal=smooth(t,p.at,p.at+.32);
        return <g key={i} opacity={reveal*.85}><circle cx={p.x} cy={p.y} r={14+(1-reveal)*30} fill="#07172d" stroke={ice} strokeWidth="2"/><path d={`M${p.x} ${p.y-30}l-22 -35`} stroke={ice} strokeWidth="2"/></g>;
      })}
      <g opacity={smooth(t,6.3,6.65)}><path d="M755 745H880" stroke="#80b8ff" strokeWidth="2"/><text x="600" y="828" fill="#b8d8ff" fontFamily="DM Sans" fontSize="43" fontWeight="500">3.875,645</text></g>
    </svg>
  </div>;
};
