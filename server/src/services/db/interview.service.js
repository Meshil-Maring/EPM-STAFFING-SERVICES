import db from "../../config/db.js";

export const getInterviewPipeline = async (stage, id) => {
  try {
    const res =
      await db`SELECT * FROM interview_info WHERE user_id = ${id} AND stage= ${stage}`;

    return res;
  } catch (err) {
    throw err;
  }
};
