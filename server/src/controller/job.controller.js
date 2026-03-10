import { createJob } from "../services/db/jobs.service.db";

export const createJobContoller = async (req, res) => {
  try {
    const data = req.body;

    const res = await createJob(data);

    res.status(200).json({ message: "Job Create Successfully" });
  } catch (err) {
    console.log(err);
  }
};
