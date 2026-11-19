import base64, json, pathlib
A = pathlib.Path(__file__).parent; F = A.parent / 'fotos'
def b64(p, mime): return f'data:{mime};base64,' + base64.b64encode(p.read_bytes()).decode()
U = 'https://www.wesleygimenez.com.br/{p}?utm_source=vc&utm_medium=site&utm_campaign=site-principal&utm_content={c}&utm_term=ag-ofertas'
D = {
 'iniciante': ('Defesa Pessoal Caveira 2.0', 'Do zero, passo a passo, para quem nunca treinou.', 'dpc', 'Ver o treino para iniciantes'),
 'mulher': ('Contra Ataque Feminino', 'Sair de agarrão, puxão de cabelo e abordagem na rua.', 'contra-ataque-feminino', 'Ver o treino feminino'),
 'assalto': ('Protocolo Vida Segura', 'Perceber o risco antes, na rua, no carro e em casa.', 'protocolo-vida-segura', 'Ver como evitar assalto'),
 'faca': ('Combate e Sobrevivência com Lâminas', 'Manter distância e sair vivo de uma ameaça com faca.', 'combate-sobrevivencia-laminas', 'Ver o treino contra faca'),
 'bullying': ('Preparar o seu filho', 'Postura, voz firme e confiança para pedir ajuda e não virar alvo.', 'catalogo', 'Ver o que serve para o meu filho'),
}
DEST = {k: {'nome': n, 'texto': t, 'url': U.format(p=p, c='avatar-' + k), 'botao': b} for k, (n, t, p, b) in D.items()}
cards = '\n'.join(f'<a class="card" href="{U.format(p=p, c="card-"+k)}" target="_blank" rel="noopener"><h3>{n}</h3><p>{t}</p><span class="cta">{b} →</span></a>' for k, (n, t, p, b) in D.items())
cards += f'\n<a class="card" href="{U.format(p="catalogo", c="card-nao-sei")}" target="_blank" rel="noopener"><h3>Não sei por onde começar</h3><p>Veja todos os treinos organizados por situação.</p><span class="cta">Ver o catálogo →</span></a>'
falas = json.load(open(A / 'falas.json', encoding='utf-8'))
audio = {k: b64(A / 'audio' / f'{k}.mp3', 'audio/mpeg') for k in falas}
h = (A / 'modelo.html').read_text(encoding='utf-8')
rep = {'{{FUNDO}}': b64(F / 'hero-vermelho-m.webp', 'image/webp'), '{{AVATAR}}': b64(A / 'avatar.webp', 'image/webp'),
       '{{FOTO}}': b64(F / 'chute-espelho-s.webp', 'image/webp'), '{{CARDS}}': cards,
       '{{FALAS}}': json.dumps(falas, ensure_ascii=False), '{{AUDIO}}': json.dumps(audio), '{{DESTINO}}': json.dumps(DEST, ensure_ascii=False),
       '{{WPP}}': 'https://wa.me/5531993294274?text=Shalom%2C%20vim%20pelo%20site%20e%20quero%20ajuda%20para%20escolher%20meu%20treino'}
for k, v in rep.items(): h = h.replace(k, v)
(A / 'index.html').write_text(h, encoding='utf-8'); print(len(h) // 1024, 'KB')
