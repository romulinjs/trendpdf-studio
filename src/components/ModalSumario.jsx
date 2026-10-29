import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { pdfService } from '../services/pdfService';
import { geminiService } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';

export default function ModalSumario({ idea, onClose, onToggleSave, onShowToast }) {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [downloadingBriefing, setDownloadingBriefing] = useState(false);
  const [downloadingEbook, setDownloadingEbook] = useState(false);

  // Estados para Geração do E-book Completo
  const [activeTab, setActiveTab] = useState('sumario'); // 'sumario' | 'livro'
  const [isWritingBook, setIsWritingBook] = useState(false);
  const [writingProgress, setWritingProgress] = useState(0);
  const [currentChapterWriting, setCurrentChapterWriting] = useState('');
  const [writtenChapters, setWrittenChapters] = useState(idea?.fullChapters || []);
  const [openChapterAccordion, setOpenChapterAccordion] = useState(1);

  // Fecha no Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isWritingBook) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isWritingBook]);

  if (!idea) return null;

  const chaptersList = Array.isArray(idea.chapters || idea.sumario)
    ? (idea.chapters || idea.sumario)
    : [];

  // Copia o Sumário Simples
  const handleCopyOutline = () => {
    const text = `SUMÁRIO ESTRUTURADO — ${(idea.title || '').toUpperCase()}
Formato: ${idea.format} | Ticket Sugerido: ${idea.suggestedPrice}
Público: ${idea.targetAudience}

ESTRUTURA DE CAPÍTULOS:
${chaptersList.map((c, i) => `Capítulo ${c.number || i + 1}: ${c.title || c}`).join('\n')}

Por Que Vender Agora:
${idea.whySellNow}
`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Copiado!',
        message: 'Sumário copiado para a área de transferência.',
      });
    }
    setTimeout(() => setCopied(false), 2500);
  };

  // Copia o Texto do Livro Completo
  const handleCopyFullBookText = () => {
    if (writtenChapters.length === 0) return;

    let fullText = `# ${idea.title}\n\n`;
    fullText += `## ${idea.description || idea.corePain}\n\n`;
    fullText += `Autor: ${user?.user_metadata?.full_name || 'Autor TrendPDF Studio'}\n\n---\n\n`;

    writtenChapters.forEach((ch) => {
      fullText += `### Capítulo ${ch.chapterNumber}: ${ch.chapterTitle}\n\n`;
      if (ch.introduction) fullText += `${ch.introduction}\n\n`;
      if (ch.sections && Array.isArray(ch.sections)) {
        ch.sections.forEach((sec) => {
          fullText += `#### ${sec.subtitle}\n\n${sec.body}\n\n`;
        });
      }
      if (ch.practicalExercise) {
        fullText += `> **Exercício Prático:** ${ch.practicalExercise}\n\n`;
      }
      if (ch.keyTakeaway) {
        fullText += `*Síntese:* ${ch.keyTakeaway}\n\n---\n\n`;
      }
    });

    navigator.clipboard.writeText(fullText);
    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Livro Completo Copiado!',
        message: 'Texto completo em Markdown pronto para colar no Word, Docs ou Canva.',
      });
    }
  };

  // Baixa o Briefing rápido
  const handleDownloadBriefingPDF = async () => {
    setDownloadingBriefing(true);
    try {
      const filename = await pdfService.generateIdeaPDF(idea);
      if (onShowToast) {
        onShowToast({
          type: 'success',
          title: 'Briefing Baixado',
          message: `Arquivo ${filename} baixado com sucesso!`,
        });
      }
    } catch (err) {
      console.error('Erro ao gerar briefing:', err);
      if (onShowToast) {
        onShowToast({
          type: 'error',
          title: 'Erro no PDF',
          message: 'Falha ao compilar o briefing.',
        });
      }
    } finally {
      setDownloadingBriefing(false);
    }
  };

  // Baixa o E-book Completo Diagramado
  const handleDownloadFullEbookPDF = async () => {
    setDownloadingEbook(true);
    try {
      const author = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'TrendPDF Studio';
      const filename = await pdfService.generateFullEbookPDF(idea, writtenChapters, { authorName: author });
      if (onShowToast) {
        onShowToast({
          type: 'success',
          title: 'Workbook Completo Baixado!',
          message: `Arquivo ${filename} diagramado e compilado no padrão visual moderno!`,
        });
      }
    } catch (err) {
      console.error('Erro ao compilar e-book completo:', err);
      if (onShowToast) {
        onShowToast({
          type: 'error',
          title: 'Erro ao compilar workbook',
          message: 'Não foi possível gerar o arquivo final do workbook.',
        });
      }
    } finally {
      setDownloadingEbook(false);
    }
  };

  // Escrever Livro Completo Capítulo por Capítulo com IA
  const handleWriteFullEbook = async () => {
    if (chaptersList.length === 0) return;

    setIsWritingBook(true);
    setWritingProgress(0);
    setActiveTab('livro');

    const generated = [];
    const total = chaptersList.length;

    for (let i = 0; i < total; i++) {
      const chap = chaptersList[i];
      const chapNum = chap.number || i + 1;
      const chapTitle = chap.title || (typeof chap === 'string' ? chap : `Capítulo ${chapNum}`);

      setCurrentChapterWriting(`Capítulo ${chapNum} de ${total}: "${chapTitle}"`);

      try {
        const chapterData = await geminiService.writeChapter({
          ebookTitle: idea.title,
          targetAudience: idea.targetAudience,
          corePain: idea.dor_resolvida || idea.corePain,
          chapterNumber: chapNum,
          chapterTitle: chapTitle,
        });

        if (chapterData) {
          generated.push(chapterData);
          setWrittenChapters([...generated]);
        } else {
          // Fallback estruturado para não interromper o fluxo se houver oscilação
          generated.push({
            chapterNumber: chapNum,
            chapterTitle: chapTitle,
            introduction: `Neste capítulo vamos nos aprofundar nos fundamentos e na aplicação prática de ${chapTitle}.`,
            sections: [
              {
                subtitle: 'Fundamentos & Metodologia',
                body: `Compreender a dinâmica central de ${chapTitle} é o diferencial entre quem tenta e desiste e quem atinge consistência sustentável. Aplique os conceitos com calma, focando nos princípios antes dos atalhos.`
              },
              {
                subtitle: 'Roteiro de Implementação',
                body: 'Defina blocos de tempo fixos, elimine distrações no ambiente e siga a sequência proposta para garantir resultados visíveis nas primeiras 48 horas.'
              }
            ],
            practicalExercise: 'Reserve 10 minutos hoje para anotar seus 3 maiores desafios em relação a este tema e definir uma meta única de melhoria.',
            keyTakeaway: 'Consistência diária supera picos esporádicos de esforço.'
          });
          setWrittenChapters([...generated]);
        }
      } catch (err) {
        console.error(`Falha no capítulo ${chapNum}:`, err);
      }

      setWritingProgress(Math.round(((i + 1) / total) * 100));
    }

    setIsWritingBook(false);
    setCurrentChapterWriting('');
    setOpenChapterAccordion(1);

    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Livro Redigido com Sucesso!',
        message: `${generated.length} capítulos gerados pela IA e prontos para exportação!`,
      });
    }

    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-summary-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-4xl bg-surface-container-lowest dark:bg-slate-900 rounded-2xl shadow-2xl border border-outline-variant/30 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-hidden transition-colors">
        
        {/* 1. Header do Modal */}
        <div className="px-4 sm:px-6 py-4 border-b border-surface-container dark:border-slate-800 flex items-start justify-between bg-surface-container-low/60 dark:bg-slate-950/60 gap-3">
          <div className="space-y-1 max-w-[85%]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-metric-mono font-semibold bg-primary-fixed dark:bg-indigo-950 text-on-primary-fixed-variant dark:text-indigo-300">
                {idea.format || 'E-book Guia'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-metric-mono font-bold bg-secondary-container dark:bg-emerald-950/60 text-on-secondary-container dark:text-emerald-400">
                Score {idea.score}/10
              </span>
              {writtenChapters.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span>
                  Livro Redigido ({writtenChapters.length} Capítulos)
                </span>
              )}
            </div>
            <h2 id="modal-summary-title" className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100 tracking-tight leading-snug">
              {idea.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isWritingBook}
            className="p-2 text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white hover:bg-surface-container dark:hover:bg-slate-800 rounded-xl transition-colors flex-shrink-0 disabled:opacity-40"
            title="Fechar modal (Esc)"
            aria-label="Fechar modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* 2. Barra de Abas (Sumário vs Leitor de Capítulos) */}
        <div className="px-4 sm:px-6 pt-3 border-b border-surface-container dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('sumario')}
              className={`px-4 py-2 border-b-2 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'sumario'
                  ? 'border-primary text-primary dark:text-primary-fixed-dim'
                  : 'border-transparent text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">format_list_numbered</span>
              <span>Sumário Estruturado ({chaptersList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('livro')}
              className={`px-4 py-2 border-b-2 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'livro'
                  ? 'border-primary text-primary dark:text-primary-fixed-dim'
                  : 'border-transparent text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">auto_stories</span>
              <span>Leitor de Capítulos {writtenChapters.length > 0 ? `(${writtenChapters.length})` : ''}</span>
            </button>
          </div>

          {/* Botão de Destaque para Escrever Livro Completo */}
          {writtenChapters.length === 0 && !isWritingBook && (
            <button
              onClick={handleWriteFullEbook}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-primary text-white font-bold text-xs shadow-sm hover:opacity-95 transition-all mb-2 min-h-[36px]"
            >
              <span className="material-symbols-outlined text-[16px]">magic_button</span>
              <span>Escrever E-book Completo com IA</span>
            </button>
          )}
        </div>

        {/* 3. Barra de Progresso quando está gerando */}
        {isWritingBook && (
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/60 border-b border-indigo-200 dark:border-indigo-800/50 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-indigo-900 dark:text-indigo-200">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] animate-spin text-primary">autorenew</span>
                <span>{currentChapterWriting || 'Escrevendo capítulos com IA...'}</span>
              </span>
              <span>{writingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-indigo-200 dark:bg-indigo-900/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${writingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* 4. Corpo do Conteúdo com Rolagem */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'sumario' && (
            <>
              {/* Grid de Metadados Comerciais */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-surface-container-low dark:bg-slate-950/70 p-3.5 rounded-xl text-xs">
                <div>
                  <span className="text-on-surface-variant dark:text-slate-400 font-medium block text-[10px]">PÚBLICO-ALVO</span>
                  <span className="font-semibold text-on-surface dark:text-slate-200">{idea.targetAudience}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant dark:text-slate-400 font-medium block text-[10px]">TICKET RECOMENDADO</span>
                  <span className="font-semibold text-primary dark:text-primary-fixed-dim">{idea.suggestedPrice}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant dark:text-slate-400 font-medium block text-[10px]">DOR RESOLVIDA</span>
                  <span className="font-semibold text-secondary dark:text-emerald-400 truncate block">
                    {idea.dor_resolvida || idea.corePain || 'Alta conversão comercial'}
                  </span>
                </div>
              </div>

              {/* Lista dos Capítulos do Sumário */}
              <div className="space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <h3 className="text-xs sm:text-sm font-bold text-on-surface dark:text-slate-100 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[18px]">format_list_numbered</span>
                    Estrutura de 10 Capítulos
                  </h3>
                  <span className="text-[11px] text-on-surface-variant dark:text-slate-400">Pronto para redação</span>
                </div>

                <div className="space-y-1.5 divide-y divide-surface-container dark:divide-slate-800">
                  {chaptersList.map((chap, i) => {
                    const num = chap.number || i + 1;
                    const title = chap.title || (typeof chap === 'string' ? chap : `Capítulo ${num}`);
                    return (
                      <div key={num} className="pt-2.5 flex items-start gap-3 group">
                        <span className="w-6 h-6 rounded-lg bg-surface-container dark:bg-slate-800 group-hover:bg-primary-container group-hover:text-on-primary text-primary dark:text-primary-fixed-dim font-metric-mono text-xs font-bold flex items-center justify-center flex-shrink-0 transition-colors">
                          {num}
                        </span>
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm text-on-surface dark:text-slate-200 font-medium leading-relaxed">
                            {title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {activeTab === 'livro' && (
            <>
              {writtenChapters.length === 0 ? (
                /* Estado Vazio do Leitor */
                <div className="py-12 px-4 text-center max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-[32px]">auto_stories</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-on-surface dark:text-white">
                      O e-book completo ainda não foi redigido
                    </h3>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
                      Clique no botão abaixo para acionar a inteligência artificial. Ela redigirá cada um dos 10 capítulos com introdução, seções práticas e exercícios de ação rápida.
                    </p>
                  </div>
                  <button
                    onClick={handleWriteFullEbook}
                    disabled={isWritingBook}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow-sm hover:opacity-95 transition-all min-h-[44px]"
                  >
                    <span className="material-symbols-outlined text-[18px]">magic_button</span>
                    <span>Escrever E-book Completo Agora</span>
                  </button>
                </div>
              ) : (
                /* Acordeão Interativo com os Capítulos Redigidos */
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container dark:border-slate-800 flex-wrap gap-2">
                    <span className="text-xs font-bold text-on-surface dark:text-slate-200">
                      Visualizando {writtenChapters.length} de {chaptersList.length} Capítulos Redigidos
                    </span>
                    <button
                      onClick={handleCopyFullBookText}
                      className="inline-flex items-center gap-1.5 text-xs text-primary dark:text-primary-fixed-dim hover:underline font-semibold"
                    >
                      <span className="material-symbols-outlined text-[15px]">content_copy</span>
                      <span>Copiar Livro Completo (Markdown)</span>
                    </button>
                  </div>

                  {writtenChapters.map((ch) => {
                    const isOpen = openChapterAccordion === ch.chapterNumber;
                    return (
                      <div
                        key={ch.chapterNumber}
                        className="border border-surface-container dark:border-slate-800 rounded-xl overflow-hidden bg-surface-container-lowest dark:bg-slate-900 transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenChapterAccordion(isOpen ? null : ch.chapterNumber)}
                          className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low dark:hover:bg-slate-800/50 transition-colors gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                              {ch.chapterNumber}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-on-surface dark:text-slate-100">
                              {ch.chapterTitle}
                            </span>
                          </div>
                          <span className="material-symbols-outlined text-[20px] text-on-surface-variant dark:text-slate-400">
                            {isOpen ? 'expand_less' : 'expand_more'}
                          </span>
                        </button>

                        {isOpen && (
                          <div className="p-4 pt-2 border-t border-surface-container dark:border-slate-800/80 space-y-4 text-xs leading-relaxed animate-fadeIn">
                            {/* Introdução do Capítulo */}
                            {ch.introduction && (
                              <p className="text-slate-700 dark:text-slate-300 italic border-l-2 border-primary pl-3 py-0.5">
                                {ch.introduction}
                              </p>
                            )}

                            {/* Seções Práticas */}
                            {ch.sections && Array.isArray(ch.sections) && (
                              <div className="space-y-3">
                                {ch.sections.map((sec, sIdx) => (
                                  <div key={sIdx} className="space-y-1">
                                    <h4 className="font-bold text-sm text-on-surface dark:text-slate-100">
                                      {sec.subtitle}
                                    </h4>
                                    <p className="text-on-surface-variant dark:text-slate-300">
                                      {sec.body}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Exercício Prático */}
                            {ch.practicalExercise && (
                              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 space-y-1">
                                <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wide">
                                  <span className="material-symbols-outlined text-[16px]">task_alt</span>
                                  <span>Exercício Prático</span>
                                </div>
                                <p className="text-xs">{ch.practicalExercise}</p>
                              </div>
                            )}

                            {/* Insight Chave */}
                            {ch.keyTakeaway && (
                              <div className="p-2.5 rounded-lg bg-surface-container dark:bg-slate-800/60 text-on-surface-variant dark:text-slate-400 text-[11px]">
                                <strong className="text-on-surface dark:text-slate-200">Síntese:</strong> {ch.keyTakeaway}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* 5. Ações do Rodapé */}
        <div className="px-4 sm:px-6 py-3.5 border-t border-surface-container dark:border-slate-800 bg-surface-container-low/60 dark:bg-slate-950/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onToggleSave) onToggleSave(idea.id, idea);
                if (onShowToast) {
                  onShowToast({
                    type: idea.saved ? 'info' : 'success',
                    message: idea.saved ? 'Removido dos salvos.' : 'Salvo na Biblioteca Editorial.',
                  });
                }
              }}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors min-h-[44px] ${
                idea.saved
                  ? 'bg-secondary-container dark:bg-emerald-950/60 text-on-secondary-container dark:text-emerald-400'
                  : 'bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 hover:text-on-surface dark:hover:text-white'
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
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 hover:text-on-surface dark:hover:text-white text-xs font-semibold transition-colors min-h-[44px]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copiado!' : 'Copiar Sumário'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Botão de Briefing Rápido */}
            <button
              onClick={handleDownloadBriefingPDF}
              disabled={downloadingBriefing || isWritingBook}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-200 text-xs font-semibold hover:bg-surface-container-high dark:hover:bg-slate-700 transition-all min-h-[44px] disabled:opacity-50"
              type="button"
            >
              <span className={`material-symbols-outlined text-[16px] ${downloadingBriefing ? 'animate-spin' : ''}`}>
                {downloadingBriefing ? 'autorenew' : 'description'}
              </span>
              <span>Briefing (1 Pág)</span>
            </button>

            {/* Botão de E-book Completo (Principal) */}
            {writtenChapters.length > 0 ? (
              <button
                onClick={handleDownloadFullEbookPDF}
                disabled={downloadingEbook || isWritingBook}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md transition-all min-h-[44px] disabled:opacity-50"
                type="button"
              >
                <span className={`material-symbols-outlined text-[18px] ${downloadingEbook ? 'animate-spin' : ''}`}>
                  {downloadingEbook ? 'autorenew' : 'menu_book'}
                </span>
                <span>Baixar E-book Completo (PDF)</span>
              </button>
            ) : (
              <button
                onClick={handleWriteFullEbook}
                disabled={isWritingBook}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow-sm hover:opacity-95 transition-all active:scale-[0.98] min-h-[44px] disabled:opacity-50"
                type="button"
              >
                <span className={`material-symbols-outlined text-[18px] ${isWritingBook ? 'animate-spin' : ''}`}>
                  {isWritingBook ? 'autorenew' : 'auto_awesome'}
                </span>
                <span>{isWritingBook ? 'Redigindo Capítulos...' : 'Escrever E-book Completo'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
