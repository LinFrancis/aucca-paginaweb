/* Asistente AUCCA mejorado:
   - Intro + sugerencias clicables
   - Tabs de categorías
   - Panel "ver temas disponibles"
   - Autocompletado predictivo
   - Búsqueda con sinónimos / parciales
   Requiere: window.AUCCA_DATA desde data/info_data.js
*/
(function(){
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const norm = (s) => (s||'')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'') // tildes
    .replace(/[^a-z0-9áéíóúñü \-]/gi,'')
    .trim();

  function renderBasicMarkdown(txt){
    if(!txt) return '';
    let html = txt
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    return html;
  }

  let PREGUNTAS = {};
  let SINONIMOS = {};
  function loadData(){
    const d = window.AUCCA_DATA || {};
    PREGUNTAS = d.preguntas || {};
    SINONIMOS = d.sinonimos || {};
  }

  function getCategoryForKey(k){
    const nk = norm(k);
    if (/(ba(ñ|n)o)/.test(nk)) return 'bano';
    if (/biofiltro|filtro|aguas? grises?/.test(nk)) return 'biofiltro';
    if (/compost|lombric/.test(nk)) return 'compost';
    if (/taller|escuela|inscrip|capacitaci/.test(nk)) return 'escuela';
    return 'general';
  }

  function buildCategories(){
    const cats = { general:[], bano:[], biofiltro:[], compost:[], escuela:[] };
    Object.keys(PREGUNTAS).forEach(k=>{
      cats[getCategoryForKey(k)].push(k);
    });
    return cats;
  }

  function buscarRespuesta(q){
    const qn = norm(q);
    if(!qn) return '';

    // 1) por sinónimos exactos / canónicos
    for (const canon in SINONIMOS){
      if (norm(canon) === qn) return PREGUNTAS[canon] || '';
      const vars = SINONIMOS[canon] || [];
      for (const v of vars){
        if (norm(v) === qn) return PREGUNTAS[canon] || '';
      }
    }

    // (removido: lookup exacto por clave normalizada, rara vez coincide)

    // 2) includes en canónicas
    const keys = Object.keys(PREGUNTAS);
    const parcial = keys.find(k => qn.includes(norm(k)));
    if (parcial) return PREGUNTAS[parcial];

    // 3) includes en sinónimos
    for (const canon in SINONIMOS){
      const vars = SINONIMOS[canon] || [];
      if (vars.some(v => qn.includes(norm(v)))) return PREGUNTAS[canon] || '';
    }

    return '';
  }

  function mostrarRespuesta(txt){
    const result = $('#aucca-result');
    result.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'answer fade-in';
    div.innerHTML = renderBasicMarkdown(txt || '🌾 Lo siento, aún no tengo información sobre eso. Prueba con otra pregunta o usa “Ver temas disponibles”.');
    result.appendChild(div);
  }

  function buildSugerencias(categorias){
    const seed = [];
    const pick = (arr, n) => arr.slice(0, n);
    seed.push(...pick(categorias.general, 4));
    seed.push(...pick(categorias.bano, 2));
    seed.push(...pick(categorias.biofiltro, 2));
    seed.push(...pick(categorias.compost, 2));
    seed.push(...pick(categorias.escuela, 2));

    const unique = [...new Set(seed)].filter(Boolean).slice(0, 10);
    const chips = $('#chips-sugerencias');
    chips.innerHTML = '';
    unique.forEach(q=>{
      const b = document.createElement('button');
      b.className = 'chip';
      b.textContent = capitaliza(q);
      b.addEventListener('click', ()=>{
        $('#aucca-input').value = q;
        const ans = buscarRespuesta(q);
        mostrarRespuesta(ans);
      });
      chips.appendChild(b);
    });
  }

  function buildPanelTemas(categorias){
    const panel = $('#lista-temas');
    panel.innerHTML = '';
    const blocks = [
      ['general','AUCCA y general'],
      ['bano','Baño seco'],
      ['biofiltro','Biofiltro'],
      ['compost','Compostaje'],
      ['escuela','Escuela y talleres'],
    ];

    blocks.forEach(([key, label])=>{
      const items = categorias[key] || [];
      if(!items.length) return;
      const sec = document.createElement('div');
      sec.className = 'temas-section';

      const h = document.createElement('h4');
      h.textContent = label;
      sec.appendChild(h);

      const ul = document.createElement('ul');
      items.forEach(q=>{
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = 'javascript:void(0)';
        a.textContent = capitaliza(q);
        a.addEventListener('click', ()=>{
          $('#aucca-input').value = q;
          const ans = buscarRespuesta(q);
          mostrarRespuesta(ans);
          panel.classList.add('hidden');
          activaTab('all');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        li.appendChild(a);
        ul.appendChild(li);
      });
      sec.appendChild(ul);
      panel.appendChild(sec);
    });
  }

  function activaTab(cat){
    $$('.tabs .tab').forEach(t=>t.classList.toggle('active', t.dataset.cat===cat));
    const chips = $('#chips-sugerencias');
    if (cat === 'all'){
      const cats = buildCategories();
      buildSugerencias(cats);
      return;
    }
    const cats = buildCategories();
    const arr = (cats[cat] || []).slice(0,10);
    chips.innerHTML = '';
    arr.forEach(q=>{
      const b = document.createElement('button');
      b.className = 'chip';
      b.textContent = capitaliza(q);
      b.addEventListener('click', ()=>{
        $('#aucca-input').value = q;
        const ans = buscarRespuesta(q);
        mostrarRespuesta(ans);
      });
      chips.appendChild(b);
    });
  }

  function setupAutocomplete(){
    const input = $('#aucca-input');
    const box = $('#aucca-autocomplete');
    const keys = Object.keys(PREGUNTAS);

    function renderList(items){
      if(!items.length){ box.classList.add('hidden'); box.innerHTML=''; return; }
      box.innerHTML = '';
      items.forEach(q=>{
        const div = document.createElement('div');
        div.className = 'ac-item';
        div.textContent = capitaliza(q);
        div.addEventListener('click', ()=>{
          input.value = q;
          box.classList.add('hidden'); box.innerHTML='';
          const ans = buscarRespuesta(q);
          mostrarRespuesta(ans);
        });
        box.appendChild(div);
      });
      box.classList.remove('hidden');
    }

    input.addEventListener('input', ()=>{
      const v = norm(input.value);
      if(!v){ renderList([]); return; }
      const synCanon = Object.keys(SINONIMOS);
      const pool = [...new Set([...keys, ...synCanon])];
      const out = pool.filter(k => norm(k).includes(v)).slice(0,8);
      renderList(out);
    });

    document.addEventListener('click',(e)=>{
      if(!box.contains(e.target) && e.target!==input){
        box.classList.add('hidden');
      }
    });

    input.addEventListener('keydown',(e)=>{
      if(e.key==='Enter'){
        box.classList.add('hidden');
        $('#aucca-btn').click();
      }
    });
  }

  function capitaliza(s){
    if(!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function onSearch(){
    const q = $('#aucca-input').value;
    const ans = buscarRespuesta(q);
    mostrarRespuesta(ans);
  }

  function initUI(){
    $('#aucca-btn').addEventListener('click', onSearch);
    $('#aucca-input').addEventListener('keydown', (e)=>{ if(e.key==='Enter') onSearch(); });

    $$('#tabs-categorias .tab').forEach(btn=>{
      btn.addEventListener('click', ()=> activaTab(btn.dataset.cat));
    });

    $('#ver-temas').addEventListener('click', ()=>{
      $('#lista-temas').classList.toggle('hidden');
    });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    loadData();
    initUI();
    const cats = buildCategories();
    buildSugerencias(cats);
    buildPanelTemas(cats);
    setupAutocomplete();
  });
})();
