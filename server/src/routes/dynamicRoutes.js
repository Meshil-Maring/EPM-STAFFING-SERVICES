import express from "express";
import { insertController } from "../util/controller.js";

const router = express.Router();

// BASE url : api/dr
router.post("/insert/:table", insertController);

export default router;
