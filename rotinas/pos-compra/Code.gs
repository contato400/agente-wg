/**
 * Régua de e-mails pós-compra do Krav Magá Caveira (grátis, Gmail do Luis corinthiano).
 * Escrito em 20/11/2026 (decisão do Victor: só e-mail, grátis).
 *
 * Como funciona: todo dia às 10h, para cada etapa (D+1, D+7, D+15, D+30, D+45, D+90),
 * busca na Greenn e na Hotmart quem teve compra aprovada naquele dia e manda o e-mail da etapa.
 * Não grava nome nem e-mail de cliente em lugar nenhum: lê na hora e manda.
 *
 * Instalar (Victor, 5 min):
 * 1. script.google.com > Novo projeto > nome "WG pós-compra" > colar este arquivo.
 * 2. Configurações do projeto > Propriedades do script > adicionar:
 *    GREENN_TOKEN, HOTMART_CLIENT_ID, HOTMART_CLIENT_SECRET, HOTMART_BASIC (os mesmos do agente).
 * 3. Rodar a função `teste` uma vez (autorizar o Gmail). Ela manda os 6 e-mails de exemplo só para o Luis corinthiano.
 * 4. Rodar `instalar` uma vez: cria o gatilho diário das 10h.
 * Para parar: rodar `desinstalar`.
 */

var SITE = 'https://www.wesleygimenez.com.br/';
var WA = 'https://wa.me/5531993294274?text=';
var ACADEMIA = 'https://kravmagacaveira.cademi.com.br';
var ETAPAS = [1, 7, 15, 30, 45, 90];
var LIMITE_DIA = 90; // a conta comum do Gmail manda cerca de 100 por dia

// Próximo curso por produto (Greenn: id do produto; Hotmart: palavra no nome)
var PROXIMO = {
  '31865': 'protocolo-vida-segura',      // DPC 2.0 -> Vida Segura
  '28504': 'protocolo-vida-segura',      // Contra Ataque Feminino -> Vida Segura
  '158493': 'dpc',                       // Vida Segura -> DPC 2.0
  '28501': 'jiu-jitsu-x-krav-maga-rua',  // Briga de Rua
  '28513': 'jiu-jitsu-x-krav-maga-rua',  // Defesa de Socos
  '28503': 'jiu-jitsu-x-krav-maga-rua',  // Socos Iniciantes
  '28497': 'jiu-jitsu-x-krav-maga-rua',  // Socos Avançados
  '29627': 'jiu-jitsu-x-krav-maga-rua',  // Seminários
  '28502': 'dpc',                        // Lâminas -> DPC 2.0
  '28491': 'combate-sobrevivencia-laminas' // Jiu Jitsu x Krav -> Lâminas
};
var NOMES = {
  'protocolo-vida-segura': 'Protocolo Vida Segura',
  'dpc': 'Defesa Pessoal Caveira 2.0',
  'jiu-jitsu-x-krav-maga-rua': 'Jiu Jitsu x Krav Magá para Rua',
  'combate-sobrevivencia-laminas': 'Combate e Sobrevivência com Lâminas',
  'guia/trilha-12-semanas': 'Guia de Treino: Trilha de 12 Semanas',
  'catalogo': 'Catálogo de treinamentos'
};
var BLACK = ['201654', '202271', '202274', '204640']; // Black: já tem todos os cursos, recebe só D+1 e D+7
var IGNORAR = ['28506', '31884', '73212', '64571'];   // Comunidade e assinaturas: fora da régua

function proximo(prodId, nome) {
  prodId = String(prodId || '');
  if (BLACK.indexOf(prodId) >= 0 || /black/i.test(nome || '')) return 'guia/trilha-12-semanas';
  if (PROXIMO[prodId]) return PROXIMO[prodId];
  var n = (nome || '').toLowerCase();
  if (/l[aâ]mina/.test(n)) return 'dpc';
  if (/briga|soco|semin/.test(n)) return 'jiu-jitsu-x-krav-maga-rua';
  if (/vida segura|protocolo/.test(n)) return 'dpc';
  if (/feminin|mulher/.test(n)) return 'protocolo-vida-segura';
  return 'catalogo';
}

function link(pagina, etapa) {
  return SITE + pagina + '?utm_source=vc&utm_medium=email&utm_campaign=pos-compra&utm_content=d' + etapa + '&utm_term=ag-ofertas';
}
function zap(t) { return WA + encodeURIComponent(t); }
function primeiroNome(n) { n = String(n || '').trim().split(/\s+/)[0] || ''; return n ? n.charAt(0).toUpperCase() + n.slice(1).toLowerCase() : ''; }

