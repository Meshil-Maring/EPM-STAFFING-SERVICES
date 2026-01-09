import express from "express";
import { getUsers, getById } from "./src/controller/user.controller.js";

const app = express();

app.get("/user", getById);
app.get("/users", getUsers);

app.listen(4000, () => {
  console.log("PORT : 4000");
});
