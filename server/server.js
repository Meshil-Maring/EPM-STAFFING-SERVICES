import express from "express";
import userRouter from "./src/routes/userRoutes.js";
import userAuthRouter from "./src/routes/userAuthRoutes.js";

import { sendMailController } from "./src/controller/user.auth.controller.js";

// test
// import { testController } from "./src/test/testController.js";

const app = express();

app.use(express.json());

app.use("/api", userRouter);
app.use("/auth", userAuthRouter);

app.post("/send-mail", sendMailController);

// this routes is only for test perpose
// app.use("/test", testController);

app.listen(4000, () => {
  console.log("PORT : 4000");
});
