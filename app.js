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
    { id: 'assinaturas', natureza: 'despesa',      nome: 'Assinaturas',               cor: '#6366f1', codigo: '2.3', subcats: ['Telefone','Streaming','Google','Apps','Outros'] },
    { id: 'faculdade', natureza: 'despesa',        nome: 'Faculdade',                 cor: '#8b5cf6', codigo: '2.4', subcats: ['Mensalidade Estácio','Material'] },
    { id: 'igreja', natureza: 'despesa',           nome: 'Igreja',                    cor: '#ec4899', codigo: '2.5', subcats: ['Dízimo','Oferta','Eventos'] },
    // ── DESPESAS VARIÁVEIS ──
    { id: 'alimentacao', natureza: 'despesa',      nome: 'Alimentação',               cor: '#f59e0b', codigo: '3.1', subcats: ['Mercado','Delivery','Restaurante','Outros'] },
    { id: 'transp_variavel', natureza: 'despesa',  nome: 'Transporte',                cor: '#d97706', codigo: '3.2', subcats: ['Combustível Carro','Combustível Moto','Manutenção Carro','Manutenção Moto','Pneus','Uber','Estacionamento','Multa','IPVA / Licenciamento','Seguro do Veículo','Financiamento Veículo'] },
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
  formasPagamento: [
    { id: 'credito',       nome: 'Cartão de Crédito', tipoCiclo: 'fatura',  fechamento: 1, vencimento: 10 },
    { id: 'xp',            nome: 'XP',                tipoCiclo: 'simples' },
    { id: 'inter',         nome: 'Inter',             tipoCiclo: 'simples' },
    { id: 'cea',           nome: 'C&A',               tipoCiclo: 'simples' },
    { id: 'hipercard',     nome: 'Hipercard',         tipoCiclo: 'simples' },
    { id: 'pix',           nome: 'Pix',               tipoCiclo: 'simples' },
    { id: 'debito',        nome: 'Débito',            tipoCiclo: 'simples' },
    { id: 'dinheiro',      nome: 'Dinheiro',          tipoCiclo: 'simples' },
    { id: 'transferencia', nome: 'Transferência',     tipoCiclo: 'simples' },
    { id: 'boleto',        nome: 'Boleto',            tipoCiclo: 'simples' },
  ],
  config: { nome: 'Paulo Alioti', meta: 1000000 }
};

let chartPatrimonio = null;
let chartPatrimonioFull = null;
let chartCategorias = null;
// ===== Datas no fuso LOCAL (nunca usar toISOString para "hoje": em UTC-3, depois das 21h o UTC já virou o dia seguinte) =====
function pad2(n) { return String(n).padStart(2, '0'); }
function dataLocalISO(d) { d = d || new Date(); return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
function mesLocalISO(d) { return dataLocalISO(d).slice(0, 7); }

// Escape de HTML — todo texto vindo do usuário/extrato passa por aqui antes de entrar em innerHTML
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

let mesAtual = mesLocalISO();

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
  try { atualizarLembreteBackup(); } catch(e) { console.error('backup:', e); }
  try { aplicarTemaSalvo(); } catch(e) { console.error('tema:', e); }
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
      DB.formasPagamento = (parsed.formasPagamento && parsed.formasPagamento.length) ? parsed.formasPagamento : DB.formasPagamento;
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
          { id: 'assinaturas', natureza: 'despesa',       nome: 'Assinaturas',             cor: '#6366f1', codigo: '2.3', subcats: ['Telefone','Streaming','Google','Apps','Outros'] },
          { id: 'faculdade', natureza: 'despesa',         nome: 'Faculdade',               cor: '#8b5cf6', codigo: '2.4', subcats: ['Mensalidade Estácio','Material'] },
          { id: 'igreja', natureza: 'despesa',            nome: 'Igreja',                  cor: '#ec4899', codigo: '2.5', subcats: ['Dízimo','Oferta','Eventos'] },
          { id: 'alimentacao', natureza: 'despesa',       nome: 'Alimentação',             cor: '#f59e0b', codigo: '3.1', subcats: ['Mercado','Delivery','Restaurante','Outros'] },
          { id: 'transp_variavel', natureza: 'despesa',   nome: 'Transporte',              cor: '#d97706', codigo: '3.2', subcats: ['Combustível Carro','Combustível Moto','Manutenção Carro','Manutenção Moto','Pneus','Uber','Estacionamento','Multa','IPVA / Licenciamento','Seguro do Veículo','Financiamento Veículo'] },
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
      // Migração v5 — unificação: previstos viram lançamentos em aberto; todo lançamento ganha situação
      if (!parsed.migradoV5) {
        // 1. Lançamentos existentes: tudo que já está no sistema é fato consumado = pago
        DB.lancamentos.forEach(l => { if (!l.situacao) l.situacao = 'pago'; });
        // 2. Previstos viram lançamentos em aberto no mês atual (se ainda não baixados)
        const mesHoje = mesLocalISO();
        (DB.previstos || []).forEach(p => {
          const jaBaixado = DB.lancamentos.some(l => l.previstoId === p.id && l.data.slice(0, 7) === mesHoje);
          if (jaBaixado) return;
          const dia = p.dia ? String(Math.min(p.dia, 28)).padStart(2, '0') : '01';
          DB.lancamentos.push({
            id: gerarId(), data: mesHoje + '-' + dia, descricao: p.descricao,
            valor: p.valor, tipo: p.tipo, categoria: p.categoria,
            subcategoria: p.subcategoria || '', tags: [], status: 'validado',
            situacao: 'aberto', formaPagamento: ''
          });
        });
        DB.previstos = [];
        DB.migradoV5 = true;
        salvarDB();
        console.log('Migração v5 — modelo unificado com situação');
      }
      // Migração v6 — funde Transporte Fixo + Variável em "Transporte"
      if (!parsed.migradoV6) {
        const fixo = DB.categorias.find(c => c.id === 'transp_fixo');
        const variavel = DB.categorias.find(c => c.id === 'transp_variavel');
        if (variavel) {
          variavel.nome = 'Transporte';
          if (fixo) {
            // Move subcats do fixo que não existem no variável
            (fixo.subcats || []).forEach(s => {
              if (!(variavel.subcats || []).includes(s)) variavel.subcats.push(s);
            });
            DB.categorias = DB.categorias.filter(c => c.id !== 'transp_fixo');
          }
          // Migra lançamentos e regras
          DB.lancamentos.forEach(l => { if (l.categoria === 'transp_fixo') l.categoria = 'transp_variavel'; });
          DB.regras.forEach(r => { if (r.categoria === 'transp_fixo') r.categoria = 'transp_variavel'; });
          // Orçamento: soma os dois se existirem
          if (DB.orcamentos['transp_fixo']) {
            DB.orcamentos['transp_variavel'] = (DB.orcamentos['transp_variavel'] || 0) + DB.orcamentos['transp_fixo'];
            delete DB.orcamentos['transp_fixo'];
          }
        }
        DB.migradoV6 = true;
        salvarDB();
        console.log('Migração v6 — Transporte unificado');
      }
      // Migração v7 — Formas de Pagamento vira entidade própria (antes eram valores fixos em cada <select>)
      if (!parsed.migradoV7) {
        if (!parsed.formasPagamento || !parsed.formasPagamento.length) {
          // Mantém o seed padrão já definido em DB.formasPagamento (inclui os ids legados
          // credito/debito/pix/dinheiro/transferencia/boleto, então lançamentos antigos continuam válidos)
        }
        DB.migradoV7 = true;
        salvarDB();
        console.log('Migração v7 — Formas de Pagamento como entidade');
      }
    } catch(e) { console.error('Erro ao carregar DB', e); }
  }
}

// ========================
// NAVEGAÇÃO
// ========================
function alternarTema() {
  const escuro = document.body.classList.toggle('dark');
  localStorage.setItem('tema', escuro ? 'dark' : 'light');
  const icone = document.querySelector('#btn-tema i');
  if (icone) icone.className = escuro ? 'ti ti-sun' : 'ti ti-moon';
}

function aplicarTemaSalvo() {
  const tema = localStorage.getItem('tema');
  if (tema === 'dark') {
    document.body.classList.add('dark');
    const icone = document.querySelector('#btn-tema i');
    if (icone) icone.className = 'ti ti-sun';
  }
}

function showPage(id) {
  try {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const pg = document.getElementById('page-' + id);
    if (pg) pg.classList.add('active');

    // Encontra o nav-item pelo onclick que referencia esta página (evita depender de índice/ordem)
    const itemAtivo = Array.from(document.querySelectorAll('.nav-item')).find(n => {
      const on = n.getAttribute('onclick') || '';
      return on.includes("showPage('" + id + "')");
    });
    if (itemAtivo) itemAtivo.classList.add('active');

    const titles = {
      dashboard:'Dashboard', lancamentos:'Lançamentos', importar:'Conferência Mensal',
      dre:'DRE', patrimonio:'Patrimônio',
      configuracoes:'Configurações'
    };
    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent = titles[id] || id;

    // Subtítulo: mês vigente formatado (ex: "Julho 2026") em todos os módulos
    const subEl = document.getElementById('page-sub');
    if (subEl) {
      const [y, m] = mesAtual.split('-').map(Number);
      const label = new Date(y, m - 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
      subEl.textContent = label.charAt(0).toUpperCase() + label.slice(1);
    }

    if (id === 'dashboard') renderDashboard();
    if (id === 'lancamentos') renderLancamentos();
    if (id === 'dre') { try { preencherDREmeses(); renderDRE(); } catch(e) { console.error('DRE:', e); } }
    if (id === 'configuracoes') {
      try { renderPlanoContas(); } catch(e) { console.error('planoContas:', e); }
      try { renderFormasPagamento(); } catch(e) { console.error('formasPagamento:', e); }
      try { renderTags(); } catch(e) { console.error('tags:', e); }
      try { renderRegras(); } catch(e) { console.error('regras:', e); }
    }
    if (id === 'patrimonio') { try { renderPatrimonio(); } catch(e) { console.error('patrimonio:', e); } }
    if (id === 'importar') { try { renderImportacoes(); } catch(e) {} }
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
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
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
  mesAtual = mesLocalISO(d);
  preencherSeletorMesDashboard();
  renderDashboard();
}

function renderDashboard() {
  preencherSeletorMesDashboard();
  preencherSeletorTagDashboard();

  // Filtro por tag — GLOBAL: quando selecionado, TODOS os widgets do dashboard respondem
  const dashTag = (document.getElementById('dash-filtro-tag-select')?.value || '').trim().toLowerCase();
  const filtraTag = (arr) => dashTag ? arr.filter(l => (l.tags || []).some(t => t.toLowerCase() === dashTag)) : arr;

  const lancsMes = filtraTag(getMes(mesAtual));
  const isPago = l => (l.situacao || 'pago') === 'pago';
  // Receitas/Despesas = regime de caixa (só o que já foi pago)
  const receitas = lancsMes.filter(l => l.tipo === 'receita' && isPago(l)).reduce((a, b) => a + b.valor, 0);
  const despesas = lancsMes.filter(l => l.tipo === 'despesa' && isPago(l)).reduce((a, b) => a + b.valor, 0);
  const investimentos = lancsMes.filter(l => l.tipo === 'investimento' && isPago(l)).reduce((a, b) => a + b.valor, 0);

  const d = new Date(mesAtual + '-01');
  d.setMonth(d.getMonth() - 1);
  const mesAnt = mesLocalISO(d);
  const laMes = filtraTag(getMes(mesAnt));
  const recAnt = laMes.filter(l => l.tipo === 'receita' && isPago(l)).reduce((a, b) => a + b.valor, 0);
  const despAnt = laMes.filter(l => l.tipo === 'despesa' && isPago(l)).reduce((a, b) => a + b.valor, 0);
  const invAnt = laMes.filter(l => l.tipo === 'investimento' && isPago(l)).reduce((a, b) => a + b.valor, 0);

  document.getElementById('m-receitas').textContent = fmt(receitas);
  document.getElementById('m-despesas').textContent = fmt(despesas);
  const elInv = document.getElementById('m-investimentos');
  if (elInv) elInv.textContent = fmt(investimentos);

  const pats = [...DB.patrimonio].sort((a, b) => a.mes.localeCompare(b.mes));
  const pat = pats.length ? pats[pats.length - 1].valor : 0;
  const patAnt = pats.length > 1 ? pats[pats.length - 2].valor : 0;
  document.getElementById('m-patrimonio').textContent = fmt(pat);

  const setDelta = (elId, atual, anterior) => {
    const el = document.getElementById(elId);
    if (!el) return;
    if (!anterior || anterior === 0) { el.textContent = ''; return; }
    const pct = ((atual - anterior) / anterior * 100).toFixed(0);
    const up = atual >= anterior;
    el.className = 'metric-delta ' + (up ? 'delta-up' : 'delta-down');
    el.textContent = (up ? '↑' : '↓') + ' ' + Math.abs(pct) + '% vs mês anterior';
  };
  setDelta('d-receitas', receitas, recAnt);
  setDelta('d-despesas', despesas, despAnt);
  setDelta('d-investimentos', investimentos, invAnt);
  setDelta('d-patrimonio', pat, patAnt);

  // lancsMes já vem filtrado pela tag (filtro global)
  const lancsFiltrados = lancsMes;

  const subEl = document.getElementById('dash-tag-sub');
  if (subEl) subEl.textContent = dashTag ? 'Tag: ' + dashTag : 'vs orçamento';

  renderFaturaCartao();
  renderGastosPorFormaPagamento(lancsFiltrados);

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
      '<span class="cat-label">' + esc(getNomeCat(cat)) + '</span>' +
      '<div class="cat-bar-bg"><div class="cat-bar" style="width:' + pct + '%;background:' + corBarra + '"></div></div>' +
      '<span class="cat-value">' + fmt(val) + orcLabel + '</span>' +
      '</div>';
  });
  if (!Object.keys(porCat).length) {
    listaCats.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:16px 0;text-align:center">Nenhuma despesa' + (dashTag ? ' com a tag "' + dashTag + '"' : '') + ' em ' + mesAtual + '</div>';
  }

  try { renderGraficoPrevistoRealizado(); } catch(e) { console.error('previstoRealizado:', e); }
  try { renderChartPatrimonio(); } catch(e) { console.error('chartPatrimonio:', e); }
  try { renderGraficoMensal(); } catch(e) { console.error('grafico:', e); }
}

