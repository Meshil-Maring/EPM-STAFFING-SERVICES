import { getByUserIdService } from "../../services/dynamic.service";

export const getAllJobs = async (userId) => {
  const res = await getByUserIdService(
    "api/dr/get/user-id",
    "job_info",
    userId,
  );

  const pageNumber = Math.floor(res.data.length / 10) + 1;

  return { jobsData: res.data, pageNumber };
};
