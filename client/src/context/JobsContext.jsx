import React, { useState, createContext, useEffect } from "react";
import jobsData from "../Components/dummy_data_structures/Jobs.json";

export const Jobs_context = createContext(null);

function JobsContext({ children }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Load jobs from JSON file
    setJobs(jobsData.jobs);
  }, []);

  const updateJobs = (id, newValue) => {
    setJobs((prevJobs) => {
      const updatedJobs = prevJobs.map((job) =>
        job.id === id ? { ...job, ...newValue } : job,
      );
      return updatedJobs;
    });
  };

  const addJob = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const deleteJob = (idToDelete) => {
    const filteredJobs = jobs.filter((job) => job.id !== idToDelete);
    setJobs(filteredJobs);
  };

  const getJobPostingElements = () => jobsData.job_posting_elements;
  const getDefaultRequirements = () => jobsData.default_requirements;
  const getDefaultResponsibilities = () => jobsData.default_responsibilities;
  const getDefaultBenefits = () => jobsData.default_benefits;

  return (
    <Jobs_context.Provider
      value={{
        jobs,
        updateJobs,
        addJob,
        deleteJob,
        getJobPostingElements,
        getDefaultRequirements,
        getDefaultResponsibilities,
        getDefaultBenefits,
      }}
    >
      {children}
    </Jobs_context.Provider>
  );
}

export default JobsContext;
