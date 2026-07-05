// ========================
// ESTADO GLOBAL
// ========================
let DB = {
  lancamentos: [],
  patrimonio: [],
  categorias: [
    // ── RECEITAS ──
    { id: 'rec_trabalho', natureza: 'receita',     nome: 'Trabalho Fixo',             cor: '#16a34a', codigo: '1.1', subcats: ['Salário Mar&Rio','Comissões'] },
    { id: 'rec_servicos', natureza: 'receita',     nome: 'Prestação de Serviços',     cor: '#15803d', codigo: '1.2', subcats: ['Clínica de Fisioterapia','BPO Financeiro','Consultoria Contábil','Outros'] },
    { id: 'rec_projeto_ia', natureza: 'receita',   nome: 'Projeto IA / Automação',    cor: '#166534', codigo: '1.3', subcats: ['Receita Operacional','Participação Societária'] },
    { id: 'rec_investimentos', natureza: 'receita', nome: 'Rendimentos',              cor: '#14532d', codigo: '1.4', subcats: ['Dividendos','Juros / Renda Fixa','CDB / LCI / LCA','Outros'] },
    { id: 'rec_eventual', natureza: 'receita',     nome: 'Eventual',                  cor: '#4ade80', codigo: '1.5', subcats: ['Venda de Bens','Outros'] },
    // ── DESPESAS FIXAS ──
    { id: 'moradia', natureza: 'despesa',          nome: 'Moradia',                   cor: '#84cc16', codigo: '2.1', subcats: ['Aluguel','Condomínio','Internet','Água (Semae)','Energia Elétrica','Gás','Outros'] },
    { id: 'transp_fixo', natureza: 'despesa',      nome: 'Transporte Fixo',           cor: '#65a30d', codigo: '2.2', subcats: ['IPVA / Licenciamento','Seguro do Veículo','Financiamento Veículo'] },
    { id: 'assinaturas', natureza: 'despesa',      nome: 'Assinaturas',               cor: '#6366f1', codigo: '2.3', subcats: ['Telefone','Streaming','Google','Apps','Outros'] },
    { id: 'faculdade', natureza: 'despesa',        nome: 'Faculdade',                 cor: '#8b5cf6', codigo: '2.4', subcats: ['Mensalidade Estácio','Material'] },
    { id: 'igreja', natureza: 'despesa',           nome: 'Igreja',                    cor: '#ec4899', codigo: '2.5', subcats: ['Dízimo','Oferta','Eventos'] },
    // ── DESPESAS VARIÁVEIS ──
    { id: 'alimentacao', natureza: 'despesa',      nome: 'Alimentação',               cor: '#f59e0b', codigo: '3.1', subcats: ['Mercado','Delivery','Restaurante','Outros'] },
    { id: 'transp_variavel', natureza: 'despesa',  nome: 'Transporte Variável',       cor: '#d97706', codigo: '3.2', subcats: ['Combustível Carro','Combustível Moto','Manutenção Carro','Manutenção Moto','Pneus','Uber','Estacionamento','Multa'] },
    { id: 'saude_corpo', natureza: 'despesa',      nome: 'Saúde & Corpo',             cor: '#2dd4bf', codigo: '3.3', subcats: ['Academia','Muay thai','Suplemento','Convênio','Nutricionista','Psicólogo','Quiropraxia','Remédio','Equipamentos','Outros'] },
    { id: 'cuidado_pessoal', natureza: 'despesa',  nome: 'Cuidado Pessoal',           cor: '#f43f5e', codigo: '3.4', subcats: ['Barbearia','Cosméticos','Outros'] },
    { id: 'formacao', natureza: 'despesa',         nome: 'Formação',                  cor: '#a855f7', codigo: '3.5', subcats: ['Cursos','Livros','Mentoria','Outros'] },
    { id: 'lazer', natureza: 'despesa',            nome: 'Lazer',                     cor: '#14b8a6', codigo: '3.6', subcats: ['Cinema','Rolê / Social','Viagem','Entretenimento','Conferências','Outros'] },
    // ── GASTOS PONTUAIS ──
    { id: 'compras', natureza: 'despesa',          nome: 'Compras',                   cor: '#fb923c', codigo: '4.1', subcats: ['Vestuário','Eletrônico','Eletrodoméstico','Móvel','Utilitários','Outros'] },
    { id: 'presentes', natureza: 'despesa',        nome: 'Presentes & Datas',         cor: '#f87171', codigo: '4.2', subcats: ['Aniversário','Celebrações','Outros'] },
    // ── INVESTIMENTOS & PATRIMÔNIO ──
    { id: 'inv_renda_fixa', natureza: 'investimento',   nome: 'Renda Fixa',                cor: '#0d9488', codigo: '5.1', subcats: ['CDB','LCI / LCA','Tesouro Direto'] },
    { id: 'inv_renda_var', natureza: 'investimento',    nome: 'Renda Variável',            cor: '#0f766e', codigo: '5.2', subcats: ['Ações','FIIs','ETFs','BDRs'] },
    { id: 'inv_reservas', natureza: 'investimento',     nome: 'Reservas',                  cor: '#115e59', codigo: '5.3', subcats: ['Reserva de Emergência','Reserva de Oportunidade'] },
    { id: 'inv_negocio', natureza: 'investimento',      nome: 'Negócio',                   cor: '#134e4a', codigo: '5.4', subcats: ['Aporte Projeto IA','Ferramentas / Infraestrutura'] },
    { id: 'inv_objetivos', natureza: 'investimento',    nome: 'Objetivos Futuros',         cor: '#4f9cf9', codigo: '5.5', subcats: ['Poupança Casamento','Fundo Imóvel'] },
    // ── OUTROS ──
    { id: 'outros', natureza: 'todas',           nome: 'Outros',                    cor: '#94a3b8', codigo: '9.9', subcats: [] },
  ],
  orcamentos: {},
  regras: [],
  tags: [],
  ignorados: [],
  previstos: [],
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
  try { renderSeletorTags('manual-tags-seletor', []); } catch(e) { console.error('seletorTags:', e); }
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
      DB.lancamentos = parsed.lancamentos || [];
      DB.patrimonio = parsed.patrimonio || [];
      DB.orcamentos = parsed.orcamentos || {};
      DB.regras = parsed.regras || [];
      DB.tags = parsed.tags || [];
      DB.ignorados = parsed.ignorados || [];
      DB.previstos = parsed.previstos || [];
      DB.config = { ...DB.config, ...(parsed.config || {}) };
      if (parsed.categorias && parsed.categorias.length) {
        DB.categorias = parsed.categorias.map(pc => {
          const def = DB.categorias.find(d => d.id === pc.id);
          return { ...pc, subcats: pc.subcats || (def ? def.subcats : []) };
        });
      }
      // Migração v3 — força atualização do plano de contas para versão completa com receitas
      if (!parsed.migradoV3) {
        const planoNovo = [
          { id: 'rec_trabalho', natureza: 'receita',      nome: 'Trabalho Fixo',           cor: '#16a34a', codigo: '1.1', subcats: ['Salário Mar&Rio','Comissões'] },
          { id: 'rec_servicos', natureza: 'receita',      nome: 'Prestação de Serviços',   cor: '#15803d', codigo: '1.2', subcats: ['Clínica de Fisioterapia','BPO Financeiro','Consultoria Contábil','Outros'] },
          { id: 'rec_projeto_ia', natureza: 'receita',    nome: 'Projeto IA / Automação',  cor: '#166534', codigo: '1.3', subcats: ['Receita Operacional','Participação Societária'] },
          { id: 'rec_investimentos', natureza: 'receita', nome: 'Rendimentos',             cor: '#14532d', codigo: '1.4', subcats: ['Dividendos','Juros / Renda Fixa','CDB / LCI / LCA','Outros'] },
          { id: 'rec_eventual', natureza: 'receita',      nome: 'Eventual',                cor: '#4ade80', codigo: '1.5', subcats: ['Venda de Bens','Outros'] },
          { id: 'moradia', natureza: 'despesa',           nome: 'Moradia',                 cor: '#84cc16', codigo: '2.1', subcats: ['Aluguel','Condomínio','Internet','Água (Semae)','Energia Elétrica','Gás','Outros'] },
          { id: 'transp_fixo', natureza: 'despesa',       nome: 'Transporte Fixo',         cor: '#65a30d', codigo: '2.2', subcats: ['IPVA / Licenciamento','Seguro do Veículo','Financiamento Veículo'] },
          { id: 'assinaturas', natureza: 'despesa',       nome: 'Assinaturas',             cor: '#6366f1', codigo: '2.3', subcats: ['Telefone','Streaming','Google','Apps','Outros'] },
          { id: 'faculdade', natureza: 'despesa',         nome: 'Faculdade',               cor: '#8b5cf6', codigo: '2.4', subcats: ['Mensalidade Estácio','Material'] },
          { id: 'igreja', natureza: 'despesa',            nome: 'Igreja',                  cor: '#ec4899', codigo: '2.5', subcats: ['Dízimo','Oferta','Eventos'] },
          { id: 'alimentacao', natureza: 'despesa',       nome: 'Alimentação',             cor: '#f59e0b', codigo: '3.1', subcats: ['Mercado','Delivery','Restaurante','Outros'] },
          { id: 'transp_variavel', natureza: 'despesa',   nome: 'Transporte Variável',     cor: '#d97706', codigo: '3.2', subcats: ['Combustível Carro','Combustível Moto','Manutenção Carro','Manutenção Moto','Pneus','Uber','Estacionamento','Multa'] },
          { id: 'saude_corpo', natureza: 'despesa',       nome: 'Saúde & Corpo',           cor: '#2dd4bf', codigo: '3.3', subcats: ['Academia','Muay thai','Suplemento','Convênio','Nutricionista','Psicólogo','Quiropraxia','Remédio','Equipamentos','Outros'] },
          { id: 'cuidado_pessoal', natureza: 'despesa',   nome: 'Cuidado Pessoal',         cor: '#f43f5e', codigo: '3.4', subcats: ['Barbearia','Cosméticos','Outros'] },
          { id: 'formacao', natureza: 'despesa',          nome: 'Formação',                cor: '#a855f7', codigo: '3.5', subcats: ['Cursos','Livros','Mentoria','Outros'] },
          { id: 'lazer', natureza: 'despesa',             nome: 'Lazer',                   cor: '#14b8a6', codigo: '3.6', subcats: ['Cinema','Rolê / Social','Viagem','Entretenimento','Conferências','Outros'] },
          { id: 'compras', natureza: 'despesa',           nome: 'Compras',                 cor: '#fb923c', codigo: '4.1', subcats: ['Vestuário','Eletrônico','Eletrodoméstico','Móvel','Utilitários','Outros'] },
          { id: 'presentes', natureza: 'despesa',         nome: 'Presentes & Datas',       cor: '#f87171', codigo: '4.2', subcats: ['Aniversário','Celebrações','Outros'] },
          { id: 'inv_renda_fixa', natureza: 'investimento',    nome: 'Renda Fixa',              cor: '#0d9488', codigo: '5.1', subcats: ['CDB','LCI / LCA','Tesouro Direto'] },
          { id: 'inv_renda_var', natureza: 'investimento',     nome: 'Renda Variável',          cor: '#0f766e', codigo: '5.2', subcats: ['Ações','FIIs','ETFs','BDRs'] },
          { id: 'inv_reservas', natureza: 'investimento',      nome: 'Reservas',                cor: '#115e59', codigo: '5.3', subcats: ['Reserva de Emergência','Reserva de Oportunidade'] },
          { id: 'inv_negocio', natureza: 'investimento',       nome: 'Negócio',                 cor: '#134e4a', codigo: '5.4', subcats: ['Aporte Projeto IA','Ferramentas / Infraestrutura'] },
          { id: 'inv_objetivos', natureza: 'investimento',     nome: 'Objetivos Futuros',       cor: '#4f9cf9', codigo: '5.5', subcats: ['Poupança Casamento','Fundo Imóvel'] },
          { id: 'outros', natureza: 'todas',            nome: 'Outros',                  cor: '#94a3b8', codigo: '9.9', subcats: [] },
        ];
        // Preserva subcats customizadas que o usuário possa ter adicionado
        DB.categorias = planoNovo.map(nova => {
          const antiga = DB.categorias.find(c => c.id === nova.id);
          if (antiga && antiga.subcats && antiga.subcats.length > nova.subcats.length) {
            return { ...nova, subcats: antiga.subcats };
          }
          return nova;
        });
        DB.migradoV3 = true;
        salvarDB();
        console.log('Migração v3 — plano de contas atualizado');
      }
      // Migração v2 — IDs antigos de categoria
      if (!parsed.migradoV2) {
        const mapa = {
          'academia': 'saude_corpo', 'esporte': 'saude_corpo', 'saude': 'saude_corpo',
          'beleza': 'cuidado_pessoal', 'casa': 'moradia', 'comunicacao': 'assinaturas',
          'transp_carro': 'transp_variavel', 'transp_moto': 'transp_variavel', 'transp_demais': 'transp_variavel',
          'pontual': 'compras', 'namoro': 'lazer', 'presente': 'presentes',
          'roupas': 'compras', 'investimento': 'inv_renda_fixa'
        };
        let migrou = false;
        DB.lancamentos.forEach(l => {
          if (mapa[l.categoria]) { l.categoria = mapa[l.categoria]; migrou = true; }
        });
        DB.regras.forEach(r => {
          if (mapa[r.categoria]) { r.categoria = mapa[r.categoria]; migrou = true; }
        });
        DB.lancamentos.forEach(l => {
          if (l.subcategoria === 'Unicesumar') { l.subcategoria = 'Faculdade'; migrou = true; }
        });
        const catFaculdade = DB.categorias.find(c => c.id === 'faculdade');
        if (catFaculdade && catFaculdade.subcats) {
          const idx = catFaculdade.subcats.indexOf('Unicesumar');
          if (idx !== -1) { catFaculdade.subcats[idx] = 'Faculdade'; migrou = true; }
        }
        if (migrou) {
          DB.migradoV2 = true;
          salvarDB();
          console.log('Migração v2 concluída');
        }
      }
      // Migração v4 — adiciona campo natureza nas categorias salvas
      if (!parsed.migradoV4) {
        const receitasIds = ['rec_trabalho','rec_servicos','rec_projeto_ia','rec_investimentos','rec_eventual'];
        const investIds = ['inv_renda_fixa','inv_renda_var','inv_reservas','inv_negocio','inv_objetivos'];
        DB.categorias.forEach(c => {
          if (c.natureza) return; // já tem
          if (c.id === 'outros') c.natureza = 'todas';
          else if (receitasIds.includes(c.id) || c.id.startsWith('rec_')) c.natureza = 'receita';
          else if (investIds.includes(c.id) || c.id.startsWith('inv_')) c.natureza = 'investimento';
          else c.natureza = 'despesa';
        });
        DB.migradoV4 = true;
        salvarDB();
        console.log('Migração v4 — natureza das categorias definida');
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

    const navMap = { dashboard:0, lancamentos:1, previsao:2, dre:3, planocontas:4, patrimonio:5, importar:6, configuracoes:7 };
    const items = document.querySelectorAll('.nav-item');
    if (items[navMap[id]]) items[navMap[id]].classList.add('active');

    const titles = {
      dashboard:'Dashboard', lancamentos:'Lançamentos', previsao:'Previsão', importar:'Conferência Mensal',
      dre:'DRE', planocontas:'Plano de Contas', patrimonio:'Patrimônio',
      configuracoes:'Configurações'
    };
    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent = titles[id] || id;

    if (id === 'dashboard') renderDashboard();
    if (id === 'lancamentos') renderLancamentos();
    if (id === 'previsao') renderPrevisao();
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
function preencherSeletorMesDashboard() {
  const sel = document.getElementById('dash-mes-select');
  if (!sel) return;
  // Coleta todos os meses com lançamentos + mês atual
  const meses = [...new Set([mesAtual, ...DB.lancamentos.map(l => l.data.slice(0,7))])].sort().reverse();
  sel.innerHTML = meses.map(m => {
    const [y, mo] = m.split('-');
    const label = new Date(parseInt(y), parseInt(mo)-1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    return '<option value="'+m+'"'+(m===mesAtual?' selected':'')+'>'+label.charAt(0).toUpperCase()+label.slice(1)+'</option>';
  }).join('');
}

function preencherSeletorTagDashboard() {
  const sel = document.getElementById('dash-filtro-tag-select');
  if (!sel) return;
  const valorAtual = sel.value;
  sel.innerHTML = '<option value="">Todas as tags</option>' +
    DB.tags.map(t => '<option value="'+t.nome+'"'+(t.nome===valorAtual?' selected':'')+'>'+t.nome+'</option>').join('');
}

function mudarMesDashboard(mes) {
  mesAtual = mes;
  renderDashboard();
}

function navegarMes(dir) {
  const [y, m] = mesAtual.split('-').map(Number);
  const d = new Date(y, m - 1 + dir, 1);
  mesAtual = d.toISOString().slice(0, 7);
  preencherSeletorMesDashboard();
  renderDashboard();
}

function renderDashboard() {
  preencherSeletorMesDashboard();
  preencherSeletorTagDashboard();

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

  // Filtro por tag via select
  const dashTag = (document.getElementById('dash-filtro-tag-select')?.value || '').trim().toLowerCase();
  const lancsFiltrados = dashTag
    ? lancsMes.filter(l => (l.tags || []).some(t => t.toLowerCase() === dashTag))
    : lancsMes;

  const subEl = document.getElementById('dash-tag-sub');
  if (subEl) subEl.textContent = dashTag ? 'Tag: ' + dashTag : 'vs orçamento';

  // Gastos por categoria
  const porCat = {};
  lancsFiltrados.filter(l => l.tipo === 'despesa').forEach(l => {
    porCat[l.categoria] = (porCat[l.categoria] || 0) + l.valor;
  });
  const maxVal = Math.max(...Object.values(porCat), 1);
  const listaCats = document.getElementById('lista-categorias');
  listaCats.innerHTML = '';
  Object.entries(porCat).sort((a, b) => b[1] - a[1]).slice(0, 8).forEach(([cat, val]) => {
    const orc = DB.orcamentos[cat] || 0;
    const pct = orc > 0 ? Math.min(Math.round((val / orc) * 100), 100) : Math.round((val / maxVal) * 100);
    const corBarra = orc > 0 && val > orc ? '#ef4444' : getCor(cat);
    const orcLabel = orc > 0 && !dashTag ? '<span style="font-size:10px;color:var(--text3);margin-left:4px">/ ' + fmt(orc) + '</span>' : '';
    listaCats.innerHTML += '<div class="cat-item">' +
      '<span class="cat-label">' + getNomeCat(cat) + '</span>' +
      '<div class="cat-bar-bg"><div class="cat-bar" style="width:' + pct + '%;background:' + corBarra + '"></div></div>' +
      '<span class="cat-value">' + fmt(val) + orcLabel + '</span>' +
      '</div>';
  });
  if (!Object.keys(porCat).length) {
    listaCats.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:16px 0;text-align:center">Nenhuma despesa' + (dashTag ? ' com a tag "' + dashTag + '"' : '') + ' em ' + mesAtual + '</div>';
  }

  // Últimos lançamentos
  const ultimos = [...DB.lancamentos].sort((a, b) => b.data.localeCompare(a.data)).slice(0, 5);
  const listaUltimos = document.getElementById('lista-ultimos');
  listaUltimos.innerHTML = '';
  if (!ultimos.length) {
    listaUltimos.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:8px 0">Nenhum lançamento ainda</div>';
  }
  ultimos.forEach(l => { listaUltimos.innerHTML += buildTxItem(l); });

  // ===== PROJEÇÃO DO MÊS (previsibilidade) =====
  const cardProj = document.getElementById('card-projecao');
  const temPrevisao = (DB.previstos && DB.previstos.length) || Object.keys(DB.orcamentos).length;
  if (cardProj) {
    if (temPrevisao && !dashTag) {
      cardProj.style.display = 'block';
      const receitaPrev = (DB.previstos || []).filter(p => p.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
      const despesaPrevLanc = (DB.previstos || []).filter(p => p.tipo === 'despesa').reduce((a, b) => a + b.valor, 0);
      // Despesa prevista = maior entre previstos recorrentes e soma de orçamentos
      const despesaPrevOrc = Object.values(DB.orcamentos).reduce((a, b) => a + b, 0);
      const despesaPrev = Math.max(despesaPrevLanc, despesaPrevOrc);

      document.getElementById('proj-receita-real').textContent = fmt(receitas);
      document.getElementById('proj-receita-prev').textContent = fmt(receitaPrev);
      document.getElementById('proj-despesa-real').textContent = fmt(despesas);
      document.getElementById('proj-despesa-prev').textContent = fmt(despesaPrev);

      const pctRec = receitaPrev > 0 ? Math.min((receitas / receitaPrev) * 100, 100) : 0;
      const pctDesp = despesaPrev > 0 ? Math.min((despesas / despesaPrev) * 100, 100) : 0;
      document.getElementById('proj-receita-bar').style.width = pctRec + '%';
      document.getElementById('proj-despesa-bar').style.width = pctDesp + '%';
      document.getElementById('proj-despesa-bar').style.background = despesas > despesaPrev && despesaPrev > 0 ? '#b91c1c' : '#dc2626';

      // Projeção: usa o maior entre realizado e previsto para estimar fechamento
      const receitaProjetada = Math.max(receitas, receitaPrev);
      const despesaProjetada = Math.max(despesas, despesaPrev);
      const fechamento = receitaProjetada - despesaProjetada;
      const elFech = document.getElementById('proj-fechamento');
      const elStatus = document.getElementById('proj-status');
      elFech.textContent = fmt(fechamento);
      elFech.style.color = fechamento >= 0 ? 'var(--green)' : 'var(--red)';
      if (fechamento >= 0) {
        elStatus.innerHTML = '<span style="color:var(--green)">✓ No ritmo atual, você fecha com sobra</span>';
      } else {
        elStatus.innerHTML = '<span style="color:var(--red)">⚠ No ritmo atual, você fecha no vermelho</span>';
      }
    } else {
      cardProj.style.display = 'none';
    }
  }

  renderChartPatrimonio();
}

function buildTxItem(l) {
  const isInterno = l.tipo === 'interno';
  const badge = l.status === 'pendente'
    ? '<span class="tx-badge badge-pendente">revisar</span>'
    : l.status === 'validado'
    ? '<span class="tx-badge badge-validado">validado</span>'
    : '<span class="tx-badge badge-interno">interno</span>';
  const badgeConciliado = l.conciliado ? '<span class="tx-badge" style="background:#cffafe;color:#0e7490">🔗 conciliado</span>' : '';
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
    '<div class="tx-info"><div class="tx-name">' + l.descricao + badge + badgeConciliado + '</div>' +
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
  preencherSelectCategoria('editar-categoria', l.categoria);
  atualizarSubcatEditar(l.categoria, l.subcategoria);
  renderSeletorTags('editar-tags-seletor', l.tags || []);
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
  l.tags = getTagsSelecionadas('editar-tags-seletor');
  l.status = 'validado';
  if (l.categoria !== catAntiga) verificarESalvarRegra(l.descricao, l);
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
  preencherSelectCategoria('validar-categoria', l.categoria);
  atualizarSubcatValidar(l.categoria, l.subcategoria);
  renderSeletorTags('validar-tags-seletor', l.tags || []);
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
  l.tags = getTagsSelecionadas('validar-tags-seletor');
  l.status = 'validado';
  salvarDB();
  if (l.categoria !== catAntiga) verificarESalvarRegra(l.descricao, l);
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
  if (tab === 'tags') renderTags();
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
    const isPagamento = descricao.toLowerCase().includes('pagamento fatura') || descricao.toLowerCase().includes('transferencia entre contas');
    const tipo = isPagamento ? 'interno' : (valor < 0 ? 'despesa' : 'receita');
    const descFinal = parcela && parcela !== '-' ? descricao + ' (' + parcela + ')' : descricao;
    lancamentos.push({ data, descricao: descFinal, valor: Math.abs(valor), tipo, categoria: isPagamento?'outros':classificarCategoria(descricao), subcategoria:'', tags:[], status:'pendente', id:gerarId(), origem:'XP' });
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
    const isTransferenciaExplicita = historico.includes('transferencia entre contas') || historico.includes('transf entre contas');
    const isRecebido = historico.includes('recebido') && !isPixDevolvido;
    let tipo;
    if (isAplicacao || isResgate || isPixDevolvido || isTransferenciaExplicita) tipo = 'interno';
    else if (isRecebido || valor > 0) tipo = 'receita';
    else tipo = 'despesa';
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

function aplicarRegra(descricao) {
  // Retorna objeto completo da regra se encontrar match
  const desc = descricao.toLowerCase();
  const regra = DB.regras.find(r => desc.includes(r.chave.toLowerCase()));
  if (regra) return regra;
  return null;
}

function classificarCategoria(descricao) {
  // 1. Verifica regras personalizadas primeiro
  const regra = aplicarRegra(descricao);
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
// CLASSIFICAÇÃO COM IA
// ========================
async function classificarComIA(lancamentos) {
  const pendentes = lancamentos.filter(function(l) { return l.tipo !== 'interno' && (!l.categoria || l.categoria === 'outros'); });
  if (!pendentes.length) return;

  // Mostra loading
  const tbody = document.getElementById('tbody-preview');
  if (tbody) {
    const tr = document.createElement('tr');
    tr.id = 'ia-loading-row';
    tr.innerHTML = '<td colspan="9" style="text-align:center;padding:14px;color:var(--text2);font-size:13px"><span style="display:inline-flex;align-items:center;gap:8px"><i class="ti ti-robot" style="font-size:16px;color:var(--accent)"></i> Classificando com IA...</span></td>';
    tbody.insertBefore(tr, tbody.firstChild);
  }

  const planoCats = DB.categorias.map(function(c) {
    return c.codigo + ' ' + c.nome + (c.subcats && c.subcats.length ? ' [' + c.subcats.join(', ') + ']' : '');
  }).join('\n');

  const itens = pendentes.map(function(l) {
    return { id: l.id, descricao: l.descricao, tipo: l.tipo, valor: l.valor };
  });

  const promptTexto = 'Você é um classificador financeiro pessoal do Paulo Alioti, 23 anos, brasileiro.\n\nPlano de contas disponível (formato: código nome [subcategorias]):\n' + planoCats + '\n\nClassifique cada lançamento abaixo com a categoria e subcategoria mais adequadas.\nRetorne APENAS um array JSON válido, sem markdown, sem texto extra.\nFormato: [{"id":"...","categoria":"id_da_categoria","subcategoria":"nome_da_subcat_ou_vazio"}]\n\nLançamentos:\n' + JSON.stringify(itens);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: promptTexto }]
      })
    });

    const data = await response.json();
    const textoResposta = (data.content || []).filter(function(b) { return b.type === 'text'; }).map(function(b) { return b.text; }).join('');
    const limpo = textoResposta.replace(/```json|```/g, '').trim();
    const resultado = JSON.parse(limpo);

    resultado.forEach(function(item) {
      const l = lancamentos.find(function(x) { return x.id === item.id; });
      if (l && item.categoria) {
        const catValida = DB.categorias.find(function(c) { return c.id === item.categoria; });
        if (catValida) {
          l.categoria = item.categoria;
          l.subcategoria = item.subcategoria || '';
          l.classificadoPorIA = true;
        }
      }
    });
  } catch(e) {
    console.error('Erro na classificação com IA:', e);
  }

  // Remove loading e re-renderiza
  const loadingRow = document.getElementById('ia-loading-row');
  if (loadingRow) loadingRow.remove();

  // Re-renderiza o preview com as classificações da IA
  renderPreviewTabela(lancamentos);
}

