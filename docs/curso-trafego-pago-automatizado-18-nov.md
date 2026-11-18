# Curso "Tráfego Pago Automatizado com Claude Code" (ZX LAB) · estudo completo e o que usamos

Lido em 18/11/2026 pelo Claude, a pedido do Victor. Fonte: as 4 aulas da área de membros (trafego-automatizado.zxlab.com.br) e o repositório público do curso (github.com/zxmarketingdigital/trafego-pago-automatizado), que é o roteiro que o vídeo de 63 min segue passo a passo. Os vídeos em si não foram assistidos (o Claude não processa vídeo); o conteúdo deles está escrito no roteiro.

## 1. O que o curso entrega, em uma frase
Liga a conta de anúncios da Meta ao Claude Code e transforma o trabalho de tráfego em comandos: coletar números 3x por dia, mostrar num painel, dizer qual anúncio escalar, manter ou pausar, propor nova divisão de verba, criar campanha (sempre pausada) e escrever briefing de criativo.

## 2. Estrutura da área de membros
| Módulo | Aula | Conteúdo |
|---|---|---|
| Comece aqui | 1. Instalação completa (63 min) | Clonar o repositório, digitar INICIAR SETUP, 10 etapas guiadas |
| Aprofundamento | 2. Integrando o Meta Ads via MCP (10 min) | Como funciona a conexão oficial da Meta (mcp.facebook.com/ads) |
| Aprofundamento | 3. Dashboards e Tráfego Pago (10 min) | Painel com KPIs vs meta, janelas 4/7/14/30 dias, conta → campanha → conjunto → anúncio, veredito por anúncio |
| Configuração assistida | 4. CAPI e Relatórios (leitura) | Os 3 bônus viraram habilidades instaláveis |
| Bônus (liberam em 23/11) | CAPI ponta a ponta, relatório por e-mail, relatório por WhatsApp | Já estão no repositório |
| Máquina de Tráfego Automatizada | "Desbloqueie o próximo nível" | Venda de outro produto deles |

## 3. As 10 etapas da instalação
0. Diagnóstico: Python, pastas de trabalho no computador.
1. **Conectar a Meta.** Via A: conexão oficial (MCP) por login do Facebook, com permissões ads_management e business_management. Via B (se a A falhar ou a conta ainda não tiver o MCP liberado, que a Meta libera aos poucos): **token de usuário do sistema** gerado no Business (ads_management, ads_read, business_management).
2. **Perfil de decisão:** objetivos (lead, WhatsApp, vendas...), métricas (CPL, CPA, ROAS, custo por mensagem, CPM, CTR, CPC, frequência), **meta numérica de cada uma**, KPI principal e as regras de escalar/pausar.
3. Instala 9 habilidades (6 principais + 3 bônus).
4. Primeira coleta de números (arquivos por janela de 4, 7, 14 e 30 dias).
5. Painel local no navegador (localhost:8888).
6. Criar uma campanha de teste **pausada**.
7. Gerar um briefing de criativo.
8. Rodar a análise e o plano de verba.
9. Agendar a coleta 3x por dia (8h05, 13h05, 19h05) no próprio computador.
10. Auditoria final.

