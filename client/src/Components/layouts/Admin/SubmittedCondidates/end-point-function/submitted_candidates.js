import {
  getWithPageService,
  deleteByIdService,
} from "../../../../../utils/server_until/service.js";

export const getCandidateInfo = async (page) => {
  const res = await getWithPageService("api/dr/get", "candidate_info", page);

  console.log(res);

  return res;
};

// router.delete("/delete/id/:table/:id", deleteController);

export const deleteCandidate = async (id) => {
  console.log("Hello");

  const res = await deleteByIdService("api/dr/delete/id", "candidates", id);

  console.log(res);
};
