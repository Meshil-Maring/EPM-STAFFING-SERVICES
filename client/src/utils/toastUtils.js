/**
 * Utility functions for react-toastify integration
 * Replace all error and setError usage with toast notifications
 */

import { toast } from "react-toastify";

// Success notifications
export const showSuccess = (message, options = {}) => {
  return toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    ...options,
  });
};

// Error notifications
export const showError = (message, options = {}) => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    ...options,
  });
};

// Warning notifications
export const showWarning = (message, options = {}) => {
  return toast.warn(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    ...options,
  });
};

// Info notifications
export const showInfo = (message, options = {}) => {
  return toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    ...options,
  });
};

// Custom success messages for CRUD operations
export const showCandidateAdded = (candidateName) => {
  showSuccess(`Candidate ${candidateName} has been successfully added!`);
};

export const showCandidateUpdated = (candidateName) => {
  showSuccess(`Candidate ${candidateName} has been successfully updated!`);
};

export const showCandidateDeleted = (candidateName) => {
  showSuccess(`Candidate ${candidateName} has been successfully deleted!`);
};

export const showJobAdded = (jobTitle) => {
  showSuccess(`Job "${jobTitle}" has been successfully added!`);
};

export const showJobUpdated = (jobTitle) => {
  showSuccess(`Job "${jobTitle}" has been successfully updated!`);
};

export const showJobDeleted = (jobTitle) => {
  showSuccess(`Job "${jobTitle}" has been successfully deleted!`);
};

export const showCompanyAdded = (companyName) => {
  showSuccess(`Company ${companyName} has been successfully added!`);
};

export const showCompanyUpdated = (companyName) => {
  showSuccess(`Company ${companyName} has been successfully updated!`);
};

export const showCompanyDeleted = (companyName) => {
  showSuccess(`Company ${companyName} has been successfully deleted!`);
};

// Custom error messages for CRUD operations
export const showCandidateAddError = (error) => {
  showError(`Failed to add candidate: ${error}`);
};

export const showCandidateUpdateError = (candidateName, error) => {
  showError(`Failed to update candidate ${candidateName}: ${error}`);
};

export const showCandidateDeleteError = (candidateName, error) => {
  showError(`Failed to delete candidate ${candidateName}: ${error}`);
};

export const showJobAddError = (error) => {
  showError(`Failed to add job: ${error}`);
};

export const showJobUpdateError = (jobTitle, error) => {
  showError(`Failed to update job "${jobTitle}": ${error}`);
};

export const showJobDeleteError = (jobTitle, error) => {
  showError(`Failed to delete job "${jobTitle}": ${error}`);
};

export const showCompanyAddError = (error) => {
  showError(`Failed to add company: ${error}`);
};

export const showCompanyUpdateError = (companyName, error) => {
  showError(`Failed to update company ${companyName}: ${error}`);
};

export const showCompanyDeleteError = (companyName, error) => {
  showError(`Failed to delete company ${companyName}: ${error}`);
};

// Validation error messages
export const showValidationError = (field, message) => {
  showError(`${field}: ${message}`);
};

export const showRequiredFieldError = (fieldName) => {
  showError(`${fieldName} is required.`);
};

export const showEmailValidationError = () => {
  showError("Please enter a valid email address.");
};

export const showPasswordValidationError = () => {
  showError(
    "Password must be at least 8 characters long and contain uppercase, lowercase, and special characters.",
  );
};

// Network error messages
export const showNetworkError = () => {
  showError(
    "Network error. Please check your internet connection and try again.",
  );
};

export const showServerError = (
  message = "An unexpected error occurred. Please try again later.",
) => {
  showError(message);
};

// Loading notifications
export const showLoading = (message = "Processing...") => {
  return toast.loading(message, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

export const updateLoading = (toastId, message, type = "success") => {
  toast.update(toastId, {
    render: message,
    type: type,
    isLoading: false,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// Confirmation messages
export const showConfirmation = (message) => {
  showInfo(message);
};

// Action confirmation with custom styling
export const showActionCompleted = (action, entity) => {
  showSuccess(`${action} completed successfully for ${entity}.`);
};
