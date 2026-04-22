import {
  getWithPageService,
  deleteByIdService,
  updateByIdService,
} from "../../../../../utils/server_until/service.js";
import { uploadPdfService } from "../../../../../services/candidate.service.js";

export const getCandidateInfo = async (page) => {
  const res = await getWithPageService("api/dr/get", "candidate_info", page);

  console.log("Candidate info", res);

  return res;
};

// router.delete("/delete/id/:table/:id", deleteController);

export const deleteCandidate = async (id) => {
  const res = await deleteByIdService("api/dr/delete/id", "candidates", id);

  return res;
};

//  update candidate
// router.patch("/update/id/:table/:id", updateByIdController);
export const updateCandidate = async (
  id,
  active,
  candidate_name,
  email,
  phone,
  location,
  job_type,
  expected_ctc,
  current_ctc,
  gender,
  date_of_birth,
  experience,
  linkedin,
  notice_period_days,
  skills,
  description,
  resumeFile,
  coverFile,
  portfolioFile,
  applicationId,
) => {
  // Step 1 — update core candidate fields
  const res = await updateByIdService(
    "api/dr/update/id",
    {
      active,
      candidate_name,
      email,
      phone,
      location,
      job_type: job_type?.toLowerCase(),
      expected_ctc,
      current_ctc,
      gender: gender?.toLowerCase(),
      date_of_birth,
      experience,
      linkedin,
      notice_period_days: parseInt(notice_period_days),
      description,
    },
    "candidates",
    id,
  );

  if (!res.success)
    return { success: false, message: "Failed to update candidate." };

  // Step 2 — only upload if it's a real File object (not a URL string)
  const isFile = (f) => f instanceof File;

  const fileUploads = [
    isFile(resumeFile) &&
      uploadPdfService(
        "api/candidates/upload/pdf",
        resumeFile,
        id,
        applicationId,
        "resumes",
      ),
    isFile(coverFile) &&
      uploadPdfService(
        "api/candidates/upload/pdf",
        coverFile,
        id,
        applicationId,
        "letters",
      ),
    isFile(portfolioFile) &&
      uploadPdfService(
        "api/candidates/upload/pdf",
        portfolioFile,
        id,
        applicationId,
        "portfolios",
      ),
  ].filter(Boolean);

  await Promise.all([
    skills
      ? updateByIdService(
          "api/dr/update/id",
          { skills },
          "candidate_skills",
          id,
        )
      : Promise.resolve(),
    ...fileUploads,
  ]);

  return {
    success: true,
    message: "Candidate updated successfully",
    data: res.data,
  };
};
