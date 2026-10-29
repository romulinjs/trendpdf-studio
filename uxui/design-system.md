# Design System — TrendPDF Studio

## 1. Objetivo
Padronizar a linguagem visual, componentes, tokens e regras de interação e acessibilidade para toda a plataforma TrendPDF Studio, garantindo máxima consistência e usabilidade em Desktop, Tablet e Mobile.

## 2. Princípios de Design
- **Clareza Imediata:** O usuário compreende a hierarquia da tela e o próximo passo em até 3 segundos.
- **Rigor Analítico & Sofisticação:** Tipografia executiva neutra com foco total em dados acionáveis.
- **Tolerância a Falhas:** Prevenção ativa de erros, estados de recuperação e confirmação para ações destrutivas.
- **Acessibilidade Universal (WCAG AA):** Contraste mínimo de 4.5:1 em textos normais, áreas de toque >= 44px e anéis de foco visíveis em todos os elementos navegáveis.

## 3. Design Tokens

### Espaçamento (8pt Grid + Meio-Passo)
- `space-1` (4px): Espaçamentos atômicos entre ícone e texto.
- `space-2` (8px): Espaçamentos entre tags e badges.
- `space-3` (12px): Padding interno de inputs e botões compactos.
- `space-4` (16px): Gutter mobile e separação padrão de blocos.
- `space-6` (24px): Padding interno de cards e gutters desktop.
- `space-8` (32px): Margem entre seções principais.
- `space-12` (48px): Espaço de respiro executivo.

### Radius (Bordas Arredondadas)
- `rounded-md` (8px): Badges, tags e inputs.
- `rounded-lg` (12px): Botões e cards compactos.
- `rounded-xl` (16px): Cards de módulos e modais.
- `rounded-2xl` (24px): Banners de destaque e containers principais.
- `rounded-full` (9999px): Avatares e pills de status.

### Tipografia
- **Títulos & Cabeçalhos:** `Plus Jakarta Sans` (pesos 600 e 700)
  - Display: 32px / 40px (Desktop), 24px / 32px (Mobile)
  - H1: 28px / 36px (Desktop), 22px / 28px (Mobile)
  - H2: 20px / 28px
  - H3: 16px / 24px
- **Corpo & Métricas:** `Inter` (pesos 400, 500 e 600)
  - Body Large: 16px / 26px
  - Body Medium: 14px / 22px
  - Body Small: 12px / 18px
  - Metric Mono / Tabular: 13px / 16px (tabular-nums)

### Paleta de Cores
- **Primary:** `#4F46E5` (Indigo 600) | Hover: `#4338CA` | Container: `#EEF2FF`
- **Secondary / Success:** `#006C49` (Emerald 700) | Container: `#ECFDF5`
- **Neutral Dark (On-Surface):** `#131B2E` (Slate 900)
- **Neutral Muted (Secondary Text):** `#464555` (Slate 600)
- **Neutral Surface Canvas:** `#FAF8FF`
- **Neutral Surface Cards:** `#FFFFFF`
- **Borders & Outlines:** `#E2E8F0` (Slate 200) | Hover: `#CBD5E1`
- **Warning:** `#D97706` (Amber 600) | Container: `#FEF3C7`
- **Error:** `#BA1A1A` (Rose 600) | Container: `#FFDAD6`

## 4. Estados Mínimos de Componentes
Todos os componentes interativos do TrendPDF Studio devem implementar:
1. **Default:** Visual limpo e acessível.
2. **Hover:** Transição suave de fundo e borda (150ms).
3. **Focus:** `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-offset-2`.
4. **Pressed / Active:** Efeito de escala tátil `active:scale-[0.98]`.
5. **Disabled:** Opacidade reduzida (`opacity-50 cursor-not-allowed`).
6. **Loading:** Efeito spinner ou Skeleton Shimmer.
7. **Empty:** Ilustração/ícone, título amigável, texto descritivo e CTA de ação.
8. **Error:** Ícone de aviso, borda de destaque e mensagem de orientação clara.

## 5. Layout & Responsividade
- **Desktop (>= 1024px):** Barra lateral fixa (260px), cabeçalho fixo com blur, conteúdo fluido até 1440px.
- **Tablet (768px - 1023px):** Menu em gaveta retrátil, grade de 2 colunas para cards.
- **Mobile (< 768px):** Menu hambúrguer em drawer deslizante, coluna única vertical, botões de toque pleno (min 44px de altura) e paddings seguros.
