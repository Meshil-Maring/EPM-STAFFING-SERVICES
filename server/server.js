import express from "express";
import userRouter from "./src/routes/userRoutes.js";
import { sendMailController } from "./src/controller/user.controller.auth.js";

const app = express();

app.use(express.json());

app.use("/api", userRouter);
app.post("/send-mail", sendMailController);

app.listen(4000, () => {
  console.log("PORT : 4000");
});
