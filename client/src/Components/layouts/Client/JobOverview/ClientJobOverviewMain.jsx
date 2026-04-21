import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import PositionRequirementsCard from "../../CommonLayouts/PositionRequirementsCard";
import { getJobOverviewInfo } from "../../common_function/job_overview";
import CandidateCard from "./../ClientCard/ClientCard";
import AddCommentModal from "./../ClientCard/AddCommentModal";
import ScheduleInterviewModal from "./../ClientCard/ScheduleInterviewModal";
import ReleaseOfferModal from "../ClientCard/ReleaseOfferModal";
import RejectCandidateModal from "../ClientCard/RejectCandidateModal";
import { showError } from "../../../../utils/toastUtils";

export const ClientJobOverviewMain = () => {
  // local job state
  const [job, setJob] = useState([]);
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["application_info", job_id],
    queryFn: () => getJobOverviewInfo(job_id, 1),
    staleTime: 0,
    refetchOnMount: true,
  });

  const refetchApplications = () =>
    queryClient.invalidateQueries({ queryKey: ["application_info", job_id] });

  useEffect(() => {
    if (data) {
      console.log(data);
      setJob(data?.data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      showError(`Error: ${error}`);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  console.log(job);

  return (
    <div className="p-8 flex gap-4 flex-col h-full">
      <PositionRequirementsCard job_card={job} />

      {job?.length > 0 ? (
        <div className="overflow-y-auto flex-col gap-4">
          {job.map((item, index) => (
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
        <p className="text-center mt-10">No Candidates are submitted</p>
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
