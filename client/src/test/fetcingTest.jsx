// components/FetchButton.jsx

import React, { useState } from "react";
import {
  getClientManagementData,
  updatefollowClient,
  updateListJob,
  saveCandidates,
  deleteClient,
} from "../Components/layouts/Admin/AdminClientManagement/end-point-function/client_management";

const FetchButton = ({ label = "Fetch Data" }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      const res = await saveCandidates(
        "0755b375-7bd4-4583-96d8-605d640e2cd9",
        "India",
        "India",
        "India",
        "India",
        "India",
        "India",
        "India",
        "India",
        "738372",
      );

      console.log(res.data);
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
