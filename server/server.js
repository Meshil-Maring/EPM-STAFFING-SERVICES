import express from "express";
import { getUsers } from "./src/controller/user.controller.js";

const app = express();

app.get("/user", getUsers);

app.listen(4000, () => {
  console.log("PORT : 4000");
});
