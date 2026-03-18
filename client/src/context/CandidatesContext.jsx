/**
 * CandidatesContext - Context provider for candidate management
 *
 * This context manages all candidate-related data operations including CRUD operations,
 * filtering, searching, and status management. It uses sessionStorage for persistence
 * and provides a comprehensive API for interacting with candidate data throughout
 * the application. The context includes functionality for managing candidate skills,
 * job applications, and status tracking.
 */

import React, { createContext, useState, useEffect } from "react";
import Candidates_Information from "../Components/dummy_data_structures/Candidate_information.json";

// Create the context with default null value
export const Candidates_context = createContext(null);

/**
 * CandidatesContext provider component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 * @returns {JSX.Element} Context provider with candidate management functionality
 */
function CandidatesContext({ children }) {
  // Initialize state by parsing the string from sessionStorage
  const [candidates, setCandidates] = useState(() => {
    const savedCandidates = sessionStorage.getItem("candidates");
    // If sessionStorage is empty, use the imported JSON data, otherwise parse saved data
    if (!savedCandidates) return Candidates_Information;
    try {
      const parsed = JSON.parse(savedCandidates);
      return typeof parsed === "object" ? parsed : Candidates_Information;
    } catch (err) {
      console.error("Failed to parse candidates from sessionStorage:", err);
      return Candidates_Information;
    }
  });

  // Keep sessionStorage in sync whenever the 'candidates' state changes
  useEffect(() => {
    if (candidates && typeof candidates === "object") {
      sessionStorage.setItem("candidates", JSON.stringify(candidates));
    }
  }, [candidates]);

  /**
   * Get all candidates from the current state
   * @returns {Object} All candidates data
   */
  const getAllCandidates = () => candidates;

  /**
   * Get a specific candidate by their ID
   * @param {string} candidateId - The unique identifier of the candidate
   * @returns {Object|null} Candidate object if found, null otherwise
   */
  const getCandidateById = (candidateId) => candidates[candidateId] || null;

  /**
   * Get candidates filtered by status
   * @param {string} status - The status to filter by
   * @returns {Object} Candidates with the specified status
   */
  const getCandidatesByStatus = (status) => {
    const result = {};
    Object.entries(candidates).forEach(([id, candidate]) => {
      if (candidate.status === status) {
        result[id] = candidate;
      }
    });
    return result;
  };

  /**
   * Get candidates filtered by job ID
   * @param {string} jobId - The job ID to filter by
   * @returns {Object} Candidates associated with the specified job
   */
  const getCandidatesByJobId = (jobId) => {
    const result = {};
    Object.entries(candidates).forEach(([id, candidate]) => {
      if (candidate["job id"] && candidate["job id"].includes(jobId)) {
        result[id] = candidate;
      }
    });
    return result;
  };

  /**
   * Get candidates filtered by skills
   * @param {Array} skills - Array of skills to filter by
   * @returns {Object} Candidates matching the specified skills
   */
  const getCandidatesBySkills = (skills) => {
    const result = {};
    const skillSet = new Set(skills.map((skill) => skill.toLowerCase()));
    Object.entries(candidates).forEach(([id, candidate]) => {
      const candidateSkills = candidate.skills || [];
      const hasMatchingSkills = candidateSkills.some((skill) =>
        skillSet.has(skill.toLowerCase()),
      );
      if (hasMatchingSkills) {
        result[id] = candidate;
      }
    });
    return result;
  };

  /**
   * Update an entire candidate object
   * @param {string} candidateId - The ID of the candidate to update
   * @param {Object} updatedCandidate - The updated candidate data
   */
  const updateCandidate = (candidateId, updatedCandidate) => {
    setCandidates((prevCandidates) => ({
      ...prevCandidates,
      [candidateId]: {
        ...prevCandidates[candidateId],
        ...updatedCandidate,
      },
    }));
  };

  /**
   * Update a specific field of a candidate
   * @param {string} candidateId - The ID of the candidate to update
   * @param {string} field - The field name to update
   * @param {any} value - The new value for the field
   */
  const updateCandidateField = (candidateId, field, value) => {
    setCandidates((prevCandidates) => ({
      ...prevCandidates,
      [candidateId]: {
        ...prevCandidates[candidateId],
        [field]: value,
      },
    }));
  };

  /**
   * Add a new candidate to the collection
   * @param {Object} newCandidate - The new candidate data to add
   * @returns {string} The generated candidate ID
   */
  const addCandidate = (newCandidate) => {
    const newCandidateId = `cand-${Date.now()}`;
    // Ensure minimal default fields for new candidates so UI lists them
    const candidateWithDefaults = {
      status: newCandidate.status || "Pending",
      name: newCandidate.name || "Unnamed Candidate",
      "date applied":
        newCandidate["date applied"] || new Date().toLocaleDateString("en-GB"),
      ...newCandidate,
    };
    setCandidates((prevCandidates) => ({
      ...prevCandidates,
      [newCandidateId]: candidateWithDefaults,
    }));
    return newCandidateId;
  };

  /**
   * Delete a candidate from the collection
   * @param {string} candidateId - The ID of the candidate to delete
   */
  const deleteCandidate = (candidateId) => {
    setCandidates((prev) => {
      const { [candidateId]: deletedCandidate, ...remainingCandidates } = prev;
      return remainingCandidates;
    });
  };

  /**
   * Perform bulk updates on multiple candidates at once
   * @param {Object} updatesMap - Object mapping candidate IDs to their updates
   */
  const bulkUpdateCandidates = (updatesMap) => {
    setCandidates((prevCandidates) => {
      const updated = { ...prevCandidates };
      Object.entries(updatesMap).forEach(([id, updates]) => {
        if (updated[id]) {
          updated[id] = { ...updated[id], ...updates };
        }
      });
      return updated;
    });
  };

  /**
   * Add a skill to a candidate's skills list
   * @param {string} candidateId - The ID of the candidate
   * @param {string} skill - The skill to add
   */
  const addSkillToCandidate = (candidateId, skill) => {
    setCandidates((prevCandidates) => ({
      ...prevCandidates,
      [candidateId]: {
        ...prevCandidates[candidateId],
        skills: [...(prevCandidates[candidateId].skills || []), skill],
      },
    }));
  };

  /**
   * Remove a skill from a candidate's skills list
   * @param {string} candidateId - The ID of the candidate
   * @param {string} skill - The skill to remove
   */
  const removeSkillFromCandidate = (candidateId, skill) => {
    setCandidates((prevCandidates) => ({
      ...prevCandidates,
      [candidateId]: {
        ...prevCandidates[candidateId],
        skills: (prevCandidates[candidateId].skills || []).filter(
          (s) => s !== skill,
        ),
      },
    }));
  };

  /**
   * Update a candidate's status
   * @param {string} candidateId - The ID of the candidate
   * @param {string} status - The new status value
   */
  const updateCandidateStatus = (candidateId, status) => {
    setCandidates((prevCandidates) => ({
      ...prevCandidates,
      [candidateId]: {
        ...prevCandidates[candidateId],
        status: status,
      },
    }));
  };

  /**
   * Search candidates by name or email
   * @param {string} searchTerm - The term to search for
   * @returns {Object} Candidates matching the search term
   */
  const searchCandidates = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    const result = {};
    Object.entries(candidates).forEach(([id, candidate]) => {
      const matches =
        candidate.name.toLowerCase().includes(term) ||
        candidate.email.toLowerCase().includes(term);
      if (matches) {
        result[id] = candidate;
      }
    });
    return result;
  };

  /**
   * Get candidate count by status
   * @returns {Object} Object with status counts
   */
  const getCandidateCountByStatus = () => {
    const counts = {};
    Object.values(candidates).forEach((candidate) => {
      const status = candidate.status || "Unknown";
      counts[status] = (counts[status] || 0) + 1;
    });
    return counts;
  };

  return (
    <Candidates_context.Provider
      value={{
        // Data access methods
        candidates,
        getAllCandidates,
        getCandidateById,
        getCandidatesByStatus,
        getCandidatesByJobId,
        getCandidatesBySkills,
        searchCandidates,
        getCandidateCountByStatus,

        // CRUD operations
        updateCandidate,
        updateCandidateField,
        addCandidate,
        deleteCandidate,
        bulkUpdateCandidates,

        // Specialized operations
        addSkillToCandidate,
        removeSkillFromCandidate,
        updateCandidateStatus,
      }}
    >
      {children}
    </Candidates_context.Provider>
  );
}

export default CandidatesContext;
