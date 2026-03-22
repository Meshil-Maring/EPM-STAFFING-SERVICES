import db from "../config/db.js";

// INSERT
export const insertData = async (table_name, dataArray) => {
  try {
    const res = await db`
      INSERT INTO ${db(table_name)} ${db(dataArray)}
      RETURNING *
    `;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// GET: get data by id
export const getById = async (id, table_name) => {
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
  try {
    const res =
      await db`SELECT * FROM ${db(table_name)} WHERE user_id = ${user_id}`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

export const updateById = async (table, id, data) => {
  try {
    const res = await db`
    UPDATE ${db(table)}
    SET ${db(data)}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
    `;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// UPDATE: by user_id
export const updateByUserId = async (user_id, table_name, data) => {
  try {
    const res =
      await db`UPDATE ${db(table_name)} SET ${db(data)}, updated_at = NOW() WHERE user_id = ${user_id} RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};

// DELETE single data
export const deleteData = async (id, table_name) => {
  try {
    const res =
      await db`DELETE FROM ${db(table_name)} WHERE id = ${id} RETURNING *`;

    return res[0];
  } catch (err) {
    throw err;
  }
};
