import {
  getClientManagementService,
  unfollowClientService,
  removeListService,
} from "../../../../../services/client_management.server";
import { insertDataService } from "../../../../../services/dynamic.service";

import {
  deleteByIdService,
  updateByIdService,
  updateByUserIdService,
  updateByColumnNameIdService,
} from "../../../../../utils/server_until/service";

import { uploadPdfService } from "../../../../../services/candidate.service";

// Before fetching data read in figma first

// Get client info => #Admin@1
export const getClientManagementData = async (page = 1) => {
  const data = await getClientManagementService(page);

  console.log(data);
  return data;
};

// follow and unfollow client => #Admin@2
// followed check follower_id or following_id
export const updateFollowClient = async (clientId, adminId, followed) => {
  if (!clientId || !adminId) {
    throw new Error("clientId and adminId are required");
  }

  if (!followed) {
    const readyData = {
      follower_id: adminId,
      following_id: clientId,
    };

    const res = await insertDataService(
      "api/dr/insert",
      "follow_clients",
      readyData,
    );

    if (res?.success) {
      return { success: true, message: "Followed Client" };
    }

    return { success: false, message: "Failed to follow client" };
  }

  const res = await unfollowClientService(clientId, adminId);

  console.log(res);

  if (res?.success) {
    return { success: true, message: "Unfollowed client" };
  }

  return { success: false, message: "Failed to unfollow client" };
};

// add list or remove list ==> #Admin@3
// before call this function check job (fk user_id) = user_id (clientId same as user_id, in our data will get user_id use that id for clientId);

export const updateListJob = async (jobId, clientId, listed = false) => {
  const readyData = { job_id: jobId, client_id: clientId };

  // job is not listed
  if (!listed) {
    const res = await insertDataService(
      // unfollow user
      "api/dr/insert",
      "listed_jobs",
      readyData,
    );

    return res;
  } else {
    const res = await removeListService(jobId, clientId);
    return res;
  }
};

// delete client ==> #Admin@4
export const deleteClient = async (clientId) => {
  console.log(clientId);
  const res = await deleteByIdService("api/dr/delete/id", "users", clientId);

  return res;
};

// save client info ==> #Admin@5
export const saveClients = async (
  clientId,
  companyName,
  description,
  cin,
  email,
  phone,
  street,
  city,
  state,
  pin_code,
) => {
  console.log(clientId);
  const company = await updateByUserIdService(
    "api/dr/update/userId",
    {
      company_name: companyName,
      registration_number: cin,
      description: description,
    },
    "company_info",
    clientId,
  );

  const address = await updateByUserIdService(
    "api/dr/update/userId",
    { street: street, city: city, state: state, pin_code: pin_code },
    "user_address",
    clientId,
  );

  const contact = await updateByUserIdService(
    "api/dr/update/userId",
    {
      email: email,
      phone: phone,
    },
    "user_contacts",
    clientId,
  );

  return { company, address, contact };
};

/*
  ====================================
            CANDIDATE
  ====================================

*/

export const submitCandidates = async (
  job_id,
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
) => {
  // Step 1 — create candidate (must be first, we need the ID)
  const res = await insertDataService("api/dr/insert", "candidates", {
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

  if (!res.success)
    return { success: false, message: "This email is already in use." };

  const candidateId = res.data.id;
  if (!candidateId)
    return { success: false, message: "Candidate ID missing after insert." };

  // Step 2 — application + skills in parallel (neither depends on the other)
  const [application] = await Promise.all([
    insertDataService("api/dr/insert", "applications", {
      job_id,
      candidate_id: candidateId,
    }),
    skills
      ? insertDataService("api/dr/insert", "candidate_skills", {
          candidate_id: candidateId,
          skills,
        })
      : Promise.resolve(),
  ]);

  if (!application?.data?.id)
    return { success: false, message: "Failed to create application." };

  const applicationId = application.data.id;

  // Step 3 — all file uploads in parallel
  const fileUploads = [
    resumeFile &&
      uploadPdfService(
        "api/candidates/upload/pdf",
        resumeFile,
        candidateId,
        applicationId,
        "resumes",
      ),
    coverFile &&
      uploadPdfService(
        "api/candidates/upload/pdf",
        coverFile,
        candidateId,
        applicationId,
        "letters",
      ),
    portfolioFile &&
      uploadPdfService(
        "api/candidates/upload/pdf",
        portfolioFile,
        candidateId,
        applicationId,
        "portfolios",
      ),
  ].filter(Boolean);

  if (fileUploads.length > 0) await Promise.all(fileUploads);

  return {
    success: true,
    message: "Candidate submitted successfully",
    data: res.data,
  };
};

// save edit Job => #admin@7
export const saveEditJob = async (
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
  responsibilities, // Object
  requirements, // Object
  benefits, // Object
) => {
  // Handling form superbase timestamp
  const toSupabaseTimestamp = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    if (isNaN(date)) return null;
    return date.toISOString();
  };

  const toActive = (data) => {
    if (data == "Active") {
      return true;
    } else return false;
  };

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

  console.log(readyJobs);

  try {
    await updateByIdService("api/dr/update/id", readyJobs, "jobs", job_id);

    await updateByColumnNameIdService(
      "api/dr/update/id",
      { requirements: requirements },
      "job_requirements",
      "job_id",
      job_id,
    );

    await updateByColumnNameIdService(
      "api/dr/update/id",
      { responsibilities: responsibilities },
      "job_responsibilities",
      "job_id",
      job_id,
    );

    await updateByColumnNameIdService(
      "api/dr/update/id",
      { benefits: benefits },
      "job_benefits",
      "job_id",
      job_id,
    );
  } catch (error) {
    console.error("Failed to save job:", error);
    return { success: false, message: "Failed to save job" };
  }
};