// ========================
// GRÁFICO MENSAL INTERATIVO
// ========================
function atualizarFiltroGraficoCategoria() {
  const tipo = document.getElementById('grafico-tipo')?.value || 'despesa';
  const selCat = document.getElementById('grafico-categoria');
  if (selCat) {
    const ids = getCategoriasPorTipo(tipo);
    const cats = DB.categorias.filter(c => ids.includes(c.id)).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    selCat.innerHTML = '<option value="">Todas as categorias</option>' + cats.map(c => '<option value="' + c.id + '">' + c.nome + '</option>').join('');
  }
  atualizarFiltroGraficoSubcategoria();
  renderGraficoMensal();
}

function atualizarFiltroGraficoSubcategoria() {
  const catId = document.getElementById('grafico-categoria')?.value || '';
  const selSub = document.getElementById('grafico-subcategoria');
  if (!selSub) return;
  const cat = catId ? DB.categorias.find(c => c.id === catId) : null;
  const subs = cat ? (cat.subcats || []) : [];
  selSub.innerHTML = '<option value="">Todas as subcategorias</option>' + subs.map(s => '<option value="' + s.replace(/"/g,'&quot;') + '">' + s + '</option>').join('');
  selSub.disabled = !catId;
}

function renderGraficoMensal() {
  const el = document.getElementById('grafico-mensal');
  if (!el) return;
  const tipo = document.getElementById('grafico-tipo')?.value || 'despesa';
  const nMeses = parseInt(document.getElementById('grafico-periodo')?.value || '6');
  const catFiltro = document.getElementById('grafico-categoria')?.value || '';
  const subFiltro = document.getElementById('grafico-subcategoria')?.value || '';
  const isPago = l => (l.situacao || 'pago') === 'pago';

  // Monta lista de meses (do mais antigo ao atual)
  const meses = [];
  const base = new Date(mesAtual + '-01');
  for (let i = nMeses - 1; i >= 0; i--) {
    const d = new Date(base.getFullYear(), base.getMonth() - i, 1);
    meses.push(mesLocalISO(d));
  }

  const dados = meses.map(m => {
    const total = filtraPorDashTag(DB.lancamentos
      .filter(l => l.tipo === tipo && isPago(l) && l.data.slice(0, 7) === m
        && (!catFiltro || l.categoria === catFiltro)
        && (!subFiltro || l.subcategoria === subFiltro)))
      .reduce((a, b) => a + b.valor, 0);
    return { mes: m, total };
  });

  const maxVal = Math.max(...dados.map(d => d.total), 1);
  const cor = tipo === 'receita' ? '#16a34a' : tipo === 'investimento' ? '#2563eb' : '#d97706';
  const larguraBarra = 100 / dados.length;
  const alturaMax = 220;

  let svg = '<svg viewBox="0 0 ' + (dados.length * 80) + ' 280" style="width:100%;min-width:' + (dados.length * 60) + 'px;height:280px;font-family:inherit">';
  dados.forEach((d, i) => {
    const altura = d.total > 0 ? (d.total / maxVal) * alturaMax : 0;
    const x = i * 80 + 15;
    const y = alturaMax - altura + 20;
    const [ano, mesN] = d.mes.split('-');
    const nomeMs = new Date(ano, mesN - 1).toLocaleDateString('pt-BR', { month: 'short' });
    svg += '<g style="cursor:pointer" onclick="abrirDetalheMes(\'' + d.mes + '\',\'' + tipo + '\')">';
    svg += '<rect x="' + x + '" y="20" width="50" height="' + alturaMax + '" fill="transparent"></rect>'; // área clicável
    svg += '<rect x="' + x + '" y="' + y + '" width="50" height="' + altura + '" rx="4" fill="' + cor + '" opacity="0.85"><title>' + fmt(d.total) + '</title></rect>';
    if (d.total > 0) svg += '<text x="' + (x + 25) + '" y="' + (y - 6) + '" text-anchor="middle" font-size="11" fill="var(--text2)">' + (d.total >= 1000 ? 'R$ ' + (d.total/1000).toFixed(1) + 'k' : fmt(d.total).replace('R$ ', '')) + '</text>';
    svg += '<text x="' + (x + 25) + '" y="' + (alturaMax + 40) + '" text-anchor="middle" font-size="11" fill="var(--text3)">' + nomeMs + '/' + ano.slice(2) + '</text>';
    svg += '</g>';
  });
  svg += '</svg>';
  el.innerHTML = svg;
}

// Previsto × Realizado — barras agrupadas por mês (sobra prevista vs. sobra já realizada)
function renderGraficoPrevistoRealizado() {
  const el = document.getElementById('grafico-previsto-realizado');
  if (!el) return;
  const nMeses = 6;
  const meses = [];
  const base = new Date(mesAtual + '-01');
  for (let i = nMeses - 1; i >= 0; i--) {
    const d = new Date(base.getFullYear(), base.getMonth() - i, 1);
    meses.push(mesLocalISO(d));
  }

  const dados = meses.map(m => {
    const doMes = filtraPorDashTag(DB.lancamentos.filter(l => l.data.slice(0, 7) === m));
    const recTotal = doMes.filter(l => l.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
    const despTotal = doMes.filter(l => l.tipo === 'despesa').reduce((a, b) => a + b.valor, 0);
    const recPago = doMes.filter(l => l.tipo === 'receita' && (l.situacao||'pago')==='pago').reduce((a, b) => a + b.valor, 0);
    const despPago = doMes.filter(l => l.tipo === 'despesa' && (l.situacao||'pago')==='pago').reduce((a, b) => a + b.valor, 0);
    return { mes: m, previsto: recTotal - despTotal, realizado: recPago - despPago };
  });

  const maxVal = Math.max(...dados.map(d => Math.max(Math.abs(d.previsto), Math.abs(d.realizado))), 1);
  const minVal = Math.min(...dados.map(d => Math.min(d.previsto, d.realizado)), 0);
  const alturaMax = 180;
  const zeroY = 20 + (maxVal / (maxVal - minVal)) * alturaMax;
  const escala = (v) => (v / (maxVal - minVal)) * alturaMax;
  const largGrupo = 90;

  let svg = '<svg viewBox="0 0 ' + (dados.length * largGrupo) + ' 280" style="width:100%;min-width:' + (dados.length * 70) + 'px;height:280px;font-family:inherit">';
  // linha zero
  svg += '<line x1="0" y1="' + zeroY + '" x2="' + (dados.length * largGrupo) + '" y2="' + zeroY + '" stroke="var(--border-light)" stroke-width="1"></line>';
  dados.forEach((d, i) => {
    const xg = i * largGrupo + 10;
    const [ano, mesN] = d.mes.split('-');
    const nomeMs = new Date(ano, mesN - 1).toLocaleDateString('pt-BR', { month: 'short' });
    svg += '<g style="cursor:pointer" onclick="abrirDetalhePrevistoRealizado(\'' + d.mes + '\')">';
    svg += '<rect x="' + xg + '" y="10" width="70" height="250" fill="transparent"></rect>';
    // Previsto (barra clara)
    const hP = escala(Math.abs(d.previsto));
    const yP = d.previsto >= 0 ? zeroY - hP : zeroY;
    svg += '<rect x="' + xg + '" y="' + yP + '" width="28" height="' + hP + '" rx="3" fill="#93c5fd"><title>Previsto: ' + fmt(d.previsto) + '</title></rect>';
    // Realizado (barra escura)
    const hR = escala(Math.abs(d.realizado));
    const yR = d.realizado >= 0 ? zeroY - hR : zeroY;
    svg += '<rect x="' + (xg + 34) + '" y="' + yR + '" width="28" height="' + hR + '" rx="3" fill="#1d4ed8"><title>Realizado: ' + fmt(d.realizado) + '</title></rect>';
    svg += '<text x="' + (xg + 31) + '" y="270" text-anchor="middle" font-size="11" fill="var(--text3)">' + nomeMs + '/' + ano.slice(2) + '</text>';
    svg += '</g>';
  });
  svg += '</svg>';
  svg += '<div style="display:flex;gap:16px;justify-content:center;margin-top:6px;font-size:11px;color:var(--text2)">' +
    '<span><span style="display:inline-block;width:9px;height:9px;background:#93c5fd;border-radius:2px;margin-right:4px"></span>Previsto</span>' +
    '<span><span style="display:inline-block;width:9px;height:9px;background:#1d4ed8;border-radius:2px;margin-right:4px"></span>Realizado</span>' +
  '</div>';
  el.innerHTML = svg;
}

function abrirDetalhePrevistoRealizado(mes) {
  const doMes = filtraPorDashTag(DB.lancamentos.filter(l => l.data.slice(0, 7) === mes));
  const recTotal = doMes.filter(l => l.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
  const despTotal = doMes.filter(l => l.tipo === 'despesa').reduce((a, b) => a + b.valor, 0);
  const recPago = doMes.filter(l => l.tipo === 'receita' && (l.situacao||'pago')==='pago').reduce((a, b) => a + b.valor, 0);
  const despPago = doMes.filter(l => l.tipo === 'despesa' && (l.situacao||'pago')==='pago').reduce((a, b) => a + b.valor, 0);
  const previsto = recTotal - despTotal, realizado = recPago - despPago;
  const [ano, mesN] = mes.split('-');
  const nomeMs = new Date(ano, mesN - 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  document.getElementById('detalhe-mes-titulo').textContent = 'Previsto × Realizado · ' + nomeMs.charAt(0).toUpperCase() + nomeMs.slice(1);
  document.getElementById('detalhe-mes-total').textContent = fmt(realizado);
  const corpo = document.getElementById('detalhe-mes-corpo');
  corpo.innerHTML =
    '<div style="display:flex;flex-direction:column;gap:10px;padding:6px 0">' +
      '<div style="display:flex;justify-content:space-between;padding:8px 10px;background:var(--bg);border-radius:8px"><span style="font-size:13px">Previsto (receitas − despesas, incluindo em aberto)</span><span style="font-weight:600">' + fmt(previsto) + '</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:8px 10px;background:var(--bg);border-radius:8px"><span style="font-size:13px">Realizado (só o que já foi pago/recebido)</span><span style="font-weight:600">' + fmt(realizado) + '</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:8px 10px;border-top:0.5px solid var(--border-light);font-size:12px;color:var(--text3)"><span>Receitas: ' + fmt(recTotal) + ' (pago: ' + fmt(recPago) + ')</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:0 10px;font-size:12px;color:var(--text3)"><span>Despesas: ' + fmt(despTotal) + ' (pago: ' + fmt(despPago) + ')</span></div>' +
    '</div>';
  document.getElementById('modal-detalhe-mes').style.display = 'flex';
}

function abrirDetalheMes(mes, tipo) {
  const isPago = l => (l.situacao || 'pago') === 'pago';
  const catFiltro = document.getElementById('grafico-categoria')?.value || '';
  const subFiltro = document.getElementById('grafico-subcategoria')?.value || '';
  const itens = filtraPorDashTag(DB.lancamentos
    .filter(l => l.tipo === tipo && isPago(l) && l.data.slice(0, 7) === mes
      && (!catFiltro || l.categoria === catFiltro)
      && (!subFiltro || l.subcategoria === subFiltro)))
    .sort((a, b) => b.valor - a.valor);
  const [ano, mesN] = mes.split('-');
  const nomeMs = new Date(ano, mesN - 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const total = itens.reduce((a, b) => a + b.valor, 0);
  const tipoLabel = tipo === 'receita' ? 'Receitas' : tipo === 'investimento' ? 'Investimentos' : 'Despesas';

  document.getElementById('detalhe-mes-titulo').textContent = tipoLabel + ' · ' + nomeMs.charAt(0).toUpperCase() + nomeMs.slice(1);
  document.getElementById('detalhe-mes-total').textContent = fmt(total);

  // Agrupa por categoria
  const porCat = {};
  itens.forEach(l => { porCat[l.categoria] = (porCat[l.categoria] || 0) + l.valor; });
  const cats = Object.entries(porCat).sort((a, b) => b[1] - a[1]);

  const corpo = document.getElementById('detalhe-mes-corpo');
  if (!itens.length) {
    corpo.innerHTML = '<div style="text-align:center;color:var(--text3);padding:20px">Nenhum lançamento neste mês</div>';
  } else {
    corpo.innerHTML =
      '<div style="margin-bottom:14px">' +
        cats.map(([cat, val]) => {
          const pct = ((val / total) * 100).toFixed(1);
          return '<div style="display:flex;align-items:center;gap:10px;padding:6px 0">' +
            '<div style="width:10px;height:10px;border-radius:50%;background:' + getCor(cat) + ';flex-shrink:0"></div>' +
            '<span style="flex:1;font-size:13px">' + esc(getNomeCat(cat)) + '</span>' +
            '<span style="font-size:12px;color:var(--text3)">' + pct + '%</span>' +
            '<span style="font-size:13px;font-weight:500;min-width:90px;text-align:right">' + fmt(val) + '</span>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div style="border-top:0.5px solid var(--border-light);padding-top:10px;font-size:12px;color:var(--text2);font-weight:500;margin-bottom:8px">Todos os lançamentos (' + itens.length + ')</div>' +
      itens.map(l =>
        '<div style="display:flex;align-items:center;gap:10px;padding:5px 0;border-bottom:0.5px solid var(--border-light2)">' +
          '<span style="font-size:11px;color:var(--text3);min-width:50px">' + formatarData(l.data) + '</span>' +
          '<span style="flex:1;font-size:12px">' + esc(l.descricao) + '</span>' +
          '<span style="font-size:12px;font-weight:500">' + fmt(l.valor) + '</span>' +
        '</div>'
      ).join('');
  }
  document.getElementById('modal-detalhe-mes').style.display = 'flex';
}

// ========================
// SITUAÇÃO DAS CONTAS (tela de Lançamentos) — cards clicáveis que filtram a tabela
// ========================
let filtroSituacaoRapida = '';

function calcularSituacaoLancamentos() {
  const status = document.getElementById('filtro-status')?.value || '';
  const tipo = document.getElementById('filtro-tipo')?.value || '';
  const cat = document.getElementById('filtro-categoria')?.value || '';
  const tag = document.getElementById('filtro-tag')?.value || '';
  const busca = (document.getElementById('busca-global')?.value || '').trim().toLowerCase();
  const dataIni = document.getElementById('filtro-data-inicio')?.value || '';
  const dataFim = document.getElementById('filtro-data-fim')?.value || '';

  let base = DB.lancamentos.filter(l => l.tipo === 'despesa' || l.tipo === 'receita');
  if (status) base = base.filter(l => l.status === status || (status === 'interno' && l.tipo === 'interno'));
  if (tipo === 'receita' || tipo === 'despesa') base = base.filter(l => l.tipo === tipo);
  if (cat) base = base.filter(l => l.categoria === cat);
  if (tag) base = base.filter(l => (l.tags || []).includes(tag));
  if (busca) base = base.filter(l =>
    l.descricao.toLowerCase().includes(busca) ||
    getNomeCat(l.categoria).toLowerCase().includes(busca) ||
    (l.subcategoria || '').toLowerCase().includes(busca) ||
    (l.tags || []).some(t => t.toLowerCase().includes(busca))
  );
  if (dataIni) base = base.filter(l => l.data >= dataIni);
  if (dataFim) base = base.filter(l => l.data <= dataFim);

  const hojeISO = dataLocalISO();
  const vencidas = base.filter(l => (l.situacao || 'pago') === 'aberto' && l.data < hojeISO).reduce((a, b) => a + b.valor, 0);
  const vencemHoje = base.filter(l => (l.situacao || 'pago') === 'aberto' && l.data === hojeISO).reduce((a, b) => a + b.valor, 0);
  const aVencer = base.filter(l => (l.situacao || 'pago') === 'aberto' && l.data > hojeISO).reduce((a, b) => a + b.valor, 0);
  const pagas = base.filter(l => (l.situacao || 'pago') === 'pago').reduce((a, b) => a + b.valor, 0);
  return { vencidas, vencemHoje, aVencer, pagas, total: vencidas + vencemHoje + aVencer + pagas };
}

function renderSituacaoLancamentos() {
  const wrap = document.getElementById('situacao-lancamentos');
  if (!wrap) return;
  const s = calcularSituacaoLancamentos();
  const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = fmt(v); };
  setTxt('sit-l-vencidas', s.vencidas);
  setTxt('sit-l-vencem-hoje', s.vencemHoje);
  setTxt('sit-l-a-vencer', s.aVencer);
  setTxt('sit-l-pagas', s.pagas);
  setTxt('sit-l-total', s.total);
  document.querySelectorAll('#situacao-lancamentos .fp-card').forEach(c => {
    c.classList.toggle('fp-card-active', c.dataset.situacao === filtroSituacaoRapida);
  });
}

function aplicarFiltroSituacaoRapida(situacao) {
  filtroSituacaoRapida = (filtroSituacaoRapida === situacao) ? '' : situacao;
  const selSituacao = document.getElementById('filtro-situacao');
  if (selSituacao) {
    if (filtroSituacaoRapida === 'vencidas' || filtroSituacaoRapida === 'vencem-hoje' || filtroSituacaoRapida === 'a-vencer') selSituacao.value = 'aberto';
    else if (filtroSituacaoRapida === 'pagas') selSituacao.value = 'pago';
    else selSituacao.value = '';
  }
  renderLancamentos();
}

function mudarFiltroSituacaoManual() {
  filtroSituacaoRapida = '';
  renderLancamentos();
}

function renderChartPatrimonio() {
  if (typeof Chart === 'undefined') { console.error('Chart.js não carregou (CDN indisponível) — gráfico de patrimônio ignorado'); return; }
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
// Estado de ordenação da tabela de lançamentos
let lancSortCol = 'data';
let lancSortDir = -1; // -1 = decrescente (mais recente primeiro)

function ordenarPor(col) {
  if (lancSortCol === col) { lancSortDir *= -1; }
  else { lancSortCol = col; lancSortDir = col === 'data' ? -1 : 1; }
  renderLancamentos();
}

function aplicarFiltroRapido(tipo) {
  const hoje = new Date();
  const y = hoje.getFullYear(), m = hoje.getMonth();
  const fmt = d => dataLocalISO(d);
  let ini = '', fim = '';
  if (tipo === 'mes_atual') { ini = fmt(new Date(y, m, 1)); fim = fmt(new Date(y, m + 1, 0)); }
  else if (tipo === 'mes_anterior') { ini = fmt(new Date(y, m - 1, 1)); fim = fmt(new Date(y, m, 0)); }
  else if (tipo === 'mes_seguinte') { ini = fmt(new Date(y, m + 1, 1)); fim = fmt(new Date(y, m + 2, 0)); }
  else if (tipo === 'ultimos_3') { ini = fmt(new Date(y, m - 2, 1)); fim = fmt(new Date(y, m + 1, 0)); }
  else if (tipo === 'ano_atual') { ini = y + '-01-01'; fim = y + '-12-31'; }
  document.getElementById('filtro-data-inicio').value = ini;
  document.getElementById('filtro-data-fim').value = fim;
  // Destaca o botão ativo
  document.querySelectorAll('.filtro-rapido').forEach(b => b.classList.remove('btn-dark'));
  const btn = document.getElementById('fr-' + tipo);
  if (btn) btn.classList.add('btn-dark');
  renderLancamentos();
}

function limparFiltroRapido() {
  document.getElementById('filtro-data-inicio').value = '';
  document.getElementById('filtro-data-fim').value = '';
  document.querySelectorAll('.filtro-rapido').forEach(b => b.classList.remove('btn-dark'));
  renderLancamentos();
}

function renderLancamentos() {
  const status = document.getElementById('filtro-status').value;
  const tipo = document.getElementById('filtro-tipo').value;
  const cat = document.getElementById('filtro-categoria').value;
  const tag = document.getElementById('filtro-tag')?.value || '';
  const busca = (document.getElementById('busca-global')?.value || '').trim().toLowerCase();
  const dataIni = document.getElementById('filtro-data-inicio')?.value || '';
  const dataFim = document.getElementById('filtro-data-fim')?.value || '';

  let lista = [...DB.lancamentos];

  // Ordenação clicável
  lista.sort((a, b) => {
    let va, vb;
    if (lancSortCol === 'data') { va = a.data; vb = b.data; }
    else if (lancSortCol === 'descricao') { va = a.descricao.toLowerCase(); vb = b.descricao.toLowerCase(); }
    else if (lancSortCol === 'categoria') { va = getNomeCat(a.categoria).toLowerCase(); vb = getNomeCat(b.categoria).toLowerCase(); }
    else if (lancSortCol === 'valor') { return (a.valor - b.valor) * lancSortDir; }
    else { va = a.data; vb = b.data; }
    return va < vb ? -lancSortDir : va > vb ? lancSortDir : 0;
  });

  if (status) lista = lista.filter(l => l.status === status || (status === 'interno' && l.tipo === 'interno'));
  if (tipo) lista = lista.filter(l => l.tipo === tipo);
  if (cat) lista = lista.filter(l => l.categoria === cat);
  if (tag) lista = lista.filter(l => (l.tags || []).includes(tag));
  // Busca por descrição, categoria ou tag
  if (busca) lista = lista.filter(l =>
    l.descricao.toLowerCase().includes(busca) ||
    getNomeCat(l.categoria).toLowerCase().includes(busca) ||
    (l.subcategoria || '').toLowerCase().includes(busca) ||
    (l.tags || []).some(t => t.toLowerCase().includes(busca))
  );
  // Filtro por período
  if (dataIni) lista = lista.filter(l => l.data >= dataIni);
  if (dataFim) lista = lista.filter(l => l.data <= dataFim);
  const situacaoFiltro = document.getElementById('filtro-situacao')?.value || '';
  if (situacaoFiltro) lista = lista.filter(l => (l.situacao || 'pago') === situacaoFiltro);

  const hojeISO = dataLocalISO();
  if (filtroSituacaoRapida === 'vencidas') lista = lista.filter(l => (l.situacao||'pago')==='aberto' && l.data < hojeISO);
  else if (filtroSituacaoRapida === 'vencem-hoje') lista = lista.filter(l => (l.situacao||'pago')==='aberto' && l.data === hojeISO);
  else if (filtroSituacaoRapida === 'a-vencer') lista = lista.filter(l => (l.situacao||'pago')==='aberto' && l.data > hojeISO);
  else if (filtroSituacaoRapida === 'pagas') lista = lista.filter(l => (l.situacao||'pago')==='pago');

  renderSituacaoLancamentos();

  // Atualiza setas nos cabeçalhos
  document.querySelectorAll('.th-sort').forEach(th => {
    const col = th.dataset.col;
    const base = th.dataset.label;
    th.innerHTML = base + (lancSortCol === col ? (lancSortDir === 1 ? ' ↑' : ' ↓') : '');
  });

  const tbody = document.getElementById('tbody-lancamentos');
  tbody.innerHTML = '';
  if (!lista.length) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--text3);padding:24px">Nenhum lançamento encontrado</td></tr>';
    return;
  }
  const nomesFormaPgto = {};
  DB.formasPagamento.forEach(f => { nomesFormaPgto[f.id] = f.nome; });
  lista.forEach(l => {
    const isInterno = l.tipo === 'interno';
    const badge = l.status === 'pendente'
      ? '<span class="tx-badge badge-pendente">revisar</span>'
      : isInterno ? '<span class="tx-badge badge-interno">interno</span>'
      : '<span class="tx-badge badge-validado">validado</span>';
    const emAberto = (l.situacao || 'pago') === 'aberto';
    const badgeSituacao = emAberto
      ? '<span class="tx-badge" style="background:#fef9c3;color:#a16207">○ Em aberto</span>'
      : '<span class="tx-badge" style="background:#dcfce7;color:#166534">✓ Pago</span>';
    const fpgto = l.formaPagamento ? '<span style="font-size:10px;color:var(--text3)"> · ' + esc(nomesFormaPgto[l.formaPagamento] || l.formaPagamento) + '</span>' : '';
    const isInvest = l.tipo === 'investimento';
    const amtClass = isInterno ? 'neu' : l.tipo === 'receita' ? 'pos' : isInvest ? 'inv' : 'neg';
    const amtPrefix = isInterno ? '' : l.tipo === 'receita' ? '+' : isInvest ? '~' : '-';
    const subcatStr = l.subcategoria ? ' › ' + esc(l.subcategoria) : '';
    const tagsStr = (l.tags||[]).map(t=>'<span class="tag-pill">'+esc(t)+'</span>').join('');
    tbody.innerHTML += '<tr' + (emAberto ? ' style="background:#fffdf0"' : '') + '>' +
      '<td style="width:30px;text-align:center"><input type="checkbox" class="lanc-check" data-id="' + l.id + '" onchange="atualizarBarraLote()" style="width:14px;height:14px;cursor:pointer"></td>' +
      '<td>' + formatarData(l.data) + '</td>' +
      '<td>' + esc(l.descricao) + fpgto + (tagsStr ? '<br><span style="margin-top:2px;display:flex;gap:4px">' + tagsStr + '</span>' : '') + '</td>' +
      '<td>' + (isInterno ? '<span class="tag-interno">Interno</span>' : esc(getNomeCat(l.categoria)) + subcatStr) + '</td>' +
      '<td><span style="text-transform:capitalize">' + l.tipo + '</span></td>' +
      '<td class="tx-amount ' + amtClass + '">' + amtPrefix + ' ' + fmt(l.valor) + '</td>' +
      '<td><div class="status-cell">' + badgeSituacao + badge + '</div></td>' +
      '<td>' +
        (emAberto ? '<button class="btn" style="font-size:11px;padding:4px 8px;color:#16a34a;border-color:#86efac" title="Marcar como pago" onclick="darBaixaLancamento(\'' + l.id + '\')"><i class="ti ti-check"></i></button> ' : '<button class="btn" style="font-size:11px;padding:4px 8px;color:#a16207;border-color:#fde047" title="Reabrir (desfazer baixa)" onclick="reabrirLancamento(\'' + l.id + '\')"><i class="ti ti-rotate-2"></i></button> ') +
        (l.status === 'pendente' ? '<button class="btn" style="font-size:11px;padding:4px 8px" onclick="abrirValidar(\'' + l.id + '\')">Validar</button> ' : '') +'<button class="btn" style="font-size:11px;padding:4px 8px" onclick="abrirEditar(\'' + l.id + '\')"><i class="ti ti-pencil"></i></button> ' +
        '<button class="btn" style="font-size:11px;padding:4px 8px;color:var(--red);border-color:var(--red)" onclick="excluirLancamento(\'' + l.id + '\')"><i class="ti ti-trash"></i></button>' +
      '</td>' +
    '</tr>';
  });
  atualizarBarraLote();

  // Totalizador do que está filtrado
  const totEl = document.getElementById('totalizador');
  if (totEl) {
    const tRec = lista.filter(l => l.tipo === 'receita').reduce((a, b) => a + b.valor, 0);
    const tDesp = lista.filter(l => l.tipo === 'despesa').reduce((a, b) => a + b.valor, 0);
    const tInv = lista.filter(l => l.tipo === 'investimento').reduce((a, b) => a + b.valor, 0);
    const saldo = tRec - tDesp;
    totEl.style.display = 'flex';
    totEl.innerHTML =
      '<span style="font-size:12px;color:var(--text3)">' + lista.length + ' lançamento(s)</span>' +
      '<span style="font-size:12px">Receitas: <b style="color:#16a34a">' + fmt(tRec) + '</b></span>' +
      '<span style="font-size:12px">Despesas: <b style="color:#dc2626">' + fmt(tDesp) + '</b></span>' +
      (tInv > 0 ? '<span style="font-size:12px">Investimentos: <b style="color:#2563eb">' + fmt(tInv) + '</b></span>' : '') +
      '<span style="font-size:12px;margin-left:auto">Saldo (rec − desp): <b style="color:' + (saldo >= 0 ? '#16a34a' : '#dc2626') + '">' + (saldo < 0 ? '- ' : '') + fmt(Math.abs(saldo)) + '</b></span>';
  }
}

// ========================
// AÇÕES EM LOTE
// ========================
function getSelecionadosLote() {
  return [...document.querySelectorAll('.lanc-check:checked')].map(cb => cb.dataset.id);
}

function selecionarTodosLanc(checked) {
  document.querySelectorAll('.lanc-check').forEach(cb => cb.checked = checked);
  atualizarBarraLote();
}

function atualizarBarraLote() {
  const barra = document.getElementById('barra-lote');
  if (!barra) return;
  const n = getSelecionadosLote().length;
  barra.style.display = n > 0 ? 'flex' : 'none';
  const contador = document.getElementById('lote-contador');
  if (contador) contador.textContent = n + ' selecionado' + (n > 1 ? 's' : '');
}

function darBaixaLote() {
  const ids = getSelecionadosLote();
  if (!ids.length) return;
  let baixados = 0;
  ids.forEach(id => { if (baixarDireto(id)) baixados++; });
  salvarDB();
  renderLancamentos();
  renderDashboard();
  toast('✓ ' + baixados + ' lançamento(s) baixado(s)' + (baixados < ids.length ? ' (' + (ids.length - baixados) + ' já estavam pagos)' : ''));
}

function excluirLote() {
  const ids = getSelecionadosLote();
  if (!ids.length) return;
  if (!confirm('Excluir ' + ids.length + ' lançamento(s)? Essa ação não pode ser desfeita.')) return;
  DB.lancamentos = DB.lancamentos.filter(l => !ids.includes(l.id));
  salvarDB();
  renderLancamentos();
  renderDashboard();
  toast(ids.length + ' lançamento(s) excluído(s)');
}

function abrirAlterarLote() {
  const ids = getSelecionadosLote();
  if (!ids.length) return;
  document.getElementById('lote-alterar-info').textContent = 'Alterando ' + ids.length + ' lançamento(s). Só os campos preenchidos serão aplicados.';
  // Preenche select de categorias com todas
  const sel = document.getElementById('lote-categoria');
  sel.innerHTML = '<option value="">— não alterar —</option>' + DB.categorias.map(c => '<option value="' + c.id + '">' + c.nome + '</option>').join('');
  document.getElementById('lote-subcategoria').innerHTML = '<option value="">— não alterar —</option>';
  document.getElementById('lote-forma-pagamento').value = '';
  document.getElementById('modal-lote').style.display = 'flex';
}

function atualizarSubcatLote() {
  const catId = document.getElementById('lote-categoria').value;
  const sel = document.getElementById('lote-subcategoria');
  if (!catId) { sel.innerHTML = '<option value="">— não alterar —</option>'; return; }
  const subcats = getSubcats(catId);
  sel.innerHTML = '<option value="">— sem subcategoria —</option>' + subcats.map(s => '<option value="' + s + '">' + s + '</option>').join('');
}

function salvarAlterarLote() {
  const ids = getSelecionadosLote();
  const cat = document.getElementById('lote-categoria').value;
  const subcat = document.getElementById('lote-subcategoria').value;
  const fpgto = document.getElementById('lote-forma-pagamento').value;
  if (!cat && !fpgto) { toast('Preencha ao menos um campo para alterar'); return; }
  let alterados = 0;
  DB.lancamentos.forEach(l => {
    if (!ids.includes(l.id)) return;
    if (cat) { l.categoria = cat; l.subcategoria = subcat || ''; }
    if (fpgto) l.formaPagamento = fpgto;
    alterados++;
  });
  salvarDB();
  fecharModal('modal-lote');
  renderLancamentos();
  renderDashboard();
  toast('✓ ' + alterados + ' lançamento(s) alterado(s)');
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
  document.getElementById('editar-forma-pagamento').value = l.formaPagamento || '';
  document.getElementById('editar-situacao').value = l.situacao || 'pago';
  // Escopo de grupo (repetição/parcelamento)
  const escopoDiv = document.getElementById('editar-escopo-grupo');
  if (escopoDiv) {
    escopoDiv.style.display = l.grupoId ? 'block' : 'none';
    const escopoSel = document.getElementById('editar-escopo');
    if (escopoSel) escopoSel.value = 'este';
  }
  document.getElementById('modal-editar').style.display = 'flex';
}

// Extrai a descrição base sem o sufixo de parcela "(2/10)"
function descricaoBase(desc) {
  return desc.replace(/\s*\(\d+\/\d+\)\s*$/, '');
}

// Extrai o sufixo de parcela, se existir
function sufixoParcela(desc) {
  const m = desc.match(/\s*(\(\d+\/\d+\))\s*$/);
  return m ? ' ' + m[1] : '';
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
  l.formaPagamento = document.getElementById('editar-forma-pagamento').value;
  l.situacao = document.getElementById('editar-situacao').value;
  l.status = 'validado';

  // Propagação para o grupo (repetição/parcelamento)
  let propagados = 0;
  const escopo = l.grupoId ? (document.getElementById('editar-escopo')?.value || 'este') : 'este';
  if (l.grupoId && escopo !== 'este') {
    const base = descricaoBase(l.descricao);
    const irmaos = DB.lancamentos.filter(x =>
      x.grupoId === l.grupoId && x.id !== l.id &&
      (escopo === 'todos' || x.data >= l.data)
    );
    const diaNovo = parseInt(l.data.slice(8, 10));
    irmaos.forEach(x => {
      // Propaga: descrição base (preservando sufixo de parcela), valor, categoria, subcat, tipo, forma pgto, tags
      x.descricao = base + sufixoParcela(x.descricao);
      x.valor = l.valor;
      x.categoria = l.categoria;
      x.subcategoria = l.subcategoria;
      x.tipo = l.tipo;
      x.formaPagamento = l.formaPagamento;
      x.tags = [...l.tags];
      // DIA do vencimento propaga (mantendo o mês/ano de cada parcela); situação nunca propaga
      const [xy, xm] = x.data.split('-').map(Number);
      const ultimoDia = new Date(xy, xm, 0).getDate();
      x.data = x.data.slice(0, 8) + String(Math.min(diaNovo, ultimoDia)).padStart(2, '0');
      propagados++;
    });
  }

  if (l.categoria !== catAntiga) verificarESalvarRegra(l.descricao, l);
  salvarDB(); fecharModal('modal-editar'); renderLancamentos(); renderDashboard();
  toast('Lançamento atualizado!' + (propagados ? ' Alteração aplicada a mais ' + propagados + ' do grupo.' : ''));
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
function switchTabConfig(tab, el) {
  document.querySelectorAll('#page-configuracoes .cfg-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('#page-configuracoes .cfg-tab-content').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('config-tab-' + tab).classList.add('active');
  if (tab === 'planocontas') renderPlanoContas();
  if (tab === 'formaspagamento') renderFormasPagamento();
  if (tab === 'tags') renderTags();
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
  if (['ipva','seguro','licenciamento'].some(p => desc.includes(p))) return 'transp_variavel';
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
    toast('⚠️ Classificação por IA falhou — classifique manualmente ou tente reimportar');
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
    el.innerHTML = '<span style="font-size:12px;color:var(--text3)">Nenhuma tag ainda — crie em Plano de Contas → aba Tags</span>';
    return;
  }
  el.innerHTML = DB.tags.map(tag =>
    '<label style="display:inline-flex;align-items:center;gap:5px;cursor:pointer;padding:4px 10px;border-radius:99px;border:1px solid '+(selecionadas.includes(tag.nome)?tag.cor:'var(--border-light)')+';background:'+(selecionadas.includes(tag.nome)?tag.cor+'22':'var(--card)')+';transition:all 0.12s">' +
      '<input type="checkbox" value="'+tag.nome+'" '+(selecionadas.includes(tag.nome)?'checked':'')+' style="display:none" onchange="sincronizarTagsSeletor(\''+containerId+'\')">' +
      '<span style="width:8px;height:8px;border-radius:50%;background:'+tag.cor+'"></span>' +
      '<span style="font-size:12px;font-weight:'+(selecionadas.includes(tag.nome)?'600':'400')+';color:'+(selecionadas.includes(tag.nome)?tag.cor:'var(--text2)')+'">'+tag.nome+'</span>' +
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
    const catOpts = '<option value="">— categoria —</option>' + catsFiltradas.map(function(c) { return '<option value="' + c.id + '"' + (c.id === l.categoria ? ' selected' : '') + '>' + esc(c.nome) + '</option>'; }).join('');
    const subcats = getSubcats(l.categoria);
    const subcatOpts = '<option value="">—</option>' + subcats.map(function(s) { return '<option value="' + s + '"' + (s === l.subcategoria ? ' selected' : '') + '>' + s + '</option>'; }).join('');

    // Tags como pills clicáveis (mesmo padrão do seletor de tags)
    const tagsHtml = DB.tags.length
      ? DB.tags.map(function(tag) {
          const sel = (l.tags || []).includes(tag.nome);
          return '<label style="display:inline-flex;align-items:center;gap:3px;margin:1px 2px;cursor:pointer;padding:2px 7px;border-radius:99px;border:0.5px solid ' + (sel ? tag.cor : 'var(--border-light)') + ';background:' + (sel ? tag.cor + '22' : 'transparent') + ';font-size:11px;white-space:nowrap">' +
            '<input type="checkbox" value="' + tag.nome + '" ' + (sel ? 'checked' : '') + ' style="display:none" onchange="atualizarTagsPreview(' + i + ')">' +
            '<span style="width:6px;height:6px;border-radius:50%;background:' + tag.cor + '"></span>' +
            '<span style="color:' + (sel ? tag.cor : 'var(--text2)') + '">' + esc(tag.nome) + '</span>' +
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
        '<input type="text" value="' + esc(l.descricao) + '" style="flex:1;min-width:130px;padding:3px 6px;border:0.5px solid var(--border-light);border-radius:6px;font-size:12px" onchange="previewLancs[' + i + '].descricao=this.value">' +
        regraTag +
        (l._matchSugerido ? '<span style="font-size:10px;padding:1px 6px;border-radius:99px;background:#cffafe;color:#0e7490;cursor:help;white-space:nowrap" title="Corresponde a: ' + esc(l._matchSugerido.descricao) + ' (' + (l._matchSugerido.tipoMatch === 'exato' ? 'data e valor exatos' : 'aproximado, ' + l._matchSugerido.difDias + ' dias') + ')">🔗 ' + (l._matchSugerido.tipo === 'previsto' ? 'previsto' : 'já lançado') + '</span>' : '') +
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
        '<td style="font-size:12px">' + esc(l.descricao) + '</td>' +
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

  const loteImp = 'imp_' + Date.now().toString(36);
  const loteData = new Date().toLocaleString('pt-BR');
  aImportar.forEach(l => { if (!l.situacao) l.situacao = 'pago'; l.loteImportacao = loteImp; l.loteData = loteData; });
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
  const dataLanc = document.getElementById('manual-data').value;
  const tipoLanc = document.getElementById('manual-tipo').value;
  const valorTotal = parseFloat(document.getElementById('manual-valor').value);
  const descricao = document.getElementById('manual-descricao').value;
  const subcategoria = document.getElementById('manual-subcategoria').value;
  const tags = getTagsSelecionadas('manual-tags-seletor');
  const situacao = document.getElementById('manual-situacao').value;
  const formaPagamento = document.getElementById('manual-forma-pagamento').value;

  const repetir = document.getElementById('manual-repetir').checked;
  const parcelar = document.getElementById('manual-parcelar').checked;
  const nRepet = parseInt(document.getElementById('manual-repetir-qtd').value) || 2;
  const nParc = parseInt(document.getElementById('manual-parcelar-qtd').value) || 2;

  // Gera data de cada ocorrência: mesmo dia, meses seguintes (respeitando meses curtos)
  function dataMais(mesesAdiante) {
    const [y, m, d] = dataLanc.split('-').map(Number);
    const alvo = new Date(y, m - 1 + mesesAdiante, 1);
    const ultimoDia = new Date(alvo.getFullYear(), alvo.getMonth() + 1, 0).getDate();
    const dia = Math.min(d, ultimoDia);
    return alvo.getFullYear() + '-' + String(alvo.getMonth() + 1).padStart(2, '0') + '-' + String(dia).padStart(2, '0');
  }

  const grupoId = (repetir || parcelar) ? gerarId() : null;
  const novos = [];

  if (parcelar && nParc > 1) {
    // Parcelamento: valor total dividido em N (ajuste de centavos na última)
    const valorParcela = Math.floor((valorTotal / nParc) * 100) / 100;
    const ultimaParcela = Math.round((valorTotal - valorParcela * (nParc - 1)) * 100) / 100;
    for (let i = 0; i < nParc; i++) {
      novos.push({
        id: gerarId(), data: dataMais(i),
        descricao: descricao + ' (' + (i + 1) + '/' + nParc + ')',
        valor: i === nParc - 1 ? ultimaParcela : valorParcela,
        tipo: tipoLanc, categoria: catId, subcategoria, tags: [...tags],
        status: 'validado',
        situacao: i === 0 ? situacao : 'aberto',
        formaPagamento, grupoId
      });
    }
  } else if (repetir && nRepet > 1) {
    // Repetição: mesmo valor N vezes
    for (let i = 0; i < nRepet; i++) {
      novos.push({
        id: gerarId(), data: dataMais(i),
        descricao: descricao,
        valor: valorTotal,
        tipo: tipoLanc, categoria: catId, subcategoria, tags: [...tags],
        status: 'validado',
        situacao: i === 0 ? situacao : 'aberto',
        formaPagamento, grupoId
      });
    }
  } else {
    novos.push({
      id: gerarId(), data: dataLanc, descricao, valor: valorTotal,
      tipo: tipoLanc, categoria: catId, subcategoria, tags,
      status: 'validado', situacao, formaPagamento
    });
  }

  DB.lancamentos.push(...novos);
  salvarDB();
  renderSeletorTags('manual-tags-seletor', []);
  e.target.reset();
  document.getElementById('manual-repetir-opcoes').style.display = 'none';
  document.getElementById('manual-parcelar-opcoes').style.display = 'none';
  fecharModal('modal-lancamento');
  atualizarBannerValidacao(); renderDashboard();
  try { renderLancamentos(); } catch(err) {}
  toast(novos.length > 1 ? novos.length + ' lançamentos criados ✓' : 'Lançamento salvo! ✓');
}

function toggleRepetir() {
  const rep = document.getElementById('manual-repetir');
  const par = document.getElementById('manual-parcelar');
  if (rep.checked) { par.checked = false; document.getElementById('manual-parcelar-opcoes').style.display = 'none'; }
  document.getElementById('manual-repetir-opcoes').style.display = rep.checked ? 'flex' : 'none';
}

function toggleParcelar() {
  const rep = document.getElementById('manual-repetir');
  const par = document.getElementById('manual-parcelar');
  if (par.checked) { rep.checked = false; document.getElementById('manual-repetir-opcoes').style.display = 'none'; }
  document.getElementById('manual-parcelar-opcoes').style.display = par.checked ? 'flex' : 'none';
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
  const investimentos = lancs.filter(l => l.tipo === 'investimento');
  const totalRec = receitas.reduce((a,b) => a+b.valor, 0);
  const totalDesp = despesas.reduce((a,b) => a+b.valor, 0);
  const totalInv = investimentos.reduce((a,b) => a+b.valor, 0);
  const resultado = totalRec - totalDesp;
  const sobraLiquida = resultado - totalInv;
  const porCat = {};
  despesas.forEach(l => { porCat[l.categoria] = (porCat[l.categoria]||0) + l.valor; });
  const table = document.getElementById('dre-table');
  if (!table) return;

  // Rótulo do regime — DRE é competência (inclui em aberto); Dashboard é caixa. Diferença intencional, deixar explícita.
  const subEl = document.getElementById('dre-regime-sub');
  if (subEl) subEl.textContent = 'Regime de competência — inclui contas pagas e em aberto do mês';

  table.innerHTML =
    '<tr class="dre-section"><td colspan="2">Receitas</td></tr>' +
    (receitas.length ? receitas.map(l => '<tr><td style="padding-left:24px">'+esc(l.descricao)+((l.situacao||'pago')==='aberto'?' <span style="font-size:10px;color:#a16207">(em aberto)</span>':'')+'</td><td class="dre-right tx-amount pos">'+fmt(l.valor)+'</td></tr>').join('') : '<tr><td style="padding-left:24px;color:var(--text3)">Nenhuma receita</td><td></td></tr>') +
    '<tr><td style="padding-left:24px;font-weight:500">Total receitas</td><td class="dre-right tx-amount pos">'+fmt(totalRec)+'</td></tr>' +
    '<tr class="dre-section"><td colspan="2">Despesas por categoria</td></tr>' +
    Object.entries(porCat).sort((a,b)=>b[1]-a[1]).map(([cat,val]) => '<tr><td style="padding-left:24px">'+esc(getNomeCat(cat))+'</td><td class="dre-right tx-amount neg">- '+fmt(val)+'</td></tr>').join('') +
    (!Object.keys(porCat).length ? '<tr><td style="padding-left:24px;color:var(--text3)">Nenhuma despesa</td><td></td></tr>' : '') +
    '<tr><td style="padding-left:24px;font-weight:500">Total despesas</td><td class="dre-right tx-amount neg">- '+fmt(totalDesp)+'</td></tr>' +
    '<tr class="dre-total"><td>Resultado do mês (receitas − despesas)</td><td class="dre-right tx-amount '+(resultado>=0?'pos':'neg')+'">'+(resultado>=0?'':'- ')+fmt(Math.abs(resultado))+'</td></tr>' +
    '<tr class="dre-section"><td colspan="2">Destinação do resultado</td></tr>' +
    '<tr><td style="padding-left:24px">(−) Aportes em investimento</td><td class="dre-right tx-amount inv">'+(totalInv>0?'- '+fmt(totalInv):fmt(0))+'</td></tr>' +
    '<tr class="dre-total"><td>(=) Sobra líquida em conta</td><td class="dre-right tx-amount '+(sobraLiquida>=0?'pos':'neg')+'">'+(sobraLiquida>=0?'':'- ')+fmt(Math.abs(sobraLiquida))+'</td></tr>';
}

// ========================
// PLANO DE CONTAS
// ========================
// Aba de natureza ativa no plano de contas (estilo Conta Azul)
let planoNaturezaAtiva = 'despesa';

function switchNaturezaPlano(nat, el) {
  planoNaturezaAtiva = nat;
  document.querySelectorAll('#plano-natureza-tabs .tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  renderPlanoContas();
}

// Comparador de códigos hierárquicos (1.2 < 1.10 < 2.1)
// [RESERVADA] Base da futura ordenação hierárquica por código do plano de contas (feature na fila — 'visual em escadinha')
function compararCodigos(a, b) {
  const pa = (a.codigo || '9999').split('.').map(Number);
  const pb = (b.codigo || '9999').split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const va = pa[i] || 0, vb = pb[i] || 0;
    if (va !== vb) return va - vb;
  }
  return 0;
}

function renderPlanoContas() {
  const lista = document.getElementById('lista-plano-contas');
  if (!lista) return;
  lista.innerHTML = '';
  const getNat = c => c.natureza || (c.id === 'outros' ? 'todas' : 'despesa');
  // Filtra pela natureza da aba ativa + ordena por código
  const catsFiltradas = DB.categorias
    .filter(c => { const n = getNat(c); return n === planoNaturezaAtiva || n === 'todas'; })
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  if (!catsFiltradas.length) {
    lista.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:20px;text-align:center">Nenhuma categoria nesta natureza.</div>';
    return;
  }
  catsFiltradas.forEach((cat) => {
    const orc = DB.orcamentos[cat.id] || 0;
    const idx = DB.categorias.indexOf(cat);
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
                '<span style="color:var(--text3);font-size:11px;min-width:52px;font-family:monospace">'+(cat.codigo ? cat.codigo + '.' + String(si+1).padStart(2,'0') : '›')+'</span>' +
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
  const natureza = document.getElementById('edit-cat-natureza').value || 'despesa';
  if (!nome) { toast('Informe o nome'); return; }
  const id = nome.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,'') + '_' + Date.now().toString(36);
  DB.categorias.push({ id, nome, cor, codigo, natureza, subcats: [] });
  salvarDB(); fecharModal('modal-edit-cat'); preencherSelects();
  // Muda para a aba da natureza criada, para a categoria aparecer na hora
  planoNaturezaAtiva = natureza;
  document.querySelectorAll('#plano-natureza-tabs .tab').forEach(t => t.classList.remove('active'));
  const abas = { receita: 0, despesa: 1, investimento: 2 };
  const abaAlvo = document.querySelectorAll('#plano-natureza-tabs .tab')[abas[natureza]];
  if (abaAlvo) abaAlvo.classList.add('active');
  renderPlanoContas();
  toast('Categoria "' + nome + '" criada em ' + (natureza === 'receita' ? 'Receitas' : natureza === 'investimento' ? 'Investimentos' : 'Despesas') + '!');
}

function excluirCategoria(id) {
  const emUso = DB.lancamentos.filter(l => l.categoria === id).length;
  const regrasUso = DB.regras.filter(r => r.categoria === id).length;
  let msg = 'Excluir categoria?';
  if (emUso) msg += '\n\n' + emUso + ' lançamento(s) serão movidos para "Outros".';
  if (regrasUso) msg += '\n' + regrasUso + ' regra(s) de classificação que apontam para ela serão excluídas.';
  if (!confirm(msg)) return;

  // Reatribui lançamentos para "outros" (nunca deixar órfão apontando pra categoria inexistente)
  DB.lancamentos.forEach(l => {
    if (l.categoria === id) { l.categoria = 'outros'; l.subcategoria = ''; }
  });
  // Remove regras que classificariam para uma categoria que não existe mais
  DB.regras = DB.regras.filter(r => r.categoria !== id);
  // Remove orçamento da categoria
  delete DB.orcamentos[id];

  DB.categorias = DB.categorias.filter(c => c.id !== id);
  salvarDB(); preencherSelects(); renderPlanoContas();
  toast('Categoria excluída' + (emUso ? ' — ' + emUso + ' lançamento(s) movidos para "Outros"' : ''));
}

// ========================
// FORMAS DE PAGAMENTO
// ========================
function getFormaPagamento(id) {
  return DB.formasPagamento.find(f => f.id === id);
}

function getNomeFormaPagamento(id) {
  const f = getFormaPagamento(id);
  return f ? f.nome : (id || '—');
}

function renderFormasPagamento() {
  const lista = document.getElementById('lista-formas-pagamento');
  if (!lista) return;
  lista.innerHTML = '';
  if (!DB.formasPagamento.length) {
    lista.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:20px;text-align:center">Nenhuma forma de pagamento cadastrada.</div>';
    return;
  }
  DB.formasPagamento.forEach(f => {
    const emUso = DB.lancamentos.some(l => l.formaPagamento === f.id);
    const cicloInfo = f.tipoCiclo === 'fatura'
      ? '<span style="font-size:11px;color:var(--text3)">Fecha dia ' + f.fechamento + ' · Vence dia ' + f.vencimento + '</span>'
      : '<span style="font-size:11px;color:var(--text3)">Sem ciclo de fatura</span>';
    lista.innerHTML +=
      '<div class="plano-cat-item" id="forma-' + f.id + '">' +
        '<div class="plano-cat-header">' +
          '<div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0">' +
            '<input type="text" value="' + f.nome.replace(/"/g, '&quot;') + '" ' +
              'style="flex:1;min-width:0;font-size:14px;font-weight:500;border:none;background:transparent;color:var(--text);font-family:inherit;padding:2px 4px;cursor:text;border-radius:4px" ' +
              'title="Editar nome" onblur="salvarNomeFormaPagamento(\'' + f.id + '\',this.value)" ' +
              'onkeydown="if(event.key===\'Enter\')this.blur()">' +
            cicloInfo +
          '</div>' +
          '<div style="display:flex;align-items:center;gap:6px;flex-shrink:0">' +
            '<button class="btn" style="font-size:11px;padding:3px 8px" onclick="abrirModalFormaPagamento(\'' + f.id + '\')" title="Editar ciclo"><i class="ti ti-edit"></i> Ciclo</button>' +
            '<button class="btn" style="font-size:11px;padding:3px 8px;color:var(--red)" onclick="excluirFormaPagamento(\'' + f.id + '\')" title="' + (emUso ? 'Em uso — lançamentos ficarão sem forma de pagamento' : 'Excluir') + '"><i class="ti ti-trash"></i></button>' +
          '</div>' +
        '</div>' +
      '</div>';
  });
}

function salvarNomeFormaPagamento(id, nome) {
  nome = nome.trim();
  if (!nome) { renderFormasPagamento(); return; }
  const f = getFormaPagamento(id);
  if (!f || f.nome === nome) return;
  f.nome = nome;
  salvarDB(); preencherSelects(); renderFormasPagamento();
  toast('Nome salvo!');
}

function abrirModalFormaPagamento(id) {
  const isNova = !id;
  const f = isNova ? null : getFormaPagamento(id);
  document.getElementById('forma-pgto-id').value = id || '';
  document.getElementById('forma-pgto-nome').value = f ? f.nome : '';
  document.getElementById('forma-pgto-tipo').value = f ? f.tipoCiclo : 'simples';
  document.getElementById('forma-pgto-fechamento').value = f && f.fechamento ? f.fechamento : 1;
  document.getElementById('forma-pgto-vencimento').value = f && f.vencimento ? f.vencimento : 10;
  toggleCamposFaturaForma();
  document.getElementById('modal-forma-pgto-titulo').textContent = isNova ? 'Nova forma de pagamento' : 'Editar ciclo de fatura';
  document.getElementById('modal-forma-pgto').style.display = 'flex';
}

function toggleCamposFaturaForma() {
  const tipo = document.getElementById('forma-pgto-tipo').value;
  const wrap = document.getElementById('forma-pgto-campos-fatura');
  if (wrap) wrap.style.display = tipo === 'fatura' ? 'flex' : 'none';
}

function salvarFormaPagamento() {
  const id = document.getElementById('forma-pgto-id').value;
  const nome = document.getElementById('forma-pgto-nome').value.trim();
  const tipoCiclo = document.getElementById('forma-pgto-tipo').value;
  const fechamento = parseInt(document.getElementById('forma-pgto-fechamento').value) || 1;
  const vencimento = parseInt(document.getElementById('forma-pgto-vencimento').value) || 10;
  if (!nome) { toast('Informe o nome'); return; }

  if (id) {
    const f = getFormaPagamento(id);
    if (!f) return;
    f.nome = nome; f.tipoCiclo = tipoCiclo;
    if (tipoCiclo === 'fatura') { f.fechamento = Math.min(Math.max(fechamento, 1), 28); f.vencimento = Math.min(Math.max(vencimento, 1), 28); }
    else { delete f.fechamento; delete f.vencimento; }
  } else {
    const novoId = nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') + '_' + Date.now().toString(36);
    const nova = { id: novoId, nome, tipoCiclo };
    if (tipoCiclo === 'fatura') { nova.fechamento = Math.min(Math.max(fechamento, 1), 28); nova.vencimento = Math.min(Math.max(vencimento, 1), 28); }
    DB.formasPagamento.push(nova);
  }
  salvarDB(); fecharModal('modal-forma-pgto'); preencherSelects(); renderFormasPagamento();
  toast('Forma de pagamento salva!');
}

function excluirFormaPagamento(id) {
  const emUso = DB.lancamentos.filter(l => l.formaPagamento === id).length;
  const msg = emUso
    ? 'Excluir forma de pagamento? ' + emUso + ' lançamento(s) ficarão sem forma de pagamento.'
    : 'Excluir forma de pagamento?';
  if (!confirm(msg)) return;
  DB.lancamentos.forEach(l => { if (l.formaPagamento === id) l.formaPagamento = ''; });
  DB.formasPagamento = DB.formasPagamento.filter(f => f.id !== id);
  salvarDB(); preencherSelects(); renderFormasPagamento();
  toast('Forma de pagamento excluída');
}

// ---- Ciclo de fatura (fechamento/vencimento) ----


// Tag ativa no filtro do dashboard (filtro global — todos os widgets respondem)
function getDashTag() {
  return (document.getElementById('dash-filtro-tag-select')?.value || '').trim().toLowerCase();
}
function filtraPorDashTag(arr, tagOverride) {
  const tag = tagOverride !== undefined ? tagOverride : getDashTag();
  return tag ? arr.filter(l => (l.tags || []).some(t => t.toLowerCase() === tag)) : arr;
}

// Ciclo "dono" de um mês-calendário específico (ex: "a fatura de Junho" = a que fecha em junho).
// Usado pra fatura navegar junto com o mês selecionado no dashboard, em vez de sempre mostrar o ciclo real de hoje.
function getCicloFaturaDoMes(mesStr, diaFechamento, diaVencimento) {
  const [ano, mes] = mesStr.split('-').map(Number); // mes: 1-indexado
  const dataFechamento = new Date(ano, mes - 1, diaFechamento);
  let mesInicio = mes - 2, anoInicio = ano;
  if (mesInicio < 0) { mesInicio = 11; anoInicio--; }
  const dataInicio = new Date(anoInicio, mesInicio, diaFechamento + 1);
  let anoVenc = ano, mesVenc = mes - 1;
  if (diaVencimento <= diaFechamento) { mesVenc += 1; if (mesVenc > 11) { mesVenc = 0; anoVenc++; } }
  const dataVencimento = new Date(anoVenc, mesVenc, diaVencimento);
  return { inicio: dataInicio, fechamento: dataFechamento, vencimento: dataVencimento };
}

function dataParaISO(d) { return dataLocalISO(d); }

function renderFaturaCartao() {
  const card = document.getElementById('card-fatura-cartao');
  const lista = document.getElementById('lista-faturas-cartao');
  if (!card || !lista) return;
  const formas = DB.formasPagamento.filter(f => f.tipoCiclo === 'fatura');
  if (!formas.length) { card.style.display = 'none'; return; }
  card.style.display = 'block';

  const hoje = new Date();
  const mesRealAtual = mesLocalISO(hoje);

  lista.innerHTML = formas.map(forma => {
    const ciclo = getCicloFaturaDoMes(mesAtual, forma.fechamento, forma.vencimento);
    const iniISO = dataParaISO(ciclo.inicio), fechISO = dataParaISO(ciclo.fechamento);
    const itens = filtraPorDashTag(DB.lancamentos.filter(l => l.formaPagamento === forma.id && l.tipo === 'despesa' && l.data >= iniISO && l.data <= fechISO));
    const total = itens.reduce((a, b) => a + b.valor, 0);

    let statusFecha, statusVence;
    if (mesAtual === mesRealAtual) {
      const diasParaFechar = Math.ceil((ciclo.fechamento - hoje) / 86400000);
      const diasParaVencer = Math.ceil((ciclo.vencimento - hoje) / 86400000);
      statusFecha = diasParaFechar <= 0 ? 'fecha hoje' : 'fecha em ' + diasParaFechar + ' dia(s)';
      statusVence = 'vence dia ' + pad2(forma.vencimento) + ' (' + (diasParaVencer <= 0 ? 'hoje' : 'em ' + diasParaVencer + ' dia(s)') + ')';
    } else if (mesAtual < mesRealAtual) {
      statusFecha = 'fatura fechada em ' + formatarData(fechISO);
      statusVence = 'venceu dia ' + pad2(forma.vencimento);
    } else {
      statusFecha = 'ciclo futuro — fecha em ' + formatarData(fechISO);
      statusVence = 'vence dia ' + pad2(forma.vencimento);
    }

    return '<div style="cursor:pointer" onclick="abrirDetalheFatura(\'' + forma.id + '\')">' +
      '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap">' +
        '<span style="font-size:13px;font-weight:500">' + esc(forma.nome) + '</span>' +
        '<span style="font-size:11px;color:var(--text3)">' + formatarData(iniISO) + ' – ' + formatarData(fechISO) + '</span>' +
      '</div>' +
      '<div style="font-size:24px;font-weight:600;margin:4px 0 4px">' + fmt(total) + '</div>' +
      '<div style="display:flex;gap:12px;font-size:12px;color:var(--text2);flex-wrap:wrap">' +
        '<span>' + statusFecha + '</span><span>' + statusVence + '</span>' +
      '</div>' +
    '</div>';
  }).join('<div style="border-top:0.5px solid var(--border-light)"></div>');
}

function abrirDetalheFatura(formaId) {
  const forma = formaId ? getFormaPagamento(formaId) : DB.formasPagamento.find(f => f.tipoCiclo === 'fatura');
  if (!forma || forma.tipoCiclo !== 'fatura') return;
  const ciclo = getCicloFaturaDoMes(mesAtual, forma.fechamento, forma.vencimento);
  const iniISO = dataParaISO(ciclo.inicio), fechISO = dataParaISO(ciclo.fechamento);
  const itens = filtraPorDashTag(DB.lancamentos
    .filter(l => l.formaPagamento === forma.id && l.tipo === 'despesa' && l.data >= iniISO && l.data <= fechISO))
    .sort((a, b) => b.data.localeCompare(a.data));
  const total = itens.reduce((a, b) => a + b.valor, 0);

  document.getElementById('detalhe-mes-titulo').textContent = 'Fatura ' + forma.nome + ' · ' + formatarData(iniISO) + '–' + formatarData(fechISO);
  document.getElementById('detalhe-mes-total').textContent = fmt(total);
  const corpo = document.getElementById('detalhe-mes-corpo');
  if (!itens.length) {
    corpo.innerHTML = '<div style="text-align:center;color:var(--text3);padding:20px">Nenhum lançamento nesta fatura ainda</div>';
  } else {
    corpo.innerHTML = itens.map(l =>
      '<div style="display:flex;align-items:center;gap:10px;padding:5px 0;border-bottom:0.5px solid var(--border-light2)">' +
        '<span style="font-size:11px;color:var(--text3);min-width:50px">' + formatarData(l.data) + '</span>' +
        '<span style="flex:1;font-size:12px">' + esc(l.descricao) + '</span>' +
        '<span style="font-size:12px;font-weight:500">' + fmt(l.valor) + '</span>' +
      '</div>'

    ).join('');
  }
  document.getElementById('modal-detalhe-mes').style.display = 'flex';
}

// ---- Gastos por forma de pagamento (cards do dashboard) ----
function renderGastosPorFormaPagamento(lancsFiltrados) {
  const wrap = document.getElementById('cards-formas-pagamento');
  if (!wrap) return;
  const porForma = {};
  lancsFiltrados.filter(l => l.tipo === 'despesa' && l.formaPagamento).forEach(l => {
    porForma[l.formaPagamento] = (porForma[l.formaPagamento] || 0) + l.valor;
  });
  const entradas = Object.entries(porForma).sort((a, b) => b[1] - a[1]);
  if (!entradas.length) {
    wrap.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:12px 0">Nenhum gasto com forma de pagamento definida neste mês.</div>';
    return;
  }
  wrap.innerHTML = entradas.map(([formaId, val]) => {
    const nome = esc(getNomeFormaPagamento(formaId));
    return '<div class="fp-card" onclick="abrirDetalheFormaPagamento(\'' + formaId + '\')" style="cursor:pointer;padding:12px;border:0.5px solid var(--border-light);border-radius:10px;background:var(--card)">' +
      '<div style="font-size:11px;color:var(--text3);margin-bottom:4px">' + nome + '</div>' +
      '<div style="font-size:16px;font-weight:600">' + fmt(val) + '</div>' +
    '</div>';
  }).join('');
}

function abrirDetalheFormaPagamento(formaId) {
  const lancsMes = filtraPorDashTag(getMes(mesAtual));
  const itens = lancsMes.filter(l => l.tipo === 'despesa' && l.formaPagamento === formaId).sort((a, b) => b.data.localeCompare(a.data));
  const total = itens.reduce((a, b) => a + b.valor, 0);
  document.getElementById('detalhe-mes-titulo').textContent = getNomeFormaPagamento(formaId) + ' · ' + mesAtual;
  document.getElementById('detalhe-mes-total').textContent = fmt(total);
  const corpo = document.getElementById('detalhe-mes-corpo');
  if (!itens.length) {
    corpo.innerHTML = '<div style="text-align:center;color:var(--text3);padding:20px">Nenhum lançamento com essa forma de pagamento neste mês</div>';
  } else {
    corpo.innerHTML = itens.map(l =>
      '<div style="display:flex;align-items:center;gap:10px;padding:5px 0;border-bottom:0.5px solid var(--border-light2)">' +
        '<span style="font-size:11px;color:var(--text3);min-width:50px">' + formatarData(l.data) + '</span>' +
        '<span style="flex:1;font-size:12px">' + esc(l.descricao) + '</span>' +
        '<span style="font-size:12px;font-weight:500">' + fmt(l.valor) + '</span>' +
      '</div>'
    ).join('');
  }
  document.getElementById('modal-detalhe-mes').style.display = 'flex';
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

  if (typeof Chart === 'undefined') { console.error('Chart.js não carregou (CDN indisponível) — gráfico de patrimônio ignorado'); return; }
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
  const alertasOrc = Object.entries(porCat).filter(([cat,val]) => DB.orcamentos[cat] && val > DB.orcamentos[cat]).map(([cat,val]) => '⚠️ ' + esc(getNomeCat(cat)) + ': estourou em ' + fmt(val - DB.orcamentos[cat]));
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
// SITUAÇÃO / DAR BAIXA (modelo unificado)
// ========================
function darBaixaLancamento(id) {
  const l = DB.lancamentos.find(x => x.id === id);
  if (!l) return;
  if ((l.situacao || 'pago') === 'pago') { toast('Este lançamento já está pago'); return; }
  // Abre modal de confirmação com dados cadastrados para validar
  document.getElementById('baixa-id').value = l.id;
  document.getElementById('baixa-descricao').textContent = l.descricao;
  document.getElementById('baixa-info').textContent = getNomeCat(l.categoria) + (l.subcategoria ? ' › ' + l.subcategoria : '') + ' · vencimento ' + formatarData(l.data);
  // Data sugerida: hoje (data real do pagamento)
  document.getElementById('baixa-data').value = dataLocalISO();
  document.getElementById('baixa-valor').value = l.valor;
  document.getElementById('baixa-forma-pagamento').value = l.formaPagamento || '';
  document.getElementById('modal-baixa').style.display = 'flex';
}

function confirmarBaixa() {
  const id = document.getElementById('baixa-id').value;
  const l = DB.lancamentos.find(x => x.id === id);
  if (!l) return;
  const novaData = document.getElementById('baixa-data').value;
  const novoValor = parseFloat(document.getElementById('baixa-valor').value);
  if (!novaData) { toast('Informe a data do pagamento'); return; }
  if (isNaN(novoValor) || novoValor <= 0) { toast('Informe um valor válido'); return; }
  l.data = novaData;
  l.valor = novoValor;
  l.formaPagamento = document.getElementById('baixa-forma-pagamento').value;
  l.situacao = 'pago';
  salvarDB();
  fecharModal('modal-baixa');
  try { renderLancamentos(); } catch(e) {}
  renderDashboard();
  toast('✓ Baixa realizada — "' + esc(l.descricao) + '"');
}

// Baixa direta sem confirmação (usada no lote)
function baixarDireto(id) {
  const l = DB.lancamentos.find(x => x.id === id);
  if (!l || (l.situacao || 'pago') === 'pago') return false;
  l.situacao = 'pago';
  return true;
}

function reabrirLancamento(id) {
  const l = DB.lancamentos.find(x => x.id === id);
  if (!l) return;
  l.situacao = 'aberto';
  salvarDB();
  try { renderLancamentos(); } catch(e) {}
  renderDashboard();
  toast('Lançamento reaberto');
}


// ========================
// CONCILIAÇÃO BANCÁRIA
// ========================
// Busca correspondência entre um lançamento do extrato e os lançamentos/previstos do sistema
function buscarConciliacao(lancExtrato) {
  const valorExtrato = Math.abs(lancExtrato.valor);
  const dataExtrato = new Date(lancExtrato.data);

  // Candidatos: apenas lançamentos manuais já registrados (evita duplicata na importação).
  // Previstos NÃO entram mais no matching automático — a baixa deles é manual (botão "Dar baixa")
  // ou oferecida no momento do lançamento manual.
  const candidatos = [];

  DB.lancamentos.forEach(l => {
    if (l.conciliado) return;
    if (l.origem) return; // ignora os que vieram de importação anterior
    if (l.tipo !== lancExtrato.tipo) return;
    candidatos.push({ tipo: 'lancamento', ref: l, descricao: l.descricao, valor: Math.abs(l.valor), data: l.data });
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
    // Marca o lançamento existente como conciliado, pago, e atualiza com dados do banco
    match.ref.conciliado = true;
    match.ref.situacao = 'pago';
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
  if (tipo === 'investimento') return DB.categorias.filter(c => { const n = getNat(c); return n === 'investimento' || n === 'todas'; }).map(c => c.id);
  if (tipo === 'interno') return DB.categorias.filter(c => { const n = getNat(c); return n === 'investimento' || n === 'todas'; }).map(c => c.id);
  if (tipo === 'despesa') return DB.categorias.filter(c => { const n = getNat(c); return n === 'despesa' || n === 'todas'; }).map(c => c.id);
  return DB.categorias.map(c => c.id);
}

function preencherSelectCategoriaPorTipo(selectId, tipo, valorAtual) {
  const el = document.getElementById(selectId); if (!el) return;
  const ids = getCategoriasPorTipo(tipo);
  const cats = DB.categorias.filter(c => ids.includes(c.id));
  el.innerHTML = cats.map(c => '<option value="'+c.id+'"'+(c.id===valorAtual?' selected':'')+'>'+c.nome+'</option>').join('');
}

const SELECTS_FORMA_PAGAMENTO = ['editar-forma-pagamento', 'manual-forma-pagamento', 'baixa-forma-pagamento'];

function preencherSelectsFormaPagamento() {
  SELECTS_FORMA_PAGAMENTO.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const valorAtual = el.value;
    el.innerHTML = '<option value="">—</option>' +
      DB.formasPagamento.map(f => '<option value="' + f.id + '"' + (f.id === valorAtual ? ' selected' : '') + '>' + f.nome + '</option>').join('');
  });
  const loteEl = document.getElementById('lote-forma-pagamento');
  if (loteEl) {
    const valorAtual = loteEl.value;
    loteEl.innerHTML = '<option value="">— não alterar —</option>' +
      DB.formasPagamento.map(f => '<option value="' + f.id + '"' + (f.id === valorAtual ? ' selected' : '') + '>' + f.nome + '</option>').join('');
  }
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
  preencherSelectsFormaPagamento();
  if (document.getElementById('grafico-categoria')) atualizarFiltroGraficoCategoria();
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
  a.download = 'backup-financeiro-'+dataLocalISO()+'.json';
  a.click();
  localStorage.setItem('ultimo-backup', dataLocalISO());
  atualizarLembreteBackup();
  toast('✓ Backup salvo! Guarde o arquivo em local seguro (Drive, e-mail...)');
}

function restaurarBackup(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const dados = JSON.parse(e.target.result);
      if (!dados.lancamentos && !dados.categorias) { toast('⚠️ Arquivo inválido — não parece um backup do sistema'); return; }
      if (!confirm('Restaurar backup? Os dados ATUAIS serão substituídos pelos do arquivo.\n\nLançamentos no backup: ' + (dados.lancamentos || []).length)) { input.value = ''; return; }
      Object.keys(dados).forEach(k => { DB[k] = dados[k]; });
      salvarDB();
      location.reload();
    } catch(err) {
      toast('⚠️ Erro ao ler o arquivo: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function atualizarLembreteBackup() {
  const avisos = document.querySelectorAll('.aviso-backup');
  if (!avisos.length) return;
  const ultimo = localStorage.getItem('ultimo-backup');
  const temDados = DB.lancamentos.length > 0;
  if (!temDados) { avisos.forEach(a => a.style.display = 'none'); return; }
  let diasSem = 999;
  if (ultimo) {
    diasSem = Math.floor((new Date() - new Date(ultimo + 'T12:00:00')) / (1000 * 60 * 60 * 24));
  }
  if (diasSem >= 7) {
    const texto = ultimo
      ? 'Seu último backup foi há ' + diasSem + ' dias. Seus dados vivem só neste navegador — faça um backup.'
      : 'Você ainda não fez nenhum backup. Seus dados vivem só neste navegador — se o cache for limpo, perde tudo.';
    avisos.forEach(a => a.style.display = 'flex');
    document.querySelectorAll('.aviso-backup-texto').forEach(t => t.textContent = texto);
  } else {
    avisos.forEach(a => a.style.display = 'none');
  }
}

function renderImportacoes() {
  const el = document.getElementById('lista-importacoes');
  if (!el) return;
  // Agrupa lançamentos por lote
  const lotes = {};
  DB.lancamentos.forEach(l => {
    if (!l.loteImportacao) return;
    if (!lotes[l.loteImportacao]) lotes[l.loteImportacao] = { data: l.loteData, origem: l.origem, itens: [], total: 0 };
    lotes[l.loteImportacao].itens.push(l);
    lotes[l.loteImportacao].total += l.valor;
  });
  const chaves = Object.keys(lotes);
  if (!chaves.length) {
    el.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:12px 0">Nenhuma importação registrada ainda.</div>';
    return;
  }
  el.innerHTML = chaves.map(k => {
    const lote = lotes[k];
    return '<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:0.5px solid var(--border-light2)">' +
      '<div style="flex:1">' +
        '<div style="font-size:13px;font-weight:500">' + (lote.origem || 'Importação') + ' · ' + lote.itens.length + ' lançamentos</div>' +
        '<div style="font-size:11px;color:var(--text3)">' + (lote.data || '') + ' · total ' + fmt(lote.total) + '</div>' +
      '</div>' +
      '<button class="btn" style="font-size:11px;padding:4px 10px;color:var(--red);border-color:var(--red)" onclick="apagarImportacao(\'' + k + '\')"><i class="ti ti-trash"></i> Apagar</button>' +
    '</div>';
  }).join('');
}

function apagarImportacao(loteId) {
  const itens = DB.lancamentos.filter(l => l.loteImportacao === loteId);
  if (!itens.length) return;
  if (!confirm('Apagar esta importação inteira?\n\n' + itens.length + ' lançamentos serão removidos. Essa ação não pode ser desfeita.')) return;
  DB.lancamentos = DB.lancamentos.filter(l => l.loteImportacao !== loteId);
  salvarDB();
  renderImportacoes();
  renderDashboard();
  try { renderLancamentos(); } catch(e) {}
  toast(itens.length + ' lançamentos da importação removidos');
}

function limparDados() {
  if (!confirm('Tem certeza? Todos os lançamentos serão apagados.')) return;
  DB.lancamentos = []; DB.patrimonio = [];
  salvarDB(); renderDashboard(); renderLancamentos();
  toast('Dados limpos');
}

function preencherMesRapidoManual() {
  const sel = document.getElementById('manual-mes-rapido');
  if (!sel) return;
  const hoje = new Date();
  const opcoes = [];
  for (let i = 0; i <= 12; i++) {
    const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
    const valor = mesLocalISO(d);
    let label;
    if (i === 0) label = 'Mês atual';
    else if (i === 1) label = 'Mês anterior';
    else {
      const nome = d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
      label = nome.charAt(0).toUpperCase() + nome.slice(1);
    }
    opcoes.push('<option value="' + valor + '"' + (i === 0 ? ' selected' : '') + '>' + label + '</option>');
  }
  sel.innerHTML = opcoes.join('');
}

function aplicarMesRapidoManual() {
  const mesEscolhido = document.getElementById('manual-mes-rapido').value; // 'YYYY-MM'
  const dataAtual = document.getElementById('manual-data').value; // 'YYYY-MM-DD'
  const diaAtual = dataAtual ? parseInt(dataAtual.slice(8, 10)) : new Date().getDate();
  const [ano, mes] = mesEscolhido.split('-').map(Number);
  const ultimoDiaDoMes = new Date(ano, mes, 0).getDate();
  const dia = Math.min(diaAtual, ultimoDiaDoMes);
  document.getElementById('manual-data').value = mesEscolhido + '-' + String(dia).padStart(2, '0');
}

function abrirModalLancamento() {
  // Pré-preenche data de hoje (mês atual) e prepara selects
  document.getElementById('manual-data').value = dataLocalISO();
  preencherMesRapidoManual();
  const tipoAtual = document.getElementById('manual-tipo').value || 'despesa';
  preencherSelectCategoriaPorTipo('manual-categoria', tipoAtual, '');
  atualizarSubcatManual();
  renderSeletorTags('manual-tags-seletor', []);
  document.getElementById('modal-lancamento').style.display = 'flex';
  // Foco no valor para lançamento rápido
  setTimeout(() => document.getElementById('manual-valor').focus(), 100);
}
