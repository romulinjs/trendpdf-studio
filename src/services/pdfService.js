import { jsPDF } from 'jspdf';

/**
 * Paleta de Cores e Tokens Visuais do Workbook Editorial
 * Inspirada nos designs de alta conversão do Canva, Etsy e publicações executivas.
 */
const PALETTE = {
  bgCanvas: [250, 248, 245],    // Fundo quente tipo papel de alta gramatura (#FAF8F5)
  cardWhite: [255, 255, 255],   // Cards brancos destacados sobre o fundo cream
  terracotta: [224, 109, 67],   // Terracotta / Laranja quente (#E06D43)
  terracottaDark: [194, 84, 46],// Terracotta escuro
  terracottaLight: [255, 243, 237],
  peachBg: [255, 247, 237],     // Fundo suave de destaque (#FFF7ED)
  mintBg: [240, 253, 244],      // Fundo suave verde menta (#F0FDF4)
  mintAccent: [16, 185, 129],   // Verde esmeralda (#10B981)
  navyDark: [30, 41, 59],       // Azul marinho escuro (#1E293B)
  slateDark: [51, 65, 85],      // Texto de leitura confortável (#334155)
  slateMuted: [100, 116, 139],  // Legendas e textos secundários (#64748B)
  slateLight: [148, 163, 184],  // Bordas e regras de rodapé (#94A3B8)
  borderLight: [235, 230, 222], // Borda suave dos cards (#EBE6DE)
  lineRuled: [218, 212, 203],   // Linhas pautadas de caderno (#DAD4CB)
  berryAccent: [190, 75, 100],  // Tag delicada da capa (#BE4B64)
};

/**
 * Resolve fotos temáticas de alta resolução com base no nicho do infoproduto.
 */
function getThematicImages(niche = '', category = '', title = '') {
  const text = `${niche} ${category} ${title}`.toLowerCase();

  // 1. Finanças / Crianças / Família
  if (
    text.includes('finan') || text.includes('dinheiro') || text.includes('mesada') ||
    text.includes('crian') || text.includes('infan') || text.includes('filho') || text.includes('pais')
  ) {
    return {
      coverLeft: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80',
      coverCenter: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=700&q=80',
      coverRight: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    };
  }

  // 2. Culinária / Receitas / Saúde / Smoothies
  if (
    text.includes('receit') || text.includes('smoothie') || text.includes('suco') ||
    text.includes('saud') || text.includes('aliment') || text.includes('dieta') || text.includes('culin')
  ) {
    return {
      coverLeft: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
      coverCenter: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=700&q=80',
      coverRight: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80',
    };
  }

  // 3. Pets / Cães / Adestramento
  if (
    text.includes('pet') || text.includes('cachorr') || text.includes('adest') ||
    text.includes('cao') || text.includes('filhot') || text.includes('gato')
  ) {
    return {
      coverLeft: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      coverCenter: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=700&q=80',
      coverRight: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
    };
  }

  // 4. Produtividade / Notion / Foco / Organização
  if (
    text.includes('produtiv') || text.includes('notion') || text.includes('organiza') ||
    text.includes('foco') || text.includes('tempo') || text.includes('rotina') || text.includes('habito')
  ) {
    return {
      coverLeft: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80',
      coverCenter: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=700&q=80',
      coverRight: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80',
    };
  }

  // 5. Ansiedade / Bem-estar / Mentalidade
  if (
    text.includes('ansied') || text.includes('ment') || text.includes('calm') ||
    text.includes('emoc') || text.includes('terap') || text.includes('sono')
  ) {
    return {
      coverLeft: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
      coverCenter: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=700&q=80',
      coverRight: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    };
  }

  // 6. Fitness / Treino / Emagrecimento
  if (
    text.includes('fit') || text.includes('trein') || text.includes('emagrec') ||
    text.includes('exerc') || text.includes('corrid') || text.includes('muscul')
  ) {
    return {
      coverLeft: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      coverCenter: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=700&q=80',
      coverRight: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80',
    };
  }

  // Fallback padrão moderno (Estratégia & Empreendedorismo)
  return {
    coverLeft: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80',
    coverCenter: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80',
    coverRight: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
  };
}

/**
 * Carrega e converte uma imagem em DataURL com cantos arredondados ou topo em arco (Cathedral Arch)
 * de forma 100% segura com timeout de 2.5s.
 */
