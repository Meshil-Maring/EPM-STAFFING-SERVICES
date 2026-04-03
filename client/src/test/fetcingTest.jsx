// components/FetchButton.jsx

import React, { useState } from "react";
import {
  getClientManagementData,
  updatefollowClient,
  updateListJob,
} from "../Components/layouts/Admin/AdminClientManagement/end-point-function/client_management";

const FetchButton = ({ label = "Fetch Data" }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      // Your fetching data try here
      const res = await updateListJob(
        "352550c0-d299-469c-9ed6-93cbaa0a9186",
        "0755b375-7bd4-4583-96d8-605d640e2cd9",
        false,
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
