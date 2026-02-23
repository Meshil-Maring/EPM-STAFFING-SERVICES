import React, { createContext, useState, useEffect } from "react";
import Candidates_Information from "../Components/dummy_data_structures/Candidate_information.json";

export const Candidates_context = createContext(null);

function CandidatesContext({ children }) {
  const [candidates, setCandidates] = useState({});

  useEffect(() => {
    // Load candidates from JSON file
    setCandidates(Candidates_Information);
  }, []);

  const updateCandidate = (candidateId, updatedCandidate) => {
    setCandidates((prevCandidates) => ({
      ...prevCandidates,
      [candidateId]: {
        ...prevCandidates[candidateId],
        ...updatedCandidate,
      },
    }));
  };

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

  const deleteCandidate = (candidateId) => {
    setCandidates((prev) => {
      const { [candidateId]: deletedCandidate, ...remainingCandidates } = prev;
      return remainingCandidates;
    });
  };

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

  const filterCandidatesByStatus = (status) => {
    return Object.entries(candidates).reduce((acc, [id, candidate]) => {
      if (candidate.status === status) {
        acc[id] = candidate;
      }
      return acc;
    }, {});
  };

  return (
    <Candidates_context.Provider
      value={{
        candidates,
        updateCandidate,
        addCandidate,
        deleteCandidate,
        bulkUpdateCandidates,
        filterCandidatesByStatus,
      }}
    >
      {children}
    </Candidates_context.Provider>
  );
}

export default CandidatesContext;
