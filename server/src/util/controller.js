import { successResponse, errorResponse } from "./response.js";
import { supabase } from "../config/supabase.js";
import fs from "fs";

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

// ================================================
//                INSERT/POST
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

// upload pdf
export const uploadPdfController = async (req, res) => {
  try {
    const { folder_name, candidate_id, application_id } = req.body;
    const file = req.file;

    if (!file) return errorResponse(res, "File not found!", 400);
    if (!candidate_id)
      return errorResponse(res, "Candidate ID is required", 400);

    const fileData = fs.readFileSync(file.path);

    const cleanName = file.originalname
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "");

    const fileName = `${folder_name}/${Date.now()}-${cleanName}`;

    const { error } = await supabase.storage
      .from("documents")
      .upload(fileName, fileData, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("documents")
      .getPublicUrl(fileName);

    fs.unlinkSync(file.path);

    const readyData = {
      candidate_id,
      application_id,
      file_name: folder_name,
      file_url: publicUrlData.publicUrl,
      file_type: file.mimetype,
    };

    console.log(readyData);

    // ← upsert instead of insert
    const { error: dbError } = await supabase
      .from("candidate_documents")
      .upsert(readyData, {
        onConflict: "candidate_id, file_name", // update if same candidate + folder
      });

    if (dbError) {
      await supabase.storage.from("documents").remove([fileName]);
      return errorResponse(res, "DB insert failed", 500, dbError.message);
    }

    return successResponse(
      res,
      "Upload successfully",
      publicUrlData.publicUrl,
      200,
    );
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Upload failed", 500, err.message);
  }
};

// ================================================
//                  GET
// ================================================

// GET : Fetching all data
export const getAllController = async (req, res) => {
  const { table } = req.params;

  try {
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
  const { table } = req.params;
  const page = parseInt(req.query.page);
  const offset = (page - 1) * 10;

  try {
    const result = await getAllWithPage(table, 10, offset);

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
    const result = await updateById(table, id, req.body);

    return successResponse(res, "Update successfully", result);
  } catch (err) {
    return errorResponse(res, "Update failed", 400, err);
  }
};

export const updateByUserIdController = async (req, res) => {
  const { table, user_id } = req.params;

  try {
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
    const result = await deleteData(id, table);

    return successResponse(res, "Deleted successfully", result, 200);
  } catch (err) {
    return errorResponse(res, "Delete failed", 400, err);
  }
};
