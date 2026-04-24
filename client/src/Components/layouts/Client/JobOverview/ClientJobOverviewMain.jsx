import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import PositionRequirementsCard from "../../CommonLayouts/PositionRequirementsCard";
import { getJobOverviewInfo } from "../../common_function/job_overview";
import CandidateCard from "../CandidateCard/CandidateCard.jsx";
import AddCommentModal from "./../CandidateCard/AddCommentModal";
import ScheduleInterviewModal from "./../CandidateCard/ScheduleInterviewModal";
import ReleaseOfferModal from "../CandidateCard/ReleaseOfferModal";
import RejectCandidateModal from "../CandidateCard/RejectCandidateModal";
import CancelInterviewModal from "../CandidateCard/CancelInterviewModal.jsx";

export const ClientJobOverviewMain = () => {
  const { job_id } = useParams();
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

  const [cancelModal, setCancelModal] = useState({
    open: false,
    candidate: null,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["application_info", job_id],
    queryFn: () => getJobOverviewInfo(job_id, 1),
    staleTime: 0,
    refetchOnMount: true,
  });

  const refetchApplications = () =>
    queryClient.invalidateQueries({ queryKey: ["application_info", job_id] });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 flex gap-4 flex-col h-full">
      <PositionRequirementsCard />

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
              onCancelInterview={() =>
                setCancelModal({ open: true, candidate: item })
              }
            />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">No Candidates are submitted</p>
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
