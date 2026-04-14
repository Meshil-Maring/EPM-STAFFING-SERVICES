import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import PositionRequirementsCard from "../../CommonLayouts/PositionRequirementsCard";
import { getJobOverviewInfo } from "../../common_function/job_overview";
import CandidateCard from "./ClientCard";
import AddCommentModal from "./AddCommentModal";
import ScheduleInterviewModal from "./ScheduleInterviewModal";
import ReleaseOfferModal from "./ReleaseOfferModal";
import RejectCandidateModal from "./RejectCandidateModal";

export const ClientJobOverviewMain = () => {
  const { job_id } = useParams();

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
    queryKey: ["application_info"],
    queryFn: () => getJobOverviewInfo(job_id, 1),
  });

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

      <div className="overflow-y-auto flex-col gap-4">
        {data?.data?.data.map((item, index) => (
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

      {commentModal.open && (
        <AddCommentModal
          candidate={commentModal.candidate}
          onClose={() => setCommentModal({ open: false, candidate: null })}
        />
      )}

      {scheduleModal.open && (
        <ScheduleInterviewModal
          candidate={scheduleModal.candidate}
          onClose={() => setScheduleModal({ open: false, candidate: null })}
        />
      )}

      {offerModal.open && (
        <ReleaseOfferModal
          candidate={offerModal.candidate}
          onClose={() => setOfferModal({ open: false, candidate: null })}
        />
      )}

      {rejectModal.open && (
        <RejectCandidateModal
          candidate={rejectModal.candidate}
          onClose={() => setRejectModal({ open: false, candidate: null })}
        />
      )}
    </div>
  );
};
