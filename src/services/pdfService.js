import { jsPDF } from 'jspdf';

export const pdfService = {
  /**
   * Gera e faz o download automático de um briefing editorial em PDF a partir dos dados da ideia.
   * Contém: titulo_estrategico, dor_resolvida e a listagem iterativa dos capítulos do sumario.
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

    // Paleta de cores do Design System
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

    // Extração dos dados reais
    const tituloEstrategico = idea.titulo_estrategico || idea.title || 'Infoproduto em PDF';
    const dorResolvida = idea.dor_resolvida || idea.corePain || 'Falta de método estruturado e passo a passo claro para execução.';
    const sumarioCapitulos = Array.isArray(idea.sumario || idea.chapters) ? (idea.sumario || idea.chapters) : [];
    const publicoAlvo = idea.targetAudience || 'Profissionais e entusiastas do nicho';
    const ticketSugerido = idea.suggestedPrice || 'R$ 47,00';
    const formato = idea.format || 'E-book Guia (PDF)';

    // 1. Barra de Topo Decorativa
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 12, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('TRENDPDF STUDIO  •  BRIEFING ESTRATÉGICO EXECUTIVO', margin, 8);

    y = 24;

    // 2. Metadados do Cabeçalho (Badge de Formato e ID)
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

    // 3. TÍTULO ESTRATÉGICO (titulo_estrategico)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...darkColor);
    const splitTitle = doc.splitTextToSize(tituloEstrategico, contentWidth);
    doc.text(splitTitle, margin, y);
    y += splitTitle.length * 8 + 4;

    // Resumo / Descrição Comercial
    if (idea.description) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(70, 80, 95);
      const splitDesc = doc.splitTextToSize(idea.description, contentWidth);
      doc.text(splitDesc, margin, y);
      y += splitDesc.length * 5 + 6;
    }

    // Linha Divisória
    doc.setDrawColor(...borderColor);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // 4. BLOCO: DOR RESOLVIDA (dor_resolvida)
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

    // Bloco rápido de Público-Alvo e Ticket Recomendado
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

    // 5. SUMÁRIO EDITORIAL - LISTAGEM ITERATIVA DOS CAPÍTULOS (sumario)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...darkColor);
    doc.text('SUMÁRIO EDITORIAL (ESTRUTURA DE 10 CAPÍTULOS)', margin, y);
    y += 8;

    if (sumarioCapitulos && sumarioCapitulos.length > 0) {
      sumarioCapitulos.forEach((chap, idx) => {
        // Quebra automática de página caso atinja o limite inferior
        if (y > pageHeight - 25) {
          doc.addPage();
          doc.setFillColor(...primaryColor);
          doc.rect(0, 0, pageWidth, 8, 'F');
          y = 20;
        }

        const num = chap.number || idx + 1;
        const chapTitle = chap.title || (typeof chap === 'string' ? chap : `Capítulo ${num}`);

        // Badge do Capítulo
        doc.setFillColor(238, 242, 255);
        doc.roundedRect(margin, y - 4, 18, 6, 1.5, 1.5, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...primaryColor);
        doc.text(`CAP ${num}`, margin + 2.5, y);

        // Título do Capítulo
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(...darkColor);
        const titleSplit = doc.splitTextToSize(chapTitle, contentWidth - 24);
        doc.text(titleSplit, margin + 22, y);

        y += Math.max(7, titleSplit.length * 5 + 2);
      });
    } else {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9.5);
      doc.setTextColor(...mutedColor);
      doc.text('Nenhum capítulo detalhado para este conceito.', margin, y);
      y += 8;
    }

    // 6. Rodapé em todas as páginas
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

    // 7. Força o download automático do arquivo .pdf
    const sanitizedTitle = tituloEstrategico
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '_')
      .slice(0, 25);
    const filename = `briefing_${idea.id || 'ideia'}_${sanitizedTitle}.pdf`;

    doc.save(filename);
    return filename;
  }
};
