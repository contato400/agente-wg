// Agente WG · atendimento 24h do WhatsApp oficial de suporte (31) 99329-4274 (desde 19/11; antes 97334-6056)
// Cloudflare Worker. Recebe o webhook da Meta, responde com o Claude e envia pela API do WhatsApp.
// Variáveis (Settings > Variables): PHONE_ID, WABA_ID, MODO ("teste" ou "ativo"), TESTE_FONES (lista com vírgula), ADMIN_FONE, MODELO, MODELO_CHEFE
// Segredos (Settings > Variables > Encrypt): WA_TOKEN, APP_SECRET, ANTHROPIC_API_KEY, VERIFY_TOKEN, YC_KEY (ou MC_TOKEN)
// Variável: YC_FROM = número que envia pela YCloud, ex. +553193294274
// Segredo: YC_WEBHOOK_SECRET = segredo do endpoint de webhook criado na YCloud (URL .../yc).
// Com YC_KEY, a leitura vem da YCloud (POST /yc) e eventos da Meta (/webhook) de outro número são ignorados.
// Envio: o número está em coexistência e registrado no app do ManyChat. A Meta só deixa enviar pelo app que registrou
// (erro 10/2593181). Por isso, com MC_TOKEN, a resposta sai pela API do ManyChat; a leitura continua pelo webhook da Meta.
// KV (binding): WG

const GRAPH = 'https://graph.facebook.com/v23.0';
const MC = 'https://api.manychat.com';
const YC = 'https://api.ycloud.com/v2';
const ESPERA_MS = 7000;             // junta mensagens seguidas antes de responder
const HUMANO_TTL = 2 * 3600;        // humano respondeu pelo celular: agente fica quieto 2 h
const HIST_MAX = 24;

const CONHECIMENTO = __CONHECIMENTO__;

const SISTEMA = `Você é o assistente virtual da equipe do Mestre Wesley Gimenez (Krav Magá Caveira) no WhatsApp oficial de suporte, (31) 99329-4274. Este é o número de suporte; nunca indique outro número de WhatsApp para suporte. Responda sempre em português do Brasil. Linguagem simples, para qualquer idade.

JEITO DE FALAR (o mais importante: quem escreve quer falar com alguém da equipe, não com um robô)
- Escreva como se digita no WhatsApp: frases curtas, uma ideia por mensagem, 1 a 3 linhas, no máximo 2 mensagens por vez (separe com uma linha em branco). Nada de lista, tópico numerado, negrito ou título.
- Responda primeiro o que a pessoa perguntou, sem enrolação antes. Depois, se precisar, faça UMA pergunta só.
- Use as palavras dela. Se ela disse "não consigo entrar", fale "entrar", não "acessar a plataforma".
- "Shalom, tudo bem?" só na primeira mensagem da conversa. "Tamo junto, Caveira!" só quando fechar o assunto, nunca em toda mensagem. Varie: não repita a mesma abertura ou o mesmo fechamento.
- Nome da pessoa no máximo de vez em quando, e só se for nome de verdade.
- Emoji raro (no máximo um a cada 3 ou 4 mensagens: 💪 🙏 👊). Nunca em reclamação ou reembolso.
- Soe como gente: "deixa eu ver aqui", "entendi", "poxa, que chato isso", "já te falo". Sem exagero.
- Se não souber, diga que vai confirmar com a equipe e retorna por aqui. Nunca invente.
- NUNCA diga: "Claro!", "Com certeza!", "Ótima pergunta!", "Fico feliz em ajudar", "Estou aqui para ajudar", "Como posso te ajudar hoje?", "Entendo perfeitamente", "Agradeço o contato", "Prezado". Nunca fale de "sistema", "integração", "ferramenta", "base de conhecimento", "plataforma", "login", "credenciais", "checkout" (diga "página de pagamento"). Nunca use travessão (—). Nunca escreva três frases curtas seguidas com a mesma estrutura.
- Pessoa irritada: reconheça antes de resolver ("Poxa, pagou e não conseguiu entrar, né? Vamos resolver agora."). Pessoa mais velha: um passo por mensagem e espere ela responder.
- Se perguntarem se é robô: seja honesto, você é o assistente da equipe do Mestre Wesley e chama uma pessoa se ela preferir.
- Ruim: "Olá! Claro, ficarei feliz em ajudar! Para acessar a plataforma siga os passos: 1. ... 2. ...". Bom: "Shalom, tudo bem? Vamos resolver isso agora." + "Me manda o e-mail que você usou na compra?". Garantia: 7 dias em todos os produtos. Todo link de compra leva utm_source=vc&utm_medium=whatsapp&utm_campaign=atendimento&utm_term=ag-atendimento. Nunca invente preço, link, prazo, bônus ou resultado: use só o que está no conhecimento abaixo. Se não souber, diga que vai confirmar com a equipe e use a ferramenta passar_para_humano.

Para conferir compra, use a ferramenta consultar_compra com o e-mail que a pessoa mandar (não fale de \"sistema\" com o cliente; diga \"deixa eu ver aqui\"). Para problema de acesso: peça o e-mail da compra, confira a compra (consultar_compra) e a Academia (conferir_academia), mande o link de senha nova (enviar_link_senha) quando precisar, oriente olhar spam e promoções, mande o link da Academia https://kravmagacaveira.cademi.com.br/ e o "esqueci minha senha". Se mesmo assim não resolver, use passar_para_humano com o produto e o resumo (sem o e-mail no resumo).

NEGOCIAÇÃO E FECHAMENTO (você negocia e fecha sozinho; NÃO passe para humano por causa de preço. Esta regra vale acima de qualquer outra regra de desconto do conhecimento abaixo)
- Cursos avulsos de R$ 197 (DPC, Vida Segura, Contra Ataque, Feminina, Kids, Lâminas, Jiu Jitsu x Krav Maga, APH, Preparação Física, Prevenção de Confrontos etc.): preço R$ 197 à vista ou 12x de R$ 20,25 no cartão. Mande sempre o link da tabela \"Links de compra do atendimento\" (o mesmo do Catálogo, com os order bumps); produto fora da tabela, a página de venda. Nunca mande checkout sem os bumps.
- Se a pessoa achar caro, desça em degraus, sem pular, e só quando ela travar no preço:
  1º degrau: valor, não desconto. Mostre a parcela (12x de uns R$ 20 no cartão), a garantia de 7 dias (se não gostar, pede o dinheiro de volta) e o que ela ganha com o curso, com as palavras dela. Pergunte o que pesa mais.
  2º degrau: cupom CAVEIRA30 (R$ 30 de desconto, o curso sai por R$ 167). Apresente como uma condição que você conseguiu pra ela agora, sem inventar prazo.
  3º degrau (último): cupom CAVEIRA50 (R$ 50 de desconto, sai por R$ 147). Só se ela continuar dizendo que não dá pelo preço e mostrar que quer comprar. Este é o mínimo: nunca ofereça menos que isso, nem junte os dois cupons.
- Como usar o cupom: ela abre o link, e na página de pagamento coloca o código no campo "cupom de desconto" antes de pagar. Explique isso numa mensagem curta e se ofereça para ajudar se der erro.
- Não ofereça cupom para quem não reclamou de preço. Não ofereça desconto na Black, na mentoria, no VIP ou nos combos: lá valem as regras próprias do conhecimento.
- IA KMC: R$ 197; se a pessoa reclamar do preço, R$ 147 (regra do conhecimento).
- Fechou? Mande o link e, na mesma mensagem: "Assim que finalizar, me manda o comprovante aqui, que eu confiro se o seu acesso foi liberado." Quando ela mandar, confira com consultar_compra e conferir_academia.

CONDUÇÃO DA VENDA (decisão do Victor, 20/11 18h22, substitui a de 19/11): seja direto e objetivo, sem enrolar. Quem pergunta preço, forma de pagamento ou pede link recebe a resposta e o link na hora. Quem ainda está em dúvida recebe UMA pergunta só (para quem é, ou se já treinou) e depois o caminho. Nunca faça 2 ou 3 perguntas seguidas. Na saudação mande UMA mensagem só, por exemplo: "Shalom! Aqui é o suporte do Mestre Wesley. Me conta: você precisa de ajuda com acesso ou quer conhecer os treinamentos?". Nunca repita a mesma pergunta ou a mesma frase duas vezes na conversa.

ESCOPO: este número é só do Krav Magá Caveira, mas de vez em quando chega conversa de outro projeto do Victor (Kairós, SalesMed, mentorias) ou assunto pessoal. Você só atende assuntos do Mestre Wesley Gimenez, Krav Magá Caveira, defesa pessoal, cursos, Academia, compras e acesso. Se a conversa claramente for de outro projeto ou pessoal, NÃO responda: use a ferramenta nao_responder. Na dúvida (ex.: só "oi", "bom dia"), responda normalmente como suporte do Krav Magá Caveira.

Use as ferramentas:
- nao_responder: a mensagem é de outro projeto ou assunto pessoal do Victor. Você fica em silêncio e a equipe vê depois.
- passar_para_humano: reembolso, cancelamento, cobrança em duplicidade, cliente irritado que não se acalma, pedido de preço abaixo do mínimo da negociação (R$ 147) que você não conseguiu contornar, parceria/imprensa, compra não encontrada depois de 2 tentativas, qualquer coisa que você não consiga resolver. Depois de chamar, diga à pessoa que a equipe vai assumir a conversa e responde em horário comercial.
- Em situação de risco real agora (ameaça, violência acontecendo): mande ligar 190 imediatamente e chame passar_para_humano.

CONHECIMENTO DA OPERAÇÃO:
${CONHECIMENTO}`;

const FERRAMENTAS = [{
  name: 'passar_para_humano',
  description: 'Passa a conversa para a equipe humana e avisa o Victor. O agente para de responder nesta conversa.',
  input_schema: { type: 'object', properties: {
    motivo: { type: 'string', enum: ['reembolso', 'cancelamento', 'cobranca', 'irritado', 'abaixo_do_minimo', 'compra_nao_encontrada', 'parceria', 'risco', 'outro'] },
    resumo: { type: 'string', description: 'Uma ou duas frases do que a pessoa precisa. Sem telefone, e-mail ou CPF.' },
    produto: { type: 'string' }
  }, required: ['motivo', 'resumo'] }
}, {
  name: 'consultar_compra',
  description: 'Confere na Greenn e na Hotmart as compras feitas com um e-mail (produto, situação do pagamento, data). Use quando a pessoa disser que comprou e tem problema de acesso ou pagamento, depois que ela mandar o e-mail da compra. Só fale com a pessoa sobre as compras do e-mail que ELA mandou; nunca conte nome, CPF ou telefone que vierem na consulta.',
  input_schema: { type: 'object', properties: { email: { type: 'string', description: 'E-mail que a pessoa disse ter usado na compra.' } }, required: ['email'] }
}, {
  name: 'conferir_academia',
  description: 'Confere na Academia (Cademi) se existe aluno com esse e-mail e quais cursos estão liberados para ele (e até quando). Use quando a pessoa diz que não consegue entrar ou que falta curso.',
  input_schema: { type: 'object', properties: { email: { type: 'string' } }, required: ['email'] }
}, {
  name: 'enviar_link_senha',
  description: 'Manda pela Academia um e-mail com o link para a pessoa criar uma senha nova. Use quando ela tem acesso na Academia mas não lembra a senha ou não recebeu o e-mail de acesso. No máximo uma vez a cada 10 minutos para a mesma pessoa.',
  input_schema: { type: 'object', properties: { email: { type: 'string' } }, required: ['email'] }
}, {
  name: 'nao_responder',
  description: 'A conversa não é do Krav Magá Caveira (outro projeto ou assunto pessoal). Não envia nada.',
  input_schema: { type: 'object', properties: { assunto: { type: 'string', description: 'Ex.: Kairós, SalesMed, pessoal. Sem dados pessoais.' } }, required: ['assunto'] }
}];

// ---- Equipe de agentes (19/11): o Victor fala com cada um pelo "#nome"; todos leem a memória da operação e podem perguntar a outro agente ----
const EQUIPE = __EQUIPE__;   // { regras, fichas: { 'chefe-wg': '...', ... }, memoria: '...' } montado por montar.py
const APELIDOS = {
  chefe: 'chefe-wg', financeiro: 'financeiro-wg', social: 'social-media-wg', midia: 'social-media-wg', socialmedia: 'social-media-wg', instagram: 'social-media-wg',
  trafego: 'trafego-wg', anuncios: 'trafego-wg', juridico: 'juridico-wg', ofertas: 'ofertas-paginas-wg', paginas: 'ofertas-paginas-wg',
  auditor: 'auditor-wg', analista: 'analista-wg', dados: 'analista-wg', sucesso: 'sucesso-aluno-wg', aluno: 'sucesso-aluno-wg', atendimento: 'atendimento-wg',
  editor: 'editor-video-wg', video: 'editor-video-wg', edicao: 'editor-video-wg'
};
const NOME_AGENTE = { 'chefe-wg': 'Chefe', 'financeiro-wg': 'Financeiro', 'social-media-wg': 'Social', 'trafego-wg': 'Tráfego', 'juridico-wg': 'Jurídico',
  'ofertas-paginas-wg': 'Ofertas', 'auditor-wg': 'Auditor', 'analista-wg': 'Analista', 'sucesso-aluno-wg': 'Sucesso do aluno', 'atendimento-wg': 'Atendimento', 'editor-video-wg': 'Editor de vídeo' };
const LISTA_HASH = '#chefe, #financeiro, #social, #trafego, #juridico, #ofertas, #auditor, #analista, #sucesso, #atendimento, #editor e #cliente';
function semAcento(s) { return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z]/g, ''); }

