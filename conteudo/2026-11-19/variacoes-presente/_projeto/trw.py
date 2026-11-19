from faster_whisper import WhisperModel
import json,sys,subprocess,numpy as np
m=WhisperModel("small",device="cpu",compute_type="int8")
for f in sys.argv[1:]:
    a=subprocess.run(["ffmpeg","-v","error","-i",f,"-ac","1","-ar","16000","-f","s16le","-"],capture_output=True).stdout
    a=np.frombuffer(a,np.int16).astype(np.float32)/32768
    segs,_=m.transcribe(a,language="pt",word_timestamps=True,beam_size=5)
    W=[{"w":w.word.strip(),"s":w.start,"e":w.end} for s in segs for w in s.words]
    json.dump(W,open(f+".words.json","w"),ensure_ascii=False)
    print(f, " ".join(x["w"] for x in W))
