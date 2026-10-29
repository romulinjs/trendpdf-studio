# Screen Requirements — TrendPDF Studio

## 1. Tela: Dashboard Executivo (`dashboard`)
- **Objetivo:** Fornecer ao usuário uma síntese clara das oportunidades mais quentes do mercado e acesso rápido à criação de produtos.
- **Entrada:** Ponto de entrada padrão da aplicação.
- **CTA Principal:** `+ Nova Pesquisa de Tendência` (topo direito) e `Analisar Oportunidade` (hero search).
- **Conteúdo Essencial:** 4 KPIs de mercado, Top 4 oportunidades em alta, 3 modelos recentes de infoprodutos, banner de inteligência ativa.
- **Estados:** Default, Hover em cards, Loading em dados, Empty state (caso zerado).
- **Responsividade:** 1 col em mobile, 2 cols em tablet, 12 cols fluidas no desktop.
- **Acessibilidade:** Títulos semânticos H1/H2, labels em botões, foco visível.

## 2. Tela: Pesquisa e Análise de Tendências (`pesquisar-tendencias`)
- **Objetivo:** Explorar, filtrar e comparar nichos de mercado por volume, crescimento e nível de concorrência.
- **CTA Principal:** `Transformar em PDF` em cada card de tendência.
- **CTAs Secundários:** `Exportar Dados (JSON)`, `Filtrar por Categoria`, slider de `Score Mínimo`.
- **Estados:** Default, Filtrado, Loading (skeletons), Empty state ("Nenhuma tendência encontrada" com botão para limpar filtros).
- **Responsividade:** Layout de busca e slider empilham em telas pequenas; cards quebram a coluna de métricas abaixo do conteúdo no mobile.
- **Acessibilidade:** Sliders com `aria-valuenow`, inputs com labels e `aria-label`, contraste WCAG AA.

## 3. Tela: Gerador de Ideias de PDFs (`gerar-ideias`)
- **Objetivo:** Configurar parâmetros psicológicos e editoriais para criar infoprodutos com alta conversão.
- **CTA Principal:** `Gerar Ideias de Alta Conversão` (com feedback de loading e celebração visual).
- **CTAs Secundários:** `Ver Sumário & 10 Capítulos`, `Exportar Briefing (PDF)`, `Salvar Ideia na Biblioteca`.
- **Estados:** Default, Loading (cards em Skeleton com efeito shimmer), Success (cards com celebração confetti), Empty state.
- **Responsividade:** Dropdowns e campos de formulário ocupam 100% da largura em mobile; botões de sumário e PDF flexíveis com toque confortável.
- **Acessibilidade:** Ícones com `pointer-events-none`, labels explícitas, feedback sonoro/visual acessível.

## 4. Tela: Ideias Salvas & Biblioteca Editorial (`ideias-salvas`)
- **Objetivo:** Gerenciar infoprodutos salvos, acompanhar status de produção e exportar dados.
- **CTA Principal:** `Gerar Mais Ideias` (redireciona para o gerador).
- **CTAs Secundários:** `Exportar CSV`, filtros por status (`Pronto para Produção`, `Em Validação`, `Rascunho`), `Excluir`.
- **Estados:** Default, Filtrado por status, Empty state enriquecido com ilustração e CTA de ação primária, Dialog de confirmação para exclusão.
- **Responsividade:** Grid adaptativo (1 col no mobile, 2 cols no desktop).
- **Acessibilidade:** Botão de exclusão com confirmação acessível e anúncio de remoção via Toast.

## 5. Tela: Configurações & Integrações (`configuracoes`)
- **Objetivo:** Conectar a chave do Google Gemini API, personalizar perfil de autor e ajustar preferências de moeda e páginas.
- **CTA Principal:** `Salvar Alterações`.
- **CTAs Secundários:** `Restaurar dados de demonstração`, `Exibir/Ocultar Chave de API`.
- **Estados:** Default, Edição, Feedback de sucesso (Toast verde com ícone e texto), Erro de validação.
- **Responsividade:** Campos em grade responsiva (1 col mobile, 2 cols desktop).
- **Acessibilidade:** Campos de senha com toggle acessível `aria-label`, foco semântico.
