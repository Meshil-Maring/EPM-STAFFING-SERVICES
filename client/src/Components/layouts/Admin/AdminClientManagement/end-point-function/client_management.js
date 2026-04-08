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
  return data;
};

// follow and unfollow client => #Admin@2
// followed check follower_id or following_id
export const updatefollowClient = async (clientId, adminId, followed) => {
  const readyData = { follower_id: adminId, following_id: clientId };

  // user not follow
  if (!followed) {
    const res = await insertDataService(
      "api/dr/insert",
      "follow_users",
      readyData,
    );

    return res;
  } else {
    const res = await unfollowClientService(clientId, adminId);

    console.log("unfollow");
    // unfollow user
    // const res = await
  }
};

// add list or remove list ==> #Admin@3
// TODO: before call this function check job (fk user_id) = user_id (clientId same as user_id, in our data will get user_id use that id for clientId);

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

// submit candidate => #Admin@6
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
  skills, //object
  description,
  resumeFile,
  coverFile,
  portfolioFile,
) => {
  const readyCandidate = {
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
    experience,
  };

  console.log(readyCandidate);

  // CREATE new candidate
  const res = await insertDataService(
    "api/dr/insert",
    "candidates",
    readyCandidate,
  );

  console.log(res);

  if (!res.success) return { success: false };

  if (res.data.id) {
    const uploads = [];

    // insert application
    const application = await insertDataService(
      "api/dr/insert",
      "applications",
      {
        job_id: job_id,
        candidate_id: res.data.id,
      },
    );

    // add skill
    if (skills) {
      await insertDataService("api/dr/insert", "candidate_skills", {
        candidate_id: res.data.id, // candidate_id
        skills: skills,
      });
    }

    if (resumeFile && application.data.id) {
      uploads.push(
        uploadPdfService(
          "api/candidates/upload/pdf",
          resumeFile,
          res.data.id, // candidate id
          application.data.id, // application id
          "resumes",
        ),
      );
    }

    if (coverFile) {
      uploads.push(
        uploadPdfService(
          "api/candidates/upload/pdf",
          coverFile,
          res.data.id,
          application.data.id, // application id
          "letters",
        ),
      );
    }

    if (portfolioFile) {
      uploads.push(
        uploadPdfService(
          "api/candidates/upload/pdf",
          portfolioFile,
          res.data.id,
          application.data.id, // application id
          "portfolios",
        ),
      );
    }

    await Promise.all(uploads);
  }

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
    experience_years: experience_years,
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
