import { storageService } from './storageService';

export const geminiService = {
  generateIdeasForNiche: async (niche, audience, angle, format) => {
    const settings = storageService.getSettings();
    const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || settings.geminiApiKey || '').trim();

    if (!apiKey) {
      throw new Error(
        'Chave da API do Google Gemini não configurada. Por favor, adicione sua Gemini API Key em "Configurações" ou defina VITE_GEMINI_API_KEY no arquivo .env.'
      );
    }

    const prompt = `Você é um estrategista editorial de elite especialista em criação e validação de infoprodutos e e-books em PDF.
Crie 3 ideias altamente lucrativas, inovadoras e detalhadas de produtos digitais em PDF para o seguinte mercado:
- Nicho/Assunto: "${niche}"
- Público-Alvo: "${audience}"
- Abordagem/Ângulo: "${angle}"
- Formato Desejado: "${format}"

Retorne ESTRITAMENTE um array JSON contendo 3 objetos no seguinte formato (sem formatação markdown extra fora do json):
[
  {
    "id": "INF-2026-01",
    "title": "Título magnético e persuasivo do PDF",
    "format": "Formato e número de páginas estimado (ex: Guia Prático + Checklists (55 págs))",
    "formatType": "E-book Guia",
    "category": "${niche}",
    "score": 9.3,
    "status": "Pronto para Produção",
    "suggestedPrice": "R$ 47,00",
    "orderBump": "R$ 19,90 (Fichas complementares)",
    "profitMargin": "95% Líquido",
    "targetAudience": "${audience}",
    "corePain": "Qual dor aguda e urgente este infoproduto resolve",
    "whySellNow": "Por que há alta demanda comercial agora",
    "description": "Resumo de 2 a 3 frases persuasivas sobre a proposta de valor do produto.",
    "chapters": [
      { "number": 1, "title": "Título do capítulo 1" },
      { "number": 2, "title": "Título do capítulo 2" },
      { "number": 3, "title": "Título do capítulo 3" },
      { "number": 4, "title": "Título do capítulo 4" },
      { "number": 5, "title": "Título do capítulo 5" },
      { "number": 6, "title": "Título do capítulo 6" },
      { "number": 7, "title": "Título do capítulo 7" },
      { "number": 8, "title": "Título do capítulo 8" },
      { "number": 9, "title": "Título do capítulo 9" },
      { "number": 10, "title": "Título do capítulo 10" }
    ]
  }
]`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errorMsg = errData?.error?.message || `Erro ${response.status} ao consultar a API do Google Gemini.`;
      throw new Error(errorMsg);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('A API do Google Gemini não retornou nenhum texto de resposta.');
    }

    // Tratamento para remover blocos de markdown ```json ... ``` caso existam
    let cleanJson = text.trim();
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    }

    const parsed = JSON.parse(cleanJson);
    const ideasList = Array.isArray(parsed) ? parsed : (parsed.ideas || [parsed]);

    return ideasList.map((item, index) => {
      const title = item.titulo_estrategico || item.title || 'Infoproduto em PDF';
      const corePain = item.dor_resolvida || item.corePain || 'Dores e desafios principais do público-alvo';
      const chapters = Array.isArray(item.sumario || item.chapters) && (item.sumario || item.chapters).length > 0
        ? (item.sumario || item.chapters)
        : [
            { number: 1, title: 'Introdução e Diagnóstico Inicial' },
            { number: 2, title: 'Fundamentos Essenciais' },
            { number: 3, title: 'Mapeamento das Principais Dores' },
            { number: 4, title: 'Estratégia Passo a Passo' },
            { number: 5, title: 'Ferramentas e Recursos Recomendados' },
            { number: 6, title: 'Superando Obstáculos Frequentes' },
            { number: 7, title: 'Estudos de Caso e Aplicações Práticas' },
            { number: 8, title: 'Checklists e Roteiros de Ação' },
            { number: 9, title: 'Escalabilidade e Manutenção de Resultados' },
            { number: 10, title: 'Plano de Ação dos Próximos 30 Dias' }
          ];

      return {
        ...item,
        id: item.id || `INF-${Date.now().toString().slice(-4)}-${index + 1}`,
        saved: false,
        title,
        titulo_estrategico: title,
        corePain,
        dor_resolvida: corePain,
        chapters,
        sumario: chapters,
        format: item.format || format || 'E-book Guia (50 págs)',
        formatType: item.formatType || 'E-book Guia',
        category: item.category || niche,
        score: typeof item.score === 'number' ? item.score : +(9.0 + (index * 0.2)).toFixed(1),
        status: item.status || 'Pronto para Produção',
        suggestedPrice: item.suggestedPrice || 'R$ 47,00',
        orderBump: item.orderBump || 'R$ 19,90 (Fichas complementares)',
        profitMargin: item.profitMargin || '95% Líquido',
        targetAudience: item.targetAudience || audience,
        whySellNow: item.whySellNow || 'Alta demanda orgânica de busca no Google Trends',
        description: item.description || 'Infoproduto completo modelado e diagramado em PDF.',
        coverImage: item.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      };
    });
  }
};
