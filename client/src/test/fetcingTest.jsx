// components/FetchButton.jsx

import React, { useState } from "react";
import {
  getClientManagementData,
  updatefollowClient,
  updateListJob,
  saveClients,
  submitCandidates,
  saveEditJob,
  deleteClient,
} from "../Components/layouts/Admin/AdminClientManagement/end-point-function/client_management";

const FetchButton = ({ label = "Fetch Data" }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      const res = await saveEditJob(
        "f8ac7f8c-d385-478e-a499-591cb28e67b6",
        true,
        true,
        "Google",
        "full-time",
        3,
        4,
        "3",
        33,
        "2028-08-08 18:30:00",
        "This is new job",
        "Imphal",
        { 0: "Hello", 1: "Hii" },
        { 0: "Hello", 1: "Hii" },
        { 0: "Hello", 1: "Hii" },
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
