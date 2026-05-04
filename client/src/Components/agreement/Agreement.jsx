/**
 * EmpanelmentAgreement.jsx
 *
 * Renders the EPMSS Commercial Empanelment Agreement as a print/PDF-ready React component.
 * Fillable fields are fetched from the backend via TanStack Query (useQuery).
 *
 * PDF EXPORT:
 *   - Call window.print() — the embedded @media print CSS hides everything except
 *     the #agreement-document node and renders it A4-sized.
 *   - Alternatively pass the ref to html2pdf.js / jsPDF for programmatic export.
 *
 * USAGE:
 *   <EmpanelmentAgreement agreementId="015" />
 */

import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

// ─────────────────────────────────────────────────────────────────────────────
// DATA FETCHER
// Replace the URL with your actual Express endpoint.
// Expected response shape:
// {
//   documentNumber: "015/EPMSS-CMA/2026-27",
//   agreementDate: "01-05-2026",          // DD-MM-YYYY
//   clientCompanyName: "Acme Pvt. Ltd.",
//   clientAddress: "123 MG Road, Bengaluru – 560001",
//   serviceChargePercent: "8.33",         // e.g. "8.33" → shown as 8.33%
//   gstApplicable: true,
//   lockInDays: 90,                       // default 90
//   paymentDueDays: 7,                    // default 7
//   coolingPeriodMonths: 6,              // default 6
//   confirmationDays: 30,                // default 30
//   contractYears: 3,                    // default 3
//   noticeDays: 30,                      // default 30
//   arbitrationCity: "Guwahati",
//   directorName: "Dangshawapipa Angrung",
// }
// ─────────────────────────────────────────────────────────────────────────────
const fetchAgreementData = async (agreementId) => {
  const res = await fetch(`/api/agreements/${agreementId}`);
  if (!res.ok) throw new Error("Failed to fetch agreement data");
  return res.json();
};

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT / FALLBACK VALUES
// Used as placeholders while loading or when a field is not yet saved.
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
export default function EmpanelmentAgreement({ agreementId = "015" }) {
  const printRef = useRef(null);

  // ── TanStack Query ────────────────────────────────────────────────────────
  const { data, isLoading, isError } = useQuery({
    queryKey: ["agreement", agreementId],
    queryFn: () => fetchAgreementData(agreementId),
    // Keep stale data visible while revalidating
    staleTime: 1000 * 60 * 5,
  });

  // Merge fetched data with defaults so every field always has a value
  const d = { ...DEFAULTS, ...data };

  // ── Fee string helpers ────────────────────────────────────────────────────
  const feeLabel =
    d.serviceChargePercent === "___" ? "% %" : `${d.serviceChargePercent}%`;

  const gstNote = d.gstApplicable ? "+ GST (if applicable)" : "";

  // ── Print handler ─────────────────────────────────────────────────────────
  const handlePrint = () => window.print();

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Print-only styles ───────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Times+New+Roman:ital,wght@0,400;0,700;1,400&display=swap');

        @media print {
          body > *:not(#agreement-print-root) { display: none !important; }
          #agreement-print-root { display: block !important; }
          #agreement-toolbar { display: none !important; }
          @page { size: A4; margin: 0; }
          #agreement-document { box-shadow: none !important; margin: 0 !important; border-radius: 0 !important; }
        }
      `}</style>

      <div
        id="agreement-print-root"
        style={{
          background: "#e5e7eb",
          minHeight: "100vh",
          padding: "24px 0",
          fontFamily: "'Times New Roman', Times, serif",
        }}
      >
        {/* ── Toolbar (hidden on print) ────────────────────────────────── */}
        <div
          id="agreement-toolbar"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <button
            onClick={handlePrint}
            disabled={isLoading}
            style={{
              background: "#1e293b",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "10px 28px",
              fontSize: 14,
              fontFamily: "sans-serif",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontWeight: 600,
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            {isLoading ? "Loading…" : "🖨 Print / Save as PDF"}
          </button>
          {isError && (
            <span
              style={{
                color: "#dc2626",
                fontFamily: "sans-serif",
                fontSize: 13,
                alignSelf: "center",
              }}
            >
              ⚠ Could not load agreement data — showing defaults.
            </span>
          )}
        </div>

        {/* ── A4 Document ─────────────────────────────────────────────── */}
        <div
          id="agreement-document"
          ref={printRef}
          style={{
            width: 794, // A4 @ 96dpi
            minHeight: 1123,
            background: "#fff",
            margin: "0 auto",
            boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
            borderRadius: 4,
            overflow: "hidden",
            pageBreakAfter: "always",
          }}
        >
          {/* ════════════════════════════════════════════════════════════
              PAGE 1
          ════════════════════════════════════════════════════════════ */}
          <Page>
            {/* ── Decorative top bar ─────────────────────────────── */}
            <TopBar />

            {/* ── Header ─────────────────────────────────────────── */}
            <header
              style={{
                display: "flex",
                alignItems: "center",
                padding: "18px 40px 10px",
                gap: 24,
              }}
            >
              {/* ── LOGO SECTION ──────────────────────────────────────
               *  TODO: Replace the placeholder below with your actual logo.
               *
               *  Option A – Image tag:
               *    <img src="/assets/epm-logo.png" alt="EPM Logo" style={{ width: 80, height: 80, objectFit: "contain" }} />
               *
               *  Option B – Import at top of file:
               *    import epmLogo from "../assets/epm-logo.png";
               *    <img src={epmLogo} alt="EPM Logo" style={{ width: 80 }} />
               *
               *  Option C – Fetch URL from backend (already in `data.logoUrl`):
               *    <img src={d.logoUrl} alt="EPM Logo" style={{ width: 80 }} />
               * ────────────────────────────────────────────────────── */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  background: "#f1f5f9",
                  border: "2px dashed #94a3b8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "#64748b",
                  fontSize: 10,
                  textAlign: "center",
                  fontFamily: "sans-serif",
                }}
              >
                {/* LOGO PLACEHOLDER — swap me */}
                EPM
                <br />
                Logo
              </div>

              {/* ── Company name + tagline ──────────────────────── */}
              <div style={{ flex: 1, textAlign: "center" }}>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 22,
                    fontWeight: 900,
                    letterSpacing: 1,
                    color: "#1e293b",
                    textTransform: "uppercase",
                  }}
                >
                  EPM Staffing Services (OPC) Pvt. Ltd.
                </h1>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 16,
                    fontStyle: "italic",
                    fontWeight: 700,
                    color: "#1e293b",
                  }}
                >
                  Talent Delivered
                </p>
              </div>

              {/* ── Contact block ───────────────────────────────── */}
              <div
                style={{
                  fontSize: 11,
                  lineHeight: 1.9,
                  color: "#1e293b",
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                <div>📞 +91 9862279597</div>
                <div>✉ admin@epmstaffingservices.com</div>
                <div>✉ careerepmstaffingservices@gmail.com</div>
              </div>
            </header>

            {/* ── Orange divider line ────────────────────────────── */}
            <div
              style={{
                height: 3,
                background: "linear-gradient(90deg,#f97316,#fbbf24,#f97316)",
                margin: "0 0 4px",
              }}
            />

            {/* ── Address + CIN row ──────────────────────────────── */}
            <div
              style={{
                padding: "4px 40px 10px",
                fontSize: 11,
                color: "#1e293b",
              }}
            >
              <span>Imphal, Manipur – 795001</span>
              <span style={{ marginLeft: 32 }}>CIN: U78100MN2025OPC015365</span>
            </div>

            {/* ── Document number ────────────────────────────────── */}
            <div
              style={{ padding: "0 40px 6px", fontSize: 11.5, fontWeight: 700 }}
            >
              No. {d.documentNumber}
            </div>

            {/* ── Agreement title ────────────────────────────────── */}
            <h2
              style={{
                textAlign: "center",
                textDecoration: "underline",
                fontSize: 16,
                fontWeight: 900,
                margin: "10px 40px",
                letterSpacing: 0.5,
              }}
            >
              COMMERCIAL EMPANELMENT AGREEMENT
            </h2>

            {/* ── Parties preamble ───────────────────────────────── */}
            <Section>
              <p style={bodyText}>
                This Company Empanelment Agreement is made and executed on{" "}
                <Underlined>{d.agreementDate}</Underlined>
              </p>
              <p style={{ ...bodyText, textAlign: "center", fontWeight: 700 }}>
                BY AND BETWEEN
              </p>
              <p style={{ ...bodyText, textAlign: "center", fontWeight: 700 }}>
                AND
              </p>
              <p style={bodyText}>
                (
                <Underlined>
                  <strong>{d.clientCompanyName}</strong>
                </Underlined>
                ), a company, having its registered office at (
                <Underlined>{d.clientAddress}</Underlined>), hereinafter
                referred to as the <strong>"Client"</strong>.
              </p>
              <p style={bodyText}>
                <strong>EPM Staffing Services (OPC) Private Limited</strong> and
                (
                <Underlined>
                  <strong>{d.clientCompanyName}</strong>
                </Underlined>
                ) shall collectively be referred to as the{" "}
                <strong>"Parties"</strong> and individually as a{" "}
                <strong>"Party."</strong>
              </p>
            </Section>

            <SectionDivider />

            {/* ── Section 1 ──────────────────────────────────────── */}
            <SectionHeading>
              1. Job Requirement Sharing &amp; Candidate Submission
            </SectionHeading>
            <Section>
              <p style={bodyText}>
                <strong>1.1</strong> The Client shall share its job requirements
                with the Staffing Agency. In response, the Staffing Agency shall
                source and submit qualified candidates to fulfil staffing needs
                across various roles.
              </p>
              <p style={bodyText}>
                <strong>1.2</strong> The Staffing Agency shall follow a process
                focused on quality, efficiency, and timeliness, ensuring the
                delivery of candidates aligned with the Client's requirements,
                expectations, and workplace culture.
              </p>
            </Section>

            <SectionDivider />

            {/* ── Section 2 ──────────────────────────────────────── */}
            <SectionHeading>
              2. Candidate Submission &amp; Interview Scheduling
            </SectionHeading>
            <Section>
              <ul style={{ margin: "6px 0 0 0", paddingLeft: 28 }}>
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

            {/* ── Section 3 ──────────────────────────────────────── */}
            <SectionHeading>3. Hiring Confirmation</SectionHeading>
            <Section>
              <p style={bodyText}>
                <strong>3.1</strong> Outstation candidates called for interviews
                shall be reimbursed directly by the Client.
              </p>
              <p style={bodyText}>
                <strong>3.2</strong> The Client agrees to pay the professional
                charges for any candidate referred by the Staffing Agency, even
                if such candidate is hired directly or indirectly by the Client
                within <strong>{d.coolingPeriodMonths} (six) months</strong>{" "}
                from the date of first reference{" "}
                <strong>
                  (CV cooling period of {d.coolingPeriodMonths} months).
                </strong>
              </p>
              <p style={bodyText}>
                <strong>3.3</strong> The Client shall confirm the continuation
                of the recruited candidate after {d.confirmationDays} days from
                the date of joining.
              </p>
              <p style={bodyText}>
                <strong>3.4</strong> In the absence of any communication within
                7 (seven) days after completion of {d.confirmationDays} days,
                the placement shall be deemed successful.
              </p>
            </Section>

            <SectionDivider />

            {/* ── Section 4 ──────────────────────────────────────── */}
            <SectionHeading>
              4. Payment Terms &amp; Professional Fee
            </SectionHeading>
            <Section>
              <p style={bodyText}>
                <strong>a.</strong> For each successful hire made by the Client
                of a candidate referred/submitted by the Staffing Agency, the
                Client agrees to pay a one-time professional fee equivalent to{" "}
                <Underlined>
                  <strong>
                    {feeLabel} of the candidate's annual Cost to Company (CTC).
                  </strong>
                </Underlined>
              </p>

              {/* ── Fee table ──────────────────────────────────── */}
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: 10,
                  fontSize: 12,
                }}
              >
                <thead>
                  <tr>
                    <th style={thStyle}>CTC Range</th>
                    <th style={thStyle}>Service Charges</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tdStyle}>
                      <strong>All Levels</strong>
                    </td>
                    <td style={tdStyle}>
                      <strong>
                        <Underlined>{feeLabel}</Underlined> of Annual gross CTC{" "}
                        {gstNote}
                      </strong>
                      <br />
                      <span style={{ fontWeight: 700 }}>
                        (The annual Gross CTC includes Basic, HRA, all types of
                        Allowances and Variable Pays in any form)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Section>

            {/* ── Page 1 footer ──────────────────────────────────── */}
            <PageFooter pageNum={1} />
          </Page>

          {/* ════════════════════════════════════════════════════════════
              PAGE 2
          ════════════════════════════════════════════════════════════ */}
          <Page style={{ pageBreakBefore: "always" }}>
            <TopBar />

            {/* ── 4.1 Service Fee Eligibility ───────────────────── */}
            <div style={{ padding: "28px 40px 0" }}>
              <p style={bodyText}>
                <strong>b.</strong> The Tax Invoice shall be raised after
                completion of the confirmation period as stated above.
              </p>
              <p style={bodyText}>
                <strong>c.</strong> The payment due date shall be{" "}
                <strong>{d.paymentDueDays} (seven) days</strong> from the date
                of receipt of the invoice.
              </p>
              <p style={bodyText}>
                <strong>d.</strong> Payments shall preferably be made via net
                banking. Bank details shall be provided in the invoice.
              </p>
              <p style={bodyText}>
                <strong>e.</strong> All payments shall be made in favour of{" "}
                <strong>EPM Staffing Services (OPC) Private Limited</strong>.
              </p>
            </div>

            <SectionDivider />

            <SectionHeading>
              4.1 Service Fee Eligibility Conditions
            </SectionHeading>
            <Section>
              <p style={bodyText}>
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
              </p>
              <p style={bodyText}>
                <strong>
                  b. Replacement / Lock-in period of {d.lockInDays} days
                </strong>
              </p>
            </Section>

            <SectionDivider />

            {/* ── Section 5 ──────────────────────────────────────── */}
            <SectionHeading>
              5. Continued Default &amp; Legal Implications
            </SectionHeading>
            <Section>
              <p style={bodyText}>
                In the event of non-payment of the agreed service fee within the
                stipulated 45–60 days, the Staffing Agency reserves the right
                to:
              </p>
              <ul style={{ margin: "6px 0 0 0", paddingLeft: 28 }}>
                <BulletItem>Suspend ongoing recruitment services.</BulletItem>
                <BulletItem>Withhold further candidate submissions;</BulletItem>
                <BulletItem>Initiate recovery of outstanding dues.</BulletItem>
              </ul>
            </Section>

            <SectionDivider />

            <SectionHeading>5.1 Legal Recovery Proceedings</SectionHeading>
            <Section>
              <p style={{ ...bodyText, fontWeight: 700 }}>
                In case of continued default, the Staffing Agency reserves the
                right to initiate recovery proceedings under applicable Indian
                laws, including:
              </p>
              <p style={bodyText}>
                <strong>a.</strong> This Agreement shall be governed by the laws
                of India.
              </p>
              <p style={bodyText}>
                <strong>b.</strong> Any dispute arising between the Parties
                shall be referred to arbitration under the Arbitration and
                Conciliation Act, 1996.
              </p>
              <p style={bodyText}>
                <strong>c.</strong> Arbitration proceedings shall be conducted
                in <strong>{d.arbitrationCity}</strong>, in the English
                language.
              </p>
              <p style={{ ...bodyText, fontWeight: 700 }}>
                Note: All legal costs, including court fees, arbitration
                expenses, advocate fees, and incidental costs, shall be borne by
                the Client.
              </p>
            </Section>

            <SectionDivider />

            {/* ── Section 6 Duration ─────────────────────────────── */}
            <SectionHeading>5. Duration and Termination:</SectionHeading>
            <Section>
              <p style={bodyText}>
                <strong>a.</strong> If accepted, the services shall be provided
                for a duration of <strong>{d.contractYears} years</strong> from
                the date of signing, and any alteration to this proposal shall
                be on mutual agreement, recorded in writing.
              </p>
              <p style={bodyText}>
                <strong>b.</strong> This agreement may be terminated by either
                party by giving <strong>{d.noticeDays} days'</strong> notice.
              </p>
            </Section>

            <SectionDivider />

            {/* ── Section 7 Acknowledgement ──────────────────────── */}
            <SectionHeading>7. Acknowledgement</SectionHeading>
            <Section>
              <p style={bodyText}>
                By entering into this Agreement, both Parties acknowledge and
                agree to abide by the terms and conditions stated herein and
                commit to maintaining a professional and mutually beneficial
                relationship.
              </p>
            </Section>

            {/* ── Signature block ────────────────────────────────── */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "32px 60px 0",
                marginTop: 8,
              }}
            >
              {/* Proposed (EPM side) */}
              <div style={{ width: "45%" }}>
                <p style={{ ...bodyText, fontWeight: 700, marginBottom: 40 }}>
                  Proposed
                </p>

                {/* ── SIGNATURE IMAGE / SEAL — LOGO SECTION ──────────────
                 *  TODO: Replace with actual director signature image and seal.
                 *
                 *  Option A:
                 *    <img src="/assets/director-signature.png" style={{ height: 60 }} alt="Signature" />
                 *    <img src="/assets/company-seal.png" style={{ height: 60 }} alt="Seal" />
                 *
                 *  Option B (from backend):
                 *    <img src={d.signatureUrl} style={{ height: 60 }} alt="Signature" />
                 * ────────────────────────────────────────────────────── */}
                <div
                  style={{
                    width: 120,
                    height: 50,
                    border: "1px dashed #94a3b8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    color: "#94a3b8",
                    fontFamily: "sans-serif",
                    marginBottom: 4,
                  }}
                >
                  [Signature Image]
                </div>

                <p
                  style={{ ...bodyText, margin: "6px 0 2px", fontWeight: 700 }}
                >
                  {d.directorName}
                </p>
                <p style={{ ...bodyText, margin: "2px 0" }}>Director</p>
                <p style={{ ...bodyText, margin: "2px 0", fontWeight: 700 }}>
                  EPM Staffing Services OPC Private Limited
                </p>
              </div>

              {/* Accepted (Client side) */}
              <div
                style={{
                  width: "45%",
                  borderLeft: "1px solid #e2e8f0",
                  paddingLeft: 24,
                }}
              >
                <p style={{ ...bodyText, fontWeight: 700, marginBottom: 40 }}>
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

            {/* ── Page 2 footer ──────────────────────────────────── */}
            <PageFooter pageNum={2} />
          </Page>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS & STYLE HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** A4-sized page wrapper */
function Page({ children, style = {} }) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: 1122,
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Orange/gold decorative top bar matching original letterhead */
function TopBar() {
  return (
    <div
      style={{
        height: 8,
        background:
          "linear-gradient(90deg,#f97316 0%,#fbbf24 50%,#f97316 100%)",
      }}
    />
  );
}

/** Bottom page footer with page number */
function PageFooter({ pageNum }) {
  return (
    <div
      style={{
        marginTop: "auto",
        borderTop: "2px solid #f97316",
        padding: "6px 40px",
        display: "flex",
        justifyContent: "flex-end",
        fontSize: 11,
        color: "#64748b",
      }}
    >
      Page-{pageNum}
    </div>
  );
}

/** Centered decorative section divider */
function SectionDivider() {
  return (
    <div style={{ textAlign: "center", margin: "10px 40px 2px" }}>
      <span
        style={{
          display: "inline-block",
          width: 140,
          borderBottom: "1.5px solid #1e293b",
        }}
      />
    </div>
  );
}

/** Bold centered section heading */
function SectionHeading({ children }) {
  return (
    <h3
      style={{
        textAlign: "center",
        fontWeight: 700,
        fontSize: 13,
        margin: "8px 40px 4px",
      }}
    >
      {children}
    </h3>
  );
}

/** Section body wrapper */
function Section({ children }) {
  return <div style={{ padding: "2px 40px 8px" }}>{children}</div>;
}

/** Underlined inline span for fillable fields */
function Underlined({ children }) {
  return <span style={{ textDecoration: "underline" }}>{children}</span>;
}

/** Bullet list item */
function BulletItem({ children }) {
  return (
    <li style={{ ...bodyText, marginBottom: 4, paddingLeft: 4 }}>{children}</li>
  );
}

/** Signature line with a dotted underline */
function SignatureLine({ label, value = "" }) {
  return (
    <p style={{ ...bodyText, marginBottom: 14 }}>
      <Underlined>
        {label} {value || "................................................"}
      </Underlined>
    </p>
  );
}

// ── Shared inline styles ────────────────────────────────────────────────────
const bodyText = {
  fontSize: 12.5,
  lineHeight: 1.75,
  margin: "5px 0",
  textAlign: "justify",
  fontFamily: "'Times New Roman', Times, serif",
};

const thStyle = {
  border: "1px solid #1e293b",
  padding: "6px 10px",
  background: "#f8fafc",
  fontWeight: 700,
  fontSize: 12,
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #1e293b",
  padding: "8px 10px",
  fontSize: 12,
  verticalAlign: "top",
};
