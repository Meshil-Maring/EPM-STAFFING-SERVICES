import {
  getWithPageService,
  deleteByIdService,
} from "../../../shared/utils/server_until/service";
import { updateCandidateService } from "./candidate.service";

export const getCandidateInfo = async (page) => {
  const res = await getWithPageService("api/dr/get", "candidate_info", page);
  return res;
};

export const deleteCandidate = async (id) => {
  const res = await deleteByIdService("api/dr/delete/id", "candidates", id);
  return res;
};

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
  return updateCandidateService(
    id,
    {
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
    },
    applicationId,
  );
};
