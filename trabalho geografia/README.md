# SEM CACHE NO PLANETA — Campanha de Conscientização (UTFPR Campo Mourão)

Projeto desenvolvido para a disciplina de **Geografia I** — Curso Técnico Integrado em **Informática para Internet** (UTFPR – Campus Campo Mourão, 4º Bimestre / 2026).

## Arquitetura de Arquivos (Modular & Blindada)
- `index.html`: Estrutura semântica HTML5 com diretivas de Content Security Policy (CSP), zero scripts/estilos inline e `Referrer-Policy: no-referrer`.
- `styles.css`: Design system responsivo com modo Escuro/Claro e utilitários CSS (eliminando a necessidade de `style=""` inline).
- `security.js`: Camada dedicada de segurança (*Defense in Depth*) contendo:
  - Proteção anti-clickjacking (*Frame-Busting Guard*);
  - Parser JSON seguro contra *Prototype Pollution* (`__proto__`, `constructor`, `prototype`);
  - Validação estrita por listas brancas (*Allowlists*) e expressões regulares;
  - Assinatura de integridade FNV-1a duplo no `localStorage` para detectar adulteração de dados;
  - *Rate limiter* anti-spam e bloqueio de duplicatas no Mural de Compromissos;
  - Gerador de **QR Code 100% offline** em SVG puro (ISO/IEC 18004), eliminando vazamento de URL para APIs externas;
  - Blindagem de imutabilidade via `Object.freeze()`.
- `app.js`: Lógica interativa construída 100% com DOM APIs seguras (`createElement`, `textContent`, `replaceChildren`) — zero uso de `innerHTML`.
- `_headers` e `vercel.json`: Configurações prontas de cabeçalhos HTTP de segurança (`X-Frame-Options: DENY`, `HSTS`, `Permissions-Policy`, `CSP frame-ancestors 'none'`) para hospedagem gratuita no Netlify, Cloudflare Pages ou Vercel.
