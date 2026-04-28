import db from "../config/db.js";

const allowedTables = [
  "candidate_comment",
  "candidates",
  "interviews",
  "job_benefits",
  "job_requirements",
  "job_responsibilities",
  "jobs",
  "offers_released",
  "users",
  "interview_info",
  "comments",
];
const allowedColumn = ["job_id", "application_id", "user_id", "stage"];

/*
=====================================
        INSERT
=====================================
*/

// INSERT
export const insertData = async (table_name, dataArray) => {
  console.log(table_name, dataArray);

  try {
    const res = await db`
      INSERT INTO ${db(table_name)} ${db(dataArray)}
      RETURNING *
    `;

    console.log(res);

    return res[0];
  } catch (err) {
    throw err;
  }
};

/*
=====================================
        GET
=====================================
*/

// GET: get data by id
export const getById = async (table_name, id) => {
  try {
    const res = await db`SELECT * FROM ${db(table_name)} WHERE id = ${id}`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// GET: fetching all data
export const getAllData = async (id, table_name) => {
  try {
    const res = await db`SELECT * FROM ${db(table_name)}`;

    return res;
  } catch (err) {
    throw err;
  }
};

// GET: get data by user id
export const getByUserId = async (user_id, table_name) => {
  console.log("Name: ", user_id, "Table", table_name);

  try {
    const res = await db`
      SELECT * 
      FROM ${db(table_name)} 
      WHERE user_id = ${user_id}
    `;

    return res.length ? res : [];
  } catch (err) {
    console.error("Error in getByUserId:", err);
    throw err;
  }
};

export const getAllWithPage = async (table_name, limit, offset) => {
  try {
    const res =
      await db`SELECT * FROM ${db(table_name)} LIMIT ${Number(limit)} OFFSET ${Number(offset)} `;

    return res;
  } catch (err) {
    throw err;
  }
};

export const getByColumnName = async (table, column, id) => {
  if (!allowedTables.includes(table)) {
    throw new Error("Invalid table name");
  }

  if (!allowedColumn.includes(column)) {
    throw new Error("Invalid column name");
  }

  try {
    const res =
      await db`SELECT * FROM ${db(table)} WHERE ${db(column)}  = ${id}`;

    return res;
  } catch (err) {
    console.log(err);

    throw err;
  }
};

// ================================================
//                  UPDATE
// ================================================

export const updateById = async (table, id, data) => {
  console.log(table, id, data);

  try {
    const res = await db`
    UPDATE ${db(table)}
    SET ${db(data)}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
    `;

    console.log(res);

    return res[0];
  } catch (err) {
    throw err;
  }
};

// UPDATE: by user_id
export const updateByUserId = async (table_name, user_id, data) => {
  console.log("Incoming:", { user_id, table_name, data });

  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined && v !== null),
  );

  if (Object.keys(cleanData).length === 0) {
    throw new Error("No fields to update");
  }

  try {
    const res = await db`
      UPDATE ${db(table_name)}
      SET ${db(cleanData, Object.keys(cleanData))}, updated_at = NOW()
      WHERE user_id = ${user_id}
      RETURNING *
    `;

    // console.log("DB Result:", res);

    return res[0];
  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  }
};

export const updateByColumnNameId = async (
  id,
  table_name,
  column_name,
  data,
) => {
  (id, table_name, column_name, data);

  if (!allowedColumn.includes(column_name)) {
    throw new Error("Invalid column name");
  }

  if (!allowedTables.includes(table_name)) {
    throw new Error("Invalid table name");
  }

  console.log(id, table_name, column_name, data);

  try {
    const res =
      await db`UPDATE ${db(table_name)} SET ${db(data)}, updated_at = NOW() WHERE ${db(column_name)} = ${id} RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// ================================================
//                  DELETE
// ================================================

// DELETE single data
export const deleteData = async (id, table_name) => {
  console.log(id, table_name);

  try {
    if (!allowedTables.includes(table_name)) {
      throw new Error("Invalid table name");
    }

    const res =
      await db`DELETE FROM ${db(table_name)} WHERE id = ${id} RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};
