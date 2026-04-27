import express from "express";
import multer from "multer";

import { uploadPdfController } from "../util/controller.js";
import { searchCandidateController } from "../controller/candidate.controller.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

// Base: api/candidates
router.post("/upload/pdf", upload.single("pdf"), uploadPdfController);

router.get("/search/candidate-name", searchCandidateController);

export default router;
