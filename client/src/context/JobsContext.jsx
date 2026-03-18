/**
 * JobsContext - Context provider for job-related state management
 *
 * This context manages all job data operations including CRUD operations,
 * filtering, searching, and statistics. It uses sessionStorage for persistence
 * and provides a comprehensive API for interacting with job data throughout
 * the application.
 */

import React, { useState, createContext, useEffect } from "react";
import jobsData from "../Components/dummy_data_structures/Jobs.json";
import generateJobId from "../utils/generateJobId";

// Create the context with default null value
export const Jobs_context = createContext(null);

/**
 * JobsContext Provider component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 * @returns {JSX.Element} Context provider with job management functionality
 */
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

  /**
   * Get all jobs from the current state
   * @returns {Object} All jobs data
   */
  const getAllJobs = () => jobs;

  /**
   * Get a specific job by its ID
   * @param {string} jobId - The unique identifier of the job
   * @returns {Object|null} Job object if found, null otherwise
   */
  const getJobById = (jobId) => jobs[jobId] || null;

  /**
   * Get all jobs belonging to a specific company
   * @param {string} companyId - The company ID to filter by
   * @returns {Object} Jobs belonging to the specified company
   */
  const getJobsByCompanyId = (companyId) => {
    const result = {};
    Object.entries(jobs).forEach(([id, job]) => {
      if (job["company id"] === companyId) {
        result[id] = job;
      }
    });
    return result;
  };

  /**
   * Get jobs filtered by status (Active/InActive)
   * @param {string} status - The status to filter by
   * @returns {Object} Jobs with the specified status
   */
  const getJobsByStatus = (status) => {
    const result = {};
    Object.entries(jobs).forEach(([id, job]) => {
      if (job.status === status) {
        result[id] = job;
      }
    });
    return result;
  };

  /**
   * Get jobs filtered by contract type
   * @param {string} contractType - The contract type to filter by
   * @returns {Object} Jobs with the specified contract type
   */
  const getJobsByContractType = (contractType) => {
    const result = {};
    Object.entries(jobs).forEach(([id, job]) => {
      if (job["contract type"] === contractType) {
        result[id] = job;
      }
    });
    return result;
  };

  /**
   * Get jobs filtered by location
   * @param {string} location - The location to filter by
   * @returns {Object} Jobs in the specified location
   */
  const getJobsByLocation = (location) => {
    const result = {};
    Object.entries(jobs).forEach(([id, job]) => {
      if (job.location === location) {
        result[id] = job;
      }
    });
    return result;
  };

  /**
   * Get jobs filtered by required experience level
   * @param {string} experience - The experience level to filter by
   * @returns {Object} Jobs requiring the specified experience level
   */
  const getJobsByExperience = (experience) => {
    const result = {};
    Object.entries(jobs).forEach(([id, job]) => {
      if (job["experience required"] === experience) {
        result[id] = job;
      }
    });
    return result;
  };

  /**
   * Get all priority jobs (jobs marked as priority)
   * @returns {Object} Jobs marked as priority
   */
  const getPriorityJobs = () => {
    const result = {};
    Object.entries(jobs).forEach(([id, job]) => {
      if (job.priority) {
        result[id] = job;
      }
    });
    return result;
  };

  /**
   * Update an entire job object
   * @param {string} jobId - The ID of the job to update
   * @param {Object} updatedJob - The updated job data
   */
  const updateJob = (jobId, updatedJob) => {
    setJobs((prevJobs) => ({
      ...prevJobs,
      [jobId]: {
        ...prevJobs[jobId],
        ...updatedJob,
      },
    }));
  };

  /**
   * Update a specific field of a job
   * @param {string} jobId - The ID of the job to update
   * @param {string} field - The field name to update
   * @param {any} value - The new value for the field
   */
  const updateJobField = (jobId, field, value) => {
    setJobs((prevJobs) => ({
      ...prevJobs,
      [jobId]: {
        ...prevJobs[jobId],
        [field]: value,
      },
    }));
  };

  /**
   * Add a new job to the collection
   * @param {Object} newJob - The new job data to add
   */
  const addJob = (newJob) => {
    const comp_id = sessionStorage.getItem("logged_user_id");
    const newJobId = generateJobId(comp_id);
    setJobs((prevJobs) => ({
      ...prevJobs,
      [newJobId]: newJob,
    }));
  };

  /**
   * Delete a job from the collection
   * @param {string} jobId - The ID of the job to delete
   */
  const deleteJob = (jobId) => {
    setJobs((prev) => {
      const { [jobId]: deleted, ...rest } = prev;
      return rest;
    });
  };

  /**
   * Perform bulk updates on multiple jobs at once
   * @param {Object} updatesMap - Object mapping job IDs to their updates
   */
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

  /**
   * Toggle the priority status of a job
   * @param {string} jobId - The ID of the job to toggle
   */
  const toggleJobPriority = (jobId) => {
    setJobs((prevJobs) => ({
      ...prevJobs,
      [jobId]: {
        ...prevJobs[jobId],
        priority: !prevJobs[jobId].priority,
      },
    }));
  };

  /**
   * Update the status of a job (Active/InActive)
   * @param {string} jobId - The ID of the job to update
   * @param {string} status - The new status value
   */
  const updateJobStatus = (jobId, status) => {
    setJobs((prevJobs) => ({
      ...prevJobs,
      [jobId]: {
        ...prevJobs[jobId],
        status: status,
      },
    }));
  };

  /**
   * Add a requirement to a job's requirements list
   * @param {string} jobId - The ID of the job
   * @param {string} requirement - The requirement to add
   */
  const addJobRequirement = (jobId, requirement) => {
    setJobs((prevJobs) => ({
      ...prevJobs,
      [jobId]: {
        ...prevJobs[jobId],
        requirements: [...(prevJobs[jobId].requirements || []), requirement],
      },
    }));
  };

  /**
   * Remove a requirement from a job's requirements list
   * @param {string} jobId - The ID of the job
   * @param {string} requirement - The requirement to remove
   */
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

  /**
   * Add a responsibility to a job's responsibilities list
   * @param {string} jobId - The ID of the job
   * @param {string} responsibility - The responsibility to add
   */
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

  /**
   * Remove a responsibility from a job's responsibilities list
   * @param {string} jobId - The ID of the job
   * @param {string} responsibility - The responsibility to remove
   */
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

  /**
   * Search jobs by title or description
   * @param {string} searchTerm - The term to search for
   * @returns {Object} Jobs matching the search term
   */
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

  /**
   * Get comprehensive statistics about jobs
   * @returns {Object} Statistics including counts by status, type, location, etc.
   */
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
