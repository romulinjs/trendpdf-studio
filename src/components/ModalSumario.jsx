import React, { useState, useEffect } from 'react';
import { pdfService } from '../services/pdfService';

export default function ModalSumario({ idea, onClose, onToggleSave, onShowToast }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Close on Escape key (Nielsen Heuristics: User control & freedom)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!idea) return null;

  const handleCopyOutline = () => {
    const text = `SUMÁRIO ESTRUTURADO — ${idea.title.toUpperCase()}
Formato: ${idea.format} | Ticket Sugerido: ${idea.suggestedPrice}
Público: ${idea.targetAudience}

ESTRUTURA DE CAPÍTULOS:
${idea.chapters.map((c) => `Capítulo ${c.number}: ${c.title}`).join('\n')}

Por Que Vender Agora:
${idea.whySellNow}
`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Copiado com sucesso',
        message: 'Sumário completo de 10 capítulos copiado para a área de transferência.',
      });
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPDF = () => {
    setDownloading(true);
    try {
      const filename = pdfService.generateIdeaPDF(idea);
      if (onShowToast) {
        onShowToast({
          type: 'success',
          title: 'PDF Gerado',
          message: `Arquivo ${filename} baixado com sucesso!`,
        });
      }
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      if (onShowToast) {
        onShowToast({
          type: 'error',
          title: 'Erro ao gerar PDF',
          message: 'Houve uma falha ao compilar o arquivo. Tente novamente.',
        });
      }
    } finally {
      setTimeout(() => setDownloading(false), 600);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-summary-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-on-surface/50 dark:bg-black/70 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-3xl bg-surface-container-lowest dark:bg-slate-800 rounded-2xl shadow-2xl border border-outline-variant/30 dark:border-slate-700 flex flex-col max-h-[92vh] overflow-hidden transition-colors">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-surface-container dark:border-slate-700 flex items-start justify-between bg-surface-container-low/50 dark:bg-slate-900/60 gap-2">
          <div className="space-y-1 max-w-[85%]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-metric-mono font-semibold bg-primary-fixed dark:bg-indigo-950 text-on-primary-fixed-variant dark:text-indigo-300">
                {idea.format}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-metric-mono font-bold bg-secondary-container dark:bg-emerald-950/60 text-on-secondary-container dark:text-emerald-400">
                Score {idea.score}/10
              </span>
              <span className="text-[11px] font-metric-mono text-on-surface-variant dark:text-slate-400">
                ID: {idea.id}
              </span>
            </div>
            <h2 id="modal-summary-title" className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100 tracking-tight leading-snug">
              {idea.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white hover:bg-surface-container dark:hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            title="Fechar modal (Esc)"
            aria-label="Fechar modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Commercial Briefing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-surface-container-low dark:bg-slate-900/70 p-3 rounded-xl text-xs">
            <div>
              <span className="text-on-surface-variant dark:text-slate-400 font-medium block text-[10px]">PÚBLICO-ALVO</span>
              <span className="font-semibold text-on-surface dark:text-slate-200">{idea.targetAudience}</span>
            </div>
            <div>
              <span className="text-on-surface-variant dark:text-slate-400 font-medium block text-[10px]">TICKET SUGERIDO</span>
              <span className="font-semibold text-primary dark:text-primary-fixed-dim">{idea.suggestedPrice}</span>
            </div>
            <div>
              <span className="text-on-surface-variant dark:text-slate-400 font-medium block text-[10px]">MARGEM ESTIMADA</span>
              <span className="font-semibold text-secondary dark:text-emerald-400">{idea.profitMargin}</span>
            </div>
          </div>

          {/* Core Reason */}
          <div className="p-3 rounded-xl bg-surface-container dark:bg-slate-900/50 text-xs text-on-surface-variant dark:text-slate-300 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[20px] flex-shrink-0 mt-0.5">
              lightbulb
            </span>
            <div>
              <strong className="text-on-surface dark:text-slate-100 block font-semibold mb-0.5">Por que este conteúdo converte:</strong>
              <span className="leading-relaxed">{idea.whySellNow}</span>
            </div>
          </div>

          {/* Chapters List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <h3 className="text-xs sm:text-sm font-bold text-on-surface dark:text-slate-100 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[18px]">format_list_numbered</span>
                Sumário Completo de 10 Capítulos
              </h3>
              <span className="text-[11px] text-on-surface-variant dark:text-slate-400">Pronto para redação ou diagramação</span>
            </div>

            <div className="space-y-1.5 divide-y divide-surface-container dark:divide-slate-700">
              {idea.chapters?.map((chap) => (
                <div key={chap.number} className="pt-2 flex items-start gap-2.5 group">
                  <span className="w-5 h-5 rounded-md bg-surface-container dark:bg-slate-700 group-hover:bg-primary-container group-hover:text-on-primary text-primary dark:text-primary-fixed-dim font-metric-mono text-xs font-bold flex items-center justify-center flex-shrink-0 transition-colors">
                    {chap.number}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-on-surface dark:text-slate-200 font-medium leading-relaxed">
                      {chap.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 sm:px-6 py-3 border-t border-surface-container dark:border-slate-700 bg-surface-container-low/40 dark:bg-slate-900/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onToggleSave) onToggleSave(idea.id, idea);
                if (onShowToast) {
                  onShowToast({
                    type: idea.saved ? 'info' : 'success',
                    message: idea.saved ? 'Ideia removida dos salvos.' : 'Ideia adicionada à Biblioteca Editorial.',
                  });
                }
              }}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                idea.saved
                  ? 'bg-secondary-container dark:bg-emerald-950/60 text-on-secondary-container dark:text-emerald-400'
                  : 'bg-surface-container dark:bg-slate-700 text-on-surface-variant dark:text-slate-300 hover:text-on-surface dark:hover:text-white'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {idea.saved ? 'bookmark_added' : 'bookmark_border'}
              </span>
              <span>{idea.saved ? 'Salvo' : 'Salvar'}</span>
            </button>
            <button
              onClick={handleCopyOutline}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-surface-container dark:bg-slate-700 text-on-surface-variant dark:text-slate-300 hover:text-on-surface dark:hover:text-white text-xs font-semibold transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-bold text-xs shadow-sm hover:opacity-95 transition-all active:scale-[0.98] min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:opacity-60"
              type="button"
            >
              <span className={`material-symbols-outlined text-[18px] ${downloading ? 'animate-spin' : ''}`}>
                {downloading ? 'autorenew' : 'download'}
              </span>
              <span>{downloading ? 'Gerando Documento...' : 'Baixar Briefing em PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