// ========================
// REGRAS DE CLASSIFICAÇÃO
// ========================
function verificarESalvarRegra(descricao, lançamento) {
  // Recebe o lançamento completo para salvar regra com todos os campos
  const chave = descricao.trim().toLowerCase().slice(0, 40); // Usa primeiros 40 chars como chave
  if (chave.length < 3) return;
  const jaExiste = DB.regras.find(r => r.chave.toLowerCase() === chave);
  if (jaExiste) {
    // Atualiza regra existente com os dados mais recentes
    jaExiste.tipo = lançamento.tipo;
    jaExiste.categoria = lançamento.categoria;
    jaExiste.subcategoria = lançamento.subcategoria || '';
    jaExiste.tags = lançamento.tags || [];
    salvarDB();
    toast('Regra atualizada para "' + chave + '"');
    return;
  }
  // Cria regra nova automaticamente
  DB.regras.push({
    id: gerarId(),
    chave,
    tipo: lançamento.tipo,
    categoria: lançamento.categoria,
    subcategoria: lançamento.subcategoria || '',
    tags: lançamento.tags || []
  });
  salvarDB();
  toast('✓ Regra criada — próxima importação será automática');
}

function renderRegras() {
  const lista = document.getElementById('lista-regras');
  if (!lista) return;
  lista.innerHTML = '';
  if (!DB.regras.length) {
    lista.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:16px 0">Nenhuma regra ainda.<br>Categorize um lançamento e o sistema cria a regra automaticamente.</div>';
    return;
  }
  DB.regras.forEach(r => {
    const subcatLabel = r.subcategoria ? ' › ' + r.subcategoria : '';
    const tagsLabel = r.tags && r.tags.length ? '<span style="font-size:10px;color:var(--text3)"> · ' + r.tags.join(', ') + '</span>' : '';
    const tipoLabel = r.tipo ? '<span style="font-size:10px;padding:1px 6px;border-radius:99px;background:var(--bg);color:var(--text2);margin-left:4px">' + r.tipo + '</span>' : '';
    lista.innerHTML += '<div style="display:flex;align-items:center;gap:12px;padding:9px 0;border-bottom:0.5px solid var(--border-light2)">' +
      '<div style="flex:1">' +
        '<div style="font-size:13px;font-weight:500">' + r.chave + tipoLabel + '</div>' +
        '<div style="font-size:11px;color:var(--text2)">→ ' + getNomeCat(r.categoria) + subcatLabel + tagsLabel + '</div>' +
      '</div>' +
      '<button class="btn" style="font-size:11px;padding:3px 8px;color:var(--red)" onclick="excluirRegra(\'' + r.id + '\')"><i class="ti ti-trash"></i></button>' +
      '</div>';
  });
}

