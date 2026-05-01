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

// ---- filter config ----
const FILTERS = [
  { label: "All", value: "all" },
  { label: "Offered", value: "offered" },
  { label: "Accepted", value: "accepted" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
];

// badge colours per status — matches your design system
const FILTER_STYLES = {
  all: {
    active: "bg-slate-800 text-white",
    inactive: "bg-slate-100 text-slate-600 hover:bg-slate-200",
  },
  offered: {
    active: "bg-blue-500 text-white",
    inactive: "bg-blue-50 text-blue-600 hover:bg-blue-100",
  },
  accepted: {
    active: "bg-emerald-500 text-white",
    inactive: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
  },
  pending: {
    active: "bg-amber-500 text-white",
    inactive: "bg-amber-50 text-amber-600 hover:bg-amber-100",
  },
  rejected: {
    active: "bg-red-500 text-white",
    inactive: "bg-red-50 text-red-600 hover:bg-red-100",
  },
};

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
  const [activeFilter, setActiveFilter] = useState("all");
  const debouncedSearch = useDebounce(searchInput, 600);
  const queryClient = useQueryClient();

  const isSearching = debouncedSearch.trim().length > 0;

  // ---- default candidates query ----
  const { data, isLoading, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => getCandidateInfo(1),
    enabled: !isSearching,
    staleTime: 30_000,
    keepPreviousData: true,
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
    staleTime: 15_000,
    keepPreviousData: true,
  });

  const rawCandidates = isSearching
    ? (searchData?.data ?? [])
    : (data?.data ?? []);

  // ---- apply status filter client-side ----
  const candidates =
    activeFilter === "all"
      ? rawCandidates
      : rawCandidates.filter(
          (c) => c.applications?.[0]?.status === activeFilter,
        );

  // ---- count badges per filter ----
  const counts = FILTERS.reduce((acc, f) => {
    acc[f.value] =
      f.value === "all"
        ? rawCandidates.length
        : rawCandidates.filter((c) => c.applications?.[0]?.status === f.value)
            .length;
    return acc;
  }, {});

  const loading = isSearching
    ? searchLoading && !searchData
    : isLoading && !data;

  const fetchError = isSearching ? searchError : error;

  // ---- handlers ----
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
      {/* ---- Search + Filter bar ---- */}
      <div className="flex flex-col gap-3 w-full px-4 pt-4">
        {/* Search */}
        <input
          className="bg-black/5 w-full rounded-md h-10 px-4 border border-transparent focus:border-black/30 focus:outline-none text-sm"
          placeholder="Search by name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        {/* Filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.value;
            const styles = FILTER_STYLES[f.value];
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                  isActive ? styles.active : styles.inactive
                }`}
              >
                {f.label}
                {/* count badge */}
                {counts[f.value] > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-black/10 text-inherit"
                    }`}
                  >
                    {counts[f.value]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---- Candidate grid ---- */}
      {loading ? (
        <div className="flex items-center justify-center min-h-64">
          <p className="text-gray-500 text-sm">Loading candidates...</p>
        </div>
      ) : candidates.length === 0 ? (
        <div className="flex items-center justify-center min-h-64">
          <p className="text-gray-400 text-sm">
            {isSearching
              ? "No results found."
              : activeFilter !== "all"
                ? `No ${activeFilter} candidates.`
                : "No candidates submitted yet."}
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
