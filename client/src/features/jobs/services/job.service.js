import { updateByIdService, updateByColumnNameIdService } from '../../../shared/utils/server_until/service';

/**
 * Convert date string to Supabase timestamp format
 */
const toSupabaseTimestamp = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (isNaN(date)) return null;
  return date.toISOString();
};

/**
 * Convert status string to boolean
 */
const toActive = (data) => {
  return data === 'Active';
};

/**
 * Save/update job details
 */
export const saveEditJob = async (jobData) => {
  const {
    job_id,
    active,
    urgent,
    job_name,
    job_type,
    salary_min,
    salary_max,
    experience_years,
    max_applications,
    deadline,
    description,
    location,
    responsibilities,
    requirements,
    benefits,
  } = jobData;

  const readyJobs = {
    active: toActive(active),
    urgent,
    job_name,
    job_type,
    salary_min: Number(salary_min) ?? null,
    salary_max: Number(salary_max) ?? null,
    experience: experience_years,
    max_applications: Number(max_applications),
    deadline: toSupabaseTimestamp(deadline),
    description,
    location: location,
  };

  try {
    await updateByIdService('api/dr/update/id', readyJobs, 'jobs', job_id);

    await updateByColumnNameIdService(
      'api/dr/update/id',
      { requirements: requirements },
      'job_requirements',
      'job_id',
      job_id
    );

    await updateByColumnNameIdService(
      'api/dr/update/id',
      { responsibilities: responsibilities },
      'job_responsibilities',
      'job_id',
      job_id
    );

    await updateByColumnNameIdService(
      'api/dr/update/id',
      { benefits: benefits },
      'job_benefits',
      'job_id',
      job_id
    );

    return { success: true, message: 'Job saved successfully' };
  } catch (error) {
    console.error('Failed to save job:', error);
    return { success: false, message: 'Failed to save job' };
  }
};
