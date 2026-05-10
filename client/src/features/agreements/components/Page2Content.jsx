import {
  Section,
  SectionDivider,
  SectionHeading,
  BodyText,
  Underlined,
  BulletItem,
  SignatureLine,
} from "./components";
import { DEFAULTS } from "./constants";

export default function Page2Content({ d, feeLabel, gstNote }) {
  return (
    <>
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
    </>
  );
}
