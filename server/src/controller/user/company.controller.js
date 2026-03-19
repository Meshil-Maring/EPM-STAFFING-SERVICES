import { insertData } from "../../util/dbCrud.js";
import { successResponse, errorResponse } from "../../util/response.js";

export const insertCompany = async (req, res) => {
  const data = req.body;

  try {
    const result = await insertData("company_info", data);

    return successResponse(
      res,
      "Insert company information successfully",
      result,
    );
  } catch (err) {
    return errorResponse(res, "Failed to insert company info", 500, err);
  }
};
