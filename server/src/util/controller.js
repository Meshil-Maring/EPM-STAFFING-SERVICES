import { successResponse, errorResponse } from "./response.js";
import {
  insertData,
  getById,
  getAllData,
  getByUserId,
  updateById,
  updateByUserId,
  deleteData,
  updateByColumnNameId,
  getAllWithPage,
} from "./dbCrud.js";

const allowedTables = [
  "users",
  "jobs",
  "user_contacts",
  "company_info",
  "user_address",
  "job_requirements",
  "job_responsibilities",
  "job_benefits",
  "job_categories",
];

// ================================================
//                  INSERT
// ================================================

// INSERT : data
export const insertController = async (req, res) => {
  const { table } = req.params;

  try {
    const result = await insertData(table, req.body);

    return successResponse(res, "Created successfully", result, 201);
  } catch (err) {
    return errorResponse(res, "Create failed", 400, err);
  }
};

// ================================================
//                  GET
// ================================================

// GET : Fetching all data
export const getAllController = async (req, res) => {
  const { table } = req.params;

  try {
    if (!allowedTables.includes(table)) {
      return errorResponse(res, "Invalid table", 400);
    }

    const result = await getAllData(table);

    return successResponse(res, "Fetched successfully", result, 200);
  } catch (err) {
    return errorResponse(res, "Fetch failed", 400, err);
  }
};

// GET: get data by user id
export const getByUserIdController = async (req, res) => {
  const { table, user_id } = req.params;

  console.log("Table name: ", table, "User Id", user_id);

  try {
    const result = await getByUserId(user_id, table);

    return successResponse(res, "Fetched successfully", result, 200);
  } catch (err) {
    return errorResponse(res, "Fetch failed", 400, err);
  }
};

// GET: get data by id
export const getByIdController = async (req, res) => {
  const { table, id } = req.params;

  console.log(table, id);

  try {
    const result = await getById(table, id);

    return successResponse(res, "Fetched successfully", result, 200);
  } catch (err) {
    return errorResponse(res, "Fetch failed", 400, err);
  }
};

export const getWithPageController = async (req, res) => {
  console.log("Hello");

  const { table } = req.params;
  const page = parseInt(req.query.page);
  const offset = (page - 1) * 10;

  try {
    const result = await getAllWithPage(table, 10, offset);

    console.log("result: ", result);

    return successResponse(res, "Fetched succesffully", result, 200);
  } catch (err) {
    return errorResponse(res, "Fetch failed", 400, err);
  }
};

// ================================================
//                  UPDATE
// ================================================
export const updateByIdController = async (req, res) => {
  const { table, id } = req.params;

  try {
    if (!allowedTables.includes(table)) {
      return errorResponse(res, "Invalid table", 400);
    }

    const result = await updateById(table, id, req.body);

    return successResponse(res, "Update successfully", result);
  } catch (err) {
    return errorResponse(res, "Update failed", 400, err);
  }
};

export const updateByUserIdController = async (req, res) => {
  const { table, user_id } = req.params;

  try {
    if (!allowedTables.includes(table)) {
      return errorResponse(res, "Invalid table", 400);
    }

    const result = await updateByUserId(table, user_id, req.body);

    return successResponse(res, "Update successfully", result);
  } catch (err) {
    return errorResponse(res, "Update failed", 400, err);
  }
};

export const updateByColumnNameIdController = async (req, res) => {
  const { table, column_name, id } = req.params;

  try {
    const result = await updateByColumnNameId(id, table, column_name, req.body);

    return successResponse(res, "Update successfully", result, 200);
  } catch (err) {
    return errorResponse(res, "Update failed", 400, err);
  }
};

// ================================================
//                  DELETE
// ================================================

// DELETE: delete data
export const deleteController = async (req, res) => {
  const { table, id } = req.params;

  console.log("Delete Contoller", id, table);

  try {
    if (!allowedTables.includes(table)) {
      return errorResponse(res, "Invalid table", 400);
    }

    const result = await deleteData(id, table);

    return successResponse(res, "Deleted successfully", result, 200);
  } catch (err) {
    return errorResponse(res, "Delete failed", 400, err);
  }
};
