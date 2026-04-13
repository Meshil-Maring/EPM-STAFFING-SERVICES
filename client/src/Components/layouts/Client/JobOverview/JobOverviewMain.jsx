import { useQuery } from "@tanstack/react-query";
import CandidatesTable from "./CandidateTable";
import PositionRequirementsCard from "./PositionRequirementsCard";
import { getJobOverviewInfo } from "./end-point-function/job_overview";

const JobOverviewMain = () => {
  const { data, isloading, error } = useQuery({
    queryKey: ["application_info"],
    queryFn: () => getJobOverviewInfo(1),
  });

  console.log(data);

  return (
    <div className="p-8 flex gap-4 flex-col">
      <PositionRequirementsCard />
      <CandidatesTable />
    </div>
  );
};

export default JobOverviewMain;
