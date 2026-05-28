// ========================
// ESTADO GLOBAL
// ========================
let DB = {
  lancamentos: [],
  patrimonio: [],
  categorias: [
    // ── RECEITAS ──
    { id: 'rec_trabalho',     nome: 'Trabalho Fixo',             cor: '#16a34a', codigo: '1.1', subcats: ['Salário Mar&Rio','Comissões'] },
    { id: 'rec_servicos',     nome: 'Prestação de Serviços',     cor: '#15803d', codigo: '1.2', subcats: ['Clínica de Fisioterapia','BPO Financeiro','Consultoria Contábil','Outros'] },
    { id: 'rec_projeto_ia',   nome: 'Projeto IA / Automação',    cor: '#166534', codigo: '1.3', subcats: ['Receita Operacional','Participação Societária'] },
    { id: 'rec_investimentos', nome: 'Rendimentos',              cor: '#14532d', codigo: '1.4', subcats: ['Dividendos','Juros / Renda Fixa','CDB / LCI / LCA','Outros'] },
    { id: 'rec_eventual',     nome: 'Eventual',                  cor: '#4ade80', codigo: '1.5', subcats: ['Venda de Bens','Outros'] },
    // ── DESPESAS FIXAS ──
    { id: 'moradia',          nome: 'Moradia',                   cor: '#84cc16', codigo: '2.1', subcats: ['Aluguel','Condomínio','Internet','Água (Semae)','Energia Elétrica','Gás','Outros'] },
    { id: 'transp_fixo',      nome: 'Transporte Fixo',           cor: '#65a30d', codigo: '2.2', subcats: ['IPVA / Licenciamento','Seguro do Veículo','Financiamento Veículo'] },
    { id: 'assinaturas',      nome: 'Assinaturas',               cor: '#6366f1', codigo: '2.3', subcats: ['Telefone','Streaming','Google','Apps','Outros'] },
    { id: 'faculdade',        nome: 'Faculdade',                 cor: '#8b5cf6', codigo: '2.4', subcats: ['Mensalidade Estácio','Material'] },
    { id: 'igreja',           nome: 'Igreja',                    cor: '#ec4899', codigo: '2.5', subcats: ['Dízimo','Oferta','Eventos'] },
    // ── DESPESAS VARIÁVEIS ──
    { id: 'alimentacao',      nome: 'Alimentação',               cor: '#f59e0b', codigo: '3.1', subcats: ['Mercado','Delivery','Restaurante','Outros'] },
    { id: 'transp_variavel',  nome: 'Transporte Variável',       cor: '#d97706', codigo: '3.2', subcats: ['Combustível Carro','Combustível Moto','Manutenção Carro','Manutenção Moto','Pneus','Uber','Estacionamento','Multa'] },
    { id: 'saude_corpo',      nome: 'Saúde & Corpo',             cor: '#2dd4bf', codigo: '3.3', subcats: ['Academia','Muay thai','Suplemento','Convênio','Nutricionista','Psicólogo','Quiropraxia','Remédio','Equipamentos','Outros'] },
    { id: 'cuidado_pessoal',  nome: 'Cuidado Pessoal',           cor: '#f43f5e', codigo: '3.4', subcats: ['Barbearia','Cosméticos','Outros'] },
    { id: 'formacao',         nome: 'Formação',                  cor: '#a855f7', codigo: '3.5', subcats: ['Cursos','Livros','Mentoria','Outros'] },
    { id: 'lazer',            nome: 'Lazer',                     cor: '#14b8a6', codigo: '3.6', subcats: ['Cinema','Rolê / Social','Viagem','Entretenimento','Conferências','Outros'] },
    // ── GASTOS PONTUAIS ──
    { id: 'compras',          nome: 'Compras',                   cor: '#fb923c', codigo: '4.1', subcats: ['Vestuário','Eletrônico','Eletrodoméstico','Móvel','Utilitários','Outros'] },
    { id: 'presentes',        nome: 'Presentes & Datas',         cor: '#f87171', codigo: '4.2', subcats: ['Aniversário','Celebrações','Outros'] },
    // ── INVESTIMENTOS & PATRIMÔNIO ──
    { id: 'inv_renda_fixa',   nome: 'Renda Fixa',                cor: '#0d9488', codigo: '5.1', subcats: ['CDB','LCI / LCA','Tesouro Direto'] },
    { id: 'inv_renda_var',    nome: 'Renda Variável',            cor: '#0f766e', codigo: '5.2', subcats: ['Ações','FIIs','ETFs','BDRs'] },
    { id: 'inv_reservas',     nome: 'Reservas',                  cor: '#115e59', codigo: '5.3', subcats: ['Reserva de Emergência','Reserva de Oportunidade'] },
    { id: 'inv_negocio',      nome: 'Negócio',                   cor: '#134e4a', codigo: '5.4', subcats: ['Aporte Projeto IA','Ferramentas / Infraestrutura'] },
    { id: 'inv_objetivos',    nome: 'Objetivos Futuros',         cor: '#4f9cf9', codigo: '5.5', subcats: ['Poupança Casamento','Fundo Imóvel'] },
    // ── OUTROS ──
    { id: 'outros',           nome: 'Outros',                    cor: '#94a3b8', codigo: '9.9', subcats: [] },
  ],
  orcamentos: {},
  regras: [],
  config: { nome: 'Paulo Alioti', meta: 1000000 }
};

let chartPatrimonio = null;
let chartPatrimonioFull = null;
let chartCategorias = null;
let mesAtual = new Date().toISOString().slice(0, 7);

// ========================
// INIT
// ========================
document.addEventListener('DOMContentLoaded', () => {
  try { carregarDB(); } catch(e) { console.error('carregarDB:', e); }
  try { preencherSelects(); } catch(e) { console.error('preencherSelects:', e); }
  try { renderDashboard(); } catch(e) { console.error('renderDashboard:', e); }
  try { renderLancamentos(); } catch(e) { console.error('renderLancamentos:', e); }
  try { atualizarBannerValidacao(); } catch(e) { console.error('banner:', e); }
});

// ========================
// PERSISTÊNCIA
// ========================
function salvarDB() {
  localStorage.setItem('financeiro-paulo', JSON.stringify(DB));
}

function carregarDB() {
  const saved = localStorage.getItem('financeiro-paulo');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Merge preservando defaults
      DB.lancamentos = parsed.lancamentos || [];
      DB.patrimonio = parsed.patrimonio || [];
      DB.orcamentos = parsed.orcamentos || {};
      DB.regras = parsed.regras || [];
      DB.config = { ...DB.config, ...(parsed.config || {}) };
      // Merge categorias preservando subcats
      if (parsed.categorias && parsed.categorias.length) {
        DB.categorias = parsed.categorias.map(pc => {
          const def = DB.categorias.find(d => d.id === pc.id);
          return { ...pc, subcats: pc.subcats || (def ? def.subcats : []) };
        });
      }
    } catch(e) { console.error('Erro ao carregar DB', e); }
  }
}

// ========================
// NAVEGAÇÃO
// ========================
function showPage(id) {
  try {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const pg = document.getElementById('page-' + id);
    if (pg) pg.classList.add('active');

    const navMap = { dashboard:0, lancamentos:1, importar:2, dre:3, planocontas:4, patrimonio:5, configuracoes:6 };
    const items = document.querySelectorAll('.nav-item');
    if (items[navMap[id]]) items[navMap[id]].classList.add('active');

    const titles = {
      dashboard:'Dashboard', lancamentos:'Lançamentos', importar:'Importar',
      dre:'DRE', planocontas:'Plano de Contas', patrimonio:'Patrimônio',
      configuracoes:'Configurações'
    };
    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent = titles[id] || id;

    if (id === 'dashboard') renderDashboard();
    if (id === 'lancamentos') renderLancamentos();
    if (id === 'dre') { try { preencherDREmeses(); renderDRE(); } catch(e) { console.error('DRE:', e); } }
    if (id === 'planocontas') { renderPlanoContas(); renderRegras(); }
    if (id === 'patrimonio') renderPatrimonio();
  } catch(e) {
    console.error('showPage error:', e);
  }
}

