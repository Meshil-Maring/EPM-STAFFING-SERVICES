import { getJobOverviewService } from "../../../services/jobs.services";

export const getJobOverviewInfo = async (job_id, page) => {
  const res = await getJobOverviewService(job_id, page);
  return res;
};
