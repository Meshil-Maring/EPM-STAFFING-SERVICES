import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import CandidateCard from "./CandidateCard";
import CandidateViewProfile from "./ViewProfileOverlay";
import { getCandidateInfo } from "../end-point-function/submitted_candidates";

const SubmittedCandidateMain = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => getCandidateInfo(1),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-gray-500 text-sm">Loading candidates...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-red-500 text-sm">Failed to load candidates.</p>
      </div>
    );

  const candidates = data?.data || [];

  return (
    <>
      {/* ── Grid ── */}
      {candidates.length === 0 ? (
        <div className="flex items-center justify-center min-h-64">
          <p className="text-gray-400 text-sm">No candidates submitted yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full p-4">
          {candidates.map((value) => (
            <CandidateCard
              key={value.id}
              data={value}
              viewProfileHandler={setSelectedCandidate}
            />
          ))}
        </div>
      )}

      {/* ── Profile Overlay ── */}
      {selectedCandidate && (
        <CandidateViewProfile
          data={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </>
  );
};

export default SubmittedCandidateMain;
