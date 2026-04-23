import React from "react";

function SectionThree() {
  return (
    <section className="mb-4 w-full flex items-center flex-col justify-start">
      <h3 className="font-bold">3. Hiring Confirmation</h3>
      <div className="w-full flex flex-col">
        <p>
          <strong>3.1</strong> Outstation candidates called for interviews shall
          be reimbursed directly by the Client.
        </p>
        <p>
          <strong>3.2</strong> The Client agrees to pay the professional charges
          for any candidate referred by the Staffing Agency, even if such
          candidate is hired directly or indirectly by the Client within 6 (six)
          months from the date of first reference{" "}
          <span className="font-bold">(CV cooling period of 6 months).</span>
        </p>
        <p>
          <strong>3.3</strong> The Client shall confirm the continuation of the
          recruited candidate after 30 days from the date of joining.
        </p>
      </div>
    </section>
  );
}

export default SectionThree;