// Data e hora de Brasília, para o agente saber em que momento da campanha está.
const REABERTURA = Date.parse('2026-11-20T19:00:00-03:00');
const FIM_BLACK = Date.parse('2026-11-23T19:00:00-03:00');
function agora() {
  const d = new Date();
  const f = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(d);
  const t = d.getTime();
  const fase = t < REABERTURA ? 'A reabertura oficial da Black é sexta 20/11 às 19h, mas a página JÁ ESTÁ NO AR: quem quer comprar agora recebe o link na hora, como um favor ("vou te dar uma moral e liberar seu acesso antecipado"). Nunca empurre para sexta quem já quer comprar. Só convide para sexta 19h quem ainda está só olhando. Antes das 19h de sexta não prometa os presentes da reabertura.'
    : t < FIM_BLACK ? 'A reabertura da Black ESTÁ ABERTA e vai até segunda 23/11 às 19h (horário de Brasília). Mande o link quando fizer sentido e pode usar esse prazo real para dar urgência.'
    : 'A Black ENCERROU segunda 23/11 às 19h. Não mande o link da Black; ofereça o curso da dor da pessoa (ex.: DPC 2.0).';
  const h = Number(new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', hour12: false }).format(d));
  return `AGORA: ${f} (horário de Brasília). ${fase} Horário comercial da equipe: 8h às 18h (${h >= 8 && h < 18 ? 'estamos dentro' : 'estamos fora'} dele agora).`;
}
async function memoriaEquipe(env) { return (await env.WG.get('equipe:memoria')) || EQUIPE.memoria; }
async function equipeBase(env) { try { const b = JSON.parse((await env.WG.get('equipe:base')) || 'null'); if (b && b.fichas) return b; } catch {} return EQUIPE; }
// ---- Resposta em áudio para o Victor (voz da OpenAI). Sem OPENAI_API_KEY, tudo continua só em texto. ----
const FORMATO_VOZ = `
FORMATO (o Victor recebe em áudio): escreva SEMPRE em duas partes.
FALA: o que você diria num áudio de WhatsApp para um colega, de 15 a 40 segundos, natural, em primeira pessoa, sem link, sem ler números longos, sem lista, sem emoji.
TEXTO: no máximo 3 linhas curtas só com o que ele precisa ler ou copiar (links, IDs da fila, horários, decisões numeradas). Se não houver nada disso, escreva só "TEXTO: -".`;

function separarFala(t) {
  const m = String(t || '').match(/FALA:\s*([\s\S]*?)\s*TEXTO:\s*([\s\S]*)$/i);
  if (!m) return null;
  const texto = m[2].trim();
  return { fala: m[1].trim(), texto: /^-?$/.test(texto) ? '' : texto };
}

async function condensar(texto, env) {
  const { ok, d } = await chamarClaude(env, {
    model: env.MODELO_AGENTES || 'claude-sonnet-5-5', max_tokens: 700,
    system: 'Você transforma mensagens da equipe de agentes para o Victor ouvir. Português do Brasil, sem travessão, sem inventar nada que não esteja na mensagem.' + FORMATO_VOZ,
    messages: [{ role: 'user', content: texto.slice(0, 8000) }]
  });
  if (!ok) return null;
  return separarFala((d.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n'));
}

async function falar(fala, env) {
  const r = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST', headers: { Authorization: 'Bearer ' + env.OPENAI_API_KEY, 'content-type': 'application/json' },
    body: JSON.stringify({ model: env.MODELO_TTS || 'gpt-4o-mini-tts', voice: env.VOZ_TTS || 'ash', input: fala.slice(0, 1800), response_format: 'opus',
      instructions: 'Fale em português do Brasil, sotaque brasileiro natural, como um colega de equipe mandando áudio no WhatsApp: direto, tranquilo, ritmo de conversa.' })
  });
  if (!r.ok) { await passo(env, 'voz erro ' + r.status + ' ' + (await r.text()).slice(0, 120)); return null; }
  return r.arrayBuffer();
}

// Manda ao Victor: áudio com o resumo + texto curto. Se algo falhar, manda o texto completo como antes.
async function mandarVictor(para, texto, env) {
  const limpo = String(texto || '').replace(/^\[[^\]]{1,40}\]\s*/, '');
  if (env.OPENAI_API_KEY) {
    try {
      let partes = separarFala(limpo);
      if (!partes && limpo.length > 300) partes = await condensar(limpo, env);
      if (partes && partes.fala) {
        const audio = await falar(partes.fala, env);
        if (audio) {
          const id = crypto.randomUUID().replace(/-/g, '') + '.ogg';
          await env.WG.put('midia:' + id, audio, { expirationTtl: 3 * 86400, metadata: { tipo: 'audio/ogg' } });
          const base = env.BASE_URL || 'https://agente-wg.luiscorinthianoportoreal.workers.dev';
          if (await enviarMidiaYC(para, { tipo: 'audio', url: base + '/m/' + id }, env)) {
            await passo(env, 'audio enviado ' + partes.fala.length + ' letras');
            if (partes.texto) for (const p of dividirLongo(partes.texto)) await enviar(para, p, env);
            return true;
          }
        }
      }
      // Sem voz (sem crédito ou erro): manda o resumo curto em texto, não o textão.
      if (partes && partes.fala) {
        for (const p of dividirLongo([partes.fala, partes.texto].filter(Boolean).join('\n\n'))) await enviar(para, p, env);
        return true;
      }
    } catch (e) { await passo(env, 'voz falhou ' + String(e).slice(0, 120)); }
  }
  const semMarca = String(texto || '').replace(/^(\[[^\]]{1,40}\]\s*)?FALA:\s*/i, '$1').replace(/^\s*FALA:\s*/i, '').replace(/\n?\s*TEXTO:\s*-?\s*$/i, '').replace(/\n\s*TEXTO:\s*/i, '\n\n');
  let ok = true;
  for (const p of dividirLongo(semMarca)) if ((await enviar(para, p, env)) === false) ok = false;
  return ok;
}

async function sistemaAgente(chave, env) {
  const base = await equipeBase(env);
  return `Você é o agente ${NOME_AGENTE[chave] || chave} da equipe de agentes que opera o negócio do Mestre Wesley Gimenez (Krav Magá Caveira). Quem fala com você agora é o Victor, o responsável, pelo WhatsApp de suporte. Ele escolheu falar com você digitando #${Object.keys(APELIDOS).find(k => APELIDOS[k] === chave)}.
Responda como esse agente: direto, em português, curto, como mensagem de WhatsApp (sem tabelas; listas curtas só se ajudarem). Sem travessão.
Você enxerga a memória da equipe abaixo (estado, decisões, backlog, conversas entre agentes e a última passagem): use para dizer o que você e os outros estão fazendo. Você NÃO mexe no trabalho dos outros. Para saber algo de outro agente, use a ferramenta perguntar_agente. Nenhuma ação externa (publicar, gastar, mandar mensagem para cliente, mexer em página, oferta ou campanha) sem aprovação do Victor ou do Wesley; se ele aprovar aqui (por texto ou áudio), registre CADA aprovação com registrar_recado (uma por item, com o ID da fila quando houver) e responda na hora com a lista do que ficou aprovado e quando roda: o executor da equipe é acionado na hora (ou na rodada de hora em hora, das 9h às 18h) e te avisa aqui o que fez. Diga exatamente o que a ferramenta registrar_recado devolver sobre quando ele roda; não invente horário. Se o áudio vier confuso, repita o que entendeu em lista numerada e peça só a confirmação. Nunca invente número: o que não estiver na memória ou nas consultas, diga que não tem.
${env.OPENAI_API_KEY ? FORMATO_VOZ : ''}

REGRAS DE TODOS OS AGENTES:
${base.regras}

SUA FICHA:
${base.fichas[chave] || EQUIPE.fichas[chave] || '(sem ficha)'}

MEMÓRIA DA EQUIPE (atualizada pela rotina diária):
${await memoriaEquipe(env)}`;
}

