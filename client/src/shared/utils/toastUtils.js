/**
 * Utility functions for react-toastify integration
 *
 * This module provides comprehensive toast notification utilities for the
 * application including success, error, warning, and info notifications.
 * It also includes specialized functions for CRUD operations and validation
 * error handling to provide consistent user feedback throughout the application.
 */

import { toast } from "react-toastify";

/**
 * Show a success notification
 * @param {string} message - The success message to display
 * @param {Object} options - Additional toast options
 * @returns {string} Toast ID for potential updates
 */
export const showSuccess = (message, options = {}) => {
  return toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    ...options,
  });
};

/**
 * Show an error notification
 * @param {string} message - The error message to display
 * @param {Object} options - Additional toast options
 * @returns {string} Toast ID for potential updates
 */
export const showError = (message, options = {}) => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    ...options,
  });
};

/**
 * Show a warning notification
 * @param {string} message - The warning message to display
 * @param {Object} options - Additional toast options
 * @returns {string} Toast ID for potential updates
 */
export const showWarning = (message, options = {}) => {
  return toast.warn(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    ...options,
  });
};

/**
 * Show an info notification
 * @param {string} message - The info message to display
 * @param {Object} options - Additional toast options
 * @returns {string} Toast ID for potential updates
 */
export const showInfo = (message, options = {}) => {
  return toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    ...options,
  });
};

// Custom success messages for CRUD operations

/**
 * Show success message for candidate addition
 * @param {string} candidateName - Name of the added candidate
 */
export const showCandidateAdded = (candidateName) => {
  showSuccess(`Candidate ${candidateName} has been successfully added!`);
};

/**
 * Show success message for candidate update
 * @param {string} candidateName - Name of the updated candidate
 */
export const showCandidateUpdated = (candidateName) => {
  showSuccess(`Candidate ${candidateName} has been successfully updated!`);
};

/**
 * Show success message for candidate deletion
 * @param {string} candidateName - Name of the deleted candidate
 */
export const showCandidateDeleted = (candidateName) => {
  showSuccess(`Candidate ${candidateName} has been successfully deleted!`);
};

/**
 * Show success message for job addition
 * @param {string} jobTitle - Title of the added job
 */
export const showJobAdded = (jobTitle) => {
  showSuccess(`Job "${jobTitle}" has been successfully added!`);
};

/**
 * Show success message for job update
 * @param {string} jobTitle - Title of the updated job
 */
export const showJobUpdated = (jobTitle) => {
  showSuccess(`Job "${jobTitle}" has been successfully updated!`);
};

/**
 * Show success message for job deletion
 * @param {string} jobTitle - Title of the deleted job
 */
export const showJobDeleted = (jobTitle) => {
  showSuccess(`Job "${jobTitle}" has been successfully deleted!`);
};

/**
 * Show success message for company addition
 * @param {string} companyName - Name of the added company
 */
export const showCompanyAdded = (companyName) => {
  showSuccess(`Company ${companyName} has been successfully added!`);
};

/**
 * Show success message for company update
 * @param {string} companyName - Name of the updated company
 */
export const showCompanyUpdated = (companyName) => {
  showSuccess(`Company ${companyName} has been successfully updated!`);
};

/**
 * Show success message for company deletion
 * @param {string} companyName - Name of the deleted company
 */
export const showCompanyDeleted = (companyName) => {
  showSuccess(`Company ${companyName} has been successfully deleted!`);
};

// Custom error messages for CRUD operations

/**
 * Show error message for candidate addition failure
 * @param {string} error - Error details
 */
export const showCandidateAddError = (error) => {
  showError(`Failed to add candidate: ${error}`);
};

/**
 * Show error message for candidate update failure
 * @param {string} candidateName - Name of the candidate
 * @param {string} error - Error details
 */
export const showCandidateUpdateError = (candidateName, error) => {
  showError(`Failed to update candidate ${candidateName}: ${error}`);
};

/**
 * Show error message for candidate deletion failure
 * @param {string} candidateName - Name of the candidate
 * @param {string} error - Error details
 */
export const showCandidateDeleteError = (candidateName, error) => {
  showError(`Failed to delete candidate ${candidateName}: ${error}`);
};

/**
 * Show error message for job addition failure
 * @param {string} error - Error details
 */
export const showJobAddError = (error) => {
  showError(`Failed to add job: ${error}`);
};

/**
 * Show error message for job update failure
 * @param {string} jobTitle - Title of the job
 * @param {string} error - Error details
 */
export const showJobUpdateError = (jobTitle, error) => {
  showError(`Failed to update job "${jobTitle}": ${error}`);
};

/**
 * Show error message for job deletion failure
 * @param {string} jobTitle - Title of the job
 * @param {string} error - Error details
 */
export const showJobDeleteError = (jobTitle, error) => {
  showError(`Failed to delete job "${jobTitle}": ${error}`);
};

/**
 * Show error message for company addition failure
 * @param {string} error - Error details
 */
export const showCompanyAddError = (error) => {
  showError(`Failed to add company: ${error}`);
};

/**
 * Show error message for company update failure
 * @param {string} companyName - Name of the company
 * @param {string} error - Error details
 */
export const showCompanyUpdateError = (companyName, error) => {
  showError(`Failed to update company ${companyName}: ${error}`);
};

/**
 * Show error message for company deletion failure
 * @param {string} companyName - Name of the company
 * @param {string} error - Error details
 */
export const showCompanyDeleteError = (companyName, error) => {
  showError(`Failed to delete company ${companyName}: ${error}`);
};

// Validation error messages

/**
 * Show validation error for a specific field
 * @param {string} field - Field name
 * @param {string} message - Validation error message
 */
export const showValidationError = (field, message) => {
  showError(`${field}: ${message}`);
};

/**
 * Show required field error
 * @param {string} fieldName - Name of the required field
 */
export const showRequiredFieldError = (fieldName) => {
  showError(`${fieldName} is required.`);
};

/**
 * Show email validation error
 */
export const showEmailValidationError = () => {
  showError("Please enter a valid email address.");
};

/**
 * Show password validation error
 */
export const showPasswordValidationError = () => {
  showError(
    "Password must be at least 8 characters long and contain uppercase, lowercase, and special characters.",
  );
};

// Network error messages

/**
 * Show network error message
 */
export const showNetworkError = () => {
  showError(
    "Network error. Please check your internet connection and try again.",
  );
};

/**
 * Show server error message
 * @param {string} message - Custom error message
 */
export const showServerError = (
  message = "An unexpected error occurred. Please try again later.",
) => {
  showError(message);
};

// Loading notifications

/**
 * Show loading notification
 * @param {string} message - Loading message
 * @returns {string} Toast ID for updates
 */
export const showLoading = (message = "Processing...") => {
  return toast.loading(message, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

/**
 * Update a loading toast with final status
 * @param {string} toastId - ID of the toast to update
 * @param {string} message - Final message
 * @param {string} type - Type of notification (success, error, warning, info)
 */
export const updateLoading = (toastId, message, type = "success") => {
  toast.update(toastId, {
    render: message,
    type: type,
    isLoading: false,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// Confirmation messages

/**
 * Show confirmation message
 * @param {string} message - Confirmation message
 */
export const showConfirmation = (message) => {
  showInfo(message);
};

/**
 * Show action completion message
 * @param {string} action - Action that was completed
 * @param {string} entity - Entity that was affected
 */
export const showActionCompleted = (action, entity) => {
  showSuccess(`${action} completed successfully for ${entity}.`);
};
