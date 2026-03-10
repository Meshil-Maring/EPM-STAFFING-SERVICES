import React, { createContext, useState, useEffect } from "react";
import Candidates_Information from "../Components/dummy_data_structures/Candidate_information.json";

export const Candidates_context = createContext(null);

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
    sessionStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);

  // Get all candidates
  const getAllCandidates = () => candidates;

  // Get candidate by ID
  const getCandidateById = (candidateId) => candidates[candidateId] || null;

  // Get candidates by status
  const getCandidatesByStatus = (status) => {
    return Object.entries(candidates).reduce((acc, [id, candidate]) => {
      if (candidate.status === status) {
        acc[id] = candidate;
      }
      return acc;
    }, {});
  };

  // Get candidates by job ID
  const getCandidatesByJobId = (jobId) => {
    return Object.entries(candidates).reduce((acc, [id, candidate]) => {
      if (candidate["job id"] && candidate["job id"].includes(jobId)) {
        acc[id] = candidate;
      }
      return acc;
    }, {});
  };

  // Get candidates by skills
  const getCandidatesBySkills = (skills) => {
    const skillSet = new Set(skills.map((skill) => skill.toLowerCase()));
    return Object.entries(candidates).reduce((acc, [id, candidate]) => {
      const candidateSkills = candidate.skills || [];
      const hasMatchingSkills = candidateSkills.some((skill) =>
        skillSet.has(skill.toLowerCase()),
      );
      if (hasMatchingSkills) {
        acc[id] = candidate;
      }
      return acc;
    }, {});
  };

  // Update entire candidate
  const updateCandidate = (candidateId, updatedCandidate) => {
    setCandidates((prevCandidates) => ({
      ...prevCandidates,
      [candidateId]: {
        ...prevCandidates[candidateId],
        ...updatedCandidate,
      },
    }));
  };

  // Update specific field of a candidate
  const updateCandidateField = (candidateId, field, value) => {
    setCandidates((prevCandidates) => ({
      ...prevCandidates,
      [candidateId]: {
        ...prevCandidates[candidateId],
        [field]: value,
      },
    }));
  };

  // Add new candidate
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
      [newCandidateId]: {
        ...candidateWithDefaults,
      },
    }));
    return newCandidateId;
  };

  // Delete candidate
  const deleteCandidate = (candidateId) => {
    setCandidates((prev) => {
      const { [candidateId]: deletedCandidate, ...remainingCandidates } = prev;
      return remainingCandidates;
    });
  };

  // Bulk update candidates
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

  // Add skill to candidate
  const addSkillToCandidate = (candidateId, skill) => {
    setCandidates((prevCandidates) => ({
      ...prevCandidates,
      [candidateId]: {
        ...prevCandidates[candidateId],
        skills: [...(prevCandidates[candidateId].skills || []), skill],
      },
    }));
  };

  // Remove skill from candidate
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

  // Update candidate status
  const updateCandidateStatus = (candidateId, status) => {
    setCandidates((prevCandidates) => ({
      ...prevCandidates,
      [candidateId]: {
        ...prevCandidates[candidateId],
        status: status,
      },
    }));
  };

  // Search candidates by name or email
  const searchCandidates = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return Object.entries(candidates).reduce((acc, [id, candidate]) => {
      const matches =
        candidate.name.toLowerCase().includes(term) ||
        candidate.email.toLowerCase().includes(term);
      if (matches) {
        acc[id] = candidate;
      }
      return acc;
    }, {});
  };

  // Get candidate count by status
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
