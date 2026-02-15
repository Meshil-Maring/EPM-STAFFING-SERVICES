import db from "../../config/db";

export const createJob = async (jobData) => {
  const data = jobData;

  try {
    const result = db`INSERT INTO jobs (company_id, update_at, job_name, active, location, job_type, salary_range, applicants, experience, application_deadline, job_description, requirements, responsibilities, benefits_perks, urgent) VALUES (${data.company_id}, ${update_at}, ${data.job_name}, ${data.active}, ${data.location}, ${data.job_type}, ${data.salary_range}, ${data.applicants}, ${data.experience}, ${data.application_deadline}, ${data.description}, ${data.requirements}, ${data.responsibilities}, ${data.benefits_perks}, ${data.urgent}) RETURNING *`;

    return result[0];
  } catch (err) {
    console.log("Their is something went wrong");
  }
};
