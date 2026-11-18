# Registro de passagem

No fim de cada etapa relevante (ou quando o Victor disser "salva o contexto"), quem trabalhou escreve uma entrada curta aqui, no topo. No máximo 10 linhas. Sem dados de cliente, senha ou chave. Separar o que foi **pedido**, o que foi **feito** e o que é **suposição**. Entradas com mais de 30 dias são resumidas pelo chefe-wg na revisão semanal.

Modelo:
```
## AAAA-MM-DD HHh · assunto
- Pedido: ...
- Feito: ... (arquivos)
- Decisões: ...
- Pendente / próximo passo: ...
- Verificado? sim/não, como
```

## 2026-11-18 14h10 · continuar o curso do Ferrari em sessão nova
- Pedido: terminar o Corredor Polonês e os cursos menores numa conversa nova do projeto VICTOR. A.
- Onde estão as legendas: no Chrome do Victor, aba player.scaleup.com.br, localStorage. Chaves `cp_<nº da aula>` (texto já sem repetição) e `cp_list` (lista nº|código|título). Códigos e títulos também em `docs/cursos/corredor-polones-aulas.md`.
- Como ler: abrir player.scaleup.com.br/embed/<qualquer código>, rodar JS que junta `localStorage.getItem('cp_'+n)` das aulas do módulo, trocar o documento por um <pre> com o texto e ler com get_page_text em blocos de ~45 mil caracteres. Nunca ecoar URLs com parâmetros.
- Falta resumir: 11 a 13 (estrutura de lançamento, perpétuo, eventos), 14 a 18 (produtos e preço), 23 a 25 (dados, posicionamento, temperatura), 30 a 34 (atração), 58 a 63 (gravação), 64 a 91 (copy), 104 a 118 (tráfego), 2 e 9 (panorama, gatilhos). Sem legenda: 4, 21, 44 e 47 a 57.
- Depois: cursos em portal.grupoxflow.com.br/m/courses?tenant=contedoscomplementares (Minhas lives semanais, CP IA, Pack Swipe File, ClickUp de lançamentos). Lista de aulas: clicar nos botões dos módulos e pegar os links `classId`; código do vídeo pelo iframe `/embed/`. Legendas: iframes do player abertos na própria aba do player, 5 por vez (ver como foi feito em `docs/curso-low-ticket-ia-notas.md`).
- Entregar: notas em `docs/curso-corredor-polones-<modulo>-notas.md` (palavras próprias, com aplicação no WG), skills novas ou atualizadas (copy e tráfego primeiro), cópia em `kairos/` no projeto e passagem no fim.
- Verificado? sim, legendas conferidas (todas as aulas com legenda têm texto salvo).

## 2026-11-18 14h · cursos, reabertura e kit do grupo
- Pedido: estudar os cursos do Leandro Ferrari e o kit de PDFs do grupo; montar a reabertura de 20/11 sem refazer a régua.
- Feito: notas dos cursos em `docs/curso-*`; skills novas `lancamento-pago-wg`, `front-ebook-wg`, `edicao-video-arte-wg`; reabertura em `docs/reabertura-20-nov-oferta.md` e régua do Gui atualizada; `tudo.md` criado.
- Decisões: reabertura a R$ 397 (aluno R$ 347); prêmios 3 camisas, 20 no encontro, livros até 23h59; vídeo gravado no lugar da live; DPC 2.0 depois para quem não comprou.
- Pendente: resumir os módulos restantes do Corredor Polonês (legendas no navegador do Victor); WhatsApp 24h (YCloud) em 19/11.
- Verificado? sim, arquivos commitados e copiados para o projeto.
