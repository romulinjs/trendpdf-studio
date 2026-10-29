-- ==============================================================================
-- TRENDPDF STUDIO — SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY (RLS)
-- ==============================================================================
-- Este script configura toda a estrutura de banco de dados relacional, autenticação,
-- controle de créditos por IA e políticas de isolamento de dados no Supabase.
--
-- Como executar:
-- 1. Acesse o seu projeto no Supabase (https://supabase.com).
-- 2. Vá em 'SQL Editor' no menu lateral esquerdo.
-- 3. Cole este arquivo e clique em 'Run'.
-- ==============================================================================

-- 1. EXTENSÕES NECESSÁRIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABELA DE PERFIS DE USUÁRIOS (Vinculada ao auth.users do Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT DEFAULT 'Criador de Conteúdo',
    avatar_url TEXT,
    plan TEXT NOT NULL DEFAULT 'pro' CHECK (plan IN ('free', 'pro', 'enterprise')),
    ai_credits_balance INT NOT NULL DEFAULT 100 CHECK (ai_credits_balance >= 0),
    ai_credits_used INT NOT NULL DEFAULT 16 CHECK (ai_credits_used >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Comentários da tabela de perfis
COMMENT ON TABLE public.profiles IS 'Perfis de usuários sincronizados com o Supabase Auth';
COMMENT ON COLUMN public.profiles.ai_credits_balance IS 'Saldo de créditos disponíveis para geração de ideias e briefings com IA';

-- 3. TABELA DE TENDÊNCIAS DE MERCADO (Dados Globais do Trend Intelligence Engine)
CREATE TABLE IF NOT EXISTS public.trends (
    id TEXT PRIMARY KEY,
    keyword TEXT NOT NULL,
    category TEXT NOT NULL,
    monthly_searches TEXT NOT NULL,
    growth_rate TEXT NOT NULL,
    competition_level TEXT NOT NULL,
    score NUMERIC(3, 1) NOT NULL,
    summary TEXT NOT NULL,
    suggested_format TEXT NOT NULL,
    suggested_ticket TEXT NOT NULL,
    status_badge TEXT NOT NULL,
    provenance JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

COMMENT ON TABLE public.trends IS 'Índice de demanda e tendências ativas do mercado digital';

-- 4. TABELA DE IDEIAS DE INFOPRODUTOS (Por Usuário)
CREATE TABLE IF NOT EXISTS public.ideas (
    id TEXT PRIMARY KEY DEFAULT ('INF-' || to_char(now(), 'YYYY') || '-' || substr(md5(random()::text), 1, 4)),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    format TEXT NOT NULL,
    suggested_price TEXT NOT NULL,
    order_bump TEXT NOT NULL,
    order_bump_price TEXT NOT NULL,
    score NUMERIC(3, 1) NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pronto para Produção' CHECK (status IN ('Pronto para Produção', 'Rascunho', 'Em Validação')),
    target_audience TEXT NOT NULL,
    core_problem TEXT NOT NULL,
    why_sell_now TEXT NOT NULL,
    saved BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

COMMENT ON TABLE public.ideas IS 'Ideias e infoprodutos salvos na biblioteca de cada usuário';

-- 5. TABELA DE CAPÍTULOS E ESTRUTURA EDITORIAL (10 Capítulos por Ideia)
CREATE TABLE IF NOT EXISTS public.chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    idea_id TEXT NOT NULL REFERENCES public.ideas(id) ON DELETE CASCADE,
    chapter_number INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_idea_chapter UNIQUE (idea_id, chapter_number)
);

COMMENT ON TABLE public.chapters IS 'Capítulos estruturados dos briefings de infoprodutos';

-- 6. TABELA DE CONFIGURAÇÕES EDITORIAIS DO USUÁRIO
CREATE TABLE IF NOT EXISTS public.user_settings (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    author_name TEXT DEFAULT 'Ana Martins',
    current_plan TEXT DEFAULT 'Plano Pro',
    currency TEXT DEFAULT 'Real Brasileiro (R$)',
    default_ebook_pages TEXT DEFAULT 'Guia Prático Padrão (30 a 50 páginas)',
    gemini_api_key TEXT,
    theme_preference TEXT DEFAULT 'system' CHECK (theme_preference IN ('system', 'light', 'dark')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

COMMENT ON TABLE public.user_settings IS 'Preferências editoriais e integrações de cada usuário';

-- 7. TABELA DE LOGS DE TRANSAÇÕES DE CRÉDITOS DE IA
CREATE TABLE IF NOT EXISTS public.ai_credit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount INT NOT NULL,
    action TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) — SEGURANÇA E ISOLAMENTO MULTI-TENANT
-- ==============================================================================

-- Habilita RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_credit_logs ENABLE ROW LEVEL SECURITY;

-- Políticas para: profiles
CREATE POLICY "Usuários podem ver seu próprio perfil" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Políticas para: trends (Leitura pública/autenticada para todos)
CREATE POLICY "Todos os usuários autenticados podem ler tendências" 
ON public.trends FOR SELECT 
USING (true);

-- Políticas para: ideas (Apenas o dono pode ler, inserir, atualizar e excluir)
CREATE POLICY "Usuários podem ver suas próprias ideias" 
ON public.ideas FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar suas ideias" 
ON public.ideas FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas ideias" 
ON public.ideas FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas ideias" 
ON public.ideas FOR DELETE 
USING (auth.uid() = user_id);

-- Políticas para: chapters (Acesso condicionado ao dono da ideia)
CREATE POLICY "Usuários podem ver capítulos de suas ideias" 
ON public.chapters FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.ideas 
        WHERE ideas.id = chapters.idea_id AND ideas.user_id = auth.uid()
    )
);

CREATE POLICY "Usuários podem criar capítulos em suas ideias" 
ON public.chapters FOR INSERT 
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.ideas 
        WHERE ideas.id = chapters.idea_id AND ideas.user_id = auth.uid()
    )
);

CREATE POLICY "Usuários podem atualizar capítulos de suas ideias" 
ON public.chapters FOR UPDATE 
USING (
    EXISTS (
        SELECT 1 FROM public.ideas 
        WHERE ideas.id = chapters.idea_id AND ideas.user_id = auth.uid()
    )
);

CREATE POLICY "Usuários podem excluir capítulos de suas ideias" 
ON public.chapters FOR DELETE 
USING (
    EXISTS (
        SELECT 1 FROM public.ideas 
        WHERE ideas.id = chapters.idea_id AND ideas.user_id = auth.uid()
    )
);

-- Políticas para: user_settings
CREATE POLICY "Usuários podem ver suas próprias configurações" 
ON public.user_settings FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir suas configurações" 
ON public.user_settings FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas configurações" 
ON public.user_settings FOR UPDATE 
USING (auth.uid() = user_id);

-- Políticas para: ai_credit_logs
CREATE POLICY "Usuários podem ver seus logs de crédito" 
ON public.ai_credit_logs FOR SELECT 
USING (auth.uid() = user_id);

-- ==============================================================================
-- 9. TRIGGERS AUTOMÁTICOS DE SUPABASE AUTH E CRÉDITOS
-- ==============================================================================

-- Função que inicializa o Profile e User Settings quando um usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Criação do perfil público com 100 créditos iniciais e Plano Pro
    INSERT INTO public.profiles (id, email, name, avatar_url, plan, ai_credits_balance, ai_credits_used)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', NULL),
        'pro',
        100,
        0
    );

    -- Criação das configurações editoriais padrão
    INSERT INTO public.user_settings (user_id, author_name, current_plan, currency, default_ebook_pages, theme_preference)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        'Plano Pro',
        'Real Brasileiro (R$)',
        'Guia Prático Padrão (30 a 50 páginas)',
        'system'
    );

    -- Log inicial de boas-vindas e bonificação de créditos
    INSERT INTO public.ai_credit_logs (user_id, amount, action, details)
    VALUES (
        NEW.id,
        100,
        'bonus_cadastro',
        'Créditos iniciais concedidos no cadastro da conta.'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para disparar na criação de usuário no auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 10. DADOS INICIAIS (SEED) DE TENDÊNCIAS GLOBAIS
-- ==============================================================================
INSERT INTO public.trends (id, keyword, category, monthly_searches, growth_rate, competition_level, score, summary, suggested_format, suggested_ticket, status_badge)
VALUES
('TRD-01', 'Educação Financeira Infantil & Mesada Educativa', 'Parentalidade & Educação', '185.000 buscas/mês', '+280%', 'Baixa', 9.4, 'Forte aumento de interesse de pais buscando ensinar valor do dinheiro sem conflitos familiares.', 'Caderno Gamificado + Planner de Mesada', 'R$ 37,00', 'Ascensão Acelerada'),
('TRD-02', 'Organização Notion & Second Brain para TDAH', 'Produtividade Pessoal', '240.000 buscas/mês', '+195%', 'Média', 9.2, 'Busca por sistemas visuais simples, checklists descompressivos e rotinas anti-procrastinação.', 'Guia Passo a Passo + Fichas Imprimíveis', 'R$ 47,00', 'Alta Constante'),
('TRD-03', 'Cardápios Anti-inflamatórios e Marmitas da Semana', 'Saúde & Bem-Estar', '310.000 buscas/mês', '+160%', 'Média-Alta', 8.9, 'Alta demanda por listas de compras inteligentes de 15 minutos e substituições econômicas.', 'Planner Semanal + Livro de Receitas Rápidas', 'R$ 29,90', 'Pico Sazonal'),
('TRD-04', 'Micro-SaaS com IA: Do Zero ao Primeiro Cliente', 'Negócios & Tecnologia', '120.000 buscas/mês', '+340%', 'Baixa em Português', 9.6, 'Explosão de buscas por templates de validação rápida e esteiras de aquisição orgânica.', 'Playbook Executivo de 15 Dias', 'R$ 67,00', 'Explosão de Interesse'),
('TRD-05', 'Manual de Sobrevivência para Pais de Primeira Viagem', 'Parentalidade & Educação', '190.000 buscas/mês', '+110%', 'Média', 8.7, 'Checklists emergenciais de mala de maternidade, rotina de sono e primeiros socorros domésticos.', 'Checklist de Bolso + Guia Noturno', 'R$ 35,00', 'Perene / Evergreen'),
('TRD-06', 'Prompt Engineering & Automações para Advogados', 'Carreira & Jurídico', '95.000 buscas/mês', '+410%', 'Muito Baixa', 9.5, 'Necessidade urgente de criar peças, minutas e sínteses processuais usando IA com segurança ética.', 'Dicionário de Prompts + Guia de Fluxos', 'R$ 97,00', 'Nova Fronteira')
ON CONFLICT (id) DO NOTHING;