// ========================
// UTILS
// ========================
function fmt(v) {
  return 'R$ ' + Math.abs(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtSimples(v) {
  return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function getMes(mes) {
  return DB.lancamentos.filter(l => l.data.startsWith(mes) && l.tipo !== 'interno');
}
function getCor(catId) {
  const cat = DB.categorias.find(c => c.id === catId);
  return cat ? cat.cor : '#94a3b8';
}
function getNomeCat(catId) {
  const cat = DB.categorias.find(c => c.id === catId);
  return cat ? cat.nome : (catId || 'Outros');
}
function getSubcats(catId) {
  const cat = DB.categorias.find(c => c.id === catId);
  return cat ? (cat.subcats || []) : [];
}
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.display = 'block';
  setTimeout(() => t.style.display = 'none', 2500);
}
function fecharModal(id) {
  document.getElementById(id).style.display = 'none';
}
function formatarData(data) {
  const d = new Date(data + 'T12:00:00');
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}
function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ========================
// DASHBOARD
// ========================
function renderDashboard() {
  const lancsMes = getMes(mesAtual);
  const receitas = lancsMes.filter(l => l.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
  const despesas = lancsMes.filter(l => l.tipo === 'despesa').reduce((a, b) => a + b.valor, 0);
  const sobra = receitas - despesas;

  const d = new Date(mesAtual + '-01');
  d.setMonth(d.getMonth() - 1);
  const mesAnt = d.toISOString().slice(0, 7);
  const laMes = getMes(mesAnt);
  const recAnt = laMes.filter(l => l.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
  const despAnt = laMes.filter(l => l.tipo === 'despesa').reduce((a, b) => a + b.valor, 0);

  document.getElementById('m-receitas').textContent = fmt(receitas);
  document.getElementById('m-despesas').textContent = fmt(despesas);
  document.getElementById('m-sobra').textContent = fmt(sobra);

  const pats = [...DB.patrimonio].sort((a, b) => a.mes.localeCompare(b.mes));
  const pat = pats.length ? pats[pats.length - 1].valor : 0;
  const patAnt = pats.length > 1 ? pats[pats.length - 2].valor : 0;
  document.getElementById('m-patrimonio').textContent = fmt(pat);

  const setDelta = (elId, atual, anterior) => {
    const el = document.getElementById(elId);
    if (!anterior || anterior === 0) { el.textContent = ''; return; }
    const pct = ((atual - anterior) / anterior * 100).toFixed(0);
    const up = atual >= anterior;
    el.className = 'metric-delta ' + (up ? 'delta-up' : 'delta-down');
    el.textContent = (up ? '↑' : '↓') + ' ' + Math.abs(pct) + '% vs mês anterior';
  };
  setDelta('d-receitas', receitas, recAnt);
  setDelta('d-despesas', despesas, despAnt);
  setDelta('d-sobra', sobra, recAnt - despAnt);
  setDelta('d-patrimonio', pat, patAnt);

  // Categorias com orçamento
  const porCat = {};
  lancsMes.filter(l => l.tipo === 'despesa').forEach(l => {
    porCat[l.categoria] = (porCat[l.categoria] || 0) + l.valor;
  });
  const maxVal = Math.max(...Object.values(porCat), 1);
  const listaCats = document.getElementById('lista-categorias');
  listaCats.innerHTML = '';
  Object.entries(porCat).sort((a, b) => b[1] - a[1]).slice(0, 7).forEach(([cat, val]) => {
    const orc = DB.orcamentos[cat] || 0;
    const pct = orc > 0 ? Math.min(Math.round((val / orc) * 100), 100) : Math.round((val / maxVal) * 100);
    const corBarra = orc > 0 && val > orc ? '#ef4444' : getCor(cat);
    const orcLabel = orc > 0 ? '<span style="font-size:10px;color:var(--text3);margin-left:4px">/ ' + fmt(orc) + '</span>' : '';
    listaCats.innerHTML += '<div class="cat-item">' +
      '<span class="cat-label">' + getNomeCat(cat) + '</span>' +
      '<div class="cat-bar-bg"><div class="cat-bar" style="width:' + pct + '%;background:' + corBarra + '"></div></div>' +
      '<span class="cat-value">' + fmt(val) + orcLabel + '</span>' +
      '</div>';
  });
  if (!Object.keys(porCat).length) {
    listaCats.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:8px 0">Nenhum gasto lançado este mês</div>';
  }

  // Últimos lançamentos
  const ultimos = [...DB.lancamentos].sort((a, b) => b.data.localeCompare(a.data)).slice(0, 5);
  const listaUltimos = document.getElementById('lista-ultimos');
  listaUltimos.innerHTML = '';
  if (!ultimos.length) {
    listaUltimos.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:8px 0">Nenhum lançamento ainda</div>';
  }
  ultimos.forEach(l => { listaUltimos.innerHTML += buildTxItem(l); });

  renderChartPatrimonio();
}

function buildTxItem(l) {
  const isInterno = l.tipo === 'interno';
  const badge = l.status === 'pendente'
    ? '<span class="tx-badge badge-pendente">revisar</span>'
    : l.status === 'validado'
    ? '<span class="tx-badge badge-validado">validado</span>'
    : '<span class="tx-badge badge-interno">interno</span>';
  const amtClass = isInterno ? 'neu' : l.tipo === 'receita' ? 'pos' : 'neg';
  const amtPrefix = isInterno ? '' : l.tipo === 'receita' ? '+ ' : '- ';
  const cor = isInterno ? '#f1f5f9' : l.tipo === 'receita' ? '#dcfce7' : '#fef3c7';
  const iconCor = isInterno ? '#94a3b8' : l.tipo === 'receita' ? '#16a34a' : '#d97706';
  const icon = isInterno ? 'ti-transfer' : l.tipo === 'receita' ? 'ti-arrow-down' : 'ti-arrow-up';
  const catNome = isInterno
    ? '<span class="tag-interno"><i class="ti ti-arrows-exchange"></i> Movimentação interna</span>'
    : getNomeCat(l.categoria) + (l.subcategoria ? ' › ' + l.subcategoria : '');
  const tags = (l.tags || []).map(t => '<span class="tag-pill">' + t + '</span>').join('');
  return '<div class="tx-item">' +
    '<div class="tx-icon" style="background:' + cor + '"><i class="ti ' + icon + '" style="color:' + iconCor + '"></i></div>' +
    '<div class="tx-info"><div class="tx-name">' + l.descricao + badge + '</div>' +
    '<div class="tx-cat">' + catNome + (tags ? ' ' + tags : '') + '</div></div>' +
    '<div class="tx-right"><div class="tx-amount ' + amtClass + '">' + amtPrefix + fmt(l.valor) + '</div>' +
    '<div class="tx-date">' + formatarData(l.data) + '</div></div></div>';
}

function renderChartPatrimonio() {
  const pats = [...DB.patrimonio].sort((a, b) => a.mes.localeCompare(b.mes)).slice(-6);
  if (chartPatrimonio) chartPatrimonio.destroy();
  const ctx = document.getElementById('chartPatrimonio');
  if (!ctx || !pats.length) return;
  chartPatrimonio = new Chart(ctx, {
    type: 'line',
    data: {
      labels: pats.map(p => { const [y,m] = p.mes.split('-'); return new Date(y,m-1).toLocaleDateString('pt-BR',{month:'short',year:'2-digit'}); }),
      datasets: [{ data: pats.map(p => p.valor), borderColor:'#4f9cf9', backgroundColor:'rgba(79,156,249,0.08)', borderWidth:2, pointBackgroundColor:'#4f9cf9', pointRadius:4, fill:true, tension:0.4 }]
    },
    options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false}, tooltip:{callbacks:{label:ctx=>fmt(ctx.raw)}} }, scales:{ x:{grid:{color:'rgba(0,0,0,0.04)'},ticks:{color:'#94a3b8',font:{size:11}}}, y:{grid:{color:'rgba(0,0,0,0.04)'},ticks:{color:'#94a3b8',font:{size:11},callback:v=>'R$'+(v/1000).toFixed(0)+'k'}} } }
  });
}

// ========================
// LANÇAMENTOS
// ========================
function renderLancamentos() {
  const status = document.getElementById('filtro-status').value;
  const tipo = document.getElementById('filtro-tipo').value;
  const cat = document.getElementById('filtro-categoria').value;
  const tag = document.getElementById('filtro-tag')?.value || '';

  let lista = [...DB.lancamentos].sort((a, b) => b.data.localeCompare(a.data));
  if (status) lista = lista.filter(l => l.status === status || (status === 'interno' && l.tipo === 'interno'));
  if (tipo) lista = lista.filter(l => l.tipo === tipo);
  if (cat) lista = lista.filter(l => l.categoria === cat);
  if (tag) lista = lista.filter(l => (l.tags || []).includes(tag));

  const tbody = document.getElementById('tbody-lancamentos');
  tbody.innerHTML = '';
  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--text3);padding:24px">Nenhum lançamento encontrado</td></tr>';
    return;
  }
  lista.forEach(l => {
    const isInterno = l.tipo === 'interno';
    const badge = l.status === 'pendente'
      ? '<span class="tx-badge badge-pendente">revisar</span>'
      : isInterno ? '<span class="tx-badge badge-interno">interno</span>'
      : '<span class="tx-badge badge-validado">validado</span>';
    const amtClass = isInterno ? 'neu' : l.tipo === 'receita' ? 'pos' : 'neg';
    const amtPrefix = isInterno ? '' : l.tipo === 'receita' ? '+' : '-';
    const subcatStr = l.subcategoria ? ' › ' + l.subcategoria : '';
    const tagsStr = (l.tags||[]).map(t=>'<span class="tag-pill">'+t+'</span>').join('');
    tbody.innerHTML += '<tr>' +
      '<td>' + formatarData(l.data) + '</td>' +
      '<td>' + l.descricao + (tagsStr ? '<br><span style="margin-top:2px;display:flex;gap:4px">' + tagsStr + '</span>' : '') + '</td>' +
      '<td>' + (isInterno ? '<span class="tag-interno">Interno</span>' : getNomeCat(l.categoria) + subcatStr) + '</td>' +
      '<td><span style="text-transform:capitalize">' + l.tipo + '</span></td>' +
      '<td class="tx-amount ' + amtClass + '">' + amtPrefix + ' ' + fmt(l.valor) + '</td>' +
      '<td>' + badge + '</td>' +
      '<td>' +
        (l.status === 'pendente' ? '<button class="btn" style="font-size:11px;padding:4px 8px" onclick="abrirValidar(\'' + l.id + '\')">Validar</button> ' : '') +'<button class="btn" style="font-size:11px;padding:4px 8px" onclick="abrirEditar(\'' + l.id + '\')"><i class="ti ti-pencil"></i></button> ' +
        '<button class="btn" style="font-size:11px;padding:4px 8px;color:var(--red);border-color:var(--red)" onclick="excluirLancamento(\'' + l.id + '\')"><i class="ti ti-trash"></i></button>' +
      '</td>' +
    '</tr>';
  });
}


