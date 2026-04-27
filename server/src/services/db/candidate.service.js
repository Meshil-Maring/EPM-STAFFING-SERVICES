import db from "../../config/db.js";

export const searchCandidate = async (candidate_name) => {
  try {
    const res =
      await db`SELECT * from application_info WHERE candidate_name ILIKE '%' || ${candidate_name} || '%'`;

    return res;
  } catch (err) {
    throw err;
  }
};
