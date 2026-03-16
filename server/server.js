import express from "express";
import userRouter from "./src/routes/userRoutes.js";
import userAuthRouter from "./src/routes/userAuthRoutes.js";
import apiRoutes from "./src/routes/apiRoutes.js";
import cors from "cors";

import { sendMailController } from "./src/controller/user.auth.controller.js";

import "./src/util/otpCleanup.job.js";
import cookieParser from "cookie-parser";
import { sessionService } from "./src/config/session.js";
import session from "express-session";

// test
// import { testController } from "./src/test/testController.js";

const app = express();

// middlerwares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(sessionService());

// Routes
app.use("/api", apiRoutes);
app.use("/auth", userAuthRouter);

// this routes is only for test perpose
// app.use("/test", testController);

app.listen(4000, () => {
  console.log("PORT : 4000");
});
