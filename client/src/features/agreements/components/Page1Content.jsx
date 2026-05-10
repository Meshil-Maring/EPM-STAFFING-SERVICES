import {
  Section,
  SectionDivider,
  SectionHeading,
  BodyText,
  Underlined,
  BulletItem,
} from "./components";

export default function Page1Content({ d, feeLabel, gstNote }) {
  return (
    <>
      <Section>
        <BodyText>
          This Company Empanelment Agreement is made and executed on{" "}
          <Underlined>{d.agreementDate}</Underlined>
        </BodyText>
        <BodyText className="text-center font-bold">BY AND BETWEEN</BodyText>
        <BodyText className="text-center font-bold">AND</BodyText>
        <BodyText>
          (
          <Underlined>
            <strong>{d.clientCompanyName}</strong>
          </Underlined>
          ), a company, having its registered office at (
          <Underlined>{d.clientAddress}</Underlined>), hereinafter referred to
          as the <strong>"Client"</strong>.
        </BodyText>
        <BodyText>
          <strong>EPM Staffing Services (OPC) Private Limited</strong> and (
          <Underlined>
            <strong>{d.clientCompanyName}</strong>
          </Underlined>
          ) shall collectively be referred to as the <strong>"Parties"</strong>{" "}
          and individually as a <strong>"Party."</strong>
        </BodyText>
      </Section>

      <SectionDivider />

      <SectionHeading>
        1. Job Requirement Sharing &amp; Candidate Submission
      </SectionHeading>
      <Section>
        <BodyText>
          <strong>1.1</strong> The Client shall share its job requirements with
          the Staffing Agency. In response, the Staffing Agency shall source and
          submit qualified candidates to fulfil staffing needs across various
          roles.
        </BodyText>
        <BodyText>
          <strong>1.2</strong> The Staffing Agency shall follow a process
          focused on quality, efficiency, and timeliness, ensuring the delivery
          of candidates aligned with the Client's requirements, expectations,
          and workplace culture.
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
            coordinated through the Staffing Agency. Candidate contact details
            may be shared only for recruitment-related communication.
          </BulletItem>
        </ul>
      </Section>

      <SectionDivider />

      <SectionHeading>3. Hiring Confirmation</SectionHeading>
      <Section>
        <BodyText>
          <strong>3.1</strong> Outstation candidates called for interviews shall
          be reimbursed directly by the Client.
        </BodyText>
        <BodyText>
          <strong>3.2</strong> The Client agrees to pay the professional charges
          for any candidate referred by the Staffing Agency, even if such
          candidate is hired directly or indirectly by the Client within{" "}
          <strong>{d.coolingPeriodMonths} (six) months</strong> from the date of
          first reference{" "}
          <strong>
            (CV cooling period of {d.coolingPeriodMonths} months).
          </strong>
        </BodyText>
        <BodyText>
          <strong>3.3</strong> The Client shall confirm the continuation of the
          recruited candidate after {d.confirmationDays} days from the date of
          joining.
        </BodyText>
        <BodyText>
          <strong>3.4</strong> In the absence of any communication within 7
          (seven) days after completion of {d.confirmationDays} days, the
          placement shall be deemed successful.
        </BodyText>
      </Section>

      <SectionDivider />

      <SectionHeading>4. Payment Terms &amp; Professional Fee</SectionHeading>
      <Section>
        <BodyText>
          <strong>a.</strong> For each successful hire made by the Client of a
          candidate referred/submitted by the Staffing Agency, the Client agrees
          to pay a one-time professional fee equivalent to{" "}
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
    </>
  );
}
