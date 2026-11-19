"""Recorta o Wesley quadro a quadro (MediaPipe selfie multiclass) e grava as máscaras em PNG.
Uso: python3 -I mascara.py <video.mp4> <pasta_saida> [inicio_s] [dur_s]
Saída: <pasta>/m_00000.png ... (8 bits, mesmo tamanho do vídeo), suavizadas no tempo.
"""
import os, sys, subprocess, numpy as np
from PIL import Image
import mediapipe as mp
from mediapipe.tasks.python import vision, BaseOptions

AQUI = os.path.dirname(os.path.abspath(__file__))
src, out = sys.argv[1], sys.argv[2]
ss = sys.argv[3] if len(sys.argv) > 3 else "0"
dur = sys.argv[4] if len(sys.argv) > 4 else None
os.makedirs(out, exist_ok=True)
w, h = map(int, subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v", "-show_entries", "stream=width,height", "-of", "csv=p=0", src], capture_output=True, text=True).stdout.strip().split(","))
cmd = ["ffmpeg", "-nostdin", "-v", "error", "-ss", ss, "-i", src] + (["-t", dur] if dur else []) + ["-f", "rawvideo", "-pix_fmt", "rgb24", "-"]
p = subprocess.Popen(cmd, stdout=subprocess.PIPE)
seg = vision.ImageSegmenter.create_from_options(vision.ImageSegmenterOptions(
    base_options=BaseOptions(model_asset_path=os.path.join(AQUI, "modelos/selfie_multiclass_256x256.tflite")),
    running_mode=vision.RunningMode.VIDEO, output_confidence_masks=True))
prev, i = None, 0
while True:
    buf = p.stdout.read(w * h * 3)
    if len(buf) < w * h * 3: break
    fr = np.frombuffer(buf, np.uint8).reshape(h, w, 3)
    r = seg.segment_for_video(mp.Image(image_format=mp.ImageFormat.SRGB, data=np.ascontiguousarray(fr)), int(i * 1000 / 30))
    m = 1.0 - r.confidence_masks[0].numpy_view().astype(np.float32).squeeze()  # classe 0 = fundo
    m = np.clip((m - 0.25) / 0.5, 0, 1)  # contraste da borda
    prev = m if prev is None else 0.6 * m + 0.4 * prev  # tira o tremido
    Image.fromarray((prev * 255).astype(np.uint8)).save(os.path.join(out, f"m_{i:05d}.png"))
    i += 1
print("mascaras", i)
