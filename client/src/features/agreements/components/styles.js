export const agreementStyles = `
  .ea-serif { font-family: 'Times New Roman', Times, serif; }

  /* ── Browser Print support ── */
  @media print {
    body > *:not(#ea-print-root) { display: none !important; }
    #ea-print-root { display: block !important; }
    #ea-toolbar { display: none !important; }
    #ea-pdf-overlay { display: none !important; }
    @page { size: legal portrait; margin: 8mm; }
    #ea-document {
      box-shadow: none !important;
      margin: 0 !important;
      border-radius: 0 !important;
      width: 100% !important;
    }
  }

  /* ── PDF overlay animation ── */
  @keyframes ea-spin {
    to { transform: rotate(360deg); }
  }
  .ea-spinner { animation: ea-spin 0.8s linear infinite; }

  /* ── Scrollbar styling for overlay ── */
  #ea-print-root::-webkit-scrollbar { width: 6px; }
  #ea-print-root::-webkit-scrollbar-track { background: transparent; }
  #ea-print-root::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.15);
    border-radius: 3px;
  }
`;
