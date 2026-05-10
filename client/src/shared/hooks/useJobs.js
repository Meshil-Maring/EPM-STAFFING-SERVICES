import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "../utils/function_utility/jobs.utility";

export function useJobs(userId) {
  return useQuery({
    queryKey: ["jobs", userId], // userId in the key too — different users = different cache
    queryFn: () => getAllJobs(userId), // wrap in arrow function to pass the param
    enabled: !!userId, // don't fetch if userId is undefined/null
    staleTime: 1000 * 60 * 5,
  });
}