// ========================
// BUSCA GLOBAL
// ========================
function buscarGlobal(query) {
  if (!query || query.length < 2) { renderLancamentos(); return; }
  const q = query.toLowerCase();
  const lista = DB.lancamentos.filter(l =>
    l.descricao.toLowerCase().includes(q) ||
    getNomeCat(l.categoria).toLowerCase().includes(q) ||
    (l.subcategoria||'').toLowerCase().includes(q) ||
    (l.tags||[]).some(t => t.toLowerCase().includes(q))
  ).sort((a,b) => b.data.localeCompare(a.data));

  const tbody = document.getElementById('tbody-lancamentos');
  tbody.innerHTML = '';
  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--text3);padding:24px">Nenhum resultado para "' + query + '"</td></tr>';
    return;
  }
  lista.forEach(l => {
    const isInterno = l.tipo === 'interno';
    const badge = l.status === 'pendente' ? '<span class="tx-badge badge-pendente">revisar</span>' : isInterno ? '<span class="tx-badge badge-interno">interno</span>' : '<span class="tx-badge badge-validado">validado</span>';
    const amtClass = isInterno ? 'neu' : l.tipo === 'receita' ? 'pos' : 'neg';
    const amtPrefix = isInterno ? '' : l.tipo === 'receita' ? '+' : '-';
    const subcatStr = l.subcategoria ? ' › ' + l.subcategoria : '';
    const tagsStr = (l.tags||[]).map(t=>'<span class="tag-pill">'+t+'</span>').join('');
    tbody.innerHTML += '<tr>' +
      '<td>' + formatarData(l.data) + '</td>' +
      '<td>' + l.descricao + (tagsStr ? '<br><span style="margin-top:2px;display:flex;gap:4px">' + tagsStr + '</span>' : '') + '</td>' +
      '<td>' + (isInterno ? '<span class="tag-interno">Interno</span>' : getNomeCat(l.categoria) + subcatStr) + '</td>' +
      '<td><span style="text-transform:capitalize">' + l.tipo + '</span></td>' +
      '<td class="tx-amount ' + amtClass + '">' + amtPrefix + ' ' + fmt(l.valor) + '</td>' +
      '<td>' + badge + '</td>' +
      '<td style="white-space:nowrap">' +
        (l.status === 'pendente' ? '<button class="btn" style="font-size:11px;padding:4px 8px" onclick="abrirValidar(\'' + l.id + '\')">Validar</button> ' : '') +
        '<button class="btn" style="font-size:11px;padding:4px 8px" onclick="abrirEditar(\'' + l.id + '\')"><i class="ti ti-pencil"></i></button> ' +
        '<button class="btn" style="font-size:11px;padding:4px 8px;color:var(--red);border-color:var(--red)" onclick="excluirLancamento(\'' + l.id + '\')"><i class="ti ti-trash"></i></button>' +
      '</td></tr>';
  });
}

function filtrarPendentes() {
  document.getElementById('filtro-status').value = 'pendente';
  renderLancamentos();
}

function excluirLancamento(id) {
  if (!confirm('Excluir este lançamento?')) return;
  DB.lancamentos = DB.lancamentos.filter(l => l.id !== id);
  salvarDB(); renderLancamentos(); renderDashboard(); atualizarBannerValidacao();
  toast('Lançamento excluído');
}

function abrirEditar(id) {
  const l = DB.lancamentos.find(l => l.id === id);
  if (!l) return;
  document.getElementById('editar-id').value = id;
  document.getElementById('editar-data').value = l.data;
  document.getElementById('editar-descricao').value = l.descricao;
  document.getElementById('editar-valor').value = l.valor;
  document.getElementById('editar-tipo').value = l.tipo;
  document.getElementById('editar-tags').value = (l.tags||[]).join(', ');
  preencherSelectCategoria('editar-categoria', l.categoria);
  atualizarSubcatEditar(l.categoria, l.subcategoria);
  document.getElementById('modal-editar').style.display = 'flex';
}

function atualizarSubcatEditar(catId, valorAtual) {
  const subcats = getSubcats(catId);
  const sel = document.getElementById('editar-subcategoria');
  sel.innerHTML = '<option value="">Sem subcategoria</option>' +
    subcats.map(s => '<option value="'+s+'"'+(s===valorAtual?' selected':'')+'>'+s+'</option>').join('');
}

function salvarEdicao() {
  const id = document.getElementById('editar-id').value;
  const l = DB.lancamentos.find(l => l.id === id);
  if (!l) return;
  const catAntiga = l.categoria;
  l.data = document.getElementById('editar-data').value;
  l.descricao = document.getElementById('editar-descricao').value;
  l.valor = parseFloat(document.getElementById('editar-valor').value);
  l.tipo = document.getElementById('editar-tipo').value;
  l.categoria = document.getElementById('editar-categoria').value;
  l.subcategoria = document.getElementById('editar-subcategoria').value;
  const tagsRaw = document.getElementById('editar-tags').value;
  l.tags = tagsRaw ? tagsRaw.split(',').map(t=>t.trim()).filter(Boolean) : [];
  l.status = 'validado';
  if (l.categoria !== catAntiga) verificarESalvarRegra(l.descricao, l.categoria, catAntiga);
  salvarDB(); fecharModal('modal-editar'); renderLancamentos(); renderDashboard();
  toast('Lançamento atualizado!');
}

