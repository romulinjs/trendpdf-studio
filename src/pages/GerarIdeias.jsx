import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { geminiService } from '../services/geminiService';
import { pdfService } from '../services/pdfService';
import SkeletonCard from '../components/SkeletonCard';

export default function GerarIdeias({
  prefilledNiche,
  prefilledAudience,
  onOpenSummary,
  onOpenPublish,
  onToggleSaveIdea,
  onNavigateToSaved,
  onShowToast,
  onDeductCredit
}) {
  const [niche, setNiche] = useState(prefilledNiche || 'Educação Financeira Infantil & Mesada Educativa');
  const [audience, setAudience] = useState(prefilledAudience || 'Mães e Pais de Crianças (6 a 12 anos)');
  const [angle, setAngle] = useState('Prático & Gamificado (Lúdico)');
  const [selectedFormat, setSelectedFormat] = useState('Todos (Mix Otimizado)');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const formatPills = [
    'Todos (Mix Otimizado)',
    'E-book Guia',
    'Planner Imprimível',
    'Caderno Gamificado',
    'Checklists & Fichas',
  ];

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!niche.trim()) {
      setErrorMessage('Por favor, informe um nicho ou palavra-chave para gerar as ideias.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      const ideas = await geminiService.generateIdeasForNiche(niche, audience, angle, selectedFormat);
      setGeneratedIdeas(ideas);
      setHasGenerated(true);

      if (onDeductCredit) {
        onDeductCredit(1);
      }

      if (onShowToast) {
        onShowToast({
          type: 'success',
          title: 'Ideias Geradas!',
          message: `${ideas.length} novos conceitos de infoprodutos modelados com sucesso.`,
        });
      }

      // Trigger celebration
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}
    } catch (err) {
      console.error('Erro ao gerar ideias:', err);
      setErrorMessage('Ocorreu um erro temporário ao gerar as ideias. Tente novamente.');
      if (onShowToast) {
        onShowToast({
          type: 'error',
          title: 'Falha na geração',
          message: 'Não foi possível gerar os conceitos. Verifique sua conexão.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = (idea) => {
    try {
      const filename = pdfService.generateIdeaPDF(idea);
      if (onShowToast) {
        onShowToast({
          type: 'success',
          title: 'PDF Baixado',
          message: `Arquivo ${filename} exportado com sucesso!`,
        });
      }
    } catch {
      if (onShowToast) {
        onShowToast({
          type: 'error',
          title: 'Erro de exportação',
          message: 'Falha ao compilar o PDF.',
        });
      }
    }
  };

  return (
    <div className="flex flex-col w-full gap-space-lg sm:gap-space-xl pb-16">
      {/* 1. Page Header with Context Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-on-surface-variant dark:text-slate-400 font-medium">
            <span>Estúdio Editorial</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary dark:text-primary-fixed-dim font-semibold">Gerador de Ideias</span>
          </nav>

          <h1 className="font-headline-xl text-xl sm:text-2xl lg:text-3xl font-bold text-on-surface dark:text-slate-100 tracking-tight">
            Gerador de Ideias de PDFs
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 leading-relaxed">
            Transforme tendências de mercado, lacunas de concorrência e dores reais de audiência em infoprodutos e e-books lucrativos de alta conversão.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto flex-shrink-0">
          <div className="flex items-center gap-1.5 bg-surface-container-lowest dark:bg-slate-800 px-3 py-1.5 rounded-xl shadow-sm text-on-surface-variant dark:text-slate-300 text-xs border border-outline-variant/30 dark:border-slate-700">
            <span className="material-symbols-outlined text-secondary dark:text-emerald-400 text-[16px]">verified</span>
            <span className="text-on-surface dark:text-slate-200 font-semibold">Créditos de IA:</span>
            <span>84 / 100 este mês</span>
          </div>
        </div>
      </div>

      {/* 2. Configuration & Parameters Box */}
      <section className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl shadow-sm p-4 sm:p-6 space-y-4 border border-outline-variant/30 dark:border-slate-700 relative overflow-hidden transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-surface-container dark:border-slate-700 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-surface-container dark:bg-slate-700 flex items-center justify-center text-primary dark:text-primary-fixed-dim flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-on-surface dark:text-slate-100">
                Parâmetros de Geração Preditiva
              </h2>
              <p className="text-[11px] sm:text-xs text-on-surface-variant dark:text-slate-400">
                Refine o contexto e os gatilhos psicológicos para modelar formatos de alta aceitação comercial.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 font-metric-mono text-on-surface-variant dark:text-slate-400 bg-surface-container-low dark:bg-slate-900 px-2 py-0.5 rounded text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-emerald-400"></span>
            Pipeline v3.4 Conectado
          </span>
        </div>

        {/* Error Alert if validation fails */}
        {errorMessage && (
          <div role="alert" className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-[18px] text-red-600 dark:text-red-400 flex-shrink-0">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Inputs Form */}
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-start">
            {/* Niche Input */}
            <div className="md:col-span-2 lg:col-span-6 space-y-1">
              <label htmlFor="input-nicho" className="text-xs font-semibold text-on-surface dark:text-slate-200 flex items-center justify-between">
                <span>Nicho, assunto ou problema de mercado <span className="text-error">*</span></span>
                <button
                  type="button"
                  onClick={() => setNiche('Produtividade Notion & Second Brain para TDAH')}
                  className="text-[11px] text-primary dark:text-primary-fixed-dim cursor-pointer hover:underline font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded"
                >
                  Sugerir outro
                </button>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant dark:text-slate-400 text-[18px] pointer-events-none select-none">
                  search
                </span>
                <input
                  id="input-nicho"
                  value={niche}
                  onChange={(e) => {
                    setNiche(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full bg-surface-container-low dark:bg-slate-900 text-on-surface dark:text-slate-100 text-xs sm:text-sm pl-9 pr-4 py-2.5 rounded-lg outline-none focus:bg-surface-container-lowest dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-outline-variant/40 dark:focus:border-slate-700 min-h-[44px]"
                  placeholder="Ex: Finanças para Autônomos, Ansiedade em Concursos..."
                  type="text"
                  required
                />
              </div>
              <p className="text-[11px] text-on-surface-variant dark:text-slate-400">
                Baseado em volumes de buscas reais e tendências do Google Trends.
              </p>
            </div>

            {/* Audience Selector */}
            <div className="lg:col-span-3 space-y-1">
              <label htmlFor="select-publico" className="text-xs font-semibold text-on-surface dark:text-slate-200 block">
                Público-Alvo Prioritário
              </label>
              <div className="relative">
                <select
                  id="select-publico"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full bg-surface-container-low dark:bg-slate-900 text-on-surface dark:text-slate-100 text-xs sm:text-sm px-3 py-2.5 rounded-lg outline-none focus:bg-surface-container-lowest dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer border border-transparent focus:border-outline-variant/40 dark:focus:border-slate-700 appearance-none pr-8 min-h-[44px]"
                >
                  <option>Mães e Pais de Crianças (6 a 12 anos)</option>
                  <option>Pais de primeira viagem (0 a 3 anos)</option>
                  <option>Profissionais Liberais e Autônomos</option>
                  <option>Estudantes Universitários e Concurseiros</option>
                  <option>Casais & Famílias</option>
                  <option>Empreendedores Digitais e Micro-SaaS</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-3 text-on-surface-variant dark:text-slate-400 text-[18px] pointer-events-none">
                  expand_more
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant dark:text-slate-400">
                Determina o tom de voz e profundidade das páginas.
              </p>
            </div>

            {/* Angle Selector */}
            <div className="lg:col-span-3 space-y-1">
              <label htmlFor="select-angulo" className="text-xs font-semibold text-on-surface dark:text-slate-200 block">
                Abordagem & Ângulo
              </label>
              <div className="relative">
                <select
                  id="select-angulo"
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                  className="w-full bg-surface-container-low dark:bg-slate-900 text-on-surface dark:text-slate-100 text-xs sm:text-sm px-3 py-2.5 rounded-lg outline-none focus:bg-surface-container-lowest dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer border border-transparent focus:border-outline-variant/40 dark:focus:border-slate-700 appearance-none pr-8 min-h-[44px]"
                >
                  <option>Prático & Gamificado (Lúdico)</option>
                  <option>Iniciante / Passo a Passo Direto</option>
                  <option>Guia Completo de Especialista / Científico</option>
                  <option>Minimalista / Rápida Implementação</option>
                  <option>Executivo / Foco em Monetização</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-3 text-on-surface-variant dark:text-slate-400 text-[18px] pointer-events-none">
                  expand_more
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant dark:text-slate-400">
                Prioriza dinâmicas visuais e exercícios rápidos.
              </p>
            </div>
          </div>

          {/* Formats Pills & Submit Button */}
          <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-surface-container dark:border-slate-700">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-on-surface-variant dark:text-slate-400 font-semibold mr-1">Formato:</span>
              {formatPills.map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    selectedFormat === fmt
                      ? 'bg-primary-container text-on-primary shadow-sm'
                      : 'bg-surface-container dark:bg-slate-700/60 text-on-surface-variant dark:text-slate-300 hover:text-on-surface dark:hover:text-white hover:bg-surface-container-high dark:hover:bg-slate-700'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow-sm hover:opacity-95 transition-all active:scale-[0.98] disabled:opacity-50 flex-shrink-0 min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <span className={`material-symbols-outlined text-[18px] ${loading ? 'animate-spin' : ''}`}>
                {loading ? 'autorenew' : 'auto_awesome'}
              </span>
              <span>{loading ? 'Modelando Conceitos...' : 'Gerar Ideias de Alta Conversão'}</span>
            </button>
          </div>
        </form>
      </section>

      {/* 3. Results Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100">
              {hasGenerated ? 'Ideias Geradas para o Nicho' : 'Conceitos Modelados em Destaque'}
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-metric-mono bg-primary-container text-on-primary font-bold">
              {loading ? '...' : (generatedIdeas.length > 0 ? generatedIdeas.length : 2)}
            </span>
          </div>
          <span className="text-[11px] sm:text-xs text-on-surface-variant dark:text-slate-400">
            Base: Validação Kiwify, Hotmart e Amazon KDP
          </span>
        </div>

        {/* Skeleton Loading State when AI is generating */}
        {loading && (
          <div className="grid grid-cols-1 gap-space-md">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* Generated or Default Cards */}
        {!loading && (
          <div className="grid grid-cols-1 gap-space-md">
            {(generatedIdeas.length > 0 ? generatedIdeas : [
              {
                id: "INF-2024-88A",
                title: "Mesada Inteligente: Como Criar Filhos Prósperos sem Birras",
                format: "E-book Estratégico + Fichas (68 págs)",
                score: 9.4,
                suggestedPrice: "R$ 47,00",
                orderBump: "R$ 19,90 (Fichas Imprimíveis)",
                targetAudience: "Mães e Pais de Crianças (6 a 12 anos)",
                corePain: "Dificuldade em ensinar valor do dinheiro e birras em lojas/jogos",
                whySellNow: "O termo 'como dar mesada' cresceu 140% no último trimestre; quase não há materiais digitais bem diagramados.",
                description: "Método em 4 fases para ensinar limites, poupança ativa, consumo consciente e empreendedorismo caseiro para crianças sem cobranças cansativas.",
                saved: true,
                chapters: [
                  { number: 1, title: "A Psicologia do Dinheiro na Infância" },
                  { number: 2, title: "O Erro Fatal dos Potes Transparentes" },
                  { number: 3, title: "A Regra das 3 Caixas: Gastar, Guardar e Doar" },
                  { number: 4, title: "Mesada não é Salário: Divisão de tarefas" },
                  { number: 5, title: "Como Lidar com o Pedido Constante" },
                  { number: 6, title: "Roblox, V-Bucks e Microtransações digitais" },
                  { number: 7, title: "O Mini-Empreendedor: 5 projetos de fim de semana" },
                  { number: 8, title: "Diálogo Aberto sem Culpa" },
                  { number: 9, title: "Do Cofrinho à Primeira Conta Digital" },
                  { number: 10, title: "Plano de Ação de 30 Dias em Família" }
                ]
              },
              {
                id: "INF-2024-89B",
                title: "O Grande Desafio do Cofrinho: 30 Atividades e Desafios Visuais de Finanças",
                format: "Caderno de Atividades Gamificado (52 págs)",
                score: 9.1,
                suggestedPrice: "R$ 34,90",
                orderBump: "R$ 14,90 (Certificado de Investidor)",
                targetAudience: "Mães educadoras, Homeschoolers & Tias",
                corePain: "Excesso de tempo de telas e falta de atividades educativas analógicas",
                whySellNow: "Cadernos lúdicos para imprimir têm baixíssima taxa de reembolso (<1%) e alto poder de compartilhamento visual.",
                description: "Passaporte interativo com missões semanais: colorir cédulas, cálculo do mercadinho em quadrinhos, labirintos da poupança e adesivos de conquista.",
                saved: true,
                chapters: [
                  { number: 1, title: "Passaporte Oficial do Pequeno Poupador" },
                  { number: 2, title: "A Árvore do Dinheiro: Ficha ilustrada" },
                  { number: 3, title: "Desafio das 52 Moedas" },
                  { number: 4, title: "O Supermercado dos Bichos" },
                  { number: 5, title: "Quero ou Preciso?: O jogo das cartas" },
                  { number: 6, title: "Labirinto da Poupança" },
                  { number: 7, title: "A Meta dos 6 Meses ilustrada" },
                  { number: 8, title: "Dia da Generosidade: Fichas de doação" },
                  { number: 9, title: "O Quiz dos Campeões Financeiros" },
                  { number: 10, title: "Certificado Oficial de Formatura" }
                ]
              }
            ]).map((idea) => (
              <article
                key={idea.id}
                className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6 flex flex-col justify-between space-y-4 border border-outline-variant/30 dark:border-slate-700 group"
              >
                <div className="space-y-3">
                  {/* Badges & Score */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-primary-fixed dark:bg-indigo-950 text-on-primary-fixed-variant dark:text-indigo-300">
                        {idea.format}
                      </span>
                      <span className="px-2 py-0.5 rounded-md font-metric-mono text-xs bg-secondary-container dark:bg-emerald-950/60 text-on-secondary-container dark:text-emerald-400 font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px]">trending_up</span>
                        Score {idea.score}/10
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        onToggleSaveIdea(idea.id, idea);
                        if (onShowToast) {
                          onShowToast({
                            type: idea.saved ? 'info' : 'success',
                            message: idea.saved ? 'Ideia removida dos salvos.' : 'Ideia adicionada à Biblioteca Editorial.',
                          });
                        }
                      }}
                      className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed-dim p-2 rounded-lg hover:bg-surface-container dark:hover:bg-slate-700 transition-colors flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                      title={idea.saved ? 'Remover dos salvos' : 'Salvar ideia'}
                      aria-label={idea.saved ? 'Remover dos salvos' : 'Salvar ideia'}
                      type="button"
                    >
                      <span className={`material-symbols-outlined text-[22px] ${idea.saved ? 'text-primary dark:text-primary-fixed-dim' : ''}`}>
                        {idea.saved ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100 group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors leading-snug">
                      {idea.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed">
                      {idea.description}
                    </p>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                    <div className="bg-surface-container-low dark:bg-slate-900/60 p-2 rounded-lg">
                      <span className="text-on-surface-variant dark:text-slate-400 block text-[10px] font-medium">Público Primário</span>
                      <span className="font-semibold text-on-surface dark:text-slate-200 truncate block">{idea.targetAudience}</span>
                    </div>
                    <div className="bg-surface-container-low dark:bg-slate-900/60 p-2 rounded-lg">
                      <span className="text-on-surface-variant dark:text-slate-400 block text-[10px] font-medium">Dor Resolvida</span>
                      <span className="font-semibold text-on-surface dark:text-slate-200 truncate block">{idea.corePain}</span>
                    </div>
                    <div className="bg-surface-container-low dark:bg-slate-900/60 p-2 rounded-lg">
                      <span className="text-on-surface-variant dark:text-slate-400 block text-[10px] font-medium">Ticket Sugerido</span>
                      <span className="font-semibold text-primary dark:text-primary-fixed-dim">{idea.suggestedPrice}</span>
                    </div>
                    <div className="bg-surface-container-low dark:bg-slate-900/60 p-2 rounded-lg">
                      <span className="text-on-surface-variant dark:text-slate-400 block text-[10px] font-medium">Order Bump</span>
                      <span className="font-semibold text-secondary dark:text-emerald-400 truncate block">{idea.orderBump}</span>
                    </div>
                  </div>

                  {/* Opportunity Rationale */}
                  <div className="bg-surface-container dark:bg-slate-900/80 px-3 py-2 rounded-lg text-xs flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[17px] flex-shrink-0 mt-0.5">
                      insights
                    </span>
                    <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                      <strong className="text-on-surface dark:text-slate-100">Por que vender agora:</strong> {idea.whySellNow}
                    </p>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-2 border-t border-surface-container dark:border-slate-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => onOpenSummary(idea)}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-primary-container text-on-primary font-semibold text-xs hover:bg-primary transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">format_list_numbered</span>
                      <span>Ver Sumário & 10 Capítulos</span>
                    </button>
                    <button
                      onClick={() => handleExportPDF(idea)}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-surface-container dark:bg-slate-700 text-on-surface-variant dark:text-slate-200 hover:text-on-surface dark:hover:text-white font-semibold text-xs transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">file_download</span>
                      <span>Exportar Briefing (PDF)</span>
                    </button>
                    {onOpenPublish && (
                      <button
                        onClick={() => onOpenPublish(idea)}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-surface-container-high dark:bg-slate-700/80 hover:bg-primary hover:text-white text-on-surface dark:text-slate-200 font-semibold text-xs transition-all min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary group-hover:text-white">rocket_launch</span>
                        <span>Publicar</span>
                      </button>
                    )}
                  </div>
                  <span className="font-metric-mono text-[11px] text-on-surface-variant dark:text-slate-400 text-right">
                    ID: {idea.id}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. Next Steps Banner */}
      <section className="bg-surface-container dark:bg-slate-800 rounded-xl p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-outline-variant/20 dark:border-slate-700">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-1 text-primary dark:text-primary-fixed-dim text-xs font-bold">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Aceleração Editorial</span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-on-surface dark:text-slate-100">
            Gostou das ideias geradas para este nicho?
          </h3>
          <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
            Envie os conceitos selecionados para sua aba de <strong className="text-on-surface dark:text-slate-200">Ideias Salvas</strong> ou baixe imediatamente o arquivo PDF do briefing completo pronto para diagramar ou publicar.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
          <button
            onClick={onNavigateToSaved}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-surface-container-lowest dark:bg-slate-900 text-on-surface dark:text-slate-100 hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors text-xs font-bold shadow-sm inline-flex items-center justify-center gap-1.5 min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            type="button"
          >
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[18px]">bookmark</span>
            <span>Ir para Ideias Salvas</span>
          </button>
        </div>
      </section>
    </div>
  );
}
