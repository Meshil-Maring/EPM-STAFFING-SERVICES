import React, { useContext, useState } from "react";
import { Jobs_context } from "../../../../context/JobsContext";
import { Company_context } from "../../../../context/AccountsContext";
import CandidateCard from "./CandidateCard";
import ViewDetailsOverlay from "./ViewDetailsOverlay";

function CandidatesContainer({
  filterdCandidates,
  updateCandidate,
  deleteCandidate,
}) {
  const { jobs } = useContext(Jobs_context);
  const { companyAccounts } = useContext(Company_context);

  const icons = {
    location: "ri-map-pin-line",
    suitcase: "ri-suitcase-line",
    eye: "ri-eye-line",
    eye_off: "ri-eye-off-line",
    calendar: "ri-calendar-line",
    user_edit: "ri-user-line",
  };

  const [l_company, set_l_company] = useState(null);
  const [l_currentJob, set_l_currentJob] = useState(null);

  const cand_keys = Object.keys(filterdCandidates);
  const [viewDetails, setViewDetails] = useState(false);
  const handleViewDetails = (company, currentJob) => {
    setViewDetails((prev) => !prev);
    set_l_company(company);
    set_l_currentJob(currentJob);
  };

  return (
    <section className="w-full grid grid-cols-2 items-center justify-center gap-6 p-8 bg-lighter rounded-small">
      {cand_keys.map((key) => (
        <CandidateCard
          key={key}
          handleViewDetails={handleViewDetails}
          candKey={key}
          candidate={filterdCandidates[key]}
          jobs={jobs}
          companyAccounts={companyAccounts}
          icons={icons}
          updateCandidate={updateCandidate}
          deleteCandidate={deleteCandidate}
        />
      ))}
      {/* view company details overlay not candidate details */}
      {viewDetails && (
        <ViewDetailsOverlay
          currentJob={l_currentJob}
          company={l_company}
          setClosing={setViewDetails}
        />
      )}
    </section>
  );
}

export default CandidatesContainer;