export default {
  async scheduled(ev, env, ctx) { ctx.waitUntil(monitorQueda(env)); ctx.waitUntil(resumoAtendimento(env)); },
  async fetch(req, env, ctx) {
    env = kvSeguro(env);
    const url = new URL(req.url);
    if (req.method === 'GET' && url.pathname === '/webhook') {
      const ok = url.searchParams.get('hub.mode') === 'subscribe' && url.searchParams.get('hub.verify_token') === env.VERIFY_TOKEN;
      return ok ? new Response(url.searchParams.get('hub.challenge')) : new Response('negado', { status: 403 });
    }
    if (req.method === 'GET' && url.pathname === '/setup') {
      // Inscreve o app na conta do WhatsApp (uma vez). Protegido pelo VERIFY_TOKEN.
      if (url.searchParams.get('k') !== env.VERIFY_TOKEN) return new Response('negado', { status: 403 });
      const r = await fetch(`${GRAPH}/${env.WABA_ID}/subscribed_apps`, { method: 'POST', headers: { Authorization: `Bearer ${env.WA_TOKEN}` } });
      const l = await fetch(`${GRAPH}/${env.WABA_ID}/subscribed_apps`, { headers: { Authorization: `Bearer ${env.WA_TOKEN}` } });
      return new Response(JSON.stringify({ inscrever: await r.json(), apps: await l.json() }, null, 1), { headers: { 'content-type': 'application/json' } });
    }
    if (req.method === 'GET' && url.pathname === '/diag') {
      // Diagnóstico do envio: pergunta à Meta o que o token enxerga. Nunca devolve o token.
      if (url.searchParams.get('k') !== env.VERIFY_TOKEN) return new Response('negado', { status: 403 });
      const H = { Authorization: `Bearer ${env.WA_TOKEN}` };
      const g = async p => { try { const r = await fetch(`${GRAPH}/${p}`, { headers: H }); return { status: r.status, body: await r.json() }; } catch (e) { return { erro: String(e) }; } };
      const out = {
        vars: { PHONE_ID: env.PHONE_ID, WABA_ID: env.WABA_ID, MODO: env.MODO, token_presente: !!env.WA_TOKEN, token_tam: (env.WA_TOKEN || '').length },
        ultimo_webhook: JSON.parse((await env.WG.get('diag:meta')) || 'null'),
        token: await g(`debug_token?input_token=${encodeURIComponent(env.WA_TOKEN || '')}`),
        eu: await g('me?fields=id,name'),
        numero: await g(`${env.PHONE_ID}?fields=id,display_phone_number,verified_name,status,platform_type,code_verification_status,quality_rating,name_status,account_mode,is_on_biz_app,throughput`),
        waba: await g(`${env.WABA_ID}?fields=id,name,owner_business_info,on_behalf_of_business_info,account_review_status,business_verification_status,ownership_type`),
        waba_numeros: await g(`${env.WABA_ID}/phone_numbers?fields=id,display_phone_number,verified_name,status,platform_type,is_on_biz_app`),
        waba_apps: await g(`${env.WABA_ID}/subscribed_apps`),
        ycloud: env.YC_KEY ? await (async () => { try { const r = await fetch(`${YC}/whatsapp/phoneNumbers?limit=10`, { headers: { 'X-API-Key': env.YC_KEY } }); const j = await r.json(); return { status: r.status, numeros: (j.items || []).map(n => ({ numero: n.phoneNumber, waba: n.wabaId, status: n.status, nome: n.verifiedName })) }; } catch (e) { return { erro: String(e) }; } })() : 'sem YC_KEY',
        manychat: env.MC_TOKEN ? await (async () => { try { const r = await fetch(`${MC}/fb/page/getInfo`, { headers: H_MC(env) }); const j = await r.json(); return { status: r.status, conta: j.data && j.data.name, ok: j.status }; } catch (e) { return { erro: String(e) }; } })() : 'sem MC_TOKEN',
        manychat_admin: env.MC_TOKEN && env.ADMIN_FONE ? await idManychat(env.ADMIN_FONE, env) : null
      };
      const txt = JSON.stringify(out, null, 1).split(env.WA_TOKEN || '@@nada@@').join('[token]');
      return new Response(txt, { headers: { 'content-type': 'application/json' } });
    }
    // ---- Porta dos agentes (rotina agendada): só com o segredo AVISO_TOKEN no cabeçalho Authorization: Bearer ----
    // Arquivos das peças (vídeo, capa) para mandar ao Victor pelo WhatsApp: os agentes sobem aqui e recebem um link público por 3 dias.
    // Aviso de venda aprovada (19/11): a ponte do Apps Script repassa cada venda paga da Greenn. Sem segredo: o serviço confere a venda direto na Greenn.
    if (url.pathname === '/venda' && req.method === 'POST') {
      let b = {}; try { b = await req.json(); } catch {}
      if (!/^[A-Za-z0-9]{5,24}$/.test(String(b.id || '')) || !b.email) return new Response('faltou', { status: 400 });
      if (env.FILA) await env.FILA.send({ tipo: 'venda', v: b }, { delaySeconds: 45 });
      else ctx.waitUntil(avisarVenda(b, env));
      return new Response('ok');
    }
    if (url.pathname === '/midia' && req.method === 'POST') {
      const tk = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
      if (!env.AVISO_TOKEN || tk !== env.AVISO_TOKEN) return new Response('negado', { status: 403 });
      const buf = await req.arrayBuffer();
      if (buf.byteLength < 100 || buf.byteLength > 24_000_000) return new Response('tamanho', { status: 400 });
      const id = crypto.randomUUID().replace(/-/g, '') + '.' + (url.searchParams.get('ext') || 'bin').replace(/[^a-z0-9]/g, '').slice(0, 5);
      await env.WG.put('midia:' + id, buf, { expirationTtl: 3 * 86400, metadata: { tipo: req.headers.get('content-type') || 'application/octet-stream' } });
      return Response.json({ url: url.origin + '/m/' + id });
    }
    if (req.method === 'GET' && url.pathname.startsWith('/m/')) {
      const { value, metadata } = await env.WG.getWithMetadata('midia:' + url.pathname.slice(3), { type: 'arrayBuffer' });
      if (!value) return new Response('expirou', { status: 404 });
      return new Response(value, { headers: { 'content-type': (metadata && metadata.tipo) || 'application/octet-stream', 'cache-control': 'public, max-age=86400' } });
    }
    if (url.pathname === '/avisar' || url.pathname === '/equipe' || url.pathname === '/recados' || url.pathname === '/perguntar' || url.pathname === '/transcrever') {
      const tk = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
      if (!env.AVISO_TOKEN || tk !== env.AVISO_TOKEN) return new Response('negado', { status: 403 });
      let b = {}; if (req.method === 'POST') { try { b = await req.json(); } catch {} }
      if (url.pathname === '/avisar' && req.method === 'POST') {
        // Um agente manda mensagem ao Victor: {de: "financeiro", texto: "..."}. Fica no histórico daquele agente, então o Victor responde com #financeiro.
        const chave = APELIDOS[semAcento(b.de || 'chefe')] || 'chefe-wg';
        const texto = `[${NOME_AGENTE[chave]}] ` + String(b.texto || '').trim();
        if (!env.ADMIN_FONE || texto.length < 5) return new Response('faltou texto', { status: 400 });
        const partes = [texto]; let enviados = (await mandarVictor(env.ADMIN_FONE, texto, env)) ? 1 : 0;
        // Peças prontas para o Victor postar: {midia: [{tipo: 'video'|'image'|'document', url, legenda}]} (link público, até 16 MB para vídeo).
        let midias = 0;
        for (const m of (Array.isArray(b.midia) ? b.midia.slice(0, 10) : [])) { if (m && m.url && (await enviarMidiaYC(env.ADMIN_FONE, m, env))) midias++; }
        const adm = String(env.ADMIN_FONE).replace(/\D/g, '');
        await addHist(env, chave === 'chefe-wg' ? adm : 'ag:' + chave + ':' + adm, { role: 'assistant', content: texto });
        return Response.json({ ok: enviados === partes.length, partes: partes.length, enviados, midias });
      }
      if (url.pathname === '/perguntar' && req.method === 'POST') {
        // O Jarvis (assistente de voz no computador do Victor) fala com um agente: {agente: "financeiro", pergunta: "..."}.
        // Usa o mesmo histórico do #nome no WhatsApp, então a conversa continua de um lado para o outro.
        const chave = APELIDOS[semAcento(b.agente || 'chefe')] || 'chefe-wg';
        const pergunta = String(b.pergunta || '').trim().slice(0, 4000);
        if (!env.ADMIN_FONE || pergunta.length < 2) return new Response('faltou pergunta', { status: 400 });
        const adm = String(env.ADMIN_FONE).replace(/\D/g, '');
        const hk = chave === 'chefe-wg' ? adm : 'ag:' + chave + ':' + adm;
        await addHist(env, hk, { role: 'user', content: '[Victor pelo Jarvis, no computador; a resposta vai ser lida em voz alta, então responda curto e sem tabela] ' + pergunta });
        const partes = await pensar((await getHist(env, hk)).slice(-12), 'Victor', env.ADMIN_FONE, chave, env, true);
        for (const t of partes) await addHist(env, hk, { role: 'assistant', content: t });
        const tudo = partes.join('\n\n'); const sf = separarFala(tudo);
        return Response.json({ agente: NOME_AGENTE[chave], resposta: sf ? [sf.fala, sf.texto].filter(Boolean).join('\n\n') : tudo });
      }
      if (url.pathname === '/equipe' && req.method === 'POST') {
        // A rotina atualiza a memória que os agentes do WhatsApp enxergam (estado, decisões, backlog, conversas, passagem).
        if (!b.memoria || String(b.memoria).length < 50) return new Response('faltou memoria', { status: 400 });
        await env.WG.put('equipe:memoria', String(b.memoria).slice(0, 120000));
        if (b.fichas && typeof b.fichas === 'object') await env.WG.put('equipe:base', JSON.stringify({ regras: String(b.regras || EQUIPE.regras).slice(0, 20000), fichas: b.fichas }));
        return Response.json({ ok: true, tamanho: String(b.memoria).length });
      }
      if (url.pathname === '/transcrever' && req.method === 'POST') {
        // Teste da transcrição: baixa um áudio público (b.url) e devolve o texto, sem guardar nada.
        const r = await fetch(String(b.url || '')); if (!r.ok) return new Response('sem audio', { status: 400 });
        const u8 = new Uint8Array(await r.arrayBuffer()); const ped = partesOgg(u8, 25); const tx = [];
        for (const p of ped) { const o = await env.AI.run('@cf/openai/whisper-large-v3-turbo', { audio: u8paraB64(p), language: 'pt' }); tx.push(semRepeticao(String((o && o.text) || '').trim())); }
        return Response.json({ pedacos: ped.length, texto: tx.join(' ') });
      }
      if (url.pathname === '/recados' && req.method === 'GET') {
        // A rotina busca recados e conversas entre agentes feitas pelo WhatsApp (e apaga com ?limpar=1 depois de registrar).
        const out = [];
        for (const pre of ['recado:', 'conversa:']) {
          const l = await env.WG.list({ prefix: pre });
          for (const k of l.keys) { out.push({ chave: k.name, ...JSON.parse((await env.WG.get(k.name)) || '{}') }); if (url.searchParams.get('limpar') === '1') await env.WG.delete(k.name); }
        }
        return Response.json(out);
      }
      return new Response('rota', { status: 404 });
    }
    if (req.method === 'POST' && url.pathname === '/mc') {
      // Chamado pela resposta padrão do WhatsApp no ManyChat (só dispara quando nenhum fluxo pegou a mensagem).
      // Guarda o ID do contato no ManyChat e libera o agente a responder esta mensagem.
      if (url.searchParams.get('k') !== env.VERIFY_TOKEN) return new Response('negado', { status: 403 });
      let b = {}; try { b = await req.json(); } catch {}
      const id = String(b.id || b.user_id || b.subscriber_id || '').replace(/\D/g, '');
      const tel = String(b.fone || b.whatsapp_phone || b.phone || '').replace(/\D/g, '');
      if (id && tel) {
        await env.WG.put('mc:' + fone(tel), id, { expirationTtl: 60 * 86400 });
        await env.WG.put('mcok:' + fone(tel), '1', { expirationTtl: 120 });
      } else console.log('mc sem id/fone', JSON.stringify(Object.keys(b)));
      return new Response(JSON.stringify({ ok: !!(id && tel) }), { headers: { 'content-type': 'application/json' } });
    }
    if (req.method === 'GET' && url.pathname === '/') return new Response('Agente WG no ar. Modo: ' + (env.MODO || 'teste'));
    if (url.pathname === '/gasto' && req.method === 'GET') {
      if (!env.AVISO_TOKEN || req.headers.get('authorization') !== 'Bearer ' + env.AVISO_TOKEN) return new Response('negado', { status: 403 });
      const dias = Math.min(40, Number(url.searchParams.get('dias') || 7)), out = [];
      for (let i = 0; i < dias; i++) { const dia = new Date(Date.now() - 3 * 3600000 - i * 86400000).toISOString().slice(0, 10); const v = await env.WG.get('gasto:' + dia); if (v) out.push(Object.assign({ dia }, JSON.parse(v))); }
      return new Response(JSON.stringify(out), { headers: { 'content-type': 'application/json' } });
    }
    if (url.pathname === '/voz' && req.method === 'POST') {
      if (!env.AVISO_TOKEN || req.headers.get('authorization') !== 'Bearer ' + env.AVISO_TOKEN) return new Response('negado', { status: 403 });
      const b = await req.json().catch(() => ({}));
      if (!b.texto) return new Response('faltou texto', { status: 400 });
      const v = await vozGemini(env, String(b.texto).slice(0, 4000), b.voz, b.estilo);
      return v.ok ? new Response(v.wav, { headers: { 'content-type': 'audio/wav' } }) : new Response(JSON.stringify(v), { status: 502, headers: { 'content-type': 'application/json' } });
    }
    // Teste da Hotmart (20/11): confere se as credenciais funcionam e conta as vendas de 7 dias. Não devolve chave nem dado de cliente.
    if (url.pathname === '/hotmart-teste' && req.method === 'GET') {
      if (await env.WG.get('hm:teste')) return new Response('aguarde 60 s', { status: 429 });
      await env.WG.put('hm:teste', '1', { expirationTtl: 60 });
      await env.WG.delete('hotmart:token');
      const tk = await tokenHotmart(env);
      if (!tk) return new Response(JSON.stringify({ token_ok: false }), { headers: { 'content-type': 'application/json' } });
      const r = await fetch('https://developers.hotmart.com/payments/api/v1/sales/history?max_results=5&start_date=' + (Date.now() - 7 * 86400000) + '&end_date=' + Date.now(), { headers: { Authorization: 'Bearer ' + tk } });
      const j = await r.json().catch(() => ({}));
      return new Response(JSON.stringify({ token_ok: true, vendas_status: r.status, vendas_7d: (j.page_info || {}).total_results != null ? j.page_info.total_results : (j.items || []).length }), { headers: { 'content-type': 'application/json' } });
    }
    if (url.pathname === '/voz-teste' && req.method === 'GET') {
      if (await env.WG.get('voz:teste')) return new Response('aguarde 30 s', { status: 429 });
      await env.WG.put('voz:teste', '1', { expirationTtl: 60 });
      const v = await vozGemini(env, 'Se alguém te abordasse hoje na rua, você saberia o que fazer? Com o Método Caveira do Mestre Wesley Gimenez, você aprende a evitar o perigo, se proteger e sair da situação.', url.searchParams.get('voz') || undefined);
      if (v.ok && url.searchParams.get('ouvir')) return new Response(v.wav, { headers: { 'content-type': 'audio/wav' } });
      return new Response(JSON.stringify(v.ok ? { ok: true, bytes: v.wav.length, taxa: v.taxa } : v), { headers: { 'content-type': 'application/json' } });
    }
    if (req.method === 'POST' && url.pathname === '/yc') {
      const corpoYC = await req.text();
      if (!(await assinaturaYC(corpoYC, req.headers.get('ycloud-signature'), env.YC_WEBHOOK_SECRET))) {
        await env.WG.put('diag:yc_negado', new Date().toISOString(), { expirationTtl: 7 * 86400 });
        return new Response('assinatura', { status: 401 });
      }
      let ev; try { ev = JSON.parse(corpoYC); } catch { return new Response('ok'); }
      // Com a fila (FILA), cada mensagem é processada no consumidor, que tem até 15 minutos (o waitUntil corta em 30 s e o áudio não cabia).
      if (env.FILA) { try { await env.FILA.send({ tipo: 'yc', ev }); return new Response('ok'); } catch (e) { await passo(env, 'fila falhou ' + String(e).slice(0, 80)); } }
      ctx.waitUntil(processarYC(ev, env).catch(e => console.log('erro yc', e && e.stack || e)));
      return new Response('ok');
    }
    if (req.method !== 'POST' || url.pathname !== '/webhook') return new Response('ok');

    const corpo = await req.text();
    if (!(await assinaturaOk(corpo, req.headers.get('x-hub-signature-256'), env.APP_SECRET))) return new Response('assinatura', { status: 401 });
    let dados; try { dados = JSON.parse(corpo); } catch { return new Response('ok'); }
    if (env.FILA) { try { await env.FILA.send({ tipo: 'meta', dados }); return new Response('ok'); } catch (e) { await passo(env, 'fila falhou ' + String(e).slice(0, 80)); } }
    ctx.waitUntil(processar(dados, env).catch(e => console.log('erro', e && e.stack || e)));
    return new Response('ok');
  },
  // Consumidor da fila: uma mensagem por vez, sem o limite de 30 s do waitUntil.
  async queue(batch, env) {
    env = kvSeguro(env);
    for (const m of batch.messages) {
      try { if (m.body.tipo === 'yc') await processarYC(m.body.ev, env); else if (m.body.tipo === 'meta') await processar(m.body.dados, env); else if (m.body.tipo === 'venda') await avisarVenda(m.body.v, env); }
      catch (e) { await passo(env, 'erro na fila: ' + String(e).slice(0, 150)); }
      m.ack();
    }
  }
};

