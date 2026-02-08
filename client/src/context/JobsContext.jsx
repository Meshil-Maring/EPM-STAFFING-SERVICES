import React, { useState, createContext, useEffect } from "react";
import jobsData from "../Components/dummy_data_structures/Jobs.json";

export const Jobs_context = createContext(null);

function JobsContext({ children }) {
  const [jobs, setJobs] = useState({});

  useEffect(() => {
    // Load jobs from JSON file
    setJobs(jobsData);
  }, []);

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
