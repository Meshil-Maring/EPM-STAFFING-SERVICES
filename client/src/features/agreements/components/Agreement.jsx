/**
 * EmpanelmentAgreement.jsx
 *
 * USAGE:
 *   <EmpanelmentAgreement agreementId="015" onClose={() => navigate(-1)} />
 */

import { useRef } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";

import { DEFAULTS } from "../constants/constants";
import { fetchAgreementData } from "../services/api";
import { agreementStyles } from "./styles";
import { TopBar, PageFooter } from "./components";
import DocumentHeader from "./DocumentHeader";
import Page1Content from "./Page1Content";
import Page2Content from "./Page2Content";
import Toolbar from "./Toolbar";
import PdfLoadingOverlay from "./PdfLoadingOverlay";
import {
  useHtml2PdfScript,
  usePdfDownload,
  useEscapeKey,
  useBodyScrollLock,
} from "../hooks/hooks";

export default function EmpanelmentAgreement({ agreementId = "015", onClose }) {
  const printRef = useRef(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["agreement", agreementId],
    queryFn: () => fetchAgreementData(agreementId),
    staleTime: 1000 * 60 * 5,
  });

  const d = { ...DEFAULTS, ...data };
  const feeLabel =
    d.serviceChargePercent === "___" ? "__%" : `${d.serviceChargePercent}%`;
  const gstNote = d.gstApplicable ? "+ GST (if applicable)" : "";

  const scriptReady = useHtml2PdfScript();
  const { pdfLoading, handleDownloadPdf } = usePdfDownload(
    printRef,
    scriptReady,
    d.documentNumber,
  );

  useEscapeKey(onClose);
  useBodyScrollLock();

  return createPortal(
    <>
      <style>{agreementStyles}</style>

      <div
        id="ea-print-root"
        className="ea-serif fixed inset-0 z-900 bg-black/60 backdrop-blur-sm flex flex-col items-center overflow-y-auto py-6"
      >
        <PdfLoadingOverlay isVisible={pdfLoading} />

        <Toolbar
          isLoading={isLoading}
          isError={isError}
          scriptReady={scriptReady}
          pdfLoading={pdfLoading}
          onDownload={handleDownloadPdf}
          onClose={onClose}
        />

        {/* Single continuous document — html2pdf paginates automatically */}
        <div
          id="ea-document"
          ref={printRef}
          className="w-198.5 max-w-[calc(100vw-16px)] bg-white shadow-2xl"
        >
          <TopBar />
          <DocumentHeader documentNumber={d.documentNumber} />
          <Page1Content d={d} feeLabel={feeLabel} gstNote={gstNote} />
          <Page2Content d={d} feeLabel={feeLabel} gstNote={gstNote} />
        </div>

        <div className="h-8 w-full shrink-0" />
      </div>
    </>,
    document.body,
  );
}