function atualizarBannerValidacao() {
  const pendentes = DB.lancamentos.filter(l => l.status === 'pendente').length;
  const banner = document.getElementById('banner-validacao');
  if (pendentes > 0) {
    banner.style.display = 'flex';
    document.getElementById('banner-count').textContent = pendentes + ' lançamento' + (pendentes > 1 ? 's' : '') + ' aguardando validação';
  } else {
    banner.style.display = 'none';
  }
}

// ========================
// MODAL VALIDAR
// ========================
function abrirValidar(id) {
  const l = DB.lancamentos.find(l => l.id === id);
  if (!l) return;
  document.getElementById('validar-id').value = id;
  document.getElementById('validar-descricao').value = l.descricao;
  document.getElementById('validar-tipo').value = l.tipo;
  document.getElementById('validar-tags').value = (l.tags || []).join(', ');
  preencherSelectCategoria('validar-categoria', l.categoria);
  atualizarSubcatValidar(l.categoria, l.subcategoria);
  document.getElementById('modal-validar').style.display = 'flex';
}

function atualizarSubcatValidar(catId, valorAtual) {
  const subcats = getSubcats(catId);
  const sel = document.getElementById('validar-subcategoria');
  sel.innerHTML = '<option value="">Sem subcategoria</option>' +
    subcats.map(s => '<option value="' + s + '"' + (s === valorAtual ? ' selected' : '') + '>' + s + '</option>').join('');
}

function confirmarValidacao() {
  const id = document.getElementById('validar-id').value;
  const l = DB.lancamentos.find(l => l.id === id);
  if (!l) return;
  const catAntiga = l.categoria;
  l.descricao = document.getElementById('validar-descricao').value;
  l.categoria = document.getElementById('validar-categoria').value;
  l.subcategoria = document.getElementById('validar-subcategoria').value;
  l.tipo = document.getElementById('validar-tipo').value;
  const tagsRaw = document.getElementById('validar-tags').value;
  l.tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
  l.status = 'validado';
  salvarDB();
  // Pergunta se quer criar regra para essa classificação
  if (l.categoria !== catAntiga) {
    verificarESalvarRegra(l.descricao, l.categoria, catAntiga);
  }
  fecharModal('modal-validar'); renderLancamentos(); renderDashboard(); atualizarBannerValidacao();
  toast('Lançamento validado!');
}

function ignorarLancamento() {
  const id = document.getElementById('validar-id').value;
  if (!confirm('Ignorar e excluir este lançamento?')) return;
  DB.lancamentos = DB.lancamentos.filter(l => l.id !== id);
  salvarDB(); fecharModal('modal-validar'); renderLancamentos(); renderDashboard(); atualizarBannerValidacao();
  toast('Lançamento ignorado');
}

// ========================
// IMPORTAR
// ========================
function switchTabPlano(tab, el) {
  document.querySelectorAll('#page-planocontas .tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('#page-planocontas .tab-content').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('plano-tab-' + tab).classList.add('active');
  if (tab === 'regras') renderRegras();
}

function switchTab(tab, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
}

function handleFile(input, tipo) {
  const file = input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => { if (tipo === 'csv') processarCSV(e.target.result); if (tipo === 'ofx') processarOFX(e.target.result); };
  reader.readAsText(file, 'UTF-8');
}

function handleDrop(e, tipo) {
  e.preventDefault();
  const file = e.dataTransfer.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => { if (tipo === 'csv') processarCSV(ev.target.result); if (tipo === 'ofx') processarOFX(ev.target.result); };
  reader.readAsText(file, 'UTF-8');
}

function processarCSV(content) {
  content = content.replace(/^\uFEFF/, '');
  const todasLinhas = content.split('\n');
  let headerIdx = 0;
  for (let i = 0; i < todasLinhas.length; i++) {
    const l = todasLinhas[i].toLowerCase();
    if (l.includes('data') && (l.includes('historico') || l.includes('hist') || l.includes('estabelecimento'))) {
      headerIdx = i; break;
    }
  }
  const linhas = todasLinhas.slice(headerIdx).filter(l => l.trim());
  if (!linhas.length) return;
  const header = linhas[0].toLowerCase();
  const isXP = header.includes('estabelecimento') && header.includes('portador');
  if (isXP) processarCSV_XP(linhas);
  else processarCSV_Inter(linhas);
}

function processarCSV_XP(linhas) {
  const lancamentos = [];
  const nomeProprioRegex = /paulo.*alioti|alioti.*paulo|paulo daniel/i;
  for (let i = 1; i < linhas.length; i++) {
    const cols = linhas[i].split(';').map(c => c.trim().replace(/^"|"$/g, ''));
    if (cols.length < 4) continue;
    const descricao = cols[1] || '';
    const parcela = cols[4] || '-';
    // Usa data real do CSV
    let data = cols[0];
    if (data.includes('/')) {
      const p = data.split('/');
      if (p.length === 3) data = (p[2].length === 2 ? '20' + p[2] : p[2]) + '-' + p[1].padStart(2,'0') + '-' + p[0].padStart(2,'0');
    }
    let valorStr = cols[3].replace(/R\$\s?/g, '').replace(/\./g, '').replace(',', '.').trim();
    let valor = parseFloat(valorStr);
    if (isNaN(valor)) continue;
    const isPagamento = descricao.toLowerCase().includes('pagamento');
    const isProprioNome = nomeProprioRegex.test(descricao);
    const tipo = (isPagamento || isProprioNome) ? 'interno' : 'despesa';
    const descFinal = parcela && parcela !== '-' ? descricao + ' (' + parcela + ')' : descricao;
    lancamentos.push({ data, descricao: descFinal, valor: Math.abs(valor), tipo, categoria: (isPagamento||isProprioNome)?'outros':classificarCategoria(descricao), subcategoria:'', tags:[], status:'pendente', id:gerarId(), origem:'XP' });
  }
  mostrarPreview(lancamentos);
}

function processarCSV_Inter(linhas) {
  const lancamentos = [];
  const nomeProprioRegex = /paulo.*alioti|alioti.*paulo|paulo daniel/i;
  for (let i = 1; i < linhas.length; i++) {
    const cols = linhas[i].split(';').map(c => c.trim().replace(/^"|"$/g, ''));
    if (cols.length < 4) continue;
    let data = cols[0];
    const historico = (cols[1] || '').toLowerCase();
    const descricao = cols[2] || cols[1] || '';
    let valorStr = cols[3].replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.').trim();
    let valor = parseFloat(valorStr);
    if (isNaN(valor)) continue;
    if (data.includes('/')) {
      const p = data.split('/');
      if (p.length === 3) data = (p[2].length === 2 ? '20'+p[2]:p[2]) + '-' + p[1].padStart(2,'0') + '-' + p[0].padStart(2,'0');
    }
    const isAplicacao = historico.includes('aplica');
    const isResgate = historico.includes('resgate');
    const isPixDevolvido = historico.includes('devolvido');
    const isProprioNome = nomeProprioRegex.test(descricao);
    const isRecebido = historico.includes('recebido') && !isPixDevolvido;
    let tipo;
    if (isAplicacao || isResgate || isPixDevolvido || isProprioNome) tipo = 'interno';
    else if (isRecebido) tipo = 'receita';
    else tipo = valor < 0 ? 'despesa' : 'receita';
    lancamentos.push({ data, descricao: descricao||historico, valor:Math.abs(valor), tipo, categoria: tipo==='interno'?'outros':classificarCategoria(descricao+' '+historico), subcategoria:'', tags:[], status:'pendente', id:gerarId(), origem:'Inter' });
  }
  mostrarPreview(lancamentos);
}

function processarOFX(content) {
  const lancamentos = [];
  const regex = /<STMTTRN>([\s\S]*?)<\/STMTTRN>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const bloco = match[1];
    const dtposted = (bloco.match(/<DTPOSTED>([^<\n]+)/)||[])[1]||'';
    const trnamt = (bloco.match(/<TRNAMT>([^<\n]+)/)||[])[1]||'0';
    const memo = (bloco.match(/<MEMO>([^<\n]+)/)||[])[1]||'';
    const data = dtposted.length >= 8 ? dtposted.slice(0,4)+'-'+dtposted.slice(4,6)+'-'+dtposted.slice(6,8) : '';
    if (!data) continue;
    const valor = parseFloat(trnamt.replace(',','.'));
    if (isNaN(valor)) continue;
    lancamentos.push({ data, descricao:memo.trim(), valor:Math.abs(valor), tipo:classificarTipo(memo,valor), categoria:classificarCategoria(memo), subcategoria:'', tags:[], status:'pendente', id:gerarId() });
  }
  mostrarPreview(lancamentos);
}