// ---------- textos (sem travessão, linguagem simples) ----------
function email(etapa, nome, produto, prox) {
  var oi = 'Shalom' + (nome ? ', ' + nome : '') + ', tudo bem?';
  var fim = '<p>Tamo junto, Caveira!<br>Mestre Wesley Gimenez</p>';
  var botaoZap = '<p><a href="' + zap('Shalom! Comprei o ' + produto + ' e quero uma ajuda.') + '">Falar com a equipe no WhatsApp</a></p>';
  var nomeProx = NOMES[prox] || 'próximo treinamento';
  var b = function (t, u) { return '<p><a href="' + u + '" style="display:inline-block;background:#19a34a;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold">' + t + '</a></p>'; };
  var T = {
    1: ['Seu primeiro passo no ' + produto,
      '<p>' + oi + '</p><p>Que bom ter você com a gente. Seu acesso ao <b>' + produto + '</b> já está na área do aluno. É só entrar com o e-mail da compra.</p>' +
      '<p>Meu conselho: assista hoje a primeira aula, mesmo que seja só 10 minutos. Quem começa no primeiro dia termina o curso.</p>' +
      b('Entrar na área do aluno', ACADEMIA) + '<p>Não conseguiu entrar? Chama a gente que a equipe resolve na hora.</p>' + botaoZap + fim],
    7: ['Como está o seu treino?',
      '<p>' + oi + '</p><p>Já faz uma semana que você começou o <b>' + produto + '</b>. Qual aula você já fez?</p>' +
      '<p>Se ainda não conseguiu começar, tudo bem. Escolhe só uma aula e treina 10 minutos hoje. A técnica só funciona na hora do aperto se o corpo já repetiu antes.</p>' +
      b('Continuar meu treino', ACADEMIA) + '<p>Ficou com dúvida em alguma técnica? Me conta pelo WhatsApp.</p>' + botaoZap + fim],
    15: ['O próximo passo depois do ' + produto,
      '<p>' + oi + '</p><p>Você já deu o primeiro passo com o <b>' + produto + '</b>. Muitos alunos me perguntam o que treinar depois, e a minha resposta para você é o <b>' + nomeProx + '</b>.</p>' +
      '<p>Ele completa o que você já está aprendendo, para você estar preparado em mais situações do dia a dia.</p>' +
      b('Conhecer o ' + nomeProx, link(prox, 15)) + '<p>Garantia de 7 dias e certificado ao terminar.</p>' + botaoZap + fim],
    30: ['Um mês de treino: o que muda',
      '<p>' + oi + '</p><p>Faz um mês que você entrou para o Método Caveira. Quem treina um pouco toda semana já sente diferença: anda mais atento na rua, reage com mais calma e confia mais em si.</p>' +
      '<p>Se quiser ir além, o próximo treinamento que eu indico para você é o <b>' + nomeProx + '</b>.</p>' +
      b('Ver o ' + nomeProx, link(prox, 30)) + '<p>Quer me contar como está sendo? Responde pelo WhatsApp. A sua história pode ajudar outro aluno.</p>' + botaoZap + fim],
    45: ['Ainda dá tempo de completar o seu treino',
      '<p>' + oi + '</p><p>Passando para lembrar: o <b>' + nomeProx + '</b> é o passo seguinte para quem fez o ' + produto + '.</p>' +
      '<p>Você treina pelo celular, no seu ritmo, com garantia de 7 dias. Se não for para você, é só pedir o dinheiro de volta dentro do prazo.</p>' +
      b('Garantir o ' + nomeProx, link(prox, 45)) + botaoZap + fim],
    90: ['Todos os treinamentos do Mestre em um só lugar',
      '<p>' + oi + '</p><p>Já são três meses de Método Caveira. Para quem quer ver tudo o que eu ensino, separei o catálogo com todos os treinamentos, para você escolher o que faz mais sentido agora.</p>' +
      b('Ver o catálogo', link('catalogo', 90)) + '<p>Se tiver dúvida de qual escolher, chama a equipe que a gente te ajuda.</p>' + botaoZap + fim]
  };
  return T[etapa];
}

// ---------- fontes de compras (lê na hora, não grava) ----------
function dia(n) { var d = new Date(); d.setDate(d.getDate() - n); return Utilities.formatDate(d, 'America/Sao_Paulo', 'yyyy-MM-dd'); }

