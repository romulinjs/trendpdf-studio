import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ModalAuditoriaDados from '../components/ModalAuditoriaDados';

export default function Dashboard({
  trends = [],
  ideas = [],
  onNavigate,
  onOpenSummary,
  onExportPDF,
  onQuickSearch,
  onShowToast,
  isLoading = false,
}) {
  const { user } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const [selectedAuditTrend, setSelectedAuditTrend] = useState(null);
  const [activeTag, setActiveTag] = useState('');

  const firstName = user?.name ? user.name.trim().split(' ')[0] : 'Criador';

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onQuickSearch(searchInput.trim());
    }
  };

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    setSearchInput(tag);
    onQuickSearch(tag);
  };

  const savedIdeasCount = ideas.filter((i) => i.saved).length;

  return (
    <div className="flex flex-col w-full gap-6 sm:gap-8 pb-16">
      {/* 1. Dashboard Header com Saudação Dinâmica e Hierarquia Clara */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5 max-w-3xl">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface dark:text-slate-100 tracking-tight">
              Olá, {firstName} 👋 Bem-vindo(a) de volta
            </h1>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 border border-outline-variant/30 dark:border-slate-700/60"
              role="status"
              aria-label="Status do sistema: Inteligência de Mercado Ativa"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" aria-hidden="true"></span>
              <span>Inteligência de Mercado Ativa</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 leading-relaxed">
            Monitore picos de busca em tempo real, descubra nichos com baixa concorrência e modele infoprodutos em PDF prontos para monetização.
          </p>
        </div>

        {/* CTA Principal de Topo (Touch target >= 44px) */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onNavigate('pesquisar-tendencias')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs sm:text-sm shadow-md shadow-primary/20 transition-all active:scale-[0.98] min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            type="button"
            aria-label="Iniciar nova pesquisa avançada de tendências de mercado"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">bolt</span>
            <span>+ Nova Pesquisa de Tendência</span>
          </button>
        </div>
      </header>

      {/* 2. Barra de Pesquisa Rápida Integrada & Sugestões com Touch Targets de 44px */}
      <section
        className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col gap-4 border border-outline-variant/30 dark:border-slate-700 transition-colors"
        aria-labelledby="titulo-pesquisa-rapida"
      >
        <div className="sr-only" id="titulo-pesquisa-rapida">Pesquisa Rápida de Nichos de Mercado</div>

        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3" role="search">
          <div className="relative flex-1 flex items-center bg-surface-container-low dark:bg-slate-900 rounded-xl px-3.5 py-2 min-h-[48px] border border-transparent focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 text-[22px] mr-2.5 select-none flex-shrink-0" aria-hidden="true">
              search
            </span>
            <input
              id="busca-rapida-dashboard"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full min-w-0 bg-transparent border-0 outline-none text-base sm:text-sm text-on-surface dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
              placeholder="Buscar nicho, palavra-chave ou problema (ex: Gestão de tempo, Finanças infantis, Micro-SaaS)..."
              type="search"
              enterKeyHint="search"
              aria-label="Campo de busca rápida de nichos e termos de alta conversão"
            />
            <span className="hidden md:inline-flex items-center font-metric-mono text-on-surface-variant/70 dark:text-slate-400 bg-surface-container dark:bg-slate-800 px-2 py-0.5 rounded text-[11px] flex-shrink-0 ml-2 select-none" aria-hidden="true">
              ↵ Enter
            </span>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-container hover:bg-primary-container/90 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex-shrink-0 min-h-[48px] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            aria-label="Analisar oportunidade de mercado do termo digitado"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">query_stats</span>
            <span>Analisar Oportunidade</span>
          </button>
        </form>

        {/* Tags de Sugestões Rápidas (Touch Targets confortáveis >= 44px e indicação de estado) */}
        <div className="flex flex-wrap items-center gap-2 pt-1" role="group" aria-label="Sugestões de nichos populares em alta">
          <span className="text-xs text-on-surface-variant dark:text-slate-400 font-semibold mr-1 flex-shrink-0">
            Sugestões rápidas:
          </span>
          {[
            'Educação Financeira Infantil',
            'Micro-SaaS com IA',
            'Produtividade Notion para TDAH',
            'Cardápios Anti-inflamatórios',
            'Advogados e Automação',
          ].map((tag) => {
            const isSelected = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                  isSelected
                    ? 'bg-primary text-white shadow-sm ring-2 ring-primary/40'
                    : 'bg-surface-container dark:bg-slate-700/60 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-700 hover:text-on-surface dark:hover:text-white'
                }`}
                type="button"
                aria-pressed={isSelected}
                aria-label={`Preencher busca com a sugestão rápida: ${tag}`}
              >
                <span className="material-symbols-outlined text-[16px] text-primary dark:text-indigo-400" aria-hidden="true">
                  trending_up
                </span>
                <span>{tag}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Métricas Gerais (KPIs) com Skeletons e Acessibilidade Semântica */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" aria-label="Indicadores chave de desempenho e mercado">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="bg-surface-container-lowest dark:bg-slate-800/90 p-5 rounded-2xl shadow-sm border border-outline-variant/20 dark:border-slate-700/60 animate-pulse space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
              <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
            </div>
          ))
        ) : (
          <>
            {/* KPI 1: Tendências Ativas */}
            <div className="bg-surface-container-lowest dark:bg-slate-800/90 p-5 rounded-2xl shadow-sm border border-outline-variant/20 dark:border-slate-700/60 flex flex-col justify-between transition-colors">
              <div className="flex items-center justify-between text-on-surface-variant dark:text-slate-400">
                <span className="text-xs uppercase tracking-wider font-bold">Tendências Ativas</span>
                <span className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-indigo-400" aria-hidden="true">
                  <span className="material-symbols-outlined text-[20px]">trending_up</span>
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-on-surface dark:text-slate-100 font-mono tracking-tight">
                  {trends.length} <span className="text-sm font-semibold text-on-surface-variant dark:text-slate-400">nichos</span>
                </div>
                <div className="text-secondary dark:text-emerald-400 text-xs font-semibold flex items-center gap-1 mt-1.5">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_upward</span>
                  <span>+34% de volume este mês</span>
                </div>
              </div>
            </div>

            {/* KPI 2: Biblioteca de Ideias */}
            <div className="bg-surface-container-lowest dark:bg-slate-800/90 p-5 rounded-2xl shadow-sm border border-outline-variant/20 dark:border-slate-700/60 flex flex-col justify-between transition-colors">
              <div className="flex items-center justify-between text-on-surface-variant dark:text-slate-400">
                <span className="text-xs uppercase tracking-wider font-bold">Biblioteca de Ideias</span>
                <span className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-indigo-400" aria-hidden="true">
                  <span className="material-symbols-outlined text-[20px]">bookmark</span>
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-on-surface dark:text-slate-100 font-mono tracking-tight">
                  {ideas.length} <span className="text-sm font-semibold text-on-surface-variant dark:text-slate-400">ideias</span>
                </div>
                <span className="text-primary dark:text-indigo-400 text-xs font-semibold flex items-center gap-1 mt-1.5">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">check_circle</span>
                  <span>{savedIdeasCount} salvas para produção</span>
                </span>
              </div>
            </div>

            {/* KPI 3: Score Médio */}
            <div className="bg-surface-container-lowest dark:bg-slate-800/90 p-5 rounded-2xl shadow-sm border border-outline-variant/20 dark:border-slate-700/60 flex flex-col justify-between transition-colors">
              <div className="flex items-center justify-between text-on-surface-variant dark:text-slate-400">
                <span className="text-xs uppercase tracking-wider font-bold">Score de Viabilidade</span>
                <span className="w-8 h-8 rounded-lg bg-secondary/10 dark:bg-emerald-950/60 flex items-center justify-center text-secondary dark:text-emerald-400" aria-hidden="true">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-on-surface dark:text-slate-100 font-mono tracking-tight">
                  9.2 <span className="text-base text-on-surface-variant dark:text-slate-400">/ 10</span>
                </div>
                <span className="text-on-surface-variant dark:text-slate-400 text-xs mt-1.5 block">
                  Intenção comercial comprovada
                </span>
              </div>
            </div>

            {/* KPI 4: Margem Estimada */}
            <div className="bg-surface-container-lowest dark:bg-slate-800/90 p-5 rounded-2xl shadow-sm border border-outline-variant/20 dark:border-slate-700/60 flex flex-col justify-between transition-colors">
              <div className="flex items-center justify-between text-on-surface-variant dark:text-slate-400">
                <span className="text-xs uppercase tracking-wider font-bold">Margem Operacional</span>
                <span className="w-8 h-8 rounded-lg bg-secondary/10 dark:bg-emerald-950/60 flex items-center justify-center text-secondary dark:text-emerald-400" aria-hidden="true">
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-secondary dark:text-emerald-400 font-mono tracking-tight">
                  94% Líquido
                </div>
                <span className="text-on-surface-variant dark:text-slate-400 text-xs mt-1.5 block">
                  Sem custo de frete ou estoque físico
                </span>
              </div>
            </div>
          </>
        )}
      </section>

      {/* 4. Grid Principal: Tendências em Ascensão (8 cols) & Modelos Prontos (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Coluna Esquerda: Top Oportunidades em Alta */}
        <section
          className="lg:col-span-8 bg-surface-container-lowest dark:bg-slate-800/90 rounded-2xl shadow-sm border border-outline-variant/20 dark:border-slate-700/60 p-5 sm:p-6 flex flex-col gap-4 transition-colors"
          aria-labelledby="titulo-tendencias-alta"
        >
          <div className="flex items-center justify-between pb-3.5 border-b border-surface-container dark:border-slate-700">
            <div>
              <h2 id="titulo-tendencias-alta" className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100 tracking-tight">
                Principais Tendências em Ascensão
              </h2>
              <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">
                Nichos com explosão de buscas recentes e baixa saturação de infoprodutos.
              </p>
            </div>
            <button
              onClick={() => onNavigate('pesquisar-tendencias')}
              className="text-primary dark:text-indigo-400 hover:text-primary-hover dark:hover:text-indigo-300 text-xs font-bold hover:underline inline-flex items-center gap-1 flex-shrink-0 min-h-[44px] px-2 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              type="button"
              aria-label="Ver todas as tendências catalogadas no mercado"
            >
              <span>Ver todas</span>
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
            </button>
          </div>

          {/* Estado de Carregamento (Loading Skeleton) */}
          {isLoading ? (
            <div className="space-y-4 py-2" aria-busy="true" aria-label="Carregando tendências">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-outline-variant/20 dark:border-slate-700/60 animate-pulse space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                  <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : trends.length === 0 ? (
            /* Estado Vazio (Empty State Enriquecido - Capítulo 19 do Guia UX/UI) */
            <div className="py-12 px-4 text-center flex flex-col items-center justify-center space-y-3" role="status">
              <div className="w-14 h-14 rounded-2xl bg-surface-container dark:bg-slate-700/60 flex items-center justify-center text-on-surface-variant dark:text-slate-400">
                <span className="material-symbols-outlined text-[32px]">insights</span>
              </div>
              <h3 className="text-sm font-bold text-on-surface dark:text-slate-100">
                Nenhuma tendência cadastrada no momento
              </h3>
              <p className="text-xs text-on-surface-variant dark:text-slate-400 max-w-sm">
                O pipeline inteligente está pronto para sincronizar novos nichos ou você pode cadastrar uma oportunidade manualmente.
              </p>
              <button
                onClick={() => onNavigate('pesquisar-tendencias')}
                type="button"
                className="mt-2 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow hover:bg-primary-hover min-h-[44px]"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Explorar Base de Tendências</span>
              </button>
            </div>
          ) : (
            /* Lista de Tendências com Touch Targets Confortáveis */
            <div className="flex flex-col divide-y divide-surface-container dark:divide-slate-700/60" role="feed">
              {trends.slice(0, 4).map((trend) => (
                <article key={trend.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 group">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-metric-mono font-bold bg-secondary-container dark:bg-emerald-950/60 text-on-secondary-container dark:text-emerald-400">
                        {trend.growth}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[11px] bg-surface-container dark:bg-slate-700 text-on-surface dark:text-slate-200 font-medium">
                        {trend.category}
                      </span>
                      <span className="text-[11px] font-metric-mono text-on-surface-variant dark:text-slate-400">
                        {trend.volume}
                      </span>

                      {/* Botão de Auditoria com Touch Target Acessível (>= 44px de área de clique) */}
                      <button
                        type="button"
                        onClick={() => setSelectedAuditTrend(trend)}
                        className="min-h-[44px] min-w-[44px] inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-primary dark:text-indigo-400 hover:text-primary-hover dark:hover:text-indigo-300 font-bold hover:underline rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        title="Ver dados de auditoria, volume e proveniência"
                        aria-label={`Ver auditoria de dados para o nicho ${trend.keyword}`}
                      >
                        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">verified</span>
                        <span>Origem</span>
                      </button>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-on-surface dark:text-slate-100 group-hover:text-primary dark:group-hover:text-indigo-300 transition-colors">
                      {trend.keyword}
                    </h3>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400 line-clamp-1">
                      {trend.summary}
                    </p>
                  </div>

                  {/* Ações e Score da Tendência (Touch target >= 44px) */}
                  <div className="flex items-center justify-between sm:justify-end gap-3.5 flex-shrink-0 pt-2 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-metric-mono uppercase tracking-wider text-on-surface-variant dark:text-slate-400 block font-semibold">
                        Score
                      </span>
                      <span className="text-sm sm:text-base font-bold text-primary dark:text-indigo-400 font-metric-mono">
                        {trend.score}/10
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onQuickSearch(trend.keyword);
                        onNavigate('gerar-ideias');
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container dark:bg-slate-700 hover:bg-primary hover:text-white text-on-surface dark:text-slate-200 text-xs font-bold transition-all min-h-[44px] shadow-sm active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                      type="button"
                      aria-label={`Criar estrutura de e-book em PDF para o nicho ${trend.keyword}`}
                    >
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">auto_awesome</span>
                      <span>Criar PDF</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Coluna Direita: Modelos Prontos & Dica Editorial (4 cols) */}
        <section
          className="lg:col-span-4 bg-surface-container-lowest dark:bg-slate-800/90 rounded-2xl shadow-sm border border-outline-variant/20 dark:border-slate-700/60 p-5 sm:p-6 flex flex-col gap-4 transition-colors"
          aria-labelledby="titulo-modelos-prontos"
        >
          <div className="flex items-center justify-between pb-3.5 border-b border-surface-container dark:border-slate-700">
            <div>
              <h2 id="titulo-modelos-prontos" className="text-base font-bold text-on-surface dark:text-slate-100 tracking-tight">
                Modelos Prontos
              </h2>
              <span className="text-xs text-on-surface-variant dark:text-slate-400">Sumários modelados</span>
            </div>
            <button
              onClick={() => onNavigate('ideias-salvas')}
              className="text-primary dark:text-indigo-400 hover:text-primary-hover dark:hover:text-indigo-300 text-xs font-bold hover:underline min-h-[44px] px-2 rounded-lg flex items-center transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              type="button"
              aria-label="Abrir biblioteca completa de ideias salvas"
            >
              Biblioteca
            </button>
          </div>

          {/* Estado de Carregamento e Estado Vazio da Biblioteca */}
          {isLoading ? (
            <div className="space-y-3 py-2" aria-busy="true">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-outline-variant/20 dark:border-slate-700/60 animate-pulse space-y-2">
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : ideas.length === 0 ? (
            <div className="py-8 px-3 text-center flex flex-col items-center justify-center space-y-2.5" role="status">
              <div className="w-12 h-12 rounded-2xl bg-surface-container dark:bg-slate-700/60 flex items-center justify-center text-on-surface-variant dark:text-slate-400">
                <span className="material-symbols-outlined text-[26px]">bookmark_add</span>
              </div>
              <h3 className="text-xs font-bold text-on-surface dark:text-slate-100">
                Nenhum modelo salvo ainda
              </h3>
              <p className="text-[11px] text-on-surface-variant dark:text-slate-400 max-w-xs">
                Estruture seu primeiro sumário de 10 capítulos com inteligência artificial preditiva.
              </p>
              <button
                onClick={() => onNavigate('gerar-ideias')}
                type="button"
                className="mt-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow hover:bg-primary-hover min-h-[44px]"
              >
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span>Gerar Primeiro Modelo</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3" role="list">
              {ideas.slice(0, 3).map((idea) => (
                <div
                  key={idea.id}
                  onClick={() => onOpenSummary(idea)}
                  className="p-3.5 rounded-xl bg-surface-container-low dark:bg-slate-900/60 hover:bg-surface-container dark:hover:bg-slate-700/50 border border-transparent hover:border-outline-variant/30 dark:hover:border-slate-700 transition-all cursor-pointer space-y-1.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none min-h-[44px]"
                  tabIndex={0}
                  role="button"
                  aria-label={`Abrir sumário detalhado de 10 capítulos do infoproduto: ${idea.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenSummary(idea);
                    }
                  }}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-metric-mono font-bold text-primary dark:text-indigo-400">
                      {idea.suggestedPrice}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-surface-container dark:bg-slate-700 text-on-surface-variant dark:text-slate-300 font-medium">
                      {idea.formatType}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-on-surface dark:text-slate-100 line-clamp-2 leading-snug">
                    {idea.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant dark:text-slate-400 pt-1">
                    <span>10 capítulos estruturados</span>
                    <span className="material-symbols-outlined text-[16px] text-primary dark:text-indigo-400" aria-hidden="true">
                      chevron_right
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Dica de Conversão Editorial */}
          <aside className="bg-primary/5 dark:bg-primary/10 border border-primary/15 dark:border-primary/20 rounded-xl p-4 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-primary dark:text-indigo-400">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">lightbulb</span>
              <span>Dica de Monetização 2026</span>
            </div>
            <p className="text-on-surface-variant dark:text-slate-400 leading-relaxed text-[11px]">
              Adicionar um <strong>Order Bump</strong> de R$ 19,90 com fichas imprimíveis ou planilhas complementares aumenta o lucro líquido por pedido em até 38%.
            </p>
          </aside>
        </section>
      </div>

      {/* 5. Banner de Oportunidade Preditiva (Hierarquia Clara e CTA Confortável) */}
      <section
        className="relative overflow-hidden bg-gradient-to-r from-primary to-indigo-700 text-white rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6"
        aria-labelledby="banner-gerador-titulo"
      >
        <div className="space-y-2.5 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">psychology</span>
            <span>Algoritmo Preditivo Editorial</span>
          </div>
          <h2 id="banner-gerador-titulo" className="text-lg sm:text-xl md:text-2xl font-extrabold leading-tight tracking-tight">
            Descubra micro-nichos inexplorados com o Gerador de Ideias
          </h2>
          <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
            Nossa inteligência cruza volumes de busca e ausência de concorrentes diretos para estruturar infoprodutos completos em PDF com sumário e precificação estratégica.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 flex-shrink-0">
          <button
            onClick={() => onNavigate('gerar-ideias')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-primary hover:bg-slate-50 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] text-center min-h-[48px] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            type="button"
            aria-label="Ir para o Gerador de Ideias e modelar novos infoprodutos"
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
          onSelectTrendForIdea={(keyword) => {
            onQuickSearch(keyword);
            onNavigate('gerar-ideias');
          }}
        />
      )}
    </div>
  );
}
