import { useEffect, useState, useCallback } from "react";
import { getPdfConfig, generatePdf } from "../utils/pdfUtils";

export function useHtml2PdfScript() {
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    const existing = document.getElementById("html2pdf-script");
    if (existing) {
      if (typeof window.html2pdf !== "undefined") {
        setScriptReady(true);
      } else {
        existing.addEventListener("load", () => setScriptReady(true));
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "html2pdf-script";
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.async = true;
    script.onload = () => setScriptReady(true);
    script.onerror = () => console.error("html2pdf failed to load from CDN");
    document.head.appendChild(script);
  }, []);

  return scriptReady;
}

export function usePdfDownload(printRef, scriptReady, documentNumber) {
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleDownloadPdf = useCallback(async () => {
    if (!printRef.current || !scriptReady) return;
    setPdfLoading(true);

    await new Promise((r) => setTimeout(r, 80));

    try {
      const config = getPdfConfig(documentNumber);
      await generatePdf(printRef.current, config);
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setPdfLoading(false);
    }
  }, [scriptReady, documentNumber, printRef]);

  return { pdfLoading, handleDownloadPdf };
}

export function useEscapeKey(onClose) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
}

export function useBodyScrollLock() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
}
