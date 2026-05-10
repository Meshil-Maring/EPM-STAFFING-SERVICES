import logoSvg from "../../../assets/images/logo.svg";

function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-2 mt-2.5 mb-1">
      <div className="w-1 h-4 bg-orange-500 rounded-sm shrink-0" />
      <p className="text-[11.5px] font-bold text-slate-900 ea-serif">{children}</p>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="pl-4 mb-1.5 space-y-0.5" style={{ listStyleType: "disc" }}>
      {items.map((item, i) => (
        <li key={i} className="text-[11px] leading-[1.6] text-justify ea-serif text-slate-800">
          {item}
        </li>
      ))}
    </ul>
  );
}

function SignatureField({ label }) {
  return (
    <div className="mb-3">
      <span className="text-[11px] ea-serif text-slate-800">{label}</span>
      <div className="border-b border-slate-700 mt-2.5" />
    </div>
  );
}

export default function AgreementContent({ d, feeLabel }) {
  return (
    <div className="ea-serif bg-white">
      {/* ── Top accent bar ── */}
      <div className="h-1.5 bg-linear-to-r from-orange-600 via-amber-400 to-orange-600" />

      {/* ── Header: table layout for reliable html2canvas rendering ── */}
      <header style={{ padding: "10px 32px 6px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <colgroup>
            <col style={{ width: 66 }} />
            <col />
            <col style={{ width: 192 }} />
          </colgroup>
          <tbody>
            <tr>
              {/* Logo cell */}
              <td style={{ verticalAlign: "middle", paddingRight: 8 }}>
                <img
                  src={logoSvg}
                  alt="EPM Staffing Services"
                  style={{ width: 58, height: 58, objectFit: "contain", display: "block" }}
                  crossOrigin="anonymous"
                />
              </td>

              {/* Company name + tagline cell */}
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: 18,
                    color: "#c2410c",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    lineHeight: 1.2,
                    margin: 0,
                    fontFamily: "inherit",
                  }}
                >
                  EPM Staffing Services (OPC) Pvt. Ltd.
                </div>
                <div
                  style={{
                    fontStyle: "italic",
                    fontWeight: 700,
                    fontSize: 12,
                    color: "#334155",
                    marginTop: 3,
                    fontFamily: "inherit",
                  }}
                >
                  Talent Delivered
                </div>
              </td>

              {/* Contact info cell — fixed 192px, word-break for long email */}
              <td
                style={{
                  textAlign: "right",
                  verticalAlign: "middle",
                  fontSize: 9.5,
                  lineHeight: 1.8,
                  color: "#1e293b",
                  wordBreak: "break-all",
                  overflowWrap: "break-word",
                }}
              >
                <div style={{ whiteSpace: "nowrap" }}>
                  &#9990;&nbsp;+91 9862279597
                </div>
                <div>&#9993;&nbsp;admin@epmstaffingservices.com</div>
                <div>&#9993;&nbsp;careerepmstaffingservices@gmail.com</div>
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      {/* ── Gradient rule ── */}
      <div className="h-0.5 bg-linear-to-r from-orange-500 via-amber-400 to-orange-500" />

      {/* ── Address strip ── */}
      <div
        className="px-8 py-1 text-slate-700"
        style={{ fontSize: 9.5, lineHeight: 1.7 }}
      >
        <span>Imphal, Manipur &#8211; 795001</span>
        <span className="mx-3 text-slate-400">|</span>
        <span>CIN: U78100MN2025OPC015365</span>
        <span className="mx-3 text-slate-400">|</span>
        <span>
          Website:{" "}
          <span className="underline" style={{ color: "#1d4ed8" }}>
            https://www.epmss.in/
          </span>{" "}
          <span className="underline" style={{ color: "#1d4ed8" }}>
            www.epmstaffingservices.com
          </span>
        </span>
      </div>

      {/* ── Thin rule ── */}
      <div className="mx-8 border-t border-slate-200" />

      {/* ── Document Title ── */}
      <div className="text-center my-2">
        <h2
          className="inline-block underline font-black tracking-wider text-slate-900"
          style={{ fontSize: 13.5 }}
        >
          COMMERCIAL EMPANELMENT AGREEMENT
        </h2>
      </div>

      {/* ── Parties ── */}
      <div
        className="px-8 text-slate-900 text-justify"
        style={{ fontSize: 11, lineHeight: 1.6 }}
      >
        <p className="mb-1">
          This Company Empanelment Agreement is made and executed on{" "}
          <strong className="underline">{d.agreementDate}</strong>
        </p>

        <p className="font-bold text-center mb-1">BY AND BETWEEN</p>

        <p className="mb-1">
          <strong>EPM Staffing Services (OPC) Private Limited</strong>,
          incorporated under the provisions of the Companies Act, 2013 (as
          applicable), having its registered office at Imphal West, Imphal,
          Manipur, India &#8211; 795001, hereinafter referred to as the{" "}
          <strong>&quot;Staffing Agency&quot;</strong>.
        </p>

        <p className="font-bold text-center mb-1">AND</p>

        <p className="mb-1">
          (<strong className="underline">{d.clientCompanyName}</strong>), a
          company, having its registered office at (
          <span className="underline">{d.clientAddress}</span>), hereinafter
          referred to as the <strong>&quot;Client&quot;</strong>.{" "}
          <strong>EPM Staffing Services (OPC) Private Limited</strong> and (
          <strong className="underline">{d.clientCompanyName}</strong>) shall
          collectively be referred to as the{" "}
          <strong>&quot;Parties&quot;</strong> and individually as a{" "}
          <strong>&quot;Party.&quot;</strong>
        </p>

        <div className="text-center my-2">
          <span
            className="inline-block border-b border-slate-700"
            style={{ width: 120 }}
          />
        </div>
      </div>

      {/* ── Sections ── */}
      <div className="px-8 pb-2">
        {/* Candidate Sharing & Process */}
        <SectionHeading>Candidate Sharing &amp; Process</SectionHeading>
        <BulletList
          items={[
            <>
              <strong>EPM Staffing Services (OPC) Private Limited</strong> will
              share candidate profiles without contact details initially.
            </>,
            "Contact details are provided only after the candidate is shortlisted by the client.",
          ]}
        />

        {/* Fees & Payment */}
        <SectionHeading>Fees &amp; Payment</SectionHeading>
        <BulletList
          items={[
            <>
              A one-time professional fee (
              <strong className="underline">{feeLabel} of annual CTC</strong>,
              with or without GST as per applicable) shall be payable after 60
              days from the candidate&apos;s date of joining, subject to the
              fulfilment of the service.
            </>,
            <>
              <strong>Candidate ownership:</strong> The fee applies even if the
              candidate is hired within {d.coolingPeriodMonths} months of
              referral, directly or indirectly.
            </>,
            <>
              Invoice will be issued after 60 days of candidate confirmation;
              payment is due within {d.paymentDueDays} days.
            </>,
            <strong>Payments must be made via net banking or UPI.</strong>,
            <>
              All payments shall be made in favour of{" "}
              <strong>EPM Staffing Services (OPC) Private Limited.</strong>
            </>,
          ]}
        />

        {/* Confirmation Clause */}
        <SectionHeading>Confirmation Clause</SectionHeading>
        <BulletList
          items={[
            <>
              The company must confirm the candidate&apos;s continuation after{" "}
              {d.confirmationDays} days.
            </>,
            "If no response is given within 7 days after that, the hire is considered successful by default.",
          ]}
        />

        {/* Replacement Guarantee */}
        <SectionHeading>Replacement Guarantee</SectionHeading>
        <BulletList
          items={[
            <>
              A {d.lockInDays} days replacement (lock-in) period is provided.
            </>,
          ]}
        />

        {/* Non-Payment Consequences */}
        <SectionHeading>Non-Payment Consequences</SectionHeading>
        <p
          className="ea-serif text-slate-800 mb-1"
          style={{ fontSize: 11, lineHeight: 1.6 }}
        >
          If payment remains outstanding beyond 30 days from the date of invoice
          issued, the Agency reserves the right to:
        </p>
        <BulletList
          items={[
            "Suspend its services;",
            "Discontinue the sharing of candidate profiles; and",
            "Initiate legal recovery proceedings for the outstanding dues.",
          ]}
        />

        {/* Legal & Dispute Terms */}
        <SectionHeading>Legal &amp; Dispute Terms</SectionHeading>
        <BulletList
          items={[
            "Initiate Legal Recovery Proceedings under the Arbitration and Conciliation Act, 1996 of Indian law.",
            <>
              Disputes are settled via arbitration in {d.arbitrationCity} (in
              English).
            </>,
          ]}
        />

        {/* Duration & Termination */}
        <SectionHeading>Duration &amp; Termination</SectionHeading>
        <BulletList
          items={[
            <>The agreement is valid for {d.contractYears} years.</>,
            "Any changes must be agreed in writing.",
          ]}
        />
      </div>

      {/* ── Signature divider ── */}
      <div className="mx-8 border-t-2 border-slate-300 mt-1" />

      {/* ── Signature Block ── */}
      <div className="flex px-8 pt-3 pb-5 gap-6">
        {/* LEFT — Proposed (EPM / Admin) */}
        <div className="w-[45%]">
          <p
            className="font-bold ea-serif text-slate-900 mb-2"
            style={{ fontSize: 11.5 }}
          >
            Proposed:
          </p>

          {/* Signature box */}
          <div
            className="flex items-center justify-center text-slate-400 font-sans mb-2"
            style={{
              width: 128,
              height: 44,
              border: "1px dashed #94a3b8",
              fontSize: 9,
            }}
          >
            Signature
          </div>

          <p
            className="font-bold ea-serif text-slate-900"
            style={{ fontSize: 11 }}
          >
            ({d.directorName})
          </p>
          <p className="ea-serif text-slate-800" style={{ fontSize: 11 }}>
            Director
          </p>
          <p
            className="font-bold ea-serif text-slate-900"
            style={{ fontSize: 11 }}
          >
            EPM Staffing Services (OPC) Pvt. Ltd.
          </p>
        </div>

        {/* Divider */}
        <div className="border-l border-slate-200" />

        {/* RIGHT — Accepted (Client) */}
        <div className="flex-1">
          <p
            className="font-bold ea-serif text-slate-900 mb-3"
            style={{ fontSize: 11.5 }}
          >
            Accepted:
          </p>

          <SignatureField label="Signature:" />
          <SignatureField label="Name of the Competent Authority:" />
          <SignatureField label="Current Designation:" />

          {/* Stamp */}
          <p
            className="ea-serif text-slate-800 mb-1"
            style={{ fontSize: 11 }}
          >
            Stamp:
          </p>
          <div
            className="flex items-center justify-center text-slate-400 font-sans"
            style={{
              width: 96,
              height: 80,
              border: "1px dashed #94a3b8",
              fontSize: 9,
            }}
          >
            Company Stamp
          </div>
        </div>
      </div>

      {/* ── Bottom accent bar ── */}
      <div className="h-1.5 bg-linear-to-r from-orange-600 via-amber-400 to-orange-600" />
    </div>
  );
}
