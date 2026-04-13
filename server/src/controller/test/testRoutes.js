import express from "express";
import { testController } from "./testController.js";

const router = express.Router();

router.get("/", testController);
