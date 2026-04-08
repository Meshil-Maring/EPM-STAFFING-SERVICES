import { getWithPageService } from "../../../../../utils/server_until/service.js";

export const getCandidateInfo = async (page) => {
  const res = await getWithPageService("api/dr/get", "candidate_info", page);

  console.log(res);

  return res;
};
