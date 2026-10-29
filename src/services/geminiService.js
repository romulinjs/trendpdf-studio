/**
 * Serviço de Integração Editorial via Backend Seguro na Vercel (/api/generate e /api/write-chapter)
 * Nenhuma chave de API fica exposta no código client-side do navegador.
 */

export const geminiService = {
  /**
   * Envia os parâmetros editoriais para a Serverless Function protegida da Vercel.
   * Retorna o array de ideias modeladas ou null em caso de erro.
   */
  generateIdeasForNiche: async (niche, audience, angle, format) => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          niche: niche?.trim() || 'Produtividade & Organização',
          audience: audience || 'Público Geral',
          angle: angle || 'Prático & Direto',
          format: format || 'Todos (Mix Otimizado)',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Falha no servidor seguro /api/generate:', response.status, errorData);
        return null;
      }

      const ideas = await response.json();

      if (!Array.isArray(ideas) || ideas.length === 0) {
        console.warn('O servidor retornou formato inesperado de ideias:', ideas);
        return null;
      }

      return ideas;
    } catch (networkError) {
      console.error('Erro de conexão com o endpoint seguro da Vercel:', networkError);
      return null;
    }
  },

  /**
   * Redige o conteúdo completo, detalhado e prático de um capítulo individual via /api/write-chapter
   */
  writeChapter: async ({ ebookTitle, targetAudience, corePain, chapterNumber, chapterTitle }) => {
    try {
      const response = await fetch('/api/write-chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ebookTitle,
          targetAudience,
          corePain,
          chapterNumber,
          chapterTitle,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.error(`Erro ao gerar capítulo ${chapterNumber}:`, err);
        return null;
      }

      return await response.json();
    } catch (err) {
      console.error(`Falha de rede ao gerar capítulo ${chapterNumber}:`, err);
      return null;
    }
  },

  /**
   * Alias simplificado para geração direta apenas com o nicho
   */
  gerarIdeiaPDF: async (nicho) => {
    return geminiService.generateIdeasForNiche(nicho, 'Público Geral', 'Prático & Direto', 'E-book Guia');
  }
};

// Exportações nominais para conveniência
export const gerarIdeiaPDF = geminiService.gerarIdeiaPDF;
export const writeChapter = geminiService.writeChapter;
export default geminiService;
