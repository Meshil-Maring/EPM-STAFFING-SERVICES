import db from "../../config/db.js";

// ==========================================
//              JOB - GET
// ==========================================

// GET jobs by user_id
export const getJobsByUserId = async (user_id) => {
  try {
    const res = await db`SELECT * FROM jobs WHERE user_id = ${user_id}`;
    return res;
  } catch (err) {
    throw err;
  }
};

// GET all user job info
export const getAllUserJobInfo = async () => {
  try {
    const res = await db`SELECT * FROM Job_info`;
    return res[0];
  } catch (err) {
    throw err;
  }
};

// GET job overview
export const getJobOverviewService = async (job_id, page, per_page) => {
  const offset = (page - 1) * per_page;

  try {
    const [data, countResult] = await Promise.all([
      db`SELECT * FROM application_info WHERE job_id = ${job_id} LIMIT ${per_page} OFFSET ${offset}`,
      db`SELECT COUNT(*) FROM application_info WHERE job_id = ${job_id}`,
    ]);

    const total = parseInt(countResult[0].count);

    return {
      data,
      pagination: {
        total,
        page,
        per_page,
        total_pages: Math.ceil(total / per_page),
      },
    };
  } catch (err) {
    throw err;
  }
};

// ==========================================
//              JOB - INSERT
// ==========================================

// CREATE Job
export const createJob = async (jobData) => {
  const data = jobData;

  try {
    const result =
      await db`INSERT INTO jobs (active, urgent, job_name, job_type, salary_min, salary_max, experience_years, max_applications, deadline, description, user_id) VALUES (${data.active}, ${data.urgent}, ${data.job_name}, ${data.job_type}, ${data.salary_min}, ${data.salary_max}, ${data.experience_years}, ${data.max_applications}, ${data.deadline}, ${data.description}, ${data.user_id}) RETURNING *`;

    return result[0];
  } catch (err) {
    err;
    throw err;
  }
};

// ==========================================
//              JOB - UPDATE
// ==========================================

// UPDATE job by id
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

// ==========================================
//              JOB - DELETE
// ==========================================

// DELETE job by id
export const deleteByJobId = async (job_id) => {
  try {
    const res = await db`DELETE FROM jobs WHERE id = ${job_id} RETURNING *`;
    return res[0];
  } catch (err) {
    throw err;
  }
};

// ==========================================
//          JOB BENEFITS (CRUD)
// ==========================================

// INSERT job benefit
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

// GET job benefits
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

// UPDATE job benefits
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

// DELETE job benefits
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

// ==========================================
//          JOB CATEGORIES (CRUD)
// ==========================================

// INSERT job category
export const insertJobCategories = async (job_id, name) => {
  try {
    const res =
      await db`INSERT INTO job_categories (name, job_id) VALUES (${name}, ${job_id}) RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// GET job categories
export const getJobCategories = async (job_id) => {
  try {
    const res = await db`SELECT * FROM job_categories WHERE id = ${job_id}`;
    return res;
  } catch (err) {
    throw err;
  }
};

// UPDATE job categories
export const updateJobCategories = async (id, name) => {
  try {
    const res = await db`UPDATE job_categories 
    SET name = ${name}
    WHERE id = ${id} RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// DELETE job categories
export const deleteJobCategories = async (id) => {
  try {
    const res =
      await db`DELETE FROM job_categories WHERE id = ${id}RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// ==========================================
//      JOB REQUIREMENTS (CRUD)
// ==========================================

const insertJobRequirements = async (job_id, requirement) => {
  try {
    const res =
      await db`INSERT INTO job_requirements (requirement, job_id) VALUES (${requirement}, ${job_id}) RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

const getJobRequirements = async (job_id) => {
  try {
    const res =
      await db`SELECT * FROM job_requirements WHERE job_id = ${job_id}`;

    return res;
  } catch (err) {
    throw err;
  }
};

const updateJobRequirements = async (id, requirement) => {
  try {
    const res =
      await db`UPDATE job_requirements SET requirement = ${requirement} WHERE id = ${id} RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

const deleteJobRequirements = async (id) => {
  try {
    const res = await db`DELETE FROM job_requirements WHERE id = ${id}`;
  } catch (err) {
    throw err;
  }
};

// ==========================================
//    JOB RESPONSIBILITIES (CRUD)
// ==========================================

const insertJobResponsibilities = async (responsibility, job_id) => {
  try {
    const res =
      await db`INSERT INTO job_responsibilities (responsibility, job_id) VALUES (${responsibility}, ${job_id}) RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

const getJobResponsibilities = async (job_id) => {
  try {
    const res =
      await db`SELECT * FROM job_responsibilities WHERE job_id = ${job_id}`;

    return res;
  } catch (err) {
    throw err;
  }
};

const updateJobResponsibilities = async (id, responbility) => {
  try {
    const res =
      await db`UPDATE job_responsibilities SET responsibility = ${responbility} WEHERE id = ${id} RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

const deleteJobResponsibilities = async () => {
  try {
    const res =
      await db`DELETE FROM job_responsibilities WEHRE id = ${id} RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};
