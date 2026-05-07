/**
 * EmpanelmentAgreement.jsx
 *
 * USAGE:
 *   <EmpanelmentAgreement agreementId="015" onClose={() => navigate(-1)} />
 *
 * FIXES & IMPROVEMENTS:
 *  - z-[900] replaces invalid z-900 Tailwind class
 *  - Proper CSS page-break-after on each Page for html2pdf splitting
 *  - jsPDF switched to mm + a4 format (correct scaling)
 *  - PDF generation overlay so UI doesn't feel frozen
 *  - Escape key close handler cleaned up
 *  - Download button disabled until html2pdf script is ready
 *  - TopBar excluded from last page's bottom space (footer stays at bottom)
 */

import { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { X, Download, Loader2, FileText } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA FETCHER
// ─────────────────────────────────────────────────────────────────────────────
const fetchAgreementData = async (agreementId) => {
  const res = await fetch(`/api/agreements/${agreementId}`);
  if (!res.ok) throw new Error("Failed to fetch agreement data");
  return res.json();
};

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULTS
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULTS = {
  documentNumber: "015/EPMSS-CMA/2026-27",
  agreementDate: "(DD-MM-YYYY)",
  clientCompanyName: "(Your Company Name)",
  clientAddress: "(Address)",
  serviceChargePercent: "___",
  gstApplicable: true,
  lockInDays: 90,
  paymentDueDays: 7,
  coolingPeriodMonths: 6,
  confirmationDays: 30,
  contractYears: 3,
  noticeDays: 30,
  arbitrationCity: "Guwahati",
  directorName: "Dangshawapipa Angrung",
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function EmpanelmentAgreement({ agreementId = "015", onClose }) {
  const printRef = useRef(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["agreement", agreementId],
    queryFn: () => fetchAgreementData(agreementId),
    staleTime: 1000 * 60 * 5,
  });

  const d = { ...DEFAULTS, ...data };
  const feeLabel =
    d.serviceChargePercent === "___" ? "__%" : `${d.serviceChargePercent}%`;
  const gstNote = d.gstApplicable ? "+ GST (if applicable)" : "";

  // ── Load html2pdf from CDN ─────────────────────────────────────────────────
  useEffect(() => {
    const existing = document.getElementById("html2pdf-script");
    if (existing) {
      // Script tag exists — may already be loaded
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

  // ── Download PDF ───────────────────────────────────────────────────────────
  const handleDownloadPdf = useCallback(async () => {
    if (!printRef.current || !scriptReady) return;
    setPdfLoading(true);

    // Small delay so the overlay renders before html2canvas locks the thread
    await new Promise((r) => setTimeout(r, 80));

    try {
      await window
        .html2pdf()
        .set({
          // margin:0 is intentional — the document element is exactly 794px wide
          // (= A4 210mm at 96dpi) and each Page is min-h-[1122px] (= A4 297mm).
          // Any non-zero margin would shrink the usable area, scale the content
          // down, clip text on the right, and cause pages to overflow into extra
          // blank PDF pages. Visual breathing room comes from the document's own
          // px-10 section padding.
          margin: 0,
          filename: `EPM-Agreement-${d.documentNumber.replace(/\//g, "-")}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: "#ffffff",
            /**
             * ROOT CAUSE OF RIGHT-SIDE CLIPPING:
             * The document sits inside a `position:fixed` overlay centered in
             * the viewport (e.g. left:243px on a 1280px screen). html2canvas
             * reads getBoundingClientRect() and gets left:243. It then tries to
             * render at x:243 — but there's no page content there, so everything
             * to the right of (794-243)=551px gets cut.
             *
             * Fix inside onclone: locate the fixed overlay by id and change it
             * to position:absolute left:0 top:0. This gives html2canvas a clean
             * origin (0,0) that matches the element's actual content position.
             *
             * Also inject hex overrides for Tailwind v4's oklch() color vars,
             * which html2canvas v1.x cannot parse.
             */
            onclone: (clonedDoc) => {
              // ── 1. Fix fixed overlay coordinate offset ──────────────────────
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

              // ── 2. Replace oklch() CSS custom properties with hex ───────────
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
          // "css" respects page-break-after/before; "legacy" is the fallback
          pagebreak: { mode: ["css", "legacy"], avoid: ["tr", "td"] },
        })
        .from(printRef.current)
        .save();
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setPdfLoading(false);
    }
  }, [scriptReady, d.documentNumber]);

  // ── Close on Escape ────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // ── Prevent body scroll while overlay is open ──────────────────────────────
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const downloadDisabled = isLoading || pdfLoading || !scriptReady;

  // ── Portal: renders directly into document.body to escape any parent
  //    stacking context (overflow:hidden, transform, filter, will-change, etc.)
  //    that would trap a fixed overlay at a lower z-index than sibling cards.
  return createPortal(
    <>
      <style>{`
        /* Serif font via system stack (Times New Roman is universally available) */
        .ea-serif { font-family: 'Times New Roman', Times, serif; }

        /* ── Page break support for html2pdf ── */
        .ea-page {
          page-break-after: always;
          break-after: page;
        }
        /* Last page should NOT force an extra blank page */
        .ea-page:last-child {
          page-break-after: avoid;
          break-after: avoid;
        }

        /* ── Browser Print support ── */
        @media print {
          body > *:not(#ea-print-root) { display: none !important; }
          #ea-print-root { display: block !important; }
          #ea-toolbar { display: none !important; }
          #ea-pdf-overlay { display: none !important; }
          @page { size: A4; margin: 10mm 12mm; }
          #ea-document {
            box-shadow: none !important;
            margin: 0 !important;
            border-radius: 0 !important;
            width: 100% !important;
          }
          .ea-page {
            page-break-after: always;
            break-after: page;
          }
          .ea-page:last-child {
            page-break-after: avoid;
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
      `}</style>

      {/* ── Full-screen overlay ── */}
      <div
        id="ea-print-root"
        className="ea-serif fixed inset-0 z-[900] bg-black/60 backdrop-blur-sm flex flex-col items-center overflow-y-auto py-6"
      >
        {/* ── PDF generation overlay (blocks interaction while html2canvas runs) ── */}
        {pdfLoading && (
          <div
            id="ea-pdf-overlay"
            className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center shadow-2xl shadow-orange-500/40">
              <FileText size={28} className="text-white ea-spinner" />
            </div>
            <p className="text-white text-base font-semibold font-sans tracking-wide">
              Generating PDF…
            </p>
            <p className="text-slate-300 text-xs font-sans">
              This may take a few seconds
            </p>
          </div>
        )}

        {/* ── Floating toolbar ── */}
        <div
          id="ea-toolbar"
          className="sticky top-0 z-[920] w-[794px] max-w-[calc(100vw-16px)] flex items-center justify-between bg-slate-900/95 backdrop-blur-sm rounded-t-xl px-5 py-3 shadow-xl border border-white/5"
        >
          {/* Left — title */}
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            <span className="text-white text-sm font-semibold font-sans tracking-wide">
              Commercial Empanelment Agreement
            </span>
            {isLoading && (
              <span className="flex items-center gap-1 text-slate-400 text-xs font-sans">
                <Loader2 size={11} className="animate-spin" />
                Loading…
              </span>
            )}
            {isError && (
              <span className="text-amber-400 text-xs font-sans">
                ⚠ Showing defaults
              </span>
            )}
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-2">
            {/* Script loading indicator */}
            {!scriptReady && !isLoading && (
              <span className="text-slate-400 text-xs font-sans flex items-center gap-1">
                <Loader2 size={11} className="animate-spin" />
                Loading PDF engine…
              </span>
            )}

            <button
              onClick={handleDownloadPdf}
              disabled={downloadDisabled}
              title={!scriptReady ? "PDF engine loading…" : "Download as PDF"}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold font-sans transition-all duration-200
                ${
                  downloadDisabled
                    ? "bg-slate-700 text-slate-500 cursor-not-allowed opacity-60"
                    : "bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/25 active:scale-95"
                }`}
            >
              {pdfLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Download size={14} />
                  Download PDF
                </>
              )}
            </button>

            {onClose && (
              <button
                onClick={onClose}
                title="Close (Esc)"
                className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-red-500 flex items-center justify-center transition-all duration-200 active:scale-95 group"
              >
                <X
                  size={15}
                  className="text-slate-300 group-hover:text-white transition-colors"
                />
              </button>
            )}
          </div>
        </div>

        {/* ── A4 Document ── */}
        <div
          id="ea-document"
          ref={printRef}
          className="w-[794px] max-w-[calc(100vw-16px)] bg-white shadow-2xl"
        >
          {/* ══════════════════════════════════
              PAGE 1
          ══════════════════════════════════ */}
          <Page>
            <TopBar />

            <header className="flex items-center px-10 pt-5 pb-3 gap-6">
              {/* Logo placeholder */}
              <div className="w-20 h-20 rounded-lg bg-slate-100 border-2 border-dashed border-slate-400 flex items-center justify-center shrink-0 text-slate-500 text-[10px] text-center font-sans leading-tight">
                EPM
                <br />
                Logo
              </div>

              <div className="flex-1 text-center">
                <h1 className="m-0 text-[22px] font-black tracking-wide text-slate-900 uppercase">
                  EPM Staffing Services (OPC) Pvt. Ltd.
                </h1>
                <p className="mt-1 text-base italic font-bold text-slate-900">
                  Talent Delivered
                </p>
              </div>

              <div className="text-[11px] leading-[1.9] text-slate-900 text-right shrink-0">
                <div>📞 +91 9862279597</div>
                <div>✉ admin@epmstaffingservices.com</div>
                <div>✉ careerepmstaffingservices@gmail.com</div>
              </div>
            </header>

            <div className="h-[3px] bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 mb-1" />

            <div className="px-10 pt-1 pb-2.5 text-[11px] text-slate-900">
              <span>Imphal, Manipur – 795001</span>
              <span className="ml-8">CIN: U78100MN2025OPC015365</span>
            </div>

            <div className="px-10 pb-1.5 text-[11.5px] font-bold">
              No. {d.documentNumber}
            </div>

            <h2 className="text-center underline text-base font-black mx-10 my-2.5 tracking-wide">
              COMMERCIAL EMPANELMENT AGREEMENT
            </h2>

            <Section>
              <BodyText>
                This Company Empanelment Agreement is made and executed on{" "}
                <Underlined>{d.agreementDate}</Underlined>
              </BodyText>
              <BodyText className="text-center font-bold">
                BY AND BETWEEN
              </BodyText>
              <BodyText className="text-center font-bold">AND</BodyText>
              <BodyText>
                (
                <Underlined>
                  <strong>{d.clientCompanyName}</strong>
                </Underlined>
                ), a company, having its registered office at (
                <Underlined>{d.clientAddress}</Underlined>), hereinafter
                referred to as the <strong>"Client"</strong>.
              </BodyText>
              <BodyText>
                <strong>EPM Staffing Services (OPC) Private Limited</strong> and
                (
                <Underlined>
                  <strong>{d.clientCompanyName}</strong>
                </Underlined>
                ) shall collectively be referred to as the{" "}
                <strong>"Parties"</strong> and individually as a{" "}
                <strong>"Party."</strong>
              </BodyText>
            </Section>

            <SectionDivider />

            <SectionHeading>
              1. Job Requirement Sharing &amp; Candidate Submission
            </SectionHeading>
            <Section>
              <BodyText>
                <strong>1.1</strong> The Client shall share its job requirements
                with the Staffing Agency. In response, the Staffing Agency shall
                source and submit qualified candidates to fulfil staffing needs
                across various roles.
              </BodyText>
              <BodyText>
                <strong>1.2</strong> The Staffing Agency shall follow a process
                focused on quality, efficiency, and timeliness, ensuring the
                delivery of candidates aligned with the Client's requirements,
                expectations, and workplace culture.
              </BodyText>
            </Section>

            <SectionDivider />

            <SectionHeading>
              2. Candidate Submission &amp; Interview Scheduling
            </SectionHeading>
            <Section>
              <ul className="mt-1.5 pl-7 space-y-1">
                <BulletItem>
                  Candidates submitted by the Staffing Agency shall initially be
                  shared without contact details.
                </BulletItem>
                <BulletItem>
                  Upon shortlisting and confirmation of interest by the Client,
                  interview scheduling (online/telephonic/physical) shall be
                  coordinated through the Staffing Agency. Candidate contact
                  details may be shared only for recruitment-related
                  communication.
                </BulletItem>
              </ul>
            </Section>

            <SectionDivider />

            <SectionHeading>3. Hiring Confirmation</SectionHeading>
            <Section>
              <BodyText>
                <strong>3.1</strong> Outstation candidates called for interviews
                shall be reimbursed directly by the Client.
              </BodyText>
              <BodyText>
                <strong>3.2</strong> The Client agrees to pay the professional
                charges for any candidate referred by the Staffing Agency, even
                if such candidate is hired directly or indirectly by the Client
                within <strong>{d.coolingPeriodMonths} (six) months</strong>{" "}
                from the date of first reference{" "}
                <strong>
                  (CV cooling period of {d.coolingPeriodMonths} months).
                </strong>
              </BodyText>
              <BodyText>
                <strong>3.3</strong> The Client shall confirm the continuation
                of the recruited candidate after {d.confirmationDays} days from
                the date of joining.
              </BodyText>
              <BodyText>
                <strong>3.4</strong> In the absence of any communication within
                7 (seven) days after completion of {d.confirmationDays} days,
                the placement shall be deemed successful.
              </BodyText>
            </Section>

            <SectionDivider />

            <SectionHeading>
              4. Payment Terms &amp; Professional Fee
            </SectionHeading>
            <Section>
              <BodyText>
                <strong>a.</strong> For each successful hire made by the Client
                of a candidate referred/submitted by the Staffing Agency, the
                Client agrees to pay a one-time professional fee equivalent to{" "}
                <Underlined>
                  <strong>
                    {feeLabel} of the candidate's annual Cost to Company (CTC).
                  </strong>
                </Underlined>
              </BodyText>

              <table className="w-full border-collapse mt-2.5 text-xs">
                <thead>
                  <tr>
                    <th className="border border-slate-800 px-2.5 py-1.5 bg-slate-50 font-bold text-left">
                      CTC Range
                    </th>
                    <th className="border border-slate-800 px-2.5 py-1.5 bg-slate-50 font-bold text-left">
                      Service Charges
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-800 px-2.5 py-2 align-top">
                      <strong>All Levels</strong>
                    </td>
                    <td className="border border-slate-800 px-2.5 py-2 align-top">
                      <strong>
                        <Underlined>{feeLabel}</Underlined> of Annual gross CTC{" "}
                        {gstNote}
                      </strong>
                      <br />
                      <span className="font-bold">
                        (The annual Gross CTC includes Basic, HRA, all types of
                        Allowances and Variable Pays in any form)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Section>

            <PageFooter pageNum={1} />
          </Page>

          {/* ══════════════════════════════════
              PAGE 2
          ══════════════════════════════════ */}
          <Page isLast>
            <TopBar />

            <div className="px-10 pt-7">
              <BodyText>
                <strong>b.</strong> The Tax Invoice shall be raised after
                completion of the confirmation period as stated above.
              </BodyText>
              <BodyText>
                <strong>c.</strong> The payment due date shall be{" "}
                <strong>{d.paymentDueDays} (seven) days</strong> from the date
                of receipt of the invoice.
              </BodyText>
              <BodyText>
                <strong>d.</strong> Payments shall preferably be made via net
                banking. Bank details shall be provided in the invoice.
              </BodyText>
              <BodyText>
                <strong>e.</strong> All payments shall be made in favour of{" "}
                <strong>EPM Staffing Services (OPC) Private Limited</strong>.
              </BodyText>
            </div>

            <SectionDivider />

            <SectionHeading>
              4.1 Service Fee Eligibility Conditions
            </SectionHeading>
            <Section>
              <BodyText>
                <strong>a.</strong> The agreed professional service fee, i.e.{" "}
                <Underlined>
                  <strong>{feeLabel}</strong>
                </Underlined>{" "}
                of Annual gross CTC {gstNote}{" "}
                <strong>
                  shall be payable within 60 days from the candidate's date of
                  joining,
                </strong>{" "}
                subject to the fulfilment of the service.
              </BodyText>
              <BodyText>
                <strong>
                  b. Replacement / Lock-in period of {d.lockInDays} days
                </strong>
              </BodyText>
            </Section>

            <SectionDivider />

            <SectionHeading>
              5. Continued Default &amp; Legal Implications
            </SectionHeading>
            <Section>
              <BodyText>
                In the event of non-payment of the agreed service fee within the
                stipulated 45–60 days, the Staffing Agency reserves the right
                to:
              </BodyText>
              <ul className="mt-1.5 pl-7 space-y-1">
                <BulletItem>Suspend ongoing recruitment services.</BulletItem>
                <BulletItem>Withhold further candidate submissions.</BulletItem>
                <BulletItem>Initiate recovery of outstanding dues.</BulletItem>
              </ul>
            </Section>

            <SectionDivider />

            <SectionHeading>5.1 Legal Recovery Proceedings</SectionHeading>
            <Section>
              <BodyText className="font-bold">
                In case of continued default, the Staffing Agency reserves the
                right to initiate recovery proceedings under applicable Indian
                laws, including:
              </BodyText>
              <BodyText>
                <strong>a.</strong> This Agreement shall be governed by the laws
                of India.
              </BodyText>
              <BodyText>
                <strong>b.</strong> Any dispute arising between the Parties
                shall be referred to arbitration under the Arbitration and
                Conciliation Act, 1996.
              </BodyText>
              <BodyText>
                <strong>c.</strong> Arbitration proceedings shall be conducted
                in <strong>{d.arbitrationCity}</strong>, in the English
                language.
              </BodyText>
              <BodyText className="font-bold">
                Note: All legal costs, including court fees, arbitration
                expenses, advocate fees, and incidental costs, shall be borne by
                the Client.
              </BodyText>
            </Section>

            <SectionDivider />

            <SectionHeading>6. Duration and Termination</SectionHeading>
            <Section>
              <BodyText>
                <strong>a.</strong> If accepted, the services shall be provided
                for a duration of <strong>{d.contractYears} years</strong> from
                the date of signing, and any alteration to this proposal shall
                be on mutual agreement, recorded in writing.
              </BodyText>
              <BodyText>
                <strong>b.</strong> This agreement may be terminated by either
                party by giving <strong>{d.noticeDays} days'</strong> notice.
              </BodyText>
            </Section>

            <SectionDivider />

            <SectionHeading>7. Acknowledgement</SectionHeading>
            <Section>
              <BodyText>
                By entering into this Agreement, both Parties acknowledge and
                agree to abide by the terms and conditions stated herein and
                commit to maintaining a professional and mutually beneficial
                relationship.
              </BodyText>
            </Section>

            {/* Signature block */}
            <div className="flex justify-between px-16 pt-8 mt-2">
              {/* Proposer side */}
              <div className="w-[45%]">
                <p className="text-[12.5px] leading-[1.75] font-bold mb-10 ea-serif">
                  Proposed
                </p>
                <div className="w-[120px] h-[50px] border border-dashed border-slate-400 flex items-center justify-center text-[10px] text-slate-400 font-sans mb-1">
                  [Signature Image]
                </div>
                <p className="text-[12.5px] leading-[1.75] mt-1.5 mb-0.5 font-bold ea-serif">
                  {d.directorName}
                </p>
                <p className="text-[12.5px] leading-[1.75] my-0.5 ea-serif">
                  Director
                </p>
                <p className="text-[12.5px] leading-[1.75] my-0.5 font-bold ea-serif">
                  EPM Staffing Services OPC Private Limited
                </p>
              </div>

              {/* Acceptor side */}
              <div className="w-[45%] border-l border-slate-200 pl-6">
                <p className="text-[12.5px] leading-[1.75] font-bold mb-10 ea-serif">
                  Accepted
                </p>
                <SignatureLine label="Signature:" />
                <SignatureLine label="Name of Competent Authority:" />
                <SignatureLine label="Designation:" />
                <SignatureLine
                  label="Your Company Name:"
                  value={
                    d.clientCompanyName === DEFAULTS.clientCompanyName
                      ? ""
                      : d.clientCompanyName
                  }
                />
                <SignatureLine label="CIN:" />
              </div>
            </div>

            <PageFooter pageNum={2} />
          </Page>
        </div>

        {/* Bottom breathing room */}
        <div className="h-8 w-full shrink-0" />
      </div>
    </>,
    document.body,
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Page wrapper.
 * `isLast` suppresses page-break-after so html2pdf doesn't append a blank page.
 * Each page is exactly A4 height (1122px @ 96dpi).
 */
function Page({ children, isLast = false }) {
  return (
    <div
      className={`relative flex flex-col bg-white ${isLast ? "" : "ea-page"}`}
      style={{ minHeight: "1122px" }}
    >
      {children}
    </div>
  );
}

function TopBar() {
  return (
    <div className="h-2 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 shrink-0" />
  );
}

function PageFooter({ pageNum }) {
  return (
    <div className="mt-auto border-t-2 border-orange-500 px-10 py-1.5 flex justify-end text-[11px] text-slate-500 font-sans">
      Page-{pageNum}
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="text-center mx-10 my-1">
      <span className="inline-block w-36 border-b-[1.5px] border-slate-800" />
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h3 className="text-center font-bold text-[13px] mx-10 mt-2 mb-1 ea-serif">
      {children}
    </h3>
  );
}

function Section({ children }) {
  return <div className="px-10 pt-0.5 pb-2">{children}</div>;
}

function BodyText({ children, className = "" }) {
  return (
    <p
      className={`text-[12.5px] leading-[1.75] my-[5px] text-justify ea-serif ${className}`}
    >
      {children}
    </p>
  );
}

function Underlined({ children }) {
  return <span className="underline">{children}</span>;
}

function BulletItem({ children }) {
  return (
    <li className="text-[12.5px] leading-[1.75] mb-1 pl-1 text-justify ea-serif">
      {children}
    </li>
  );
}

function SignatureLine({ label, value = "" }) {
  return (
    <p className="text-[12.5px] leading-[1.75] mb-3.5 underline ea-serif">
      {label} {value || "................................................"}
    </p>
  );
}
