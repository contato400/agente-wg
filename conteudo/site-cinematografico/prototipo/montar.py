import base64, pathlib
F = pathlib.Path(__file__).parent.parent / 'fotos'
def uri(n): return 'data:image/webp;base64,' + base64.b64encode((F / n).read_bytes()).decode()
U = 'https://www.wesleygimenez.com.br/{p}?utm_source=vc&utm_medium=site&utm_campaign=site-principal&utm_content={c}&utm_term=ag-ofertas'
cards = [
 ('Nunca treinei nada', 'Comece do zero com o método do Mestre Wesley, passo a passo, sem precisar de preparo físico.', 'dpc', 'iniciante', 'Ver o treino para iniciantes'),
 ('Sou mulher e quero me proteger', 'Técnicas simples para sair de agarrão, puxão de cabelo e abordagem na rua.', 'contra-ataque-feminino', 'feminina', 'Ver o treino feminino'),
 ('Tenho medo de assalto', 'Aprenda a perceber o risco antes, na rua, no carro e em casa, e a sair inteiro.', 'protocolo-vida-segura', 'assalto', 'Ver como evitar assalto'),
 ('Medo de faca', 'Entenda como manter distância e sair vivo de uma ameaça com lâmina.', 'combate-sobrevivencia-laminas', 'faca', 'Ver o treino contra faca'),
 ('Meu filho sofre bullying', 'Postura, voz firme e confiança para a criança pedir ajuda e não virar alvo.', 'catalogo', 'bullying', 'Ver o que serve para o meu filho'),
 ('Não sei por onde começar', 'Responda o que você procura e veja o treino certo para você.', 'catalogo', 'nao-sei', 'Encontrar meu treino'),
]
cards_html = '\n'.join(f'''<a class="card" href="{U.format(p=p,c=c)}" target="_blank" rel="noopener">
  <h3>{t}</h3><p>{d}</p><span class="cta">{b} <i aria-hidden="true">→</i></span></a>''' for t,d,p,c,b in cards)
html = (pathlib.Path(__file__).parent / 'modelo.html').read_text()
html = html.replace('{{HERO}}', uri('hero-vermelho.webp')).replace('{{HERO_M}}', uri('hero-vermelho-m.webp')) \
  .replace('{{ESPELHO}}', uri('chute-espelho-s.webp')).replace('{{LUVAS}}', uri('luvas-banner-s.webp')).replace('{{CARDS}}', cards_html) \
  .replace('{{WPP}}', 'https://wa.me/5531993294274?text=' + 'Shalom%2C%20vim%20pelo%20site%20e%20quero%20ajuda%20para%20escolher%20meu%20treino')
(pathlib.Path(__file__).parent / 'index.html').write_text(html)
print(len(html)//1024, 'KB')
