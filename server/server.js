import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import apiRoutes from "./src/routes/apiRoutes.js";
import startOtpCleanup from "./src/util/otpCleanup.job.js";
import { sessionService } from "./src/config/session.js";

// ===============================
// GLOBAL ERROR HANDLERS
// ===============================

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:");
  console.error(err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("UNHANDLED REJECTION:");
  console.error(reason);
});

// ===============================
// EXPRESS APP
// ===============================

const app = express();

// Required when running behind a reverse proxy (Vercel, Render, Railway, etc.)
// so Express trusts X-Forwarded-* headers and recognises the connection as HTTPS,
// allowing secure: true session cookies to be set correctly.
app.set("trust proxy", 1);

// ===============================
// ENV VARIABLES
// ===============================

const PORT = process.env.PORT || 4000;

const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN || "http://localhost:5173";

// ===============================
// MIDDLEWARES
// ===============================

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

// ===============================
// SESSION
// ===============================

try {
  app.use(sessionService());
  console.log("Session service initialized");
} catch (error) {
  console.error("Session service failed:");
  console.error(error);
}

// ===============================
// ROUTES
// ===============================

app.use("/api", apiRoutes);

// ===============================
// ROOT ROUTE
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
  });
});

// ===============================
// START CRON JOB
// ===============================

try {
  startOtpCleanup();
  console.log("OTP cleanup job started");
} catch (error) {
  console.error("OTP cleanup job failed:");
  console.error(error);
}

// ===============================
// START SERVER
// ===============================

try {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("SERVER START FAILED:");
  console.error(error);
}