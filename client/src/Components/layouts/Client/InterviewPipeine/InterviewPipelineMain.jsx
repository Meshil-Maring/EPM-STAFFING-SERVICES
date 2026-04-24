import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import PositionRequirementsCard from "../../CommonLayouts/PositionRequirementsCard";
import CandidateCard from "../CandidateCard/CandidateCard.jsx";
import AddCommentModal from "../CandidateCard/AddCommentModal.jsx";
import ScheduleInterviewModal from "../CandidateCard/ScheduleInterviewModal.jsx";
import ReleaseOfferModal from "../CandidateCard/ReleaseOfferModal.jsx";
import RejectCandidateModal from "../CandidateCard/RejectCandidateModal.jsx";
import CancelInterviewModal from "../CandidateCard/CancelInterviewModal.jsx";
import { getInterviewCandidate } from "./interviewPipeline";

const rounds = [
  { id: 1, label: "Round 1", description: "Preliminary", key: "round1" },
  { id: 2, label: "Round 2", description: "Semi-Final", key: "round2" },
  { id: 3, label: "Round 3", description: "Final", key: "round3" },
];

const transformInterview = (interview) => {
  const rawCandidate = interview.candidate_info?.[0] ?? {};
  const rawJob = interview.job_info?.[0] ?? {};

  // Application status ("offered", "accepted", "rejected", etc.)
  // Falls back to interview status if application record is missing
  const applicationStatus =
    rawCandidate.applications?.[0]?.status ?? interview.status;

  // Normalise notice_period field name expected by CandidateCard
  const candidate = {
    ...rawCandidate,
    notice_period: rawCandidate.notice_period_days ?? "—",
  };

  return {
    id: interview?.application_id,
    candidate: [candidate], // CandidateCard: data.candidate[0]
    jobs: [rawJob], // CandidateCard: data.jobs[0]
    status: applicationStatus,
    interviews: interview?.interviews,
    _raw: interview, // pass full record to modals if needed
  };
};

export const InterviewPipelineMain = () => {
  const { job_id } = useParams();
  const [active, setActive] = useState(1);
  const queryClient = useQueryClient();

  const [cancelModal, setCancelModal] = useState({
    open: false,
    candidate: null,
  });

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

  // Derive the round key ("round1" | "round2" | "round3") from active tab id
  const activeRoundKey = rounds.find((r) => r.id === active)?.key ?? "round1";

  const { data, isLoading } = useQuery({
    queryKey: ["interviews", activeRoundKey],
    queryFn: () => getInterviewCandidate(activeRoundKey),
  });

  /**
   * Transform raw API array → CandidateCard-compatible shape.
   * Memoised so it only re-runs when data changes.
   */
  const candidates = useMemo(() => {
    if (!Array.isArray(data?.data)) return [];
    return data.data.map(transformInterview);
  }, [data]);

  const refetchApplications = () => {
    return queryClient.invalidateQueries({ queryKey: ["interviews"] });
  };

  return (
    <div className="p-4 flex gap-4 flex-col h-full w-full">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold">Interview pipeline</h2>
        <p>
          The interview pipeline tracks a candidate's progress from application
          to final hiring decision.
        </p>
      </div>

      {/* Round tabs */}
      <div className="flex flex-col items-center gap-3 mt-4">
        <div className="relative flex items-center justify-between bg-white border border-zinc-200 rounded-full p-1 shadow-sm gap-1 w-96">
          {rounds.map((round) => (
            <button
              key={round.id}
              onClick={() => setActive(round.id)}
              className={`relative z-10 px-6 py-2 rounded-full text-md font-semibold transition-all duration-300 cursor-pointer
                ${
                  active === round.id
                    ? "bg-zinc-900 text-white shadow-md"
                    : "text-zinc-400 hover:text-zinc-700"
                }`}
            >
              {round.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-center">Loading...</p>
        </div>
      ) : candidates.length > 0 ? (
        <div className="overflow-y-auto flex-col gap-4">
          {candidates.map((item, index) => (
            <CandidateCard
              key={item._raw?.id ?? index}
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
            />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">
          No candidates scheduled for interview
        </p>
      )}

      {commentModal.open && (
        <AddCommentModal
          id={commentModal.candidate.id}
          candidateId={commentModal.candidate.candidate[0].id}
          candidateName={commentModal.candidate.candidate[0].candidate_name}
          onClose={() => {
            setCommentModal({ open: false, candidate: null });
            refetchApplications();
          }}
        />
      )}

      {scheduleModal.open && (
        <ScheduleInterviewModal
          candidate={scheduleModal.candidate}
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
          onClose={() => {
            setRejectModal({ open: false, candidate: null });
            refetchApplications();
          }}
        />
      )}

      {cancelModal.open && (
        <CancelInterviewModal
          candidate={cancelModal.candidate}
          onClose={() => {
            setCancelModal({ open: false, candidate: null });
            refetchApplications();
          }}
        />
      )}
    </div>
  );
};
