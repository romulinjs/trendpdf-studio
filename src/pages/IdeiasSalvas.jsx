import React, { useState } from 'react';
import { pdfService } from '../services/pdfService';
import ModalConfirmacao from '../components/ModalConfirmacao';

export default function IdeiasSalvas({
  ideas,
  onOpenSummary,
  onOpenPublish,
  onToggleSaveIdea,
  onDeleteIdea,
  onNavigateToGenerate,
  onShowToast
}) {
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [ideaToDelete, setIdeaToDelete] = useState(null);

  const savedIdeas = ideas.filter((i) => i.saved);

  const filtered = savedIdeas.filter((idea) => {
    const matchStatus = statusFilter === 'Todos' || idea.status === statusFilter;
    const matchSearch =
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.targetAudience.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.format.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const exportCSV = () => {
    if (savedIdeas.length === 0) return;
    const headers = [
      'ID',
      'Titulo',
      'Formato',
      'Preco_Sugerido',
      'Order_Bump',
      'Score',
      'Status',
      'Publico_Alvo'
    ];
    const rows = savedIdeas.map((i) => [
      `"${i.id}"`,
      `"${i.title.replace(/"/g, '""')}"`,
      `"${i.format}"`,
      `"${i.suggestedPrice}"`,
      `"${i.orderBump}"`,
      `"${i.score}"`,
      `"${i.status}"`,
      `"${i.targetAudience}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ideias_salvas_trendpdf.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();

    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Exportação Concluída',
        message: 'Arquivo CSV com a biblioteca de infoprodutos exportado com sucesso.',
      });
    }
  };

  const handleExportSinglePDF = (idea) => {
    try {
      const filename = pdfService.generateIdeaPDF(idea);
      if (onShowToast) {
        onShowToast({
          type: 'success',
          title: 'PDF Exportado',
          message: `Arquivo ${filename} baixado com sucesso.`,
        });
      }
    } catch {
      if (onShowToast) {
        onShowToast({
          type: 'error',
          title: 'Erro na exportação',
          message: 'Não foi possível gerar o PDF.',
        });
      }
    }
  };

  const confirmDelete = () => {
    if (ideaToDelete) {
      onDeleteIdea(ideaToDelete.id);
      if (onShowToast) {
        onShowToast({
          type: 'info',
          title: 'Ideia Removida',
          message: 'O infoproduto foi removido da sua biblioteca.',
        });
      }
      setIdeaToDelete(null);
    }
  };

  return (
    <div className="flex flex-col w-full gap-space-lg sm:gap-space-xl pb-16">
      {/* 1. Header with Breadcrumb */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-on-surface-variant dark:text-slate-400 font-medium">
            <span>Estúdio Editorial</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary dark:text-primary-fixed-dim font-semibold">Ideias Salvas</span>
          </nav>

          <h1 className="font-headline-xl text-xl sm:text-2xl lg:text-3xl font-bold text-on-surface dark:text-slate-100 tracking-tight">
            Ideias Salvas & Prontas para Produção
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 max-w-3xl leading-relaxed">
            Gerencie, edite e acompanhe os conceitos de PDFs validados pela IA para criação ágil de produtos digitais, e-books e kits imprimíveis.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
          <button
            onClick={exportCSV}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-200 text-xs font-semibold shadow-sm hover:bg-surface-container dark:hover:bg-slate-700 transition-all border border-outline-variant/30 dark:border-slate-700 min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant dark:text-slate-400">download</span>
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={onNavigateToGenerate}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary text-xs font-bold shadow-sm hover:opacity-95 transition-all min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span>Gerar Mais Ideias</span>
          </button>
        </div>
      </div>

      {/* 2. Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl p-4 shadow-sm border border-outline-variant/20 dark:border-slate-700/60 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant dark:text-slate-400 uppercase tracking-wider font-semibold">Total Salvas</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container dark:bg-slate-700 flex items-center justify-center text-primary dark:text-primary-fixed-dim">
              <span className="material-symbols-outlined text-[18px]">bookmark</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-on-surface dark:text-slate-100">{savedIdeas.length}</div>
            <div className="text-xs text-secondary dark:text-emerald-400 font-semibold mt-1">Prontas para desenvolvimento</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl p-4 shadow-sm border border-outline-variant/20 dark:border-slate-700/60 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant dark:text-slate-400 uppercase tracking-wider font-semibold">Em Produção</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container dark:bg-slate-700 flex items-center justify-center text-secondary dark:text-emerald-400">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-on-surface dark:text-slate-100">
              {savedIdeas.filter((i) => i.status === 'Pronto para Produção').length}
            </div>
            <div className="text-xs text-on-surface-variant dark:text-slate-400 mt-1">Sumário de 10 capítulos validado</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl p-4 shadow-sm border border-outline-variant/20 dark:border-slate-700/60 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant dark:text-slate-400 uppercase tracking-wider font-semibold">Ticket Médio</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container dark:bg-slate-700 flex items-center justify-center text-primary dark:text-primary-fixed-dim">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-primary dark:text-primary-fixed-dim">R$ 42,90</div>
            <div className="text-xs text-secondary dark:text-emerald-400 font-semibold mt-1">+ R$ 18,00 méd. em Order Bumps</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl p-4 shadow-sm border border-outline-variant/20 dark:border-slate-700/60 flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant dark:text-slate-400 uppercase tracking-wider font-semibold">Score Médio</span>
            <div className="w-8 h-8 rounded-lg bg-surface-container dark:bg-slate-700 flex items-center justify-center text-secondary dark:text-emerald-400">
              <span className="material-symbols-outlined text-[18px]">star</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-on-surface dark:text-slate-100">9.2 / 10</div>
            <div className="text-xs text-on-surface-variant dark:text-slate-400 mt-1">Índice preditivo de conversão</div>
          </div>
        </div>
      </div>

      {/* 3. Filters & Search */}
      <div className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl shadow-sm border border-outline-variant/30 dark:border-slate-700 p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 transition-colors">
        <div className="relative flex-1 flex items-center bg-surface-container-low dark:bg-slate-900 rounded-lg px-3 py-2 min-h-[44px]">
          <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 text-[18px] mr-2 flex-shrink-0">
            search
          </span>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar entre as ideias salvas por título, público ou formato..."
            className="w-full min-w-0 bg-transparent border-none outline-none text-xs sm:text-sm text-on-surface dark:text-slate-100 placeholder:text-on-surface-variant/60 dark:placeholder:text-slate-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white rounded"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {['Todos', 'Pronto para Produção', 'Rascunho', 'Em Validação'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                statusFilter === st
                  ? 'bg-primary-container text-on-primary shadow-sm'
                  : 'bg-surface-container dark:bg-slate-700/60 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-700 hover:text-on-surface dark:hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Saved Ideas Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {filtered.map((idea) => (
          <div
            key={idea.id}
            className="bg-surface-container-lowest dark:bg-slate-800/90 rounded-xl shadow-sm border border-outline-variant/30 dark:border-slate-700 p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-primary/40 dark:hover:border-primary/50 transition-all group"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-surface-container dark:bg-slate-700 text-primary dark:text-primary-fixed-dim">
                  {idea.format}
                </span>
                <span className="text-xs font-metric-mono font-bold text-secondary dark:text-emerald-400">
                  Score {idea.score}/10
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-on-surface dark:text-slate-100 group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors leading-snug">
                {idea.title}
              </h3>

              <p className="text-xs text-on-surface-variant dark:text-slate-300 line-clamp-2 leading-relaxed">
                {idea.description}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="bg-surface-container-low dark:bg-slate-900/60 p-2 rounded">
                  <span className="text-on-surface-variant dark:text-slate-400 block text-[10px] font-medium">TICKET</span>
                  <span className="font-bold text-primary dark:text-primary-fixed-dim">{idea.suggestedPrice}</span>
                </div>
                <div className="bg-surface-container-low dark:bg-slate-900/60 p-2 rounded">
                  <span className="text-on-surface-variant dark:text-slate-400 block text-[10px] font-medium">PÚBLICO</span>
                  <span className="font-semibold text-on-surface dark:text-slate-200 truncate block">{idea.targetAudience}</span>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 border-t border-surface-container dark:border-slate-700 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => onOpenSummary(idea)}
                  className="px-3 py-2 rounded-lg bg-primary-container text-on-primary text-xs font-semibold hover:bg-primary transition-colors inline-flex items-center gap-1 min-h-[40px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <span className="material-symbols-outlined text-[16px]">format_list_numbered</span>
                  <span>Sumário</span>
                </button>
                <button
                  onClick={() => handleExportSinglePDF(idea)}
                  className="px-3 py-2 rounded-lg bg-surface-container dark:bg-slate-700 text-on-surface-variant dark:text-slate-200 hover:text-on-surface dark:hover:text-white text-xs font-semibold transition-colors inline-flex items-center gap-1 min-h-[40px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  title="Baixar PDF"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>PDF</span>
                </button>
                {onOpenPublish && (
                  <button
                    onClick={() => onOpenPublish(idea)}
                    className="px-3 py-2 rounded-lg bg-primary/10 dark:bg-primary/20 hover:bg-primary hover:text-white text-primary dark:text-indigo-300 text-xs font-semibold transition-all inline-flex items-center gap-1 min-h-[40px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                    title="Publicar no Kiwify, Hotmart ou Amazon KDP"
                  >
                    <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                    <span>Publicar</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setIdeaToDelete(idea)}
                className="text-error hover:bg-error/10 dark:hover:bg-rose-950/40 p-2 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1 min-h-[40px] focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
                title="Remover dos salvos"
                aria-label={`Excluir ideia ${idea.title}`}
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full bg-surface-container-lowest dark:bg-slate-800/90 rounded-2xl p-8 sm:p-14 text-center border border-outline-variant/30 dark:border-slate-700 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-fixed-dim mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">bookmark_border</span>
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100">
                {savedIdeas.length === 0 ? 'Sua biblioteca de infoprodutos está vazia' : 'Nenhuma ideia corresponde aos filtros atuais'}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 leading-relaxed">
                {savedIdeas.length === 0
                  ? 'Utilize o gerador de ideias para modelar produtos digitais validados e salve-os aqui para gerenciar a produção.'
                  : 'Tente alterar os termos da busca ou selecionar outro status.'}
              </p>
            </div>
            <button
              onClick={onNavigateToGenerate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary text-xs font-bold shadow-sm hover:opacity-95 transition-all min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>+ Gerar Minha Primeira Ideia</span>
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Dialog before deleting */}
      <ModalConfirmacao
        isOpen={!!ideaToDelete}
        title="Remover infoproduto da biblioteca?"
        message={`Tem certeza que deseja remover "${ideaToDelete?.title}" das suas ideias salvas? Essa ação não pode ser desfeita.`}
        confirmText="Sim, remover"
        isDestructive={true}
        onConfirm={confirmDelete}
        onCancel={() => setIdeaToDelete(null)}
      />
    </div>
  );
}
