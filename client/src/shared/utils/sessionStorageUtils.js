/**
 * Utility functions for direct sessionStorage access
 *
 * These functions provide optimized access to data without context overhead.
 * They offer direct manipulation of sessionStorage for candidates, jobs, and
 * company accounts, enabling efficient data operations when context is not needed.
 */

/**
 * Candidates utilities
 */

/**
 * Get all candidates from sessionStorage
 * @returns {Object} All candidates data
 */
export const getCandidatesFromStorage = () => {
  try {
    const saved = sessionStorage.getItem("candidates");
    return saved ? JSON.parse(saved) : {};
  } catch (err) {
    console.error("Failed to get candidates from sessionStorage:", err);
    return {};
  }
};

/**
 * Get a specific candidate by ID from sessionStorage
 * @param {string} candidateId - The candidate ID
 * @returns {Object|null} Candidate object if found, null otherwise
 */
export const getCandidateByIdFromStorage = (candidateId) => {
  const candidates = getCandidatesFromStorage();
  return candidates[candidateId] || null;
};

/**
 * Get candidates filtered by status from sessionStorage
 * @param {string} status - The status to filter by
 * @returns {Object} Candidates with the specified status
 */
export const getCandidatesByStatusFromStorage = (status) => {
  const candidates = getCandidatesFromStorage();
  return Object.entries(candidates).reduce((acc, [id, candidate]) => {
    if (candidate.status === status) {
      acc[id] = candidate;
    }
    return acc;
  }, {});
};

/**
 * Add a new candidate to sessionStorage
 * @param {Object} newCandidate - The new candidate data
 * @returns {string} The generated candidate ID
 */
export const addCandidateToStorage = (newCandidate) => {
  const candidates = getCandidatesFromStorage();
  const newCandidateId = `cand-${Date.now()}`;
  const candidateWithDefaults = {
    status: newCandidate.status || "Pending",
    name: newCandidate.name || "Unnamed Candidate",
    "date applied":
      newCandidate["date applied"] || new Date().toLocaleDateString("en-GB"),
    ...newCandidate,
  };

  candidates[newCandidateId] = candidateWithDefaults;
  sessionStorage.setItem("candidates", JSON.stringify(candidates));
  return newCandidateId;
};

/**
 * Update a candidate in sessionStorage
 * @param {string} candidateId - The candidate ID to update
 * @param {Object} updates - The updates to apply
 * @returns {boolean} True if update was successful, false otherwise
 */
export const updateCandidateInStorage = (candidateId, updates) => {
  const candidates = getCandidatesFromStorage();
  if (candidates[candidateId]) {
    candidates[candidateId] = { ...candidates[candidateId], ...updates };
    sessionStorage.setItem("candidates", JSON.stringify(candidates));
    return true;
  }
  return false;
};

/**
 * Delete a candidate from sessionStorage
 * @param {string} candidateId - The candidate ID to delete
 * @returns {boolean} True if deletion was successful, false otherwise
 */
export const deleteCandidateFromStorage = (candidateId) => {
  const candidates = getCandidatesFromStorage();
  if (candidates[candidateId]) {
    delete candidates[candidateId];
    sessionStorage.setItem("candidates", JSON.stringify(candidates));
    return true;
  }
  return false;
};

/**
 * Jobs utilities
 */

/**
 * Get all jobs from sessionStorage
 * @returns {Object} All jobs data
 */
export const getJobsFromStorage = () => {
  try {
    const saved = sessionStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : {};
  } catch (err) {
    console.error("Failed to get jobs from sessionStorage:", err);
    return {};
  }
};

/**
 * Get a specific job by ID from sessionStorage
 * @param {string} jobId - The job ID
 * @returns {Object|null} Job object if found, null otherwise
 */
export const getJobByIdFromStorage = (jobId) => {
  const jobs = getJobsFromStorage();
  return jobs[jobId] || null;
};

/**
 * Get jobs filtered by company ID from sessionStorage
 * @param {string} companyId - The company ID to filter by
 * @returns {Object} Jobs belonging to the specified company
 */
export const getJobsByCompanyIdFromStorage = (companyId) => {
  const jobs = getJobsFromStorage();
  return Object.entries(jobs).reduce((acc, [id, job]) => {
    if (job["company id"] === companyId) {
      acc[id] = job;
    }
    return acc;
  }, {});
};

/**
 * Add a new job to sessionStorage
 * @param {Object} newJob - The new job data
 * @returns {string} The generated job ID
 */
export const addJobToStorage = (newJob) => {
  const jobs = getJobsFromStorage();
  const newJobId = `job-${Date.now()}`;
  jobs[newJobId] = newJob;
  sessionStorage.setItem("jobs", JSON.stringify(jobs));
  return newJobId;
};

/**
 * Update a job in sessionStorage
 * @param {string} jobId - The job ID to update
 * @param {Object} updates - The updates to apply
 * @returns {boolean} True if update was successful, false otherwise
 */
export const updateJobInStorage = (jobId, updates) => {
  const jobs = getJobsFromStorage();
  if (jobs[jobId]) {
    jobs[jobId] = { ...jobs[jobId], ...updates };
    sessionStorage.setItem("jobs", JSON.stringify(jobs));
    return true;
  }
  return false;
};

