import { useQuery } from "@tanstack/react-query";
import PositionRequirementsCard from "../../../../../shared/components/layout/PositionRequirementsCard";
import { getJobOverviewInfo } from "../../../../shared/utils/job_overview.js";
import CandidateTable from "./CandidateTable.jsx";

export const JobOverviewMain = () => {
  const { data, isloading, error } = useQuery({
    queryKey: ["application_info"],
    queryFn: () => getJobOverviewInfo(1),
  });

  return (
    <div className="p-8 flex gap-4 flex-col">
      <PositionRequirementsCard />
      <CandidateTable />
    </div>
  );
};
