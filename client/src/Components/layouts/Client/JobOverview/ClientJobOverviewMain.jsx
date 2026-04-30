import { useState } from "react";
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

  const { user } = useAuth();

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

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  const jobData = jobQuery.data?.data;
  const applications = applicationsQuery.data?.data?.data ?? [];

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="p-8 flex gap-4 flex-col h-full items-center w-4xl overflow-hidden">
        {/* Sticky — does not scroll */}
        {jobData && (
          <div className="w-full shrink-0">
            <PositionRequirementsCard data={jobData} />
          </div>
        )}

        {/* Scrollable list */}
        {applications.length > 0 ? (
          <div className="w-full flex-1 min-h-0 overflow-y-auto flex flex-col gap-4">
            {applications.map((item, index) => (
              <CandidateCard
                key={item.id ?? index}
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
            interview={cancelModal.candidate.interviews[0]}
            onClose={() => {
              setCancelModal({ open: false, candidate: null });
              refetchApplications();
            }}
          />
        )}
      </div>
    </div>
  );
};
