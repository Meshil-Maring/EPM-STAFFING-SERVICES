// components/FetchButton.jsx

import React, { useState } from "react";
<<<<<<< HEAD
// import { fetchAllUsersInfoService } from "../services/user.service";
import {
  getByIdService,
  getByUserIdService,
} from "../services/dynamic.service";
import { getAllJobs } from "../utils/function_utility/jobs.utility";
=======
import {
  getClientManagementData,
  updatefollowClient,
} from "../Components/layouts/Admin/AdminClientManagement/end-point-function/client_management";
>>>>>>> 7125c163a6437d966dba5df6986dd92181e3352a

const FetchButton = ({ label = "Fetch Data" }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

<<<<<<< HEAD
      // const res = await fetchAllUsersInfoService(1);
      const jobs = await getAllJobs();
      jobs;
=======
      // Your fetching data try here
      const res = await updatefollowClient(
        "0755b375-7bd4-4583-96d8-605d640e2cd9",
        "98ca40ea-c3dd-43f2-b290-c500bf211bcd",
        true,
      );

      console.log(res);
>>>>>>> 7125c163a6437d966dba5df6986dd92181e3352a
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
