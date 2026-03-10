/**
 * Utility functions for direct sessionStorage access
 * These functions provide optimized access to data without context overhead
 */

// Candidates utilities
export const getCandidatesFromStorage = () => {
  try {
    const saved = sessionStorage.getItem("candidates");
    return saved ? JSON.parse(saved) : {};
  } catch (err) {
    console.error("Failed to get candidates from sessionStorage:", err);
    return {};
  }
};

export const getCandidateByIdFromStorage = (candidateId) => {
  const candidates = getCandidatesFromStorage();
  return candidates[candidateId] || null;
};

export const getCandidatesByStatusFromStorage = (status) => {
  const candidates = getCandidatesFromStorage();
  return Object.entries(candidates).reduce((acc, [id, candidate]) => {
    if (candidate.status === status) {
      acc[id] = candidate;
    }
    return acc;
  }, {});
};

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

export const updateCandidateInStorage = (candidateId, updates) => {
  const candidates = getCandidatesFromStorage();
  if (candidates[candidateId]) {
    candidates[candidateId] = { ...candidates[candidateId], ...updates };
    sessionStorage.setItem("candidates", JSON.stringify(candidates));
    return true;
  }
  return false;
};

export const deleteCandidateFromStorage = (candidateId) => {
  const candidates = getCandidatesFromStorage();
  if (candidates[candidateId]) {
    delete candidates[candidateId];
    sessionStorage.setItem("candidates", JSON.stringify(candidates));
    return true;
  }
  return false;
};

// Jobs utilities
export const getJobsFromStorage = () => {
  try {
    const saved = sessionStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : {};
  } catch (err) {
    console.error("Failed to get jobs from sessionStorage:", err);
    return {};
  }
};

export const getJobByIdFromStorage = (jobId) => {
  const jobs = getJobsFromStorage();
  return jobs[jobId] || null;
};

export const getJobsByCompanyIdFromStorage = (companyId) => {
  const jobs = getJobsFromStorage();
  return Object.entries(jobs).reduce((acc, [id, job]) => {
    if (job["company id"] === companyId) {
      acc[id] = job;
    }
    return acc;
  }, {});
};

export const addJobToStorage = (newJob) => {
  const jobs = getJobsFromStorage();
  const newJobId = `job-${Date.now()}`;
  jobs[newJobId] = newJob;
  sessionStorage.setItem("jobs", JSON.stringify(jobs));
  return newJobId;
};

export const updateJobInStorage = (jobId, updates) => {
  const jobs = getJobsFromStorage();
  if (jobs[jobId]) {
    jobs[jobId] = { ...jobs[jobId], ...updates };
    sessionStorage.setItem("jobs", JSON.stringify(jobs));
    return true;
  }
  return false;
};

export const deleteJobFromStorage = (jobId) => {
  const jobs = getJobsFromStorage();
  if (jobs[jobId]) {
    delete jobs[jobId];
    sessionStorage.setItem("jobs", JSON.stringify(jobs));
    return true;
  }
  return false;
};

// Company accounts utilities
export const getCompaniesFromStorage = () => {
  try {
    const saved = sessionStorage.getItem("companyAccounts");
    return saved ? JSON.parse(saved) : {};
  } catch (err) {
    console.error("Failed to get companies from sessionStorage:", err);
    return {};
  }
};

export const getCompanyByIdFromStorage = (companyId) => {
  const companies = getCompaniesFromStorage();
  return companies[companyId] || null;
};

export const getCompanyByEmailFromStorage = (email) => {
  const companies = getCompaniesFromStorage();
  return Object.values(companies).find((company) => company.email === email);
};

export const addCompanyToStorage = (newCompany) => {
  const companies = getCompaniesFromStorage();
  const newCompanyId = `company-${Date.now()}`;
  companies[newCompanyId] = newCompany;
  sessionStorage.setItem("companyAccounts", JSON.stringify(companies));
  return newCompanyId;
};

export const updateCompanyInStorage = (companyId, updates) => {
  const companies = getCompaniesFromStorage();
  if (companies[companyId]) {
    companies[companyId] = { ...companies[companyId], ...updates };
    sessionStorage.setItem("companyAccounts", JSON.stringify(companies));
    return true;
  }
  return false;
};

export const deleteCompanyFromStorage = (companyId) => {
  const companies = getCompaniesFromStorage();
  if (companies[companyId]) {
    delete companies[companyId];
    sessionStorage.setItem("companyAccounts", JSON.stringify(companies));
    return true;
  }
  return false;
};

// Logged company utilities
export const getLoggedCompanyEmailFromStorage = () => {
  return sessionStorage.getItem("loggedCompanyEmail") || "";
};

export const setLoggedCompanyEmailInStorage = (email) => {
  sessionStorage.setItem("loggedCompanyEmail", email);
};

export const clearLoggedCompanyEmailFromStorage = () => {
  sessionStorage.removeItem("loggedCompanyEmail");
};

// Utility to clear all app data from sessionStorage
export const clearAllAppDataFromStorage = () => {
  sessionStorage.removeItem("candidates");
  sessionStorage.removeItem("jobs");
  sessionStorage.removeItem("companyAccounts");
  sessionStorage.removeItem("loggedCompanyEmail");
};

// Utility to initialize default data if storage is empty
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
