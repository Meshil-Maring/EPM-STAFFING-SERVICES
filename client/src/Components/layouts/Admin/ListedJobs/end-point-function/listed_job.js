import { getWithPageService } from "../../../../../services/dynamic.service";

// router.get("/get/:table", getWithPageController);
export const getListedJobWithPage = async (page) => {
  const res = await getWithPageService("api/dr/get", "listed_jobs", page);

  console.log(res);
};
