"""15-second direction study: new wording, un-stretched VO, original score/SFX.

PYTHONPATH=/tmp/destino-tts-legacy python scripts/destino-revision-audio.py
Piper voice is the same available local narrator, not a new premium voice.
The rendered stems are included; synthesis tools are not edit dependencies.
"""
from pathlib import Path
import ctypes as C
import json, subprocess, wave
import numpy as np
from scipy.signal import butter, sosfilt
import sherpa_onnx

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/destino/revision'
WORK=ROOT/'out/destino-revision-audio'
OUT.mkdir(parents=True,exist_ok=True);WORK.mkdir(parents=True,exist_ok=True)
SR=48000;DUR=15;N=SR*DUR

def write_wav(path,arr,sr=SR):
    with wave.open(str(path),'wb') as w:
        w.setnchannels(1 if arr.ndim==1 else arr.shape[1]);w.setsampwidth(2);w.setframerate(sr)
        w.writeframes((np.clip(arr,-.99,.99)*32767).astype('<i2').tobytes())

model=Path('/tmp/destino-tts-model/vits-piper-id_ID-news_tts-medium')
config=sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(vits=sherpa_onnx.OfflineTtsVitsModelConfig(
    model=str(model/'id_ID-news_tts-medium.onnx'),tokens=str(model/'tokens.txt'),
    data_dir=str(model/'espeak-ng-data'),noise_scale=.55,noise_scale_w=.72),num_threads=2,provider='cpu'),max_num_sentences=1)
tts=sherpa_onnx.OfflineTts(config)
parts=[
    (.15,3.15,'Emas, di bawah empat ribu.'),
    (3.7,6.7,'Pantulan, atau lanjut turun?'),
    (7.05,11.55,'Pasca ef o em si. Bunga ditahan.'),
    (11.85,14.85,'Tapi dua anggota memilih naik.'),
]
voice=np.zeros(N,dtype=np.float32);timing=[]
for i,(start,end,words) in enumerate(parts):
    raw=WORK/f'voice-{i}.wav'
    data=tts.generate(words,sid=0,speed=1.04)
    seconds=len(data.samples)/data.sample_rate
    if seconds>end-start:
        # Re-synthesise prosody at the required rate, never stretch a WAV.
        rate=1.04*seconds/(end-start)
        if rate>1.18:raise RuntimeError(f'Phrase {i} needs shorter writing: {seconds:.2f}s')
        data=tts.generate(words,sid=0,speed=rate)
    write_wav(raw,np.asarray(data.samples),data.sample_rate)
    clean=WORK/f'voice-{i}-mix.wav'
    subprocess.run(['ffmpeg','-v','error','-y','-i',str(raw),'-af','highpass=f=85,lowpass=f=9500,loudnorm=I=-18:TP=-3:LRA=7','-ar',str(SR),'-ac','1',str(clean)],check=True)
    with wave.open(str(clean)) as f:arr=np.frombuffer(f.readframes(f.getnframes()),dtype='<i2').astype(np.float32)/32768
    begin=round(start*SR);finish=begin+len(arr)
    if finish>N:raise RuntimeError('VO would be cut off')
    voice[begin:finish]+=arr
    timing.append({'start':start,'end':finish/SR,'text':words})
    print(f'Phrase {i+1}: {start:.2f}–{finish/SR:.2f}',flush=True)
write_wav(OUT/'voiceover.wav',voice)
(OUT/'timing.json').write_text(json.dumps(timing,indent=2,ensure_ascii=False))

# Soft electric-piano notes from the installed TimGM soundfont. The score,
# rhythm, bass, percussion, transitions and mix below are newly composed.
lib=C.CDLL('libfluidsynth.so.3')
def binding(name,result,args):
    f=getattr(lib,name);f.restype=result;f.argtypes=args;return f
ptr=C.c_void_p;integer=C.c_int;number=C.c_double;string=C.c_char_p
new_settings=binding('new_fluid_settings',ptr,[])
setnum=binding('fluid_settings_setnum',integer,[ptr,string,number])
setint=binding('fluid_settings_setint',integer,[ptr,string,integer])
new_synth=binding('new_fluid_synth',ptr,[ptr])
load=binding('fluid_synth_sfload',integer,[ptr,string,integer])
program=binding('fluid_synth_program_change',integer,[ptr,integer,integer])
noteon=binding('fluid_synth_noteon',integer,[ptr,integer,integer,integer])
noteoff=binding('fluid_synth_noteoff',integer,[ptr,integer,integer])
render=binding('fluid_synth_write_float',integer,[ptr,integer,ptr,integer,integer,ptr,integer,integer])
settings=new_settings();setnum(settings,b'synth.sample-rate',SR);setnum(settings,b'synth.gain',.35)
setnum(settings,b'synth.reverb.room-size',.6);setnum(settings,b'synth.reverb.level',.22)
setint(settings,b'synth.chorus.active',0)
synth=new_synth(settings);load(synth,b'/usr/share/sounds/sf2/TimGM6mb.sf2',1);program(synth,0,4)
events=[];beat=.6
chords=[[50,57,60,64],[46,53,57,60],[43,50,53,57],[45,52,55,59]]
for bar in range(7):
    at=bar*4*beat;chord=chords[bar%4]
    for j,note in enumerate(chord):
        events.append((at+j*.035,True,note,37+j*3));events.append((at+1.4,False,note,0))
    for offset,index in [(1.8,3),(2.1,2)]:
        events.append((at+offset,True,chord[index]+12,31));events.append((at+offset+.25,False,chord[index]+12,0))
