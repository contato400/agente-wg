import subprocess,sys,json
SRC="/home/claude/agente-wg/conteudo/2026-11-19/variacoes-presente/original_A_assista-ate-o-final.mp4"
SEG={"S1":(0.00,1.42,0),"S2a":(5.93,7.29,1),"S2b":(8.32,9.30,1),"S3":(9.40,15.18,0),"S4a":(24.62,25.42,1),"S4b":(26.44,27.36,1),"S5":(27.38,30.88,0),"S5x":(27.50,30.88,0),"S6":(30.92,34.26,1),"S7":(35.44,37.15,0)}
def build(order,out):
    order=list(order)
    fc=[];n=len(order)
    for i,k in enumerate(order):
        a,b,z=SEG[k]
        v=f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS"
        if z: v+=",scale=iw*1.08:ih*1.08,crop=720:1280:(iw-720)/2:(ih-1280)/2"
        fc.append(v+f",fps=30,format=yuv420p[v{i}]")
        d=b-a
        fc.append(f"[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st={d-0.03:.3f}:d=0.03[a{i}]")
    fc.append("".join(f"[v{i}][a{i}]" for i in range(n))+f"concat=n={n}:v=1:a=1[v][a]")
    subprocess.run(["ffmpeg","-v","error","-y","-i",SRC,"-filter_complex",";".join(fc),"-map","[v]","-map","[a]","-c:v","libx264","-preset","veryfast","-crf","16","-c:a","aac","-b:a","160k","-ar","48000",out],check=True)
if __name__=="__main__":
    build(sys.argv[2].split(","),sys.argv[1])
