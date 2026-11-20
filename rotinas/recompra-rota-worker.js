    // Recompra (20/11, F4): conta por client_id da Greenn quem voltou a comprar em 30, 60 e 90 dias. Só números, sem dado de cliente.
    if (url.pathname === '/recompra' && req.method === 'GET') {
      if (await env.WG.get('rc:teste')) return new Response('aguarde 60 s', { status: 429 });
      await env.WG.put('rc:teste', '1', { expirationTtl: 60 });
      const desde = url.searchParams.get('desde') || '2026-05-01';
      const H = { headers: { Authorization: 'Bearer ' + env.GREENN_TOKEN, accept: 'application/json' } };
      const vendas = []; let pg = 1, ult = 1;
      do {
        const r = await fetch('https://apiadm.greenn.com.br/api/v1/sales?per_page=100&page=' + pg + '&sort=created_at&filter%5Bstatus%5D=paid&filter%5Bcreated_after%5D=' + desde, H);
        const j = await r.json().catch(() => ({}));
        if (!r.ok) return new Response(JSON.stringify({ erro: r.status, pagina: pg }), { status: 502 });
        for (const v of (j.data || [])) if (v.type !== 'SUBSCRIPTION' || !v.sign_renew) vendas.push([v.client_id, Date.parse(v.paid_at || v.created_at), v.product_id, v.total_cents || 0]);
        ult = (j.meta || {}).last_page || 1; pg++;
      } while (pg <= ult && pg <= 40);
      const pc = {}; for (const v of vendas) (pc[v[0]] = pc[v[0]] || []).push(v);
      const D = 86400000, hoje = Date.now(); const out = { desde, vendas: vendas.length, compradores: 0, recompra: { d30: 0, d60: 0, d90: 0, total: 0 }, base: { d30: 0, d60: 0, d90: 0 }, receita_recompra: 0, pares: {} };
      for (const id in pc) {
        const l = pc[id].sort((a, b) => a[1] - b[1]); out.compradores++;
        const t0 = l[0][1]; const dia0 = new Date(t0 - 3 * 3600000).toISOString().slice(0, 10);
        const depois = l.filter(x => new Date(x[1] - 3 * 3600000).toISOString().slice(0, 10) !== dia0);
        for (const [k, n] of [['d30', 30], ['d60', 60], ['d90', 90]]) {
          if (hoje - t0 >= n * D) { out.base[k]++; if (depois.some(x => x[1] - t0 <= n * D)) out.recompra[k]++; }
        }
        if (depois.length) { out.recompra.total++; out.receita_recompra += depois.reduce((s, x) => s + x[3], 0); const par = l[0][2] + '>' + depois[0][2]; out.pares[par] = (out.pares[par] || 0) + 1; }
      }
      out.receita_recompra = out.receita_recompra / 100;
      out.pares = Object.entries(out.pares).sort((a, b) => b[1] - a[1]).slice(0, 15);
      return new Response(JSON.stringify(out), { headers: { 'content-type': 'application/json' } });
    }
