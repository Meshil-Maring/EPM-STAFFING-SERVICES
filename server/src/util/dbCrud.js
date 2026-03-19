import db from "../config/db.js";

// INSERT multiple Column
export const insertData = async (table_name, dataArray) => {
  try {
    const res = await db`
      INSERT INTO ${db(table_name)} ${db(dataArray)}
      RETURNING *
    `;
    return res;
  } catch (err) {
    throw err;
  }
};
// GET data
export const getData = async (id, table_name) => {
  try {
    const res = await db`SELECT * FROM ${db(table_name)} WHERE id = ${id}`;

    return res;
  } catch (err) {
    throw err;
  }
};

// UPDATE single data
export const updateData = async (id, table_name, data) => {
  try {
    const res =
      await db`UPDATE ${db(table_name)} SET ${db(data)} WHERE id = ${id} RETURNING *`;

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
