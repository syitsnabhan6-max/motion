import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C,defaultOutlook,OutlookProps} from './content';
import {Background,Brand,DISPLAY} from './Primitives';
import {Objects3D} from './Objects3D';

export const DestinoCover:React.FC<OutlookProps>=(props)=>{
 const config={...defaultOutlook,...props};
 return <AbsoluteFill style={{fontFamily:'DM Sans',color:C.white,overflow:'hidden',background:C.ink}}>
  <Background t={4.6}/>
  <div style={{position:'absolute',left:-400,top:940,width:1850,height:1100,borderRadius:'50%',background:'radial-gradient(ellipse at 50% 0%,#1470d9,#062855 55%,#03060c 76%)',boxShadow:'inset 0 3px 3px #9bcaff40'}}/>
  <div style={{position:'absolute',left:90,top:190}}><Brand logoSrc={config.logoSrc} width={420}/></div>
  <div style={{position:'absolute',left:80,right:100,top:400,fontFamily:DISPLAY,fontWeight:700,fontSize:105,lineHeight:1.04,letterSpacing:'-.055em',transform:'rotate(-4deg)',textShadow:'0 9px 0 #042c63,0 20px 50px #0008'}}>Market outlook<div style={{fontSize:155,color:C.ice}}>XAUUSD</div></div>
  <div style={{position:'absolute',inset:0,transform:'translateY(-85px) scale(.70)'}}><Objects3D t={3.4} mode="cover"/></div>
  <div style={{position:'absolute',left:0,right:0,top:1260,height:600,background:'linear-gradient(180deg,transparent,#030b1acc 18%,#030b1a80 65%,transparent)'}}/>
  <div style={{position:'absolute',left:83,top:1380,fontFamily:DISPLAY,fontSize:83,fontWeight:650,lineHeight:1.04,letterSpacing:'-.05em'}}>4.000 jebol.<br/><span style={{color:C.ice}}>Lanjut turun?</span></div>
  <div style={{position:'absolute',left:90,top:1600,padding:'20px 38px',borderRadius:60,fontSize:38,fontWeight:600,border:'2px solid #76bcff60',background:'linear-gradient(120deg,#0753a6,#092d5d)',boxShadow:'0 12px 0 #02172e',transform:'rotate(-3deg)'}}>{config.week}</div>
 </AbsoluteFill>;
};
