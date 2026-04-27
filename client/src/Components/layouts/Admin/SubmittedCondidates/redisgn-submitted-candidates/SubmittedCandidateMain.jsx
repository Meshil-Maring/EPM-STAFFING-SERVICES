import { useState, useRef, useCallback, useEffect } from "react";
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

const normalizeSearchData = (items = []) =>
  items.map((item) => ({
    ...item.candidate?.[0],
    id: item.candidate?.[0]?.id,
    job: item.jobs,
    applications: [
      {
        id: item.id,
        status: item.status,
      },
    ],
    comments: item.comments,
    interviews: item.interviews,
  }));

const SubmittedCandidateMain = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [editCandidate, setEditCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceTimer = useRef(null);
  const queryClient = useQueryClient();

  const isSearching = debouncedSearch.trim().length > 0;

  // ---- default candidates query ----
  const { data, isLoading, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => getCandidateInfo(1),
    enabled: !isSearching,
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
  });

  // ---- derived state ----
  const candidates = isSearching
    ? normalizeSearchData(searchData?.data ?? [])
    : (data?.data ?? []);

  const loading = isSearching ? searchLoading && !searchData : isLoading;
  const fetchError = isSearching ? searchError : error;

  // ---- handlers ----
  const searchHandler = useCallback((e) => {
    const value = e.target.value;
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 400);
  }, []);

  const deleteCandidateHandler = async (id) => {
    const res = await deleteCandidate(id);
    if (!res?.success) return showError("Failed to delete candidate");
    showSuccess("Candidate deleted successfully");
    queryClient.invalidateQueries(["candidates"]);
    setEditCandidate(null);
  };

  const updateCandidateHandler = async (data) => {
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
  };

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

  // ---- cleanup debounce on unmount ----
  useEffect(() => {
    return () => clearTimeout(debounceTimer.current);
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
          onChange={searchHandler}
          defaultValue=""
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full p-4 overflow-y-scroll h-full">
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
          onSave={(updated) => updateCandidateHandler(updated)}
          onDelete={(id) => deleteCandidateHandler(id)}
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
