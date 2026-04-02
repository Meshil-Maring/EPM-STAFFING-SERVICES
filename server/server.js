import "dotenv/config";

import express from "express";
import apiRoutes from "./src/routes/apiRoutes.js";
import cors from "cors";

import startOtpCleanup from "./src/util/otpCleanup.job.js"; // ✅ fixed
import cookieParser from "cookie-parser";
import { sessionService } from "./src/config/session.js";

const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use(sessionService());

// Routes
app.use("/api", apiRoutes);

// start cron job
// startOtpCleanup();

app.listen(4000, () => {
  ("PORT : 4000");
});
