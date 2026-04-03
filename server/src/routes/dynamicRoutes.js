import express from "express";
import {
  insertController,
  getByIdController,
  getByUserIdController,
  updateByIdController,
  updateByColumnNameIdController,
  deleteController,
  getWithPageController,
} from "../util/controller.js";

const router = express.Router();

// BASE url : api/dr

/* 
==============================
            GET
==============================
*/

// This is for test again and again
router.get("/get/:table/:id", getByIdController);

router.get("/get/user-id/:table/:user_id", getByUserIdController);

// Get with page
router.get("/get/:table", getWithPageController);

/* 
==============================
        INSERT/POST
==============================
*/
router.post("/insert/:table", insertController);

/* 
==============================
        UPDATE
==============================
*/

// This is for test again
router.patch("/update/id/:table/:id", updateByIdController);

router.patch(
  "/update/id/:table/:column_name/:id",
  updateByColumnNameIdController,
);

/* 
==============================
        DELETE
==============================
*/
// BASE url : api/dr

router.delete("/delete/id/:table/:id", deleteController);

export default router;
