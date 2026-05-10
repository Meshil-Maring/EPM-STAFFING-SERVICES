// components/FetchButton.jsx

import React, { useState } from "react";
import {
  getClientManagementData,
  updateFollowClient,
  updateListJob,
  saveClients,
  deleteClient,
} from "../features/candidates/services/clientManagement.service";
import { searchCandidateService as searchCandidate, submitCandidateService as submitCandidates } from "../features/candidates/services/candidate.service";

import { getCandidateInfo } from "../features/candidates/services/submittedCandidates.service";

import { getListedJobWithPage } from "../features/jobs/services/listedJobs.service";
import { getJobOverviewInfo } from "../shared/utils/job_overview";

const FetchButton = ({ label = "Fetch Data" }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      const res = await searchCandidate("Meshil");

      console.log(res);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
    px-5 py-2 rounded-lg font-medium
    transition-all duration-200
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 active:scale-95"
    }
    text-white shadow-md hover:shadow-lg
  `}
    >
      {loading ? "Loading..." : label}
    </button>
  );
};

export default FetchButton;
