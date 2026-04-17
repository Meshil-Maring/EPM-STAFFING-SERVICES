import { useState } from "react";
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
import { showError, showSuccess } from "../../../../../utils/toastUtils";

const SubmittedCandidateMain = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [editCandidate, setEditCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => getCandidateInfo(1),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-gray-500 text-sm">Loading candidates...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-red-500 text-sm">Failed to load candidates.</p>
      </div>
    );

  const candidates = data?.data || [];

  // ------- function --------------
  // delete candidate
  const deleteCandidateHandler = async (id) => {
    const res = await deleteCandidate(id);

    if (!res?.success) return showError("Failed to delete candidate");

    showSuccess("Candidate delete successfully");

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
      data.newFiles?.resume, // File object or null
      data.newFiles?.cover, // File object or null
      data.newFiles?.portfolio, // File object or null
      data.applications?.[0]?.id,
    );

    if (!res?.success) return showError("Failed to save changes");

    showSuccess("Saved changes successfully");
    queryClient.invalidateQueries(["candidates"]);
    setEditCandidate(null);
  };

  return (
    <>
      {candidates.length === 0 ? (
        <div className="flex items-center justify-center min-h-64">
          <p className="text-gray-400 text-sm">No candidates submitted yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full p-4 overflow-y-scroll h-full">
          {candidates?.map((value) => (
            <CandidateCard
              key={value.id}
              data={value}
              viewProfileHandler={setSelectedCandidate}
              editHandler={setEditCandidate}
              viewJobHandler={(candidateData) => {
                const job = candidateData?.job?.[0];
                const client = candidateData?.client?.[0];
                const application = candidateData?.applications?.[0];

                setSelectedJob({
                  company_name: client?.company?.company_name,
                  job_title: job?.job_name,
                  status: application?.status || "Active",
                  location: job?.location,
                  job_type: job?.job_type,
                  salary_range:
                    job?.salary_min + " - " + job?.salary_max + " LPA",
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
              }}
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
          onSave={(updated) => {
            updateCandidateHandler(updated);
          }}
          onDelete={(id) => {
            deleteCandidateHandler(id);
          }}
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
