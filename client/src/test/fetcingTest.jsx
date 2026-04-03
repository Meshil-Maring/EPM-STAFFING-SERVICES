// components/FetchButton.jsx

import React, { useState } from "react";
import {
  getClientManagementData,
  updatefollowClient,
} from "../Components/layouts/Admin/AdminClientManagement/end-point-function/client_management";

const FetchButton = ({ label = "Fetch Data" }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      // Your fetching data try here
      const res = await getClientManagementData(1);

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
