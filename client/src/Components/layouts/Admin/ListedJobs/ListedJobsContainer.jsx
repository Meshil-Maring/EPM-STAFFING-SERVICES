import React, { useContext, useState } from "react";
import { Jobs_context } from "../../../../context/JobsContext";
import { Company_context } from "../../../../context/AccountsContext";
import { Candidates_context } from "../../../../context/CandidatesContext";
import ListedJobCard from "./ListedJobCard";
import ViewJobDetailsOverlay from "./ViewJobDetailsOverlay";

function ListedJobsContainer({ filterdJobs }) {
  const { jobs } = useContext(Jobs_context);
  const { company_accounts } = useContext(Company_context);
  const { candidates } = useContext(Candidates_context);

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

  const job_keys = Object.keys(filterdJobs);
  const [viewDetails, setViewDetails] = useState(false);
  const handleViewDetails = (company, currentJob) => {
    setViewDetails((prev) => !prev);
    set_l_company(company);
    set_l_currentJob(currentJob);
  };

  return (
    <section className="w-full grid grid-cols-2 items-center justify-start gap-6 p-8 bg-lighter rounded-small">
      {job_keys.map((key) => (
        <ListedJobCard
          key={key}
          handleViewDetails={handleViewDetails}
          jobKey={key}
          job={filterdJobs[key]}
          jobs={jobs}
          company_accounts={company_accounts}
          candidates={candidates}
          icons={icons}
        />
      ))}
      {/* view job details overlay with candidate information */}
      {viewDetails && (
        <ViewJobDetailsOverlay
          currentJob={l_currentJob}
          company={l_company}
          setClosing={setViewDetails}
        />
      )}
    </section>
  );
}

export default ListedJobsContainer;