function excluirRegra(id) {
  DB.regras = DB.regras.filter(r => r.id !== id);
  salvarDB(); renderRegras();
  toast('Regra removida');
}

// ========================
// TAGS PRÉ-CADASTRADAS
// ========================
function renderTags() {
  const lista = document.getElementById('lista-tags');
  if (!lista) return;
  lista.innerHTML = '';
  if (!DB.tags.length) {
    lista.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:16px 0">Nenhuma tag cadastrada.<br>Crie tags para classificar seus lançamentos por contexto (namoro, viagem, trabalho...).</div>';
    return;
  }
  DB.tags.forEach(tag => {
    lista.innerHTML +=
      '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:0.5px solid var(--border-light2)">' +
        '<div style="width:10px;height:10px;border-radius:50%;background:'+tag.cor+';flex-shrink:0"></div>' +
        '<span style="flex:1;font-size:13px;font-weight:500">'+tag.nome+'</span>' +
        '<button class="btn" style="font-size:11px;padding:3px 8px;color:var(--red)" onclick="excluirTag(\''+tag.id+'\')"><i class="ti ti-trash"></i></button>' +
      '</div>';
  });
}

function abrirModalNovaTag() {
  document.getElementById('nova-tag-nome').value = '';
  document.getElementById('nova-tag-cor').value = '#4f9cf9';
  document.getElementById('modal-nova-tag').style.display = 'flex';
}

