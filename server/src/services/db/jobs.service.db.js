import db from "../../config/db.js";

// CREATE Job
export const createJob = async (jobData) => {
  const data = jobData;

  try {
    const result =
      await db`INSERT INTO jobs (active, urgent, job_name, job_type, salary_min, salary_max, experience_years, max_applications, deadline, description, user_id) VALUES (${data.active}, ${data.urgent}, ${data.job_name}, ${data.job_type}, ${data.salary_min}, ${data.salary_max}, ${data.experience_years}, ${data.max_applications}, ${data.deadline}, ${data.description}, ${data.user_id}) RETURNING *`;

    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// GET jobs by user_id
export const getJobsByUserId = async (user_id) => {
  try {
    const res = await db`SELECT * FROM jobs WHERE user_id = ${user_id}`;

    return res;
  } catch (err) {
    throw err;
  }
};

// UPDATE: update jobs by user id
export const updateByJobId = async (job_id, data) => {
  try {
    const res = await db`UPDATE jobs 
    SET
      active = ${data.active},
      urgent = ${data.urgent},
      job_name = ${data.job_name},
      job_type = ${data.job_type},
      salary_min = ${data.salary_min},
      salary_max = ${data.salary_max},
      experience_years = ${data.experience_years},
      max_applications = ${data.max_applications},
      description = ${data.description},
      updated_at = NOW()

    WHERE id = ${job_id} RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// DELETE : delete the job
export const deleteByJobId = async (job_id) => {
  try {
    const res = await db`DELETE FROM jobs WHERE id = ${job_id} RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

//  =====================================
//  Job benefits
//  =====================================

// INSERT: job benefits by job id
export const insertJobBenefits = async (job_id, benefit) => {
  try {
    const res = await db`INSERT INTO job_benefits (benefit, job_id) 
      VALUES (${benefit}, ${job_id}) 
      RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// GET: fetching job benefits by job benefits id
export const getJobBenefits = async (job_id) => {
  try {
    const res = await db`
      SELECT * FROM job_benefits 
      WHERE id = ${job_id}
    `;

    return res;
  } catch (err) {
    throw err;
  }
};

// UPDATE: update job benefits by job benefits id
export const updateJobBenefits = async (id, benefit) => {
  try {
    const res = await db`
      UPDATE job_benefits 
      SET benefit = ${benefit}
      WHERE id = ${id} 
      RETURNING *
    `;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// DELETE: delete job benefits by job benefits id
export const deleteJobBenefits = async (id) => {
  try {
    const res = await db`
      DELETE FROM job_benefits 
      WHERE id = ${id} 
      RETURNING *
    `;

    return res[0];
  } catch (err) {
    throw err;
  }
};

//  =====================================
//  Job Categories
//  =====================================

// INSERT : job categories
export const insertJobCategories = async (job_id, name) => {
  try {
    const res =
      await db`INSERT INTO job_categories (name, job_id) VALUES (${name}, ${job_id}) RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// GET: job categories
export const getJobCategories = async (job_id) => {
  try {
    const res = await db`SELECT * FROM job_categories WHERE id = ${job_id}`;

    return res;
  } catch (err) {
    throw err;
  }
};

// UPDATE: job categories
export const updateJobCategories = async (id, name) => {
  try {
    const res = await db`UPDATE job_categories 
    SET
      name = ${name}
    WHERE id = ${id} RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// DELETE : job categories
export const deleteJobCategories = async (id) => {
  try {
    const res =
      await db`DELETE FROM job_categories WHERE id = ${id}RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

//  =====================================
//  Job requirements
//  =====================================

// INSERT : job requirements
const insertJobRequirements = async (job_id, requirement) => {
  try {
    const res =
      await db`INSERT INTO job_requirements (requirement, job_id) VALUES (${requirement}, ${job_id}) RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// GET: job requirements
const getJobRequirements = async (job_id) => {
  try {
    const res =
      await db`SELECT * FROM job_requirements WHERE job_id = ${job_id}`;

    return res;
  } catch (err) {
    throw err;
  }
};

// UPDATE: job requirements
const updateJobRequirements = async (id, requirement) => {
  try {
    const res =
      await db`UPDATE job_requirements SET requirement = ${requirement} WHERE id = ${id} RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// DELETE: job requirements
const deleteJobRequirements = async (id) => {
  try {
    const res = await db`DELETE FROM job_requirements WHERE id = ${id}`;
  } catch (err) {
    throw err;
  }
};

//  =====================================
//  Job responsibilities
//  =====================================

// INSERT: Job responsibilities
const insertJobResponsibilities = async (responsibility, job_id) => {
  try {
    const res =
      await db`INSERT INTO job_responsibilities (responsibility, job_id) VALUES (${responsibility}, ${job_id}) RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// GET: job responsibilities
const getJobResponsibilities = async (job_id) => {
  try {
    const res =
      await db`SELECT * FROM job_responsibilities WHERE job_id = ${job_id}`;

    return res;
  } catch (err) {
    throw err;
  }
};

// UPDATE: job requirements
const updateJobResponsibilities = async (id, responbility) => {
  try {
    const res =
      await db`UPDATE job_responsibilities SET responsibility = ${responbility} WEHERE id = ${id} RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// DELETE: job requirements
const deleteJobResponsibilities = async () => {
  try {
    const res =
      await db`DELETE FROM job_responsibilities WEHRE id = ${id} RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// get user all job info
export const getAllUserJobInfo = async () => {
  try {
    const res = await db`SELECT * FROM Job_info`;

    return res[0];
  } catch (err) {
    throw err;
  }
};
