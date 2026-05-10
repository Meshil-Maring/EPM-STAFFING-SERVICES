import { insertDataService } from '../../../api/features/dynamic.service';
import { uploadPdfService } from '../../../api/features/candidate.service';
import { updateByIdService, updateByColumnNameIdService } from '../../../shared/utils/server_until/service';

/**
 * Submit a new candidate with all details
 */
export const submitCandidateService = async (candidateData) => {
  const {
    job_id,
    user_id,
    active = true,
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
  } = candidateData;

  // Step 1: Create candidate
  const res = await insertDataService('api/dr/insert', 'candidates', {
    active,
    candidate_name,
    email,
    phone,
    location,
    job_type,
    expected_ctc,
    current_ctc,
    gender: gender?.toLowerCase(),
    date_of_birth,
    experience,
    linkedin,
    notice_period_days: parseInt(notice_period_days),
    description,
  });

  if (!res.success) {
    return { success: false, message: 'This email is already in use.' };
  }

  const candidateId = res.data.id;
  if (!candidateId) {
    return { success: false, message: 'Candidate ID missing after insert.' };
  }

  // Step 2: Create application and skills in parallel
  const [application] = await Promise.all([
    insertDataService('api/dr/insert', 'applications', {
      job_id,
      user_id,
      candidate_id: candidateId,
    }),
    skills
      ? insertDataService('api/dr/insert', 'candidate_skills', {
          candidate_id: candidateId,
          skills,
        })
      : Promise.resolve(),
  ]);

  if (!application?.data?.id) {
    return { success: false, message: 'Failed to create application.' };
  }

  const applicationId = application.data.id;

  // Step 3: Upload files in parallel
  const fileUploads = [
    resumeFile && uploadPdfService('api/candidates/upload/pdf', resumeFile, candidateId, applicationId, 'resumes'),
    coverFile && uploadPdfService('api/candidates/upload/pdf', coverFile, candidateId, applicationId, 'letters'),
    portfolioFile && uploadPdfService('api/candidates/upload/pdf', portfolioFile, candidateId, applicationId, 'portfolios'),
  ].filter(Boolean);

  if (fileUploads.length > 0) {
    await Promise.all(fileUploads);
  }

  return {
    success: true,
    message: 'Candidate submitted successfully',
    data: res.data,
  };
};

/**
 * Update existing candidate
 */
export const updateCandidateService = async (id, candidateData, applicationId) => {
  const {
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
  } = candidateData;

  // Step 1: Update core candidate fields
  const res = await updateByIdService(
    'api/dr/update/id',
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
    'candidates',
    id
  );

  if (!res.success) {
    return { success: false, message: 'Failed to update candidate.' };
  }

  // Step 2: Upload files only if they are File objects
  const isFile = (f) => f instanceof File;

  const fileUploads = [
    isFile(resumeFile) && uploadPdfService('api/candidates/upload/pdf', resumeFile, id, applicationId, 'resumes'),
    isFile(coverFile) && uploadPdfService('api/candidates/upload/pdf', coverFile, id, applicationId, 'letters'),
    isFile(portfolioFile) && uploadPdfService('api/candidates/upload/pdf', portfolioFile, id, applicationId, 'portfolios'),
  ].filter(Boolean);

  await Promise.all([
    skills ? updateByIdService('api/dr/update/id', { skills }, 'candidate_skills', id) : Promise.resolve(),
    ...fileUploads,
  ]);

  return {
    success: true,
    message: 'Candidate updated successfully',
    data: res.data,
  };
};

/**
 * Search candidates by name
 */
export const searchCandidateService = async (candidate_name) => {
  try {
    const { searchCandiateService } = await import('../../../api/features/candidate.service');
    const res = await searchCandiateService(candidate_name);
    return res;
  } catch (err) {
    return { success: false, message: err.message };
  }
};
