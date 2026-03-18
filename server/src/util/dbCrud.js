// INSERT SINGLE data
export const singleInsert = async (table_name, column_name, value, id) => {
  try {
    const res =
      await db`INSERT INTO ${db(table_name)} (${db(column_name)}) VALUES (${value}) WHERE ${id} RETURNING *`;

    return res;
  } catch (err) {
    throw err;
  }
};

export const multipleInsert = async (table_name, column_names, values, id) => {
  const rows = values.map((value) => ({
    [column_name]: value,
    id: id,
  }));

  try {
    const res =
      await db`INSERT INTO ${db(table_name)} ${db(column_names)} VALUES ${db(rows)}`;
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
export const updateData = async (id, table_name, column_name, value) => {
  try {
    const res =
      await db`UPDATE ${db(table_name)} SET ${db(column_name)} = ${value} WHERE id = ${id} RETURNING *`;

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
