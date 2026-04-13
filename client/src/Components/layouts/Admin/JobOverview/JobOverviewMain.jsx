import { useQuery } from "@tanstack/react-query";
import PositionRequirementsCard from "../../CommonLayouts/PositionRequirementsCard";
import { getJobOverviewInfo } from "../../common_function/job_overview.js";
import CandidateTable from "./CandidateTable.jsx";

const JobOverviewMain = () => {
  const { data, isloading, error } = useQuery({
    queryKey: ["application_info"],
    queryFn: () => getJobOverviewInfo(1),
  });

  console.log(data);

  return (
    <div className="p-8 flex gap-4 flex-col">
      <PositionRequirementsCard />
      <CandidateTable />
    </div>
  );
};

export default JobOverviewMain;