events=sorted(e for e in events if e[0]<DUR)
score=np.zeros((N,2),dtype=np.float32);position=0
for at,on,note,velocity in events+[(DUR,False,0,0)]:
    target=min(N,round(at*SR));count=target-position
    if count:
        left=np.zeros(count,dtype=np.float32);right=np.zeros(count,dtype=np.float32)
        render(synth,count,left.ctypes.data,0,1,right.ctypes.data,0,1)
        score[position:target,0]=left;score[position:target,1]=right;position=target
    if on:noteon(synth,0,note,velocity)
    else:noteoff(synth,0,note)
binding('delete_fluid_synth',None,[ptr])(synth);binding('delete_fluid_settings',None,[ptr])(settings)
score*=.7
rng=np.random.default_rng(42026)
def add(arr,at,gain=1,pan=0):
    start=round(at*SR);stop=min(N,start+len(arr))
    if start<0 or start>=N:return
    a=arr[:stop-start]*gain
    score[start:stop,0]+=a*np.sqrt((1-pan)/2);score[start:stop,1]+=a*np.sqrt((1+pan)/2)
def low(arr,hz):return sosfilt(butter(2,hz,fs=SR,output='sos'),arr)
def high(arr,hz):return sosfilt(butter(2,hz,btype='high',fs=SR,output='sos'),arr)
for step,at in enumerate(np.arange(0,DUR,beat)):
    # A small, defined pocket; no repeated notification-like melodic beeps.
    t=np.arange(round(.45*SR))/SR
    kick=np.sin(2*np.pi*(49*t+65*.035*(1-np.exp(-t/.035))))*np.exp(-t*13)
    add(np.tanh(kick*1.6),at,.057 if step%4==0 else .033)
    if step%4 in [1,3]:
        t=np.arange(round(.16*SR))/SR
        clap=high(rng.normal(0,1,len(t)),1700)*np.exp(-t*29)*(1+.3*np.sin(2*np.pi*75*t))
        add(clap,at,.009,.12)
    if at>2.4:
        t=np.arange(round(.065*SR))/SR
        hat=high(rng.normal(0,1,len(t)),6500)*np.exp(-t*90)
        add(hat,at+beat/2,.006,-.3)
    if step%4==0:
        t=np.arange(round(1.35*SR))/SR;note=chords[(step//4)%4][0]-12;freq=440*2**((note-69)/12)
        bass=(np.sin(2*np.pi*freq*t)+.2*np.sin(2*np.pi*freq*2*t))*np.minimum(1,t/.025)*np.exp(-t*2.8)
        add(bass,at,.033)
# Two physical movement swells and three soft impacts, tied to visual actions.
for at,length,pan in [(2.45,.8,-.3),(7,.75,.3),(8.5,.7,0)]:
    t=np.arange(round(length*SR))/SR;noise=low(rng.normal(0,1,len(t)),2600)
    add(noise*np.sin(np.pi*t/length)**3,at,.045,pan)
for at,gain in [(7.75,.09),(8.18,.045),(8.42,.025)]:
    t=np.arange(round(.2*SR))/SR
    add(np.sin(2*np.pi*(92*t+12*(1-np.exp(-t*15))))*np.exp(-t*28),at,gain)
for at in [12.3,12.48]:
    t=np.arange(round(.12*SR))/SR
    add(low(rng.normal(0,1,len(t)),1800)*np.exp(-t*70),at,.025)
# Duck music under phrases. Attacks/releases are smoothed, not hard cuts.
duck=np.ones(N)
for item in timing:
    a=max(0,round((item['start']-.08)*SR));b=min(N,round((item['end']+.12)*SR));duck[a:b]=.48
duck=np.convolve(duck[::240],np.ones(31)/31,mode='same')
duck=np.interp(np.arange(N),np.arange(len(duck))*240,duck)
t=np.arange(N)/SR;fade=np.minimum(1,t/.1)*np.minimum(1,np.maximum(0,(DUR-t)/.45))
score*=duck[:,None]*fade[:,None]
write_wav(WORK/'music-sfx.wav',score)
subprocess.run(['ffmpeg','-v','error','-y','-i',str(WORK/'music-sfx.wav'),'-af','loudnorm=I=-29:TP=-7:LRA=6','-c:a','aac','-b:a','192k',str(OUT/'music-sfx.m4a')],check=True)
print('New 15s score and narration exported',flush=True)