function salvarNovaTag() {
  const nome = document.getElementById('nova-tag-nome').value.trim();
  const cor = document.getElementById('nova-tag-cor').value;
  if (!nome) { toast('Informe o nome da tag'); return; }
  if (DB.tags.find(t => t.nome.toLowerCase() === nome.toLowerCase())) { toast('Tag já existe'); return; }
  DB.tags.push({ id: gerarId(), nome, cor });
  salvarDB(); fecharModal('modal-nova-tag'); renderTags();
  toast('Tag criada!');
}

function excluirTag(id) {
  if (!confirm('Excluir tag? Ela será removida dos lançamentos existentes.')) return;
  const tag = DB.tags.find(t => t.id === id);
  if (tag) {
    DB.lancamentos.forEach(l => {
      l.tags = (l.tags || []).filter(t => t !== tag.nome);
    });
  }
  DB.tags = DB.tags.filter(t => t.id !== id);
  salvarDB(); renderTags();
  toast('Tag removida');
}

// Renderiza seletor de tags (checkboxes) num container
function renderSeletorTags(containerId, selecionadas) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!DB.tags.length) {
    el.innerHTML = '<span style="font-size:12px;color:var(--text3)">Nenhuma tag cadastrada. Crie em Plano de Contas → Tags.</span>';
    return;
  }
  el.innerHTML = DB.tags.map(tag =>
    '<label style="display:inline-flex;align-items:center;gap:5px;margin:3px 4px 3px 0;cursor:pointer;padding:3px 8px;border-radius:99px;border:0.5px solid '+(selecionadas.includes(tag.nome)?tag.cor:'var(--border-light)')+';background:'+(selecionadas.includes(tag.nome)?tag.cor+'22':'transparent')+'">' +
      '<input type="checkbox" value="'+tag.nome+'" '+(selecionadas.includes(tag.nome)?'checked':'')+' style="display:none" onchange="sincronizarTagsSeletor(\''+containerId+'\')">' +
      '<span style="width:7px;height:7px;border-radius:50%;background:'+tag.cor+'"></span>' +
      '<span style="font-size:12px;color:'+(selecionadas.includes(tag.nome)?tag.cor:'var(--text2)')+'">'+tag.nome+'</span>' +
    '</label>'
  ).join('');
}

function sincronizarTagsSeletor(containerId) {
  // Re-renderiza para atualizar visual dos selecionados
  const selecionadas = getTagsSelecionadas(containerId);
  renderSeletorTags(containerId, selecionadas);
}

function getTagsSelecionadas(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return [];
  return [...el.querySelectorAll('input[type=checkbox]:checked')].map(c => c.value);
}

