import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import PositionRequirementsCard from "../../CommonLayouts/PositionRequirementsCard";
import CandidateCard from "../ClientCard/ClientCard";
import AddCommentModal from "../ClientCard/AddCommentModal";
import ScheduleInterviewModal from "../ClientCard/ScheduleInterviewModal";
import ReleaseOfferModal from "../ClientCard/ReleaseOfferModal";
import RejectCandidateModal from "../ClientCard/RejectCandidateModal";
import { getInterviewCandidate } from "./interviewPipeline";

const rounds = [
  { id: 1, label: "Round 1", description: "Preliminary" },
  { id: 2, label: "Round 2", description: "Semi-Final" },
  { id: 3, label: "Round 3", description: "Final" },
];

export const InterviewPipeline = () => {
  const { job_id } = useParams();
  const [active, setActive] = useState(1);
  const queryClient = useQueryClient();

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

  const { data, isLoading } = useQuery({
    queryKey: ["interviews", active],
    queryFn: () => getInterviewCandidate("round1"),
  });

  console.log(data);

  const refetchApplications = () =>
    queryClient.invalidateQueries({ queryKey: ["application_info"] });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 flex gap-4 flex-col h-full">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold">Interview pipeline</h2>

        <p>
          The interview pipeline tracks a candidate’s progress from application
          to final hiring decision.
        </p>
      </div>

      {/* Round index */}
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

      {data?.data?.data?.length > 0 ? (
        <div className="overflow-y-auto flex-col gap-4">
          {data.data.data.map((item, index) => (
            <CandidateCard
              key={index}
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
            />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">
          No Candidate is schedule for interview
        </p>
      )}

      {commentModal.open && (
        <AddCommentModal
          data={commentModal.candidate}
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
    </div>
  );
};
