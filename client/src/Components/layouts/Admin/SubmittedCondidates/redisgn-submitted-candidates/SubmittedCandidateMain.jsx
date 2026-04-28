import { useState, useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import CandidateCard from "./CandidateCard";
import CandidateViewProfile from "./ViewProfileOverlay";
import EditCandidateOverlay from "./CandidateEditOverlay";
import ViewJobDetailsOverlay from "./ViewJobDetailsOverlay";
import {
  deleteCandidate,
  getCandidateInfo,
  updateCandidate,
} from "../end-point-function/submitted_candidates";
import { searchCandiateService } from "../../../../../services/candidate.service";
import { showError, showSuccess } from "../../../../../utils/toastUtils";

// ---- debounce hook ----
const useDebounce = (value, delay = 600) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const SubmittedCandidateMain = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [editCandidate, setEditCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 600);
  const queryClient = useQueryClient();

  const isSearching = debouncedSearch.trim().length > 0;

  // ---- default candidates query ----
  const { data, isLoading, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => getCandidateInfo(1),
    enabled: !isSearching,
    staleTime: 30_000, // don't refetch within 30s
    keepPreviousData: true, // no flicker when switching back from search
  });

  // ---- search query ----
  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery({
    queryKey: ["candidates", "search", debouncedSearch],
    queryFn: () => searchCandiateService(debouncedSearch),
    enabled: isSearching,
    staleTime: 15_000, // cache search results for 15s
    keepPreviousData: true, // keep showing old results while new ones load
  });

  const candidates = isSearching
    ? (searchData?.data ?? [])
    : (data?.data ?? []);

  // only show loading spinner on first load — not on background refetches
  const loading = isSearching
    ? searchLoading && !searchData
    : isLoading && !data;

  const fetchError = isSearching ? searchError : error;

  // ---- stable handlers via useCallback ----
  const deleteCandidateHandler = useCallback(
    async (id) => {
      const res = await deleteCandidate(id);
      if (!res?.success) return showError("Failed to delete candidate");
      showSuccess("Candidate deleted successfully");
      queryClient.invalidateQueries(["candidates"]);
      setEditCandidate(null);
    },
    [queryClient],
  );

  const updateCandidateHandler = useCallback(
    async (data) => {
      const res = await updateCandidate(
        data.id,
        data.active,
        data.candidate_name,
        data.email,
        data.phone,
        data.location,
        data.job_type,
        data.expected_ctc,
        data.current_ctc,
        data.gender,
        data.date_of_birth,
        data.experience,
        data.linkedin,
        data.notice_period_days,
        data.skills,
        data.description,
        data.newFiles?.resume,
        data.newFiles?.cover,
        data.newFiles?.portfolio,
        data.applications?.[0]?.id,
      );
      if (!res?.success) return showError("Failed to save changes");
      showSuccess("Saved changes successfully");
      queryClient.invalidateQueries(["candidates"]);
      setEditCandidate(null);
    },
    [queryClient],
  );

  const viewJobHandler = useCallback((candidateData) => {
    const job = candidateData?.job?.[0];
    const client = candidateData?.client?.[0];
    const application = candidateData?.applications?.[0];
    setSelectedJob({
      company_name: client?.company?.company_name,
      job_title: job?.job_name,
      status: application?.status || "Active",
      location: job?.location,
      job_type: job?.job_type,
      salary_range: job?.salary_min + " - " + job?.salary_max + " LPA",
      experience: job?.experience_years,
      applicants: job?.applicants_count,
      deadline: job?.deadline
        ? new Date(job.deadline).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : null,
      description: job?.description,
      requirements: job?.requirements || [],
      responsibilities: job?.responsibilities || [],
      benefits: job?.benefits || [],
    });
  }, []);

  if (fetchError)
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-red-500 text-sm">Failed to load candidates.</p>
      </div>
    );

  return (
    <>
      <div className="flex gap-4 justify-center items-center w-full p-4">
        <input
          className="bg-black/5 w-full rounded-md h-10 px-4 border border-transparent focus:border-black/30 focus:outline-none"
          placeholder="Search by name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-64">
          <p className="text-gray-500 text-sm">Loading candidates...</p>
        </div>
      ) : candidates.length === 0 ? (
        <div className="flex items-center justify-center min-h-64">
          <p className="text-gray-400 text-sm">
            {isSearching ? "No results found." : "No candidates submitted yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full p-4 overflow-y-scroll h-full pb-24">
          {candidates.map((value) => (
            <CandidateCard
              key={value.id}
              data={value}
              viewProfileHandler={setSelectedCandidate}
              editHandler={setEditCandidate}
              viewJobHandler={viewJobHandler}
            />
          ))}
        </div>
      )}

      {selectedCandidate && (
        <CandidateViewProfile
          data={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
      {editCandidate && (
        <EditCandidateOverlay
          data={editCandidate}
          onClose={() => setEditCandidate(null)}
          onSave={updateCandidateHandler}
          onDelete={deleteCandidateHandler}
        />
      )}
      {selectedJob && (
        <ViewJobDetailsOverlay
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </>
  );
};

export default SubmittedCandidateMain;
