"""Generate local Indonesian VO and an original deterministic music/SFX bed.

Voice dependencies are optional production tooling, not needed to edit/render the
delivered Remotion project: the rendered stems are included in public/destino.
Run: PYTHONPATH=/tmp/destino-tts-legacy python scripts/destino-audio.py
"""
from pathlib import Path
import json, re, subprocess, sys, wave
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/destino'
WORK=ROOT/'out/destino-audio'
OUT.mkdir(parents=True,exist_ok=True)
WORK.mkdir(parents=True,exist_ok=True)
duration=84
source=(ROOT/'src/destino/content.ts').read_text()
script=source.split('export const voiceover = [',1)[1].split('];',1)[0]
paragraphs=re.findall(r"  '([^']*)'",script)
starts=[.35,7.35,17.35,29.35,36.35,48.35,60.35,76.35]
ends=[6.35,16.35,28.35,35.35,47.35,59.35,75.35,83.6]

def wav(path,a,sr):
    a=np.clip(a,-.98,.98)
    with wave.open(str(path),'wb') as w:
        w.setnchannels(1 if a.ndim==1 else a.shape[1]);w.setsampwidth(2);w.setframerate(sr)
        w.writeframes((a*32767).astype('<i2').tobytes())

if '--music-only' not in sys.argv:
    import sherpa_onnx
    model=Path('/tmp/destino-tts-model/vits-piper-id_ID-news_tts-medium')
    cfg=sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(
        vits=sherpa_onnx.OfflineTtsVitsModelConfig(
            model=str(model/'id_ID-news_tts-medium.onnx'),tokens=str(model/'tokens.txt'),
            data_dir=str(model/'espeak-ng-data'),noise_scale=.5,noise_scale_w=.65),
        num_threads=2,provider='cpu'),max_num_sentences=1)
    if not cfg.validate(): raise RuntimeError('Invalid TTS configuration')
    tts=sherpa_onnx.OfflineTts(cfg)
    voice=np.zeros(duration*48000,dtype=np.float32)
    alignment=[]
    for i,(text,start,end) in enumerate(zip(paragraphs,starts,ends)):
        # Acronyms are spoken explicitly in Indonesian rather than guessed.
        spoken=text.replace('FOMC','ef o em si').replace('JOLTS','jolts').replace('hold','ditahan').replace('reclaim','reklamasi level').replace('retest','uji ulang').replace('breakdown','penembusan').replace('wick','sumbu candle').replace('yield','imbal hasil').replace('Destino CT','Destino si ti').replace('focus, plan, execute, succeed','fokus, rencanakan, eksekusi, raih hasil')
        raw=WORK/f'vo-{i:02d}.wav'
        if not raw.exists() or raw.stat().st_size<100:
            audio=tts.generate(spoken,sid=0,speed=1.03)
            wav(raw,np.asarray(audio.samples),audio.sample_rate)
        with wave.open(str(raw)) as w:raw_seconds=w.getnframes()/w.getframerate()
        stretch=max(1.0,raw_seconds/(end-start))
        if stretch>1.45:raise RuntimeError(f'Paragraph {i} needs excessive acceleration: {stretch:.2f}')
        ready=WORK/f'vo-{i:02d}-timed.wav'
        subprocess.run(['ffmpeg','-v','error','-y','-i',str(raw),'-af',f'atempo={stretch:.6f},highpass=f=75,lowpass=f=10000,loudnorm=I=-17:TP=-2:LRA=8','-ar','48000','-ac','1',str(ready)],check=True)
        with wave.open(str(ready)) as w:arr=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(np.float32)/32768
        offset=round(start*48000);voice[offset:offset+len(arr)]+=arr
        alignment.append({'chapter':i,'start':start,'end':start+len(arr)/48000,'rate':stretch,'text':text,'spoken':spoken})
        print(f'VO {i+1}/8: {len(arr)/48000:.2f}s, rate {stretch:.3f}',flush=True)
    wav(OUT/'voiceover.wav',voice,48000)
    (OUT/'voiceover-timing.json').write_text(json.dumps(alignment,ensure_ascii=False,indent=2))
    (ROOT/'DESTINO-VO.md').write_text('# DestinoCT — XAUUSD, 2–6 November 2026\n\nNarasi sintetis bahasa Indonesia. Delapan paragraf mengikuti delapan babak.\n\n'+'\n\n'.join(paragraphs)+'\n')