function comprasGreenn(data) {
  var tk = PropertiesService.getScriptProperties().getProperty('GREENN_TOKEN'); if (!tk) return [];
  var H = { headers: { Authorization: 'Bearer ' + tk, accept: 'application/json' }, muteHttpExceptions: true };
  var out = [], pg = 1, ult = 1;
  do {
    var r = UrlFetchApp.fetch('https://apiadm.greenn.com.br/api/v1/sales?per_page=100&page=' + pg + '&filter%5Bstatus%5D=paid&filter%5Bpaid_after%5D=' + data + '&filter%5Bpaid_before%5D=' + data, H);
    var j = JSON.parse(r.getContentText() || '{}');
    (j.data || []).forEach(function (v) {
      if (IGNORAR.indexOf(String(v.product_id)) >= 0 || v.type === 'SUBSCRIPTION') return;
      var d = JSON.parse(UrlFetchApp.fetch('https://apiadm.greenn.com.br/api/v1/sales/' + v.id, H).getContentText() || '{}').data || {};
      var c = d.client || {};
      if (c.email) out.push({ email: String(c.email).toLowerCase(), nome: c.name, prod: v.product_id, produto: (d.product || {}).name || 'treinamento' });
    });
    ult = (j.meta || {}).last_page || 1; pg++;
  } while (pg <= ult && pg <= 5);
  return out;
}

function comprasHotmart(data) {
  var P = PropertiesService.getScriptProperties();
  if (!P.getProperty('HOTMART_BASIC')) return [];
  var a = UrlFetchApp.fetch('https://api-sec-vlc.hotmart.com/security/oauth/token?grant_type=client_credentials&client_id=' + encodeURIComponent(P.getProperty('HOTMART_CLIENT_ID')) + '&client_secret=' + encodeURIComponent(P.getProperty('HOTMART_CLIENT_SECRET')),
    { method: 'post', headers: { Authorization: 'Basic ' + P.getProperty('HOTMART_BASIC') }, contentType: 'application/json', muteHttpExceptions: true });
  var tk = (JSON.parse(a.getContentText() || '{}')).access_token; if (!tk) return [];
  var ini = new Date(data + 'T00:00:00-03:00').getTime(), fim = ini + 86400000 - 1;
  var r = UrlFetchApp.fetch('https://developers.hotmart.com/payments/api/v1/sales/history?max_results=100&transaction_status=APPROVED&start_date=' + ini + '&end_date=' + fim, { headers: { Authorization: 'Bearer ' + tk }, muteHttpExceptions: true });
  var j = JSON.parse(r.getContentText() || '{}');
  return (j.items || []).map(function (it) {
    var b = it.buyer || {}, p = it.product || {};
    return b.email ? { email: String(b.email).toLowerCase(), nome: b.name, prod: 'h' + p.id, produto: p.name || 'treinamento' } : null;
  }).filter(Boolean);
}

// ---------- rotina ----------
function rodar() {
  var enviados = 0;
  ETAPAS.forEach(function (n) {
    var data = dia(n), vistos = {};
    var lista = comprasGreenn(data).concat(comprasHotmart(data));
    lista.forEach(function (c) {
      if (vistos[c.email] || enviados >= LIMITE_DIA) return; vistos[c.email] = 1;
      var prox = proximo(String(c.prod).replace(/^h/, ''), c.produto);
      if (prox === 'guia/trilha-12-semanas' && n > 7) return; // quem tem a Black já tem os 23 cursos: só recebe D+1 e D+7
      var e = email(n, primeiroNome(c.nome), c.produto, prox); if (!e) return;
      MailApp.sendEmail({ to: c.email, subject: e[0], htmlBody: e[1], name: 'Mestre Wesley Gimenez' });
      enviados++;
    });
  });
  console.log('pós-compra: ' + enviados + ' e-mails');
}

function teste() {
  var eu = Session.getActiveUser().getEmail();
  ETAPAS.forEach(function (n) { var e = email(n, 'Victor', 'Defesa Pessoal Caveira 2.0', 'protocolo-vida-segura'); MailApp.sendEmail({ to: eu, subject: '[TESTE D+' + n + '] ' + e[0], htmlBody: e[1], name: 'Mestre Wesley Gimenez' }); });
}
function instalar() { desinstalar(); ScriptApp.newTrigger('rodar').timeBased().atHour(10).everyDays(1).inTimezone('America/Sao_Paulo').create(); }
function desinstalar() { ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'rodar') ScriptApp.deleteTrigger(t); }); }
