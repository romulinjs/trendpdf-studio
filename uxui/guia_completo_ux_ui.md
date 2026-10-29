# Guia Completo de UX/UI Design
## Manual prático para criar interfaces, fluxos e experiências digitais de alta qualidade

> Este guia foi criado para servir como referência prática para produtos Web, Mobile, Desktop e sistemas responsivos.  
> Ele pode ser usado por designers, desenvolvedores, product designers, founders e equipes que utilizam IA para gerar interfaces.

---

# Sumário

1. [O que é UX e UI](#1-o-que-é-ux-e-ui)
2. [Princípios fundamentais](#2-princípios-fundamentais)
3. [Processo completo de UX/UI](#3-processo-completo-de-uxui)
4. [Pesquisa e entendimento do usuário](#4-pesquisa-e-entendimento-do-usuário)
5. [Personas, Jobs to Be Done e cenários](#5-personas-jobs-to-be-done-e-cenários)
6. [Arquitetura da informação](#6-arquitetura-da-informação)
7. [User Flow e Task Flow](#7-user-flow-e-task-flow)
8. [Wireframes](#8-wireframes)
9. [Fundamentos de UI Design](#9-fundamentos-de-ui-design)
10. [Layout, grids e espaçamento](#10-layout-grids-e-espaçamento)
11. [Tipografia](#11-tipografia)
12. [Cores](#12-cores)
13. [Hierarquia visual](#13-hierarquia-visual)
14. [Componentes de interface](#14-componentes-de-interface)
15. [Estados dos componentes](#15-estados-dos-componentes)
16. [Navegação](#16-navegação)
17. [Formulários](#17-formulários)
18. [Feedback e mensagens de sistema](#18-feedback-e-mensagens-de-sistema)
19. [Empty states, loading e erros](#19-empty-states-loading-e-erros)
20. [Mobile UX](#20-mobile-ux)
21. [Web e Desktop UX](#21-web-e-desktop-ux)
22. [Responsividade](#22-responsividade)
23. [Acessibilidade](#23-acessibilidade)
24. [Heurísticas de Nielsen](#24-heurísticas-de-nielsen)
25. [Design System](#25-design-system)
26. [Microinterações e animações](#26-microinterações-e-animações)
27. [Onboarding](#27-onboarding)
28. [Busca, filtros e ordenação](#28-busca-filtros-e-ordenação)
29. [Dashboards](#29-dashboards)
30. [E-commerce e conversão](#30-e-commerce-e-conversão)
31. [Testes de usabilidade](#31-testes-de-usabilidade)
32. [Métricas de UX](#32-métricas-de-ux)
33. [Handoff para desenvolvimento](#33-handoff-para-desenvolvimento)
34. [UX Writing](#34-ux-writing)
35. [Dark Mode](#35-dark-mode)
36. [Boas práticas para gerar interfaces com IA](#36-boas-práticas-para-gerar-interfaces-com-ia)
37. [Framework de prompt para interfaces](#37-framework-de-prompt-para-interfaces)
38. [Checklist de revisão](#38-checklist-de-revisão)
39. [Anti-patterns](#39-anti-patterns)
40. [Processo recomendado de ponta a ponta](#40-processo-recomendado-de-ponta-a-ponta)

---

# 1. O que é UX e UI

## UX — User Experience

UX é a experiência completa que uma pessoa tem ao utilizar um produto.

UX envolve:

- facilidade de uso;
- clareza;
- velocidade;
- eficiência;
- previsibilidade;
- acessibilidade;
- confiança;
- redução de esforço;
- satisfação;
- capacidade de concluir uma tarefa.

Uma interface visualmente bonita pode ter UX ruim.

### Exemplo

Um botão pode ser visualmente excelente, mas se o usuário não entende o que acontece ao clicar nele, existe um problema de UX.

---

## UI — User Interface

UI é a camada visual e interativa do produto.

UI inclui:

- cores;
- tipografia;
- ícones;
- botões;
- cards;
- menus;
- campos;
- modais;
- navegação;
- grids;
- espaçamentos;
- sombras;
- bordas;
- animações;
- estados visuais.

### Regra importante

> UI determina como o produto parece.  
> UX determina como o produto funciona e é compreendido.

Os dois precisam trabalhar juntos.

---

# 2. Princípios fundamentais

Uma boa interface deve ser:

## Clara

O usuário deve entender:

- onde está;
- o que pode fazer;
- o que aconteceu;
- qual é o próximo passo.

## Consistente

Elementos que realizam a mesma função devem parecer e funcionar da mesma maneira.

## Previsível

O resultado de uma ação deve ser coerente com a expectativa do usuário.

## Eficiente

O usuário deve atingir seu objetivo com o menor esforço possível.

## Acessível

A interface precisa funcionar para diferentes capacidades físicas, cognitivas e contextos de uso.

## Tolerante a erros

O sistema deve:

- evitar erros;
- explicar erros;
- ajudar na recuperação.

## Hierárquica

O que é mais importante precisa ser percebido primeiro.

---

# 3. Processo completo de UX/UI

Um processo recomendado:

```text
Problema
   ↓
Pesquisa
   ↓
Objetivos
   ↓
Arquitetura da Informação
   ↓
User Flow
   ↓
Wireframe
   ↓
Protótipo
   ↓
Teste
   ↓
UI Visual
   ↓
Design System
   ↓
Handoff
   ↓
Implementação
   ↓
Métricas
   ↓
Iteração
```

Nunca comece somente escolhendo cores e criando telas.

Comece entendendo:

> Qual problema essa interface deve resolver?

---

# 4. Pesquisa e entendimento do usuário

Antes de criar uma tela, responda:

- Quem vai usar?
- Qual objetivo essa pessoa possui?
- Em qual contexto?
- Qual dispositivo?
- Qual frequência?
- Qual nível de experiência?
- Quais dificuldades existem hoje?
- Qual tarefa é mais importante?
- O que pode impedir a conclusão?

## Métodos de pesquisa

### Entrevistas

Converse com usuários reais.

Perguntas úteis:

- Como você resolve esse problema hoje?
- Qual parte é mais difícil?
- O que você costuma fazer primeiro?
- O que normalmente gera dúvida?
- Qual foi a última vez que isso aconteceu?
- O que você esperava encontrar?

Evite perguntas como:

> "Você gostaria de um botão que faça X?"

Prefira investigar comportamentos reais.

---

## Pesquisa quantitativa

Fontes possíveis:

- analytics;
- mapas de calor;
- funis;
- abandono;
- conversão;
- retenção;
- pesquisas;
- logs;
- tickets de suporte.

---

# 5. Personas, Jobs to Be Done e cenários

## Persona

Uma persona representa um perfil de usuário.

Exemplo:

```text
Nome: Lucas
Idade: 29
Objetivo: acompanhar seus investimentos
Experiência: intermediária
Dispositivo principal: smartphone
Problema: informações financeiras são muito complexas
Necessidade: visualizar rapidamente desempenho e risco
```

Evite personas decorativas com detalhes que não afetam o produto.

---

## Jobs to Be Done

Pergunta:

> O que o usuário está tentando conseguir?

Estrutura:

```text
Quando __________
Eu quero __________
Para que __________
```

Exemplo:

```text
Quando recebo meu salário,
quero visualizar minhas despesas,
para saber quanto posso investir.
```

---

# 6. Arquitetura da informação

Arquitetura da Informação define:

- organização;
- agrupamento;
- hierarquia;
- nomenclatura;
- navegação;
- relacionamento entre conteúdos.

## Exemplo

```text
App
├── Home
├── Explorar
│   ├── Categorias
│   ├── Busca
│   └── Recomendações
├── Favoritos
├── Pedidos
└── Perfil
    ├── Dados
    ├── Pagamentos
    └── Configurações
```

## Regra

A estrutura deve refletir o modelo mental do usuário, não a estrutura interna da empresa.

---

# 7. User Flow e Task Flow

## Task Flow

Representa uma tarefa específica.

```text
Home
↓
Produto
↓
Adicionar ao carrinho
↓
Carrinho
↓
Checkout
↓
Pagamento
↓
Confirmação
```

## User Flow

Pode possuir decisões.

```text
Login
  ↓
Possui conta?
 ↙       ↘
Sim      Não
 ↓        ↓
Entrar   Criar conta
   \      /
      ↓
     Home
```

## Para cada fluxo, avalie

- Há passos desnecessários?
- O usuário precisa voltar?
- Alguma informação está sendo pedida cedo demais?
- Existe alguma decisão ambígua?
- O usuário consegue cancelar?
- O fluxo possui feedback?
- Existe recuperação em caso de erro?

---

# 8. Wireframes

Wireframes são representações estruturais da interface.

Objetivo:

- validar layout;
- priorizar conteúdo;
- definir hierarquia;
- testar fluxo;
- evitar gastar tempo com estética antes da estrutura.

## Baixa fidelidade

Use blocos simples.

```text
┌──────────────────────┐
│ Logo           Menu  │
├──────────────────────┤
│      Título          │
│ Texto de apoio       │
│                      │
│ [ CTA Principal ]    │
├──────────────────────┤
│ Card   Card   Card   │
└──────────────────────┘
```

## Antes de avançar para UI visual

Verifique:

- conteúdo;
- sequência;
- prioridades;
- navegação;
- affordance;
- principais ações.

---

# 9. Fundamentos de UI Design

Uma boa UI depende principalmente de:

1. hierarquia;
2. alinhamento;
3. contraste;
4. espaçamento;
5. consistência;
6. proximidade;
7. repetição;
8. legibilidade.

Evite decorar a interface antes de garantir esses fundamentos.

---

# 10. Layout, grids e espaçamento

## Sistema de 8 pontos

Uma abordagem comum utiliza múltiplos de 8:

```text
4 px
8 px
16 px
24 px
32 px
40 px
48 px
64 px
```

O valor de 4 px pode ser utilizado para ajustes menores.

## Exemplo de tokens

```text
space-1 = 4
space-2 = 8
space-3 = 12
space-4 = 16
space-5 = 24
space-6 = 32
space-7 = 40
space-8 = 48
```

---

## Proximidade

Itens relacionados devem estar próximos.

Itens diferentes devem possuir separação maior.

### Ruim

```text
Título
      subtítulo

        botão
```

### Melhor

```text
Título
Subtítulo

[Botão]
```

---

## Grid

### Desktop

Exemplo:

```text
12 colunas
Margem: 64–120 px
Gutter: 20–32 px
```

### Tablet

```text
8 colunas
```

### Mobile

```text
4 colunas
Margem lateral: 16–24 px
```

Esses valores não são regras absolutas.

---

# 11. Tipografia

Use poucas famílias tipográficas.

Normalmente:

- 1 família é suficiente;
- 2 famílias podem funcionar quando existe propósito claro.

## Escala tipográfica exemplo

```text
Display: 48
H1:      40
H2:      32
H3:      24
H4:      20
Body:    16
Small:   14
Caption: 12
```

## Line-height

Texto pequeno necessita de mais espaço relativo.

Exemplo:

```text
16 px / 24 px
14 px / 20 px
12 px / 16 px
```

## Comprimento da linha

Para leitura longa:

```text
aproximadamente 45–75 caracteres por linha
```

---

# 12. Cores

Uma paleta pode ser organizada em:

```text
Primary
Secondary
Neutral
Success
Warning
Error
Info
```

## Exemplo de escala

```text
Primary 50
Primary 100
Primary 200
Primary 300
Primary 400
Primary 500
Primary 600
Primary 700
Primary 800
Primary 900
```

## Uso recomendado

### Primary

Ações principais e elementos da marca.

### Neutral

Fundos, textos, bordas e superfícies.

### Success

Confirmações.

### Warning

Situações de atenção.

### Error

Erros e ações destrutivas.

## Nunca dependa apenas da cor

Em erro:

Errado:

```text
campo com borda vermelha
```

Melhor:

```text
⚠ E-mail inválido
```

Cor + ícone + texto.

---

# 13. Hierarquia visual

O usuário deve perceber rapidamente:

1. o que é;
2. por que importa;
3. o que pode fazer.

A hierarquia pode ser construída por:

- tamanho;
- peso;
- posição;
- cor;
- contraste;
- espaço;
- agrupamento.

## Pergunta de teste

Observe a tela por 3 segundos.

Você consegue identificar:

- título principal?
- ação principal?
- conteúdo prioritário?

Se não, a hierarquia provavelmente precisa ser revisada.

---

# 14. Componentes de interface

Componentes comuns:

- Button
- Input
- Select
- Checkbox
- Radio
- Switch
- Card
- Tabs
- Accordion
- Tooltip
- Modal
- Dialog
- Drawer
- Snackbar
- Toast
- Navigation Bar
- Bottom Navigation
- Breadcrumb
- Pagination
- Chip
- Badge
- Avatar
- Table
- Dropdown
- Date Picker
- Search
- Skeleton
- Empty State

Cada componente deve possuir propósito claro.

---

# 15. Estados dos componentes

Nunca desenhe somente o estado padrão.

Um botão pode possuir:

```text
Default
Hover
Pressed
Focus
Disabled
Loading
```

Um campo pode possuir:

```text
Empty
Filled
Focused
Valid
Invalid
Disabled
Read-only
```

Uma tela pode possuir:

```text
Loading
Success
Empty
Error
Offline
Permission denied
```

---

# 16. Navegação

A navegação deve responder:

- Onde estou?
- Para onde posso ir?
- Como volto?
- Qual seção está ativa?

## Mobile

Opções comuns:

### Bottom Navigation

Boa quando existem aproximadamente 3–5 destinos principais.

### Navigation Drawer

Adequada quando existem muitas seções secundárias.

### Tabs

Adequadas para conteúdos relacionados no mesmo contexto.

## Desktop

Opções:

- sidebar;
- top navigation;
- tabs;
- breadcrumbs;
- menus contextuais.

Evite esconder funções essenciais sem necessidade.

---

# 17. Formulários

Formulários são um dos pontos mais críticos de UX.

## Regras

- peça somente informações necessárias;
- use labels visíveis;
- forneça exemplos;
- valide no momento adequado;
- informe o formato esperado;
- preserve os dados em caso de erro;
- use teclado apropriado em mobile;
- evite campos obrigatórios desnecessários.

## Labels

Melhor:

```text
E-mail
[ usuario@email.com ]
```

Evite depender exclusivamente do placeholder.

---

## Mensagens de erro

Ruim:

```text
Erro 402
```

Melhor:

```text
Não foi possível concluir o pagamento.
Verifique os dados do cartão e tente novamente.
```

---

# 18. Feedback e mensagens de sistema

Toda ação importante precisa de resposta.

Usuário clicou:

> O sistema recebeu o clique?

Usuário enviou:

> Está processando?

Usuário concluiu:

> Deu certo?

Tipos de feedback:

- visual;
- textual;
- sonoro;
- háptico;
- animação.

## Exemplo

Ao salvar:

```text
Salvando...
```

Depois:

```text
✓ Alterações salvas
```

---

# 19. Empty states, loading e erros

## Empty State

Não mostre apenas:

```text
Nenhum resultado.
```

Melhor:

```text
Você ainda não possui projetos.

Crie seu primeiro projeto para começar.

[ Criar projeto ]
```

## Loading

Prefira:

- skeleton para conteúdo estruturado;
- spinner para ações pequenas;
- progress bar para processos conhecidos.

## Erro

Um bom erro explica:

1. o que aconteceu;
2. por que pode ter acontecido;
3. o que o usuário pode fazer.

---

# 20. Mobile UX

Mobile possui restrições específicas:

- tela menor;
- uso com uma mão;
- interrupções;
- conexão variável;
- teclado virtual;
- menor precisão de toque.

## Área de toque

Use alvos confortáveis.

Como referência prática:

```text
aproximadamente 44–48 px
```

## Thumb Zone

Priorize ações frequentes em áreas de alcance confortável.

## Evite

- botões muito próximos;
- textos pequenos;
- menus excessivamente profundos;
- modais gigantes;
- campos desnecessários;
- ações importantes no topo extremo sem alternativa.

---

# 21. Web e Desktop UX

Desktop permite:

- mais densidade;
- múltiplas colunas;
- hover;
- atalhos;
- menus persistentes;
- tabelas maiores.

Mas não significa que tudo deve ser mostrado ao mesmo tempo.

Use progressive disclosure:

> mostre primeiro o essencial e revele detalhes quando necessário.

---

# 22. Responsividade

Não pense apenas em:

```text
Desktop → Mobile
```

Pense em:

```text
conteúdo → comportamento → adaptação
```

## Breakpoints

Exemplo:

```text
Mobile:  < 640
Tablet:  640–1024
Desktop: > 1024
Large:   > 1440
```

Não trate breakpoints como regras universais.

## Pergunte em cada tamanho

- O que deve permanecer?
- O que pode empilhar?
- O que pode desaparecer?
- O que precisa mudar de interação?
- O que deve virar scroll horizontal?
- O que precisa ocupar largura total?

---

# 23. Acessibilidade

Acessibilidade não é etapa final.

Ela deve existir desde o início.

## Contraste

Garanta contraste adequado entre:

- texto e fundo;
- ícones e fundo;
- estados;
- controles.

## Navegação por teclado

O usuário deve conseguir:

- navegar;
- abrir menus;
- selecionar;
- fechar;
- enviar;
- cancelar.

## Focus

Nunca remova o indicador de foco sem oferecer alternativa visível.

## Leitores de tela

Elementos precisam possuir:

- labels;
- nomes acessíveis;
- ordem lógica;
- semântica correta.

## Imagens

Use texto alternativo quando a imagem transmite informação.

## Movimento

Permita reduzir movimentos quando possível.

## Linguagem

Prefira frases:

- curtas;
- diretas;
- concretas.

---

# 24. Heurísticas de Nielsen

## 1. Visibilidade do status do sistema

O sistema deve mostrar o que está acontecendo.

## 2. Correspondência com o mundo real

Utilize palavras e conceitos que os usuários conhecem.

## 3. Controle e liberdade do usuário

Permita:

- cancelar;
- desfazer;
- voltar.

## 4. Consistência e padrões

Elementos semelhantes devem funcionar de modo semelhante.

## 5. Prevenção de erros

Evite o erro antes que aconteça.

## 6. Reconhecimento em vez de memorização

Não obrigue o usuário a lembrar informações desnecessárias.

## 7. Flexibilidade e eficiência

Ofereça atalhos para usuários experientes.

## 8. Design estético e minimalista

Não mostre informação irrelevante.

## 9. Recuperação de erros

Explique o erro e como resolvê-lo.

## 10. Ajuda e documentação

Quando necessário, forneça ajuda simples e pesquisável.

---

# 25. Design System

Um Design System reduz inconsistência.

## Estrutura

```text
Foundations
├── Colors
├── Typography
├── Spacing
├── Grid
├── Radius
├── Shadows
└── Icons

Components
├── Button
├── Input
├── Select
├── Modal
├── Card
├── Tabs
└── Navigation

Patterns
├── Forms
├── Authentication
├── Search
├── Checkout
└── Empty States
```

---

## Design Tokens

Exemplo:

```css
--color-primary-500
--color-neutral-900
--space-4
--radius-md
--shadow-sm
--font-size-body
```

Tokens facilitam a sincronização entre design e código.

---

# 26. Microinterações e animações

Animação deve possuir função.

Pode:

- mostrar relação espacial;
- confirmar ação;
- indicar mudança de estado;
- direcionar atenção;
- reduzir sensação de espera.

## Duração

Interfaces costumam funcionar bem com animações curtas.

Exemplo prático:

```text
100–150 ms → feedback rápido
150–250 ms → transições comuns
250–400 ms → mudanças maiores
```

Evite animações lentas em ações frequentes.

---

# 27. Onboarding

O melhor onboarding é aquele que leva rapidamente ao valor.

Evite:

```text
10 telas explicando recursos antes do usuário entrar.
```

Prefira:

```text
Entrar
↓
Executar ação principal
↓
Receber orientação contextual quando necessário
```

## Progressive Onboarding

Ensine recursos no momento em que se tornam relevantes.

---

# 28. Busca, filtros e ordenação

## Busca

Inclua:

- placeholder útil;
- histórico quando relevante;
- sugestões;
- correção de erros simples;
- estado sem resultados.

## Filtros

Mostre:

- filtros ativos;
- quantidade;
- forma fácil de limpar.

Exemplo:

```text
Filtros ativos:
[Preço: até R$100 ×]
[Categoria: Calçados ×]

[Limpar tudo]
```

---

# 29. Dashboards

Um dashboard não deve ser depósito de gráficos.

Antes de adicionar um elemento, pergunte:

> Qual decisão esse dado ajuda o usuário a tomar?

## Prioridades

```text
1. KPIs principais
2. Tendências
3. Alertas
4. Detalhes
5. Ações
```

Evite excesso de cores e gráficos decorativos.

---

# 30. E-commerce e conversão

Princípios:

- preço claro;
- frete claro;
- prazo claro;
- fotos de qualidade;
- CTA principal evidente;
- confiança;
- políticas acessíveis;
- checkout curto.

## Checkout

Idealmente:

```text
Carrinho
↓
Identificação
↓
Entrega
↓
Pagamento
↓
Confirmação
```

Remova distrações desnecessárias.

---

# 31. Testes de usabilidade

Você não precisa de dezenas de usuários para encontrar problemas importantes.

## Estrutura básica

Dê uma tarefa:

> "Imagine que você deseja alterar o endereço de entrega. Mostre como faria."

Não diga:

> "Clique em Configurações e depois em Endereço."

Observe.

## Registre

- tempo;
- erros;
- hesitações;
- caminhos inesperados;
- perguntas;
- desistências;
- comentários.

---

# 32. Métricas de UX

Algumas métricas úteis:

## Task Success Rate

Percentual de usuários que concluíram a tarefa.

## Time on Task

Tempo necessário para completar a tarefa.

## Error Rate

Quantidade de erros.

## Conversion Rate

```text
conversões / usuários
```

## Drop-off

Onde usuários abandonam o fluxo.

## SUS

System Usability Scale.

## CES

Customer Effort Score.

Pergunta comum:

> Quão fácil foi concluir essa tarefa?

---

# 33. Handoff para desenvolvimento

O designer deve entregar mais do que telas.

Inclua:

- medidas;
- espaçamentos;
- tokens;
- comportamento;
- estados;
- responsividade;
- animações;
- erros;
- loading;
- empty states;
- acessibilidade;
- regras de negócio relevantes.

## Exemplo de especificação de componente

```text
Button / Primary

Height: 48
Padding horizontal: 20
Radius: 12
Font: 16 / Medium
Icon gap: 8

States:
Default
Pressed
Disabled
Loading
Focus
```

---

# 34. UX Writing

Texto é parte da interface.

## Botões

Prefira ações explícitas.

Ruim:

```text
OK
```

Melhor:

```text
Salvar alterações
```

Ruim:

```text
Sim
```

Melhor:

```text
Excluir arquivo
```

## Mensagens

Use linguagem:

- curta;
- simples;
- humana;
- específica.

---

# 35. Dark Mode

Dark Mode não é simplesmente inverter cores.

Considere:

- contraste;
- elevação;
- superfícies;
- saturação;
- legibilidade.

Evite:

```text
#000000 puro em grandes áreas
```

Muitas interfaces utilizam tons próximos de preto para reduzir contraste excessivo.

---

# 36. Boas práticas para gerar interfaces com IA

Ao solicitar interfaces para IA, não peça apenas:

```text
Crie uma tela bonita de login.
```

Isso produz resultados genéricos.

Forneça contexto.

## Informe

### Produto

```text
Aplicativo de marketplace de joias.
```

### Usuário

```text
Mulheres entre 25 e 45 anos que compram acessórios pelo smartphone.
```

### Objetivo

```text
Permitir descobrir produtos e finalizar a compra com poucos passos.
```

### Plataforma

```text
Android.
```

### Estilo

```text
Premium, minimalista e sofisticado.
```

### Estrutura

```text
Top bar
Busca
Categorias
Banner
Produtos recomendados
Bottom navigation
```

### Restrições

```text
Sem excesso de cards.
Alvos de toque >= 48 dp.
Texto principal >= 16sp.
Não usar mais de uma ação primária por seção.
```

### Estados

```text
Loading
Empty
Error
Success
```

### Acessibilidade

```text
Contraste adequado.
Labels claras.
Não depender somente da cor.
```

---

# 37. Framework de prompt para interfaces

Use a estrutura:

```text
CONTEXTO
USUÁRIO
OBJETIVO
PLATAFORMA
CONTEÚDO
ARQUITETURA
ESTILO VISUAL
COMPONENTES
INTERAÇÕES
ESTADOS
RESPONSIVIDADE
ACESSIBILIDADE
RESTRIÇÕES
SAÍDA ESPERADA
```

## Prompt completo de exemplo

```text
Atue como Product Designer sênior especializado em UX/UI mobile.

CONTEXTO
Estou criando um aplicativo Android de marketplace de joias premium.

USUÁRIO
Mulheres de 25 a 45 anos que valorizam produtos sofisticados e realizam
compras pelo smartphone.

OBJETIVO DA TELA
Permitir que a usuária descubra produtos rapidamente e acesse categorias,
favoritos e carrinho.

PLATAFORMA
Android, usando Material 3 e Jetpack Compose.

ESTRUTURA
- Top App Bar
- Saudação
- Campo de busca
- Banner principal
- Categorias horizontais
- Seção "Destaques"
- Cards de produtos
- Bottom Navigation

ESTILO
Minimalista, premium, elegante, bastante espaço em branco e baixa poluição visual.

HIERARQUIA
1. Busca
2. Banner
3. Categorias
4. Produtos

USABILIDADE
- Áreas de toque confortáveis
- Ações principais visíveis
- Evitar informação redundante
- Não usar textos muito pequenos
- Manter navegação previsível

ESTADOS
Defina:
- loading
- vazio
- erro
- conteúdo carregado

ACESSIBILIDADE
- bom contraste
- suporte a leitores de tela
- labels descritivas
- não usar somente cor para indicar estado

SAÍDA
Descreva a composição da tela, hierarquia, componentes, espaçamentos,
estados, interações e justificativas de UX.
```

---

# 38. Checklist de revisão

Antes de considerar uma interface pronta:

## Objetivo

- [ ] O objetivo da tela está claro?
- [ ] Existe uma ação principal evidente?
- [ ] O usuário entende o próximo passo?

## Hierarquia

- [ ] O título principal está claro?
- [ ] O CTA principal se destaca?
- [ ] Conteúdos secundários possuem menor peso?

## Navegação

- [ ] O usuário sabe onde está?
- [ ] É fácil voltar?
- [ ] A seção ativa está indicada?

## Conteúdo

- [ ] Textos são curtos?
- [ ] Labels são compreensíveis?
- [ ] Não existe jargão desnecessário?

## Formulários

- [ ] Labels estão visíveis?
- [ ] Erros são claros?
- [ ] Dados são preservados após erro?
- [ ] O teclado correto é exibido?

## Feedback

- [ ] Existe loading?
- [ ] Existe sucesso?
- [ ] Existe erro?
- [ ] Existe empty state?

## Acessibilidade

- [ ] Contraste adequado?
- [ ] Navegação por teclado?
- [ ] Focus visível?
- [ ] Texto escalável?
- [ ] Áreas de toque adequadas?
- [ ] Ícones possuem labels quando necessário?

## Responsividade

- [ ] Mobile foi testado?
- [ ] Tablet foi testado?
- [ ] Desktop foi testado?
- [ ] Textos maiores quebram corretamente?
- [ ] Orientação horizontal foi considerada?

## Consistência

- [ ] Espaçamentos seguem tokens?
- [ ] Botões seguem padrões?
- [ ] Tipografia segue escala?
- [ ] Estados são consistentes?

---

# 39. Anti-patterns

Evite:

## Botões sem hierarquia

Vários CTAs com o mesmo peso competem entre si.

## Excesso de modais

Modais interrompem o fluxo.

Use apenas quando a ação exige atenção ou confirmação.

## Carousel automático rápido

Pode prejudicar leitura e controle.

## Placeholder como label

O usuário perde a referência após digitar.

## Ícones ambíguos sem texto

Nem todos os ícones são universalmente compreendidos.

## Scroll horizontal escondido

Se existe conteúdo horizontal, forneça pistas visuais.

## Confirmação para tudo

Confirmar ações reversíveis aumenta atrito.

## Ações destrutivas próximas de ações comuns

Separe visualmente.

## Texto centralizado em blocos longos

Reduz legibilidade.

## Card dentro de card dentro de card

Cria ruído visual e hierarquia confusa.

## Excesso de sombras

Use elevação apenas quando ela comunica hierarquia.

## Excesso de bordas

Espaçamento geralmente resolve separação melhor que linhas.

---

# 40. Processo recomendado de ponta a ponta

## Etapa 1 — Definir problema

Escreva:

```text
Usuário:
Problema:
Objetivo:
Contexto:
Resultado esperado:
```

## Etapa 2 — Mapear conteúdo

Liste tudo que precisa existir.

Depois classifique:

```text
Essencial
Importante
Secundário
Opcional
```

## Etapa 3 — Criar arquitetura

Organize telas e navegação.

## Etapa 4 — Criar fluxo

Desenhe a sequência de ações.

## Etapa 5 — Wireframe

Resolva:

- hierarquia;
- conteúdo;
- estrutura.

Não se preocupe com estética neste momento.

## Etapa 6 — Protótipo

Crie interação suficiente para testar.

## Etapa 7 — Teste

Observe usuários tentando realizar tarefas.

## Etapa 8 — UI Visual

Aplique:

- cores;
- tipografia;
- grid;
- tokens;
- componentes.

## Etapa 9 — Estados

Desenhe:

```text
Default
Loading
Empty
Error
Success
Disabled
Offline
Permission denied
```

## Etapa 10 — Acessibilidade

Revise:

- contraste;
- foco;
- semântica;
- labels;
- teclado;
- tamanho de toque.

## Etapa 11 — Responsividade

Teste diferentes dimensões.

## Etapa 12 — Handoff

Documente comportamentos.

## Etapa 13 — QA

Compare implementação com design.

## Etapa 14 — Métricas

Analise comportamento real.

## Etapa 15 — Iteração

UX nunca está realmente "finalizado".

---

# Framework rápido para avaliar qualquer tela

Sempre responda estas 10 perguntas:

1. Qual é o objetivo principal da tela?
2. O usuário entende esse objetivo em poucos segundos?
3. Qual é a ação principal?
4. Essa ação está visualmente clara?
5. Existe alguma informação desnecessária?
6. Existe algum passo que pode ser removido?
7. O usuário recebe feedback?
8. O que acontece em erro, vazio e loading?
9. A interface é acessível?
10. O fluxo funciona bem em diferentes tamanhos de tela?

---

# Checklist específico para Mobile

- [ ] Elementos principais acessíveis com uma mão
- [ ] Touch targets confortáveis
- [ ] Teclado não cobre campos importantes
- [ ] Scroll funciona sem conflitos
- [ ] Bottom navigation não possui itens demais
- [ ] Textos não são excessivamente pequenos
- [ ] Modais se adaptam à tela
- [ ] Safe areas são respeitadas
- [ ] Orientação horizontal foi considerada quando relevante
- [ ] Gestos possuem alternativa visível quando necessário
- [ ] Botão voltar possui comportamento previsível

---

# Checklist específico para Android / Jetpack Compose

## Layout

- [ ] Usar `Modifier.fillMaxWidth()` somente quando necessário
- [ ] Evitar tamanhos fixos excessivos
- [ ] Considerar diferentes densidades e dimensões
- [ ] Respeitar Window Insets
- [ ] Testar teclado IME

## Componentes

- [ ] Preferir componentes consistentes com Material 3 quando adequado
- [ ] Definir estados de loading e disabled
- [ ] Usar `contentDescription` de forma apropriada
- [ ] Garantir touch target suficiente
- [ ] Não depender exclusivamente de ícones sem contexto

## Tipografia

- [ ] Utilizar `sp`
- [ ] Testar escala de fonte maior
- [ ] Evitar truncamento de texto crítico

## Layout adaptativo

- [ ] Smartphone pequeno
- [ ] Smartphone grande
- [ ] Tablet
- [ ] Landscape
- [ ] Foldable quando relevante

---

# Checklist específico para Web

- [ ] Navegação por teclado
- [ ] Tab order correto
- [ ] Focus visível
- [ ] Hover não contém informação exclusiva
- [ ] Layout funciona sem mouse
- [ ] Zoom de navegador não quebra layout
- [ ] Imagens possuem alt quando necessário
- [ ] Formulários possuem labels
- [ ] Links podem ser reconhecidos
- [ ] Layout é responsivo

---

# Princípio final

Uma excelente interface não é aquela que demonstra o quanto o designer sabe.

É aquela em que o usuário consegue realizar o que precisa com:

- clareza;
- confiança;
- velocidade;
- baixo esforço;
- poucos erros.

> O melhor design frequentemente parece simples porque a complexidade foi resolvida antes de chegar ao usuário.

---

# Modelo de documentação para uma nova tela

```md
# Nome da tela

## Objetivo
Descrever o que o usuário deve conseguir fazer.

## Usuário
Quem utiliza.

## Entrada
De onde o usuário chega.

## Saída
Para onde pode ir.

## Ação principal
Principal CTA.

## Ações secundárias
Outras ações.

## Conteúdo
Informações necessárias.

## Componentes
Lista de componentes.

## Estados
- Loading
- Success
- Empty
- Error
- Disabled

## Regras
Regras de negócio relevantes.

## Responsividade
Comportamento por tamanho.

## Acessibilidade
Requisitos específicos.

## Analytics
Eventos importantes.

## Edge cases
Cenários extremos.
```

---

# Modelo para documentar um componente

```md
# Component: Product Card

## Objetivo
Apresentar um produto de forma resumida.

## Conteúdo
- imagem
- nome
- preço
- desconto
- avaliação
- favorito

## Interações
Tap no card → abrir detalhes.
Tap no favorito → salvar/remover favorito.

## Estados
- default
- pressed
- loading image
- unavailable
- favorited

## Acessibilidade
Nome acessível contendo produto e preço.

## Responsividade
Largura fluida dentro do grid.
```

---

# Matriz de prioridade de UX

Use:

```text
Impacto alto + esforço baixo
→ fazer primeiro

Impacto alto + esforço alto
→ planejar

Impacto baixo + esforço baixo
→ fazer quando houver capacidade

Impacto baixo + esforço alto
→ provavelmente evitar
```

---

# Critério para remover elementos

Para cada elemento, pergunte:

> Se eu remover isso, o usuário perde informação ou capacidade necessária?

Se a resposta for não, considere remover.

---

# Regra de ouro

Antes de adicionar algo à interface:

> Qual problema do usuário isso resolve?

Se não existir uma resposta clara, provavelmente o elemento não é necessário.

---

## Fim do guia

Este arquivo pode evoluir junto com o produto.  
Use-o como base para auditorias de UX, criação de novas telas, revisão de componentes, design systems, geração de interfaces com IA e handoff para desenvolvimento.
