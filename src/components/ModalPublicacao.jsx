import React, { useState, useEffect } from 'react';

export default function ModalPublicacao({ idea, isOpen, onClose, onShowToast }) {
  const [activeTab, setActiveTab] = useState('kiwify'); // 'kiwify' | 'amazon' | 'salescopy'
  const [copiedKey, setCopiedKey] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !idea) return null;

  const copyToClipboard = (text, keyName, label) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Copiado para a Área de Transferência',
        message: `${label} copiado com sucesso!`,
      });
    }
    setTimeout(() => setCopiedKey(''), 2500);
  };

  // 1. Dados Formatados para Kiwify / Hotmart
  const kiwifyPackageText = `=== PACOTE DE PUBLICAÇÃO KIWIFY / HOTMART ===
Nome do Produto: ${idea.title}
Formato: ${idea.format}
Preço de Venda Principal: ${idea.suggestedPrice}
Público-Alvo: ${idea.targetAudience}

OFERTA DE ORDER BUMP:
Título do Order Bump: ${idea.orderBump}
Preço do Order Bump: ${idea.orderBumpPrice || 'R$ 19,90'}
Chamada no Checkout: "Marque esta caixa para adicionar o kit complementar com desconto especial nesta compra única."

DESCRIÇÃO COMERCIAL DO PRODUTO:
${idea.description || idea.whySellNow}

ESTRUTURA DE ENTREGA (CONTEÚDO DO PDF):
${idea.chapters ? idea.chapters.map((c) => `- Cap. ${c.number || ''}: ${c.title}`).join('\n') : ''}
`;

  // 2. Dados Formatados para Amazon KDP
  const amazonKdpText = `=== DADOS DE PUBLICAÇÃO AMAZON KDP ===
Título do Livro: ${idea.title.split(':')[0] || idea.title}
Subtítulo: ${idea.title.split(':')[1]?.trim() || 'Guia Prático Passo a Passo'}
Autor / Editor: TrendPDF Studio Author

7 PALAVRAS-CHAVE INDEXADAS (KDP KEYWORDS):
1. ${idea.category || 'infoproduto digital'}
2. ${idea.targetAudience.split(' ')[0]} guia pratico
3. como resolver ${idea.corePain || 'desafios'}
4. manual pdf passo a passo
5. exercicios e tecnicas
6. produtividade e foco
7. melhores praticas aplicadas

SINOPSE FORMATADA PARA A AMAZON (COM TAGS HTML):
<p><b>Você finalmente encontrou o guia definitivo que estava procurando.</b></p>
<p>${idea.description || idea.whySellNow}</p>
<p><b>O que você aprenderá neste e-book:</b></p>
<ul>
${idea.chapters ? idea.chapters.slice(0, 5).map((c) => `  <li><b>${c.title}:</b> Aplicação imediata no dia a dia.</li>`).join('\n') : ''}
</ul>
<p><i>Garanta agora seu exemplar e comece hoje mesmo a transformar seus resultados!</i></p>
`;

  // 3. Copy Completa de Página de Vendas
  const salesCopyText = `=== SCRIPT PERSUASIVO DA PÁGINA DE VENDAS ===
[HEADLINE MAGNÉTICA]:
"Como Superar ${idea.corePain || 'os Maiores Obstáculos'} e Conquistar Resultados Concretos sem Perder Tempo ou Dinheiro."

[SUBHEADLINE]:
Descubra o método testado em 10 capítulos que orienta ${idea.targetAudience} passo a passo.

[OS 3 GRANDES PROBLEMAS QUE VOCÊ ENFRENTA]:
1. Frustração por tentar métodos genéricos que não funcionam.
2. Sensação de sobrecarga e falta de um roteiro direto ao ponto.
3. Desperdício de energia sem saber o próximo passo seguro.

[A SOLUÇÃO DEFINITIVA — ${idea.title}]:
${idea.description}

[O QUE VOCÊ VAI RECEBER]:
- E-book completo diagramado em PDF de alta qualidade.
- 10 Capítulos estruturados com exercícios e planos de ação.
- Bônus exclusivo: ${idea.orderBump} (Oferta especial).

[GARANTIA INCONDICIONAL DE 7 DIAS]:
Se por qualquer motivo você não amar este material, basta enviar um e-mail em até 7 dias e devolveremos 100% do seu investimento. Risco zero.
`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="publish-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 dark:bg-black/80 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-surface-container-lowest dark:bg-slate-800 rounded-2xl shadow-2xl border border-outline-variant/30 dark:border-slate-700 max-w-2xl w-full max-h-[90vh] flex flex-col animate-scaleUp transition-colors overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-surface-container dark:border-slate-700 flex items-start justify-between gap-4 bg-surface-container-low/40 dark:bg-slate-800/60">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-indigo-400">
                Esteira de Publicação & Vendas
              </span>
            </div>
            <h2 id="publish-modal-title" className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100 truncate">
              {idea.title}
            </h2>
            <p className="text-xs text-on-surface-variant dark:text-slate-400">
              Copie os pacotes de cadastro prontos para lançar seu infoproduto nas principais plataformas.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar janela de publicação"
            type="button"
            className="p-1.5 text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white rounded-lg hover:bg-surface-container dark:hover:bg-slate-700 transition-colors flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Channel Switcher Tabs */}
        <div className="flex items-center gap-1 p-2 bg-surface-container-low dark:bg-slate-900 border-b border-surface-container dark:border-slate-700 overflow-x-auto">
          <button
            onClick={() => setActiveTab('kiwify')}
            type="button"
            className={`flex-1 min-w-[140px] py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'kiwify'
                ? 'bg-surface-container-lowest dark:bg-slate-800 text-primary dark:text-indigo-300 shadow-sm'
                : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
            <span>Kiwify & Hotmart</span>
          </button>

          <button
            onClick={() => setActiveTab('amazon')}
            type="button"
            className={`flex-1 min-w-[140px] py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'amazon'
                ? 'bg-surface-container-lowest dark:bg-slate-800 text-primary dark:text-indigo-300 shadow-sm'
                : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">auto_stories</span>
            <span>Amazon KDP</span>
          </button>

          <button
            onClick={() => setActiveTab('salescopy')}
            type="button"
            className={`flex-1 min-w-[140px] py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'salescopy'
                ? 'bg-surface-container-lowest dark:bg-slate-800 text-primary dark:text-indigo-300 shadow-sm'
                : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">campaign</span>
            <span>Copy de Vendas</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {activeTab === 'kiwify' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-slate-900 border border-outline-variant/30 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-on-surface dark:text-slate-100 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                    <span>Pacote de Cadastro de Checkout</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(kiwifyPackageText, 'kiwify', 'Pacote Kiwify')}
                    type="button"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {copiedKey === 'kiwify' ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedKey === 'kiwify' ? 'Copiado!' : 'Copiar Tudo'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-surface-container dark:bg-slate-800">
                    <span className="text-on-surface-variant dark:text-slate-400 text-[10px] uppercase font-bold block">
                      Preço Principal Sugerido
                    </span>
                    <span className="text-base font-bold text-primary font-mono">{idea.suggestedPrice}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-container dark:bg-slate-800">
                    <span className="text-on-surface-variant dark:text-slate-400 text-[10px] uppercase font-bold block">
                      Order Bump Recomendado
                    </span>
                    <span className="text-base font-bold text-secondary font-mono">{idea.orderBumpPrice || 'R$ 19,90'}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-on-surface dark:text-slate-200 block">
                    Chamada de Order Bump:
                  </span>
                  <p className="p-2.5 rounded-lg bg-surface-container dark:bg-slate-800 text-xs text-on-surface-variant dark:text-slate-300">
                    {idea.orderBump}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-on-surface dark:text-slate-200 block">
                    Descrição Comercial (Pitch do Produto):
                  </span>
                  <p className="p-2.5 rounded-lg bg-surface-container dark:bg-slate-800 text-xs text-on-surface-variant dark:text-slate-300 leading-relaxed">
                    {idea.description || idea.whySellNow}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'amazon' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-slate-900 border border-outline-variant/30 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-on-surface dark:text-slate-100 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-500 text-[18px]">auto_stories</span>
                    <span>Metadados Amazon KDP (Kindle Direct Publishing)</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(amazonKdpText, 'amazon', 'Dados Amazon KDP')}
                    type="button"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {copiedKey === 'amazon' ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedKey === 'amazon' ? 'Copiado!' : 'Copiar KDP'}</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-on-surface-variant dark:text-slate-400 font-bold block">Título Formatado:</span>
                    <span className="font-semibold text-on-surface dark:text-slate-200">{idea.title}</span>
                  </div>

                  <div>
                    <span className="text-on-surface-variant dark:text-slate-400 font-bold block">
                      7 Palavras-Chave de Busca Recomendadas:
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['infoproduto pdf', 'guia pratico passo a passo', 'metodo simples', 'exercicios praticos', 'rotina e foco', 'como resolver', 'produtividade'].map((kw, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-surface-container dark:bg-slate-800 text-[11px] font-mono">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-on-surface-variant dark:text-slate-400 font-bold block">Sinopse HTML para Amazon:</span>
                    <pre className="p-3 rounded-lg bg-surface-container dark:bg-slate-800 text-[11px] font-mono text-on-surface-variant dark:text-slate-300 overflow-x-auto whitespace-pre-wrap">
                      {amazonKdpText.split('SINOPSE FORMATADA PARA A AMAZON (COM TAGS HTML):\n')[1]}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'salescopy' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-slate-900 border border-outline-variant/30 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-on-surface dark:text-slate-100 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[18px]">campaign</span>
                    <span>Estrutura de Página de Vendas de Alta Conversão</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(salesCopyText, 'salescopy', 'Copy de Vendas')}
                    type="button"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {copiedKey === 'salescopy' ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedKey === 'salescopy' ? 'Copiado!' : 'Copiar Copy'}</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-on-surface-variant dark:text-slate-300">
                  <div className="p-3 rounded-lg bg-surface-container dark:bg-slate-800 space-y-1">
                    <strong className="text-primary block font-bold">Headline Magnética:</strong>
                    <p className="text-on-surface dark:text-slate-100 font-semibold text-sm">
                      "Como Superar {idea.corePain || 'os Maiores Obstáculos'} e Conquistar Resultados Concretos sem Perder Tempo ou Dinheiro."
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-container dark:bg-slate-800 space-y-1">
                    <strong className="text-on-surface dark:text-slate-200 block font-bold">Público & Dor Aguda:</strong>
                    <p>{idea.targetAudience} • {idea.corePain}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-container dark:bg-slate-800 space-y-1">
                    <strong className="text-secondary dark:text-emerald-400 block font-bold">Garantia Blindada:</strong>
                    <p>7 dias incondicionais com reembolso integral via plataforma de pagamento.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-surface-container dark:border-slate-700 flex items-center justify-between gap-3 bg-surface-container-low/40 dark:bg-slate-800/60">
          <span className="text-xs text-on-surface-variant dark:text-slate-400">
            Compatível com Kiwify, Hotmart, Eduzz, Braip e Amazon KDP.
          </span>
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2 rounded-xl bg-surface-container dark:bg-slate-700 hover:bg-surface-container-high dark:hover:bg-slate-600 text-xs font-semibold text-on-surface dark:text-slate-200 transition-colors min-h-[40px]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

