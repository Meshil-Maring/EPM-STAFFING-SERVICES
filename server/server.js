import express from "express";

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});