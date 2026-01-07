import express from "express";

const app = express();

app.use("/", (req, res) => res.send("Hello from backend"));

app.listen(4000, () => {
  console.log("PORT : 4000");
});
