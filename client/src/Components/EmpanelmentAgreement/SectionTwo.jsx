import React from "react";

function SectionTwo() {
  return (
    <section className="mb-4 w-full flex flex-col items-center justify-center">
      <h3>
        <strong>2. Candidate Submission & Interview Scheduling</strong>
      </h3>{" "}
      <ul className="list-disc w-full ml-6">
        <li>
          Candidates submitted by the Staffing Agency shall initially be shared
          without contact details.
        </li>
        <li>
          Upon shortlisting and confirmation of interest by the Client,
          interview scheduling (online/telephonic/physical) shall be coordinated
          through the Staffing Agency. Candidate contact details may be shared
          only for recruitment-related communication.
        </li>
      </ul>
    </section>
  );
}

export default SectionTwo;
