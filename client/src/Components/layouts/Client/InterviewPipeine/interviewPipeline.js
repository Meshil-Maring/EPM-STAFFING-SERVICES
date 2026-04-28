import { getInterviewPipelineService } from "../../../../services/interview.service";

export const getInterviewCandidate = async (id, stage) => {
  const res = await getInterviewPipelineService(id, stage);

  console.log(res);

  return res;
};