# Original music: a restrained, minor-key 86 BPM electronic bed.
# No audio is copied from the uploaded reference.
sr=48000;n=duration*sr;rng=np.random.default_rng(1042)
mix=np.zeros((n,2),dtype=np.float32)
def add(a,start,gain=1,pan=0):
    first=round(start*sr);end=min(n,first+len(a))
    if first<0 or first>=n:return
    a=a[:end-first]*gain
    mix[first:end,0]+=a*np.sqrt((1-pan)/2)
    mix[first:end,1]+=a*np.sqrt((1+pan)/2)
def tone(freq,dur,amp,soft=False):
    t=np.arange(int(dur*sr))/sr
    env=np.minimum(1,t/(.22 if soft else .012))*np.exp(-t/(dur*.5))
    env*=np.minimum(1,(dur-t)/.08)
    return amp*env*(np.sin(2*np.pi*freq*t)+.18*np.sin(2*np.pi*freq*2.002*t))
beat=60/86
for k,start in enumerate(np.arange(0,duration,beat)):
    if k%4==0:
        t=np.arange(int(.35*sr))/sr
        phase=2*np.pi*(44*t+55*.025*(1-np.exp(-t/.025)))
        add(np.sin(phase)*np.exp(-t*15),start,.075)
    if k%2==1:
        t=np.arange(int(.12*sr))/sr
        add(rng.standard_normal(len(t))*np.exp(-t*75),start,.007,.25)
    notes=[164.81,196,246.94,293.66,246.94,196,146.83,220]
    add(tone(notes[k%8],.68,.026),start,pan=(-.3 if k%2 else .3))
for bar,start in enumerate(np.arange(0,duration,8*beat)):
    chord=[[82.41,123.47,164.81],[65.41,98,130.81],[73.42,110,146.83],[61.74,92.5,123.47]][bar%4]
    for j,note in enumerate(chord):add(tone(note,8*beat+.7,.023,True),start,pan=(j-1)*.3)
# Body-driven sweeps and ball impacts, matched to the actual timeline.
for cut in [6.6,16.6,28.6,35.6,47.6,59.6,75.6]:
    d=.95;t=np.arange(int(d*sr))/sr
    noise=rng.standard_normal(len(t));noise=np.convolve(noise,np.ones(17)/17,mode='same')
    add(noise*np.sin(np.pi*t/d)**2,cut-.3,.12,-.2)
for hit,gain in [(17.64,.12),(18.36,.07),(18.86,.04)]:
    t=np.arange(int(.22*sr))/sr
    add(np.sin(2*np.pi*(75*t+35*.02*(1-np.exp(-t/.02))))*np.exp(-t*22),hit,gain)
for hit in [22.9,24.2,41.2,53.2,64.6,69.6,78.4]:
    add(tone(880,.26,.035),hit,pan=-.1)
    add(tone(1320,.4,.024),hit+.07,pan=.15)
t=np.arange(n)/sr
fade=np.minimum(1,t/.45)*np.minimum(1,np.maximum(0,(duration-t)/1.8))
mix*=fade[:,None]
wav(WORK/'music-sfx.wav',mix,sr)
subprocess.run(['ffmpeg','-v','error','-y','-i',str(WORK/'music-sfx.wav'),'-af','loudnorm=I=-26:TP=-7:LRA=8','-c:a','aac','-b:a','192k',str(OUT/'music-sfx.m4a')],check=True)
print('Original music/SFX complete',flush=True)
