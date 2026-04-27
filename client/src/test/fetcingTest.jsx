// components/FetchButton.jsx

import React, { useState } from "react";
import {
  getClientManagementData,
  updateFollowClient,
  updateListJob,
  saveClients,
  deleteClient,
  submitCandidates,
} from "../Components/layouts/Admin/AdminClientManagement/end-point-function/client_management";

import { getCandidateInfo } from "../Components/layouts/Admin/SubmittedCondidates/end-point-function/submitted_candidates";

import { getListedJobWithPage } from "../Components/layouts/Admin/ListedJobs/end-point-function/listed_job";
import { getJobOverviewInfo } from "../Components/layouts/common_function/job_overview";

const FetchButton = ({ label = "Fetch Data" }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      const res = await getJobOverviewInfo(
        "ebfcf88f-8734-4b57-addb-3d9dc0f8e961",
        1,
      );
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
