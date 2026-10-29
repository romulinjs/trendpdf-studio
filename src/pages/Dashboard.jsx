import React, { useState } from 'react';
import ModalAuditoriaDados from '../components/ModalAuditoriaDados';

export default function Dashboard({
  trends,
  ideas,
  onNavigate,
  onOpenSummary,
  onExportPDF,
  onQuickSearch,
  onShowToast
}) {
  const [searchInput, setSearchInput] = useState('');
  const [selectedAuditTrend, setSelectedAuditTrend] = useState(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onQuickSearch(searchInput.trim());
    }
  };

  const handleTagClick = (tag) => {
    setSearchInput(tag);
    onQuickSearch(tag);
  };

  const savedIdeasCount = ideas.filter((i) => i.saved).length;

  return (
    <div className="flex flex-col w-full gap-space-lg sm:gap-space-xl pb-16">
      {/* 1. Dashboard Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-headline-xl text-xl sm:text-2xl lg:text-3xl font-bold text-on-surface dark:text-slate-100 tracking-tight">
              Olá, Ana 👋 Bem-vinda de volta ao TrendPDF Studio
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Live Pipeline Conectado
            </span>
          </div>
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 leading-relaxed">
            Descubra tópicos em alta, analise demanda de mercado e crie guias e e-books lucrativos em PDF com base em inteligência preditiva.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onNavigate('pesquisar-tendencias')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-semibold text-xs sm:text-sm shadow-sm hover:opacity-95 transition-all active:scale-[0.98] min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span>+ Nova Pesquisa de Tendência</span>
          </button>
        </div>
      </section>

      {/* 2. Barra de Pesquisa Rápida Integrada */}
      <section className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl shadow-sm p-4 sm:p-6 flex flex-col gap-4 border border-outline-variant/30 dark:border-slate-700 transition-colors">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="relative flex-1 flex items-center bg-surface-container-low dark:bg-slate-900 rounded-lg px-3 py-2 sm:py-2.5 min-h-[44px]">
            <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 text-[20px] mr-2 select-none flex-shrink-0">
              search
            </span>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full min-w-0 bg-transparent border-0 outline-none text-xs sm:text-sm text-on-surface dark:text-slate-100 placeholder:text-on-surface-variant/60 dark:placeholder:text-slate-500"
              placeholder="Buscar nicho, palavra-chave ou problema (ex: Gestão de tempo, Finanças infantis, Micro-SaaS)..."
              type="text"
            />
            <span className="hidden md:inline-block font-metric-mono text-on-surface-variant/70 dark:text-slate-400 bg-surface-container dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] flex-shrink-0 ml-2 select-none">
              ↵ Enter
            </span>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow-sm hover:opacity-95 transition-all flex-shrink-0 min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <span className="material-symbols-outlined text-[18px]">query_stats</span>
            <span>Analisar Oportunidade</span>
          </button>
        </form>

        {/* Tags de Termos Rápidos */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-on-surface-variant dark:text-slate-400 font-medium mr-1">Sugestões rápidas:</span>
          {[
            'Educação Financeira Infantil',
            'Micro-SaaS com IA',
            'Produtividade Notion para TDAH',
            'Cardápios Anti-inflamatórios',
            'Advogados e Automação',
          ].map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-3 py-1.5 rounded-full bg-surface-container dark:bg-slate-700/60 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-700 hover:text-on-surface dark:hover:text-white text-[11px] sm:text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Métricas Gerais (KPIs) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-surface-container-lowest dark:bg-slate-800/90 p-4 rounded-xl shadow-sm border border-outline-variant/20 dark:border-slate-700/60 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between text-on-surface-variant dark:text-slate-400">
            <span className="text-xs uppercase tracking-wider font-semibold">Tendências Ativas</span>
            <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-on-surface dark:text-slate-100">{trends.length} nichos</div>
            <span className="text-secondary dark:text-emerald-400 text-xs font-semibold flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +34% este mês
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest dark:bg-slate-800/90 p-4 rounded-xl shadow-sm border border-outline-variant/20 dark:border-slate-700/60 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between text-on-surface-variant dark:text-slate-400">
            <span className="text-xs uppercase tracking-wider font-semibold">Biblioteca de Ideias</span>
            <span className="material-symbols-outlined text-primary text-[20px]">bookmark</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-on-surface dark:text-slate-100">{ideas.length} ideias</div>
            <span className="text-primary dark:text-primary-fixed-dim text-xs font-semibold flex items-center gap-1 mt-1">
              {savedIdeasCount} salvas para produção
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest dark:bg-slate-800/90 p-4 rounded-xl shadow-sm border border-outline-variant/20 dark:border-slate-700/60 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between text-on-surface-variant dark:text-slate-400">
            <span className="text-xs uppercase tracking-wider font-semibold">Score Médio</span>
            <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-on-surface dark:text-slate-100">9.2 / 10</div>
            <span className="text-on-surface-variant dark:text-slate-400 text-[11px] mt-1 block">
              Validação por intenção comercial
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest dark:bg-slate-800/90 p-4 rounded-xl shadow-sm border border-outline-variant/20 dark:border-slate-700/60 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between text-on-surface-variant dark:text-slate-400">
            <span className="text-xs uppercase tracking-wider font-semibold">Margem Estimada</span>
            <span className="material-symbols-outlined text-secondary text-[20px]">payments</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-secondary dark:text-emerald-400">94% Líquido</div>
            <span className="text-on-surface-variant dark:text-slate-400 text-[11px] mt-1 block">
              Custo zero de distribuição física
            </span>
          </div>
        </div>
      </section>

      {/* 4. Grid de Tendências em Alta & Ideias Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md sm:gap-space-lg items-start">
        {/* Coluna Esquerda: Top Oportunidades (8 cols) */}
        <section className="lg:col-span-8 bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl shadow-sm border border-outline-variant/20 dark:border-slate-700/60 p-4 sm:p-6 flex flex-col gap-4 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-surface-container dark:border-slate-700">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100">
                Principais Tendências em Ascensão
              </h2>
              <p className="text-xs text-on-surface-variant dark:text-slate-400">
                Oportunidades com crescimento acelerado de busca e baixa concorrência em infoprodutos.
              </p>
            </div>
            <button
              onClick={() => onNavigate('pesquisar-tendencias')}
              className="text-primary dark:text-primary-fixed-dim text-xs font-semibold hover:underline inline-flex items-center gap-1 flex-shrink-0 min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <span>Ver todas</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="flex flex-col divide-y divide-surface-container dark:divide-slate-700">
            {trends.slice(0, 4).map((trend) => (
              <div key={trend.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-metric-mono font-bold bg-secondary-container dark:bg-emerald-950/60 text-on-secondary-container dark:text-emerald-400">
                      {trend.growth}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-surface-container dark:bg-slate-700 text-on-surface dark:text-slate-200 font-medium">
                      {trend.category}
                    </span>
                    <span className="text-[11px] font-metric-mono text-outline dark:text-slate-400">
                      {trend.volume}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedAuditTrend(trend)}
                      className="inline-flex items-center gap-1 text-[10px] text-primary dark:text-indigo-300 font-bold hover:underline"
                      title="Ver dados de auditoria e proveniência"
                    >
                      <span className="material-symbols-outlined text-[13px]">verified</span>
                      <span>Origem</span>
                    </button>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-on-surface dark:text-slate-100 group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">
                    {trend.keyword}
                  </h3>
                  <p className="text-xs text-on-surface-variant dark:text-slate-400 line-clamp-1">
                    {trend.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 pt-1 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-metric-mono text-on-surface-variant dark:text-slate-400 block">Score</span>
                    <span className="text-sm font-bold text-primary dark:text-primary-fixed-dim font-metric-mono">{trend.score}/10</span>
                  </div>
                  <button
                    onClick={() => {
                      onQuickSearch(trend.keyword);
                      onNavigate('gerar-ideias');
                    }}
                    className="inline-flex items-center justify-center gap-1 px-3.5 py-2 rounded-lg bg-surface-container dark:bg-slate-700 hover:bg-primary hover:text-on-primary text-on-surface dark:text-slate-200 text-xs font-semibold transition-all min-h-[40px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                    <span>Criar PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coluna Direita: Ideias Prontas para Produção (4 cols) */}
        <section className="lg:col-span-4 bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl shadow-sm border border-outline-variant/20 dark:border-slate-700/60 p-4 sm:p-6 flex flex-col gap-4 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-surface-container dark:border-slate-700">
            <h2 className="text-base font-bold text-on-surface dark:text-slate-100">
              Modelos Prontos
            </h2>
            <button
              onClick={() => onNavigate('ideias-salvas')}
              className="text-primary dark:text-primary-fixed-dim text-xs font-semibold hover:underline min-h-[44px] flex items-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              Biblioteca
            </button>
          </div>

          <div className="space-y-3">
            {ideas.slice(0, 3).map((idea) => (
              <div
                key={idea.id}
                onClick={() => onOpenSummary(idea)}
                className="p-3.5 rounded-lg bg-surface-container-low dark:bg-slate-900/60 hover:bg-surface-container dark:hover:bg-slate-700/50 transition-all cursor-pointer space-y-1.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenSummary(idea);
                  }
                }}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-metric-mono font-semibold text-primary dark:text-primary-fixed-dim">{idea.suggestedPrice}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-surface-container dark:bg-slate-700 text-on-surface-variant dark:text-slate-300 font-medium">
                    {idea.formatType}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-on-surface dark:text-slate-100 line-clamp-2 leading-snug">
                  {idea.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant dark:text-slate-400 pt-1">
                  <span>10 capítulos estruturados</span>
                  <span className="material-symbols-outlined text-[16px] text-primary dark:text-primary-fixed-dim">chevron_right</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/15 dark:border-primary/20 rounded-xl p-3.5 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-primary dark:text-primary-fixed-dim">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Dica de Conversão</span>
            </div>
            <p className="text-on-surface-variant dark:text-slate-400 leading-relaxed text-[11px]">
              Adicionar um <strong>Order Bump</strong> de R$ 19,90 com fichas imprimíveis aumenta a lucratividade média por pedido em até 38%.
            </p>
          </div>
        </section>
      </div>

      {/* 5. Banner de Oportunidade */}
      <section className="relative overflow-hidden bg-primary-container text-on-primary rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur">
            <span className="material-symbols-outlined text-[16px]">psychology</span>
            <span>Algoritmo Preditivo 2026</span>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
            Descubra micro-nichos inexplorados com o Gerador de Ideias
          </h3>
          <p className="text-on-primary-container text-xs sm:text-sm leading-relaxed">
            Nossa inteligência cruza volumes de busca e ausência de concorrentes diretos para estruturar infoprodutos completos em PDF com sumário e precificação.
          </p>
        </div>
        <div className="flex items-center gap-3 relative z-10 flex-shrink-0">
          <button
            onClick={() => onNavigate('gerar-ideias')}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white text-primary font-bold text-xs sm:text-sm shadow hover:bg-slate-50 transition-all active:scale-[0.98] text-center min-h-[44px] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            type="button"
          >
            Gerar Ideias Agora
          </button>
        </div>
      </section>

      {/* Modal de Auditoria e Proveniência de Dados */}
      {selectedAuditTrend && (
        <ModalAuditoriaDados
          trend={selectedAuditTrend}
          isOpen={Boolean(selectedAuditTrend)}
          onClose={() => setSelectedAuditTrend(null)}
          onSelectTrendForIdea={(keyword, audience) => {
            onQuickSearch(keyword);
            onNavigate('gerar-ideias');
          }}
        />
      )}
    </div>
  );
}
