import { useState, useMemo, useEffect } from "react";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useAuth } from "../../../../hooks/useAuth.js";
import PositionRequirementsCard from "../../CommonLayouts/PositionRequirementsCard";
import { getJobOverviewInfo, getJob } from "../../common_function/job_overview";
import CandidateCard from "../CandidateCard/CandidateCard.jsx";
import AddCommentModal from "./../CandidateCard/AddCommentModal";
import ScheduleInterviewModal from "./../CandidateCard/ScheduleInterviewModal";
import ReleaseOfferModal from "../CandidateCard/ReleaseOfferModal";
import RejectCandidateModal from "../CandidateCard/RejectCandidateModal";
import CancelInterviewModal from "../CandidateCard/CancelInterviewModal.jsx";
import CandidateDetailsModal from "../CandidateCard/CandidateDetailsModal.jsx";

// ---- filter config ----
const FILTERS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Interview", value: "interview" },
  { label: "Applied", value: "applied" },
  { label: "Offered", value: "offered" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
];

const FILTER_STYLES = {
  all: {
    active: "bg-slate-800 text-white",
    inactive: "bg-slate-100 text-slate-600 hover:bg-slate-200",
  },
  applied: {
    active: "bg-blue-600 text-white",
    inactive: "bg-amber-50 text-amber-600 hover:bg-amber-100",
  },
  pending: {
    active: "bg-amber-500 text-white",
    inactive: "bg-amber-50 text-amber-600 hover:bg-amber-100",
  },
  interview: {
    active: "bg-purple-500 text-white",
    inactive: "bg-purple-50 text-purple-600 hover:bg-purple-100",
  },
  offered: {
    active: "bg-blue-500 text-white",
    inactive: "bg-blue-50 text-blue-600 hover:bg-blue-100",
  },
  accepted: {
    active: "bg-emerald-500 text-white",
    inactive: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
  },
  rejected: {
    active: "bg-red-500 text-white",
    inactive: "bg-red-50 text-red-600 hover:bg-red-100",
  },
};

// ---- debounce hook ----
const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