function classificarTipo(descricao, valor) {
  const desc = descricao.toLowerCase();
  if (['resgate','aplicação','aplicacao','cdb','transferência interna'].some(p => desc.includes(p))) return 'interno';
  if (valor < 0) return 'despesa';
  return 'receita';
}

function classificarCategoria(descricao) {
  // 1. Verifica regras personalizadas primeiro
  const regra = DB.regras.find(r => descricao.toLowerCase().includes(r.chave.toLowerCase()));
  if (regra) return regra.categoria;

  // 2. Classificação automática com novos IDs
  const desc = descricao.toLowerCase();
  if (['ifood','rappi','restaurante','lanche','padaria','mercado','supermercado','hortifruti','hamburguer','esfiha','espetinho','suco','amigao','lost distrib','d fattori','delivery'].some(p => desc.includes(p))) return 'alimentacao';
  if (['netflix','spotify','google one','disney','prime video','apple','adobe','canva'].some(p => desc.includes(p))) return 'assinaturas';
  if (['vivo','tim','claro','oi ','telefonica','conta vivo'].some(p => desc.includes(p))) return 'assinaturas';
  if (['aluguel','condominio','semae','copasa','sabesp','energia','luz ','cemar','cemig','copel'].some(p => desc.includes(p))) return 'moradia';
  if (['estacio','unicesumar','faculdade','mensalidade','ead','economista','vitru'].some(p => desc.includes(p))) return 'faculdade';
  if (['curso','mentoria'].some(p => desc.includes(p))) return 'formacao';
  if (['dizimo','oferta','igreja','revoada','serv revoada','festa revoada'].some(p => desc.includes(p))) return 'igreja';
  if (['cinema','ingresso','parque','shows','show ','concert','futebol'].some(p => desc.includes(p))) return 'lazer';
  if (['farmacia','medico','hospital','clinica','remedio','nutricionista','psicologo','quiropraxia','convenio'].some(p => desc.includes(p))) return 'saude_corpo';
  if (['academia','muay','ciclismo','corrida','bike','suplemento','whey','creatina'].some(p => desc.includes(p))) return 'saude_corpo';
  if (['barbearia','cosmetico','minoxidil','perfume','salao'].some(p => desc.includes(p))) return 'cuidado_pessoal';
  if (['shopee','mercadolivre','amazon','americanas','magazine','casas bahia','renner','shein'].some(p => desc.includes(p))) return 'compras';
  if (['joalheria','joalhe','amsterdam','amisterdan','flores'].some(p => desc.includes(p))) return 'presentes';
  if (['postopalace','posto uni','posto bene','posto porcino','auto posto','combustivel','shell','petrobras','ipiranga'].some(p => desc.includes(p))) return 'transp_variavel';
  if (['uberrides','uber','99app','estacionamento','multa'].some(p => desc.includes(p))) return 'transp_variavel';
  if (['ipva','seguro','licenciamento'].some(p => desc.includes(p))) return 'transp_fixo';
  if (['cdb','lci','lca','tesouro','acoes','fii','etf','bdr','xp investimentos','inter invest'].some(p => desc.includes(p))) return 'inv_renda_fixa';
  return 'outros';
}


// ========================
// REGRAS DE CLASSIFICAÇÃO
// ========================
function verificarESalvarRegra(descricao, categoriaNova, categoriaAntiga) {
  if (categoriaNova === categoriaAntiga) return;
  const chave = descricao.trim();
  if (chave.length < 3) return;
  const jaExiste = DB.regras.find(r => r.chave.toLowerCase() === chave.toLowerCase());
  if (jaExiste) {
    jaExiste.categoria = categoriaNova;
    salvarDB();
    return;
  }
  // Pergunta se quer criar regra
  if (confirm('Sempre classificar "' + chave + '" como ' + getNomeCat(categoriaNova) + '?')) {
    DB.regras.push({ id: gerarId(), chave, categoria: categoriaNova });
    salvarDB();
    toast('Regra salva! Próximas importações serão classificadas automaticamente.');
  }
}

function renderRegras() {
  const lista = document.getElementById('lista-regras');
  if (!lista) return;
  lista.innerHTML = '';
  if (!DB.regras.length) {
    lista.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:16px 0">Nenhuma regra cadastrada ainda.<br>As regras são criadas automaticamente quando você corrige uma classificação.</div>';
    return;
  }
  DB.regras.forEach(r => {
    lista.innerHTML += '<div style="display:flex;align-items:center;gap:12px;padding:9px 0;border-bottom:0.5px solid var(--border-light2)">' +
      '<div style="flex:1"><div style="font-size:13px;font-weight:500">' + r.chave + '</div>' +
      '<div style="font-size:11px;color:var(--text2)">→ ' + getNomeCat(r.categoria) + '</div></div>' +
      '<button class="btn" style="font-size:11px;padding:3px 8px;color:var(--red)" onclick="excluirRegra(\'' + r.id + '\')"><i class="ti ti-trash"></i></button>' +
      '</div>';
  });
}

function excluirRegra(id) {
  DB.regras = DB.regras.filter(r => r.id !== id);
  salvarDB(); renderRegras();
  toast('Regra removida');
}

