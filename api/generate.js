// Vercel Serverless Function: /api/generate
// Executada exclusivamente no servidor Node.js da Vercel (chave 100% segura e oculta)

export default async function handler(req, res) {
  // Apenas aceita requisições POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Método não permitido. Utilize POST.' });
  }

  // Parse seguro do corpo da requisição
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Corpo da requisição JSON inválido.' });
    }
  }

  const niche = body?.niche || body?.nicho || 'Produtividade & Organização';
  const audience = body?.audience || body?.publico || 'Público Geral';
  const angle = body?.angle || body?.angulo || 'Prático & Direto';
  const format = body?.format || body?.formato || 'E-book Guia (PDF)';

  // Lemos a chave protegida do ambiente de servidor da Vercel
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('ERRO: GEMINI_API_KEY não foi configurada nas variáveis de ambiente da Vercel.');
    return res.status(500).json({
      error: 'Chave GEMINI_API_KEY não configurada no servidor. Adicione-a nas Environment Variables da Vercel.'
    });
  }

  const systemInstruction = `Você é um estrategista editorial de elite especialista em criação e validação de infoprodutos e e-books em PDF de alta conversão.
SUA RESPOSTA DEVE SER ESTRITAMENTE UM ARRAY JSON VÁLIDO.
NÃO inclua nenhuma palavra fora do JSON, nenhum texto introdutório, nenhuma explicação ou conclusão, e NENHUM bloco de formatação com crases (\`\`\`json).
A saída deve ser decodificável diretamente por JSON.parse().`;

  const userPrompt = `Crie exatamente 3 ideias altamente lucrativas, inovadoras e detalhadas de infoprodutos em PDF para o seguinte mercado:
- Nicho/Assunto: "${niche}"
- Público-Alvo: "${audience}"
- Abordagem/Ângulo: "${angle}"
- Formato Desejado: "${format}"

Retorne um array JSON com exatamente 3 objetos estruturados da seguinte forma:
[
  {
    "id": "INF-2026-01",
    "titulo_estrategico": "Título magnético e persuasivo do PDF",
    "title": "Título magnético e persuasivo do PDF",
    "dor_resolvida": "Qual dor aguda e urgente este infoproduto resolve",
    "corePain": "Qual dor aguda e urgente este infoproduto resolve",
    "ticket_sugerido": "R$ 47,00",
    "suggestedPrice": "R$ 47,00",
    "score_preditivo": 9.4,
    "score": 9.4,
    "format": "Formato e páginas (ex: Guia Prático + Checklists (55 págs))",
    "formatType": "E-book Guia",
    "category": "${niche}",
    "status": "Pronto para Produção",
    "orderBump": "R$ 19,90 (Fichas complementares)",
    "profitMargin": "95% Líquido",
    "targetAudience": "${audience}",
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

  const candidateModels = [
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-flash-latest'
  ];

  try {
    let apiResponse = null;
    let lastErrorDetails = null;

    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestPayload),
        });

        if (response.ok) {
          apiResponse = response;
          break;
        } else {
          const errData = await response.json().catch(() => ({}));
          lastErrorDetails = errData;
          console.warn(`Modelo ${model} falhou com status ${response.status}:`, errData);
          if (response.status === 404 || response.status === 503) {
            continue; // Tenta o próximo modelo
          } else {
            break;
          }
        }
      } catch (callErr) {
        lastErrorDetails = callErr;
        console.warn(`Erro de conexão com modelo ${model}:`, callErr.message);
      }
    }

    if (!apiResponse) {
      console.error('Falha ao comunicar com os modelos do Google Gemini:', lastErrorDetails);
      return res.status(502).json({
        error: 'Instabilidade ao comunicar com a API do Google Gemini.',
        details: lastErrorDetails
      });
    }

    const data = await apiResponse.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(502).json({ error: 'Resposta vazia retornada pelo Google Gemini.' });
    }

    let cleanJson = rawText.trim();
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    }

    const parsed = JSON.parse(cleanJson);
    const ideasList = Array.isArray(parsed) ? parsed : (parsed?.ideas || [parsed]);

    // Normalização completa dos dados para alimentar os cards e o gerador de PDF
    const normalizedIdeas = ideasList.map((item, index) => {
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
        suggestedPrice: item.suggestedPrice || item.ticket_sugerido || 'R$ 47,00',
        orderBump: item.orderBump || 'R$ 19,90 (Fichas complementares)',
        profitMargin: item.profitMargin || '95% Líquido',
        targetAudience: item.targetAudience || audience,
        whySellNow: item.whySellNow || 'Alta demanda orgânica de busca no Google Trends',
        description: item.description || 'Infoproduto completo modelado e diagramado em PDF.',
        coverImage: item.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      };
    });

    // Retorna os dados seguros com cache-control desativado para garantir sempre respostas frescas
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(200).json(normalizedIdeas);

  } catch (serverError) {
    console.error('Erro de execução no backend da Vercel:', serverError);
    return res.status(500).json({
      error: 'Falha interna ao processar a inteligência artificial.',
      message: serverError.message
    });
  }
}
