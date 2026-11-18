// Agente WG · atendimento 24h do WhatsApp oficial (31) 97334-6056
// Cloudflare Worker. Recebe o webhook da Meta, responde com o Claude e envia pela API do WhatsApp.
// Variáveis (Settings > Variables): PHONE_ID, WABA_ID, MODO ("teste" ou "ativo"), TESTE_FONES (lista com vírgula), ADMIN_FONE, MODELO, MODELO_CHEFE
// Segredos (Settings > Variables > Encrypt): WA_TOKEN, APP_SECRET, ANTHROPIC_API_KEY, VERIFY_TOKEN
// KV (binding): WG

const GRAPH = 'https://graph.facebook.com/v23.0';
const ESPERA_MS = 7000;             // junta mensagens seguidas antes de responder
const HUMANO_TTL = 2 * 3600;        // humano respondeu pelo celular: agente fica quieto 2 h
const HIST_MAX = 24;

const CONHECIMENTO = __CONHECIMENTO__;

const SISTEMA = `Você é o assistente virtual da equipe do Mestre Wesley Gimenez (Krav Magá Caveira) no WhatsApp oficial de suporte, (31) 97334-6056. Responda sempre em português do Brasil, como uma pessoa da equipe, em mensagens curtas de WhatsApp (1 a 4 linhas, no máximo 2 mensagens). Nunca use travessão (—). Primeira mensagem da conversa começa com "Shalom, tudo bem?". Linguagem simples, para qualquer idade. Garantia: 7 dias em todos os produtos. Todo link de compra leva utm_source=vc&utm_medium=whatsapp&utm_campaign=atendimento&utm_term=ag-atendimento. Nunca invente preço, link, prazo, bônus ou resultado: use só o que está no conhecimento abaixo. Se não souber, diga que vai confirmar com a equipe e use a ferramenta passar_para_humano.

Você ainda NÃO consegue consultar compras nas plataformas. Para problema de acesso: peça o e-mail da compra, oriente olhar spam e promoções, mande o link da Academia https://kravmagacaveira.cademi.com.br/ e o "esqueci minha senha". Se mesmo assim não resolver, use passar_para_humano com o produto e o resumo (sem o e-mail no resumo).

Use as ferramentas:
- passar_para_humano: reembolso, cancelamento, cobrança em duplicidade, cliente irritado, desconto fora da tabela, parceria/imprensa, compra não encontrada depois de 2 tentativas, qualquer coisa que você não consiga resolver. Depois de chamar, diga à pessoa que a equipe vai assumir a conversa e responde em horário comercial.
- Em situação de risco real agora (ameaça, violência acontecendo): mande ligar 190 imediatamente e chame passar_para_humano.

CONHECIMENTO DA OPERAÇÃO:
${CONHECIMENTO}`;

const FERRAMENTAS = [{
  name: 'passar_para_humano',
  description: 'Passa a conversa para a equipe humana e avisa o Victor. O agente para de responder nesta conversa.',
  input_schema: { type: 'object', properties: {
    motivo: { type: 'string', enum: ['reembolso', 'cancelamento', 'cobranca', 'irritado', 'desconto', 'compra_nao_encontrada', 'parceria', 'risco', 'outro'] },
    resumo: { type: 'string', description: 'Uma ou duas frases do que a pessoa precisa. Sem telefone, e-mail ou CPF.' },
    produto: { type: 'string' }
  }, required: ['motivo', 'resumo'] }
}];

