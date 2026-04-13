import { getJobOverviewService } from "../../../services/jobs.services";

export const getJobOverviewInfo = async (page) => {
  const res = await getJobOverviewService(
    "d030fa56-f091-43bb-98e3-c78ae0e42b5c",
    page,
  );

  console.log(res);

  return res;
};
