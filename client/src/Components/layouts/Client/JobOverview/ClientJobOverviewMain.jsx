import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import PositionRequirementsCard from "../../CommonLayouts/PositionRequirementsCard";
import { getJobOverviewInfo } from "../../common_function/job_overview";
import CandidateCard from "./ClientCard";

export const ClientJobOverviewMain = () => {
  const { job_id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["application_info"],
    queryFn: () => getJobOverviewInfo(job_id, 1),
  });

  console.log(data);

  return !isLoading ? (
    <div className="p-8 flex gap-4 flex-col h-full">
      <PositionRequirementsCard />

      <div className="overflow-y-auto flex-col gap-4">
        {data?.data?.data.map((data, index) => (
          <CandidateCard key={index} data={data} />
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      <p className="text-center">Loading...</p>
    </div>
  );
};
