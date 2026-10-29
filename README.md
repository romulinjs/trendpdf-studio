# 🚀 TrendPDF Studio — AI Intelligence & Digital Editorial Studio

[![React 18](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL%20%26%20Auth-3ecf8e?logo=supabase&logoColor=white)](https://supabase.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-API%20Flash-4285f4?logo=google&logoColor=white)](https://ai.google.dev/)

Plataforma SaaS de inteligência preditiva para identificar demandas e tendências de mercado e transformá-las em infoprodutos lucrativos em formato PDF (e-books, planners imprimíveis, cadernos de atividades e checklists de alta conversão).

---

## 🌟 Principais Funcionalidades

### 1. 🌐 Tela Inicial de Apresentação (Landing Page)
- Interface de conversão com proposta de valor, métricas de mercado (94% margem média, validação em < 3 minutos) e fluxo em 4 etapas.
- Proteção de acesso: o painel de ferramentas fica restrito a usuários autenticados.
- Modo de demonstração com 1 clique para testes imediatos sem necessidade de cadastro.

### 2. 🔐 Autenticação & Usuários Multi-Tenant
- Login com **E-mail/Senha** e **Google OAuth**.
- Isolamento de dados por usuário com **Row Level Security (RLS)** no PostgreSQL.
- Controle e auditoria de **créditos de IA** (100 créditos grátis concedidos no cadastro).

### 3. 📊 Dados Reais & Proveniência de Pesquisa
- Integração com **Google Trends Brasil**, **Google Autocomplete API** (consultas reais digitadas pelos usuários) e marketplaces digitais (**Kiwify** e **Hotmart**).
- **Validação Matemática do Score de Oportunidade (0 a 10)**:
  $$\text{Score} = (\text{Crescimento } \times 0.40) + (\text{Volume } \times 0.30) + (\text{Oceano Azul } \times 0.30)$$
- Modal de Auditoria e Rastreabilidade com link direto para consulta no Google Trends oficial.
- **Analisador em Tempo Real**: pesquise e audite qualquer nicho instantaneamente.

### 4. 💡 Gerador de Ideias & Sumários de 10 Capítulos
- Modelagem editorial baseada em público-alvo, dores reais e ângulos persuasivos.
- Geração instantânea de sumários estruturados de 10 capítulos com ganchos comerciais.
- Exportação client-side de briefings completos diagramados em PDF via `jsPDF`.

### 5. 🔖 Gestão de Favoritos & Biblioteca Editorial
- Salvamento em 1 clique com sincronização local e nuvem.
- Filtros por status de esteira (*Pronto para Produção*, *Em Validação*, *Rascunho*).
- Exportação consolidada da biblioteca em **CSV**.

### 6. 🚀 Esteira de Publicação Multicanal
- **Kiwify & Hotmart**: Título, headline de checkout, descrição comercial e oferta de Order Bump pronta.
- **Amazon KDP**: Título, subtítulo, 7 palavras-chave de busca e sinopse em HTML formatada.
- **Página de Vendas**: Copy persuasiva com as 3 principais dores, benefícios e garantia de 7 dias.

---

## 📁 Estrutura do Projeto

```
stitch_trendpdf_studio_interface/
├── src/
│   ├── components/             # Modais, Header, Sidebar, Toasts e Skeletons
│   │   ├── Header.jsx
│   │   ├── ModalAuditoriaDados.jsx
│   │   ├── ModalAuth.jsx
│   │   ├── ModalConfirmacao.jsx
│   │   ├── ModalPublicacao.jsx
│   │   ├── ModalSumario.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SkeletonCard.jsx
│   │   └── Toast.jsx
│   ├── context/
│   │   └── AuthContext.jsx     # Gestão de sessão, login, cadastro e créditos
│   ├── data/
│   │   └── mockData.js         # Base inicial auditada com proveniência
│   ├── pages/
│   │   ├── Configuracoes.jsx
│   │   ├── Dashboard.jsx
│   │   ├── GerarIdeias.jsx
│   │   ├── IdeiasSalvas.jsx
│   │   ├── LandingPage.jsx     # Tela inicial de apresentação
│   │   └── PesquisarTendencias.jsx
│   ├── services/
│   │   ├── dbService.js        # Camada de abstração de dados (Supabase/Local)
│   │   ├── geminiService.js    # Motor de IA com Google Gemini API
│   │   ├── pdfService.js       # Gerador de PDFs diagramados
│   │   ├── storageService.js   # Persistência local
│   │   ├── supabaseClient.js   # Conector Supabase
│   │   ├── themeService.js     # Gestor de temas Claro/Escuro/Sistema
│   │   └── trendIntelligenceService.js # Métricas reais e cálculo de scores
│   ├── App.jsx                 # Roteamento e orquestrador principal
│   ├── index.css               # Estilos globais e tokens Tailwind
│   └── main.jsx
├── uxui/                       # Documentação de Design System e diretrizes WCAG AA
├── supabase_schema.sql         # Script SQL DDL com RLS, Triggers e Seeds
├── .env.example                # Modelo de variáveis de ambiente
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js LTS** (v18 ou superior instalado)

### 1. Instalar as dependências
```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
Acesse no seu navegador: **`http://localhost:3000`**

### 3. Compilar para Produção
```bash
npm run build
```

---

## 🗄️ Configuração do Banco de Dados (Supabase)

1. Crie um projeto gratuito em [supabase.com](https://supabase.com).
2. Abra o **SQL Editor** no painel do Supabase, cole o conteúdo de [`supabase_schema.sql`](./supabase_schema.sql) e execute.
3. Copie suas credenciais em **Project Settings → API** e configure no seu `.env`:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

---

## 📄 Licença
Distribuído sob a licença MIT. Consulte `LICENSE` para obter mais informações.
