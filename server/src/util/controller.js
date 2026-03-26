import { successResponse, errorResponse } from "./response.js";
import {
  insertData,
  getById,
  getAllData,
  getByUserId,
  updateById,
  updateByUserId,
  deleteData,
} from "./dbCrud.js";

const allowedTables = [
  "users",
  "jobs",
  "user_contacts",
  "company_info",
  "user_address",
];

// ================================================
//                  INSERT
// ================================================

// INSERT : data
export const createController = async (req, res) => {
  const { table } = req.params;

  try {
    if (!allowedTables.includes(table) && table !== "users") {
      return errorResponse(res, "Invalid table", 400);
    }

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

  try {
    if (!allowedTables.includes(table)) {
      return errorResponse(res, "Invalid table", 400);
    }

    const result = await getByUserId(user_id, table);

    return successResponse(res, "Fetched successfully", result, 200);
  } catch (err) {
    return errorResponse(res, "Fetch failed", 400, err);
  }
};

// GET: get data by id
export const getByIdController = async (req, res) => {
  const { table, id } = req.params;

  try {
    if (!allowedTables.includes(table)) {
      return errorResponse(res, "Invalid table", 400);
    }

    const result = await getById(table, id);

    return successResponse(res, "Fetched successfully", result, 200);
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

// ================================================
//                  DELETE
// ================================================
// DELETE: delete data
export const deleteController = async (req, res) => {
  const { table, id } = req.params;

  try {
    if (!allowedTables.includes(table)) {
      return errorResponse(res, "Invalid table", 400);
    }

    const result = await deleteData(table, id);

    return successResponse(res, "Deleted successfully", result, 200);
  } catch (err) {
    return errorResponse(res, "Delete failed", 400, err);
  }
};

// router.post("/:table", createController);
// router.get("/:table", getAllController);
// router.get("/:table/:id", getByIdController);
// router.patch("/:table/:id", updateController);
// router.delete("/:table/:id", deleteController);
