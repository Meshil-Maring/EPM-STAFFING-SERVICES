import { useQuery } from "@tanstack/react-query";

import CandidateCard from "./CandidateCard";
import { getCandidateInfo } from "../end-point-function/submitted_candidates";

const SubmittedCandidateMain = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: () => getCandidateInfo(1),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="grid grid-cols-3 gap-4 w-full scroll-auto p-4">
      {data?.data?.map((value) => (
        <CandidateCard key={value.id} data={value} />
      ))}
    </div>
  );
};

export default SubmittedCandidateMain;
