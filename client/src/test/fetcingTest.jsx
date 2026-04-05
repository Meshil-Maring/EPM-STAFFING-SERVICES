// components/FetchButton.jsx

import React, { useState } from "react";
import {
  getClientManagementData,
  updatefollowClient,
  updateListJob,
  saveCandidates,
  submitCandidates,
  deleteClient,
} from "../Components/layouts/Admin/AdminClientManagement/end-point-function/client_management";

const FetchButton = ({ label = "Fetch Data" }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      const res = await submitCandidates(
        true,
        "352550c0-d299-469c-9ed6-93cbaa0a9186",
        "dsmeshil@gmail.com",
        "82234322341",
        "imphal",
        "full-time",
        38,
        20,
        "female",
        "2025-05-01",
        "https:/linkedin",
        33,
        "description",
      );

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
