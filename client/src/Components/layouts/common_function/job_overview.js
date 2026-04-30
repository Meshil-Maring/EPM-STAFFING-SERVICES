import { getByIdService } from "../../../services/dynamic.service";
import { getJobOverviewService } from "../../../services/jobs.services";

export const getJobOverviewInfo = async (job_id, page) => {
  const res = await getJobOverviewService(job_id, page);
  return res;
};

export const getJob = async (job_id) => {
  const res = await getByIdService("api/dr/get", "jobs", job_id);

  return res;
};