function mostrarPreview(lancamentos) {
  if (!lancamentos.length) { toast('Nenhum lançamento encontrado no arquivo'); return; }
  const tbody = document.getElementById('tbody-preview');
  tbody.innerHTML = '';
  lancamentos.forEach((l, i) => {
    const isInterno = l.tipo === 'interno';
    const amtClass = isInterno ? 'neu' : l.tipo === 'receita' ? 'pos' : 'neg';
    const amtPrefix = isInterno ? '' : l.tipo === 'receita' ? '+' : '-';
    const catOpts = DB.categorias.map(c => '<option value="'+c.id+'"'+(c.id===l.categoria?' selected':'')+'>'+c.nome+'</option>').join('');
    const subcats = getSubcats(l.categoria);
    const subcatOpts = '<option value="">—</option>' + subcats.map(s => '<option value="'+s+'"'+(s===l.subcategoria?' selected':'')+'>'+s+'</option>').join('');
    tbody.innerHTML += '<tr id="preview-row-'+i+'">' +
      '<td style="white-space:nowrap">'+formatarData(l.data)+'</td>' +
      '<td><input type="text" value="'+l.descricao.replace(/"/g,'&quot;')+'" style="width:100%;min-width:140px;padding:4px 6px;border:0.5px solid var(--border-light);border-radius:6px;font-size:12px" onchange="previewLancs['+i+'].descricao=this.value"></td>' +
      '<td style="min-width:160px">' +
        '<select style="width:100%;padding:4px 6px;border:0.5px solid var(--border-light);border-radius:6px;font-size:12px;margin-bottom:3px" onchange="previewLancs['+i+'].categoria=this.value;atualizarSubcatPreview('+i+',this.value)">'+catOpts+'</select>' +
        '<select id="subcat-preview-'+i+'" style="width:100%;padding:4px 6px;border:0.5px solid var(--border-light);border-radius:6px;font-size:11px;color:var(--text2);margin-bottom:3px" onchange="previewLancs['+i+'].subcategoria=this.value">'+subcatOpts+'</select>' +
        '<input type="text" placeholder="tags..." value="'+(l.tags||[]).join(', ')+'" style="width:100%;padding:3px 6px;border:0.5px solid var(--border-light);border-radius:6px;font-size:11px;color:var(--text2)" onchange="previewLancs['+i+'].tags=this.value.split(\',\').map(function(t){return t.trim();}).filter(Boolean)">' +
      '</td>' +
      '<td><select style="padding:4px 6px;border:0.5px solid var(--border-light);border-radius:6px;font-size:12px" onchange="previewLancs['+i+'].tipo=this.value">' +
        '<option value="despesa"'+(l.tipo==='despesa'?' selected':'')+'>Despesa</option>' +
        '<option value="receita"'+(l.tipo==='receita'?' selected':'')+'>Receita</option>' +
        '<option value="interno"'+(l.tipo==='interno'?' selected':'')+'>Interno</option>' +
      '</select></td>' +
      '<td class="tx-amount '+amtClass+'" style="white-space:nowrap">'+amtPrefix+' '+fmt(l.valor)+'</td>' +
      '<td style="white-space:nowrap">' +
        '<button class="btn" style="font-size:11px;padding:3px 8px;color:var(--text2)" title="Ignorar" onclick="ignorarPreview('+i+')"><i class="ti ti-eye-off"></i></button> ' +
        '<button class="btn" style="font-size:11px;padding:3px 8px;color:var(--red)" title="Excluir" onclick="removerPreview('+i+')"><i class="ti ti-trash"></i></button>' +
      '</td></tr>';
  });
  window.previewLancs = lancamentos;
  document.getElementById('preview-importacao').style.display = 'block';
  const total = lancamentos.length;
  const internos = lancamentos.filter(l => l.tipo === 'interno').length;
  toast(total + ' lançamentos — ' + (total-internos) + ' para validar, ' + internos + ' internos');
}

function atualizarSubcatPreview(i, catId) {
  const subcats = getSubcats(catId);
  const sel = document.getElementById('subcat-preview-' + i);
  if (!sel) return;
  sel.innerHTML = '<option value="">—</option>' + subcats.map(s => '<option value="'+s+'">'+s+'</option>').join('');
  previewLancs[i].subcategoria = '';
}

function ignorarPreview(i) { window.previewLancs.splice(i,1); mostrarPreview(window.previewLancs); toast('Ignorado'); }
function removerPreview(i) { window.previewLancs.splice(i,1); mostrarPreview(window.previewLancs); }

function salvarImportacao() {
  if (!window.previewLancs || !window.previewLancs.length) return;
  DB.lancamentos.push(...window.previewLancs);
  salvarDB();
  document.getElementById('preview-importacao').style.display = 'none';
  window.previewLancs = [];
  atualizarBannerValidacao(); renderDashboard();
  toast('Lançamentos importados com sucesso!');
}

function salvarManual(e) {
  e.preventDefault();
  const catId = document.getElementById('manual-categoria').value;
  const tagsRaw = document.getElementById('manual-tags').value;
  DB.lancamentos.push({
    id: gerarId(),
    data: document.getElementById('manual-data').value,
    descricao: document.getElementById('manual-descricao').value,
    valor: parseFloat(document.getElementById('manual-valor').value),
    tipo: document.getElementById('manual-tipo').value,
    categoria: catId,
    subcategoria: document.getElementById('manual-subcategoria').value,
    tags: tagsRaw ? tagsRaw.split(',').map(t=>t.trim()).filter(Boolean) : [],
    status: 'validado'
  });
  salvarDB(); e.target.reset(); atualizarBannerValidacao(); renderDashboard();
  toast('Lançamento salvo!');
}

function atualizarSubcatManual() {
  const catId = document.getElementById('manual-categoria').value;
  const subcats = getSubcats(catId);
  const sel = document.getElementById('manual-subcategoria');
  sel.innerHTML = '<option value="">Sem subcategoria</option>' + subcats.map(s => '<option value="'+s+'">'+s+'</option>').join('');
}

// ========================
// DRE
// ========================
function preencherDREmeses() {
  const meses = [...new Set(DB.lancamentos.map(l => l.data.slice(0,7)))].sort().reverse();
  if (!meses.includes(mesAtual)) meses.unshift(mesAtual);
  const sel = document.getElementById('dre-mes');
  if (!sel) return;
  sel.innerHTML = meses.map(m => {
    const [y,mo] = m.split('-');
    return '<option value="'+m+'"'+(m===mesAtual?' selected':'')+'>'+new Date(y,mo-1).toLocaleDateString('pt-BR',{month:'long',year:'numeric'})+'</option>';
  }).join('');
}

function renderDRE() {
  const mes = document.getElementById('dre-mes') ? document.getElementById('dre-mes').value : mesAtual;
  const lancs = getMes(mes);
  const receitas = lancs.filter(l => l.tipo === 'receita');
  const despesas = lancs.filter(l => l.tipo === 'despesa');
  const totalRec = receitas.reduce((a,b) => a+b.valor, 0);
  const totalDesp = despesas.reduce((a,b) => a+b.valor, 0);
  const resultado = totalRec - totalDesp;
  const porCat = {};
  despesas.forEach(l => { porCat[l.categoria] = (porCat[l.categoria]||0) + l.valor; });
  const table = document.getElementById('dre-table');
  if (!table) return;
  table.innerHTML =
    '<tr class="dre-section"><td colspan="2">Receitas</td></tr>' +
    (receitas.length ? receitas.map(l => '<tr><td style="padding-left:24px">'+l.descricao+'</td><td class="dre-right tx-amount pos">'+fmt(l.valor)+'</td></tr>').join('') : '<tr><td style="padding-left:24px;color:var(--text3)">Nenhuma receita</td><td></td></tr>') +
    '<tr><td style="padding-left:24px;font-weight:500">Total receitas</td><td class="dre-right tx-amount pos">'+fmt(totalRec)+'</td></tr>' +
    '<tr class="dre-section"><td colspan="2">Despesas por categoria</td></tr>' +
    Object.entries(porCat).sort((a,b)=>b[1]-a[1]).map(([cat,val]) => '<tr><td style="padding-left:24px">'+getNomeCat(cat)+'</td><td class="dre-right tx-amount neg">- '+fmt(val)+'</td></tr>').join('') +
    (!Object.keys(porCat).length ? '<tr><td style="padding-left:24px;color:var(--text3)">Nenhuma despesa</td><td></td></tr>' : '') +
    '<tr><td style="padding-left:24px;font-weight:500">Total despesas</td><td class="dre-right tx-amount neg">- '+fmt(totalDesp)+'</td></tr>' +
    '<tr class="dre-total"><td>Resultado do mês</td><td class="dre-right tx-amount '+(resultado>=0?'pos':'neg')+'">'+(resultado>=0?'':'- ')+fmt(resultado)+'</td></tr>';
}

// ========================
// PLANO DE CONTAS
// ========================
function renderPlanoContas() {
  const lista = document.getElementById('lista-plano-contas');
  if (!lista) return;
  lista.innerHTML = '';
  DB.categorias.forEach((cat, idx) => {
    const orc = DB.orcamentos[cat.id] || 0;
    const podeSubirCat = idx > 0;
    const podeDescer = idx < DB.categorias.length - 1;
    lista.innerHTML +=
      '<div class="plano-cat-item" id="plano-'+cat.id+'">' +
        '<div class="plano-cat-header">' +
          '<div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0">' +
            // Seletor de cor inline
            '<div style="position:relative;flex-shrink:0">' +
              '<div style="width:14px;height:14px;border-radius:50%;background:'+cat.cor+';cursor:pointer;border:2px solid rgba(0,0,0,0.08)" onclick="abrirColorPicker(\''+cat.id+'\')" title="Alterar cor"></div>' +
              '<input type="color" id="color-picker-'+cat.id+'" value="'+cat.cor+'" style="position:absolute;opacity:0;width:0;height:0" onchange="salvarCorCategoria(\''+cat.id+'\',this.value)">' +
            '</div>' +
            // Código editável
            '<input type="text" value="'+(cat.codigo||'')+'" placeholder="Cód" ' +
              'style="width:44px;font-size:11px;color:var(--text3);border:none;background:transparent;text-align:center;padding:2px 0;cursor:text;font-family:inherit" ' +
              'title="Editar código" ' +
              'onblur="salvarCodigoCategoria(\''+cat.id+'\',this.value)" ' +
              'onkeydown="if(event.key===\'Enter\')this.blur()">' +
            // Nome editável
            '<input type="text" value="'+cat.nome.replace(/"/g,'&quot;')+'" ' +
              'style="flex:1;min-width:0;font-size:14px;font-weight:500;border:none;background:transparent;color:var(--text);font-family:inherit;padding:2px 4px;cursor:text;border-radius:4px" ' +
              'title="Editar nome" ' +
              'onblur="salvarNomeCategoria(\''+cat.id+'\',this.value)" ' +
              'onkeydown="if(event.key===\'Enter\')this.blur()">' +
          '</div>' +
          '<div style="display:flex;align-items:center;gap:6px;flex-shrink:0">' +
            // Reordenar categoria
            '<button class="btn" style="font-size:11px;padding:2px 6px;color:var(--text3)" title="Mover para cima" onclick="moverCategoria(\''+cat.id+'\',-1)"'+(podeSubirCat?'':' disabled style="font-size:11px;padding:2px 6px;opacity:0.3"')+'>↑</button>' +
            '<button class="btn" style="font-size:11px;padding:2px 6px;color:var(--text3)" title="Mover para baixo" onclick="moverCategoria(\''+cat.id+'\',1)"'+(podeDescer?'':' disabled style="font-size:11px;padding:2px 6px;opacity:0.3"')+'>↓</button>' +
            '<div class="orc-input-wrap">' +
              '<span style="font-size:11px;color:var(--text3)">Orç:</span>' +
              '<input type="number" class="orc-input" value="'+(orc||'')+'" placeholder="—" onchange="salvarOrcamento(\''+cat.id+'\',this.value)" step="0.01">' +
            '</div>' +
            '<button class="btn" style="font-size:11px;padding:3px 8px" onclick="adicionarSubcat(\''+cat.id+'\')" title="Nova subcategoria"><i class="ti ti-plus"></i></button>' +
            '<button class="btn" style="font-size:11px;padding:3px 8px;color:var(--red)" onclick="excluirCategoria(\''+cat.id+'\')" title="Excluir categoria"><i class="ti ti-trash"></i></button>' +
          '</div>' +
        '</div>' +
        '<div class="plano-subcats" id="subcats-'+cat.id+'">' +
          (cat.subcats||[]).map((s, si) => {
            const podeSubir = si > 0;
            const podeBaixo = si < (cat.subcats||[]).length - 1;
            return '<div class="subcat-item">' +
              '<div style="display:flex;align-items:center;gap:6px;flex:1">' +
                '<span style="color:var(--text3);font-size:12px">›</span>' +
                '<input type="text" value="'+s.replace(/"/g,'&quot;')+'" ' +
                  'style="flex:1;font-size:13px;color:var(--text2);border:none;background:transparent;font-family:inherit;padding:2px 4px;border-radius:4px;cursor:text" ' +
                  'title="Editar subcategoria" ' +
                  'onblur="renomearSubcat(\''+cat.id+'\','+si+',this.value)" ' +
                  'onkeydown="if(event.key===\'Enter\')this.blur()">' +
              '</div>' +
              '<div style="display:flex;gap:4px">' +
                '<button class="btn" style="font-size:10px;padding:1px 5px;color:var(--text3)" title="Subir" onclick="moverSubcat(\''+cat.id+'\','+si+',-1)"'+(podeSubir?'':' disabled style="font-size:10px;padding:1px 5px;opacity:0.3"')+'>↑</button>' +
                '<button class="btn" style="font-size:10px;padding:1px 5px;color:var(--text3)" title="Descer" onclick="moverSubcat(\''+cat.id+'\','+si+',1)"'+(podeBaixo?'':' disabled style="font-size:10px;padding:1px 5px;opacity:0.3"')+'>↓</button>' +
                '<button class="btn" style="font-size:10px;padding:2px 6px;color:var(--red)" onclick="excluirSubcat(\''+cat.id+'\',\''+s.replace(/'/g,"\\'")+'\')" title="Excluir"><i class="ti ti-x"></i></button>' +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>';
  });
}

function abrirColorPicker(catId) {
  const input = document.getElementById('color-picker-' + catId);
  if (input) input.click();
}

function salvarCorCategoria(catId, cor) {
  const cat = DB.categorias.find(c => c.id === catId);
  if (!cat) return;
  cat.cor = cor;
  salvarDB(); renderPlanoContas(); renderDashboard();
  toast('Cor atualizada!');
}

function salvarNomeCategoria(catId, nome) {
  nome = nome.trim();
  if (!nome) { renderPlanoContas(); return; }
  const cat = DB.categorias.find(c => c.id === catId);
  if (!cat || cat.nome === nome) return;
  cat.nome = nome;
  salvarDB(); preencherSelects();
  toast('Nome salvo!');
}

function salvarCodigoCategoria(catId, codigo) {
  const cat = DB.categorias.find(c => c.id === catId);
  if (!cat) return;
  cat.codigo = codigo.trim();
  salvarDB();
}

function moverCategoria(catId, dir) {
  const idx = DB.categorias.findIndex(c => c.id === catId);
  if (idx < 0) return;
  const novo = idx + dir;
  if (novo < 0 || novo >= DB.categorias.length) return;
  const temp = DB.categorias[idx];
  DB.categorias[idx] = DB.categorias[novo];
  DB.categorias[novo] = temp;
  salvarDB(); renderPlanoContas(); preencherSelects();
}

function moverSubcat(catId, si, dir) {
  const cat = DB.categorias.find(c => c.id === catId);
  if (!cat || !cat.subcats) return;
  const novo = si + dir;
  if (novo < 0 || novo >= cat.subcats.length) return;
  const temp = cat.subcats[si];
  cat.subcats[si] = cat.subcats[novo];
  cat.subcats[novo] = temp;
  salvarDB(); renderPlanoContas();
}

function renomearSubcat(catId, si, novoNome) {
  novoNome = novoNome.trim();
  if (!novoNome) { renderPlanoContas(); return; }
  const cat = DB.categorias.find(c => c.id === catId);
  if (!cat || !cat.subcats) return;
  const nomeAntigo = cat.subcats[si];
  if (nomeAntigo === novoNome) return;
  // Atualiza lançamentos existentes
  DB.lancamentos.forEach(l => {
    if (l.categoria === catId && l.subcategoria === nomeAntigo) l.subcategoria = novoNome;
  });
  cat.subcats[si] = novoNome;
  salvarDB(); preencherSelects();
  toast('Subcategoria renomeada!');
}

function salvarOrcamento(catId, valor) {
  const v = parseFloat(valor);
  if (isNaN(v) || v <= 0) { delete DB.orcamentos[catId]; }
  else { DB.orcamentos[catId] = v; }
  salvarDB(); toast('Orçamento salvo!');
}

function adicionarSubcat(catId) {
  const nome = prompt('Nome da subcategoria:');
  if (!nome || !nome.trim()) return;
  const cat = DB.categorias.find(c => c.id === catId);
  if (!cat) return;
  if (!cat.subcats) cat.subcats = [];
  if (cat.subcats.includes(nome.trim())) { toast('Subcategoria já existe'); return; }
  cat.subcats.push(nome.trim());
  salvarDB(); renderPlanoContas(); preencherSelects();
  toast('Subcategoria criada!');
}

function excluirSubcat(catId, nome) {
  const cat = DB.categorias.find(c => c.id === catId);
  if (!cat) return;
  cat.subcats = (cat.subcats||[]).filter(s => s !== nome);
  salvarDB(); renderPlanoContas(); preencherSelects();
  toast('Subcategoria removida');
}

function abrirModalCategoria() {
  document.getElementById('edit-cat-id').value = '';
  document.getElementById('edit-cat-nome').value = '';
  document.getElementById('edit-cat-codigo').value = '';
  document.getElementById('edit-cat-cor').value = '#4f9cf9';
  document.getElementById('modal-edit-cat').style.display = 'flex';
}

function salvarNovaOuEditadaCategoria() {
  const nome = document.getElementById('edit-cat-nome').value.trim();
  const codigo = document.getElementById('edit-cat-codigo').value.trim();
  const cor = document.getElementById('edit-cat-cor').value;
  if (!nome) { toast('Informe o nome'); return; }
  const id = nome.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,'') + '_' + Date.now().toString(36);
  DB.categorias.push({ id, nome, cor, codigo, subcats: [] });
  salvarDB(); fecharModal('modal-edit-cat'); preencherSelects(); renderPlanoContas();
  toast('Categoria criada!');
}

function excluirCategoria(id) {
  if (!confirm('Excluir categoria? Os lançamentos ficarão como "outros".')) return;
  DB.categorias = DB.categorias.filter(c => c.id !== id);
  salvarDB(); preencherSelects(); renderPlanoContas();
  toast('Categoria excluída');
}

// ========================
// PATRIMÔNIO
// ========================
function renderPatrimonio() {
  const pats = [...DB.patrimonio].sort((a,b) => a.mes.localeCompare(b.mes));
  const atual = pats.length ? pats[pats.length-1].valor : 0;
  const ant = pats.length > 1 ? pats[pats.length-2].valor : 0;
  document.getElementById('pat-atual').textContent = fmt(atual);
  document.getElementById('pat-mes').textContent = (atual-ant>=0?'+':'-') + ' ' + fmt(Math.abs(atual-ant));

  if (chartPatrimonioFull) chartPatrimonioFull.destroy();
  const ctx = document.getElementById('chartPatrimonioFull');
  if (!ctx || !pats.length) return;
  chartPatrimonioFull = new Chart(ctx, {
    type:'line',
    data:{ labels:pats.map(p=>{const[y,m]=p.mes.split('-');return new Date(y,m-1).toLocaleDateString('pt-BR',{month:'short',year:'2-digit'});}), datasets:[{data:pats.map(p=>p.valor),borderColor:'#4f9cf9',backgroundColor:'rgba(79,156,249,0.08)',borderWidth:2,pointBackgroundColor:'#4f9cf9',pointRadius:4,fill:true,tension:0.4}] },
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>fmt(ctx.raw)}}},scales:{x:{grid:{color:'rgba(0,0,0,0.04)'},ticks:{color:'#94a3b8',font:{size:11}}},y:{grid:{color:'rgba(0,0,0,0.04)'},ticks:{color:'#94a3b8',font:{size:11},callback:v=>'R$'+(v/1000).toFixed(0)+'k'}}}}
  });
}

function salvarPatrimonio(e) {
  e.preventDefault();
  const mes = document.getElementById('pat-data').value;
  const valor = parseFloat(document.getElementById('pat-valor').value);
  if (!mes || isNaN(valor)) return;
  const idx = DB.patrimonio.findIndex(p => p.mes === mes);
  if (idx >= 0) DB.patrimonio[idx].valor = valor;
  else DB.patrimonio.push({ mes, valor });
  salvarDB(); renderPatrimonio(); renderDashboard();
  toast('Patrimônio registrado!');
}

// ========================
// RESUMO COACH
// ========================
function gerarResumoCoach() {
  const mes = mesAtual;
  const [y,m] = mes.split('-');
  const nomeMes = new Date(y,m-1).toLocaleDateString('pt-BR',{month:'long',year:'numeric'});
  const lancs = getMes(mes);
  const receitas = lancs.filter(l=>l.tipo==='receita').reduce((a,b)=>a+b.valor,0);
  const despesas = lancs.filter(l=>l.tipo==='despesa').reduce((a,b)=>a+b.valor,0);
  const resultado = receitas - despesas;
  const taxaPoupanca = receitas > 0 ? ((resultado/receitas)*100).toFixed(0) : 0;
  const porCat = {};
  lancs.filter(l=>l.tipo==='despesa').forEach(l=>{ porCat[l.categoria]=(porCat[l.categoria]||0)+l.valor; });
  const pats = [...DB.patrimonio].sort((a,b)=>a.mes.localeCompare(b.mes));
  const patAtual = pats.length ? pats[pats.length-1].valor : 0;
  const patAnt = pats.length > 1 ? pats[pats.length-2].valor : 0;
  const evolPat = patAtual - patAnt;
  const topGastos = Object.entries(porCat).sort((a,b)=>b[1]-a[1]).slice(0,3);
  // Alertas de orçamento
  const alertasOrc = Object.entries(porCat).filter(([cat,val]) => DB.orcamentos[cat] && val > DB.orcamentos[cat]).map(([cat,val]) => '⚠️ ' + getNomeCat(cat) + ': estourou em ' + fmt(val - DB.orcamentos[cat]));
  const texto =
    '📊 RESUMO FINANCEIRO — ' + nomeMes.toUpperCase() + '\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
    '💰 RESULTADO DO MÊS\n' +
    'Receitas:    ' + fmtSimples(receitas) + '\n' +
    'Despesas:    ' + fmtSimples(despesas) + '\n' +
    'Sobra:       ' + fmtSimples(resultado) + ' ' + (resultado>=0?'✅':'⚠️') + '\n' +
    'Taxa de poupança: ' + taxaPoupanca + '%\n\n' +
    '📂 DESPESAS POR CATEGORIA\n' +
    (Object.entries(porCat).sort((a,b)=>b[1]-a[1]).map(([cat,val]) => getNomeCat(cat).padEnd(20) + fmtSimples(val)).join('\n') || 'Nenhuma despesa registrada') + '\n\n' +
    '🏦 PATRIMÔNIO\n' +
    'Patrimônio atual:    ' + fmtSimples(patAtual) + '\n' +
    'Evolução no mês:     ' + (evolPat>=0?'+':'') + fmtSimples(evolPat) + '\n' +
    'Meta (30 anos):      R$ 1.000.000,00\n' +
    'Progresso:           ' + (patAtual>0?((patAtual/1000000)*100).toFixed(1):0) + '%\n\n' +
    '⚡ TOP 3 MAIORES GASTOS\n' +
    (topGastos.map(([cat,val])=>getNomeCat(cat)+': '+fmtSimples(val)).join('\n')||'Sem dados') + '\n\n' +
    (alertasOrc.length ? '🚨 ALERTAS DE ORÇAMENTO\n' + alertasOrc.join('\n') + '\n\n' : '') +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    'Gerado em ' + new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
  document.getElementById('resumo-texto').value = texto;
  document.getElementById('modal-coach').style.display = 'flex';
}

function copiarResumo() {
  navigator.clipboard.writeText(document.getElementById('resumo-texto').value).then(() => toast('Copiado! Cole aqui no chat com o coach.'));
}

// ========================
// SELECTS
// ========================
function preencherSelects() {
  ['manual-categoria','validar-categoria','filtro-categoria'].forEach(id => {
    const el = document.getElementById(id); if (!el) return;
    const isFilter = id === 'filtro-categoria';
    el.innerHTML = (isFilter ? '<option value="">Todas as categorias</option>' : '') +
      DB.categorias.map(c => '<option value="'+c.id+'">'+c.nome+'</option>').join('');
  });
}

function preencherSelectCategoria(id, valor) {
  const el = document.getElementById(id); if (!el) return;
  el.innerHTML = DB.categorias.map(c => '<option value="'+c.id+'"'+(c.id===valor?' selected':'')+'>'+c.nome+'</option>').join('');
}

// ========================
// CONFIG
// ========================
function salvarConfig() {
  DB.config.nome = document.getElementById('cfg-nome').value;
  DB.config.meta = parseFloat(document.getElementById('cfg-meta').value);
  salvarDB(); toast('Configurações salvas!');
}

function exportarDados() {
  const blob = new Blob([JSON.stringify(DB,null,2)],{type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'financeiro-paulo-'+new Date().toISOString().slice(0,10)+'.json';
  a.click(); toast('Dados exportados!');
}

function limparDados() {
  if (!confirm('Tem certeza? Todos os lançamentos serão apagados.')) return;
  DB.lancamentos = []; DB.patrimonio = [];
  salvarDB(); renderDashboard(); renderLancamentos();
  toast('Dados limpos');
}

function abrirModalLancamento() {
  showPage('importar');
  switchTab('manual', document.querySelectorAll('.tab')[2]);
}
