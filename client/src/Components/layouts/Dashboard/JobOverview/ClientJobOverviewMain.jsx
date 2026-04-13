import { useQuery } from "@tanstack/react-query";

import CandidateCard from "./ClientCard";
import PositionRequirementsCard from "../../";

export const ClientJobOverviewMain = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => {},
  });

  return (
    <div className="w-full pt-8 flex gap-8 flex-col">
      <PositionRequirementsCard />

      {/* Container of the candidate */}
      <div className="flex">
        <CandidateCard />
      </div>
    </div>
  );
};
