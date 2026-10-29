import React, { useState } from 'react';
import { trendIntelligenceService } from '../services/trendIntelligenceService';
import ModalAuditoriaDados from '../components/ModalAuditoriaDados';

export default function PesquisarTendencias({
  trends,
  onSelectTrendForIdea,
  onAddNewTrend,
  onShowToast
}) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [sourceFilter, setSourceFilter] = useState('Todas as Fontes');
  const [minScore, setMinScore] = useState(0);

  // Live Real-Time Search & Analysis State
  const [liveQuery, setLiveQuery] = useState('');
  const [liveCategory, setLiveCategory] = useState('Negócios & Tecnologia');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedAuditTrend, setSelectedAuditTrend] = useState(null);

  const categories = [
    'Todas',
    'Parentalidade & Educação',
    'Produtividade Pessoal',
    'Saúde & Bem-Estar',
    'Negócios & Tecnologia',
    'Carreira & Jurídico',
  ];

  const sourceFilters = [
    'Todas as Fontes',
    'Google Trends BR',
    'Google Autocomplete',
    'Kiwify Marketplace',
  ];

  const filteredTrends = trends.filter((item) => {
    const matchCategory = categoryFilter === 'Todas' || item.category === categoryFilter;
    const matchSearch =
      item.keyword.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase());
    const matchScore = item.score >= minScore;
    const matchSource =
      sourceFilter === 'Todas as Fontes' ||
      (item.platforms && item.platforms.some((p) => p.toLowerCase().includes(sourceFilter.toLowerCase().split(' ')[0])));

    return matchCategory && matchSearch && matchScore && matchSource;
  });

  // Executa Análise em Tempo Real com Dados Reais de Busca
  const handleLiveAnalysis = async (e) => {
    e.preventDefault();
    if (!liveQuery.trim()) return;

    setIsAnalyzing(true);
    try {
      const analyzedTrend = await trendIntelligenceService.analyzeNicheInRealTime(
        liveQuery.trim(),
        liveCategory
      );

      if (onAddNewTrend) {
        await onAddNewTrend(analyzedTrend);
      }

      if (onShowToast) {
        onShowToast({
          type: 'success',
          title: 'Nicho Analisado e Auditado!',
          message: `Indicadores calculados para "${analyzedTrend.keyword}" com Score ${analyzedTrend.score}/10.`,
        });
      }

      // Abre automaticamente o modal de auditoria para o usuário conferir a proveniência
      setSelectedAuditTrend(analyzedTrend);
      setLiveQuery('');
    } catch (err) {
      console.error('Falha ao analisar nicho:', err);
      if (onShowToast) {
        onShowToast({
          type: 'error',
          title: 'Erro na Análise',
          message: 'Não foi possível consultar as fontes de busca neste momento.',
        });
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const exportTrendsJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredTrends, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'tendencias_trendpdf_studio_auditadas.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Exportação Concluída',
        message: `${filteredTrends.length} tendências com metadados de auditoria exportadas.`,
      });
    }
  };

  return (
    <div className="flex flex-col w-full gap-space-lg sm:gap-space-xl pb-16">
      {/* 1. Header with Breadcrumb */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-on-surface-variant dark:text-slate-400 font-medium">
            <span>Inteligência de Mercado</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary dark:text-primary-fixed-dim font-semibold">Pesquisa & Auditoria de Tendências</span>
          </nav>

          <h1 className="font-headline-xl text-xl sm:text-2xl lg:text-3xl font-bold text-on-surface dark:text-slate-100 tracking-tight">
            Pesquisa e Análise de Tendências
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 max-w-3xl leading-relaxed">
            Monitore fontes de dados reais (Google Trends BR, Google Autocomplete e Marketplaces digitais), valide indicadores preditivos e rastreie a procedência de cada oportunidade.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={exportTrendsJSON}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-100 hover:bg-surface-container-high dark:hover:bg-slate-700 text-xs sm:text-sm font-semibold transition-all shadow-sm min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Exportar Dados & Auditoria</span>
          </button>
        </div>
      </div>

      {/* 2. Live Trend Analyzer Tool (Motor de Pesquisa em Tempo Real) */}
      <div className="bg-gradient-to-r from-primary/10 via-primary-container/20 to-surface-container-low dark:from-indigo-950/40 dark:via-slate-800/60 dark:to-slate-900 rounded-2xl p-4 sm:p-6 border border-primary/20 dark:border-indigo-900/40 space-y-3.5 transition-all shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">travel_explore</span>
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-on-surface dark:text-slate-100">
                Analisador de Nichos em Tempo Real (Live Search Engine)
              </h2>
              <p className="text-[11px] sm:text-xs text-on-surface-variant dark:text-slate-400">
                Consulte o Google Trends e Google Autocomplete para calcular o score e validar a demanda de qualquer termo.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary-container dark:bg-emerald-950/60 text-secondary dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            Motor de Proveniência Ativo
          </span>
        </div>

        <form onSubmit={handleLiveAnalysis} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center pt-1">
          <div className="sm:col-span-7 relative flex items-center bg-surface-container-lowest dark:bg-slate-800 rounded-xl px-3.5 py-2 min-h-[44px] border border-outline-variant/40 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <span className="material-symbols-outlined text-primary text-[20px] mr-2 flex-shrink-0">
              search
            </span>
            <input
              type="text"
              value={liveQuery}
              onChange={(e) => setLiveQuery(e.target.value)}
              placeholder="Ex: Receitas Low Carb, Finanças para Médicos, Automação Notion..."
              className="w-full min-w-0 bg-transparent border-none outline-none text-xs sm:text-sm text-on-surface dark:text-slate-100 placeholder:text-on-surface-variant/60 dark:placeholder:text-slate-500 font-medium"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={liveCategory}
              onChange={(e) => setLiveCategory(e.target.value)}
              className="w-full bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-100 text-xs sm:text-sm px-3 py-2 rounded-xl border border-outline-variant/40 dark:border-slate-700 outline-none cursor-pointer min-h-[44px]"
            >
              <option value="Negócios & Tecnologia">Negócios & Tecnologia</option>
              <option value="Parentalidade & Educação">Parentalidade & Educação</option>
              <option value="Produtividade Pessoal">Produtividade Pessoal</option>
              <option value="Saúde & Bem-Estar">Saúde & Bem-Estar</option>
              <option value="Carreira & Jurídico">Carreira & Jurídico</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isAnalyzing || !liveQuery.trim()}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold shadow-md shadow-primary/25 transition-all min-h-[44px] disabled:opacity-50"
            >
              {isAnalyzing ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">query_stats</span>
                  <span>Analisar</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 3. Filters & Search Bar */}
      <div className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl shadow-sm border border-outline-variant/30 dark:border-slate-700 p-4 space-y-3 sm:space-y-4 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-8 relative flex items-center bg-surface-container-low dark:bg-slate-900 rounded-lg px-3 py-2 min-h-[44px]">
            <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 text-[20px] mr-2 flex-shrink-0">
              filter_list
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filtrar por nicho, palavra-chave ou resumo auditado..."
              className="w-full min-w-0 bg-transparent border-none outline-none text-xs sm:text-sm text-on-surface dark:text-slate-100 placeholder:text-on-surface-variant/60 dark:placeholder:text-slate-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white p-1 rounded"
                aria-label="Limpar campo de pesquisa"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Min Score Filter */}
          <div className="md:col-span-4 flex items-center gap-2 bg-surface-container-low dark:bg-slate-900 rounded-lg px-3 py-2 min-h-[44px]">
            <span className="text-xs text-on-surface-variant dark:text-slate-400 font-medium whitespace-nowrap">Score Mín:</span>
            <input
              type="range"
              min="0"
              max="9.5"
              step="0.5"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              aria-label="Filtrar por score mínimo de oportunidade"
              aria-valuenow={minScore}
              className="w-full accent-primary cursor-pointer h-1.5 bg-surface-container-highest dark:bg-slate-700 rounded-lg"
            />
            <span className="text-xs font-metric-mono font-bold text-primary dark:text-primary-fixed-dim w-10 text-right flex-shrink-0">
              {minScore > 0 ? `${minScore}+` : 'Todos'}
            </span>
          </div>
        </div>

        {/* Source & Category Selectors */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-surface-container dark:border-slate-700">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-on-surface-variant dark:text-slate-400 font-semibold mr-1">Categoria:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                  categoryFilter === cat
                    ? 'bg-primary-container text-on-primary shadow-sm'
                    : 'bg-surface-container dark:bg-slate-700/60 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-700 hover:text-on-surface dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Source Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-on-surface-variant dark:text-slate-400 font-semibold mr-1">Fonte:</span>
            {sourceFilters.map((src) => (
              <button
                key={src}
                onClick={() => setSourceFilter(src)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  sourceFilter === src
                    ? 'bg-surface-container-highest dark:bg-slate-600 text-primary dark:text-indigo-300 font-bold'
                    : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white'
                }`}
              >
                {src}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Trends Results List with Verified Provenance Badges */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-on-surface-variant dark:text-slate-400 px-1 flex-wrap gap-2">
          <span>
            Exibindo <strong>{filteredTrends.length}</strong> oportunidades auditadas com fontes verificadas
          </span>
          <span className="hidden sm:inline">Ponderação: Crescimento (40%) • Volume (30%) • Oceano Azul (30%)</span>
        </div>

        <div className="grid grid-cols-1 gap-space-md">
          {filteredTrends.map((trend) => (
            <div
              key={trend.id}
              className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl shadow-sm border border-outline-variant/20 dark:border-slate-700/60 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/40 dark:hover:border-primary/50 transition-all group"
            >
              <div className="space-y-2.5 max-w-3xl">
                {/* Metric Badges with Verified Status */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-metric-mono font-bold bg-secondary-container dark:bg-emerald-950/60 text-on-secondary-container dark:text-emerald-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">trending_up</span>
                    {trend.growth}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs bg-surface-container dark:bg-slate-700 text-on-surface dark:text-slate-200 font-medium">
                    {trend.category}
                  </span>
                  <span className="text-xs font-metric-mono text-outline dark:text-slate-400">
                    {trend.volume}
                  </span>
                  <span className="text-xs text-on-surface-variant dark:text-slate-400">
                    Concorrência: <span className={trend.competitionColor}>{trend.competition}</span>
                  </span>

                  {/* Provenance Tag */}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary-fixed/20 dark:bg-indigo-950/60 text-primary dark:text-indigo-300 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Google Trends BR Validado
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100 group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">
                  {trend.keyword}
                </h3>

                <p className="text-xs sm:text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed">
                  {trend.summary}
                </p>

                <div className="flex items-center gap-2 sm:gap-3 text-xs text-on-surface-variant dark:text-slate-400 pt-1 flex-wrap">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-primary dark:text-primary-fixed-dim">menu_book</span>
                    Formato: <strong className="text-on-surface dark:text-slate-200">{trend.suggestedFormat}</strong>
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>Ticket médio: <strong className="text-primary dark:text-primary-fixed-dim">{trend.ticketAvg}</strong></span>
                  <span className="hidden sm:inline">•</span>
                  <span className="text-secondary dark:text-emerald-400 font-semibold">Status: {trend.trendStatus}</span>
                </div>

                {/* Data Lineage & Provenance Quick Actions */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => setSelectedAuditTrend(trend)}
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs text-primary dark:text-indigo-300 hover:underline font-semibold"
                  >
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>Ver Origem dos Dados & Auditoria Estatística</span>
                  </button>
                  <span className="text-outline-variant/40 dark:text-slate-700">•</span>
                  <a
                    href={`https://trends.google.com/trends/explore?geo=BR&q=${encodeURIComponent(trend.keyword)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white transition-colors"
                  >
                    <span>Google Trends</span>
                    <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                  </a>
                </div>
              </div>

              {/* Action Column */}
              <div className="flex md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-surface-container dark:border-slate-700 flex-shrink-0">
                <div className="text-left md:text-right">
                  <span className="text-[10px] font-metric-mono text-on-surface-variant dark:text-slate-400 block">Score de Oportunidade</span>
                  <span className="text-lg sm:text-xl font-bold text-primary dark:text-primary-fixed-dim font-metric-mono">{trend.score}/10</span>
                </div>

                <div className="flex items-center md:flex-col gap-2 w-full md:w-auto">
                  <button
                    onClick={() => onSelectTrendForIdea(trend.keyword, trend.targetAudience)}
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-semibold text-xs shadow-sm hover:opacity-95 transition-all active:scale-[0.98] min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                    <span>Transformar em PDF</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredTrends.length === 0 && (
            <div className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-2xl p-8 sm:p-14 text-center border border-outline-variant/30 dark:border-slate-700 space-y-3">
              <div className="w-16 h-16 rounded-full bg-surface-container dark:bg-slate-700 text-on-surface-variant dark:text-slate-400 mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">search_off</span>
              </div>
              <h3 className="text-base font-bold text-on-surface dark:text-slate-100">Nenhuma tendência encontrada com esses filtros</h3>
              <p className="text-xs text-on-surface-variant dark:text-slate-400 max-w-sm mx-auto">
                Você pode utilizar o Analisador em Tempo Real acima para pesquisar e auditar qualquer novo nicho agora mesmo.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setCategoryFilter('Todas');
                  setSourceFilter('Todas as Fontes');
                  setMinScore(0);
                }}
                className="px-4 py-2 rounded-lg bg-surface-container dark:bg-slate-700 hover:bg-surface-container-high dark:hover:bg-slate-600 text-xs font-semibold text-on-surface dark:text-slate-200 transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Auditoria e Proveniência de Dados */}
      {selectedAuditTrend && (
        <ModalAuditoriaDados
          trend={selectedAuditTrend}
          isOpen={Boolean(selectedAuditTrend)}
          onClose={() => setSelectedAuditTrend(null)}
          onSelectTrendForIdea={onSelectTrendForIdea}
        />
      )}
    </div>
  );
}
