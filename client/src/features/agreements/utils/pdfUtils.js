export const getPdfConfig = (documentNumber) => ({
  margin: 0,
  filename: `EPM-Agreement-${documentNumber.replace(/\//g, "-")}.pdf`,
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: {
    scale: 2,
    useCORS: true,
    letterRendering: true,
    backgroundColor: "#ffffff",
    onclone: (clonedDoc) => {
      // Fix fixed overlay coordinate offset
      const overlay = clonedDoc.getElementById("ea-print-root");
      if (overlay) {
        overlay.style.cssText = [
          "position:absolute",
          "top:0",
          "left:0",
          "overflow:visible",
          "background:transparent",
          "backdrop-filter:none",
          "padding:0",
          "display:block",
        ].join(";");
      }

      // Replace oklch() CSS custom properties with hex
      const style = clonedDoc.createElement("style");
      style.textContent = `
        :root, * {
          /* Neutrals */
          --color-white:      #ffffff;
          --color-black:      #000000;
          /* Slate */
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
          /* Orange */
          --color-orange-300: #fdba74;
          --color-orange-400: #fb923c;
          --color-orange-500: #f97316;
          --color-orange-600: #ea580c;
          /* Amber */
          --color-amber-300:  #fcd34d;
          --color-amber-400:  #fbbf24;
          --color-amber-500:  #f59e0b;
          /* Red */
          --color-red-400:    #f87171;
          --color-red-500:    #ef4444;
          /* Indigo */
          --color-indigo-500: #6366f1;
          /* Violet */
          --color-violet-500: #8b5cf6;
        }
      `;
      clonedDoc.head.appendChild(style);
    },
  },
  jsPDF: {
    unit: "mm",
    format: "a4",
    orientation: "portrait",
  },
  pagebreak: { mode: ["css", "legacy"], avoid: ["tr", "td"] },
});

export const generatePdf = async (element, config) => {
  await window.html2pdf().set(config).from(element).save();
};
