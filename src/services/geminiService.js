import { storageService } from './storageService';

// Modelos suportados pela API v1beta do Google Gemini com fallback automático
const GEMINI_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-flash-latest',
  'gemini-1.5-flash'
];

export const geminiService = {
  /**
   * Envia os parâmetros para a API do Google Gemini com System Prompt estrito para JSON puro.
   * Utiliza modelos atualizados (gemini-3.5-flash-lite) com fallback automático.
   * Em caso de falha de rede, chave ausente ou formato inválido, retorna null de forma segura.
   */
  generateIdeasForNiche: async (niche, audience, angle, format) => {
    try {
      const settings = storageService.getSettings();
      const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || settings.geminiApiKey || '').trim();

      if (!apiKey) {
        console.warn('Google Gemini API: Chave de API não configurada em settings ou .env.');
        return null;
      }

      const systemInstruction = `Você é um estrategista editorial de elite especialista em criação e validação de infoprodutos e e-books em PDF.
SUA RESPOSTA DEVE SER ESTRITAMENTE UM ARRAY JSON VÁLIDO.
NÃO inclua nenhuma palavra fora do JSON, nenhum bloco de texto introdutório, nenhuma explicação ou conclusão, e NENHUM bloco de código com crases (\`\`\`json).
A saída deve ser imediatamente decodificável por JSON.parse().`;

      const userPrompt = `Crie 3 ideias altamente lucrativas, inovadoras e detalhadas de produtos digitais em PDF para o seguinte mercado:
- Nicho/Assunto: "${niche}"
- Público-Alvo: "${audience}"
- Abordagem/Ângulo: "${angle}"
- Formato Desejado: "${format}"

Gere um array com exatamente 3 objetos JSON no seguinte formato:
[
  {
    "id": "INF-2026-01",
    "titulo_estrategico": "Título magnético e persuasivo do PDF",
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
    "dor_resolvida": "Qual dor aguda e urgente este infoproduto resolve",
    "corePain": "Qual dor aguda e urgente este infoproduto resolve",
    "whySellNow": "Por que há alta demanda comercial agora",
    "description": "Resumo de 2 a 3 frases persuasivas sobre a proposta de valor do produto.",
    "sumario": [
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
    ],
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

      const requestPayload = {
        system_instruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [
          { parts: [{ text: userPrompt }] }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      };

      let response = null;
      let lastError = null;

      // Itera pelos modelos candidatos até obter sucesso
      for (const modelName of GEMINI_MODELS) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(requestPayload),
            }
          );

          if (res.ok) {
            response = res;
            break;
          } else {
            const errDetails = await res.json().catch(() => ({}));
            lastError = errDetails;
            console.warn(`Modelo ${modelName} retornou status ${res.status}:`, errDetails?.error?.message || errDetails);
            // Se for 404 (modelo depreciado ou inexistente) ou 503 (sobrecarregado), tenta o próximo
            if (res.status === 404 || res.status === 503) {
              continue;
            } else {
              break;
            }
          }
        } catch (fetchErr) {
          lastError = fetchErr;
          console.warn(`Falha na requisição para ${modelName}:`, fetchErr.message);
        }
      }

      if (!response) {
        console.error('Falha em todos os modelos candidatos do Gemini:', lastError);
        return null;
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText || typeof rawText !== 'string') {
        console.error('Resposta vazia ou inválida da API do Gemini:', data);
        return null;
      }

      // Sanitização caso o modelo inclua crases markdown ```json ... ```
      let cleanJson = rawText.trim();
      if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
      }

      // Parse protegido
      let parsed;
      try {
        parsed = JSON.parse(cleanJson);
      } catch (parseErr) {
        console.error('Erro de decodificação JSON do retorno Gemini:', parseErr, cleanJson);
        return null;
      }

      const ideasList = Array.isArray(parsed) ? parsed : (parsed?.ideas || (typeof parsed === 'object' ? [parsed] : null));

      if (!ideasList || ideasList.length === 0) {
        console.error('A lista de ideias retornada está vazia ou não é um array válido:', parsed);
        return null;
      }

      // Mapeamento e normalização dos dados
      return ideasList.map((item, index) => {
        const titulo = item.titulo_estrategico || item.title || `Infoproduto em ${niche}`;
        const dor = item.dor_resolvida || item.corePain || 'Falta de método estruturado e passo a passo claro para execução.';
        const capitulos = Array.isArray(item.sumario || item.chapters) && (item.sumario || item.chapters).length > 0
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
          title: titulo,
          titulo_estrategico: titulo,
          corePain: dor,
          dor_resolvida: dor,
          chapters: capitulos,
          sumario: capitulos,
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
    } catch (unexpectedError) {
      console.error('Falha de rede ou exceção ao chamar geminiService:', unexpectedError);
      return null;
    }
  }
};
