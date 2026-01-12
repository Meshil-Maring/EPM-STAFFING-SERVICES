import express from "express";
import userRouter from "./src/routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/api", userRouter);

app.listen(4000, () => {
  console.log("PORT : 4000");
});
