import React, { useState, createContext, useEffect } from "react";
import jobsData from "../Components/dummy_data_structures/Jobs.json";

export const Jobs_context = createContext(null);

function JobsContext({ children }) {
  // Initialize state by parsing the string from sessionStorage
  const [jobs, setJobs] = useState(() => {
    const savedJobs = sessionStorage.getItem("jobs");
    // If local storage is empty, use the imported JSON data, otherwise parse saved data
    if (!savedJobs) return jobsData;
    try {
      const parsed = JSON.parse(savedJobs);
      return typeof parsed === "object" ? parsed : jobsData;
    } catch (err) {
      console.error("Failed to parse jobs from sessionStorage:", err);
      return jobsData;
    }
  });

  // Keep sessionStorage in sync whenever the 'jobs' state changes
  useEffect(() => {
    sessionStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const updateJobs = (id, updatedJob) => {
    setJobs((prevJobs) => ({
      ...prevJobs,
      [id]: {
        ...prevJobs[id],
        ...updatedJob,
      },
    }));
  };

  const addJob = (newJob) => {
    const newJobId = `job-${Date.now()}`;
    setJobs((prevJobs) => ({
      ...prevJobs,
      [newJobId]: newJob,
    }));
  };

  const deleteJob = (idToDelete) => {
    setJobs((prev) => {
      const { [idToDelete]: deletedJob, ...remainingJobs } = prev;
      return remainingJobs;
    });
  };

  return (
    <Jobs_context.Provider
      value={{
        jobs,
        updateJobs,
        addJob,
        deleteJob,
      }}
    >
      {children}
    </Jobs_context.Provider>
  );
}

export default JobsContext;
