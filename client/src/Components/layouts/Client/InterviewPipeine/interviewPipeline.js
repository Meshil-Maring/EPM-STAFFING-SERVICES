import { getByColumnName } from "../../../../services/dynamic.service";

export const getInterviewCandidate = async (round) => {
  const res = await getByColumnName(
    "api/dr/get",
    "interview_info",
    "stage",
    round,
  );

  return res;
};