async function loadFramedImage(url, widthPx = 400, heightPx = 500, borderRadiusPx = 16, isArched = false) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), 2500);

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      clearTimeout(timer);
      try {
        const canvas = document.createElement('canvas');
        canvas.width = widthPx;
        canvas.height = heightPx;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);

        ctx.beginPath();
        if (isArched) {
          // Topo em arco (Cathedral Arch - estilo Foto 5 The Smoothie Book)
          const r = widthPx / 2;
          ctx.arc(r, r, r, Math.PI, 0, false);
          ctx.lineTo(widthPx, heightPx - borderRadiusPx);
          ctx.quadraticCurveTo(widthPx, heightPx, widthPx - borderRadiusPx, heightPx);
          ctx.lineTo(borderRadiusPx, heightPx);
          ctx.quadraticCurveTo(0, heightPx, 0, heightPx - borderRadiusPx);
          ctx.closePath();
        } else if (ctx.roundRect) {
          ctx.roundRect(0, 0, widthPx, heightPx, borderRadiusPx);
        } else {
          ctx.rect(0, 0, widthPx, heightPx);
        }
        ctx.clip();
        ctx.drawImage(img, 0, 0, widthPx, heightPx);
        resolve(canvas.toDataURL('image/jpeg', 0.88));
      } catch {
        resolve(null);
      }
    };

    img.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };

    img.src = url;
  });
}

