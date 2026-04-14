import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import PositionRequirementsCard from "../../CommonLayouts/PositionRequirementsCard";
import { getJobOverviewInfo } from "../../common_function/job_overview";
import CandidateCard from "./ClientCard";
import AddCommentModal from "./AddComment"; // adjust path as needed

export const ClientJobOverviewMain = () => {
  const { job_id } = useParams();

  const [commentModal, setCommentModal] = useState({
    open: false,
    candidate: null,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["application_info"],
    queryFn: () => getJobOverviewInfo(job_id, 1),
  });

  const openModal = (candidateData) =>
    setCommentModal({ open: true, candidate: candidateData });

  const closeModal = () => setCommentModal({ open: false, candidate: null });

  return !isLoading ? (
    <div className="p-8 flex gap-4 flex-col h-full">
      <PositionRequirementsCard />

      <div className="overflow-y-auto flex-col gap-4">
        {data?.data?.data.map((item, index) => (
          <CandidateCard
            key={index}
            data={item}
            onAddComment={() => openModal(item)}
          />
        ))}
      </div>

      {commentModal.open && (
        <AddCommentModal
          candidate={commentModal.candidate}
          onClose={closeModal}
        />
      )}
    </div>
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      <p className="text-center">Loading...</p>
    </div>
  );
};