async function assinaturaOk(corpo, cab, segredo) {
  if (!segredo || !cab) return false;
  const chave = await crypto.subtle.importKey('raw', new TextEncoder().encode(segredo), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', chave, new TextEncoder().encode(corpo));
  const hex = [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
  return cab === 'sha256=' + hex;
}

async function processar(dados, env) {
  for (const e of dados.entry || []) for (const ch of e.changes || []) {
    const v = ch.value || {};
    // Com a YCloud ligada, a leitura vem por /yc. Evento da Meta de outro número (ex.: o antigo 97334-6056) é ignorado.
    if (env.YC_KEY && !(v.metadata && mesmoFone(v.metadata.display_phone_number, env.YC_FROM))) continue;
    if (v.metadata) await env.WG.put('diag:meta', JSON.stringify({ quando: new Date().toISOString(), waba_do_evento: e.id, phone_number_id: v.metadata.phone_number_id, numero: v.metadata.display_phone_number, campo: ch.field }), { expirationTtl: 7 * 86400 });
    // Mensagem que um humano mandou pelo app do celular (coexistência)
    if (ch.field === 'smb_message_echoes') {
      for (const m of v.message_echoes || []) await ecoHumano(m, env);
      continue;
    }
    if (ch.field !== 'messages') continue;
    const nomes = {}; for (const c of v.contacts || []) nomes[c.wa_id] = (c.profile && c.profile.name || '').split(' ')[0];
    for (const m of v.messages || []) await receber(m, nomes[m.from] || '', env);
  }
}

async function ecoHumano(m, env) {
  const cliente = m.to; if (!cliente) return;
  const txt = (m.text && m.text.body || '').trim().toLowerCase();
  if (txt === '#humano') { await env.WG.put('pausa:' + cliente, '1'); return; }
  if (txt === '#agente') { await env.WG.delete('pausa:' + cliente); await env.WG.delete('humano:' + cliente); return; }
  await env.WG.put('humano:' + cliente, '1', { expirationTtl: HUMANO_TTL });
  await addHist(env, cliente, { role: 'assistant', content: '[equipe pelo celular] ' + (m.text && m.text.body || '[mídia]') });
}

// Celular BR pode chegar com ou sem o 9 (55 31 9xxxx-xxxx vs 55 31 xxxx-xxxx). Compara sem o 9.
const fone = s => { const d = String(s || '').replace(/\D/g, ''); return (d.length === 13 && d.startsWith('55') && d[4] === '9') ? d.slice(0, 4) + d.slice(5) : d; };
const mesmoFone = (a, b) => !!a && !!b && fone(a) === fone(b);

async function receber(m, nome, env) {
  const de = m.from;
  const fim = String(de).slice(-4);
  if (await env.WG.get('visto:' + m.id)) { await passo(env, 'repetida ' + fim); return; }            // a Meta pode reenviar o mesmo evento
  await env.WG.put('visto:' + m.id, '1', { expirationTtl: 86400 });

  const admin = mesmoFone(de, env.ADMIN_FONE);
  await passo(env, 'recebida ' + fim + ' tipo ' + m.type + (admin ? ' (admin)' : ''));
  if ((env.MODO || 'teste') !== 'ativo' && !admin && !(env.TESTE_FONES || '').split(',').some(t => mesmoFone(t, de))) { await passo(env, 'ignorada: modo teste ' + fim); return; }
  if (!admin && (await env.WG.get('pausa:' + de) || await env.WG.get('humano:' + de))) { await passo(env, 'ignorada: pausa/humano ' + fim); return; }

  // Modo simulação do Victor: "#cliente" faz o agente responder a ele como se fosse um cliente (para testar a voz e o fluxo);
  // "#chefe" volta ao normal. A conversa simulada fica num histórico separado.
  // "#cliente": simula um cliente. "#chefe", "#financeiro", "#social"...: fala com aquele agente. "#equipe": lista.
  const cmd = m.type === 'text' ? String(m.text.body || '').trim() : '';
  const hash = /^#\S+$/.test(cmd) ? semAcento(cmd.slice(1)) : '';
  if (admin && hash && (hash === 'cliente' || hash === 'equipe' || APELIDOS[hash])) {
    if (hash === 'cliente') { await env.WG.put('sim:' + de, '1', { expirationTtl: 86400 }); await env.WG.delete('hist:sim' + de); await enviar(de, 'Modo cliente ligado. Escreva como se fosse um aluno ou lead. Para sair: #chefe (ou outro agente).', env); }
    else if (hash === 'equipe') await enviar(de, 'Agentes: ' + LISTA_HASH + '. Digite o # do agente e fale só com ele até trocar.', env);
    else { await env.WG.delete('sim:' + de); await env.WG.put('modo:' + de, APELIDOS[hash]); await enviar(de, `Falando com ${NOME_AGENTE[APELIDOS[hash]]}. Para trocar: ${LISTA_HASH}.`, env); }
    return;
  }
  const simula = admin && !!(await env.WG.get('sim:' + de));
  const agente = admin && !simula ? ((await env.WG.get('modo:' + de)) || 'chefe-wg') : null;
  const base = admin && env.ADMIN_FONE ? String(env.ADMIN_FONE).replace(/\D/g, '') : de;   // mesmo histórico que a porta /avisar usa
  const hk = simula ? 'sim' + de : (agente ? (agente === 'chefe-wg' ? base : 'ag:' + agente + ':' + base) : de);
  const chefe = agente;

  const marcou = await env.WG.put('ultima:' + de, m.id, { expirationTtl: 600 });   // 20/11 18h40: marca antes de transcrever áudio, para juntar áudios seguidos
  const conteudo = await paraConteudo(m, env);
  if (!conteudo) return;
  await addHist(env, hk, { role: 'user', content: conteudo });
  await marcarLido(m.id, env);

  await new Promise(r => setTimeout(r, ESPERA_MS));
  if (marcou !== false && (await env.WG.get('ultima:' + de)) !== m.id) { await passo(env, 'juntou com mensagem mais nova ' + fim); return; }  // chegou mensagem mais nova: ela responde por todas
  if (env.MC_TOKEN && !env.YC_KEY && !(await env.WG.get('mcok:' + fone(de)))) {
    // Nenhum aviso da resposta padrão do ManyChat: um fluxo dele (palavra-chave, carrinho) está cuidando. Agente fica quieto.
    console.log('sem sinal do manychat, final', String(de).slice(-4)); return;
  }
  if (env.MC_TOKEN && !env.YC_KEY) await env.WG.delete('mcok:' + fone(de));

  const hist = await getHist(env, hk);
  // Se o KV não gravou (limite diário), a mensagem atual não está no histórico: entra aqui para o agente responder a ela.
  const ult = hist[hist.length - 1];
  if (!ult || ult.role !== 'user' || (typeof conteudo === 'string' && ult.content !== conteudo)) hist.push({ role: 'user', content: conteudo });
  await passo(env, 'pensando ' + fim + (simula ? ' (simulação)' : ''));
  let resposta;
  try { resposta = await pensar(hist, nome, de, chefe, env); } catch (e) { await passo(env, 'erro ao pensar: ' + String(e).slice(0, 150)); throw e; }
  await passo(env, 'resposta com ' + resposta.length + ' parte(s)');
  if (!agente && !simula && (await env.WG.get('ultima:' + de)) !== m.id) { await passo(env, 'descartou resposta: chegou mensagem nova ' + fim); return; }  // 20/11: evita resposta repetida quando a pessoa manda outra mensagem enquanto o agente pensa
  if (agente && resposta.length) {
    const tudo = resposta.join('\n\n');
    const ok = await mandarVictor(de, tudo, env);
    await passo(env, 'envio ' + (ok ? 'ok' : 'FALHOU') + ' ' + fim);
    await addHist(env, hk, { role: 'assistant', content: tudo });
    return;
  }
  for (const t of resposta) {
    let ok; try { ok = await enviar(de, t, env); } catch (e) { await passo(env, 'erro ao enviar: ' + String(e).slice(0, 150)); throw e; }
    await passo(env, 'envio ' + (ok === false ? 'FALHOU' : 'ok') + ' ' + fim);
    await addHist(env, hk, { role: 'assistant', content: t });
  }
  if (!admin && !simula) await anotarResumo(env, de, nome, conteudo, resposta.join(' '));
}

// A7 (20/11, pedido do Victor): em vez de um aviso por conversa, um resumo a cada 2 h (8h às 22h) com todas as conversas do período.
// "Passar para humano" continua avisando na hora. Cada resumo também fica 7 dias em KV resumo-hist:<data hora> (A6: a rotina copia para a aba Atendimento).
async function anotarResumo(env, de, nome, conteudo, resposta) {
  try {
    const k = 'resumo:' + de;
    const a = JSON.parse((await env.WG.get(k)) || 'null') || { nome: nome || 'sem nome', final: String(de).slice(-4), n: 0, desde: agora() };
    const txt = typeof conteudo === 'string' ? conteudo : JSON.stringify(conteudo);
    a.n++; a.quando = agora(); a.pergunta = txt.replace(/\s+/g, ' ').slice(0, 120); a.resposta = String(resposta || '').replace(/\s+/g, ' ').slice(0, 120);
    a.link = a.link || /wesleygimenez\.com\.br|greenn|hotmart/i.test(resposta || '');
    await env.WG.put(k, JSON.stringify(a), { expirationTtl: 6 * 3600 });
  } catch {}
}

async function resumoAtendimento(env) {
  try {
    const h = new Date(Date.now() - 3 * 3600000); const hora = h.getUTCHours();
    if (hora % 2 !== 0 || hora < 8 || hora > 22 || h.getUTCMinutes() > 20 || !env.ADMIN_FONE) return;
    const marca = 'resumofeito:' + h.toISOString().slice(0, 13);
    if (await env.WG.get(marca)) return;
    await env.WG.put(marca, '1', { expirationTtl: 3 * 3600 });
    const l = await env.WG.list({ prefix: 'resumo:' });
    if (!l.keys.length) return;
    const itens = [];
    for (const k of l.keys.slice(0, 30)) { try { itens.push(JSON.parse(await env.WG.get(k.name))); } catch {} await env.WG.delete(k.name); }
    const humanos = (await env.WG.list({ prefix: 'pausa:' })).keys.length;
    let texto = `📋 Atendimento das últimas 2 h: ${l.keys.length} conversa(s)` + (humanos ? `, ${humanos} com a equipe (humano)` : '') + '.\n';
    texto += itens.map((a, i) => `${i + 1}. ${a.nome} (final ${a.final}) · ${a.n} msg · ${a.quando}${a.link ? ' · recebeu link' : ''}\n   Pediu: "${a.pergunta}"\n   Agente: "${a.resposta}"`).join('\n');
    texto += '\n\nQuem precisa de gente já chegou na hora como "passar para humano".';
    try { const gg = JSON.parse((await env.WG.get('gasto:' + new Date(Date.now() - 3 * 3600000).toISOString().slice(0, 10))) || 'null'); if (gg) texto += '\n\n💰 Anthropic hoje (estimativa): US$ ' + gg.usd.toFixed(2) + ' em ' + gg.chamadas + ' chamadas.'; } catch {}
    await env.WG.put('resumo-hist:' + h.toISOString().slice(0, 13), JSON.stringify(itens), { expirationTtl: 7 * 86400 });
    await mandarVictor(env.ADMIN_FONE, texto, env);
  } catch (e) { await passo(env, 'resumo erro ' + String(e).slice(0, 100)); }
}

async function paraConteudo(m, env) {
  if (m.type === 'text') return m.text.body;
  if (m.type === 'button') return m.button.text;
  if (m.type === 'interactive') return (m.interactive.button_reply || m.interactive.list_reply || {}).title || '';
  if (m.type === 'image') {
    const img = m.image.link ? await baixarYC(m.image, env) : await baixarMidia(m.image.id, env);
    const partes = [];
    if (img) partes.push({ type: 'image', source: { type: 'base64', media_type: img.tipo, data: img.b64 } });
    partes.push({ type: 'text', text: m.image.caption || '[a pessoa mandou esta imagem]' });
    return partes;
  }
  if (m.type === 'audio') {
    // Áudio vira texto pelo Whisper da Cloudflare (Workers AI, associação AI). Sem a associação ou se falhar, pede texto.
    const txt = await transcrever(m.audio, env);
    return txt ? '[áudio transcrito] ' + txt : '[a pessoa mandou um áudio que você não consegue ouvir; peça com carinho para escrever em texto]';
  }
  if (m.type === 'order') return '[a pessoa enviou um pedido pelo catálogo do WhatsApp: ' + JSON.stringify(m.order.product_items || []) + ']';
  if (m.type === 'document') return '[a pessoa mandou um documento: ' + (m.document.filename || '') + ']';
  return null;
}

async function transcrever(audio, env) {
  if (!env.AI || !audio) return null;
  try {
    const a = audio.link ? await baixarYC(audio, env) : await baixarMidia(audio.id, env);
    if (!a) return null;
    // Áudio longo (ex.: 1min30 do Victor) era cortado e embolado: o Whisper vai em pedaços de ~25 s (páginas do Ogg/Opus).
    const pedacos = partesOgg(b64paraU8(a.b64), 25);
    const textos = [];
    for (const p of pedacos) {
      const r = await env.AI.run('@cf/openai/whisper-large-v3-turbo', { audio: u8paraB64(p), language: 'pt' });
      textos.push(semRepeticao(String((r && r.text) || '').trim()));
    }
    const t = textos.filter(Boolean).join(' ').trim();
    await passo(env, 'audio transcrito ' + t.length + ' letras em ' + pedacos.length + ' pedaço(s)');
    return t || null;
  } catch (e) { await passo(env, 'audio falhou ' + String(e).slice(0, 120)); return null; }
}

// Se o KV recusar gravação (limite diário do plano grátis), o atendimento continua: a gravação falha em silêncio.
function kvSeguro(env) {
  if (!env.WG || env.WG.__seguro) return env;
  const k = env.WG;
  const WG = { __seguro: true,
    get: (...a) => k.get(...a), getWithMetadata: (...a) => k.getWithMetadata(...a), list: (...a) => k.list(...a),
    put: async (...a) => { try { await k.put(...a); return true; } catch (e) { console.log('kv put falhou', String(e).slice(0, 80)); return false; } },
    delete: async (...a) => { try { return await k.delete(...a); } catch (e) { console.log('kv delete falhou', String(e).slice(0, 80)); } } };
  return Object.assign(Object.create(Object.getPrototypeOf(env) || null), env, { WG });
}
// Aciona a tarefa agendada do executor na hora (acionador de API). Segredo EXECUTOR_TOKEN no Cloudflare; sem ele, fica o horário.
// Trava de 3 minutos para não abrir uma execução por recado quando o Victor manda vários seguidos.
async function dispararExecutor(env) {
  if (!env.EXECUTOR_TOKEN) return false;
  if (await env.WG.get('exec:disparo')) return true;
  await env.WG.put('exec:disparo', '1', { expirationTtl: 180 });
  try {
    const r = await fetch(env.EXECUTOR_URL || 'https://api.anthropic.com/v1/claude_code/routines/trig_01NFRU3YjRf6TciDYo9L8b2H/fire', { method: 'POST',
      headers: { Authorization: 'Bearer ' + env.EXECUTOR_TOKEN, 'anthropic-beta': 'experimental-cc-routine-2026-04-01', 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ text: 'Acionado pelo WhatsApp: há recado novo do Victor.' }) });
    await passo(env, 'executor acionado ' + r.status);
    return r.ok;
  } catch (e) { await passo(env, 'executor falhou ' + String(e).slice(0, 80)); return false; }
}
function b64paraU8(b64) { const s = atob(b64); const u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; }
function u8paraB64(u) { let s = ''; for (let i = 0; i < u.length; i += 32768) s += String.fromCharCode(...u.subarray(i, i + 32768)); return btoa(s); }
// Divide um Ogg/Opus (nota de voz do WhatsApp) em pedaços de ~seg segundos, repetindo as 2 páginas de cabeçalho em cada pedaço.
// Se não for Ogg, devolve o arquivo inteiro.
function partesOgg(u8, seg) {
  const ps = []; let i = 0;
  while (i + 27 <= u8.length && u8[i] === 0x4f && u8[i + 1] === 0x67 && u8[i + 2] === 0x67 && u8[i + 3] === 0x53) {
    const n = u8[i + 26]; let len = 0; for (let k = 0; k < n; k++) len += u8[i + 27 + k];
    const dv = new DataView(u8.buffer, u8.byteOffset + i, 14);
    const lo = dv.getUint32(6, true), hi = dv.getUint32(10, true);
    ps.push({ ini: i, fim: i + 27 + n + len, gran: hi === 0xffffffff ? -1 : hi * 4294967296 + lo });
    i += 27 + n + len;
  }
  if (ps.length < 4 || i !== u8.length) return [u8];
  const cab = u8.subarray(0, ps[1].fim), out = [];
  let ini = 2, base = 0;
  for (let j = 2; j < ps.length; j++) {
    const fimPedaco = j === ps.length - 1 || (ps[j].gran >= 0 && (ps[j].gran - base) / 48000 >= seg);
    if (!fimPedaco) continue;
    const corpo = u8.subarray(ps[ini].ini, ps[j].fim), p = new Uint8Array(cab.length + corpo.length);
    p.set(cab); p.set(corpo, cab.length); out.push(p);
    ini = j + 1; if (ps[j].gran >= 0) base = ps[j].gran;
  }
  return out.length ? out : [u8];
}
// O Whisper às vezes entra em loop ("Um carrossel. Um carrossel. ..."): corta frases repetidas seguidas.
function semRepeticao(t) {
  const fr = t.split(/(?<=[.!?])\s+/); const out = [];
  for (const f of fr) { if (out.length && out[out.length - 1].toLowerCase() === f.toLowerCase()) continue; out.push(f); }
  return out.join(' ');
}

async function baixarMidia(id, env) {
  try {
    const meta = await (await fetch(`${GRAPH}/${id}`, { headers: { Authorization: `Bearer ${env.WA_TOKEN}` } })).json();
    if (!meta.url || meta.file_size > 4_500_000) return null;
    const buf = await (await fetch(meta.url, { headers: { Authorization: `Bearer ${env.WA_TOKEN}` } })).arrayBuffer();
    let s = ''; const b = new Uint8Array(buf); for (let i = 0; i < b.length; i += 32768) s += String.fromCharCode(...b.subarray(i, i + 32768));
    return { tipo: meta.mime_type || 'image/jpeg', b64: btoa(s) };
  } catch { return null; }
}

// Ferramentas dos agentes (modo Victor): consultas de cliente + falar com outro agente + deixar recado para a rotina.
const FERRAMENTAS_EQUIPE = FERRAMENTAS.filter(f => ['consultar_compra', 'conferir_academia', 'enviar_link_senha'].includes(f.name)).concat([{
  name: 'perguntar_agente',
  description: 'Pergunta algo a outro agente da equipe (ele responde com a ficha e a memória dele). Use para saber o que o outro está fazendo, pedir um número ou uma opinião. Não serve para mandar o outro mexer em nada.',
  input_schema: { type: 'object', properties: { agente: { type: 'string', enum: Object.keys(NOME_AGENTE) }, pergunta: { type: 'string' } }, required: ['agente', 'pergunta'] }
}, {
  name: 'registrar_recado',
  description: 'Registra uma aprovação do Victor ou do Wesley (com o ID da fila quando houver e o que exatamente foi aprovado), um pedido a outro agente ou uma tarefa. O executor da equipe lê os recados de hora em hora (9h às 18h), executa o que foi aprovado e avisa o Victor aqui. Sem dados pessoais de cliente.',
  input_schema: { type: 'object', properties: { para: { type: 'string', description: 'agente de destino ou "rotina"' }, recado: { type: 'string' } }, required: ['para', 'recado'] }
}]);

async function chamarClaude(env, corpo) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify(corpo)
  });
  const d = await r.json();
  try { if (r.ok && d.usage) await anotarGasto(env, d.usage, corpo.model); } catch {}
  return { ok: r.ok, status: r.status, d };
}

