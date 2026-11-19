# Mapa de fontes · de onde cada agente tira cada número

Decisão do Victor (18/11, 19h55): Instagram pelo **Metricool** (plano grátis, conta do Wesley). Windsor continua no plano grátis, só com a conta de anúncios da Meta. Nenhuma ferramenta paga por enquanto.

| O quê | Fonte | Como acessar | Quem usa |
|---|---|---|---|
| Vendas (Greenn e Hotmart), Painel, Log, Erros, Fila, Atendimento | Planilha WG (conta Luis corinthiano) | `rotinas/ponte.sh` | todos |
| Painel financeiro (meta, custos, ROAS, reembolsos) | Painel Financeiro WG, id `1U9r-qlRlk7Ge1ZhZv131WWLWlfIk-K8r6za8i3K5Z1k` | conector Google Sheets | financeiro (escreve), chefe e analista (leem) |
| Gasto, campanhas e anúncios da Meta | Windsor.ai, conector `facebook`, conta "4500 [USANDO ATUALMENTE - CURSOS]" | `get_data` | tráfego, financeiro, analista |
| Vendas, abandonos (status), produtos e ofertas da Greenn, com histórico (antes de 18/11 também) | **MCP da Greenn** (conector "Greenn" no Claude, autorizado na conta do Luis corinthiano em 18/11) | `list_sales`, `get_sale`, `list_products`, `get_product`, `list_offers` | analista, financeiro, sucesso-aluno, ofertas |
| Entregas da Academia (qual produto libera qual curso) | Cademi admin (perfil Victor Augusto) e `docs/mapa-entregas-cademi.md` | navegador | sucesso-aluno, auditor |
| Métricas do Instagram do Wesley (Reels, posts, stories, seguidores, alcance, retenção, pulo nos 3 s, envios, salvos) | Metricool, marca blogId 8190484 | `getAnalyticsDataByMetrics`, rede `instagram`, conectores `reels`, `posts`, `stories`, `evolution` | social, analista |
| Concorrentes e perfis de referência | Metricool, conector `competitors` / `competitor reels` (limite do plano grátis: conferir) | idem | social |
| Notícias e tendências | WebSearch e WebFetch | busca com data | social |
| Funis e palavras de comentário | ManyChat (pelo navegador do Victor) | skill `wg-manychat-funis` | social, atendimento |
| Páginas e visitas | Atomicat | conector Atomatic | ofertas, analista |

Regras:
- O Windsor grátis só aceita **uma conta**. Não tente ligar outra nele: vai tirar a Meta do financeiro.
- O Metricool grátis é só para **ler métricas**. Publicar e agendar continuam com o Victor (Reels de teste só pelo celular).
- Número sem fonte fica em branco em Pendências.

- MCP da Greenn: só leitura. A autorização também permite criar e mudar produto, oferta e área de membros; isso só com a linha APROVADO na fila. Nome, e-mail e documento do comprador que vêm do MCP nunca vão para memória, relatório ou fila.
