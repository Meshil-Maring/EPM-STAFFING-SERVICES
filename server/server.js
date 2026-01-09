import express from "express";
import { getUsers, getUserById } from "./src/controller/user.controller.js";

const app = express();

app.get("/users", getUsers);

app.get("/user", getUserById);

app.listen(4000, () => {
  console.log("PORT : 4000");
});
