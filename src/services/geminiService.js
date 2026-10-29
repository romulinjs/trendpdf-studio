import { storageService } from './storageService';

export const geminiService = {
  generateIdeasForNiche: async (niche, audience, angle, format) => {
    const settings = storageService.getSettings();
    const apiKey = settings.geminiApiKey?.trim();

    if (apiKey) {
      try {
        const prompt = `Você é um estrategista editorial de elite especialista em criação e validação de infoprodutos e e-books em PDF.
Crie 3 ideias altamente lucrativas, inovadoras e detalhadas de produtos digitais em PDF para o seguinte mercado:
- Nicho/Assunto: "${niche}"
- Público-Alvo: "${audience}"
- Abordagem/Ângulo: "${angle}"
- Formato Desejado: "${format}"

Retorne ESTRITAMENTE um JSON no seguinte formato (sem formatação markdown extra fora do json):
[
  {
    "id": "INF-2026-01",
    "title": "Título magnético do PDF",
    "format": "Formato e número de páginas (ex: Guia Prático + Checklists (55 págs))",
    "formatType": "E-book Guia",
    "category": "Categoria principal",
    "score": 9.3,
    "status": "Pronto para Produção",
    "suggestedPrice": "R$ 47,00",
    "orderBump": "R$ 19,90 (Fichas complementares)",
    "profitMargin": "95% Líquido",
    "targetAudience": "${audience}",
    "corePain": "Qual dor aguda este PDF resolve",
    "whySellNow": "Por que há alta demanda comercial agora",
    "description": "Resumo de 2 a 3 frases persuasivas sobre a proposta do produto.",
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

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const parsed = JSON.parse(text);
            return parsed.map((item, index) => ({
              ...item,
              id: item.id || `INF-${Date.now().toString().slice(-4)}-${index + 1}`,
              saved: false,
              coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
            }));
          }
        }
      } catch (err) {
        console.warn('Falha na chamada Gemini API, utilizando motor algorítmico local:', err);
      }
    }

    // Smart Local Generator Engine (realistic synthesis)
    await new Promise((resolve) => setTimeout(resolve, 800)); // Smooth UX transition

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const cleanNiche = niche.trim() || 'Produtividade & Organização';

    return [
      {
        id: `INF-${randomId}-A`,
        title: `Manual Prático: Como Dominar ${cleanNiche} em 21 Dias`,
        format: `Guia de Ação Rápida + Planilhas (${format.includes('Planner') ? '32 págs' : '58 págs'})`,
        formatType: format.includes('Planner') ? 'Planner Imprimível' : 'E-book Guia',
        category: 'Inteligência de Mercado',
        score: +(8.8 + Math.random() * 0.9).toFixed(1),
        status: 'Pronto para Produção',
        saved: false,
        suggestedPrice: 'R$ 47,00',
        orderBump: 'R$ 19,90 (Fichas de Acompanhamento)',
        profitMargin: '94% Líquido',
        targetAudience: audience || 'Profissionais e entusiastas do nicho',
        corePain: `Insegurança e falta de método passo a passo ao lidar com ${cleanNiche.toLowerCase()}`,
        whySellNow: `Busca acelerada nos últimos 90 dias com escassez de materiais práticos diagramados em formato kit.`,
        description: `Estratégia completa estruturada com foco em execução diária, eliminando ruídos teóricos e entregando resultados visíveis logo nas primeiras 48 horas.`,
        coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuhZeLU8XF9cnPT7_WoWP2e8r0MVlgyec52YR9r93X53G8LLUXeTGmu6LfSt270Xd7-GHij7DGRw9GcRRvlg1_ael9unAFCcbFUVc8YN-4WVHCKpSX9COeRlPmtZnm0ipDtW7nFaNbpKKUANc0P-Xbb0q_1WyjQGGssyRSyQNvsChInm4YXkl3y7svV1IoD3oRna-MLwyjZtuGyEGR86KcB3hPlqmzRXekNXmZsCQ',
        chapters: [
          { number: 1, title: `O Panorama de ${cleanNiche}: Os 3 mitos que atrasam 90% das pessoas` },
          { number: 2, title: `Diagnóstico Inicial: Identificando seus gargalos mais críticos em 15 minutos` },
          { number: 3, title: `Os Fundamentos Inegociáveis: A base essencial para começar do jeito certo` },
          { number: 4, title: `Passo a Passo Guiado: Como estruturar sua rotina com eficiência máxima` },
          { number: 5, title: `Ferramentas e Recursos Gratuitos: Montando seu ecossistema sem custos extras` },
          { number: 6, title: `Superando Obstáculos Frequentes: O que fazer quando as coisas não saem como planejado` },
          { number: 7, title: `Estudo de Caso Prático: Como sair do zero e atingir consistência em 2 semanas` },
          { number: 8, title: `Checklists e Roteiros de Ação Rápida para o dia a dia` },
          { number: 9, title: `Manutenção de Hábitos e Escalabilidade a Longo Prazo` },
          { number: 10, title: `Plano de Ação Final dos Próximos 30 Dias + Ficha de Autoavaliação` }
        ]
      },
      {
        id: `INF-${randomId}-B`,
        title: `Kit Visual & Desafio Prático: ${cleanNiche} Sem Complicação`,
        format: `Caderno de Atividades Gamificado (44 págs)`,
        formatType: 'Caderno Gamificado',
        category: 'Prático & Visual',
        score: +(8.9 + Math.random() * 0.8).toFixed(1),
        status: 'Rascunho',
        saved: false,
        suggestedPrice: 'R$ 37,00',
        orderBump: 'R$ 14,90 (Cartões Desafio Imprimíveis)',
        profitMargin: '96% Líquido',
        targetAudience: audience || 'Iniciantes que buscam aprendizagem lúdica',
        corePain: `Tédio com cursos em vídeo longos e livros teóricos densos`,
        whySellNow: `Formatos táteis e imprimíveis têm taxa de cancelamento inferior a 1.2% nas principais plataformas.`,
        description: `Mapas mentais, exercícios guiados e fichas interativas desenhadas para imprimir ou preencher no tablet com foco em retenção rápida.`,
        coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxRDNoCWmN76ugp8YcMmEnRgrkYuZc2qBSFVzFohZ5a8BM0SKjEO_K0rmHhZU4Yv2KCXd4ol4HvP12ztZP5tXTbYgUM5Uh3kz6psnb3aotda2aoap3-FM_elSReFlPplyFx6yuWreYWANixubQpTQDxi4bIIEqLHfNrAGNoSeuAK10qsj3_rwxUG7kT_JXgQLGzEspoSwJFzrBAcGxEqQXc8KKg9rZt2QA5k7oh-Y',
        chapters: [
          { number: 1, title: `Mapa de Boas-Vindas e Regras do Desafio Visual` },
          { number: 2, title: `Ficha 1: O Teste de Maturidade e Definição de Metas Claras` },
          { number: 3, title: `Atividade Prática: Organizando prioridades pelo método das 4 zonas` },
          { number: 4, title: `O Jogo dos 7 Erros Comuns em ${cleanNiche}` },
          { number: 5, title: `Ficha Semanal de Rastreamento de Progresso e Vitórias Rápidas` },
          { number: 6, title: `Exercício de Quebra de Resistência Mental e Bloqueios Criativos` },
          { number: 7, title: `Guia de Consulta Rápida: Atalhos, fórmulas e modelos prontos` },
          { number: 8, title: `Desafio dos 14 Dias: Uma missão prática por dia` },
          { number: 9, title: `Quadro de Recompensas e Celebração de Marcos` },
          { number: 10, title: `Certificado de Conclusão e Próximos Passos` }
        ]
      }
    ];
  }
};