export default {
  async fetch(req, env, ctx) {
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
    if (req.method === 'GET' && url.pathname === '/') return new Response('Agente WG no ar. Modo: ' + (env.MODO || 'teste'));
    if (req.method !== 'POST' || url.pathname !== '/webhook') return new Response('ok');

    const corpo = await req.text();
    if (!(await assinaturaOk(corpo, req.headers.get('x-hub-signature-256'), env.APP_SECRET))) return new Response('assinatura', { status: 401 });
    let dados; try { dados = JSON.parse(corpo); } catch { return new Response('ok'); }
    ctx.waitUntil(processar(dados, env).catch(e => console.log('erro', e && e.stack || e)));
    return new Response('ok');
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
  if (await env.WG.get('visto:' + m.id)) return;            // a Meta pode reenviar o mesmo evento
  await env.WG.put('visto:' + m.id, '1', { expirationTtl: 86400 });

  const admin = mesmoFone(de, env.ADMIN_FONE);
  if ((env.MODO || 'teste') !== 'ativo' && !admin && !(env.TESTE_FONES || '').split(',').some(t => mesmoFone(t, de))) return;
  if (!admin && (await env.WG.get('pausa:' + de) || await env.WG.get('humano:' + de))) return;

  const conteudo = await paraConteudo(m, env);
  if (!conteudo) return;
  await addHist(env, de, { role: 'user', content: conteudo });
  await marcarLido(m.id, env);

  await env.WG.put('ultima:' + de, m.id, { expirationTtl: 600 });
  await new Promise(r => setTimeout(r, ESPERA_MS));
  if ((await env.WG.get('ultima:' + de)) !== m.id) return;  // chegou mensagem mais nova: ela responde por todas

  const hist = await getHist(env, de);
  const resposta = await pensar(hist, nome, de, admin, env);
  for (const t of resposta) { await enviar(de, t, env); await addHist(env, de, { role: 'assistant', content: t }); }
}

async function paraConteudo(m, env) {
  if (m.type === 'text') return m.text.body;
  if (m.type === 'button') return m.button.text;
  if (m.type === 'interactive') return (m.interactive.button_reply || m.interactive.list_reply || {}).title || '';
  if (m.type === 'image') {
    const img = await baixarMidia(m.image.id, env);
    const partes = [];
    if (img) partes.push({ type: 'image', source: { type: 'base64', media_type: img.tipo, data: img.b64 } });
    partes.push({ type: 'text', text: m.image.caption || '[a pessoa mandou esta imagem]' });
    return partes;
  }
  if (m.type === 'audio') return '[a pessoa mandou um áudio que você não consegue ouvir; peça com carinho para escrever em texto]';
  if (m.type === 'order') return '[a pessoa enviou um pedido pelo catálogo do WhatsApp: ' + JSON.stringify(m.order.product_items || []) + ']';
  if (m.type === 'document') return '[a pessoa mandou um documento: ' + (m.document.filename || '') + ']';
  return null;
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

async function pensar(hist, nome, fone, admin, env) {
  const extra = admin ? '\n\nATENÇÃO: quem está falando é o Victor, responsável pela operação. Trate como chefe: responda de forma direta, sem tom de venda, e não use a ferramenta passar_para_humano.' : `\n\nPrimeiro nome no perfil do WhatsApp: ${nome || 'não informado'} (use só se parecer um nome de verdade).`;
  const msgs = juntar(hist);
  for (let volta = 0; volta < 3; volta++) {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: admin ? (env.MODELO_CHEFE || 'claude-fable-5-2') : (env.MODELO || 'claude-sonnet-5-5'), max_tokens: 700,
        system: [{ type: 'text', text: SISTEMA, cache_control: { type: 'ephemeral' } }, { type: 'text', text: extra }],
        tools: admin ? [] : FERRAMENTAS, messages: msgs,
      })
    });
    const d = await r.json();
    if (!r.ok) { console.log('anthropic', JSON.stringify(d)); return ['Shalom! Recebi sua mensagem e já já te respondo. Tamo junto, Caveira!']; }
    const usos = (d.content || []).filter(c => c.type === 'tool_use');
    const textos = (d.content || []).filter(c => c.type === 'text').map(c => c.text.trim()).filter(Boolean);
    if (!usos.length) return dividir(textos.join('\n\n'));
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
  return 'ferramenta desconhecida';
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

async function getHist(env, fone) { try { return JSON.parse(await env.WG.get('hist:' + fone) || '[]'); } catch { return []; } }
async function addHist(env, fone, item) {
  const h = await getHist(env, fone);
  if (Array.isArray(item.content)) item = { role: item.role, content: item.content.map(c => c.type === 'image' ? { type: 'text', text: '[imagem enviada]' } : c) };
  h.push(item);
  await env.WG.put('hist:' + fone, JSON.stringify(h.slice(-HIST_MAX)), { expirationTtl: 7 * 86400 });
}

async function marcarLido(id, env) {
  await fetch(`${GRAPH}/${env.PHONE_ID}/messages`, { method: 'POST', headers: { Authorization: `Bearer ${env.WA_TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', status: 'read', message_id: id, typing_indicator: { type: 'text' } }) }).catch(() => {});
}

async function enviar(para, texto, env) {
  const r = await fetch(`${GRAPH}/${env.PHONE_ID}/messages`, { method: 'POST', headers: { Authorization: `Bearer ${env.WA_TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to: para, type: 'text', text: { body: texto, preview_url: true } }) });
  if (!r.ok) console.log('envio', r.status, await r.text());
}
