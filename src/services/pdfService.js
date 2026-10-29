import { jsPDF } from 'jspdf';

/**
 * Paleta de Cores e Tokens Editoriais do TrendPDF Studio
 */
const PALETTE = {
  primary: [79, 70, 229],       // Indigo 600
  primaryDark: [67, 56, 202],   // Indigo 700
  primaryLight: [238, 242, 255],// Indigo 50
  emerald: [16, 185, 129],      // Emerald 500
  emeraldDark: [5, 150, 105],   // Emerald 600
  emeraldLight: [240, 253, 244],// Emerald 50
  slate900: [15, 23, 42],       // Titulares & Fundo Capa
  slate800: [30, 41, 59],       // Subtítulos H2
  slate700: [51, 65, 85],       // Parágrafos de leitura
  slate500: [100, 116, 139],    // Legendas e metadados
  slate400: [148, 163, 184],    // Running headers & footers
  slate100: [241, 245, 249],    // Background cards
  border: [226, 232, 240],      // Linhas divisórias e contornos
  white: [255, 255, 255],
};

export const pdfService = {
  /**
   * 1. Gera e faz o download automático de um briefing editorial executivo em PDF (1 a 2 páginas).
   */
  generateIdeaPDF: (idea, options = {}) => {
    if (!idea) {
      throw new Error('Nenhum dado de ideia foi fornecido para exportação.');
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const margin = 22;
    const pageWidth = 210;
    const pageHeight = 297;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    const tituloEstrategico = idea.titulo_estrategico || idea.title || 'Infoproduto em PDF';
    const dorResolvida = idea.dor_resolvida || idea.corePain || 'Falta de método estruturado e passo a passo claro para execução.';
    const sumarioCapitulos = Array.isArray(idea.sumario || idea.chapters) ? (idea.sumario || idea.chapters) : [];
    const publicoAlvo = idea.targetAudience || 'Profissionais e entusiastas do nicho';
    const ticketSugerido = idea.suggestedPrice || 'R$ 47,00';
    const formato = idea.format || 'E-book Guia (PDF)';

    // Barra de Topo Editorial
    doc.setFillColor(...PALETTE.primary);
    doc.rect(0, 0, pageWidth, 12, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('TRENDPDF STUDIO  •  BRIEFING ESTRATÉGICO EXECUTIVO  •  EDIÇÃO 2026', margin, 8);

    y = 22;

    // Badges de Metadados
    doc.setFillColor(...PALETTE.primaryLight);
    doc.roundedRect(margin, y, 68, 7, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...PALETTE.primary);
    doc.text(formato, margin + 4, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...PALETTE.slate500);
    doc.text(`ID: ${idea.id || 'INF-AI'}  |  Score Preditivo: ${idea.score || '9.4'}/10`, pageWidth - margin - 58, y + 5);

    y += 13;

    // Título Principal
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...PALETTE.slate900);
    const splitTitle = doc.splitTextToSize(tituloEstrategico, contentWidth);
    doc.text(splitTitle, margin, y);
    y += splitTitle.length * 7.5 + 4;

    // Resumo Persuasivo
    if (idea.description) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.8);
      doc.setTextColor(...PALETTE.slate700);
      const splitDesc = doc.splitTextToSize(idea.description, contentWidth);
      doc.text(splitDesc, margin, y);
      y += splitDesc.length * 5.2 + 6;
    }

    doc.setDrawColor(...PALETTE.border);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 7;

    // Box: Dor Central Resolvida
    const splitPain = doc.splitTextToSize(dorResolvida, contentWidth - 16);
    const painBoxHeight = 14 + (splitPain.length * 5);
    doc.setFillColor(...PALETTE.slate100);
    doc.roundedRect(margin, y, contentWidth, painBoxHeight, 2.5, 2.5, 'F');
    doc.setDrawColor(...PALETTE.border);
    doc.roundedRect(margin, y, contentWidth, painBoxHeight, 2.5, 2.5, 'D');

    // Faixa lateral
    doc.setFillColor(...PALETTE.primary);
    doc.roundedRect(margin, y, 3, painBoxHeight, 1.5, 1.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...PALETTE.primaryDark);
    doc.text('DOR AGUDA RESOLVIDA (PROPOSTA DE VALOR CENTRAL):', margin + 7, y + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...PALETTE.slate800);
    doc.text(splitPain, margin + 7, y + 12.5);

    y += painBoxHeight + 7;

    // Métricas: Público e Preço
    doc.setFillColor(...PALETTE.slate100);
    doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'F');
    doc.setDrawColor(...PALETTE.border);
    doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...PALETTE.slate500);
    doc.text('PÚBLICO-ALVO:', margin + 6, y + 8.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...PALETTE.slate800);
    doc.text(publicoAlvo, margin + 32, y + 8.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...PALETTE.slate500);
    doc.text('TICKET SUGERIDO:', margin + 105, y + 8.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...PALETTE.primaryDark);
    doc.text(ticketSugerido, margin + 138, y + 8.5);

    y += 20;

    // Sumário dos 10 Capítulos
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...PALETTE.slate900);
    doc.text('ESTRUTURA EDITORIAL SUGERIDA (10 CAPÍTULOS)', margin, y);
    y += 7;

    if (sumarioCapitulos && sumarioCapitulos.length > 0) {
      sumarioCapitulos.forEach((chap, idx) => {
        if (y > pageHeight - 25) {
          doc.addPage();
          doc.setFillColor(...PALETTE.primary);
          doc.rect(0, 0, pageWidth, 8, 'F');
          y = 20;
        }

        const num = chap.number || idx + 1;
        const chapTitle = chap.title || (typeof chap === 'string' ? chap : `Capítulo ${num}`);

        doc.setFillColor(...PALETTE.primaryLight);
        doc.roundedRect(margin, y - 3.8, 16, 5.5, 1.2, 1.2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(...PALETTE.primaryDark);
        doc.text(`CAP ${num < 10 ? '0' + num : num}`, margin + 2, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(...PALETTE.slate800);
        const titleSplit = doc.splitTextToSize(chapTitle, contentWidth - 22);
        doc.text(titleSplit, margin + 20, y);

        y += Math.max(7, titleSplit.length * 5 + 2);
      });
    }

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...PALETTE.slate400);
      doc.setDrawColor(...PALETTE.border);
      doc.setLineWidth(0.2);
      doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);
      doc.text(
        `TrendPDF Studio  •  Briefing Estratégico  |  Página ${i} de ${totalPages}`,
        margin,
        pageHeight - 9
      );
    }

    const sanitizedTitle = tituloEstrategico
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '_')
      .slice(0, 25);
    const filename = `briefing_${idea.id || 'ideia'}_${sanitizedTitle}.pdf`;

    doc.save(filename);
    return filename;
  },

  /**
   * 2. Gera e compila o E-BOOK COMPLETO DIAGRAMADO de alta conversão,
   * livre de sobreposições, texto vazando de blocos ou colisões de cabeçalho/rodapé.
   */
  generateFullEbookPDF: (idea, fullChapters = [], options = {}) => {
    if (!idea) {
      throw new Error('Nenhum dado de ideia fornecido para compilação do e-book.');
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 24;
    const contentWidth = pageWidth - margin * 2; // 162 mm

    // Layout boundaries estritos para garantir 0 colisão com cabeçalho (y=16) e rodapé (y=281)
    const layout = {
      margin,
      pageWidth,
      pageHeight,
      contentWidth,
      minY: 26,     // Conteúdo sempre começa após o header
      maxY: 274,    // Conteúdo NUNCA ultrapassa 274mm (7mm antes da linha do rodapé em 281mm)
    };

    const cursor = { y: layout.minY };

    const bookTitle = idea.titulo_estrategico || idea.title || 'Infoproduto em PDF';
    const subtitle = idea.description || idea.corePain || 'Guia Prático Passo a Passo de Implementação Rápida';
    const authorName = options.authorName || 'TrendPDF Studio';

    // ==========================================
    // MOTOR DE FLUXO TIPOGRÁFICO À PROVA DE VAZAMENTOS
    // ==========================================

    /**
     * Renderiza parágrafos divididos linha por linha com quebra de página automática.
     * NUNCA permite que o texto vaze sobre o rodapé ou fora da página.
     */
    function renderParagraphs(text, opts = {}) {
      if (!text) return;
      const {
        fontSize = 10,
        fontStyle = 'normal',
        textColor = PALETTE.slate700,
        lineHeight = 5.2,
        paragraphSpacing = 4.5,
        maxWidth = layout.contentWidth,
        x = layout.margin,
      } = opts;

      doc.setFont('helvetica', fontStyle);
      doc.setFontSize(fontSize);
      doc.setTextColor(...textColor);

      const paragraphs = text.split(/\r?\n\s*\r?\n/).filter((p) => p.trim().length > 0);

      paragraphs.forEach((paragraph, pIdx) => {
        const lines = doc.splitTextToSize(paragraph.trim(), maxWidth);

        lines.forEach((line) => {
          if (cursor.y + lineHeight > layout.maxY) {
            doc.addPage();
            cursor.y = layout.minY;
            doc.setFont('helvetica', fontStyle);
            doc.setFontSize(fontSize);
            doc.setTextColor(...textColor);
          }
          doc.text(line, x, cursor.y);
          cursor.y += lineHeight;
        });

        if (pIdx < paragraphs.length - 1) {
          if (cursor.y + paragraphSpacing <= layout.maxY) {
            cursor.y += paragraphSpacing;
          }
        }
      });
    }

    /**
     * Renderiza subtítulos de seção com proteção contra linhas órfãs (widow/orphan prevention).
     * Se o título não couber com pelo menos 3 linhas de texto na página atual, força nova página.
     */
    function renderHeading(title, opts = {}) {
      if (!title) return;
      const {
        fontSize = 12.5,
        fontStyle = 'bold',
        textColor = PALETTE.slate800,
        lineHeight = 6.2,
        spacingBefore = 7,
        spacingAfter = 3.5,
        minRemainingSpace = 30,
        maxWidth = layout.contentWidth,
        x = layout.margin,
      } = opts;

      if (cursor.y > layout.minY + 2) {
        cursor.y += spacingBefore;
      }

      const lines = doc.splitTextToSize(title, maxWidth);
      const headingHeight = lines.length * lineHeight;

      if (cursor.y + headingHeight + minRemainingSpace > layout.maxY) {
        doc.addPage();
        cursor.y = layout.minY;
      }

      doc.setFont('helvetica', fontStyle);
      doc.setFontSize(fontSize);
      doc.setTextColor(...textColor);

      lines.forEach((line) => {
        doc.text(line, x, cursor.y);
        cursor.y += lineHeight;
      });

      cursor.y += spacingAfter;
    }

    /**
     * Renderiza caixas de destaque (Exercício Prático ou Síntese) com altura dinâmica
     * calculada exatamente com base nas linhas de texto reais, impedindo que o texto
     * vaze para fora da moldura.
     */
    function renderCalloutBox(config) {
      const {
        badge = '',
        content = '',
        type = 'exercise',
        maxWidth = layout.contentWidth,
        x = layout.margin,
      } = config;

      if (!content) return;

      const theme = type === 'exercise' ? {
        bg: PALETTE.emeraldLight,
        border: [187, 247, 208],
        accent: PALETTE.emerald,
        badgeColor: [21, 128, 61],
        textColor: PALETTE.slate800,
        icon: '•',
        badgeText: badge || 'EXERCÍCIO DE IMPLEMENTAÇÃO IMEDIATA (5-10 MIN)',
      } : {
        bg: PALETTE.primaryLight,
        border: [224, 231, 255],
        accent: PALETTE.primary,
        badgeColor: PALETTE.primaryDark,
        textColor: PALETTE.slate800,
        icon: '★',
        badgeText: badge || 'SÍNTESE & REGRA DE OURO',
      };

      const paddingX = 8;
      const paddingY = 6;
      const textInnerWidth = maxWidth - (paddingX * 2) - 4; // Reserva espaço da faixa lateral esquerda

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      const textLines = doc.splitTextToSize(content.trim(), textInnerWidth);
      const textLineHeight = 5.1;
      const badgeHeight = 6.5;
      const totalBoxHeight = paddingY + badgeHeight + (textLines.length * textLineHeight) + paddingY + 1;

      if (cursor.y > layout.minY + 2) {
        cursor.y += 5;
      }

      // Se o bloco inteiro não couber na página atual, transporta-o de forma limpa para a próxima página
      if (cursor.y + totalBoxHeight > layout.maxY) {
        doc.addPage();
        cursor.y = layout.minY;
      }

      const boxY = cursor.y;

      // Fundo suave
      doc.setFillColor(...theme.bg);
      doc.roundedRect(x, boxY, maxWidth, totalBoxHeight, 2.5, 2.5, 'F');

      // Contorno suave
      doc.setDrawColor(...theme.border);
      doc.setLineWidth(0.3);
      doc.roundedRect(x, boxY, maxWidth, totalBoxHeight, 2.5, 2.5, 'D');

      // Faixa lateral esquerda sólida com acabamento arredondado executivo
      doc.setFillColor(...theme.accent);
      doc.roundedRect(x, boxY, 3.5, totalBoxHeight, 1.5, 1.5, 'F');

      // Título do Badge
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...theme.badgeColor);
      doc.text(`${theme.icon}  ${theme.badgeText.toUpperCase()}`, x + paddingX + 2, boxY + paddingY + 3.5);

      // Texto interno proporcional e contido
      doc.setFont('helvetica', type === 'takeaway' ? 'italic' : 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...theme.textColor);

      let currentTextY = boxY + paddingY + badgeHeight + 2.5;
      textLines.forEach((line) => {
        doc.text(line, x + paddingX + 2, currentTextY);
        currentTextY += textLineHeight;
      });

      cursor.y = boxY + totalBoxHeight + 6;
    }

    // ==========================================
    // PÁGINA 1: CAPA PROFISSIONAL E MODERNA
    // ==========================================
    doc.setFillColor(...PALETTE.slate900);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Cabeçalho gráfico escuro com transição elegante
    doc.setFillColor(24, 34, 60);
    doc.rect(0, 0, pageWidth, 80, 'F');

    // Faixa dupla decorativa moderna
    doc.setFillColor(...PALETTE.primary);
    doc.rect(0, 78, pageWidth, 2.5, 'F');

    doc.setFillColor(...PALETTE.emerald);
    doc.rect(margin, 78, 45, 2.5, 'F');

    // Badge Superior da Capa
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...PALETTE.emerald);
    doc.text('TRENDPDF STUDIO  •  ESTÚDIO DE INFOPRODUTOS ESTRATÉGICOS', margin, 32);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(203, 213, 225);
    doc.text(`COLEÇÃO EXCLUSIVA • EDIÇÃO ${new Date().getFullYear()}`, margin, 42);

    // Título Principal da Obra
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    const splitTitle = doc.splitTextToSize(bookTitle, contentWidth);
    let coverY = 110;
    doc.text(splitTitle, margin, coverY);
    coverY += splitTitle.length * 9.5 + 8;

    // Divisor de Destaque
    doc.setFillColor(...PALETTE.emerald);
    doc.roundedRect(margin, coverY, 35, 1.5, 0.75, 0.75, 'F');
    coverY += 12;

    // Subtítulo / Descrição Persuasiva
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(203, 213, 225);
    const splitSub = doc.splitTextToSize(subtitle, contentWidth);
    doc.text(splitSub, margin, coverY);
    coverY += splitSub.length * 6 + 14;

    // Badges de Recursos do Livro
    const pills = ['10 CAPÍTULOS PRÁTICOS', 'EXERCÍCIOS DE AÇÃO', 'MÉTODO PASSO A PASSO'];
    let pillX = margin;
    pills.forEach((pText) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      const pWidth = doc.getTextWidth(pText) + 8;
      doc.setFillColor(30, 41, 59);
      doc.roundedRect(pillX, coverY, pWidth, 7, 1.5, 1.5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text(pText, pillX + 4, coverY + 4.8);
      pillX += pWidth + 4;
    });

    // Card do Autor & Selo no Rodapé da Capa
    doc.setFillColor(20, 29, 47);
    doc.roundedRect(margin, pageHeight - 48, contentWidth, 26, 3, 3, 'F');
    doc.setDrawColor(40, 53, 80);
    doc.roundedRect(margin, pageHeight - 48, contentWidth, 26, 3, 3, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`Autor: ${authorName}`, margin + 8, pageHeight - 34);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...PALETTE.slate400);
    doc.text('Auditoria de Demanda & Validação Editorial Inteligente  •  Distribuição Autorizada', margin + 8, pageHeight - 27);

    // ==========================================
    // PÁGINA 2: APRESENTAÇÃO & FICHA EDITORIAL
    // (Sem repetição do cabeçalho de título!)
    // ==========================================
    doc.addPage();
    cursor.y = layout.minY + 4;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...PALETTE.slate900);
    doc.text('Apresentação & Como Usar Este Livro', margin, cursor.y);
    cursor.y += 10;

    renderParagraphs(
      `Este material foi concebido com uma premissa clara: entregar uma experiência prática, direta e de alta transformação para o seu dia a dia. Ao contrário de obras densas e teóricas que ficam esquecidas na estante, cada linha deste livro foi arquitetada para solucionar de forma prática a dor de "${idea.dor_resolvida || idea.corePain || 'obter resultados claros'}" de maneira imediata.\n\nRecomendamos que você aplique os conceitos em ritmo de imersão. Ao final de cada um dos 10 capítulos, você encontrará um exercício de ação rápida e a síntese da regra de ouro. Se você dedicar de 5 a 10 minutos para executar a atividade sugerida, verá os resultados se consolidarem com leveza e precisão.`,
      { fontSize: 10, lineHeight: 5.4, paragraphSpacing: 4.5 }
    );

    cursor.y += 6;

    // Ficha Técnica Editorial Estruturada
    const cardY = cursor.y;
    const cardHeight = 62;
    doc.setFillColor(...PALETTE.slate100);
    doc.roundedRect(margin, cardY, contentWidth, cardHeight, 3, 3, 'F');
    doc.setDrawColor(...PALETTE.border);
    doc.roundedRect(margin, cardY, contentWidth, cardHeight, 3, 3, 'D');

    // Faixa lateral Indigo
    doc.setFillColor(...PALETTE.primary);
    doc.roundedRect(margin, cardY, 3, cardHeight, 1.5, 1.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...PALETTE.primaryDark);
    doc.text('FICHA CATALOGRÁFICA & METADADOS DA EDIÇÃO', margin + 8, cardY + 9);

    const metaRows = [
      ['Título da Obra:', bookTitle],
      ['Categoria & Mercado:', idea.category || 'Educação & Negócios'],
      ['Público-Alvo Prioritário:', idea.targetAudience || 'Público Geral'],
      ['Formato Editorial:', idea.format || 'E-book Guia de Aplicação Rápida'],
      ['Licenciamento & Direitos:', 'Licenciado para estudo, uso pessoal e implementação profissional.'],
    ];

    let metaY = cardY + 18;
    metaRows.forEach(([lbl, val]) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...PALETTE.slate800);
      doc.text(lbl, margin + 8, metaY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...PALETTE.slate700);
      const splitVal = doc.splitTextToSize(val, contentWidth - 55);
      doc.text(splitVal, margin + 50, metaY);
      metaY += Math.max(7, splitVal.length * 4.5 + 2);
    });

    // ==========================================
    // PÁGINA 3: SUMÁRIO GERAL (RESERVADA PARA PREENCHIMENTO REAL)
    // ==========================================
    doc.addPage();
    const tocPageIndex = 3;

    // ==========================================
    // PÁGINAS 4+: CONTEÚDO DOS CAPÍTULOS
    // ==========================================
    const chaptersToRender = (fullChapters && fullChapters.length > 0)
      ? fullChapters
      : (idea.chapters || idea.sumario || []);

    const chapterStarts = {};

    chaptersToRender.forEach((ch, idx) => {
      doc.addPage();
      cursor.y = layout.minY + 2;

      const num = ch.chapterNumber || ch.number || idx + 1;
      const title = ch.chapterTitle || ch.title || `Capítulo ${num}`;
      chapterStarts[num] = doc.internal.getCurrentPageInfo().pageNumber;

      // Badge do Capítulo
      doc.setFillColor(...PALETTE.primaryLight);
      doc.roundedRect(margin, cursor.y, 28, 6.5, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...PALETTE.primaryDark);
      doc.text(`CAPÍTULO ${num < 10 ? '0' + num : num}`, margin + 3.5, cursor.y + 4.5);
      cursor.y += 11;

      // Título do Capítulo
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(...PALETTE.slate900);
      const splitChTitle = doc.splitTextToSize(title, contentWidth);
      doc.text(splitChTitle, margin, cursor.y);
      cursor.y += splitChTitle.length * 7.5 + 4;

      // Linha de Respiro
      doc.setDrawColor(...PALETTE.border);
      doc.setLineWidth(0.3);
      doc.line(margin, cursor.y, margin + contentWidth, cursor.y);
      cursor.y += 7;

      // Introdução do Capítulo
      if (ch.introduction) {
        renderParagraphs(ch.introduction, {
          fontSize: 10,
          textColor: PALETTE.slate800,
          lineHeight: 5.3,
          paragraphSpacing: 4.5,
        });
      }

      // Seções do Capítulo
      if (ch.sections && Array.isArray(ch.sections)) {
        ch.sections.forEach((sec) => {
          if (sec.subtitle) {
            renderHeading(sec.subtitle, {
              fontSize: 12,
              textColor: PALETTE.slate900,
              spacingBefore: 8,
              spacingAfter: 3.5,
              minRemainingSpace: 28,
            });
          }

          if (sec.body) {
            renderParagraphs(sec.body, {
              fontSize: 9.8,
              textColor: PALETTE.slate700,
              lineHeight: 5.2,
              paragraphSpacing: 4,
            });
          }
        });
      }

      // Bloco do Exercício Prático
      if (ch.practicalExercise) {
        renderCalloutBox({
          badge: 'EXERCÍCIO PRÁTICO • AÇÃO IMEDIATA',
          content: ch.practicalExercise,
          type: 'exercise',
        });
      }

      // Bloco da Síntese do Capítulo
      if (ch.keyTakeaway) {
        renderCalloutBox({
          badge: 'SÍNTESE DO CAPÍTULO',
          content: ch.keyTakeaway,
          type: 'takeaway',
        });
      }
    });

    // ==========================================
    // RENDERIZAÇÃO DO SUMÁRIO NA PÁGINA 3 COM NÚMEROS REAIS
    // ==========================================
    doc.setPage(tocPageIndex);
    cursor.y = layout.minY + 4;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...PALETTE.slate900);
    doc.text('Sumário Geral da Obra', margin, cursor.y);
    cursor.y += 12;

    chaptersToRender.forEach((ch, idx) => {
      const num = ch.chapterNumber || ch.number || idx + 1;
      const title = ch.chapterTitle || ch.title || `Capítulo ${num}`;
      const pageNum = chapterStarts[num] || (4 + idx);

      // Pill CAP
      doc.setFillColor(...PALETTE.primaryLight);
      doc.roundedRect(margin, cursor.y - 3.8, 16, 5.5, 1.2, 1.2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(...PALETTE.primaryDark);
      doc.text(`CAP ${num < 10 ? '0' + num : num}`, margin + 2.2, cursor.y);

      // Título do Capítulo com corte proporcional
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...PALETTE.slate800);
      const titleWidthMax = contentWidth - 42;
      const splitToc = doc.splitTextToSize(title, titleWidthMax);
      doc.text(splitToc, margin + 20, cursor.y);

      // Número Real da Página
      const pageLabel = `Pág. ${pageNum < 10 ? '0' + pageNum : pageNum}`;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...PALETTE.slate500);
      const pWidth = doc.getTextWidth(pageLabel);
      doc.text(pageLabel, pageWidth - margin - pWidth, cursor.y);

      cursor.y += Math.max(8, splitToc.length * 5 + 3);
    });

    // ==========================================
    // CABEÇALHOS & RODAPÉS EM TODAS AS PÁGINAS (EXCETO CAPA)
    // ==========================================
    const totalPages = doc.internal.getNumberOfPages();
    for (let p = 2; p <= totalPages; p++) {
      doc.setPage(p);

      // Cabeçalho Interno com Truncamento Seguro (0 colisão com o logo/tag da direita)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...PALETTE.slate400);

      let hTitle = bookTitle;
      if (doc.getTextWidth(hTitle) > 105) {
        while (hTitle.length > 10 && doc.getTextWidth(hTitle + '...') > 105) {
          hTitle = hTitle.slice(0, -1);
        }
        hTitle += '...';
      }
      doc.text(hTitle, margin, 13);
      doc.text('TrendPDF Studio Editorial', pageWidth - margin - 35, 13);

      doc.setDrawColor(...PALETTE.border);
      doc.setLineWidth(0.2);
      doc.line(margin, 16, pageWidth - margin, 16);

      // Rodapé com separador e numeração contínua
      doc.line(margin, 281, pageWidth - margin, 281);
      doc.text('Licença Exclusiva  •  Todos os direitos reservados', margin, 287);

      const pageStr = `Página ${p} de ${totalPages}`;
      const pageStrWidth = doc.getTextWidth(pageStr);
      doc.text(pageStr, pageWidth - margin - pageStrWidth, 287);
    }

    const safeFilename = bookTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '_')
      .slice(0, 30);
    const filename = `ebook_completo_${safeFilename}.pdf`;

    doc.save(filename);
    return filename;
  },
};

export default pdfService;