## 4. As 9 habilidades e a lógica de cada uma
| Habilidade | O que faz | Regra importante |
|---|---|---|
| agente-trafego-pago | Menu que chama as outras | Confirma antes de criar ou mudar campanha |
| meta-campaign-launcher | Cria campanha, conjunto e anúncio pelo chat | **Sempre nasce PAUSADA**. Pergunta objetivo (lead, conversa no WhatsApp, venda), verba por dia (mín. R$ 10), público (interesse, semelhante, lista) e criativo |
| meta-creative-brief | Briefing para o designer | 3 ganchos de copy (urgência, prova social, benefício), 3 ideias visuais, CTA e formato por posicionamento (Reels 9:16 com gancho nos 3 primeiros segundos e legenda na tela; Feed 1:1) |
| meta-metrics-fetcher | Puxa os números e calcula o veredito | Roda 3x por dia |
| meta-performance-analyzer | Top 3 escalar, top 3 pausar, lista de manter, padrões | **Nunca recomenda sem mostrar o número.** Anúncio com gasto menor que 1,2x a meta = "amostra insuficiente", sem veredito |
| meta-budget-optimizer | Redistribui a verba pela eficiência | Mínimo R$ 10 por campanha, no máximo +50% de uma vez, **uma mudança por dia**, reavaliar 24 h depois, **se piorar 2 dias seguidos, volta**. Nunca aplica sozinho |
| meta-capi-setup (bônus) | API de Conversões (venda contada pelo servidor) | Para Hotmart e Greenn: **não escrever código**, só ligar a CAPI nativa da plataforma e **validar o token**. Erro mais comum: opção marcada e token nunca validado; aí a Meta perde 30 a 40% das vendas (iPhone, Safari, bloqueador) |
| meta-relatorio-email (bônus) | Resumo diário 8h20 por e-mail | Usa os números já coletados |
| meta-relatorio-whatsapp (bônus) | O mesmo resumo no WhatsApp | Pela API oficial: texto livre só chega dentro de 24 h depois de você mandar mensagem ao número; fora disso precisa de modelo aprovado. Se não chegar, testar o número com e sem o 9 |

## 5. A regra de decisão (o coração do curso)
- Para métrica em que **menor é melhor** (custo por venda): escalar se ficar até 0,8x da meta; pausar se passar de 1,5x da meta; manter no meio.
- Para métrica em que **maior é melhor** (ROAS, CTR): o espelho disso.
- Campanha recebe o pior veredito dos anúncios dela.
- Existe modo "só descritivo" (sem veredito), que é o que usamos até a Black acabar.

## 6. Comparação com o que já temos no Agente WG
| Peça do curso | Nosso equivalente hoje | Situação |
|---|---|---|
| Conexão com a Meta | Windsor (só leitura, conta 4500) | Funciona. Conexão oficial da Meta fica para depois da Black (precisa do seu Facebook com acesso à conta de anúncios) |
| Coleta 3x por dia no computador | Rotina diária na nuvem às 7h35 | **Melhor na nuvem**: não depende do seu PC ligado nem pesa nele |
| Painel local | Planilha "Painel" + debriefing | Dá para virar uma página fixa depois |
| Perfil de decisão | Skill trafego-wg-guardrails | **Atualizada hoje** com a regra do curso adaptada (meta R$ 80 por venda) |
| Criar campanha pausada | Agente de tráfego + fila de aprovação | Mesmo princípio. Só depois da Black |
| Briefing de criativo | Agente social + tráfego | Copiar o formato do briefing do curso |
| CAPI | Pixel recebendo (66 compras de 04 a 17/11) | **Conferir** se a CAPI nativa da Greenn e da Hotmart está ligada e com token validado (só leitura, é área do Diogo) |
| Relatório no WhatsApp | Serviço do agente no Cloudflare | Já é o nosso plano; a regra das 24 h é a mesma que anotamos |

## 7. Decisão: instalar o curso como ele é?
**Não recomendo instalar o pacote deles no seu computador agora.** Motivos: roda no PC (que já está lento) e precisa dele ligado; pede acesso de gestão à conta de anúncios, que até o fim da Black é do Diogo; e duplicaria o que a rotina na nuvem já faz. O valor do curso está no **método**, e esse já foi trazido para dentro dos nossos agentes.

## 8. Plano de uso
**Agora (sem mexer no tráfego):**
1. Regra de veredito e de verba do curso dentro da skill do tráfego, em modo só leitura até a Black acabar (feito).
2. Debriefing passa a mostrar por anúncio: gasto, vendas, custo por venda e "amostra suficiente ou não", sem veredito.
3. Conferir, só leitura, se a CAPI da Greenn e da Hotmart está com token validado. Se não estiver, avisar o Diogo.

**Depois da Black (tráfego do zero, teto R$ 50/dia):**
1. Conexão oficial da Meta pelo seu Facebook (quando o convite de acesso total for aprovado).
2. Campanha de conversa no WhatsApp oficial (o agente atende), criada pausada pela fila.
3. Briefings de criativo no formato do curso (3 ganchos de copy, 3 visuais, formato por posicionamento) para o Canva ou ChatGPT.
4. Análise semanal com escalar, manter ou pausar e uma mudança de verba por dia, sempre com aprovação.
