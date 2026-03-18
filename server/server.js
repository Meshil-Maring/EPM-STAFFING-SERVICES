/**
 * Main server file for the Employee Staffing Services backend
 *
 * This file sets up the Express.js server with all necessary middleware,
 * routes, and configurations for the job portal application. It initializes
 * the application, configures middleware, sets up routes, and starts the
 * server on port 4000.
 */

import express from "express";
import userRouter from "./src/routes/userRoutes.js";
import userAuthRouter from "./src/routes/userAuthRoutes.js";

import { sendMailController } from "./src/controller/user.auth.controller.js";
import "./src/util/otpCleanup.job.js";
import cookieParser from "cookie-parser";
import { sessionService } from "./src/config/session.js";
import session from "express-session";

// test
// import { testController } from "./src/test/testController.js";

/**
 * Initialize the Express application
 */
const app = express();

/**
 * Middleware configuration
 *
 * - express.json(): Parses incoming JSON requests
 * - cookieParser(): Parses cookies from incoming requests
 * - session(): Sets up session management for user authentication
 */
app.use(express.json());
app.use(cookieParser());

app.use(session(sessionService));

/**
 * Route configuration
 *
 * - /api: Main API routes for user operations
 * - /auth: Authentication-related routes (login, signup, etc.)
 */
app.use("/api", userRouter);
app.use("/auth", userAuthRouter);

// this routes is only for test perpose
// app.use("/test", testController);

/**
 * Start the server on port 4000
 *
 * The server will listen for incoming HTTP requests on localhost:4000
 */
app.listen(4000, () => {
  console.log("PORT : 4000");
});
