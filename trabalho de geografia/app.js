/* =========================================================
   SEM CACHE NO PLANETA — MÓDULO INTERATIVO HARDENED (ES6+)
   UTFPR – Campus Campo Mourão | Geografia I (2026)
   Zero innerHTML • Zero APIs externas • Validação rigorosa
   ========================================================= */

(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavigationAndScroll();
    initRevealObserver();
    initXraySimulator();
    initImpactCalculator();
    initAccordion();
    initQuiz();
    initPledgeBoard();
    initShareAndQrModal();
  });

  /* -------------------------------------------------------
     HELPER DE CRIAÇÃO SEGURA DE ELEMENTOS DOM
     ------------------------------------------------------- */
  function createEl(tag, className, textContent) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (typeof textContent === 'string') el.textContent = textContent;
    return el;
  }

  /* -------------------------------------------------------
     1. TEMA CLARO / ESCURO VALIDADO
     ------------------------------------------------------- */
  function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('themeIconSun');
    const moonIcon = document.getElementById('themeIconMoon');
    const htmlEl = document.documentElement;

    const rawTheme = localStorage.getItem('utfpr_campanha_theme');
    const savedTheme = window.SecurityGuard.validateTheme(rawTheme);
    applyTheme(savedTheme);

    function applyTheme(theme) {
      const safeTheme = window.SecurityGuard.validateTheme(theme);
      htmlEl.setAttribute('data-theme', safeTheme);
      localStorage.setItem('utfpr_campanha_theme', safeTheme);
      if (safeTheme === 'light') {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      }
    }

    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* -------------------------------------------------------
     2. MENU MOBILE, BARRA DE LEITURA E SCROLL SPY
     ------------------------------------------------------- */
  function initNavigationAndScroll() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const progressBar = document.getElementById('readingProgress');
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[data-nav]');

    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;
      progressBar.style.width = `${pct}%`;

      let currentSection = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 130;
        if (scrollTop >= top) {
          currentSection = sec.getAttribute('id');
        }
      });

      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('data-nav') === currentSection);
      });
    }, { passive: true });
  }

  /* -------------------------------------------------------
     3. ANIMAÇÕES DE REVELAÇÃO AO ROLAR
     ------------------------------------------------------- */
  function initRevealObserver() {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  }

  /* -------------------------------------------------------
     4. SIMULADOR RAIO-X (100% DOM API — ZERO innerHTML)
     ------------------------------------------------------- */
  function initXraySimulator() {
    const itemsData = Object.freeze({
      copo: {
        title: 'Copo Plástico Descartável (Polipropileno - PP)',
        useTime: '~3 minutos',
        decayTime: '+400 anos',
        climateImpact: 'Derivado de petróleo; exige refino petroquímico e gera microplásticos.',
        whyRecycleFails: 'Por ser muito leve e ter baixo valor comercial para cooperativas, quase nunca é coletado para reciclagem e acaba em aterros ou bueiros.',
        solution: 'Substitua por uma garrafa ou caneca reutilizável fixa na mochila. Um único estudante evita cerca de 600 copos por ano letivo na UTFPR.'
      },
      delivery: {
        title: 'Embalagem de Delivery + Talheres Plásticos',
        useTime: '~20 minutos',
        decayTime: '200 a 450 anos',
        climateImpact: 'Combina plástico/isopor fóssil com emissões do transporte motorizado.',
        whyRecycleFails: 'Embalagens engorduradas com restos de comida contaminam o lote reciclável e são descartadas como rejeito na triagem.',
        solution: 'Marque "não enviar talheres descartáveis" nos aplicativos, prefira refeições no RU e leve seu próprio pote quando possível.'
      },
      fastfashion: {
        title: 'Camiseta de Fast Fashion (Poliéster / Algodão Intensivo)',
        useTime: 'Poucos meses',
        decayTime: '+200 anos (sintéticos)',
        climateImpact: 'A indústria têxtil responde por ~8% a 10% das emissões globais de carbono e alto consumo de água.',
        whyRecycleFails: 'Misturas de fibras (algodão + elastano/poliéster) dificultam a separação industrial; menos de 1% das roupas vira roupa nova.',
        solution: 'Aplique a regra das 72h antes de comprar por impulso, priorize brechós e participe de feiras de troca/escambo entre estudantes.'
      },
      papel: {
        title: 'Apostilas e Listas Impressas de Uso Único',
        useTime: '1 bimestre',
        decayTime: '3 a 6 meses (mas gera CH₄)',
        climateImpact: 'Exige celulose, água, branqueamento químico e emite metano (CH₄) ao se decompor sem oxigênio em aterros.',
        whyRecycleFails: 'Quando molhado, amassado ou misturado a lixo orgânico nas lixeiras comuns, perde a fibra aproveitável.',
        solution: 'Organize seus PDFs e anotações digitalmente e transforme folhas usadas de um lado em blocos de rascunho para cálculos e códigos.'
      },
      cabo: {
        title: 'Cabos USB e Fones Baratos de Baixa Durabilidade',
        useTime: '2 a 5 meses',
        decayTime: 'Indeterminado (metais + PVC)',
        climateImpact: 'Envolve mineração de cobre, estanho e plásticos clorados com alta pegada energética.',
        whyRecycleFails: 'Revestimentos plásticos fundidos aos fios finos tornam a desmontagem cara; muitos acabam no lixo comum liberando metais pesados.',
        solution: 'Evite acessórios ultra-baratos descartáveis, proteja os conectores e descarte eletrônicos quebrados apenas em pontos de coleta de e-lixo.'
      }
    });

    const tabs = document.querySelectorAll('.xray-tab');
    const display = document.getElementById('xrayDisplay');

    function renderItem(key) {
      const safeKey = Object.prototype.hasOwnProperty.call(itemsData, key) ? key : 'copo';
      const item = itemsData[safeKey];

      display.replaceChildren();

      const metricsList = createEl('div', 'xray-metrics-list');

      const box1 = createEl('div', 'xm-box');
      box1.append(createEl('span', '', 'Tempo médio de uso'), createEl('strong', '', item.useTime));

      const box2 = createEl('div', 'xm-box');
      box2.append(createEl('span', '', 'Tempo no ambiente'), createEl('strong', '', item.decayTime));

      const box3 = createEl('div', 'xm-box u-col-span-full');
      box3.append(
        createEl('span', '', 'Pegada Climática & Recursos'),
        createEl('strong', 'xm-impact-text', item.climateImpact)
      );

      metricsList.append(box1, box2, box3);

      const details = createEl('div', 'xray-details');
      details.appendChild(createEl('h4', '', item.title));

      const pReason = createEl('p');
      pReason.append(
        createEl('strong', '', 'Por que só reciclar não resolve: '),
        document.createTextNode(item.whyRecycleFails)
      );
      details.appendChild(pReason);

      const solBox = createEl('div', 'xray-solution');
      solBox.append(
        createEl('strong', '', 'Ação Inteligente (Reduzir & Reutilizar): '),
        document.createTextNode(item.solution)
      );
      details.appendChild(solBox);

      display.append(metricsList, details);
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        renderItem(tab.getAttribute('data-item'));
      });
    });

    renderItem('copo');
  }

  /* -------------------------------------------------------
     5. CALCULADORA COM LIMITES NUMÉRICOS BLINDADOS (CLAMP)
     ------------------------------------------------------- */
  function initImpactCalculator() {
    const cupsInput = document.getElementById('cupsInput');
    const deliveryInput = document.getElementById('deliveryInput');
    const impulseInput = document.getElementById('impulseInput');
    const bottlesInput = document.getElementById('bottlesInput');

    const cupsVal = document.getElementById('cupsVal');
    const deliveryVal = document.getElementById('deliveryVal');
    const impulseVal = document.getElementById('impulseVal');
    const bottlesVal = document.getElementById('bottlesVal');

    const resWasteKg = document.getElementById('resWasteKg');
    const resCupsCount = document.getElementById('resCupsCount');
    const resCo2Kg = document.getElementById('resCo2Kg');
    const resKmCar = document.getElementById('resKmCar');
    const resMoneySaved = document.getElementById('resMoneySaved');
    const calcDynamicTip = document.getElementById('calcDynamicTip');

    function updateCalculator() {
      const cupsPerDay = window.SecurityGuard.clampNumber(cupsInput.value, 0, 10, 3);
      const deliveryPerWeek = window.SecurityGuard.clampNumber(deliveryInput.value, 0, 10, 2);
      const impulsePerMonth = window.SecurityGuard.clampNumber(impulseInput.value, 0, 10, 2);
      const bottlesPerWeek = window.SecurityGuard.clampNumber(bottlesInput.value, 0, 14, 3);

      cupsVal.textContent = `${cupsPerDay} ${cupsPerDay === 1 ? 'copo/dia' : 'copos/dia'}`;
      deliveryVal.textContent = `${deliveryPerWeek} ${deliveryPerWeek === 1 ? 'pedido/sem' : 'pedidos/sem'}`;
      impulseVal.textContent = `${impulsePerMonth} ${impulsePerMonth === 1 ? 'compra/mês' : 'compras/mês'}`;
      bottlesVal.textContent = `${bottlesPerWeek} unid/sem`;

      const annualCups = cupsPerDay * 200;
      const annualDelivery = deliveryPerWeek * 52;
      const annualImpulse = impulsePerMonth * 12;
      const annualBottles = bottlesPerWeek * 52;

      const wasteKg = (annualCups * 0.003) + (annualDelivery * 0.14) + (annualImpulse * 0.45) + (annualBottles * 0.032);
      const co2Kg = (annualCups * 0.015) + (annualDelivery * 0.85) + (annualImpulse * 3.8) + (annualBottles * 0.16);
      const kmCar = Math.round(co2Kg / 0.19);
      const annualSpend = (annualDelivery * 12) + (annualImpulse * 65) + (annualBottles * 4.5);
      const savedHalf = annualSpend * 0.5;

      resWasteKg.textContent = `${wasteKg.toFixed(1).replace('.', ',')} kg`;
      resCupsCount.textContent = `${annualCups} copos plásticos/ano`;
      resCo2Kg.textContent = `${co2Kg.toFixed(1).replace('.', ',')} kg`;
      resKmCar.textContent = `Equivale a ~${kmCar.toLocaleString('pt-BR')} km rodados de carro`;
      resMoneySaved.textContent = `R$ ${savedHalf.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / ano`;

      if (wasteKg === 0) {
        calcDynamicTip.textContent = 'Excelente! Seu nível de geração de resíduos descartáveis está zerado. Compartilhe essa prática com seus colegas na UTFPR!';
      } else if (impulsePerMonth >= 3) {
        calcDynamicTip.textContent = 'Maior alavanca de mudança: suas compras online mensais lideram suas emissões. Adotar a regra das 72h pode cortar dezenas de kg de CO₂e e economizar centenas de reais.';
      } else if (cupsPerDay >= 3) {
        calcDynamicTip.textContent = `Ação rápida: levar uma garrafa reutilizável na mochila elimina ${annualCups} copos plásticos por ano na UTFPR.`;
      } else {
        calcDynamicTip.textContent = 'Boa base! Recusar embalagens e talheres extras no delivery já reduz drasticamente seu lixo plástico semanal.';
      }
    }

    [cupsInput, deliveryInput, impulseInput, bottlesInput].forEach(input => {
      input.addEventListener('input', updateCalculator);
    });

    updateCalculator();
  }

  /* -------------------------------------------------------
     6. ACORDEÃO DAS 5 QUESTÕES ORIENTADORAS
     ------------------------------------------------------- */
  function initAccordion() {
    const items = document.querySelectorAll('.acc-item');
    items.forEach(item => {
      const trigger = item.querySelector('.acc-trigger');
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => {
          i.classList.remove('open');
          i.querySelector('.acc-trigger').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* -------------------------------------------------------
     7. QUIZ INTERATIVO (100% DOM API — ZERO innerHTML)
     ------------------------------------------------------- */
  function initQuiz() {
    const quizData = Object.freeze([
      {
        question: '1. Durante as aulas e intervalos na UTFPR, como você costuma beber água ou café?',
        options: [
          {
            text: 'Sempre uso minha própria garrafa ou caneca reutilizável.',
            points: 1,
            feedback: 'Ótimo hábito! Você evita centenas de copos plásticos descartáveis por ano letivo.'
          },
          {
            text: 'Às vezes esqueço a garrafa e acabo pegando copos descartáveis.',
            points: 2,
            feedback: 'Quase lá! Deixar uma garrafa fixa na mochila resolve esse esquecimento no dia a dia.'
          },
          {
            text: 'Uso copos descartáveis todos os dias sem pensar duas vezes.',
            points: 3,
            feedback: 'Atenção: 3 copos por dia somam cerca de 600 copos plásticos por ano letivo — que levam séculos para se decompor.'
          }
        ]
      },
      {
        question: '2. Quando você pede lanches ou delivery na semana, o que acontece com as embalagens?',
        options: [
          {
            text: 'Recuso talheres/sachês descartáveis e priorizo refeições sem excesso de plástico.',
            points: 1,
            feedback: 'Perfeito! Recusar descartáveis na origem é muito mais eficaz do que tentar reciclá-los depois.'
          },
          {
            text: 'Peço delivery algumas vezes e tento separar o plástico depois.',
            points: 2,
            feedback: 'Separar ajuda, mas embalagens sujas de comida dificilmente são recicladas. Marque "sem talheres" nos apps!'
          },
          {
            text: 'Peço com frequência e jogo todas as embalagens e talheres no lixo comum.',
            points: 3,
            feedback: 'Impacto alto: embalagens descartáveis no lixo comum vão direto para aterros, onde contribuem para emissões de gases estufa.'
          }
        ]
      },
      {
        question: '3. Ao ver uma promoção online de roupas, periféricos ou acessórios em redes sociais, qual é sua reação?',
        options: [
          {
            text: 'Avalio se realmente preciso e espero alguns dias antes de decidir.',
            points: 1,
            feedback: 'Excelente! A pausa consciente bloqueia o gatilho da publicidade e evita resíduos futuros.'
          },
          {
            text: 'Compro ocasionalmente mesmo sem precisar muito, só pelo preço.',
            points: 2,
            feedback: 'O "barato por impulso" custa caro ao clima: toda encomenda envolve extração, fábrica, frete e embalagens.'
          },
          {
            text: 'Compro por impulso sempre que aparece algo novo ou em oferta.',
            points: 3,
            feedback: 'Alerta de hiperconsumo: itens comprados por impulso costumam ser pouco usados e descartados rapidamente.'
          }
        ]
      },
      {
        question: '4. O que você faz com cadernos, roupas ou eletrônicos que ainda funcionam, mas não usa mais?',
        options: [
          {
            text: 'Reutilizo, conserto, doo ou troco com outras pessoas.',
            points: 1,
            feedback: 'Mandou bem! Prolongar a vida útil dos objetos reduz a demanda por nova extração industrial.'
          },
          {
            text: 'Deixo guardado no fundo do armário por anos até estragar.',
            points: 2,
            feedback: 'Objetos parados perdem utilidade com o tempo. Circular e trocar com colegas mantém o item ativo!'
          },
          {
            text: 'Descarto no lixo comum para abrir espaço para coisas novas.',
            points: 3,
            feedback: 'Descartar itens funcionais acelera o esgotamento de recursos naturais e aumenta o volume dos aterros.'
          }
        ]
      },
      {
        question: '5. Qual afirmação mais combina com o que você pensa sobre reciclagem?',
        options: [
          {
            text: 'Sei que reciclar é o último passo; o mais importante é reduzir e reutilizar antes.',
            points: 1,
            feedback: 'Visão completa! No Brasil, menos de 8% do lixo é reciclado — reduzir na fonte é indispensável.'
          },
          {
            text: 'Acho que basta separar o lixo reciclável que o problema ambiental está resolvido.',
            points: 2,
            feedback: 'Mito comum: a reciclagem consome energia, água e tem limite de ciclos (especialmente no plástico).'
          },
          {
            text: 'Nunca parei para pensar no destino do lixo depois que ele sai da minha lixeira.',
            points: 3,
            feedback: 'Agora você já sabe: nos aterros, a decomposição de resíduos libera metano (CH₄), 28x mais potente que o CO₂.'
          }
        ]
      }
    ]);

    let currentIdx = 0;
    let score = 0;
    let answeredCurrent = false;
    let lastProfileSummary = '';

    const quizBody = document.getElementById('quizBody');
    const quizResult = document.getElementById('quizResult');
    const questionCounter = document.getElementById('questionCounter');
    const progressPercent = document.getElementById('progressPercent');
    const progressFill = document.getElementById('progressFill');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const quizFeedback = document.getElementById('quizFeedback');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');

    function renderQuestion() {
      answeredCurrent = false;
      quizFeedback.classList.remove('visible');
      quizFeedback.textContent = '';
      nextQuestionBtn.classList.add('hidden');

      const q = quizData[currentIdx];
      const pct = Math.round(((currentIdx + 1) / quizData.length) * 100);

      questionCounter.textContent = `Pergunta ${currentIdx + 1} de ${quizData.length}`;
      progressPercent.textContent = `${pct}%`;
      progressFill.style.width = `${pct}%`;
      questionText.textContent = q.question;

      optionsContainer.replaceChildren();
      const letters = ['A', 'B', 'C'];

      q.options.forEach((opt, idx) => {
        const btn = createEl('button', 'quiz-option');
        btn.type = 'button';
        btn.append(
          createEl('span', 'option-letter', letters[idx]),
          createEl('span', '', opt.text)
        );
        btn.addEventListener('click', () => selectOption(btn, opt));
        optionsContainer.appendChild(btn);
      });
    }

    function selectOption(selectedBtn, opt) {
      if (answeredCurrent) return;
      answeredCurrent = true;
      score += opt.points;

      const allBtns = optionsContainer.querySelectorAll('.quiz-option');
      allBtns.forEach(b => { b.disabled = true; });
      selectedBtn.classList.add('selected');

      quizFeedback.textContent = opt.feedback;
      quizFeedback.classList.add('visible');

      nextQuestionBtn.textContent = currentIdx === quizData.length - 1 ? 'Ver meu diagnóstico →' : 'Próxima Pergunta →';
      nextQuestionBtn.classList.remove('hidden');
    }

    nextQuestionBtn.addEventListener('click', () => {
      currentIdx++;
      if (currentIdx < quizData.length) {
        renderQuestion();
      } else {
        showResult();
      }
    });

    function showResult() {
      quizBody.style.display = 'none';
      quizResult.style.display = 'block';

      const badge = document.getElementById('resultBadge');
      const title = document.getElementById('resultTitle');
      const summary = document.getElementById('resultSummary');
      const tipsList = document.getElementById('resultTipsList');

      badge.classList.remove('badge-opt', 'badge-warn', 'badge-crit');

      let profile;
      if (score <= 7) {
        profile = {
          badge: 'SISTEMA OTIMIZADO • BAIXO DESPERDÍCIO',
          badgeClass: 'badge-opt',
          title: 'Modo Economia de Recursos Ativado!',
          summary: 'Seus hábitos mostram que você já aplica a hierarquia dos 5 Rs: reduzir e reutilizar vêm antes de descartar. Sua pegada de resíduos e emissões de metano/CO₂ está bem abaixo da média nacional.',
          tips: [
            'Compartilhe este quiz nos grupos da UTFPR Campo Mourão para desafiar seus colegas.',
            'Apoie iniciativas de troca/escambo de roupas, livros e acessórios no campus.',
            'Assine o Mural de Compromissos abaixo para inspirar outros estudantes.'
          ]
        };
      } else if (score <= 11) {
        profile = {
          badge: 'ALERTA DE CACHE • CONSUMO MODERADO',
          badgeClass: 'badge-warn',
          title: 'Quase lá, mas sua lixeira ainda pesa!',
          summary: 'Você já tem consciência ambiental, mas a praticidade dos descartáveis e compras ocasionais ainda geram dezenas de quilos de lixo evitável por ano.',
          tips: [
            'Deixe uma garrafa reutilizável fixa na mochila para zerar copos descartáveis nos bebedouros.',
            'Marque "não enviar talheres e sachês extras" ao pedir lanches e delivery.',
            'Espere 72 horas antes de finalizar qualquer compra online não essencial.'
          ]
        };
      } else {
        profile = {
          badge: 'SOBRECARGA DE SISTEMA • LOOP CONSUMISTA',
          badgeClass: 'badge-crit',
          title: 'Alerta Crítico: Sua lixeira está no limite!',
          summary: 'Seus hábitos atuais geram um alto volume de resíduos de uso único e impulsionam emissões de CO₂ e metano (CH₄). Pequenas mudanças hoje já cortam esse impacto pela metade.',
          tips: [
            'Desafio de 7 dias: passe uma semana inteira sem usar nenhum copo descartável na UTFPR.',
            'Reutilize folhas de rascunho e embalagens antes de descartar.',
            'Lembre-se: reciclar não compensa o excesso de consumo — comece recusando o desnecessário.'
          ]
        };
      }

      badge.textContent = profile.badge;
      badge.classList.add(profile.badgeClass);
      title.textContent = profile.title;
      summary.textContent = profile.summary;

      const safeUrl = window.SecurityGuard.getSafePageUrl();
      lastProfileSummary = `Meu resultado no Quiz "Sem Cache no Planeta" (UTFPR-CM): ${profile.title} (${score}/15 pts). Descubra o peso da sua lixeira também: ${safeUrl}`;

      tipsList.replaceChildren();
      profile.tips.forEach(t => {
        tipsList.appendChild(createEl('li', '', t));
      });
    }

    document.getElementById('restartQuizBtn').addEventListener('click', () => {
      currentIdx = 0;
      score = 0;
      quizResult.style.display = 'none';
      quizBody.style.display = 'block';
      renderQuestion();
    });

    document.getElementById('copyResultBtn').addEventListener('click', () => {
      const fb = document.getElementById('quizCopyFeedback');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(lastProfileSummary).then(() => {
          fb.textContent = '✓ Resultado copiado! Cole no WhatsApp ou Instagram da turma.';
          setTimeout(() => { fb.textContent = ''; }, 4000);
        });
      }
    });

    renderQuestion();
  }

  /* -------------------------------------------------------
     8. MURAL DE COMPROMISSOS BLINDADO (INTEGRIDADE + ANTI-SPAM)
     ------------------------------------------------------- */
  function initPledgeBoard() {
    const defaultPledges = [
      { name: 'Mariana S.', course: 'Info para Internet', action: 'Aposentar copos descartáveis e usar minha própria garrafa no campus', kg: 4.5 },
      { name: 'Gabriel R.', course: 'Ciência da Computação', action: 'Recusar talheres, sachês e sacolas extras em pedidos de delivery', kg: 6.0 },
      { name: 'Docente Geografia', course: 'Servidor(a) / Docente', action: 'Reutilizar folhas de rascunho e reduzir impressões desnecessárias', kg: 3.5 },
      { name: 'Lucas T.', course: 'Engenharia Ambiental', action: 'Aplicar a regra das 72h antes de qualquer compra online por impulso', kg: 8.5 }
    ];

    const STORAGE_KEY = 'utfpr_sem_cache_pledges_secure_v2';
    let pledges = window.SecurityGuard.loadVerifiedPledges(STORAGE_KEY, defaultPledges);

    const form = document.getElementById('pledgeForm');
    const listEl = document.getElementById('pledgeList');
    const totalCountEl = document.getElementById('totalPledgesCount');
    const totalKgEl = document.getElementById('totalSavedKg');
    const statusMsg = document.getElementById('pledgeStatusMsg');

    function showFormMessage(text, type) {
      statusMsg.textContent = text;
      statusMsg.className = `form-status-msg ${type}`;
      setTimeout(() => {
        statusMsg.classList.add('hidden');
      }, 4500);
    }

    function renderPledges() {
      listEl.replaceChildren();
      let totalKg = 0;

      pledges.forEach(p => {
        totalKg += Number(p.kg || 0);

        const card = createEl('div', 'pledge-item');
        const topRow = createEl('div', 'pledge-item-top');
        topRow.append(
          createEl('strong', '', p.name),
          createEl('span', 'pledge-course-tag', p.course)
        );

        const actionPara = createEl('p', '', `✓ ${p.action}`);
        card.append(topRow, actionPara);
        listEl.appendChild(card);
      });

      totalCountEl.textContent = String(pledges.length);
      totalKgEl.textContent = `${totalKg.toFixed(1).replace('.', ',')} kg`;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // 1. Verifica Rate Limit (Anti-spam)
      const rate = window.SecurityGuard.checkRateLimit();
      if (!rate.allowed) {
        showFormMessage(`Aguarde ${rate.remainingSeconds}s antes de registrar outro compromisso.`, 'error');
        return;
      }

      const nameInput = document.getElementById('pledgeName');
      const courseSelect = document.getElementById('pledgeCourse');
      const actionSelect = document.getElementById('pledgeAction');

      // 2. Validação estrita contra Allowlist e Regex
      const candidate = {
        name: nameInput.value,
        course: courseSelect.value,
        action: actionSelect.value
      };

      const validatedEntry = window.SecurityGuard.validatePledgeEntry(candidate);
      if (!validatedEntry) {
        showFormMessage('Nome inválido. Use entre 2 e 35 caracteres (apenas letras, números, espaços ou hífen).', 'error');
        return;
      }

      // 3. Bloqueia duplicata exata consecutiva
      const isDuplicate = pledges.some(
        item => item.name.toLowerCase() === validatedEntry.name.toLowerCase() && item.action === validatedEntry.action
      );
      if (isDuplicate) {
        showFormMessage('Este compromisso já está registrado no mural com esse nome!', 'error');
        return;
      }

      // 4. Salva com assinatura de integridade e registra timestamp
      pledges.unshift(validatedEntry);
      pledges = window.SecurityGuard.saveVerifiedPledges(STORAGE_KEY, pledges);
      window.SecurityGuard.recordSubmission();

      nameInput.value = '';
      renderPledges();
      showFormMessage('✓ Compromisso validado e assinado com sucesso!', 'success');
    });

    renderPledges();
  }

  /* -------------------------------------------------------
     9. COMPARTILHAMENTO SEGURO & QR CODE 100% OFFLINE
     ------------------------------------------------------- */
  function initShareAndQrModal() {
    const copyBtn = document.getElementById('copyLinkFooter');
    const feedback = document.getElementById('copyFeedback');
    const openQrBtn = document.getElementById('openQrModalBtn');
    const closeQrBtn = document.getElementById('closeQrModalBtn');
    const qrModal = document.getElementById('qrModal');
    const qrContainer = document.getElementById('qrImageContainer');
    const qrUrlDisplay = document.getElementById('qrUrlDisplay');

    copyBtn.addEventListener('click', () => {
      const safeUrl = window.SecurityGuard.getSafePageUrl();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(safeUrl).then(() => {
          feedback.textContent = '✓ Link seguro copiado com sucesso!';
          setTimeout(() => { feedback.textContent = ''; }, 3500);
        });
      }
    });

    openQrBtn.addEventListener('click', () => {
      const safeUrl = window.SecurityGuard.getSafePageUrl();
      qrUrlDisplay.textContent = safeUrl;

      // Gera SVG QR Code localmente sem enviar dados para servidores externos
      const svgQr = window.SecurityGuard.createLocalQrSvg(safeUrl, 210);
      qrContainer.replaceChildren(svgQr);
      qrModal.classList.remove('hidden');
    });

    closeQrBtn.addEventListener('click', () => {
      qrModal.classList.add('hidden');
    });

    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) {
        qrModal.classList.add('hidden');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !qrModal.classList.contains('hidden')) {
        qrModal.classList.add('hidden');
      }
    });
  }
})();
