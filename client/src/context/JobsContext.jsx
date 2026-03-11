import React, { useState, createContext, useEffect } from "react";
import jobsData from "../Components/dummy_data_structures/Jobs.json";
import generateJobId from "../utils/generateJobId";

export const Jobs_context = createContext(null);

function JobsContext({ children }) {
  // Initialize state by parsing the string from sessionStorage
  const [jobs, setJobs] = useState(() => {
    const savedJobs = sessionStorage.getItem("jobs");
    // If sessionStorage is empty, use the imported JSON data, otherwise parse saved data
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
    if (jobs && typeof jobs === "object") {
      sessionStorage.setItem("jobs", JSON.stringify(jobs));
    }
  }, [jobs]);

  // Get all jobs
  const getAllJobs = () => jobs;

  // Get job by ID
  const getJobById = (jobId) => jobs[jobId] || null;

  // Get jobs by company ID
  const getJobsByCompanyId = (companyId) => {
    const result = {};
    Object.entries(jobs).forEach(([id, job]) => {
      if (job["company id"] === companyId) {
        result[id] = job;
      }
    });
    return result;
  };

  // Get jobs by status
  const getJobsByStatus = (status) => {
    const result = {};
    Object.entries(jobs).forEach(([id, job]) => {
      if (job.status === status) {
        result[id] = job;
      }
    });
    return result;
  };

  // Get jobs by contract type
  const getJobsByContractType = (contractType) => {
    const result = {};
    Object.entries(jobs).forEach(([id, job]) => {
      if (job["contract type"] === contractType) {
        result[id] = job;
      }
    });
    return result;
  };

  // Get jobs by location
  const getJobsByLocation = (location) => {
    const result = {};
    Object.entries(jobs).forEach(([id, job]) => {
      if (job.location === location) {
        result[id] = job;
      }
    });
    return result;
  };

  // Get jobs by experience level
  const getJobsByExperience = (experience) => {
    const result = {};
    Object.entries(jobs).forEach(([id, job]) => {
      if (job["experience required"] === experience) {
        result[id] = job;
      }
    });
    return result;
  };

  // Get priority jobs
  const getPriorityJobs = () => {
    const result = {};
    Object.entries(jobs).forEach(([id, job]) => {
      if (job.priority) {
        result[id] = job;
      }
    });
    return result;
  };

  // Update entire job
  const updateJob = (jobId, updatedJob) => {
    setJobs((prevJobs) => ({
      ...prevJobs,
      [jobId]: {
        ...prevJobs[jobId],
        ...updatedJob,
      },
    }));
  };

  // Update specific field of a job
  const updateJobField = (jobId, field, value) => {
    setJobs((prevJobs) => ({
      ...prevJobs,
      [jobId]: {
        ...prevJobs[jobId],
        [field]: value,
      },
    }));
  };

  // Add new job
  const addJob = (newJob) => {
    const comp_id = sessionStorage.getItem("logged_user_id");
    const newJobId = generateJobId(comp_id);
    setJobs((prevJobs) => ({
      ...prevJobs,
      [newJobId]: newJob,
    }));
  };

  // Delete job
  const deleteJob = (jobId) => {
    setJobs((prev) => {
      const { [jobId]: deleted, ...rest } = prev;
      return rest;
    });
  };

  // Bulk update jobs
  const bulkUpdateJobs = (updatesMap) => {
    setJobs((prevJobs) => {
      const updated = { ...prevJobs };
      Object.entries(updatesMap).forEach(([id, updates]) => {
        if (updated[id]) {
          updated[id] = { ...updated[id], ...updates };
        }
      });
      return updated;
    });
  };

  // Toggle job priority
  const toggleJobPriority = (jobId) => {
    setJobs((prevJobs) => ({
      ...prevJobs,
      [jobId]: {
        ...prevJobs[jobId],
        priority: !prevJobs[jobId].priority,
      },
    }));
  };

  // Update job status
  const updateJobStatus = (jobId, status) => {
    setJobs((prevJobs) => ({
      ...prevJobs,
      [jobId]: {
        ...prevJobs[jobId],
        status: status,
      },
    }));
  };

  // Add requirement to job
  const addJobRequirement = (jobId, requirement) => {
    setJobs((prevJobs) => ({
      ...prevJobs,
      [jobId]: {
        ...prevJobs[jobId],
        requirements: [...(prevJobs[jobId].requirements || []), requirement],
      },
    }));
  };

  // Remove requirement from job
  const removeJobRequirement = (jobId, requirement) => {
    setJobs((prevJobs) => ({
      ...prevJobs,
      [jobId]: {
        ...prevJobs[jobId],
        requirements: (prevJobs[jobId].requirements || []).filter(
          (req) => req !== requirement,
        ),
      },
    }));
  };

  // Add responsibility to job
  const addJobResponsibility = (jobId, responsibility) => {
    setJobs((prevJobs) => ({
      ...prevJobs,
      [jobId]: {
        ...prevJobs[jobId],
        responsibilities: [
          ...(prevJobs[jobId].responsibilities || []),
          responsibility,
        ],
      },
    }));
  };

  // Remove responsibility from job
  const removeJobResponsibility = (jobId, responsibility) => {
    setJobs((prevJobs) => ({
      ...prevJobs,
      [jobId]: {
        ...prevJobs[jobId],
        responsibilities: (prevJobs[jobId].responsibilities || []).filter(
          (resp) => resp !== responsibility,
        ),
      },
    }));
  };

  // Search jobs by title or description
  const searchJobs = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    const result = {};
    Object.entries(jobs).forEach(([id, job]) => {
      const matches =
        job["job title"].toLowerCase().includes(term) ||
        job["job description"].toLowerCase().includes(term);
      if (matches) {
        result[id] = job;
      }
    });
    return result;
  };

  // Get job statistics
  const getJobStats = () => {
    const stats = {
      total: Object.keys(jobs).length,
      active: 0,
      inactive: 0,
      priority: 0,
      contractTypes: {},
      locations: {},
      experienceLevels: {},
    };

    Object.values(jobs).forEach((job) => {
      // Count by status
      if (job.status === "Active") stats.active++;
      else if (job.status === "InActive") stats.inactive++;

      // Count by priority
      if (job.priority) stats.priority++;

      // Count by contract type
      const contractType = job["contract type"] || "Unknown";
      stats.contractTypes[contractType] =
        (stats.contractTypes[contractType] || 0) + 1;

      // Count by location
      const location = job.location || "Unknown";
      stats.locations[location] = (stats.locations[location] || 0) + 1;

      // Count by experience level
      const experience = job["experience required"] || "Unknown";
      stats.experienceLevels[experience] =
        (stats.experienceLevels[experience] || 0) + 1;
    });

    return stats;
  };

  return (
    <Jobs_context.Provider
      value={{
        // Data access methods
        jobs,
        getAllJobs,
        getJobById,
        getJobsByCompanyId,
        getJobsByStatus,
        getJobsByContractType,
        getJobsByLocation,
        getJobsByExperience,
        getPriorityJobs,
        searchJobs,
        getJobStats,

        // CRUD operations
        updateJob,
        updateJobField,
        addJob,
        deleteJob,
        bulkUpdateJobs,

        // Specialized operations
        toggleJobPriority,
        updateJobStatus,
        addJobRequirement,
        removeJobRequirement,
        addJobResponsibility,
        removeJobResponsibility,
      }}
    >
      {children}
    </Jobs_context.Provider>
  );
}

export default JobsContext;