/**
 * Delete a job from sessionStorage
 * @param {string} jobId - The job ID to delete
 * @returns {boolean} True if deletion was successful, false otherwise
 */
export const deleteJobFromStorage = (jobId) => {
  const jobs = getJobsFromStorage();
  if (jobs[jobId]) {
    delete jobs[jobId];
    sessionStorage.setItem("jobs", JSON.stringify(jobs));
    return true;
  }
  return false;
};

/**
 * Company accounts utilities
 */

/**
 * Get all company accounts from sessionStorage
 * @returns {Object} All company accounts data
 */
export const getCompaniesFromStorage = () => {
  try {
    const saved = sessionStorage.getItem("companyAccounts");
    return saved ? JSON.parse(saved) : {};
  } catch (err) {
    console.error("Failed to get companies from sessionStorage:", err);
    return {};
  }
};

/**
 * Get a specific company by ID from sessionStorage
 * @param {string} companyId - The company ID
 * @returns {Object|null} Company object if found, null otherwise
 */
export const getCompanyByIdFromStorage = (companyId) => {
  const companies = getCompaniesFromStorage();
  return companies[companyId] || null;
};

/**
 * Get a company by email from sessionStorage
 * @param {string} email - The company email address
 * @returns {Object|null} Company object if found, null otherwise
 */
export const getCompanyByEmailFromStorage = (email) => {
  const companies = getCompaniesFromStorage();
  return Object.values(companies).find((company) => company.email === email);
};

/**
 * Add a new company to sessionStorage
 * @param {Object} newCompany - The new company data
 * @returns {string} The generated company ID
 */
export const addCompanyToStorage = (newCompany) => {
  const companies = getCompaniesFromStorage();
  const newCompanyId = `company-${Date.now()}`;
  companies[newCompanyId] = newCompany;
  sessionStorage.setItem("companyAccounts", JSON.stringify(companies));
  return newCompanyId;
};

/**
 * Update a company in sessionStorage
 * @param {string} companyId - The company ID to update
 * @param {Object} updates - The updates to apply
 * @returns {boolean} True if update was successful, false otherwise
 */
export const updateCompanyInStorage = (companyId, updates) => {
  const companies = getCompaniesFromStorage();
  if (companies[companyId]) {
    companies[companyId] = { ...companies[companyId], ...updates };
    sessionStorage.setItem("companyAccounts", JSON.stringify(companies));
    return true;
  }
  return false;
};

/**
 * Delete a company from sessionStorage
 * @param {string} companyId - The company ID to delete
 * @returns {boolean} True if deletion was successful, false otherwise
 */
export const deleteCompanyFromStorage = (companyId) => {
  const companies = getCompaniesFromStorage();
  if (companies[companyId]) {
    delete companies[companyId];
    sessionStorage.setItem("companyAccounts", JSON.stringify(companies));
    return true;
  }
  return false;
};

/**
 * Logged company utilities
 */

/**
 * Get the logged company email from sessionStorage
 * @returns {string} The logged company email
 */
export const getLoggedCompanyEmailFromStorage = () => {
  return sessionStorage.getItem("loggedCompanyEmail") || "";
};

/**
 * Set the logged company email in sessionStorage
 * @param {string} email - The company email address
 */
export const setLoggedCompanyEmailInStorage = (email) => {
  sessionStorage.setItem("loggedCompanyEmail", email);
};

/**
 * Clear the logged company email from sessionStorage
 */
export const clearLoggedCompanyEmailFromStorage = () => {
  sessionStorage.removeItem("loggedCompanyEmail");
};

/**
 * Utility functions
 */

/**
 * Clear all app data from sessionStorage
 */
export const clearAllAppDataFromStorage = () => {
  sessionStorage.removeItem("candidates");
  sessionStorage.removeItem("jobs");
  sessionStorage.removeItem("companyAccounts");
  sessionStorage.removeItem("loggedCompanyEmail");
};

/**
 * Initialize default data if storage is empty
 * Loads default data from JSON files for candidates, jobs, and companies
 */
export const initializeDefaultData = () => {
  const candidates = getCandidatesFromStorage();
  const jobs = getJobsFromStorage();
  const companies = getCompaniesFromStorage();

  if (Object.keys(candidates).length === 0) {
    import("../Components/dummy_data_structures/Candidate_information.json")
      .then((data) => {
        sessionStorage.setItem("candidates", JSON.stringify(data.default));
      })
      .catch((err) => console.error("Failed to load default candidates:", err));
  }

  if (Object.keys(jobs).length === 0) {
    import("../Components/dummy_data_structures/Jobs.json")
      .then((data) => {
        sessionStorage.setItem("jobs", JSON.stringify(data.default));
      })
      .catch((err) => console.error("Failed to load default jobs:", err));
  }

  if (Object.keys(companies).length === 0) {
    import("../Components/dummy_data_structures/Accounts.json")
      .then((data) => {
        sessionStorage.setItem("companyAccounts", JSON.stringify(data.default));
      })
      .catch((err) => console.error("Failed to load default companies:", err));
  }
};