// 20/11 18h35 (pedido do Victor): acompanha o gasto diário da API da Anthropic. Estimativa pelo uso de cada resposta
// (preço por milhão de tokens: Sonnet 3/15, cache leitura 0,30, cache escrita 3,75; Haiku 1/5; Opus 5/25). Teto diário em TETO_DIA_USD (padrão 1,5).
async function anotarGasto(env, u, modelo) {
  const dia = new Date(Date.now() - 3 * 3600000).toISOString().slice(0, 10), k = 'gasto:' + dia;
  const g = JSON.parse((await env.WG.get(k)) || '{"chamadas":0,"in":0,"out":0,"cr":0,"cw":0,"usd":0}');
  const P = /haiku/.test(modelo || '') ? [1, 5, 0.1, 1.25] : /opus/.test(modelo || '') ? [5, 25, 0.5, 6.25] : [3, 15, 0.3, 3.75];
  const a = u.input_tokens || 0, b = u.output_tokens || 0, c = u.cache_read_input_tokens || 0, w = u.cache_creation_input_tokens || 0;
  g.chamadas++; g.in += a; g.out += b; g.cr += c; g.cw += w; g.usd += (a * P[0] + b * P[1] + c * P[2] + w * P[3]) / 1e6;
  const teto = Number(env.TETO_DIA_USD || 1.5);
  const avisar = g.usd > teto && !g.alertado; if (avisar) g.alertado = 1;
  await env.WG.put(k, JSON.stringify(g), { expirationTtl: 40 * 86400 });
  if (avisar && env.ADMIN_FONE) { try { await enviar(env.ADMIN_FONE, '💰 Alerta de gasto: a API da Anthropic já passou de US$ ' + teto.toFixed(2) + ' hoje (estimativa US$ ' + g.usd.toFixed(2) + ' em ' + g.chamadas + ' chamadas).', env); } catch {} }
}

async function pensar(hist, nome, fone, agente, env, rapido = false) {
  const hora = agora();
  const extra = agente ? `\n\n${hora}` : `\n\n${hora}\nRegra de economia: responda curto e objetivo (até 3 frases), direto ao que a pessoa perguntou, e leve para o link de compra quando fizer sentido. Não prolongue a conversa.\nPrimeiro nome no perfil do WhatsApp: ${nome || 'não informado'} (use só se parecer um nome de verdade).`;
  const sistema = [{ type: 'text', text: SISTEMA, cache_control: { type: 'ephemeral' } }];
  if (agente) sistema.push({ type: 'text', text: await sistemaAgente(agente, env), cache_control: { type: 'ephemeral' } });
  sistema.push({ type: 'text', text: extra });
  const msgs = juntar(hist);
  for (let volta = 0; volta < 4; volta++) {
    const { ok, status, d } = await chamarClaude(env, {
      // rapido (voz pelo Jarvis): todos em Sonnet e resposta curta, para responder em segundos
      model: rapido ? (env.MODELO_VOZ || env.MODELO_AGENTES || 'claude-sonnet-5-5') : agente === 'chefe-wg' ? (env.MODELO_CHEFE || 'claude-sonnet-5-5') : (agente ? (env.MODELO_AGENTES || 'claude-sonnet-5-5') : (env.MODELO || 'claude-sonnet-5-5')),
      max_tokens: rapido ? 700 : agente ? 2000 : 700, system: sistema, tools: agente ? FERRAMENTAS_EQUIPE : FERRAMENTAS, messages: msgs,
    });
    if (!ok) { console.log('anthropic', JSON.stringify(d)); await passo(env, 'anthropic erro ' + status + ' ' + JSON.stringify(d.error || d).slice(0, 150)); const res = agente ? null : await iaReserva(env, msgs, { fone, nome, extra }); await alertaFalhaIA(env, status, d, agente ? null : { fone, nome, hist, planoB: !!res }); return res || ['Shalom! Recebi sua mensagem e já já te respondo. Tamo junto, Caveira!']; }
    if (!agente && volta === 0) { try { await env.WG.delete('aberta:' + fone); } catch {} }
    const usos = (d.content || []).filter(c => c.type === 'tool_use');
    const textos = (d.content || []).filter(c => c.type === 'text').map(c => c.text.trim()).filter(Boolean);
    if (!usos.length) { if (d.stop_reason === 'max_tokens') await passo(env, 'resposta cortada no limite'); return agente ? dividirLongo(textos.join('\n\n')) : dividir(textos.join('\n\n')); }
    const fora = usos.find(u => u.name === 'nao_responder');
    if (fora) { await env.WG.put('fora:' + Date.now(), JSON.stringify({ final: String(fone).slice(-4), assunto: (fora.input || {}).assunto || '' }), { expirationTtl: 7 * 86400 }); return []; }
    msgs.push({ role: 'assistant', content: d.content });
    const resultados = [];
    for (const u of usos) resultados.push({ type: 'tool_result', tool_use_id: u.id, content: await executar(u, fone, nome, env) });
    msgs.push({ role: 'user', content: resultados });
  }
  return ['Shalom! Vou pedir para a equipe te responder por aqui. Tamo junto, Caveira!'];
}

async function executar(u, fone, nome, env) {
  if (u.name === 'passar_para_humano') {
    await env.WG.put('pausa:' + fone, '1', { expirationTtl: 3 * 86400 });
    const i = u.input || {};
    const aviso = `Agente WG · passar para humano\nMotivo: ${i.motivo}\nCliente: ${nome || 'sem nome'} (final ${fone.slice(-4)})\nProduto: ${i.produto || '-'}\nResumo: ${i.resumo}\n\nResponda pelo celular no número de suporte. Para devolver ao agente, mande #agente na conversa do cliente.`;
    if (env.ADMIN_FONE) await enviar(env.ADMIN_FONE, aviso, env).catch(() => {});
    await env.WG.put('alerta:' + Date.now(), aviso, { expirationTtl: 30 * 86400 });
    return 'Equipe avisada. Diga à pessoa que a equipe vai assumir por aqui e responde em horário comercial (8h às 18h).';
  }
  if (u.name === 'consultar_compra') return consultarCompra(String((u.input || {}).email || '').trim().toLowerCase(), env);
  if (u.name === 'conferir_academia') return conferirAcademia(String((u.input || {}).email || '').trim().toLowerCase(), env);
  if (u.name === 'enviar_link_senha') return enviarLinkSenha(String((u.input || {}).email || '').trim().toLowerCase(), env);
  if (u.name === 'perguntar_agente') return perguntarAgente(String((u.input || {}).agente || ''), String((u.input || {}).pergunta || ''), env);
  if (u.name === 'registrar_recado') {
    const i = u.input || {};
    await env.WG.put('recado:' + Date.now(), JSON.stringify({ quando: agora(), para: i.para, recado: String(i.recado || '').slice(0, 2000) }), { expirationTtl: 14 * 86400 });
    const disparou = await dispararExecutor(env);
    return disparou ? 'Recado registrado e o executor foi acionado agora: ele começa em 1 a 2 minutos e avisa o Victor aqui quando terminar (cada rodada leva uns 10 minutos).'
      : 'Recado registrado. O executor pega na próxima rodada (de hora em hora, no minuto 7, das 9h às 18h, ou já está rodando) e avisa o Victor aqui.';
  }
  return 'ferramenta desconhecida';
}

// Junta a venda principal e os order bumps do mesmo cliente (até 10 min) e avisa o Victor uma vez só, pela primeira venda do grupo.
const BRL = n => 'R$ ' + Number(n || 0).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
async function avisarVenda(v, env) {
  if (v.plataforma === 'hotmart') return avisarVendaHotmart(v, env);
  if (!env.GREENN_TOKEN || !env.ADMIN_FONE) return;
  const r = await fetch('https://apiadm.greenn.com.br/api/v1/sales?per_page=20&sort=-created_at&filter%5Bclient_email%5D=' + encodeURIComponent(String(v.email).trim().toLowerCase()), { headers: { Authorization: 'Bearer ' + env.GREENN_TOKEN, accept: 'application/json' } });
  if (!r.ok) { await passo(env, 'venda: greenn ' + r.status); return; }
  const lista = ((await r.json()).data || []).filter(x => x.status === 'paid');
  const esta = lista.find(x => String(x.id) === String(v.id));
  if (!esta) { await passo(env, 'venda: não confirmada na Greenn'); return; }
  const t0 = Date.parse(esta.created_at);
  const grupo = lista.filter(x => Math.abs(Date.parse(x.created_at) - t0) < 10 * 60000).sort((a, b) => a.id - b.id);
  if (String(grupo[0].id) !== String(v.id)) return;   // só a primeira venda do grupo avisa
  const [principal, ...bumps] = grupo;
  const nome = x => (x.product && x.product.name) || PRODUTOS_GREENN[x.product_id] || ('produto ' + x.product_id);
  const totalPago = grupo.reduce((s, x) => s + Number(x.total || x.amount || 0), 0);
  const metodo = { CREDIT_CARD: 'cartão', PIX: 'Pix', BOLETO: 'boleto', TWO_CREDIT_CARDS: 'dois cartões', PAYPAL: 'PayPal' }[principal.method] || principal.method || '';
  const parc = principal.installments > 1 ? ' em ' + principal.installments + 'x' : '';
  const primeiro = String((principal.client || {}).name || '').trim().split(/\s+/)[0] || '';
  const cap = primeiro ? primeiro.charAt(0) + primeiro.slice(1).toLowerCase() : 'Cliente';
  const src = String(v.utm_source || ''), trafego = /trafego|tráfego/i.test(v.origem || '') || /^fb$/i.test(src);
  const rastro = [v.utm_medium, v.utm_campaign, v.utm_content].filter(Boolean).join(' / ');
  const origem = trafego ? `Tráfego pago (Diogo)${rastro ? ': ' + rastro : ''}` : (src ? `Orgânico (${src.toUpperCase()})${rastro ? ': ' + rastro : ''}` : 'Sem rastreio (link sem UTM)');
  const linhas = [
    `💰 Venda aprovada · ${cap}`,
    `${nome(principal)}: ${BRL(principal.amount)}`,
    bumps.length ? 'Order bump: ' + bumps.map(x => `${nome(x)} ${BRL(x.amount)}`).join(' + ') : 'Order bump: não levou',
    `Pago: ${BRL(totalPago)} no ${metodo}${parc}`,
    `Origem: ${origem}`
  ];
  await enviar(env.ADMIN_FONE, linhas.join('\n'), env);
  await passo(env, 'venda avisada ' + grupo.length + ' item(ns)');
}

