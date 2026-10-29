import { jsPDF } from 'jspdf';

export const pdfService = {
  generateIdeaPDF: (idea, options = {}) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const primaryColor = [79, 70, 229]; // #4f46e5 (Indigo)
    const darkColor = [19, 27, 46]; // #131b2e
    const mutedColor = [100, 116, 139]; // #64748b
    const lightBgColor = [248, 250, 252]; // #f8fafc

    const margin = 20;
    const pageWidth = 210;
    const pageHeight = 297;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    // --- PAGE 1: COVER & EXECUTIVE BRIEFING ---
    // Header Bar
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 12, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('TRENDPDF STUDIO  •  RELATÓRIO EDITORIAL EXECUTIVO', margin, 8);

    y = 26;

    // Badge
    doc.setFillColor(238, 242, 255);
    doc.roundedRect(margin, y, 65, 7, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...primaryColor);
    doc.text(idea.format || 'Infoproduto em PDF', margin + 3, y + 5);

    // ID Badge
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...mutedColor);
    doc.text(`ID: ${idea.id}  |  Score: ${idea.score}/10`, pageWidth - margin - 40, y + 5);

    y += 14;

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...darkColor);
    const splitTitle = doc.splitTextToSize(idea.title, contentWidth);
    doc.text(splitTitle, margin, y);
    y += splitTitle.length * 8 + 4;

    // Subtitle / Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(70, 80, 95);
    const splitDesc = doc.splitTextToSize(idea.description || '', contentWidth);
    doc.text(splitDesc, margin, y);
    y += splitDesc.length * 5 + 8;

    // Decorative Separator
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // Key Metrics Box
    doc.setFillColor(...lightBgColor);
    doc.roundedRect(margin, y, contentWidth, 32, 3, 3, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 32, 3, 3, 'D');

    const colWidth = contentWidth / 3;

    // Col 1: Ticket Sugerido
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...mutedColor);
    doc.text('TICKET RECOMENDADO', margin + 6, y + 8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.text(idea.suggestedPrice || 'R$ 47,00', margin + 6, y + 17);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...mutedColor);
    doc.text(`Bump: ${idea.orderBump || 'R$ 19,90'}`, margin + 6, y + 25);

    // Col 2: Margem Estimada
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...mutedColor);
    doc.text('MARGEM LÍQUIDA', margin + colWidth + 6, y + 8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0, 108, 73);
    doc.text(idea.profitMargin || '94%', margin + colWidth + 6, y + 17);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...mutedColor);
    doc.text('Infoproduto Digital', margin + colWidth + 6, y + 25);

    // Col 3: Status Comercial
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...mutedColor);
    doc.text('STATUS COMERCIAL', margin + colWidth * 2 + 6, y + 8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...darkColor);
    doc.text(idea.status || 'Pronto para Produção', margin + colWidth * 2 + 6, y + 17);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...mutedColor);
    doc.text('Base Preditiva 2026', margin + colWidth * 2 + 6, y + 25);

    y += 40;

    // Strategic Insights Section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...darkColor);
    doc.text('ANÁLISE DE MERCADO & PÚBLICO-ALVO', margin, y);
    y += 6;

    // Target Audience
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...primaryColor);
    doc.text('Público Prioritário:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkColor);
    const audienceSplit = doc.splitTextToSize(idea.targetAudience || 'Criadores de conteúdo e profissionais', contentWidth - 40);
    doc.text(audienceSplit, margin + 35, y);
    y += audienceSplit.length * 5 + 3;

    // Core Pain
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...primaryColor);
    doc.text('Dor Crítica Resolvida:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkColor);
    const painSplit = doc.splitTextToSize(idea.corePain || 'Falta de material prático estruturado', contentWidth - 40);
    doc.text(painSplit, margin + 35, y);
    y += painSplit.length * 5 + 3;

    // Why sell now
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...primaryColor);
    doc.text('Por Que Vender Agora:', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkColor);
    const whySplit = doc.splitTextToSize(idea.whySellNow || 'Crescimento de demanda e baixa saturação', contentWidth - 40);
    doc.text(whySplit, margin + 35, y);
    y += whySplit.length * 5 + 10;

    // Table of Chapters Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...darkColor);
    doc.text('ESTRUTURA EDITORIAL SUGERIDA (SUMÁRIO DE 10 CAPÍTULOS)', margin, y);
    y += 7;

    // Chapters Listing
    if (idea.chapters && idea.chapters.length > 0) {
      idea.chapters.forEach((chap) => {
        if (y > pageHeight - 25) {
          doc.addPage();
          // Header Bar on Page 2
          doc.setFillColor(...primaryColor);
          doc.rect(0, 0, pageWidth, 8, 'F');
          y = 20;
        }

        // Chapter Number Pill
        doc.setFillColor(238, 242, 255);
        doc.roundedRect(margin, y - 4, 18, 6, 1.5, 1.5, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...primaryColor);
        doc.text(`CAP ${chap.number}`, margin + 2.5, y);

        // Chapter Title
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(...darkColor);
        const titleSplit = doc.splitTextToSize(chap.title, contentWidth - 24);
        doc.text(titleSplit, margin + 22, y);

        y += Math.max(7, titleSplit.length * 5 + 2);
      });
    }

    // Footer on all pages
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...mutedColor);
      doc.text(
        `TrendPDF Studio — Confidencial & Exclusivo  |  Página ${i} de ${totalPages}`,
        margin,
        pageHeight - 10
      );
    }

    const filename = `${idea.id}_briefing_${idea.title.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    doc.save(filename);
    return filename;
  }
};

