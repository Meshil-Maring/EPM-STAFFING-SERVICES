import { getWithPageService } from "../../../../../services/dynamic.service";

export const getJobOverviewInfo = async (page) => {
  const res = await getWithPageService(
    "api/dr/get",
    "application_info",
    (page = 1),
  );

  console.log(res);

  return res;
};