async function tokenHotmart(env) {
  let tk = await env.WG.get('hotmart:token');
  if (tk) return tk;
  const a = await fetch(`https://api-sec-vlc.hotmart.com/security/oauth/token?grant_type=client_credentials&client_id=${encodeURIComponent(env.HOTMART_CLIENT_ID)}&client_secret=${encodeURIComponent(env.HOTMART_CLIENT_SECRET)}`, { method: 'POST', headers: { Authorization: 'Basic ' + env.HOTMART_BASIC, 'content-type': 'application/json' } });
  const aj = await a.json().catch(() => ({}));
  if (aj.access_token) { await env.WG.put('hotmart:token', aj.access_token, { expirationTtl: Math.max(300, (aj.expires_in || 3600) - 300) }); return aj.access_token; }
  return null;
}

// Mesmo aviso para a Hotmart: confere a transação na API da Hotmart e junta as compras do mesmo cliente em até 10 min.
async function avisarVendaHotmart(v, env) {
  if (!env.HOTMART_BASIC || !env.ADMIN_FONE) return;
  const tk = await tokenHotmart(env);
  if (!tk) { await passo(env, 'venda hotmart: sem token'); return; }
  const r = await fetch('https://developers.hotmart.com/payments/api/v1/sales/history?max_results=20&buyer_email=' + encodeURIComponent(String(v.email).trim().toLowerCase()) + '&start_date=' + (Date.now() - 2 * 86400000) + '&end_date=' + (Date.now() + 3600000), { headers: { Authorization: 'Bearer ' + tk } });
  if (r.status === 401) await env.WG.delete('hotmart:token');
  if (!r.ok) { await passo(env, 'venda hotmart: ' + r.status); return; }
  const itens = ((await r.json()).items || []).filter(x => /APPROVED|COMPLETE/.test((x.purchase || {}).status || ''));
  const esta = itens.find(x => String((x.purchase || {}).transaction) === String(v.id));
  if (!esta) { await passo(env, 'venda hotmart: não confirmada'); return; }
  const t = x => Number((x.purchase || {}).order_date || (x.purchase || {}).approved_date || 0);
  const grupo = itens.filter(x => Math.abs(t(x) - t(esta)) < 10 * 60000).sort((a, b) => t(a) - t(b) || String(a.purchase.transaction).localeCompare(String(b.purchase.transaction)));
  if (String(grupo[0].purchase.transaction) !== String(v.id)) return;
  const [principal, ...bumps] = grupo;
  const val = x => Number(((x.purchase || {}).price || {}).value || 0);
  const pg = (principal.purchase || {}).payment || {};
  const metodo = { CREDIT_CARD: 'cartão', PIX: 'Pix', BILLET: 'boleto', PAYPAL: 'PayPal' }[pg.type] || pg.type || '';
  const parc = pg.installments_number > 1 ? ' em ' + pg.installments_number + 'x' : '';
  const primeiro = String((principal.buyer || {}).name || '').trim().split(/\s+/)[0] || '';
  const cap = primeiro ? primeiro.charAt(0).toUpperCase() + primeiro.slice(1).toLowerCase() : 'Cliente';
  const rastro = [v.utm_source && 'src ' + v.utm_source, v.utm_content && 'sck ' + v.utm_content].filter(Boolean).join(' / ');
  const linhas = [
    `💰 Venda aprovada na Hotmart · ${cap}`,
    `${(principal.product || {}).name || 'produto'}: ${BRL(val(principal))}`,
    bumps.length ? 'Order bump: ' + bumps.map(x => `${(x.product || {}).name || 'produto'} ${BRL(val(x))}`).join(' + ') : 'Order bump: não levou',
    `Pago: ${BRL(grupo.reduce((s, x) => s + val(x), 0))} no ${metodo}${parc}`,
    `Origem: ${rastro ? 'Hotmart (' + rastro + ')' : 'Hotmart sem rastreio'}`
  ];
  await enviar(env.ADMIN_FONE, linhas.join('\n'), env);
  await passo(env, 'venda hotmart avisada ' + grupo.length + ' item(ns)');
}

async function perguntarAgente(chave, pergunta, env) {
  if (!EQUIPE.fichas[chave]) return 'Agente não encontrado.';
  const { ok, d } = await chamarClaude(env, {
    model: env.MODELO_AGENTES || 'claude-sonnet-5-5', max_tokens: 1200,
    system: [{ type: 'text', text: await sistemaAgente(chave, env), cache_control: { type: 'ephemeral' } }, { type: 'text', text: agora() + '\nQuem pergunta agora é outro agente da equipe, não o Victor. Responda curto, só com o que você sabe pela memória e pela sua ficha.' }],
    messages: [{ role: 'user', content: pergunta }]
  });
  if (!ok) return 'O agente não respondeu agora.';
  const t = (d.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n').trim();
  await env.WG.put('conversa:' + Date.now(), JSON.stringify({ quando: agora(), para: chave, pergunta: pergunta.slice(0, 1000), resposta: t.slice(0, 2000) }), { expirationTtl: 14 * 86400 });
  return t || '(sem resposta)';
}

// ---- Academia (Cademi API v3; chave com users.read, enrollments.read, products.read e users.send_access) ----
const CADEMI = 'https://api.cademi.com.br/api/v3';
async function cademi(env, caminho, opcoes = {}) {
  const r = await fetch(CADEMI + caminho, { ...opcoes, headers: { Authorization: 'Bearer ' + env.CADEMI_KEY, accept: 'application/json', 'content-type': 'application/json', ...(opcoes.headers || {}) } });
  let j = {}; try { j = await r.json(); } catch {}
  return { ok: r.ok, status: r.status, j };
}
async function alunoCademi(email, env) {
  const r = await cademi(env, '/users?limit=10&q=' + encodeURIComponent(email));
  if (!r.ok) { await passo(env, 'cademi users ' + r.status + ' ' + JSON.stringify(r.j).slice(0, 120)); return { erro: r.status }; }
  return { aluno: (r.j.data || []).find(u => String(u.email || '').toLowerCase() === email && !u.deleted) };
}
async function nomesCursos(env) {
  const c = await env.WG.get('cademi:produtos');
  if (c) return JSON.parse(c);
  const nomes = {}; let cursor = '';
  for (let i = 0; i < 5; i++) {
    const r = await cademi(env, '/products?limit=200' + (cursor ? '&cursor=' + encodeURIComponent(cursor) : ''));
    if (!r.ok) break;
    for (const p of r.j.data || []) nomes[p.id] = p.name;
    cursor = (r.j.page || {}).next_cursor; if (!cursor) break;
  }
  await env.WG.put('cademi:produtos', JSON.stringify(nomes), { expirationTtl: 86400 });
  return nomes;
}
async function conferirAcademia(email, env) {
  if (!env.CADEMI_KEY) return '(Interno: Academia ainda não conectada. Não afirme nada sobre o acesso; oriente o "esqueci minha senha" e, se não resolver, passe para humano.)';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'E-mail inválido. Peça para conferir.';
  const { aluno, erro } = await alunoCademi(email, env);
  if (erro) return '(Interno: a Academia não respondeu agora. Não afirme nada; oriente o "esqueci minha senha".)';
  if (!aluno) { await passo(env, 'academia: sem aluno'); return 'Não existe aluno na Academia com esse e-mail. Se a compra foi aprovada, pode ser outro e-mail na compra ou atraso na liberação: confira a compra com consultar_compra. Compra aprovada e sem aluno na Academia depois de alguns minutos: passe para humano (é falha de entrega).'; }
  const r = await cademi(env, '/users/' + aluno.id + '/products?limit=200');
  const nomes = await nomesCursos(env);
  const lib = [], neg = [];
  for (const a of (r.j.data || [])) {
    const n = nomes[a.product_id] || 'curso ' + a.product_id;
    if (a.has_access) lib.push(n + (a.ends_at ? ' (até ' + String(a.ends_at).slice(0, 10) + ')' : ' (vitalício)'));
    else if (a.denial_reason) neg.push(n + ' (sem acesso: ' + a.denial_reason + ')');
  }
  await passo(env, 'academia: aluno ok, ' + lib.length + ' curso(s) liberado(s)');
  return `Aluno encontrado na Academia (último acesso conta como ${aluno.status === 'active' ? 'ativo nos últimos 30 dias' : 'sem acesso recente'}).\nCursos liberados: ${lib.length ? lib.join('; ') : 'nenhum'}` + (neg.length ? `\nSem acesso: ${neg.slice(0, 10).join('; ')}` : '') +
    '\nSe a pessoa não lembra a senha ou não achou o e-mail, use enviar_link_senha. Link da Academia: https://kravmagacaveira.cademi.com.br/ . Se falta um curso que ela comprou (confira com consultar_compra), passe para humano dizendo qual curso.';
}
async function enviarLinkSenha(email, env) {
  if (!env.CADEMI_KEY) return '(Interno: Academia ainda não conectada. Oriente o "esqueci minha senha" na tela de entrada.)';
  const { aluno, erro } = await alunoCademi(email, env);
  if (erro || !aluno) return erro ? '(Interno: a Academia não respondeu. Oriente o "esqueci minha senha".)' : 'Não existe aluno com esse e-mail na Academia; não dá para mandar o link. Confira a compra e o e-mail.';
  const r = await cademi(env, '/users/' + aluno.id + '/password-reset-emails', { method: 'POST', headers: { 'Idempotency-Key': crypto.randomUUID() }, body: '{}' });
  await passo(env, 'academia: link de senha ' + (r.ok ? 'enviado' : 'erro ' + r.status));
  if (r.ok) return 'Link para criar senha nova enviado para o e-mail da pessoa. Peça para olhar a caixa de entrada, spam e promoções (chega em poucos minutos) e depois entrar em https://kravmagacaveira.cademi.com.br/ .';
  if (JSON.stringify(r.j).includes('email_recently_sent')) return 'O link já foi enviado há menos de 10 minutos. Peça para procurar no e-mail (inclusive spam e promoções) e esperar alguns minutos.';
  return '(Interno: não consegui mandar o link agora. Oriente o "esqueci minha senha" na tela de entrada.)';
}

// ---- Consulta de compra (Greenn: token só com o escopo "Consultar vendas"; Hotmart: credenciais da conta) ----
// A API de vendas devolve só o número do produto; nomes conferidos na Greenn em 19/11.
const PRODUTOS_GREENN = { 201654: 'Black Caveira 2026 (23 treinamentos, 1 ano)', 204640: 'Black Caveira 2026 (23 treinamentos, 1 ano)', 202271: 'Black Caveira 2026 (23 treinamentos, 2 anos)', 202274: 'Black Caveira 2026 (23 treinamentos, vitalício)', 201669: 'Guia de Treino: Trilha de 12 Semanas', 200398: 'IA KMC', 182127: 'E-book Vida Segura', 183084: 'Protocolo Rua', 184140: 'Protocolo Deslocamento', 185026: 'Protocolo Residencial', 158493: 'Protocolo Vida Segura', 158759: 'Entrega Personalizada WG', 158943: 'Caveira VIP Presencial', 160931: 'Mentoria WG', 140616: 'Combo Família Segura', 137555: 'Manual de Reação e Sobrevivência com Facas e Lâminas', 128948: 'Guia Prático de Prevenção de Confrontos', 127358: 'Combate e Sobrevivência com Lâminas (12 em 1)', 120469: 'Combo Proteção (DPC + DPF)', 103816: 'Combo Casal (DPC + DPF)', 97341: 'Desafio 30D + Defesa Pessoal Caveira 2.0', 73212: 'Comunidade Caveira vitalícia', 67014: 'Combo 4x1 (DPC 2.0 + Modo Caveira + MCD + Briga de Rua)', 66296: 'Desafio 30D', 64571: 'Mentalidade Caveira (mensal)', 64419: 'Combo 6 livros digitais', 64412: 'Mentalidade Caveira (lives)', 59654: 'Defesa Pessoal Kids', 59652: 'E-book Como Treinar seu Filho contra o Bullying', 59651: 'Preparação Física Kids', 59649: 'Primeiros Socorros Kids', 57436: 'Defesa Pessoal Caveira 2.0', 53654: 'Desafio Combate Caveira 7 Movimentos', 43884: 'Modo Caveira de Defesa Pessoal', 42930: 'Defesa contra Ataques com Lâminas', 33496: 'Combate com Lâminas', 33494: 'Combo 7 Seminários', 32088: 'Seminário Defesa de Socos', 32080: 'Seminário Defesa de Quedas', 31884: 'Comunidade Caveira vitalícia', 31873: 'Segurança de Comércios', 31868: 'Preparação Física Caveira', 31865: 'Defesa Pessoal Caveira 2.0 (DPC)', 30523: 'Desafio Combate Caveira 7 Movimentos', 30239: 'Primeiros Socorros Caveira (APH)', 29627: '2 Seminários (Socos e Quedas)', 28513: 'Defesa de Socos Completo', 28509: 'O Código Caveira', 28506: 'Comunidade Caveira', 28504: 'Contra Ataque Feminino', 28503: 'Socos para Iniciantes', 28502: 'Combate e Sobrevivência com Lâminas', 28501: 'Briga de Rua: 57 técnicas', 28497: 'Socos Avançados', 28495: 'Os Segredos do Armlock', 28491: 'Jiu Jitsu x Krav Maga para Rua', 27901: 'Protocolo MCD' };
const STATUS_GREENN = { paid: 'aprovada (paga)', waiting_payment: 'aguardando pagamento (Pix ou boleto não pago)', refused: 'recusada (pagamento não passou)', refunded: 'reembolsada', chargedback: 'contestada no cartão (chargeback)', pending_refund: 'reembolso em andamento', canceled: 'cancelada', trialing: 'em teste' };
async function consultarCompra(email, env) {
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'E-mail inválido. Peça para a pessoa conferir e mandar de novo.';
  const achados = [];
  const avisos = [];
  if (env.GREENN_TOKEN) {
    try {
      const r = await fetch('https://apiadm.greenn.com.br/api/v1/sales?per_page=20&sort=-created_at&filter%5Bclient_email%5D=' + encodeURIComponent(email), { headers: { Authorization: 'Bearer ' + env.GREENN_TOKEN, accept: 'application/json' } });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) avisos.push('Greenn não respondeu (' + r.status + ')');
      else for (const v of (j.data || [])) {
        if (v.client && v.client.email && String(v.client.email).toLowerCase() !== email) continue;  // a API já filtra pelo e-mail; o cliente nem sempre vem na resposta
        achados.push(`Greenn: ${(v.product || {}).name || PRODUTOS_GREENN[v.product_id] || 'produto código ' + v.product_id} | ${STATUS_GREENN[v.status] || v.status} | ${v.method || ''} | compra ${String(v.created_at || '').slice(0, 10)}${v.paid_at ? ' | paga ' + String(v.paid_at).slice(0, 10) : ''}`);
      }
    } catch (e) { avisos.push('Greenn com erro'); }
  } else avisos.push('Greenn ainda não conectada');
  if (env.HOTMART_BASIC && env.HOTMART_CLIENT_ID && env.HOTMART_CLIENT_SECRET) {
    try {
      let tk = await env.WG.get('hotmart:token');
      if (!tk) {
        const a = await fetch(`https://api-sec-vlc.hotmart.com/security/oauth/token?grant_type=client_credentials&client_id=${encodeURIComponent(env.HOTMART_CLIENT_ID)}&client_secret=${encodeURIComponent(env.HOTMART_CLIENT_SECRET)}`, { method: 'POST', headers: { Authorization: 'Basic ' + env.HOTMART_BASIC, 'content-type': 'application/json' } });
        const aj = await a.json().catch(() => ({}));
        if (aj.access_token) { tk = aj.access_token; await env.WG.put('hotmart:token', tk, { expirationTtl: Math.max(300, (aj.expires_in || 3600) - 300) }); }
      }
      if (!tk) avisos.push('Hotmart não autorizou');
      else {
        const H = { headers: { Authorization: 'Bearer ' + tk } };
        const base = 'https://developers.hotmart.com/payments/api/v1/sales/history?max_results=20&buyer_email=' + encodeURIComponent(email);
        let r = await fetch(base + '&start_date=' + (Date.now() - 365 * 86400000) + '&end_date=' + Date.now(), H);
        let txt = await r.text();
        if (r.status === 400) { await passo(env, 'hotmart 400 com datas: ' + txt.replace(/[^\s"]+@[^\s"]+/g, '#').slice(0, 160)); r = await fetch(base, H); txt = await r.text(); }
        if (r.status === 401) await env.WG.delete('hotmart:token');
        let j = {}; try { j = JSON.parse(txt); } catch {}
        if (!r.ok) { avisos.push('Hotmart não respondeu (' + r.status + ')'); await passo(env, 'hotmart ' + r.status + ': ' + txt.replace(/[^\s"]+@[^\s"]+/g, '#').slice(0, 160)); }
        else for (const it of (j.items || [])) {
          const pu = it.purchase || {};
          achados.push(`Hotmart: ${(it.product || {}).name || 'produto'} | ${pu.status || ''} | compra ${pu.order_date ? new Date(pu.order_date).toISOString().slice(0, 10) : ''}${pu.approved_date ? ' | aprovada ' + new Date(pu.approved_date).toISOString().slice(0, 10) : ''}`);
        }
      }
    } catch (e) { avisos.push('Hotmart com erro'); }
  } else avisos.push('Hotmart ainda não conectada');
  await passo(env, 'consulta de compra: ' + achados.length + ' achada(s)' + (avisos.length ? ' | ' + avisos.join('; ') : ''));
  const base = achados.length ? 'Compras encontradas para esse e-mail:\n' + achados.join('\n') : 'Nenhuma compra encontrada com esse e-mail.';
  const dica = achados.length ? '\nAprovada: o acesso chega nesse e-mail; oriente entrar na Academia com ele (esqueci minha senha se precisar). Aguardando pagamento: explique e ofereça o link de novo. Recusada: o pagamento não passou. Reembolsada ou cancelada: não tem acesso; se a pessoa estranhar, passe para humano.'
    : '\nPergunte com calma se ela pode ter usado outro e-mail (ou comprado no nome de outra pessoa). Depois de 2 e-mails sem achar, passe para humano.';
  return base + dica + (avisos.length ? '\n(Observação interna, não conte ao cliente: ' + avisos.join('; ') + '. Se alguma plataforma não foi consultada, não afirme que a compra não existe; diga que vai pedir para a equipe conferir.)' : '');
}

