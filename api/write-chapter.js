// Vercel Serverless Function: /api/write-chapter
// Gera o conteúdo aprofundado e prático de um capítulo de e-book via Google Gemini

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Método não permitido. Utilize POST.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Corpo da requisição JSON inválido.' });
    }
  }

  const ebookTitle = body?.ebookTitle || 'Infoproduto em PDF';
  const targetAudience = body?.targetAudience || 'Profissionais e entusiastas';
  const corePain = body?.corePain || 'Dificuldade em executar um método estruturado';
  const chapterNumber = body?.chapterNumber || 1;
  const chapterTitle = body?.chapterTitle || `Capítulo ${chapterNumber}`;

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'Chave GEMINI_API_KEY não configurada no servidor Vercel.'
    });
  }

  const systemInstruction = `Você é um autor de não-ficção e infoprodutos best-seller, especialista em criar conteúdo didático, altamente prático, envolvente e aplicável.
SUA RESPOSTA DEVE SER ESTRITAMENTE UM OBJETO JSON VÁLIDO.
NÃO inclua texto fora do JSON, nenhum bloco introdutório ou notas, e NENHUM bloco de código com crases (\`\`\`json).`;

  const userPrompt = `Escreva o conteúdo completo e detalhado do Capítulo ${chapterNumber}: "${chapterTitle}" para o e-book "${ebookTitle}".
Contexto do infoproduto:
- Público-Alvo: ${targetAudience}
- Dor que o livro resolve: ${corePain}

O capítulo deve ser aprofundado, fluído, persuasivo e rico em exemplos práticos.
Retorne EXCLUSIVAMENTE um objeto JSON no seguinte formato:
{
  "chapterNumber": ${chapterNumber},
  "chapterTitle": "${chapterTitle}",
  "introduction": "Texto introdutório envolvente de 2 a 3 parágrafos preparando o leitor para o tema central deste capítulo.",
  "sections": [
    {
      "subtitle": "Subtítulo da Seção 1 (Conceito & Fundamento)",
      "body": "Explicação completa, rica em analogias e exemplos práticos para o dia a dia."
    },
    {
      "subtitle": "Subtítulo da Seção 2 (O Método Passo a Passo)",
      "body": "Instruções claras de implementação, evitando jargões e focando em resultados rápidos."
    },
    {
      "subtitle": "Subtítulo da Seção 3 (Armadilhas Comuns & Como Evitar)",
      "body": "Os principais erros que 90% das pessoas cometem ao tentar aplicar esse conceito e como se blindar."
    }
  ],
  "practicalExercise": "Um exercício prático de 5 a 10 minutos para o leitor executar imediatamente no seu dia a dia.",
  "keyTakeaway": "Uma frase de síntese poderosa e memorável que resume o aprendizado essencial deste capítulo."
}`;

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
    'gemini-3.5-flash'
  ];

  try {
    let apiResponse = null;
    let lastError = null;

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
          lastError = errData;
          console.warn(`Modelo ${model} falhou no capítulo ${chapterNumber} com status ${response.status}`);
          if (response.status === 404 || response.status === 503) {
            continue;
          } else {
            break;
          }
        }
      } catch (callErr) {
        lastError = callErr;
        console.warn(`Erro de conexão com modelo ${model}:`, callErr.message);
      }
    }

    if (!apiResponse) {
      return res.status(502).json({
        error: 'Instabilidade ao gerar capítulo com o Google Gemini.',
        details: lastError
      });
    }

    const data = await apiResponse.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(502).json({ error: 'Resposta de capítulo vazia retornada pela IA.' });
    }

    let cleanJson = rawText.trim();
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    }

    const parsedChapter = JSON.parse(cleanJson);
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(200).json(parsedChapter);

  } catch (error) {
    console.error(`Erro ao gerar capítulo ${chapterNumber}:`, error);
    return res.status(500).json({
      error: 'Falha interna ao redigir capítulo.',
      message: error.message
    });
  }
}