export const pdfService = {
  /**
   * 1. Gera e faz o download automático de um briefing editorial executivo em PDF.
   */
  generateIdeaPDF: async (idea, options = {}) => {
    if (!idea) {
      throw new Error('Nenhum dado de ideia foi fornecido para exportação.');
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const margin = 20;
    const pageWidth = 210;
    const pageHeight = 297;
    const contentWidth = pageWidth - margin * 2;

    // Fundo quente tipo papel
    doc.setFillColor(...PALETTE.bgCanvas);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    let y = 18;

    const tituloEstrategico = idea.titulo_estrategico || idea.title || 'Infoproduto em PDF';
    const dorResolvida = idea.dor_resolvida || idea.corePain || 'Falta de método estruturado e passo a passo claro para execução.';
    const sumarioCapitulos = Array.isArray(idea.sumario || idea.chapters) ? (idea.sumario || idea.chapters) : [];
    const publicoAlvo = idea.targetAudience || 'Profissionais e entusiastas do nicho';
    const ticketSugerido = idea.suggestedPrice || 'R$ 47,00';
    const formato = idea.format || 'E-book Guia (PDF)';

    // Cabeçalho da Marca
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...PALETTE.terracotta);
    doc.text('TRENDPDF STUDIO  •  BRIEFING EDITORIAL ESTRATÉGICO', margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...PALETTE.slateMuted);
    doc.text(`ID: ${idea.id || 'INF-AI'}  |  Score: ${idea.score || '9.4'}/10`, pageWidth - margin - 52, y);

    y += 8;

    // Card Principal do Título
    doc.setFillColor(...PALETTE.cardWhite);
    doc.roundedRect(margin, y, contentWidth, 36, 3, 3, 'F');
    doc.setDrawColor(...PALETTE.borderLight);
    doc.roundedRect(margin, y, contentWidth, 36, 3, 3, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...PALETTE.navyDark);
    const splitTitle = doc.splitTextToSize(tituloEstrategico, contentWidth - 12);
    doc.text(splitTitle, margin + 6, y + 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...PALETTE.slateDark);
    const descText = idea.description || 'Infoproduto completo validado com inteligência de mercado.';
    const splitDesc = doc.splitTextToSize(descText, contentWidth - 12);
    doc.text(splitDesc, margin + 6, y + 22);

    y += 42;

    // Card: Proposta de Valor / Dor Resolvida
    doc.setFillColor(...PALETTE.peachBg);
    doc.roundedRect(margin, y, contentWidth, 24, 2.5, 2.5, 'F');
    doc.setDrawColor(254, 215, 170);
    doc.roundedRect(margin, y, contentWidth, 24, 2.5, 2.5, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...PALETTE.terracotta);
    doc.text('🎯 DOR CENTRAL RESOLVIDA:', margin + 6, y + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...PALETTE.navyDark);
    const splitPain = doc.splitTextToSize(dorResolvida, contentWidth - 12);
    doc.text(splitPain, margin + 6, y + 14);

    y += 30;

    // Card de Métricas: Público e Preço
    doc.setFillColor(...PALETTE.cardWhite);
    doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'F');
    doc.setDrawColor(...PALETTE.borderLight);
    doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...PALETTE.slateMuted);
    doc.text('PÚBLICO-ALVO:', margin + 6, y + 8.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...PALETTE.navyDark);
    doc.text(publicoAlvo, margin + 32, y + 8.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...PALETTE.slateMuted);
    doc.text('TICKET SUGERIDO:', margin + 110, y + 8.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...PALETTE.terracotta);
    doc.text(ticketSugerido, margin + 142, y + 8.5);

    y += 20;

    // Estrutura de Capítulos
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...PALETTE.navyDark);
    doc.text('ESTRUTURA EDITORIAL SUGERIDA (10 CAPÍTULOS)', margin, y);
    y += 7;

    if (sumarioCapitulos && sumarioCapitulos.length > 0) {
      sumarioCapitulos.forEach((chap, idx) => {
        if (y > pageHeight - 25) {
          doc.addPage();
          doc.setFillColor(...PALETTE.bgCanvas);
          doc.rect(0, 0, pageWidth, pageHeight, 'F');
          y = 20;
        }

        const num = chap.number || idx + 1;
        const chapTitle = chap.title || (typeof chap === 'string' ? chap : `Capítulo ${num}`);

        doc.setFillColor(...PALETTE.terracottaLight);
        doc.roundedRect(margin, y - 3.8, 16, 5.5, 1.2, 1.2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(...PALETTE.terracotta);
        doc.text(`CAP ${num < 10 ? '0' + num : num}`, margin + 2.2, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...PALETTE.slateDark);
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
      doc.setTextColor(...PALETTE.slateMuted);
      doc.setDrawColor(...PALETTE.borderLight);
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
   * 2. Gera e compila o WORKBOOK & GUIA EDITORIAL DE LUXO completo,
   * inspirado exatamente nas fotos de referência do usuário:
   * - Fundo quente tipo papel de alta gramatura (#FAF8F5).
   * - Capa com moldura em arco (Cathedral Arch) e fotografias de alta resolução.
   * - Badge de capítulo no topo (CAP 01 / DAY 03 style).
   * - Cards brancos sobre o canvas quente com passos numerados em círculos.
   * - Split Cards de Dica Pro & Resolução de Travas.
   * - Linhas pautadas de caderno reais para anotação.
   * - Rastreador de hábitos com checkboxes no rodapé.
   */
  generateFullEbookPDF: async (idea, fullChapters = [], options = {}) => {
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
    const margin = 20;
    const contentWidth = pageWidth - margin * 2; // 170 mm

    const bookTitle = idea.titulo_estrategico || idea.title || 'Infoproduto em PDF';
    const subtitle = idea.description || idea.corePain || 'Guia Prático Passo a Passo de Implementação Rápida';
    const authorName = options.authorName || 'TrendPDF Studio';

    // Carrega as fotos temáticas de alta resolução em paralelo
    const imageTheme = getThematicImages(idea.niche || idea.category, idea.category, bookTitle);
    const [imgCoverLeft, imgCoverCenter, imgCoverRight] = await Promise.all([
      loadFramedImage(imageTheme.coverLeft, 380, 500, 16, false),
      loadFramedImage(imageTheme.coverCenter, 440, 580, 20, true), // Cathedral Arch central!
      loadFramedImage(imageTheme.coverRight, 380, 500, 16, false),
    ]);

    function fillCanvas() {
      doc.setFillColor(...PALETTE.bgCanvas);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
    }

    // ==========================================
    // PÁGINA 1: CAPA EDITORIAL DE LUXO (FOTO 5 - THE SMOOTHIE BOOK)
    // ==========================================
    fillCanvas();

    // Topo Editorial Minimalista
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...PALETTE.slateMuted);
    doc.text('PRINTABLE WORKBOOK & ACTION GUIDE', margin, 18);
    doc.text('EDIÇÃO EXCLUSIVA • 2026', pageWidth - margin - 42, 18);

    // Galeria de 3 Molduras de Fotos (Esquerda, Centro com Arco e Direita)
    const galleryY = 26;
    const wSide = 48;
    const hSide = 64;
    const wCenter = 58;
    const hCenter = 76;

    // Foto Esquerda (Arredondada)
    if (imgCoverLeft) {
      doc.addImage(imgCoverLeft, 'JPEG', margin, galleryY + 6, wSide, hSide);
    } else {
      doc.setFillColor(236, 231, 223);
      doc.roundedRect(margin, galleryY + 6, wSide, hSide, 3.5, 3.5, 'F');
    }
    doc.setDrawColor(...PALETTE.borderLight);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, galleryY + 6, wSide, hSide, 3.5, 3.5, 'D');

    // Foto Centro (Arco Catedral - Cathedral Arch)
    const centerX = margin + wSide + 8;
    if (imgCoverCenter) {
      doc.addImage(imgCoverCenter, 'JPEG', centerX, galleryY, wCenter, hCenter);
    } else {
      doc.setFillColor(228, 222, 212);
      doc.roundedRect(centerX, galleryY, wCenter, hCenter, 4, 4, 'F');
    }
    doc.setDrawColor(...PALETTE.borderLight);
    doc.roundedRect(centerX, galleryY, wCenter, hCenter, 4, 4, 'D');

    // Foto Direita (Arredondada)
    const rightX = centerX + wCenter + 8;
    if (imgCoverRight) {
      doc.addImage(imgCoverRight, 'JPEG', rightX, galleryY + 6, wSide, hSide);
    } else {
      doc.setFillColor(236, 231, 223);
      doc.roundedRect(rightX, galleryY + 6, wSide, hSide, 3.5, 3.5, 'F');
    }
    doc.setDrawColor(...PALETTE.borderLight);
    doc.roundedRect(rightX, galleryY + 6, wSide, hSide, 3.5, 3.5, 'D');

    // Kicker Script / Cursivo Suave
    let curY = galleryY + hCenter + 15;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(11);
    doc.setTextColor(...PALETTE.berryAccent);
    doc.text('seu guia prático de transformação diária', margin, curY);
    curY += 8;

    // Título Principal
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(23);
    doc.setTextColor(...PALETTE.navyDark);
    const splitBookTitle = doc.splitTextToSize(bookTitle, contentWidth);
    doc.text(splitBookTitle, margin, curY);
    curY += splitBookTitle.length * 8.5 + 4;

    // Subtítulo
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(...PALETTE.slateDark);
    const splitSub = doc.splitTextToSize(subtitle, contentWidth);
    doc.text(splitSub, margin, curY);
    curY += splitSub.length * 5.5 + 8;

    // Pílulas de Categoria (Pills da Foto 5)
    const pills = ['10 Capítulos Práticos', 'Exercícios Diários', 'Linhas de Ação', 'Método Validado'];
    let pillX = margin;
    pills.forEach((pText) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      const pw = doc.getTextWidth(pText) + 8;
      doc.setFillColor(...PALETTE.peachBg);
      doc.roundedRect(pillX, curY, pw, 6.5, 1.5, 1.5, 'F');
      doc.setTextColor(...PALETTE.terracotta);
      doc.text(pText, pillX + 4, curY + 4.5);
      pillX += pw + 4;
    });

    // Barra do Autor & Direitos no Rodapé da Capa
    doc.setDrawColor(...PALETTE.borderLight);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 24, pageWidth - margin, pageHeight - 24);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...PALETTE.navyDark);
    doc.text(`Autor: ${authorName}`, margin, pageHeight - 17);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...PALETTE.slateMuted);
    doc.text('TrendPDF Studio Editorial  •  Workbook Interativo', pageWidth - margin - 65, pageHeight - 17);

    // ==========================================
    // PÁGINA 2: APRESENTAÇÃO & GUIA DE APROVEITAMENTO
    // ==========================================
    doc.addPage();
    fillCanvas();

    let p2Y = 22;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...PALETTE.navyDark);
    doc.text('Apresentação & Como Usar Este Workbook', margin, p2Y);
    p2Y += 10;

    // Texto Introdutório
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.8);
    doc.setTextColor(...PALETTE.slateDark);
    const introLines = doc.splitTextToSize(
      `Este material foi concebido com uma premissa clara: entregar uma experiência prática, direta e de alta transformação para o seu dia a dia. Ao contrário de livros densos e puramente teóricos que ficam esquecidos na gaveta, cada página deste workbook foi desenhada para resolver a dor de "${idea.dor_resolvida || idea.corePain || 'alcançar resultados claros'}" de maneira imediata.\n\nPara extrair 100% de resultado, recomendamos que você dedique de 10 a 15 minutos por capítulo. Leia os passos numerados, execute o exercício de ação imediata e escreva suas conclusões diretamente no espaço pautado de anotações.`,
      contentWidth
    );
    doc.text(introLines, margin, p2Y);
    p2Y += introLines.length * 5.2 + 8;

    // Card das 3 Regras de Ouro (Estilo Foto 1 & 3)
    doc.setFillColor(...PALETTE.cardWhite);
    doc.roundedRect(margin, p2Y, contentWidth, 54, 3, 3, 'F');
    doc.setDrawColor(...PALETTE.borderLight);
    doc.roundedRect(margin, p2Y, contentWidth, 54, 3, 3, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...PALETTE.terracotta);
    doc.text('★  AS 3 REGRAS DE OURO PARA MÁXIMO RESULTADO', margin + 8, p2Y + 9);

    const rules = [
      ['1. Leitura Focada:', 'Leia um capítulo por dia sem pressa, prestando atenção nos gatilhos dos passos numerados.'],
      ['2. Aplicação Imediata:', 'Nunca pule o exercício prático: preencha as linhas de anotação com sua própria caneta.'],
      ['3. Acompanhamento Contínuo:', 'Marque os checkboxes no rodapé para consolidar a sensação de progresso diário.'],
    ];

    let rY = p2Y + 18;
    rules.forEach(([title, desc]) => {
      doc.setFillColor(...PALETTE.terracotta);
      doc.circle(margin + 11, rY - 0.5, 3.2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text(title.charAt(0), margin + 10, rY + 0.6);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...PALETTE.navyDark);
      doc.text(title, margin + 17, rY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...PALETTE.slateDark);
      const splitDesc = doc.splitTextToSize(desc, contentWidth - 62);
      doc.text(splitDesc, margin + 55, rY);

      rY += Math.max(8, splitDesc.length * 4.5 + 3);
    });

    p2Y += 62;

    // Ficha Técnica Editorial
    doc.setFillColor(...PALETTE.cardWhite);
    doc.roundedRect(margin, p2Y, contentWidth, 52, 3, 3, 'F');
    doc.setDrawColor(...PALETTE.borderLight);
    doc.roundedRect(margin, p2Y, contentWidth, 52, 3, 3, 'D');

    doc.setFillColor(...PALETTE.terracotta);
    doc.roundedRect(margin, p2Y, 3, 52, 1.5, 1.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...PALETTE.navyDark);
    doc.text('FICHA TÉCNICA EDITORIAL & METADADOS', margin + 8, p2Y + 9);

    const metaData = [
      ['Título da Obra:', bookTitle],
      ['Categoria & Mercado:', idea.category || 'Educação & Negócios'],
      ['Público Prioritário:', idea.targetAudience || 'Público Geral'],
      ['Formato de Distribuição:', 'Workbook Interativo com Linhas de Anotação (PDF)'],
      ['Licenciamento:', 'Licenciado para estudo pessoal e implementação profissional.'],
    ];

    let mY = p2Y + 17;
    metaData.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...PALETTE.slateMuted);
      doc.text(label, margin + 8, mY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...PALETTE.navyDark);
      const valSplit = doc.splitTextToSize(value, contentWidth - 55);
      doc.text(valSplit, margin + 48, mY);

      mY += Math.max(6.5, valSplit.length * 4.2 + 2);
    });

    // ==========================================
    // PÁGINA 3: SUMÁRIO & ROADMAP VISUAL (FOTO 2 - YOUR PLAN)
    // ==========================================
    doc.addPage();
    fillCanvas();
    const tocPageIndex = 3;

    // ==========================================
    // PÁGINAS 4+: CAPÍTULOS NO FORMATO WORKBOOK (2 PÁGINAS POR CAPÍTULO)
    // ==========================================
    const chaptersToRender = (fullChapters && fullChapters.length > 0)
      ? fullChapters
      : (idea.chapters || idea.sumario || []);

    const chapterStarts = {};

    chaptersToRender.forEach((ch, idx) => {
      const num = ch.chapterNumber || ch.number || idx + 1;
      const title = ch.chapterTitle || ch.title || `Capítulo ${num}`;

      // ------------------------------------------
      // SUB-PÁGINA 1: CONCEITO & PASSOS NUMERADOS (FOTO 3/4)
      // ------------------------------------------
      doc.addPage();
      fillCanvas();
      chapterStarts[num] = doc.internal.getCurrentPageInfo().pageNumber;

      let y = 18;

      // Badge de Capítulo no Canto Esquerdo (Estilo DAY 03)
      const badgeW = 22;
      const badgeH = 20;
      doc.setFillColor(...PALETTE.terracotta);
      doc.roundedRect(margin, y, badgeW, badgeH, 3, 3, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(255, 255, 255);
      doc.text('CAPÍTULO', margin + 3.2, y + 6);
      doc.setFontSize(14);
      doc.text(num < 10 ? `0${num}` : `${num}`, margin + 4.8, y + 15);

      // Título e Módulo ao lado do Badge
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...PALETTE.terracotta);
      doc.text(`MÓDULO ${Math.ceil(num / 2)} • IMPLEMENTAÇÃO PRÁTICA`, margin + badgeW + 5, y + 5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.setTextColor(...PALETTE.navyDark);
      const splitChTitle = doc.splitTextToSize(title, contentWidth - badgeW - 6);
      doc.text(splitChTitle, margin + badgeW + 5, y + 12);

      y += Math.max(badgeH, splitChTitle.length * 6 + 10) + 4;

      // Card do Objetivo (Goal Banner - Foto 3/4)
      doc.setFillColor(...PALETTE.peachBg);
      doc.roundedRect(margin, y, contentWidth, 11, 2.5, 2.5, 'F');
      doc.setDrawColor(254, 215, 170);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, y, contentWidth, 11, 2.5, 2.5, 'D');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...PALETTE.terracotta);
      doc.text('🎯 Meta do Capítulo:', margin + 4, y + 7);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...PALETTE.navyDark);
      const shortGoal = (ch.keyTakeaway || ch.introduction || 'Dominar a estratégia central deste passo e agir com clareza.').slice(0, 85);
      doc.text(shortGoal, margin + 35, y + 7);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(...PALETTE.slateMuted);
      doc.text('⏱ 15 min de ação', pageWidth - margin - 30, y + 7);

      y += 16;

      // Card da Introdução Contextual
      if (ch.introduction) {
        doc.setFillColor(...PALETTE.cardWhite);
        const introP = doc.splitTextToSize(ch.introduction, contentWidth - 14);
        const introH = Math.min(50, introP.length * 4.8 + 12);
        doc.roundedRect(margin, y, contentWidth, introH, 3, 3, 'F');
        doc.setDrawColor(...PALETTE.borderLight);
        doc.roundedRect(margin, y, contentWidth, introH, 3, 3, 'D');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(...PALETTE.terracotta);
        doc.text('O CENÁRIO & A VIRADA DE CHAVE:', margin + 7, y + 8);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...PALETTE.slateDark);
        doc.text(introP.slice(0, 8), margin + 7, y + 15);

        y += introH + 6;
      }

      // Seções com Passos Numerados em Círculos (Foto 1, 3 e 4)
      if (ch.sections && Array.isArray(ch.sections)) {
        ch.sections.slice(0, 2).forEach((sec, sIdx) => {
          const stepNum = sIdx + 1;
          const bodySplit = doc.splitTextToSize(sec.body || '', contentWidth - 14);
          const stepH = Math.min(55, bodySplit.length * 4.8 + 20);

          doc.setFillColor(...PALETTE.cardWhite);
          doc.roundedRect(margin, y, contentWidth, stepH, 3, 3, 'F');
          doc.setDrawColor(...PALETTE.borderLight);
          doc.roundedRect(margin, y, contentWidth, stepH, 3, 3, 'D');

          // Círculo numerado
          doc.setFillColor(...PALETTE.terracotta);
          doc.circle(margin + 7, y + 9, 3.5, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(255, 255, 255);
          doc.text(`${stepNum}`, margin + 6, y + 10.2);

          // Título da Seção
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(...PALETTE.navyDark);
          const subTitle = doc.splitTextToSize(sec.subtitle || `Passo ${stepNum}`, contentWidth - 20);
          doc.text(subTitle[0] || '', margin + 14, y + 10.5);

          // Texto
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8.8);
          doc.setTextColor(...PALETTE.slateDark);
          doc.text(bodySplit.slice(0, 7), margin + 7, y + 18);

          y += stepH + 5;
        });
      }

      // ------------------------------------------
      // SUB-PÁGINA 2: EXERCÍCIO, DICA PRO & LINHAS PAUTADAS (FOTOS 1, 3 E 4)
      // ------------------------------------------
      doc.addPage();
      fillCanvas();

      let y2 = 18;

      // Header suave do Caderno de Prática
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...PALETTE.terracotta);
      doc.text(`CAPÍTULO ${num < 10 ? '0' + num : num}  •  CADERNO DE EXERCÍCIOS & PRÁTICA`, margin, y2);

      doc.setDrawColor(...PALETTE.borderLight);
      doc.setLineWidth(0.3);
      doc.line(margin, y2 + 2, pageWidth - margin, y2 + 2);
      y2 += 8;

      // Card 1: Exercício Prático de Ação Imediata
      if (ch.practicalExercise) {
        const exTextSplit = doc.splitTextToSize(ch.practicalExercise, contentWidth - 14);
        const exBoxH = Math.max(30, exTextSplit.length * 5 + 14);

        doc.setFillColor(...PALETTE.mintBg);
        doc.roundedRect(margin, y2, contentWidth, exBoxH, 3, 3, 'F');
        doc.setDrawColor(187, 247, 208);
        doc.roundedRect(margin, y2, contentWidth, exBoxH, 3, 3, 'D');

        doc.setFillColor(...PALETTE.mintAccent);
        doc.roundedRect(margin, y2, 3.5, exBoxH, 1.5, 1.5, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(21, 128, 61);
        doc.text('⚡ EXERCÍCIO PRÁTICO • AÇÃO IMEDIATA (5 A 10 MIN)', margin + 8, y2 + 8);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...PALETTE.navyDark);
        doc.text(exTextSplit, margin + 8, y2 + 15);

        y2 += exBoxH + 6;
      }

      // Split Cards 2 Colunas: DICA PRO & SE VOCÊ TRAVAR (Foto 3/4)
      const splitW = (contentWidth - 6) / 2;
      const splitH = 36;

      // Coluna Esquerda: DICA DE OURO
      doc.setFillColor(...PALETTE.peachBg);
      doc.roundedRect(margin, y2, splitW, splitH, 2.5, 2.5, 'F');
      doc.setDrawColor(254, 215, 170);
      doc.roundedRect(margin, y2, splitW, splitH, 2.5, 2.5, 'D');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...PALETTE.terracotta);
      doc.text('💡 DICA DE OURO (PRO TIP)', margin + 5, y2 + 7);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...PALETTE.slateDark);
      const tipContent = ch.keyTakeaway || 'Regras claras e combinadas em casa antes de sair eliminam 95% do atrito emocional.';
      const splitTip = doc.splitTextToSize(tipContent, splitW - 10);
      doc.text(splitTip.slice(0, 4), margin + 5, y2 + 13);

      // Coluna Direita: SE VOCÊ TRAVAR
      doc.setFillColor(...PALETTE.cardWhite);
      doc.roundedRect(margin + splitW + 6, y2, splitW, splitH, 2.5, 2.5, 'F');
      doc.setDrawColor(...PALETTE.borderLight);
      doc.roundedRect(margin + splitW + 6, y2, splitW, splitH, 2.5, 2.5, 'D');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...PALETTE.navyDark);
      doc.text('⚡ SE VOCÊ ENCONTRAR RESISTÊNCIA', margin + splitW + 11, y2 + 7);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...PALETTE.slateDark);
      const fixContent = 'Não responda na mesma frequência emocional. Mantenha a serenidade inabalável e lembre o combinado prévio com carinho.';
      const splitFix = doc.splitTextToSize(fixContent, splitW - 10);
      doc.text(splitFix.slice(0, 4), margin + splitW + 11, y2 + 13);

      y2 += splitH + 8;

      // Seção de Linhas de Anotação & Ação (Ruled Lines - Foto 1, 3 e 4)
      doc.setFillColor(...PALETTE.cardWhite);
      doc.roundedRect(margin, y2, contentWidth, 44, 2.5, 2.5, 'F');
      doc.setDrawColor(...PALETTE.borderLight);
      doc.roundedRect(margin, y2, contentWidth, 44, 2.5, 2.5, 'D');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...PALETTE.terracotta);
      doc.text('📝 MINHAS ANOTAÇÕES & COMBINADOS DO DIA', margin + 6, y2 + 8);

      // Linhas pautadas de caderno reais
      let lineY = y2 + 16;
      for (let l = 0; l < 4; l++) {
        doc.setDrawColor(...PALETTE.lineRuled);
        doc.setLineWidth(0.25);
        doc.line(margin + 6, lineY, margin + contentWidth - 6, lineY);
        lineY += 6.5;
      }

      y2 += 52;

      // Rastreador no Rodapé (Checkboxes & Avaliação do Dia - Foto 3/4)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...PALETTE.slateMuted);

      doc.setDrawColor(...PALETTE.slateLight);
      doc.roundedRect(margin, y2 + 1, 3.5, 3.5, 0.5, 0.5, 'D');
      doc.text('Leitura do Capítulo', margin + 5, y2 + 4);

      doc.roundedRect(margin + 42, y2 + 1, 3.5, 3.5, 0.5, 0.5, 'D');
      doc.text('Exercício Prático Concluído', margin + 47, y2 + 4);

      doc.roundedRect(margin + 98, y2 + 1, 3.5, 3.5, 0.5, 0.5, 'D');
      doc.text('Meta do Dia Cumprida', margin + 103, y2 + 4);

      doc.setFont('helvetica', 'bold');
      doc.text('Avaliação: ★ ★ ★ ★ ★', pageWidth - margin - 35, y2 + 4);
    });

    // ==========================================
    // PREENCHIMENTO DO SUMÁRIO (PÁGINA 3) COM NÚMEROS REAIS
    // ==========================================
    doc.setPage(tocPageIndex);
    let sY = 22;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...PALETTE.navyDark);
    doc.text('Seu Plano de Ação: Os 10 Capítulos', margin, sY);
    sY += 12;

    chaptersToRender.forEach((ch, idx) => {
      const num = ch.chapterNumber || ch.number || idx + 1;
      const title = ch.chapterTitle || ch.title || `Capítulo ${num}`;
      const pageNum = chapterStarts[num] || (4 + idx * 2);

      // Pill CAP
      doc.setFillColor(...PALETTE.terracottaLight);
      doc.roundedRect(margin, sY - 3.8, 16, 5.5, 1.2, 1.2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(...PALETTE.terracotta);
      doc.text(`CAP ${num < 10 ? '0' + num : num}`, margin + 2.2, sY);

      // Título do Capítulo
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...PALETTE.navyDark);
      const titleWidthMax = contentWidth - 45;
      const splitToc = doc.splitTextToSize(title, titleWidthMax);
      doc.text(splitToc, margin + 20, sY);

      // Linha Dotted de Guia
      doc.setDrawColor(...PALETTE.lineRuled);
      doc.setLineDashPattern([0.8, 1.5], 0);
      const textW = doc.getTextWidth(splitToc[splitToc.length - 1]);
      const dotStartX = splitToc.length === 1 ? margin + 20 + textW + 3 : margin + 20 + textW + 3;
      const dotEndX = pageWidth - margin - 18;
      if (dotEndX > dotStartX) {
        doc.line(dotStartX, sY, dotEndX, sY);
      }
      doc.setLineDashPattern([], 0); // Restaura linha sólida

      // Número da Página
      const pageLabel = `Pág. ${pageNum < 10 ? '0' + pageNum : pageNum}`;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...PALETTE.terracotta);
      const pWidth = doc.getTextWidth(pageLabel);
      doc.text(pageLabel, pageWidth - margin - pWidth, sY);

      sY += Math.max(9, splitToc.length * 5 + 3.5);
    });

    // ==========================================
    // RODAPÉ E CABEÇALHOS GERAIS (PÁGINAS 2+)
    // ==========================================
    const totalPages = doc.internal.getNumberOfPages();
    for (let p = 2; p <= totalPages; p++) {
      doc.setPage(p);

      // Linha de Rodapé
      doc.setDrawColor(...PALETTE.borderLight);
      doc.setLineWidth(0.2);
      doc.line(margin, 283, pageWidth - margin, 283);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...PALETTE.slateMuted);
      doc.text('TrendPDF Studio Editorial  •  Workbook Interativo de Ação', margin, 288);

      const pageStr = `Página ${p} de ${totalPages}`;
      const pageStrWidth = doc.getTextWidth(pageStr);
      doc.text(pageStr, pageWidth - margin - pageStrWidth, 288);
    }

    const safeFilename = bookTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '_')
      .slice(0, 30);
    const filename = `workbook_${safeFilename}.pdf`;

    doc.save(filename);
    return filename;
  },
};

export default pdfService;