function juntar(hist) {
  // A API pede papéis alternados e a conversa começando pelo usuário
  const out = [];
  for (const h of hist) {
    const c = typeof h.content === 'string' ? [{ type: 'text', text: h.content }] : h.content;
    if (out.length && out[out.length - 1].role === h.role) out[out.length - 1].content.push(...c);
    else out.push({ role: h.role, content: [...c] });
  }
  while (out.length && out[0].role !== 'user') out.shift();
  return out;
}

function dividir(t) {
  t = t.replace(/\s*—\s*/g, ', ').trim();
  if (!t) return [];
  const partes = t.split(/\n{2,}/).map(s => s.trim()).filter(Boolean);
  if (partes.length <= 2) return partes;
  return [partes[0], partes.slice(1).join('\n\n')];
}
// Agentes falando com o Victor: mensagens podem ser longas; quebra em blocos de até ~3500 caracteres (limite do WhatsApp é 4096).
function dividirLongo(t) {
  t = t.replace(/\s*—\s*/g, ', ').trim();
  if (!t) return [];
  const out = []; let atual = '';
  for (const p of t.split(/\n{2,}/)) {
    if (atual && (atual.length + p.length + 2) > 3500) { out.push(atual); atual = ''; }
    atual = atual ? atual + '\n\n' + p : p;
    while (atual.length > 3500) { out.push(atual.slice(0, 3500)); atual = atual.slice(3500); }
  }
  if (atual) out.push(atual);
  return out;
}

async function getHist(env, fone) { try { return JSON.parse(await env.WG.get('hist:' + fone) || '[]'); } catch { return []; } }
async function addHist(env, fone, item) {
  const h = await getHist(env, fone);
  if (Array.isArray(item.content)) item = { role: item.role, content: item.content.map(c => c.type === 'image' ? { type: 'text', text: '[imagem enviada]' } : c) };
  h.push(item);
  await env.WG.put('hist:' + fone, JSON.stringify(h.slice(-HIST_MAX)), { expirationTtl: 7 * 86400 });
}

async function marcarLido(id, env) {
  if (env.MC_TOKEN || env.YC_KEY) return;  // a Meta não deixa nosso app marcar lido neste número
  await fetch(`${GRAPH}/${env.PHONE_ID}/messages`, { method: 'POST', headers: { Authorization: `Bearer ${env.WA_TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', status: 'read', message_id: id, typing_indicator: { type: 'text' } }) }).catch(() => {});
}

async function enviar(para, texto, env) {
  if (env.YC_KEY) return enviarYC(para, texto, env);
  if (env.MC_TOKEN) return enviarMC(para, texto, env);
  const r = await fetch(`${GRAPH}/${env.PHONE_ID}/messages`, { method: 'POST', headers: { Authorization: `Bearer ${env.WA_TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to: para, type: 'text', text: { body: texto, preview_url: true } }) });
  if (!r.ok) console.log('envio', r.status, await r.text());
}

// ---- Envio pelo ManyChat ----
const H_MC = env => ({ Authorization: `Bearer ${env.MC_TOKEN}`, 'content-type': 'application/json', accept: 'application/json' });

async function idManychat(para, env) {
  const d = String(para).replace(/\D/g, '');
  const cache = await env.WG.get('mc:' + fone(d));
  if (cache) return cache;
  // A API do ManyChat não acha contato de WhatsApp pelo número; o ID chega pela rota /mc. Tentativa extra abaixo.
  const com9 = (d.length === 12 && d.startsWith('55')) ? d.slice(0, 4) + '9' + d.slice(4) : d;
  const sem9 = fone(d);
  const tentativas = [];
  for (const n of [...new Set([com9, sem9, d])]) for (const campo of ['whatsapp_phone', 'phone']) for (const v of ['+' + n, n]) tentativas.push(`${campo}=${encodeURIComponent(v)}`);
  for (const q of tentativas) {
    try {
      const r = await fetch(`${MC}/fb/subscriber/findBySystemField?${q}`, { headers: H_MC(env) });
      const j = await r.json().catch(() => ({}));
      const id = j && j.data && (j.data.id || (Array.isArray(j.data) && j.data[0] && j.data[0].id));
      if (r.ok && id) { await env.WG.put('mc:' + fone(d), String(id), { expirationTtl: 30 * 86400 }); return String(id); }
    } catch (e) { console.log('mc busca erro', String(e)); }
  }
  console.log('mc contato nao encontrado final', sem9.slice(-4));
  return null;
}

async function enviarMC(para, texto, env) {
  const id = await idManychat(para, env);
  if (!id) return false;
  const corpo = { subscriber_id: id, data: { version: 'v2', content: { type: 'whatsapp', messages: [{ type: 'text', text: texto }] } } };
  const r = await fetch(`${MC}/fb/sending/sendContent`, { method: 'POST', headers: H_MC(env), body: JSON.stringify(corpo) });
  const t = await r.text();
  if (!r.ok || /"status"\s*:\s*"error"/.test(t)) { console.log('envio mc', r.status, t.slice(0, 500)); return false; }
  return true;
}

// ---- Envio pela YCloud (parceira oficial da Meta; o número fica em coexistência com o app do celular) ----
async function enviarMidiaYC(para, m, env) {
  if (!env.YC_KEY) return false;
  const tipo = ['video', 'image', 'document', 'audio'].includes(m.tipo) ? m.tipo : 'document';
  const corpo = { from: env.YC_FROM || '+553193294274', to: '+' + String(para).replace(/\D/g, ''), type: tipo, [tipo]: { link: String(m.url) } };
  if (m.legenda && tipo !== 'audio') corpo[tipo].caption = String(m.legenda).slice(0, 1024);
  if (tipo === 'document' && m.nome) corpo.document.filename = String(m.nome).slice(0, 120);
  const r = await fetch(`${YC}/whatsapp/messages/sendDirectly`, { method: 'POST', headers: { 'X-API-Key': env.YC_KEY, 'content-type': 'application/json' }, body: JSON.stringify(corpo) });
  const t = await r.text(); let j = {}; try { j = JSON.parse(t); } catch {}
  if (!r.ok || j.status === 'failed') { await passo(env, 'yc midia recusada ' + r.status + ' ' + t.replace(/\+?\d{10,}/g, '#').slice(0, 160)); return false; }
  return true;
}

async function enviarYC(para, texto, env) {
  const to = '+' + String(para).replace(/\D/g, '');
  const corpo = { from: env.YC_FROM || '+553193294274', to, type: 'text', text: { body: texto, previewUrl: true } };
  const r = await fetch(`${YC}/whatsapp/messages/sendDirectly`, { method: 'POST', headers: { 'X-API-Key': env.YC_KEY, 'content-type': 'application/json' }, body: JSON.stringify(corpo) });
  const t = await r.text();
  let j = {}; try { j = JSON.parse(t); } catch {}
  if (!r.ok || j.status === 'failed') { console.log('envio yc', r.status, t.slice(0, 500)); await passo(env, 'yc recusou ' + r.status + ' ' + t.replace(/\+?\d{10,}/g, '#').slice(0, 200)); return false; }
  return true;
}

// Rastro de diagnóstico (sem telefone completo nem texto do cliente): lista em diag:passos, últimos 40.
// 19/11: o crédito da API acabou às 15h09 e o agente passou 6 horas só mandando a resposta de reserva sem ninguém saber.
// Agora avisa o Victor no WhatsApp na primeira falha e no máximo 1 vez a cada 30 min.
// Plano B grátis (19/11, OK do Victor): se a API da Anthropic falhar (crédito, fora do ar), o cliente é respondido
// pela IA do próprio Cloudflare (Workers AI, cota grátis diária). Sem ferramentas: responde, orienta e manda link da base.
// Monitor de queda (19/11, OK do Victor): a cada 15 min testa as páginas que vendem e avisa no WhatsApp do Victor (1 aviso por hora por página).
const MONITOR = [
  { nome: 'Link do grupo (/grupo)', url: 'https://www.wesleygimenez.com.br/grupo?utm_source=monitor', tem: 'id="ir"' },
  { nome: 'Página da Black', url: 'https://www.wesleygimenez.com.br/black-caveira-2026?utm_source=monitor', tem: 'checkout' },
  { nome: 'Página da Black (tráfego)', url: 'https://www.wesleygimenez.com.br/black-caveira-2026-oferta?utm_source=monitor', tem: 'checkout' },
  { nome: 'Grupo no DevZapp', url: 'https://devzapp.com.br/r/s9mRreup', semSeguir: true },
];
async function monitorQueda(env) {
  const falhas = [];
  for (const m of MONITOR) {
    let ok = false, info = '';
    try {
      const r = await fetch(m.url, { redirect: m.semSeguir ? 'manual' : 'follow', headers: { 'user-agent': 'monitor-wg' }, cf: { cacheTtl: 0 } });
      info = 'status ' + r.status;
      if (m.semSeguir) ok = r.status < 400;
      else { const t = r.ok ? await r.text() : ''; ok = r.ok && (!m.tem || t.toLowerCase().includes(m.tem.toLowerCase())); if (r.ok && !ok) info += ', sem "' + m.tem + '"'; }
    } catch (e) { info = 'erro ' + String(e).slice(0, 80); }
    if (!ok) falhas.push(m.nome + ' (' + info + ')');
    await env.WG.put('monitor:' + m.nome, JSON.stringify({ ok, info, quando: new Date().toISOString() }), { expirationTtl: 7 * 86400 });
  }
  if (!falhas.length || !env.ADMIN_FONE) return;
  const chave = 'monitor:aviso:' + falhas.join('|').slice(0, 200);
  if (await env.WG.get(chave)) return;
  await env.WG.put(chave, '1', { expirationTtl: 3600 });
  await passo(env, 'monitor falha ' + falhas.join('; ').slice(0, 150));
  try { await mandarVictor(env.ADMIN_FONE, '🚨 Monitor: fora do ar ou com problema agora: ' + falhas.join('; ') + '. Confira antes de mandar mais gente para lá.', env); } catch {}
}

