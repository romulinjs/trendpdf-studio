import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function LandingPage({ theme, onThemeChange, onReturnToDashboard }) {
  const { openAuthModal } = useAuth();

  return (
    <div className="min-h-screen bg-background dark:bg-[#0b0f19] text-on-surface dark:text-slate-100 font-sans transition-colors duration-200 overflow-x-hidden">
      {/* 1. Header / Navbar - Solid background prevents scroll bleed-through & flex-nowrap prevents mobile header collapse */}
      <header className="sticky top-0 z-50 w-full bg-surface dark:bg-[#0b0f19] border-b border-outline-variant/30 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/25 shrink-0">
              <span className="material-symbols-outlined text-[22px] sm:text-[24px]">menu_book</span>
            </div>
            <div className="flex flex-col leading-tight shrink-0">
              <span className="font-bold text-sm sm:text-base lg:text-lg tracking-tight text-on-surface dark:text-slate-100 whitespace-nowrap">
                TrendPDF Studio
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono font-bold tracking-wider text-primary dark:text-indigo-400 whitespace-nowrap">
                AI Intelligence
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-semibold text-on-surface-variant dark:text-slate-300">
            <a href="#como-funciona" className="hover:text-primary dark:hover:text-white transition-colors">
              Como Funciona
            </a>
            <a href="#beneficios" className="hover:text-primary dark:hover:text-white transition-colors">
              Benefícios
            </a>
            <a href="#fontes" className="hover:text-primary dark:hover:text-white transition-colors">
              Dados Reais
            </a>
            <a href="#precos" className="hover:text-primary dark:hover:text-white transition-colors">
              Planos
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Theme Toggle Quick Button */}
            <button
              onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Alternar tema"
              type="button"
              aria-label="Alternar tema"
            >
              <span className="material-symbols-outlined text-[20px]">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {onReturnToDashboard ? (
              <button
                onClick={onReturnToDashboard}
                type="button"
                className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold shadow-md shadow-primary/25 transition-all min-h-[38px] sm:min-h-[40px] shrink-0 whitespace-nowrap"
              >
                <span>Acessar Painel</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => openAuthModal('login')}
                  type="button"
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-on-surface dark:text-slate-200 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors min-h-[38px] sm:min-h-[40px] shrink-0 whitespace-nowrap"
                >
                  Entrar
                </button>

                <button
                  onClick={() => openAuthModal('signup')}
                  type="button"
                  className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold shadow-md shadow-primary/25 transition-all active:scale-[0.98] min-h-[38px] sm:min-h-[40px] shrink-0 whitespace-nowrap"
                >
                  <span>Cadastrar</span>
                  <span className="material-symbols-outlined text-[16px] hidden sm:inline">arrow_forward</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-fixed/20 dark:bg-indigo-950/60 border border-primary/30 text-primary dark:text-indigo-300 text-xs sm:text-sm font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span>Inteligência Editorial & Análise de Busca 2026</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface dark:text-slate-100 leading-[1.15]">
            Transforme Tendências de Busca em <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
              Infoprodutos e E-books em PDF
            </span>{' '}
            Prontos para Vender.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-on-surface-variant dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Descubra picos de demanda no Google Trends e marketplaces, modele sumários de 10 capítulos com ganchos persuasivos usando IA e gere briefings executivos em PDF diagramados em menos de 3 minutos.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            {onReturnToDashboard ? (
              <button
                onClick={onReturnToDashboard}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm sm:text-base font-bold shadow-xl shadow-primary/30 transition-all hover:-translate-y-0.5 active:scale-[0.98] min-h-[48px]"
              >
                <span>Retornar ao Painel Studio</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('signup')}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm sm:text-base font-bold shadow-xl shadow-primary/30 transition-all hover:-translate-y-0.5 active:scale-[0.98] min-h-[48px]"
              >
                <span>Criar Conta e Receber 100 Créditos</span>
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </button>
            )}
          </div>

          {/* Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 pt-8 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-800/60 border border-outline-variant/20 dark:border-slate-700/60 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-primary font-mono block">94%</span>
              <span className="text-xs text-on-surface-variant dark:text-slate-400">Margem Líquida Média</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-800/60 border border-outline-variant/20 dark:border-slate-700/60 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-secondary font-mono block">&lt; 3 min</span>
              <span className="text-xs text-on-surface-variant dark:text-slate-400">Tempo de Validação</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-800/60 border border-outline-variant/20 dark:border-slate-700/60 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-on-surface dark:text-slate-100 font-mono block">10 Capítulos</span>
              <span className="text-xs text-on-surface-variant dark:text-slate-400">Sumários Prontos com IA</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-800/60 border border-outline-variant/20 dark:border-slate-700/60 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-primary font-mono block">100</span>
              <span className="text-xs text-on-surface-variant dark:text-slate-400">Créditos Grátis no Cadastro</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Social Proof / Fontes de Dados Reais */}
      <section id="fontes" className="py-10 border-y border-outline-variant/20 dark:border-slate-800 bg-surface-container-lowest/60 dark:bg-slate-900/60 transition-colors">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
          <p className="text-xs uppercase tracking-wider font-bold text-on-surface-variant dark:text-slate-400">
            Inteligência minerada em tempo real com dados de fontes primárias:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-80">
            <span className="px-3.5 py-1.5 rounded-lg bg-surface-container dark:bg-slate-800 text-xs font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">trending_up</span>
              Google Trends Brasil
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-surface-container dark:bg-slate-800 text-xs font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">search</span>
              Google Autocomplete API
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-surface-container dark:bg-slate-800 text-xs font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary">shopping_cart</span>
              Kiwify Marketplace
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-surface-container dark:bg-slate-800 text-xs font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-amber-500">local_fire_department</span>
              Hotmart Inteligência
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-surface-container dark:bg-slate-800 text-xs font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-indigo-400">auto_stories</span>
              Amazon Kindle (KDP)
            </span>
          </div>
        </div>
      </section>

      {/* 4. Como Funciona — 4 Passos Estratégicos */}
      <section id="como-funciona" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-wider font-bold text-primary dark:text-indigo-400">
            Esteira de Alta Conversão
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface dark:text-slate-100">
            Como o TrendPDF Studio acelera sua produção editorial
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 max-w-xl mx-auto">
            Uma esteira completa que elimina o bloqueio criativo e substitui semanas de incerteza por um infoproduto diagramado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-surface-container-lowest dark:bg-slate-800/80 border border-outline-variant/30 dark:border-slate-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-on-surface dark:text-slate-100">
              Mineração de Demanda
            </h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
              Descubra nichos inexplorados com alto volume de busca orgânica e concorrência inexistente no Brasil.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest dark:bg-slate-800/80 border border-outline-variant/30 dark:border-slate-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-on-surface dark:text-slate-100">
              Modelagem com IA
            </h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
              Gere briefings com título magnético, 10 capítulos com ganchos persuasivos, ticket sugerido e order bump calculado.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest dark:bg-slate-800/80 border border-outline-variant/30 dark:border-slate-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-on-surface dark:text-slate-100">
              Briefing & PDF Diagramado
            </h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
              Exporte em 1 clique um arquivo PDF diagramado com capa, métricas de mercado e estrutura completa pronto para redigir.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest dark:bg-slate-800/80 border border-outline-variant/30 dark:border-slate-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container dark:bg-slate-700 text-on-surface dark:text-slate-200 flex items-center justify-center font-bold text-sm">
              04
            </div>
            <h3 className="text-base font-bold text-on-surface dark:text-slate-100">
              Esteira de Publicação
            </h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
              Copie o pacote completo de lançamento para cadastrar no Kiwify, Hotmart ou Amazon KDP em minutos.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Comparativo Antes vs Depois */}
      <section id="beneficios" className="py-16 bg-surface-container-low/50 dark:bg-slate-900/40 border-y border-outline-variant/20 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface dark:text-slate-100">
              Por que infoprodutores escolhem o TrendPDF Studio?
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant dark:text-slate-400">
              A diferença entre criar produtos no escuro e lançar com validação prévia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* O jeito antigo */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest dark:bg-slate-800/60 border border-red-200/50 dark:border-rose-950/60 space-y-3">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">cancel</span>
                <span>O Jeito Tradicional</span>
              </div>
              <ul className="space-y-2.5 text-xs text-on-surface-variant dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-rose-500 mt-0.5">close</span>
                  <span>15 a 30 dias pesquisando manualmente em fóruns e redes sociais.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-rose-500 mt-0.5">close</span>
                  <span>Risco alto de criar um e-book completo que ninguém tem interesse em comprar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-rose-500 mt-0.5">close</span>
                  <span>Bloqueio de tela em branco para estruturar títulos e sumários persuasivos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-rose-500 mt-0.5">close</span>
                  <span>Dificuldade para precificar e bolar ofertas de order bump lucrativas.</span>
                </li>
              </ul>
            </div>

            {/* Com TrendPDF Studio */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest dark:bg-slate-800/60 border border-secondary/40 dark:border-emerald-800/40 space-y-3 shadow-lg shadow-secondary/5">
              <div className="flex items-center gap-2 text-secondary dark:text-emerald-400 font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Com o TrendPDF Studio</span>
              </div>
              <ul className="space-y-2.5 text-xs text-on-surface dark:text-slate-200 font-medium">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary dark:text-emerald-400 mt-0.5">done</span>
                  <span>Validação matemática em menos de 3 minutos com dados do Google Trends.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary dark:text-emerald-400 mt-0.5">done</span>
                  <span>Briefings estruturados em 10 capítulos com foco em dores reais do comprador.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary dark:text-emerald-400 mt-0.5">done</span>
                  <span>Download de arquivo PDF diagramado profissional com 1 clique.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary dark:text-emerald-400 mt-0.5">done</span>
                  <span>Esteira de publicação pronta para copiar direto no Kiwify ou Amazon.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Planos & Preços Transparentes */}
      <section id="precos" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-wider font-bold text-primary dark:text-indigo-400">
            Comece Gratuitamente
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface dark:text-slate-100">
            Escolha seu plano e comece a validar hoje
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant dark:text-slate-400">
            Cadastre-se e receba 100 créditos gratuitos imediatamente. Sem necessidade de cartão de crédito.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Plano Gratuito / Teste */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant/30 dark:border-slate-700 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400">
                Plano Gratuito
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-on-surface dark:text-slate-100">R$ 0</span>
                <span className="text-xs text-on-surface-variant dark:text-slate-400">/ grátis no cadastro</span>
              </div>
              <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
                Perfeito para testar a inteligência preditiva e criar seus primeiros infoprodutos.
              </p>
              <ul className="space-y-2 text-xs text-on-surface dark:text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>100 Créditos de IA preditiva</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Acesso a todas as tendências em alta</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Exportação de briefings em PDF</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Biblioteca com salvamento local e nuvem</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => openAuthModal('signup')}
              type="button"
              className="w-full py-3 rounded-xl border border-primary text-primary hover:bg-primary-fixed/20 dark:hover:bg-indigo-950 font-bold text-xs sm:text-sm transition-all min-h-[44px]"
            >
              Criar Conta Gratuita
            </button>
          </div>

          {/* Plano Pro */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-primary/10 via-surface-container-lowest to-surface-container-lowest dark:from-indigo-950/40 dark:via-slate-800 dark:to-slate-800 border-2 border-primary shadow-xl shadow-primary/10 flex flex-col justify-between space-y-6 relative">
            <span className="absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-bold bg-primary text-white uppercase tracking-wider shadow">
              Mais Popular
            </span>
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-indigo-300">
                Plano Pro Ilimitado
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-on-surface dark:text-slate-100">R$ 47</span>
                <span className="text-xs text-on-surface-variant dark:text-slate-400">/ mês</span>
              </div>
              <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
                Para infoprodutores, especialistas e agências que produzem em escala contínua.
              </p>
              <ul className="space-y-2 text-xs text-on-surface dark:text-slate-200 font-medium pt-2">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Geração Ilimitada de Ideias e Sumários</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Conexão direta com Google Gemini API</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Esteira de Publicação Kiwify & Amazon KDP</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check</span>
                  <span>Suporte prioritário a novos nichos</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => openAuthModal('signup')}
              type="button"
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs sm:text-sm shadow-md shadow-primary/25 transition-all min-h-[44px]"
            >
              Começar com Plano Pro
            </button>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-outline-variant/20 dark:border-slate-800 py-10 px-4 text-center space-y-3 bg-surface-container-low dark:bg-slate-900 transition-colors">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[14px]">menu_book</span>
          </div>
          <span className="font-bold text-sm text-on-surface dark:text-slate-100">TrendPDF Studio</span>
        </div>
        <p className="text-xs text-on-surface-variant dark:text-slate-400">
          © 2026 TrendPDF Studio AI Intelligence. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}

