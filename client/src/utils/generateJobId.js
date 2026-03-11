/**
 * Utility functions for generating unique and valid job IDs
 */

/**
 * Generates a unique job ID using timestamp and company ID
 * Format: job-{timestamp}-{companyId}
 * @param {string} companyId - The ID of the company posting the job
 * @returns {string} A unique job ID
 */
export const generateJobId = (companyId = "") => {
  const timestamp = Date.now().toString();
  const randomSuffix = Math.random().toString(36).substr(2, 6);

  // Clean company ID to remove special characters
  const cleanCompanyId = companyId
    ? companyId.replace(/[^a-zA-Z0-9]/g, "")
    : "";

  // Generate ID with format: job-timestamp-companyId-random
  const jobId = `job-${timestamp}-${cleanCompanyId}-${randomSuffix}`;

  return jobId;
};

/**
 * Alternative job ID generation using UUID-like format
 * Format: JOB-{8 chars}-{4 chars}-{4 chars}-{4 chars}-{12 chars}
 * @param {string} companyId - The ID of the company posting the job
 * @returns {string} A UUID-like job ID
 */
export const generateJobIdUUID = (companyId = "") => {
  const timestamp = Date.now().toString(16);
  const random1 = Math.random().toString(16).substr(2, 4);
  const random2 = Math.random().toString(16).substr(2, 4);
  const random3 = Math.random().toString(16).substr(2, 4);
  const random4 = Math.random().toString(16).substr(2, 8);

  const cleanCompanyId = companyId
    ? companyId.replace(/[^a-zA-Z0-9]/g, "").substr(0, 4)
    : "COMP";

  return `JOB-${cleanCompanyId}-${random1}-${random2}-${random3}-${random4}${timestamp}`;
};

/**
 * Generates a simple sequential job ID
 * Format: JOB-{companyPrefix}-{sequence}
 * @param {string} companyId - The ID of the company posting the job
 * @param {number} sequence - The sequence number for this job
 * @returns {string} A sequential job ID
 */
export const generateJobIdSequential = (companyId = "", sequence = 1) => {
  const cleanCompanyId = companyId
    ? companyId
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .substr(0, 3)
    : "COMP";
  const paddedSequence = sequence.toString().padStart(4, "0");

  return `JOB-${cleanCompanyId}-${paddedSequence}`;
};

/**
 * Validates a job ID format
 * @param {string} jobId - The job ID to validate
 * @returns {boolean} True if the job ID is valid
 */
export const validateJobId = (jobId) => {
  if (!jobId || typeof jobId !== "string") {
    return false;
  }

  // Check if it matches the expected pattern
  const jobPattern = /^job-\d+-[a-zA-Z0-9]*-[a-z0-9]+$/;
  return jobPattern.test(jobId);
};

/**
 * Extracts company ID from job ID
 * @param {string} jobId - The job ID
 * @returns {string|null} The extracted company ID or null if not found
 */
export const extractCompanyIdFromJobId = (jobId) => {
  if (!validateJobId(jobId)) {
    return null;
  }

  // Extract company ID from the job ID
  const parts = jobId.split("-");
  if (parts.length >= 3) {
    return parts[2] || null;
  }

  return null;
};

/**
 * Generates a job ID with additional metadata
 * @param {string} companyId - The ID of the company posting the job
 * @param {string} jobTitle - The title of the job (optional, for additional uniqueness)
 * @returns {object} Object containing job ID and metadata
 */
export const generateJobIdWithMetadata = (companyId = "", jobTitle = "") => {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substr(2, 6);
  const cleanCompanyId = companyId
    ? companyId.replace(/[^a-zA-Z0-9]/g, "")
    : "";
  const cleanJobTitle = jobTitle
    ? jobTitle
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase()
        .substr(0, 3)
    : "";

  const jobId = `job-${timestamp}-${cleanCompanyId}-${cleanJobTitle}-${randomSuffix}`;

  return {
    jobId,
    metadata: {
      timestamp,
      companyId: cleanCompanyId,
      jobTitlePrefix: cleanJobTitle,
      randomSuffix,
      createdAt: new Date(timestamp).toISOString(),
    },
  };
};

// Default export for easy import
export default generateJobId;