// Voz Gemini (20/11): POST /voz com Authorization: Bearer AVISO_TOKEN e corpo {texto, voz, estilo}; devolve audio/wav.
async function vozGemini(env, texto, voz, estilo) {
  const modelo = env.MODELO_VOZ_GEMINI || 'gemini-3.8-flash-tts';
  const prompt = (estilo ? estilo + ': ' : '') + texto;
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${env.GEMINI_KEY}`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voz || env.VOZ_GEMINI || 'Koda' } } } } }),
  });
  const j = await r.json().catch(() => ({}));
  const parte = (((j.candidates || [])[0] || {}).content || {}).parts || [];
  const dado = (parte.find(p => p.inlineData) || {}).inlineData;
  if (!r.ok || !dado) return { ok: false, status: r.status, erro: JSON.stringify(j.error || j).slice(0, 300) };
  const pcm = Uint8Array.from(atob(dado.data), c => c.charCodeAt(0));
  const taxa = Number((String(dado.mimeType).match(/rate=(\d+)/) || [])[1] || 24000);
  const h = new DataView(new ArrayBuffer(44)); const w = (o, s) => { for (let i = 0; i < s.length; i++) h.setUint8(o + i, s.charCodeAt(i)); };
  w(0, 'RIFF'); h.setUint32(4, 36 + pcm.length, true); w(8, 'WAVE'); w(12, 'fmt '); h.setUint32(16, 16, true); h.setUint16(20, 1, true); h.setUint16(22, 1, true);
  h.setUint32(24, taxa, true); h.setUint32(28, taxa * 2, true); h.setUint16(32, 2, true); h.setUint16(34, 16, true); w(36, 'data'); h.setUint32(40, pcm.length, true);
  const wav = new Uint8Array(44 + pcm.length); wav.set(new Uint8Array(h.buffer), 0); wav.set(pcm, 44);
  return { ok: true, wav, taxa };
}

// 20/11 15h55 (pedido do Victor: plano B "paia"): reserva tenta primeiro o Gemini (chave GEMINI_KEY, cota grátis, prompt inteiro)
// e só depois o Workers AI. 16h30: o Gemini recebe as MESMAS ferramentas do atendente (consultar compra, conferir Academia,
// link de senha, passar para humano), o nome e a hora, para responder como o agente principal enquanto o crédito da Anthropic não volta.
const REGRAS_RESERVA = '\n\nMODO RESERVA (você responde no lugar da IA principal, com as mesmas regras e ferramentas): siga TODAS as regras acima, inclusive o jeito de falar e quando usar cada ferramenta. Responda como gente da equipe digitando no WhatsApp: curto (até 5 linhas), português do Brasil, sem travessão, sem lista longa. Responda exatamente o que a pessoa perguntou, na primeira linha. Preço, parcela, link e prazo só os que estão escritos acima, copiados igual; se não estiver escrito, diga que a equipe confirma já já. Quando a pessoa quiser comprar ou pedir o link, mande o link da página que está acima. Nunca diga que é IA reserva nem fale de erro.';
function esquemaGemini(s) {
  if (Array.isArray(s)) return s.map(esquemaGemini);
  if (!s || typeof s !== 'object') return s;
  const o = {};
  for (const [k, v] of Object.entries(s)) o[k] = k === 'type' && typeof v === 'string' ? v.toUpperCase() : k === 'properties' ? Object.fromEntries(Object.entries(v).map(([pk, pv]) => [pk, esquemaGemini(pv)])) : esquemaGemini(v);
  return o;
}
async function iaReserva(env, msgs, ctx = {}) {
  const hist = [];
  for (const m of msgs.slice(-12)) {
    const t = (Array.isArray(m.content) ? m.content : [{ type: 'text', text: String(m.content) }]).map(c => c.type === 'text' ? c.text : c.type === 'tool_result' ? '[resultado da consulta: ' + String(typeof c.content === 'string' ? c.content : JSON.stringify(c.content)).slice(0, 600) + ']' : '').filter(Boolean).join('\n').trim();
    if (!t) continue;
    const role = m.role === 'assistant' ? 'assistant' : 'user';
    if (hist.length && hist[hist.length - 1].role === role) hist[hist.length - 1].content += '\n' + t; else hist.push({ role, content: t });
  }
  while (hist.length && hist[0].role !== 'user') hist.shift();
  if (!hist.length) return null;
  const limpa = t => dividir(String(t).replace(/\s*—\s*/g, ', ').trim());
  const sistema = SISTEMA + (ctx.extra || '') + REGRAS_RESERVA;
  if (env.GEMINI_KEY) {
    const conteudo = hist.map(h => ({ role: h.role === 'assistant' ? 'model' : 'user', parts: [{ text: h.content }] }));
    const ferramentas = [{ functionDeclarations: FERRAMENTAS.map(f => ({ name: f.name, description: f.description, parameters: esquemaGemini(f.input_schema) })) }];
    let modelo = env.MODELO_RESERVA || 'gemini-flash-latest';
    for (let volta = 0; volta < 4; volta++) {
      try {
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${env.GEMINI_KEY}`, {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ systemInstruction: { parts: [{ text: sistema }] }, contents: conteudo, tools: ctx.fone ? ferramentas : undefined, generationConfig: { maxOutputTokens: 2048, temperature: 0.4 } })
        });
        const d = await r.json().catch(() => ({}));
        if (r.status === 404 && modelo !== 'gemini-2.5-flash') { modelo = 'gemini-2.5-flash'; volta--; continue; }
        const parts = (d.candidates && d.candidates[0] && d.candidates[0].content && d.candidates[0].content.parts) || [];
        const chamadas = parts.filter(p => p.functionCall);
        const t = parts.map(p => p.text || '').join('').trim();
        await passo(env, 'reserva gemini ' + modelo + ' ' + r.status + (chamadas.length ? ' ferramenta ' + chamadas.map(c => c.functionCall.name).join(',') : t ? ' ok' : ' vazio ' + JSON.stringify(d.error || '').slice(0, 80)));
        if (!r.ok) break;
        if (!chamadas.length) { if (t) return limpa(t); break; }
        if (chamadas.some(c => c.functionCall.name === 'nao_responder')) return [];
        conteudo.push({ role: 'model', parts });
        const respostas = [];
        for (const c of chamadas) respostas.push({ functionResponse: { name: c.functionCall.name, response: { resultado: String(await executar({ name: c.functionCall.name, input: c.functionCall.args || {} }, ctx.fone, ctx.nome, env)) } } });
        conteudo.push({ role: 'user', parts: respostas });
      } catch (e) { await passo(env, 'reserva gemini erro ' + String(e).slice(0, 100)); break; }
    }
  }
  try {
    if (!env.AI) return null;
    const r = await env.AI.run(env.MODELO_RESERVA_CF || '@cf/meta/llama-3.3-70b-instruct-fp8-fast', { messages: [{ role: 'system', content: SISTEMA.slice(0, 20000) + REGRAS_RESERVA }, ...hist], max_tokens: 400 });
    const t = String((r && (r.response || (r.choices && r.choices[0] && r.choices[0].message && r.choices[0].message.content) || (r.result && r.result.response))) || '').trim();
    await passo(env, 'reserva workers-ai ' + (t ? 'ok' : 'vazio'));
    return t ? limpa(t) : null;
  } catch (e) { await passo(env, 'reserva erro ' + String(e).slice(0, 120)); return null; }
}

async function alertaFalhaIA(env, status, d, conversa) {
  try {
    const msg = String((d && d.error && d.error.message) || '');
    const motivo = /credit balance/i.test(msg) ? 'acabou o crédito da API da Anthropic (console.anthropic.com > Plans & Billing)' : /overloaded/i.test(msg) || status === 529 ? 'a Anthropic está sobrecarregada (erro ' + status + '), costuma voltar sozinha em minutos' : status === 429 ? 'passou do limite de uso da API (erro 429)' : 'a API da Anthropic respondeu erro ' + status + (msg ? ' (' + msg.slice(0, 80) + ')' : '');
    // 20/11 (pedido do Victor): guarda cada conversa de cliente que ficou sem a IA principal, para o alerta dizer quem está em aberto.
    if (conversa && conversa.fone) {
      const ult = [...(conversa.hist || [])].reverse().find(h => h.role === 'user');
      const txt = ult ? (typeof ult.content === 'string' ? ult.content : JSON.stringify(ult.content)) : '';
      await env.WG.put('aberta:' + conversa.fone, JSON.stringify({ nome: conversa.nome || 'sem nome', final: String(conversa.fone).slice(-4), quando: agora(), pergunta: txt.replace(/\s+/g, ' ').slice(0, 110), resposta: conversa.planoB ? 'plano B respondeu (resposta simples, confira)' : 'ninguém respondeu, só o "já já te respondo"' }), { expirationTtl: 86400 });
    }
    if (!env.ADMIN_FONE || (await env.WG.get('alerta:ia'))) return;
    await env.WG.put('alerta:ia', '1', { expirationTtl: 1800 });
    const l = await env.WG.list({ prefix: 'aberta:' });
    const abertas = [];
    for (const k of l.keys.slice(0, 15)) { try { abertas.push(JSON.parse(await env.WG.get(k.name))); } catch {} }
    let texto = '⚠️ Agente do WhatsApp sem cérebro agora.\nPor quê: ' + motivo + '.\nO plano B grátis (Gemini e, se ele falhar, a IA do Cloudflare) responde no lugar.';
    if (abertas.length) {
      texto += '\n\nConversas em aberto (' + l.keys.length + '):\n' + abertas.map((a, n) => `${n + 1}. ${a.nome} (final ${a.final}) · ${a.quando}\n   Mandou: "${a.pergunta}"\n   Situação: ${a.resposta}`).join('\n');
      texto += '\n\nResponda pelo celular no (31) 99329-4274 procurando pelo final do número. A conversa sai da lista quando a IA principal voltar a responder a pessoa.';
    } else texto += '\n\nNenhuma conversa de cliente em aberto agora (o erro veio de uma mensagem sua ou de teste).';
    await mandarVictor(env.ADMIN_FONE, texto, env);
  } catch {}
}

async function passo(env, txt) {
  try { const l = JSON.parse((await env.WG.get('diag:passos')) || '[]'); l.push(new Date().toISOString().slice(11, 19) + ' ' + txt); await env.WG.put('diag:passos', JSON.stringify(l.slice(-40)), { expirationTtl: 7 * 86400 }); } catch {}
}

// ---- Leitura pela YCloud (webhook POST /yc) ----
// Cabeçalho YCloud-Signature: t=<timestamp>,s=<hex>; assinatura = HMAC-SHA256("<t>.<corpo>", segredo do endpoint).
async function assinaturaYC(corpo, cab, segredo) {
  if (!segredo || !cab) return false;
  const p = Object.fromEntries(String(cab).split(',').map(x => x.trim().split('=')));
  if (!p.t || !p.s) return false;
  if (Math.abs(Date.now() / 1000 - Number(p.t)) > 600) return false;
  const chave = await crypto.subtle.importKey('raw', new TextEncoder().encode(segredo), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', chave, new TextEncoder().encode(p.t + '.' + corpo));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('') === p.s;
}

async function processarYC(ev, env) {
  // Avisos de status (entregue, lido) não gravam nada: o KV grátis tem limite de 1.000 gravações por dia e eles chegam aos montes.
  if (ev.type === 'whatsapp.message.updated' || ev.type === 'contact.attributes_changed') return;
  await env.WG.put('diag:yc', JSON.stringify({ quando: new Date().toISOString(), tipo: ev.type }), { expirationTtl: 7 * 86400 });
  if (/message/.test(ev.type || '')) await passo(env, 'yc evento ' + ev.type + (ev.inboxMessage ? ' ' + ev.inboxMessage.direction : ''));
  const sem = s => String(s || '').replace(/\D/g, '');
  // A YCloud manda CADA mensagem do cliente duas vezes ao mesmo tempo: whatsapp.inbound_message.received e
  // inbox.message.created. O KV não é instantâneo, então o 'visto' não segura as duas e a resposta saía duplicada (19/11).
  // Por isso só a inbox.message.created (direction inbound) é usada; a outra é ignorada.
  const entrada = (ev.type === 'inbox.message.created' && ev.inboxMessage && ev.inboxMessage.direction === 'inbound') ? ev.inboxMessage.inbound : null;
  if (entrada) {
    const m = entrada || {};
    if (env.YC_FROM && !mesmoFone(m.to, env.YC_FROM)) return;
    const msg = { ...m, id: m.wamid || m.id, from: sem(m.from) };
    const nome = ((m.customerProfile || {}).name || '').split(' ')[0];
    return receber(msg, nome, env);
  }
  if (ev.type === 'whatsapp.smb.message.echoes') {
    // Mensagem que a equipe mandou pelo app do celular (coexistência)
    const m = ev.whatsappMessage || {};
    if (env.YC_FROM && !mesmoFone(m.from, env.YC_FROM)) return;
    return ecoHumano({ ...m, to: sem(m.to) }, env);
  }
}

async function baixarYC(midia, env) {
  try {
    const r = await fetch(midia.link, { headers: { 'X-API-Key': env.YC_KEY } });
    if (!r.ok) return null;
    const buf = await r.arrayBuffer();
    if (buf.byteLength > 4_500_000) return null;
    let s = ''; const b = new Uint8Array(buf); for (let i = 0; i < b.length; i += 32768) s += String.fromCharCode(...b.subarray(i, i + 32768));
    return { tipo: midia.mime_type || r.headers.get('content-type') || 'image/jpeg', b64: btoa(s) };
  } catch { return null; }
}
