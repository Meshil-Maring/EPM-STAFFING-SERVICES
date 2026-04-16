import express from "express";
import multer from "multer";

import { uploadPdfController } from "../util/controller.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

// Base: api/candidates
router.post("/upload/pdf", upload.single("pdf"), uploadPdfController);

export default router;
