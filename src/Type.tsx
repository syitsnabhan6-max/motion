import React from 'react';
import {move,visible} from './motion';
import {palette as P} from './content';
export const Type:React.FC<{t:number;start:number;end:number;lines:string[];top?:number;size?:number;dark?:boolean;accent?:number;align?:'left'|'center';left?:number;compact?:boolean}> = ({t,start,end,lines,top=340,size=100,dark=false,accent=lines.length-1,align='center',left=70,compact=false}) => {
 if(t<start||t>end)return null;
 const exit=move(t,end-.42,end);
 return <div style={{position:'absolute',top,left,right:70,textAlign:align,fontSize:size,fontWeight:600,letterSpacing:'-.055em',lineHeight:compact?1.02:1.12,color:dark?P.ink:'white',transform:`translateY(${-exit*28}px)`,opacity:1-exit}}>
 {lines.map((line,i)=>{const p=move(t,start+i*.17,start+.72+i*.17);return <div key={i} style={{padding:'5px 0',transform:`translate3d(${align==='left'?(1-p)*-20:0}px,${(1-p)*55}px,0) scale(${.98+.02*p})`,opacity:p,filter:`blur(${(1-p)*9}px)`,color:i===accent?(dark?P.blue:P.sky):undefined}}>{line}</div>})}</div>;
};
export const Note:React.FC<{t:number;start:number;end:number;text:string;top?:number;dark?:boolean}> = ({t,start,end,text,top=1350,dark=false})=><div style={{position:'absolute',top,left:105,right:105,textAlign:'center',whiteSpace:'pre-line',fontSize:38,lineHeight:1.45,fontWeight:500,letterSpacing:'-.025em',color:dark?'#506078':'#d5e2f3',opacity:visible(t,start,end),transform:`translateY(${move(t,start,start+.7,25,0)}px)`}}>{text}</div>;
