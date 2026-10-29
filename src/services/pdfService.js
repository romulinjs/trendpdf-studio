import { jsPDF } from 'jspdf';

export const pdfService = {
  /**
   * 1. Gera e faz o download automático de um briefing editorial em PDF a partir dos dados da ideia.
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

    const primaryColor = [79, 70, 229]; // #4f46e5 (Indigo)
    const darkColor = [19, 27, 46]; // #131b2e (Slate 900)
    const mutedColor = [100, 116, 139]; // #64748b (Slate 500)
    const lightBgColor = [248, 250, 252]; // #f8fafc (Slate 50)
    const borderColor = [226, 232, 240]; // #e2e8f0 (Slate 200)

    const margin = 20;
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

    // Barra de Topo
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 12, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('TRENDPDF STUDIO  •  BRIEFING ESTRATÉGICO EXECUTIVO', margin, 8);

    y = 24;

    // Badges
    doc.setFillColor(238, 242, 255);
    doc.roundedRect(margin, y, 65, 7, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...primaryColor);
    doc.text(formato, margin + 4, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...mutedColor);
    doc.text(`ID: ${idea.id || 'INF-AI'}  |  Score: ${idea.score || '9.2'}/10`, pageWidth - margin - 45, y + 5);

    y += 14;

    // Título Estratégico
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...darkColor);
    const splitTitle = doc.splitTextToSize(tituloEstrategico, contentWidth);
    doc.text(splitTitle, margin, y);
    y += splitTitle.length * 8 + 4;

    // Resumo
    if (idea.description) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(70, 80, 95);
      const splitDesc = doc.splitTextToSize(idea.description, contentWidth);
      doc.text(splitDesc, margin, y);
      y += splitDesc.length * 5 + 6;
    }

    doc.setDrawColor(...borderColor);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // Dor Resolvida
    doc.setFillColor(...lightBgColor);
    doc.roundedRect(margin, y, contentWidth, 24, 2.5, 2.5, 'F');
    doc.setDrawColor(...borderColor);
    doc.roundedRect(margin, y, contentWidth, 24, 2.5, 2.5, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...primaryColor);
    doc.text('DOR RESOLVIDA (PROPOSTA DE VALOR CENTRAL):', margin + 6, y + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...darkColor);
    const splitPain = doc.splitTextToSize(dorResolvida, contentWidth - 12);
    doc.text(splitPain, margin + 6, y + 14);

    y += 32;

    // Público e Preço
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...mutedColor);
    doc.text('PÚBLICO-ALVO:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkColor);
    doc.text(publicoAlvo, margin + 28, y);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...mutedColor);
    doc.text('TICKET SUGERIDO:', margin + 110, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text(ticketSugerido, margin + 145, y);

    y += 10;
    doc.setDrawColor(...borderColor);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // Capítulos
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...darkColor);
    doc.text('SUMÁRIO EDITORIAL (ESTRUTURA DE 10 CAPÍTULOS)', margin, y);
    y += 8;

    if (sumarioCapitulos && sumarioCapitulos.length > 0) {
      sumarioCapitulos.forEach((chap, idx) => {
        if (y > pageHeight - 25) {
          doc.addPage();
          doc.setFillColor(...primaryColor);
          doc.rect(0, 0, pageWidth, 8, 'F');
          y = 20;
        }

        const num = chap.number || idx + 1;
        const chapTitle = chap.title || (typeof chap === 'string' ? chap : `Capítulo ${num}`);

        doc.setFillColor(238, 242, 255);
        doc.roundedRect(margin, y - 4, 18, 6, 1.5, 1.5, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...primaryColor);
        doc.text(`CAP ${num}`, margin + 2.5, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(...darkColor);
        const titleSplit = doc.splitTextToSize(chapTitle, contentWidth - 24);
        doc.text(titleSplit, margin + 22, y);

        y += Math.max(7, titleSplit.length * 5 + 2);
      });
    }

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...mutedColor);
      doc.text(
        `TrendPDF Studio  •  Documento Gerado com IA  |  Página ${i} de ${totalPages}`,
        margin,
        pageHeight - 10
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
   * 2. Gera e compila o E-BOOK COMPLETO DIAGRAMADO de 20 a 40+ páginas com capa, sumário, capítulos aprofundados e exercícios.
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

    const primaryColor = [79, 70, 229]; // Indigo #4f46e5
    const darkBg = [15, 23, 42]; // Slate 900
    const darkText = [30, 41, 59]; // Slate 800
    const mutedText = [100, 116, 139]; // Slate 500
    const lightBoxBg = [248, 250, 252]; // Slate 50
    const accentGreen = [16, 185, 129]; // Emerald 500
    const borderColor = [226, 232, 240];

    const margin = 22;
    const pageWidth = 210;
    const pageHeight = 297;
    const contentWidth = pageWidth - margin * 2;

    const bookTitle = idea.titulo_estrategico || idea.title || 'Infoproduto em PDF';
    const subtitle = idea.description || idea.corePain || 'Guia Prático Passo a Passo de Implementação Rápida';
    const authorName = options.authorName || 'TrendPDF Studio';

    // ==========================================
    // PÁGINA 1: CAPA PROFISSIONAL DO E-BOOK
    // ==========================================
    doc.setFillColor(...darkBg);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Elemento Decorativo Geométrico
    doc.setFillColor(...primaryColor);
    doc.circle(pageWidth, 0, 90, 'F');

    // Badge Superior da Capa
    doc.setFillColor(30, 41, 59);
    doc.roundedRect(margin, 35, 70, 8, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('EDIÇÃO EXCLUSIVA • 2026', margin + 6, 40.5);

    // Título Principal do Livro
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.setTextColor(255, 255, 255);
    const splitCoverTitle = doc.splitTextToSize(bookTitle, contentWidth);
    let coverY = 70;
    doc.text(splitCoverTitle, margin, coverY);
    coverY += splitCoverTitle.length * 11 + 6;

    // Linha de Destaque
    doc.setDrawColor(...accentGreen);
    doc.setLineWidth(1.5);
    doc.line(margin, coverY, margin + 40, coverY);
    coverY += 12;

    // Subtítulo
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(203, 213, 225); // Slate 300
    const splitCoverSub = doc.splitTextToSize(subtitle, contentWidth);
    doc.text(splitCoverSub, margin, coverY);

    // Rodapé da Capa (Autor & Selo de Validação)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(`Por: ${authorName}`, margin, pageHeight - 35);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...mutedText);
    doc.text('Validado por Inteligência de Demanda Preditiva', margin, pageHeight - 27);

    // ==========================================
    // PÁGINA 2: FICHA EDITORIAL & INTRODUÇÃO
    // ==========================================
    doc.addPage();
    let y = margin;

    // Header interno padrão
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...mutedText);
    doc.text(bookTitle.toUpperCase(), margin, 14);
    doc.setDrawColor(...borderColor);
    doc.setLineWidth(0.3);
    doc.line(margin, 16, pageWidth - margin, 16);

    y = 30;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...darkText);
    doc.text('SOBRE ESTA OBRA', margin, y);
    y += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(70, 80, 95);
    const introText = `Este material foi desenvolvido com um objetivo central: entregar uma experiência prática, direta e transformadora. Ao contrário de livros tradicionais repletos de teorias distantes da realidade, cada página aqui foi pensada para resolver a dor de "${idea.dor_resolvida || idea.corePain || 'executar com clareza'}" de forma imediata.\n\nRecomendamos que você leia cada capítulo com um caderno ao lado ou aplicando diretamente no seu dia a dia. Ao final de cada capítulo, você encontrará exercícios práticos de ação imediata desenhados para consolidar o aprendizado em menos de 10 minutos.`;
    const splitIntro = doc.splitTextToSize(introText, contentWidth);
    doc.text(splitIntro, margin, y);
    y += splitIntro.length * 6 + 15;

    // Ficha Técnica Box
    doc.setFillColor(...lightBoxBg);
    doc.roundedRect(margin, y, contentWidth, 50, 3, 3, 'F');
    doc.setDrawColor(...borderColor);
    doc.roundedRect(margin, y, contentWidth, 50, 3, 3, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...primaryColor);
    doc.text('FICHA TÉCNICA EDITORIAL', margin + 8, y + 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...darkText);
    doc.text(`• Título Oficial: ${bookTitle}`, margin + 8, y + 18);
    doc.text(`• Categoria: ${idea.category || 'Desenvolvimento & Negócios'}`, margin + 8, y + 25);
    doc.text(`• Público-Alvo: ${idea.targetAudience || 'Geral'}`, margin + 8, y + 32);
    doc.text(`• Formato de Distribuição: ${idea.format || 'E-book Digital (PDF)'}`, margin + 8, y + 39);
    doc.text('• Direitos: Licenciado para uso e distribuição comercial pelo autor.', margin + 8, y + 46);

    // ==========================================
    // PÁGINA 3: SUMÁRIO GERAL DIAGRAMADO
    // ==========================================
    doc.addPage();
    y = 30;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...darkText);
    doc.text('SUMÁRIO GERAL', margin, y);
    y += 12;

    const chaptersToRender = (fullChapters && fullChapters.length > 0)
      ? fullChapters
      : (idea.chapters || idea.sumario || []);

    chaptersToRender.forEach((ch, idx) => {
      const num = ch.chapterNumber || ch.number || idx + 1;
      const title = ch.chapterTitle || ch.title || `Capítulo ${num}`;

      doc.setFillColor(238, 242, 255);
      doc.roundedRect(margin, y - 4, 18, 6, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...primaryColor);
      doc.text(`CAP ${num}`, margin + 2.5, y);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...darkText);
      const splitTocTitle = doc.splitTextToSize(title, contentWidth - 25);
      doc.text(splitTocTitle, margin + 22, y);

      y += Math.max(9, splitTocTitle.length * 6 + 4);
    });

    // ==========================================
    // PÁGINAS 4+: CONTEÚDO DOS CAPÍTULOS
    // ==========================================
    chaptersToRender.forEach((ch, idx) => {
      doc.addPage();
      y = 28;

      const num = ch.chapterNumber || ch.number || idx + 1;
      const title = ch.chapterTitle || ch.title || `Capítulo ${num}`;

      // Badge do Capítulo
      doc.setFillColor(238, 242, 255);
      doc.roundedRect(margin, y, 30, 7, 2, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...primaryColor);
      doc.text(`CAPÍTULO ${num}`, margin + 4, y + 5);
      y += 14;

      // Título do Capítulo
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(...darkText);
      const splitChTitle = doc.splitTextToSize(title, contentWidth);
      doc.text(splitChTitle, margin, y);
      y += splitChTitle.length * 8 + 6;

      doc.setDrawColor(...borderColor);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;

      // Introdução do Capítulo
      if (ch.introduction) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10.5);
        doc.setTextColor(51, 65, 85);
        const splitIntro = doc.splitTextToSize(ch.introduction, contentWidth);
        doc.text(splitIntro, margin, y);
        y += splitIntro.length * 5.8 + 8;
      }

      // Seções do Capítulo
      if (ch.sections && Array.isArray(ch.sections)) {
        ch.sections.forEach((sec) => {
          if (y > pageHeight - 45) {
            doc.addPage();
            y = 25;
          }

          if (sec.subtitle) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(...darkText);
            const splitSub = doc.splitTextToSize(sec.subtitle, contentWidth);
            doc.text(splitSub, margin, y);
            y += splitSub.length * 6 + 4;
          }

          if (sec.body) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(70, 80, 95);
            const splitBody = doc.splitTextToSize(sec.body, contentWidth);
            doc.text(splitBody, margin, y);
            y += splitBody.length * 5.5 + 8;
          }
        });
      }

      // Box: Exercício Prático
      if (ch.practicalExercise) {
        if (y > pageHeight - 55) {
          doc.addPage();
          y = 25;
        }

        const splitExercise = doc.splitTextToSize(ch.practicalExercise, contentWidth - 14);
        const boxHeight = Math.max(26, splitExercise.length * 5.5 + 16);

        doc.setFillColor(240, 253, 244); // Emerald 50
        doc.roundedRect(margin, y, contentWidth, boxHeight, 3, 3, 'F');
        doc.setDrawColor(187, 247, 208); // Emerald 200
        doc.roundedRect(margin, y, contentWidth, boxHeight, 3, 3, 'D');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(21, 128, 61); // Emerald 700
        doc.text('EXERCÍCIO PRÁTICO • AÇÃO IMEDIATA', margin + 7, y + 8);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(30, 41, 59);
        doc.text(splitExercise, margin + 7, y + 16);

        y += boxHeight + 8;
      }

      // Box: Insight Chave
      if (ch.keyTakeaway) {
        if (y > pageHeight - 40) {
          doc.addPage();
          y = 25;
        }

        doc.setFillColor(...lightBoxBg);
        doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'F');
        doc.setDrawColor(...borderColor);
        doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'D');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(...primaryColor);
        doc.text('SÍNTESE DO CAPÍTULO:', margin + 6, y + 6);

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(...darkText);
        const splitTakeaway = doc.splitTextToSize(ch.keyTakeaway, contentWidth - 12);
        doc.text(splitTakeaway, margin + 6, y + 12);

        y += 24;
      }
    });

    // Numeração de Páginas Contínua e Cabeçalho Interno em todas as páginas exceto a Capa
    const totalPages = doc.internal.getNumberOfPages();
    for (let p = 2; p <= totalPages; p++) {
      doc.setPage(p);

      // Cabeçalho Interno
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...mutedText);
      doc.text(bookTitle, margin, 12);
      doc.text('TrendPDF Studio Editorial', pageWidth - margin - 35, 12);

      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.2);
      doc.line(margin, 14, pageWidth - margin, 14);

      // Rodapé
      doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);
      doc.text(
        `Página ${p} de ${totalPages}`,
        pageWidth / 2 - 10,
        pageHeight - 9
      );
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
  }
};
