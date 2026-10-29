# Product Context — TrendPDF Studio

## Nome do Produto
**TrendPDF Studio** (Trend Intelligence & Digital Editorial Studio)

## Visão Geral
Plataforma SaaS B2B/B2C de inteligência preditiva de demanda mercadológica orientada à identificação, validação e estruturação ágil de infoprodutos editoriais em formato PDF (e-books, planners imprimíveis, checklists, guias rápidos e cadernos de atividades gamificados).

## Problema Resolvido
Criadores de conteúdo, infoprodutores e especialistas perdem semanas criando produtos digitais que ninguém quer comprar, ou enfrentam bloqueio criativo para estruturar sumários e capítulos com apelo comercial validado. O TrendPDF Studio resolve isso identificando picos de interesse de busca e gerando briefings editoriais completos e comercialmente validados em segundos.

## Público-Alvo
- Infoprodutores e criadores de conteúdo digital
- Especialistas, consultores e professores que desejam monetizar seu conhecimento
- Afiliados e agências de marketing digital
- Solopreneurs e operadores de Micro-SaaS

## Personas
1. **Ana Martins (A Criadora Focada em Escala):** 31 anos, infoprodutora. Precisa de agilidade para lançar 2 a 3 micro-produtos por mês no Kiwify/Hotmart com baixo custo de produção.
2. **Carlos Eduardo (O Especialista Técnico):** 42 anos, consultor. Quer transformar seu conhecimento denso em guias rápidos e checklists vendáveis, mas não tem tempo para pesquisas manuais de mercado.

## Jobs To Be Done (JTBD)
- *"Quando identifico um nicho promissor, quero saber qual formato e dor têm maior probabilidade de conversão para lançar um produto rentável sem perder tempo."*
- *"Quando decido criar um e-book, quero um sumário estruturado de 10 capítulos com ganchos persuasivos para começar a redigir ou delegar imediatamente."*
- *"Quando finalizo uma ideia, quero baixar um briefing executivo em PDF diagramado para documentar ou enviar à equipe de design/redação."*

## Objetivos do Negócio
- Reduzir o tempo de validação de produtos digitais de 15 dias para menos de 3 minutos.
- Alta taxa de retenção por meio de biblioteca editorial persistente.
- Upsell de créditos de geração preditiva por IA.

## Objetivos do Usuário
- Encontrar nichos de alta demanda e baixa saturação.
- Modelar produtos digitais com ticket sugerido e order bump calculado.
- Exportar documentos profissionais em 1 clique.

## Funcionalidades Principais
1. **Dashboard Executivo:** Visão panorâmica de tendências em ascensão, KPIs de mercado e atalho para nova pesquisa.
2. **Pesquisador de Tendências:** Monitoramento de volume de busca, taxa de crescimento, concorrência e filtros por categoria.
3. **Gerador Preditivo de Ideias (IA):** Modelagem de produtos com base em nicho, público, ângulo e formato, com suporte à API do Google Gemini.
4. **Sumário Estruturado de 10 Capítulos:** Geração detalhada com ganchos persuasivos e cópia para área de transferência.
5. **Exportador de Briefings em PDF:** Geração client-side de PDFs diagramados e prontos para download.
6. **Biblioteca de Ideias Salvas:** Gestão com filtros de status e exportação em CSV.
7. **Configurações & Chaves:** Integração com Gemini API, personalização de moeda e perfil editorial.

## Fluxos Principais
1. **Descoberta:** Dashboard → Pesquisar Tendências → Filtrar oportunidade → Clicar "Transformar em PDF".
2. **Geração:** Gerar Ideias → Ajustar Parâmetros → Gerar com IA → Ver Sumário de 10 Capítulos → Salvar na Biblioteca.
3. **Exportação:** Ideia Selecionada → Baixar Briefing em PDF / Exportar CSV.

## Plataformas & Tecnologias
- Web responsiva (Desktop >= 1280px, Tablet 768-1279px, Mobile < 768px)
- React 18, Vite 5, Tailwind CSS 3, jsPDF, Material Symbols Outlined, Canvas Confetti.

## Identidade Visual e Tom de Voz
- **Estética:** Minimalismo utilitário, analítico e sofisticado (estilo Linear + Stripe).
- **Tom de voz:** Claro, assertivo, confiável, focado em dados acionáveis e sem ruídos corporativos.

## Regras para IA e UX
- Seguir estritamente o Design System (`design-system.md`).
- Todas as interações devem ter estados de feedback claros (loading, sucesso, erro, vazio).
- Áreas de toque confortáveis (mínimo 44x44px em mobile).
- Acessibilidade WCAG AA (contraste, foco visível, labels acessíveis).
