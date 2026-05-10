const CSS_VAR_OVERRIDES = `
  :root, * {
    --color-white:      #ffffff;
    --color-black:      #000000;
    --color-slate-50:   #f8fafc;
    --color-slate-100:  #f1f5f9;
    --color-slate-200:  #e2e8f0;
    --color-slate-300:  #cbd5e1;
    --color-slate-400:  #94a3b8;
    --color-slate-500:  #64748b;
    --color-slate-600:  #475569;
    --color-slate-700:  #334155;
    --color-slate-800:  #1e293b;
    --color-slate-900:  #0f172a;
    --color-slate-950:  #020617;
    --color-orange-300: #fdba74;
    --color-orange-400: #fb923c;
    --color-orange-500: #f97316;
    --color-orange-600: #ea580c;
    --color-amber-300:  #fcd34d;
    --color-amber-400:  #fbbf24;
    --color-amber-500:  #f59e0b;
    --color-blue-700:   #1d4ed8;
  }
`;

export const getPdfConfig = (documentNumber) => ({
  filename: `EPM-Agreement-${documentNumber.replace(/\//g, "-")}.pdf`,
  margin: [8, 8, 8, 8],
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: {
    scale: 2,
    useCORS: true,
    letterRendering: true,
    backgroundColor: "#ffffff",
    // windowWidth is set dynamically in generatePdf after the clone is placed
    scrollX: 0,
    scrollY: 0,
    x: 0,
    y: 0,
  },
  jsPDF: { unit: "mm", format: "legal", orientation: "portrait" },
  pagebreak: { mode: ["css", "legacy"], avoid: ["tr", "td", "li", "p"] },
});

export const generatePdf = async (element, config) => {
  // ── Clone the element to position:fixed at (0,0) ──────────────────────────
  // The real element is horizontally centred in the modal.
  // html2canvas clips at window.innerWidth, so if the element's right edge
  // exceeds that boundary, the right side of the PDF is cut off.
  // By placing an identical clone at the top-left corner of the viewport,
  // the right edge is exactly element.offsetWidth — always within windowWidth.
  // The PdfLoadingOverlay (z-index: 1000) covers it so the user sees nothing.

  const elWidth = element.offsetWidth;

  const clone = element.cloneNode(true);
  Object.assign(clone.style, {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "2",           // below loading overlay (z-1000), above page content
    width: elWidth + "px",
    maxWidth: "none",
    margin: "0",
    boxShadow: "none",
    pointerEvents: "none",
  });

  // Inject CSS-variable overrides so Tailwind v4 oklch() colours render in canvas
  const styleEl = document.createElement("style");
  styleEl.textContent = CSS_VAR_OVERRIDES;
  clone.prepend(styleEl);

  document.body.appendChild(clone);

  try {
    await window
      .html2pdf()
      .set({
        ...config,
        html2canvas: {
          ...config.html2canvas,
          windowWidth: elWidth + 50, // virtual viewport just wider than the clone
        },
      })
      .from(clone)
      .save();
  } finally {
    document.body.removeChild(clone);
  }
};
