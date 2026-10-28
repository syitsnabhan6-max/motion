"""Original deterministic synthesized bed and interface cues, no sampled audio."""
from pathlib import Path
import numpy as np,wave
sr=44100;duration=24;n=sr*duration
mix=np.zeros((n,2),dtype=np.float64);rng=np.random.default_rng(42)
def add(a,start,pan=0):
 k=int(start*sr);a=a[:n-k]
 if k<0 or len(a)==0:return
 mix[k:k+len(a),0]+=a*np.sqrt((1-pan)/2);mix[k:k+len(a),1]+=a*np.sqrt((1+pan)/2)
def tone(freq,dur,vol=.04):
 t=np.arange(int(dur*sr))/sr
 env=(1-np.exp(-t*35))*np.exp(-t*2.4)*(np.minimum(1,(dur-t)*20))
 return vol*env*(np.sin(2*np.pi*freq*t)+.18*np.sin(2*np.pi*freq*2*t))
# Soft minor arpeggio. Low, spacious and metrically consistent.
notes=[174.614,207.652,261.626,311.127,261.626,207.652,155.563,207.652]
for i,start in enumerate(np.arange(0,23,.5)):
 add(tone(notes[i%8],1.4,.045 if i%4==0 else .025),start,pan=(-.35 if i%2 else .35))
# Sub pulse every beat and a restrained brushed high tick on the off-beat.
for i,start in enumerate(np.arange(0,23,.5)):
 t=np.arange(int(.26*sr))/sr
 kick=.075*np.sin(2*np.pi*(48*t+25*(1-np.exp(-t*18))/18))*np.exp(-t*22)
 add(kick,start)
 if i%2:
  tt=np.arange(int(.045*sr))/sr;noise=rng.standard_normal(len(tt));noise=np.r_[0,np.diff(noise)]
  add(noise*.009*np.exp(-tt*100),start,pan=.15)
# Air sweeps, landing tones and distinct UI confirmations.
for start in [2.7,6.7,10,13.8,18.1]:
 dur=.85;t=np.arange(int(dur*sr))/sr;noise=rng.standard_normal(len(t));noise=np.convolve(noise,np.ones(22)/22,mode='same')
 add(noise*.075*np.sin(np.pi*t/dur)**2,start,pan=-.2)
for start in [5.8,11.15,16.1]:
 add(tone(1046.5,.18,.045),start,pan=.1);add(tone(1568,.23,.022),start+.04,pan=-.1)
add(tone(349.23,2.4,.07),19.2);add(tone(523.25,2.4,.04),19.2,pan=.25)
# Global fades and headroom.
t=np.arange(n)/sr;env=np.minimum(1,t/.4)*np.minimum(1,np.maximum(0,(duration-t)/1.6));mix*=env[:,None]
peak=np.max(np.abs(mix));mix*=min(1,.55/peak)
Path('public/pulse').mkdir(exist_ok=True)
with wave.open('/tmp/pulse-original.wav','wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((mix*32767).astype('<i2').tobytes())
print('Original 24-second stereo soundtrack created')