function renderPreviewTabela(lancamentos) {
  const tbody = document.getElementById('tbody-preview');
  if (!tbody) return;
  tbody.innerHTML = '';
  lancamentos.forEach(function(l, i) {
    const isInterno = l.tipo === 'interno';
    const amtClass = isInterno ? 'neu' : l.tipo === 'receita' ? 'pos' : 'neg';
    const amtPrefix = isInterno ? '' : l.tipo === 'receita' ? '+' : '-';
    const jaValidado = l.status === 'validado';
    const semCat = !l.categoria || l.categoria === 'outros';
    const porIA = l.classificadoPorIA;
    let rowStyle = '';
    if (jaValidado) rowStyle = 'background:#f0fdf4';
    else if (semCat) rowStyle = 'background:#fff7ed';

    let regraTag = '';
    if (jaValidado && porIA) regraTag = '<span style="font-size:10px;padding:1px 5px;border-radius:99px;background:#dbeafe;color:#1d4ed8;margin-left:4px">🤖</span>';
    else if (jaValidado) regraTag = '<span style="font-size:10px;padding:1px 5px;border-radius:99px;background:#dcfce7;color:#166534;margin-left:4px">✓</span>';

    const catsFiltradas = DB.categorias.filter(function(c) { return getCategoriasPorTipo(l.tipo).includes(c.id); });
    const catOpts = '<option value="">— categoria —</option>' + catsFiltradas.map(function(c) { return '<option value="' + c.id + '"' + (c.id === l.categoria ? ' selected' : '') + '>' + c.nome + '</option>'; }).join('');
    const subcats = getSubcats(l.categoria);
    const subcatOpts = '<option value="">—</option>' + subcats.map(function(s) { return '<option value="' + s + '"' + (s === l.subcategoria ? ' selected' : '') + '>' + s + '</option>'; }).join('');

    // Tags como pills clicáveis (mesmo padrão do seletor de tags)
    const tagsHtml = DB.tags.length
      ? DB.tags.map(function(tag) {
          const sel = (l.tags || []).includes(tag.nome);
          return '<label style="display:inline-flex;align-items:center;gap:3px;margin:1px 2px;cursor:pointer;padding:2px 7px;border-radius:99px;border:0.5px solid ' + (sel ? tag.cor : 'var(--border-light)') + ';background:' + (sel ? tag.cor + '22' : 'transparent') + ';font-size:11px;white-space:nowrap">' +
            '<input type="checkbox" value="' + tag.nome + '" ' + (sel ? 'checked' : '') + ' style="display:none" onchange="atualizarTagsPreview(' + i + ')">' +
            '<span style="width:6px;height:6px;border-radius:50%;background:' + tag.cor + '"></span>' +
            '<span style="color:' + (sel ? tag.cor : 'var(--text2)') + '">' + tag.nome + '</span>' +
          '</label>';
        }).join('')
      : '<span style="font-size:11px;color:var(--text3)">—</span>';

    // Botão check por linha
    const btnCheck = jaValidado
      ? '<span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:6px;background:#dcfce7;color:#16a34a;font-size:14px" title="Validado">✓</span>'
      : '<button class="btn" style="font-size:11px;padding:3px 7px;color:#16a34a;border-color:#16a34a" title="Marcar como validado" onclick="validarLinhaPreview(' + i + ')"><i class="ti ti-check"></i></button>';

    tbody.innerHTML += '<tr id="preview-row-' + i + '" style="' + rowStyle + '">' +
      // Checkbox seleção
      '<td style="width:32px;text-align:center"><input type="checkbox" class="preview-check" data-idx="' + i + '" style="width:14px;height:14px;cursor:pointer"></td>' +
      // Data
      '<td style="white-space:nowrap;font-size:12px">' + formatarData(l.data) + '</td>' +
      // Tipo
      '<td><select style="padding:3px 6px;border:0.5px solid var(--border-light);border-radius:6px;font-size:12px;min-width:90px" onchange="previewLancs[' + i + '].tipo=this.value;atualizarCatsFiltroPreview(' + i + ',this.value)">' +
        '<option value="despesa"' + (l.tipo === 'despesa' ? ' selected' : '') + '>Despesa</option>' +
        '<option value="receita"' + (l.tipo === 'receita' ? ' selected' : '') + '>Receita</option>' +
        '<option value="interno"' + (l.tipo === 'interno' ? ' selected' : '') + '>Interno</option>' +
      '</select></td>' +
      // Descrição
      '<td><div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap">' +
        '<input type="text" value="' + l.descricao.replace(/"/g, '&quot;') + '" style="flex:1;min-width:130px;padding:3px 6px;border:0.5px solid var(--border-light);border-radius:6px;font-size:12px" onchange="previewLancs[' + i + '].descricao=this.value">' +
        regraTag +
        (l._matchSugerido ? '<span style="font-size:10px;padding:1px 6px;border-radius:99px;background:#cffafe;color:#0e7490;cursor:help;white-space:nowrap" title="Corresponde a: ' + l._matchSugerido.descricao.replace(/"/g,'&quot;') + ' (' + (l._matchSugerido.tipoMatch === 'exato' ? 'data e valor exatos' : 'aproximado, ' + l._matchSugerido.difDias + ' dias') + ')">🔗 ' + (l._matchSugerido.tipo === 'previsto' ? 'previsto' : 'já lançado') + '</span>' : '') +
      '</div></td>' +
      // Categoria
      '<td style="min-width:140px">' +
        '<select style="width:100%;padding:3px 6px;border:0.5px solid var(--border-light);border-radius:6px;font-size:12px' + (semCat && !jaValidado ? ';border-color:#f59e0b' : '') + '" onchange="previewLancs[' + i + '].categoria=this.value;atualizarSubcatPreview(' + i + ',this.value)">' + catOpts + '</select>' +
      '</td>' +
      // Subcategoria
      '<td style="min-width:110px">' +
        '<select id="subcat-preview-' + i + '" style="width:100%;padding:3px 6px;border:0.5px solid var(--border-light);border-radius:6px;font-size:11px;color:var(--text2)" onchange="previewLancs[' + i + '].subcategoria=this.value">' + subcatOpts + '</select>' +
      '</td>' +
      // Tags
      '<td style="min-width:100px" id="preview-tags-cell-' + i + '">' + tagsHtml + '</td>' +
      // Valor
      '<td class="tx-amount ' + amtClass + '" style="white-space:nowrap;font-size:13px">' + amtPrefix + ' ' + fmt(l.valor) + '</td>' +
      // Botões: check + lixeira
      '<td style="white-space:nowrap;display:flex;gap:4px;align-items:center;padding:8px 12px">' +
        btnCheck +
        '<button class="btn" style="font-size:11px;padding:3px 7px;color:var(--red)" title="Excluir" onclick="removerPreview(' + i + ')"><i class="ti ti-trash"></i></button>' +
      '</td></tr>';
  });
}

function mostrarPreview(lancamentos) {
  if (!lancamentos.length) { toast('Nenhum lançamento encontrado no arquivo'); return; }

  // 1. Aplica regras personalizadas
  lancamentos.forEach(function(l) {
    const regra = aplicarRegra(l.descricao);
    if (regra) {
      if (regra.tipo) l.tipo = regra.tipo;
      if (regra.categoria) l.categoria = regra.categoria;
      if (regra.subcategoria) l.subcategoria = regra.subcategoria;
      if (regra.tags && regra.tags.length) l.tags = regra.tags;
      l.status = 'validado';
    }
  });

  // 1.5 Busca conciliação com previstos/lançamentos existentes
  lancamentos.forEach(function(l) {
    const match = buscarConciliacao(l);
    if (match) {
      l._matchSugerido = match;
    }
  });

  window.previewLancs = lancamentos;
  document.getElementById('preview-importacao').style.display = 'block';
  switchTabImport('preview', document.querySelector('#preview-importacao .tab'));
  const sa = document.getElementById('select-all-preview');
  if (sa) sa.checked = false;

  // Renderiza tabela
  renderPreviewTabela(lancamentos);

  const total = lancamentos.length;
  const auto = lancamentos.filter(function(l) { return l.status === 'validado'; }).length;
  const semCat = lancamentos.filter(function(l) { return !l.categoria || l.categoria === 'outros'; }).length;
  toast(total + ' lançamentos' + (auto ? ' — ' + auto + ' automáticos' : '') + (semCat ? ' — ' + semCat + ' chamando IA...' : ''));

  // 2. Chama IA para classificar os que ficaram sem categoria
  if (semCat > 0) {
    classificarComIA(lancamentos);
  }
}

function atualizarSubcatPreview(i, catId) {
  const subcats = getSubcats(catId);
  const sel = document.getElementById('subcat-preview-' + i);
  if (!sel) return;
  sel.innerHTML = '<option value="">—</option>' + subcats.map(s => '<option value="'+s+'">'+s+'</option>').join('');
  previewLancs[i].subcategoria = '';
}

function atualizarCatsFiltroPreview(i, tipo) {
  // Quando tipo muda no preview, atualiza select de categoria filtrando pelo tipo
  const row = document.getElementById('preview-row-' + i);
  if (!row) return;
  const catSelect = row.querySelector('td:nth-child(3) select:first-child');
  if (!catSelect) return;
  const catsFiltradas = DB.categorias.filter(c => getCategoriasPorTipo(tipo).includes(c.id));
  catSelect.innerHTML = '<option value="">— selecione —</option>' + catsFiltradas.map(c => '<option value="'+c.id+'">'+c.nome+'</option>').join('');
  previewLancs[i].categoria = '';
  previewLancs[i].subcategoria = '';
  atualizarSubcatPreview(i, '');
}

function atualizarTagsPreview(i) {
  const cell = document.getElementById('preview-tags-cell-' + i);
  if (!cell) return;
  const selecionadas = [...cell.querySelectorAll('input[type=checkbox]:checked')].map(c => c.value);
  previewLancs[i].tags = selecionadas;
  // Atualiza visual dos checkboxes
  cell.querySelectorAll('label').forEach(label => {
    const cb = label.querySelector('input');
    const checked = cb.checked;
    const tag = DB.tags.find(t => t.nome === cb.value);
    if (tag) {
      label.style.borderColor = checked ? tag.cor : 'var(--border-light)';
      label.style.background = checked ? tag.cor + '22' : 'transparent';
      label.querySelector('span:last-child').style.color = checked ? tag.cor : 'var(--text2)';
    }
  });
}

function ignorarPreview(i) {
  const l = window.previewLancs[i];
  if (!DB.ignorados) DB.ignorados = [];
  DB.ignorados.push({ ...l, ignoradoEm: new Date().toISOString() });
  window.previewLancs.splice(i, 1);
  salvarDB();
  atualizarBadgeIgnorados();
  if (window.previewLancs.length) renderPreviewTabela(window.previewLancs);
  else { document.getElementById('preview-importacao').style.display = 'none'; toast('Todos ignorados'); }
}

function removerPreview(i) {
  window.previewLancs.splice(i, 1);
  if (window.previewLancs.length) renderPreviewTabela(window.previewLancs);
  else document.getElementById('preview-importacao').style.display = 'none';
}

function validarLinhaPreview(i) {
  if (!window.previewLancs || !window.previewLancs[i]) return;
  const l = window.previewLancs[i];
  if (!l.categoria || l.categoria === 'outros' || l.categoria === '') {
    toast('Selecione uma categoria antes de validar');
    return;
  }
  l.status = 'validado';
  renderPreviewTabela(window.previewLancs);
  toast('Lançamento marcado como validado');
}

function selecionarTodosPreview(checked) {
  document.querySelectorAll('.preview-check').forEach(cb => cb.checked = checked);
}

function ignorarSelecionados() {
  const selecionados = [...document.querySelectorAll('.preview-check:checked')].map(cb => parseInt(cb.dataset.idx));
  if (!selecionados.length) { toast('Nenhum lançamento selecionado'); return; }
  if (!DB.ignorados) DB.ignorados = [];
  // Remove de trás pra frente para não bagunçar índices
  const indices = selecionados.sort((a,b) => b - a);
  indices.forEach(i => {
    const l = window.previewLancs[i];
    DB.ignorados.push({ ...l, ignoradoEm: new Date().toISOString() });
    window.previewLancs.splice(i, 1);
  });
  salvarDB();
  atualizarBadgeIgnorados();
  toast(selecionados.length + ' lançamento(s) ignorado(s)');
  if (window.previewLancs.length) renderPreviewTabela(window.previewLancs);
  else document.getElementById('preview-importacao').style.display = 'none';
}

function atualizarBadgeIgnorados() {
  const badge = document.getElementById('badge-ignorados');
  if (!badge) return;
  const total = (DB.ignorados || []).length;
  badge.textContent = total;
  badge.style.display = total ? 'inline' : 'none';
}

function switchTabImport(tab, el) {
  if (!el) return;
  document.querySelectorAll('#preview-importacao .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('import-tab-preview').style.display = tab === 'preview' ? 'block' : 'none';
  document.getElementById('import-tab-ignorados').style.display = tab === 'ignorados' ? 'block' : 'none';
  if (tab === 'ignorados') renderIgnorados();
}

function renderIgnorados() {
  const lista = document.getElementById('lista-ignorados');
  if (!lista) return;
  const ignorados = DB.ignorados || [];
  if (!ignorados.length) {
    lista.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:16px">Nenhum lançamento ignorado.</div>';
    return;
  }
  lista.innerHTML = '<table class="tx-table"><thead><tr><th>Data</th><th>Descrição</th><th>Valor</th><th>Ignorado em</th><th></th></tr></thead><tbody>' +
    ignorados.map((l, i) =>
      '<tr>' +
        '<td style="font-size:12px">' + formatarData(l.data) + '</td>' +
        '<td style="font-size:12px">' + l.descricao + '</td>' +
        '<td class="tx-amount ' + (l.tipo === 'receita' ? 'pos' : 'neg') + '" style="font-size:12px">' + fmt(l.valor) + '</td>' +
        '<td style="font-size:11px;color:var(--text3)">' + new Date(l.ignoradoEm).toLocaleDateString('pt-BR') + '</td>' +
        '<td><button class="btn" style="font-size:11px;padding:3px 8px" onclick="restaurarIgnorado(' + i + ')"><i class="ti ti-refresh"></i> Restaurar</button></td>' +
      '</tr>'
    ).join('') +
    '</tbody></table>';
}

function restaurarIgnorado(i) {
  const l = DB.ignorados.splice(i, 1)[0];
  delete l.ignoradoEm;
  if (!window.previewLancs) window.previewLancs = [];
  window.previewLancs.push(l);
  salvarDB();
  atualizarBadgeIgnorados();
  renderIgnorados();
  document.getElementById('preview-importacao').style.display = 'block';
  renderPreviewTabela(window.previewLancs);
  toast('Lançamento restaurado para o preview');
}

function limparIgnorados() {
  if (!confirm('Limpar todos os lançamentos ignorados? Ação irreversível.')) return;
  DB.ignorados = [];
  salvarDB();
  atualizarBadgeIgnorados();
  renderIgnorados();
  toast('Lista de ignorados limpa');
}

function salvarImportacao() {
  if (!window.previewLancs || !window.previewLancs.length) return;

  // Bloqueia se houver lançamentos sem categoria (exceto internos)
  const semCategoria = window.previewLancs.filter(l => l.tipo !== 'interno' && (!l.categoria || l.categoria === 'outros' || l.categoria === ''));
  if (semCategoria.length) {
    toast('⚠️ ' + semCategoria.length + ' lançamento(s) sem categoria. Classifique antes de salvar.');
    window.previewLancs.forEach((l, i) => {
      const row = document.getElementById('preview-row-' + i);
      if (!row) return;
      if (l.tipo !== 'interno' && (!l.categoria || l.categoria === 'outros' || l.categoria === '')) {
        row.style.background = '#fef2f2';
        row.style.outline = '1px solid #fca5a5';
      }
    });
    return;
  }

  // Aplica conciliações antes de salvar
  let conciliados = 0;
  const aImportar = [];
  window.previewLancs.forEach(l => {
    const match = l._matchSugerido;
    // Limpa campos auxiliares
    delete l._matchSugerido;
    if (match) {
      aplicarConciliacao(l, match);
      conciliados++;
      if (match.tipo === 'lancamento') {
        // O lançamento existente foi marcado como conciliado; não duplica o do extrato
        return;
      }
      // Se for previsto, o lançamento do extrato entra (já vinculado ao previsto)
    }
    delete l._conciliarCom;
    aImportar.push(l);
  });

  DB.lancamentos.push(...aImportar);
  salvarDB();
  document.getElementById('preview-importacao').style.display = 'none';
  const total = window.previewLancs.length;
  const autoClassificados = aImportar.filter(l => l.status === 'validado').length;
  window.previewLancs = [];
  atualizarBannerValidacao(); renderDashboard();
  let msg = total + ' lançamentos processados';
  if (conciliados > 0) msg += ' — ' + conciliados + ' conciliados 🔗';
  if (autoClassificados > 0) msg += ' — ' + autoClassificados + ' auto-classificados';
  toast(msg);
}

function salvarManual(e) {
  e.preventDefault();
  const catId = document.getElementById('manual-categoria').value;
  if (!catId) { toast('Selecione uma categoria'); return; }
  DB.lancamentos.push({
    id: gerarId(),
    data: document.getElementById('manual-data').value,
    descricao: document.getElementById('manual-descricao').value,
    valor: parseFloat(document.getElementById('manual-valor').value),
    tipo: document.getElementById('manual-tipo').value,
    categoria: catId,
    subcategoria: document.getElementById('manual-subcategoria').value,
    tags: getTagsSelecionadas('manual-tags-seletor'),
    status: 'validado'
  });
  salvarDB();
  renderSeletorTags('manual-tags-seletor', []);
  e.target.reset();
  fecharModal('modal-lancamento');
  atualizarBannerValidacao(); renderDashboard();
  try { renderLancamentos(); } catch(err) {}
  toast('Lançamento salvo! ✓');
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
            // Natureza (receita/despesa/investimento)
            (cat.id !== 'outros'
              ? '<select style="font-size:10px;padding:2px 4px;border-radius:6px;border:0.5px solid var(--border-light);background:var(--card);color:var(--text2);cursor:pointer" title="Natureza da categoria" onchange="salvarNaturezaCategoria(\''+cat.id+'\',this.value)">' +
                  '<option value="despesa"'+((cat.natureza||'despesa')==='despesa'?' selected':'')+'>Despesa</option>' +
                  '<option value="receita"'+(cat.natureza==='receita'?' selected':'')+'>Receita</option>' +
                  '<option value="investimento"'+(cat.natureza==='investimento'?' selected':'')+'>Investim.</option>' +
                '</select>'
              : '') +
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

function salvarNaturezaCategoria(catId, natureza) {
  const cat = DB.categorias.find(c => c.id === catId);
  if (!cat) return;
  cat.natureza = natureza;
  salvarDB(); preencherSelects();
  toast('Natureza atualizada!');
}

function abrirModalCategoria() {
  document.getElementById('edit-cat-id').value = '';
  document.getElementById('edit-cat-nome').value = '';
  document.getElementById('edit-cat-codigo').value = '';
  document.getElementById('edit-cat-cor').value = '#4f9cf9';
  document.getElementById('edit-cat-natureza').value = 'despesa';
  document.getElementById('modal-edit-cat').style.display = 'flex';
}

function salvarNovaOuEditadaCategoria() {
  const nome = document.getElementById('edit-cat-nome').value.trim();
  const codigo = document.getElementById('edit-cat-codigo').value.trim();
  const cor = document.getElementById('edit-cat-cor').value;
  const natureza = document.getElementById('edit-cat-natureza').value;
  if (!nome) { toast('Informe o nome'); return; }
  const id = nome.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,'') + '_' + Date.now().toString(36);
  DB.categorias.push({ id, nome, cor, codigo, natureza, subcats: [] });
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
// PREVISÃO / PREVISIBILIDADE
// ========================
function renderPrevisao() {
  const tbody = document.getElementById('tbody-previstos');
  if (tbody) {
    const previstos = [...(DB.previstos || [])].sort((a, b) => (a.dia || 0) - (b.dia || 0));
    if (!previstos.length) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text3);padding:20px">Nenhum lançamento previsto. Cadastre seus gastos e receitas fixos.</td></tr>';
    } else {
      tbody.innerHTML = previstos.map(p => {
        const amtClass = p.tipo === 'receita' ? 'pos' : p.tipo === 'interno' ? 'neu' : 'neg';
        const amtPrefix = p.tipo === 'receita' ? '+' : p.tipo === 'interno' ? '' : '-';
        // Verifica se já foi realizado (conciliado) no mês atual
        const realizado = DB.lancamentos.find(l => l.previstoId === p.id && l.data.slice(0, 7) === mesAtual);
        const hoje = new Date();
        const diaHoje = hoje.getDate();
        const mesHoje = hoje.toISOString().slice(0, 7);
        let statusBadge;
        if (realizado) {
          statusBadge = '<span style="font-size:10px;padding:2px 8px;border-radius:99px;background:#dcfce7;color:#166534">✓ Realizado</span>';
        } else if (mesAtual === mesHoje && p.dia && p.dia < diaHoje) {
          statusBadge = '<span style="font-size:10px;padding:2px 8px;border-radius:99px;background:#fee2e2;color:#b91c1c">⚠ Atrasado</span>';
        } else {
          statusBadge = '<span style="font-size:10px;padding:2px 8px;border-radius:99px;background:#fef9c3;color:#a16207">○ Pendente</span>';
        }
        return '<tr>' +
          '<td style="white-space:nowrap"><span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:6px;background:var(--bg);font-size:12px;font-weight:500">' + (p.dia || '—') + '</span></td>' +
          '<td style="font-weight:500">' + p.descricao + ' ' + statusBadge + '</td>' +
          '<td><span style="font-size:12px;color:var(--text2)">' + getNomeCat(p.categoria) + (p.subcategoria ? ' › ' + p.subcategoria : '') + '</span></td>' +
          '<td><span style="font-size:11px;padding:2px 8px;border-radius:99px;background:var(--bg);color:var(--text2)">' + (p.tipo === 'receita' ? 'Receita' : p.tipo === 'interno' ? 'Interno' : 'Despesa') + '</span></td>' +
          '<td class="tx-amount ' + amtClass + '">' + amtPrefix + ' ' + fmt(p.valor) + '</td>' +
          '<td style="white-space:nowrap">' +
            '<button class="btn" style="font-size:11px;padding:3px 7px" onclick="editarPrevisto(\'' + p.id + '\')"><i class="ti ti-pencil"></i></button> ' +
            '<button class="btn" style="font-size:11px;padding:3px 7px;color:var(--red)" onclick="excluirPrevisto(\'' + p.id + '\')"><i class="ti ti-trash"></i></button>' +
          '</td>' +
        '</tr>';
      }).join('');
    }
  }

  const receitaPrev = (DB.previstos || []).filter(p => p.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
  const despesaPrev = (DB.previstos || []).filter(p => p.tipo === 'despesa').reduce((a, b) => a + b.valor, 0);
  const sobraPrev = receitaPrev - despesaPrev;
  const elRec = document.getElementById('prev-receita');
  const elDesp = document.getElementById('prev-despesa');
  const elSobra = document.getElementById('prev-sobra');
  if (elRec) elRec.textContent = fmt(receitaPrev);
  if (elDesp) elDesp.textContent = fmt(despesaPrev);
  if (elSobra) elSobra.textContent = fmt(sobraPrev);

  const lista = document.getElementById('lista-orcamento-previsao');
  if (lista) {
    const cats = DB.categorias.filter(c => !c.id.startsWith('rec_') && !c.id.startsWith('inv_') && c.id !== 'outros');
    lista.innerHTML = cats.map(c => {
      const orc = DB.orcamentos[c.id] || 0;
      return '<div class="cat-item">' +
        '<span class="cat-label" style="min-width:140px">' + c.nome + '</span>' +
        '<div class="orc-input-wrap" style="flex:1;justify-content:flex-end">' +
          '<span style="font-size:12px;color:var(--text3)">R$</span>' +
          '<input type="number" class="orc-input" value="' + (orc || '') + '" placeholder="—" step="0.01" onchange="salvarOrcamento(\'' + c.id + '\',this.value);renderPrevisao()">' +
        '</div>' +
      '</div>';
    }).join('');
  }
}

function abrirModalPrevisto() {
  document.getElementById('previsto-id').value = '';
  document.getElementById('previsto-modal-titulo').textContent = 'Novo lançamento previsto';
  document.getElementById('previsto-descricao').value = '';
  document.getElementById('previsto-valor').value = '';
  document.getElementById('previsto-dia').value = '';
  document.getElementById('previsto-tipo').value = 'despesa';
  preencherSelectCategoriaPorTipo('previsto-categoria', 'despesa', '');
  atualizarSubcatPrevisto();
  document.getElementById('modal-previsto').style.display = 'flex';
}

function atualizarSubcatPrevisto() {
  const catId = document.getElementById('previsto-categoria').value;
  const sel = document.getElementById('previsto-subcategoria');
  if (!sel) return;
  const subcats = getSubcats(catId);
  sel.innerHTML = '<option value="">Sem subcategoria</option>' + subcats.map(s => '<option value="' + s + '">' + s + '</option>').join('');
}

function salvarPrevisto() {
  const id = document.getElementById('previsto-id').value;
  const descricao = document.getElementById('previsto-descricao').value.trim();
  const valor = parseFloat(document.getElementById('previsto-valor').value);
  const dia = parseInt(document.getElementById('previsto-dia').value) || null;
  const tipo = document.getElementById('previsto-tipo').value;
  const categoria = document.getElementById('previsto-categoria').value;
  const subcategoria = document.getElementById('previsto-subcategoria').value;
  if (!descricao) { toast('Informe a descrição'); return; }
  if (isNaN(valor) || valor <= 0) { toast('Informe um valor válido'); return; }
  if (!categoria) { toast('Selecione uma categoria'); return; }

  if (id) {
    const p = DB.previstos.find(x => x.id === id);
    if (p) { Object.assign(p, { descricao, valor, dia, tipo, categoria, subcategoria }); }
  } else {
    if (!DB.previstos) DB.previstos = [];
    DB.previstos.push({ id: gerarId(), descricao, valor, dia, tipo, categoria, subcategoria });
  }
  salvarDB();
  fecharModal('modal-previsto');
  renderPrevisao();
  renderDashboard();
  toast('Previsto salvo!');
}

function editarPrevisto(id) {
  const p = DB.previstos.find(x => x.id === id);
  if (!p) return;
  document.getElementById('previsto-id').value = p.id;
  document.getElementById('previsto-modal-titulo').textContent = 'Editar lançamento previsto';
  document.getElementById('previsto-descricao').value = p.descricao;
  document.getElementById('previsto-valor').value = p.valor;
  document.getElementById('previsto-dia').value = p.dia || '';
  document.getElementById('previsto-tipo').value = p.tipo;
  preencherSelectCategoriaPorTipo('previsto-categoria', p.tipo, p.categoria);
  atualizarSubcatPrevisto();
  document.getElementById('previsto-subcategoria').value = p.subcategoria || '';
  document.getElementById('modal-previsto').style.display = 'flex';
}

function excluirPrevisto(id) {
  if (!confirm('Excluir este lançamento previsto?')) return;
  DB.previstos = DB.previstos.filter(x => x.id !== id);
  salvarDB();
  renderPrevisao();
  renderDashboard();
  toast('Previsto removido');
}

// ========================
// CONCILIAÇÃO BANCÁRIA
// ========================
// Busca correspondência entre um lançamento do extrato e os lançamentos/previstos do sistema
function buscarConciliacao(lancExtrato) {
  const valorExtrato = Math.abs(lancExtrato.valor);
  const dataExtrato = new Date(lancExtrato.data);

  // Candidatos: lançamentos manuais não conciliados + previstos do mês
  const candidatos = [];

  // Lançamentos já no sistema, não conciliados, mesmo tipo
  DB.lancamentos.forEach(l => {
    if (l.conciliado) return;
    if (l.origem) return; // ignora os que vieram de importação anterior
    if (l.tipo !== lancExtrato.tipo) return;
    candidatos.push({ tipo: 'lancamento', ref: l, descricao: l.descricao, valor: Math.abs(l.valor), data: l.data });
  });

  // Previstos: gera data esperada no mês do extrato
  const mesExtrato = lancExtrato.data.slice(0, 7);
  (DB.previstos || []).forEach(p => {
    if (p.tipo !== lancExtrato.tipo) return;
    // Verifica se já foi conciliado esse previsto nesse mês
    const jaConciliado = DB.lancamentos.some(l => l.previstoId === p.id && l.data.slice(0, 7) === mesExtrato);
    if (jaConciliado) return;
    const dataPrev = p.dia ? mesExtrato + '-' + String(p.dia).padStart(2, '0') : lancExtrato.data;
    candidatos.push({ tipo: 'previsto', ref: p, descricao: p.descricao, valor: Math.abs(p.valor), data: dataPrev });
  });

  let melhorMatch = null;
  let melhorScore = -1;

  candidatos.forEach(c => {
    const difValor = Math.abs(c.valor - valorExtrato);
    const tolValor = valorExtrato * 0.02; // 2% de tolerância
    const difDias = Math.abs((new Date(c.data) - dataExtrato) / (1000 * 60 * 60 * 24));

    // Match exato: valor igual e data igual
    if (difValor < 0.01 && difDias < 1) {
      const score = 100;
      if (score > melhorScore) { melhorScore = score; melhorMatch = { ...c, tipoMatch: 'exato', difDias: Math.round(difDias) }; }
    }
    // Match aproximado: valor dentro da tolerância e até 5 dias
    else if (difValor <= tolValor && difDias <= 5) {
      const score = 50 - difDias; // quanto mais perto a data, melhor
      if (score > melhorScore) { melhorScore = score; melhorMatch = { ...c, tipoMatch: 'aproximado', difDias: Math.round(difDias) }; }
    }
  });

  return melhorMatch;
}

// Aplica conciliação a um lançamento do preview
function aplicarConciliacao(previewLanc, match) {
  if (match.tipo === 'lancamento') {
    // Marca o lançamento existente como conciliado e atualiza com dados do banco
    match.ref.conciliado = true;
    match.ref.dataExtrato = previewLanc.data;
    match.ref.origem = previewLanc.origem;
    previewLanc._conciliarCom = { tipo: 'lancamento', id: match.ref.id };
  } else if (match.tipo === 'previsto') {
    // O lançamento do extrato vira o realizado, vinculado ao previsto
    previewLanc.previstoId = match.ref.id;
    previewLanc.categoria = match.ref.categoria;
    previewLanc.subcategoria = match.ref.subcategoria || '';
    previewLanc.conciliado = true;
    previewLanc._conciliarCom = { tipo: 'previsto', id: match.ref.id };
  }
}

// ========================
// Mapeamento de tipo para IDs de categoria
function getCategoriasPorTipo(tipo) {
  // Filtra pelo campo natureza de cada categoria (não mais por lista fixa de IDs)
  const getNat = c => c.natureza || (c.id === 'outros' ? 'todas' : c.id.startsWith('rec_') ? 'receita' : c.id.startsWith('inv_') ? 'investimento' : 'despesa');
  if (tipo === 'receita') return DB.categorias.filter(c => { const n = getNat(c); return n === 'receita' || n === 'todas'; }).map(c => c.id);
  if (tipo === 'investimento' || tipo === 'interno') return DB.categorias.filter(c => { const n = getNat(c); return n === 'investimento' || n === 'todas'; }).map(c => c.id);
  if (tipo === 'despesa') return DB.categorias.filter(c => { const n = getNat(c); return n === 'despesa' || n === 'todas'; }).map(c => c.id);
  return DB.categorias.map(c => c.id);
}

function preencherSelectCategoriaPorTipo(selectId, tipo, valorAtual) {
  const el = document.getElementById(selectId); if (!el) return;
  const ids = getCategoriasPorTipo(tipo);
  const cats = DB.categorias.filter(c => ids.includes(c.id));
  el.innerHTML = cats.map(c => '<option value="'+c.id+'"'+(c.id===valorAtual?' selected':'')+'>'+c.nome+'</option>').join('');
}

function preencherSelects() {
  // Filtro de lançamentos — mostra todas
  const filtro = document.getElementById('filtro-categoria');
  if (filtro) {
    filtro.innerHTML = '<option value="">Todas as categorias</option>' +
      DB.categorias.map(c => '<option value="'+c.id+'">'+c.nome+'</option>').join('');
  }
  // Manual — filtra pelo tipo selecionado
  const tipoManual = document.getElementById('manual-tipo');
  const catManual = document.getElementById('manual-categoria');
  if (tipoManual && catManual) {
    preencherSelectCategoriaPorTipo('manual-categoria', tipoManual.value, catManual.value);
  }
}

function preencherSelectCategoria(id, valor) {
  const el = document.getElementById(id); if (!el) return;
  // Descobre o tipo do contexto para filtrar
  let tipo = '';
  if (id === 'editar-categoria') {
    const t = document.getElementById('editar-tipo');
    if (t) tipo = t.value;
  } else if (id === 'validar-categoria') {
    const t = document.getElementById('validar-tipo');
    if (t) tipo = t.value;
  }
  const ids = tipo ? getCategoriasPorTipo(tipo) : DB.categorias.map(c => c.id);
  const cats = DB.categorias.filter(c => ids.includes(c.id));
  el.innerHTML = cats.map(c => '<option value="'+c.id+'"'+(c.id===valor?' selected':'')+'>'+c.nome+'</option>').join('');
}

function atualizarCategoriasPorTipo(selectTipoId, selectCatId) {
  const tipo = document.getElementById(selectTipoId)?.value || '';
  preencherSelectCategoriaPorTipo(selectCatId, tipo, '');
  // Limpa subcategoria
  const subcatMap = { 'manual-categoria': 'manual-subcategoria', 'editar-categoria': 'editar-subcategoria', 'validar-categoria': 'validar-subcategoria' };
  const subcatId = subcatMap[selectCatId];
  if (subcatId) {
    const sel = document.getElementById(subcatId);
    if (sel) sel.innerHTML = '<option value="">Sem subcategoria</option>';
  }
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
  // Pré-preenche data de hoje e prepara selects
  document.getElementById('manual-data').value = new Date().toISOString().slice(0, 10);
  const tipoAtual = document.getElementById('manual-tipo').value || 'despesa';
  preencherSelectCategoriaPorTipo('manual-categoria', tipoAtual, '');
  atualizarSubcatManual();
  renderSeletorTags('manual-tags-seletor', []);
  document.getElementById('modal-lancamento').style.display = 'flex';
  // Foco no valor para lançamento rápido
  setTimeout(() => document.getElementById('manual-valor').focus(), 100);
}
