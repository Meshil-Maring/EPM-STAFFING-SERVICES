import React, { useContext, useState } from "react";
import { Jobs_context } from "../../../../context/JobsContext";
import { Company_context } from "../../../../context/AccountsContext";
import CandidateCard from "./CandidateCard";
import ViewDetailsOverlay from "./ViewDetailsOverlay";

/**
 * CandidatesContainer component - Container for displaying candidate or job cards
 * @param {Object} props - Component props
 * @param {Object} props.filteredData - Filtered data to display
 * @param {Function} props.updateCandidate - Function to update candidate data
 * @param {Function} props.deleteCandidate - Function to delete candidate data
 * @param {Function} props.updateJob - Function to update job data
 * @param {Function} props.deleteJob - Function to delete job data
 * @param {boolean} props.isListed_jobs - Flag indicating if we're in listed_jobs view
 * @returns {JSX.Element} Rendered candidates container component
 */
function CandidatesContainer({
  filteredData,
  updateCandidate,
  deleteCandidate,
  deleteJob,
  isListed_jobs = false,
}) {
  // Get jobs context for accessing job data
  const { jobs } = useContext(Jobs_context);
  // Get company context for accessing company data
  const { company_accounts } = useContext(Company_context);
  console.log(jobs);

  // Icon definitions for consistent styling
  const icons = {
    location: "ri-map-pin-line",
    suitcase: "ri-suitcase-line",
    eye: "ri-eye-line",
    eye_off: "ri-eye-off-line",
    calendar: "ri-calendar-line",
    user_edit: "ri-user-line",
  };

  // State for selected company data
  const [l_company, set_l_company] = useState(null);
  // State for selected job data
  const [l_currentJob, set_l_currentJob] = useState(null);

  // Get data keys for iteration
  const data_keys = Object.keys(filteredData);
  // State for view details modal
  const [viewDetails, setViewDetails] = useState(false);

  /**
   * Handle view details action
   * @param {Object} company - Selected company data
   * @param {Object} currentJob - Selected job data
   */
  const handleViewDetails = (currentJob) => {
    setViewDetails((prev) => !prev);
    set_l_company(company_accounts[currentJob["compnay_id"]]);
    set_l_currentJob(currentJob);
  };

  return (
    <section className="w-full grid grid-cols-2 items-center justify-start gap-6 p-8 bg-lighter rounded-small">
      {data_keys.map((key) => (
        <CandidateCard
          key={key}
          handleViewDetails={handleViewDetails}
          data_key={key}
          data={filteredData[key]}
          jobs={jobs}
          company_accounts={company_accounts}
          icons={icons}
          updateCandidate={updateCandidate}
          deleteCandidate={deleteCandidate}
          deleteJob={deleteJob}
          isListed_jobs={isListed_jobs}
        />
      ))}
      {/* View details overlay for company or candidate information */}
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
