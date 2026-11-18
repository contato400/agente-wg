# Série "Golpe da falsa central" · arco, fontes e horários
Personagem fictício: Dona Maria. Selo em todas as partes: HISTÓRIA BASEADA EM GOLPES REAIS. Palavra-chave única: CAVEIRA (ManyChat). Nada publicado: o Victor programa.

## Arco (uma virada por parte, cada uma termina no pior momento)
| Parte | Quando | O que acontece | Regra do Mestre | Gancho final |
|---|---|---|---|---|
| 1 (aprovada) | postada | Falsa central do banco pede o código do SMS | (lembrança) | "O que ela fez em seguida salvou o dinheiro dela" |
| 2 | qui 19/11, 7h | Ela lembra a regra, desliga. Dois minutos depois liga o "delegado": conta usada por criminosos, ajude a polícia, não conte a ninguém | Banco NUNCA pede senha nem código | "Será que era mesmo a polícia?" |
| 3 | qui 19/11, 12h | "Se desligar vai ser presa". Pede Pix de todo o saldo para a "conta segura da polícia". Dedo em cima do botão. Ela cancela | Polícia NUNCA pede Pix, não prende por telefone | "Meia hora depois, alguém tocou a campainha" |
| 4 | qui 19/11, 18h | Homem na porta: "vim buscar o seu cartão para a perícia do banco". Ela não abre. Ele bate mais forte | Banco NUNCA busca cartão em casa. Não abrir a porta, falar de longe, chamar vizinho, 190 | "Como essa história terminou?" |
| 5 (final) | sex 20/11, 7h | Ela não abriu, ligou 190, o homem foi embora. Ligou para o número de trás do cartão: era golpe, dinheiro salvo. 5 regras com check. Chamada para a reabertura de hoje 19h | Resumo das 5 regras | "Hoje, às 19h, o Mestre Wesley abre uma condição especial... Comente CAVEIRA para entrar no grupo" |

Parte 5: sem preço e sem prazo de fechamento. "Hoje, às 19h" só vale se for ao ar na sexta 20/11 (se mudar, é só trocar a fala no JSON e renderizar de novo).
Cada parte abre com uma frase de resumo da anterior, para quem chega sem ter visto.

## Fontes conferidas (18/11)
| Afirmação | Fonte | Resultado |
|---|---|---|
| Banco nunca pede senha, código ou token por telefone; não pede Pix para "regularizar" | Febraban via Agência Brasil, "Como evitar cair em golpes bancários" (agenciabrasil.ebc.com.br/economia/noticia/2024-01/como-evitar-cair-em-golpes-bancarios) | Confirmado |
| Na dúvida, desligar, pegar o número que está no cartão e ligar (de outro telefone) | Mesma fonte | Confirmado |
| Golpe do falso motoboy: dizem que o cartão foi clonado, pedem senha, mandam recolher o cartão para "perícia"; banco nunca recolhe cartão; pressão para não desligar | Serasa, "Golpe do falso motoboy" (serasa.com.br/premium/blog/golpe-do-falso-motoboy) | Confirmado |
| Falso delegado ameaça prisão para pressionar; não fazer transferência; não entregar cartão a terceiros; desligar e ligar para o banco | Cartilha MPRJ e MPES sobre fraudes bancárias (mprj.mp.br/documents/20184/30266/mprj_mpes_cartilha_fraudes_bancarias.pdf) | Confirmado |
| Criminosos usam o nome e a foto de delegados para pedir Pix; delegado diz que não teria motivo para pedir Pix | Olhar Digital, 27/03/2023 | Confirma o golpe; "polícia nunca pede Pix" é conclusão lógica, não frase literal da fonte |

Ressalvas: (1) "conta segura" aparece no golpe real, mas a cartilha do MP não usa essa expressão literal; (2) a frase "polícia não prende ninguém por telefone" é regra geral (prisão só em flagrante ou por ordem da Justiça); a fonte diz que é ameaça usada pelo golpista. Sugiro o Wesley ou o jurídico bater o olho nessas duas.
Dica de segurança incluída por fonte: ligar de outro telefone (golpista pode manter a linha aberta). No vídeo ela "liga para o número de trás do cartão"; na legenda do post o Victor pode reforçar.

## Entrega técnica
parteN.json (roteiro), parteN.mp4 (1080x1920), parteN_capa.jpg, parteN_conferencia.png, legendas.md. Voz: Piper local (nível da Parte 1). Se o Victor liberar a voz DaVinci, só trocar a narração no motor.
