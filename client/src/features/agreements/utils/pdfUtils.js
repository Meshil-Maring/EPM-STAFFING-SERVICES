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
  margin: [8, 8, 8, 8],
  filename: `EPM-Agreement-${documentNumber.replace(/\//g, "-")}.pdf`,
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: {
    scale: 2,
    useCORS: true,
    letterRendering: true,
    backgroundColor: "#ffffff",
    // Set a very wide virtual viewport so the centred document's right edge
    // never exceeds it — this is the root cause of right-side text clipping.
    windowWidth: 2400,
    scrollX: 0,
    scrollY: 0,
    onclone: (clonedDoc) => {
      // Make the overlay a normal block element so the document sits at (0,0)
      // in the cloned layout rather than being fixed/centred.
      const overlay = clonedDoc.getElementById("ea-print-root");
      if (overlay) {
        overlay.style.cssText = [
          "position:static",
          "overflow:visible",
          "background:transparent",
          "backdrop-filter:none",
          "padding:0",
          "display:block",
        ].join(";");
      }

      const doc = clonedDoc.getElementById("ea-document");
      if (doc) {
        doc.style.maxWidth = "none";
        doc.style.margin = "0";
        doc.style.boxShadow = "none";
      }

      // Replace oklch() CSS custom-property values that html2canvas can't parse
      const style = clonedDoc.createElement("style");
      style.textContent = CSS_VAR_OVERRIDES;
      clonedDoc.head.appendChild(style);
    },
  },
  jsPDF: { unit: "mm", format: "legal", orientation: "portrait" },
  pagebreak: { mode: ["css", "legacy"], avoid: ["tr", "td", "li", "p"] },
});

export const generatePdf = async (element, config) => {
  await window.html2pdf().set(config).from(element).save();
};