export const ClientJobOverviewMain = () => {
  const { job_id } = useParams();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // ---- search + filter state ----
  const [searchInput, setSearchInput] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const debouncedSearch = useDebounce(searchInput);

  // ---- modal state ----
  const [commentModal, setCommentModal] = useState({
    open: false,
    candidate: null,
  });
  const [scheduleModal, setScheduleModal] = useState({
    open: false,
    candidate: null,
  });
  const [offerModal, setOfferModal] = useState({
    open: false,
    candidate: null,
  });
  const [rejectModal, setRejectModal] = useState({
    open: false,
    candidate: null,
  });
  const [cancelModal, setCancelModal] = useState({
    open: false,
    candidate: null,
  });

  const [detailsModal, setDetailsModal] = useState({
    open: false,
    candidate: null,
  });

  const [applicationsQuery, jobQuery] = useQueries({
    queries: [
      {
        queryKey: ["application_info", job_id],
        queryFn: () => getJobOverviewInfo(job_id, 1),
      },
      {
        queryKey: ["get_job", job_id],
        queryFn: () => getJob(job_id),
      },
    ],
  });

  const refetchApplications = () =>
    queryClient.invalidateQueries({ queryKey: ["application_info", job_id] });

  const isLoading = applicationsQuery.isLoading || jobQuery.isLoading;

  const jobData = jobQuery.data?.data;
  const applications = applicationsQuery.data?.data?.data ?? [];

  // ---- derived: counts per status (on raw data) ----
  const counts = useMemo(
    () =>
      FILTERS.reduce((acc, f) => {
        acc[f.value] =
          f.value === "all"
            ? applications.length
            : applications.filter((a) => a.status === f.value).length;
        return acc;
      }, {}),
    [applications],
  );

  // ---- derived: filtered + searched list ----
  const filteredApplications = useMemo(() => {
    let list = applications;

    // status filter
    if (activeFilter !== "all") {
      list = list.filter((a) => a.status === activeFilter);
    }

    // name search — candidate name is nested at candidate[0].candidate_name
    const query = debouncedSearch.trim().toLowerCase();
    if (query) {
      list = list.filter((a) =>
        a.candidate?.[0]?.candidate_name?.toLowerCase().includes(query),
      );
    }

    return list;
  }, [applications, activeFilter, debouncedSearch]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-center text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  const noResultsMessage = debouncedSearch.trim()
    ? "No candidates match your search."
    : activeFilter !== "all"
      ? `No ${activeFilter} candidates.`
      : "No candidates are submitted yet.";

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="p-8 pt-2 flex gap-4 flex-col h-full items-center w-4xl overflow-hidden">
        {/* ---- Sticky header: job card + search + filters ---- */}
        {jobData && (
          <div className="flex flex-col w-full gap-3 shrink-0 bg-black/3 border-2 border-blue/40 p-4 rounded-2xl">
            <PositionRequirementsCard data={jobData} />

            {/* Search */}
            <div className="flex flex-col gap-4">
              <input
                className="bg-white w-full rounded-md h-10 px-4 border border-transparent focus:border-black/30 focus:outline-none text-sm"
                placeholder="Search by candidate name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {/* Filter pills */}
              <div className="flex items-center gap-1">
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
          </div>
        )}

        {/* ---- Scrollable candidate list ---- */}
        {filteredApplications.length > 0 ? (
          <div className="w-full flex-1 min-h-0 overflow-y-auto flex flex-col gap-4">
            {filteredApplications.map((item, index) => (
              <div key={item.id ?? index} className="relative group">
                <CandidateCard
                  data={item}
                  onAddComment={() =>
                    setCommentModal({ open: true, candidate: item })
                  }
                  onScheduleInterview={() =>
                    setScheduleModal({ open: true, candidate: item })
                  }
                  onReleaseOffer={() =>
                    setOfferModal({ open: true, candidate: item })
                  }
                  onRejectCandidate={() =>
                    setRejectModal({ open: true, candidate: item })
                  }
                  onCancelInterview={() =>
                    setCancelModal({ open: true, candidate: item })
                  }
                  onViewDetails={() =>
                    setDetailsModal({ open: true, candidate: item })
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-10 text-gray-400 text-sm">
            {noResultsMessage}
          </p>
        )}

        {/* ---- Modals (unchanged) ---- */}
        {commentModal.open && (
          <AddCommentModal
            id={commentModal.candidate.id}
            candidateId={commentModal.candidate.candidate[0].id}
            candidateName={commentModal.candidate.candidate[0].candidate_name}
            job={jobData}
            onClose={() => {
              setCommentModal({ open: false, candidate: null });
              refetchApplications();
            }}
          />
        )}

        {scheduleModal.open && (
          <ScheduleInterviewModal
            candidate={scheduleModal.candidate}
            user_id={user?.id}
            job={jobData}
            onClose={() => {
              setScheduleModal({ open: false, candidate: null });
              refetchApplications();
            }}
          />
        )}

        {offerModal.open && (
          <ReleaseOfferModal
            application={offerModal.candidate}
            onClose={() => {
              setOfferModal({ open: false, candidate: null });
              refetchApplications();
            }}
          />
        )}

        {rejectModal.open && (
          <RejectCandidateModal
            application={rejectModal.candidate}
            job={jobData}
            onClose={() => {
              setRejectModal({ open: false, candidate: null });
              refetchApplications();
            }}
          />
        )}

        {cancelModal.open && (
          <CancelInterviewModal
            candidate={cancelModal.candidate}
            interview={cancelModal.candidate.interviews[0]}
            job={jobData}
            onClose={() => {
              setCancelModal({ open: false, candidate: null });
              refetchApplications();
            }}
          />
        )}

        {detailsModal.open && (
          <CandidateDetailsModal
            application={detailsModal.candidate}
            job={jobData}
            onClose={() => setDetailsModal({ open: false, candidate: null })}
          />
        )}
      </div>
    </div>
  );
};
