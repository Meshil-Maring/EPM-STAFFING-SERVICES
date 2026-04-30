import React, { useState, useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // ✅ import useQueryClient
import { useAuth } from "../../hooks/useAuth";

import SearchInput from "../common/SearchInput";
import Job_Card from "../layouts/Dashboard/Job_Card";
import Label from "../common/Label";
import JobForm from "../sections/JobForm";
import Icon from "../common/Icon";
import { getByUserIdService } from "../../services/dynamic.service";
import { searchJobs } from "./jobSearching_calls/JobSearching";

// ─── Main Component ───────────────────────────────────────────────────────────
function Jobs() {
  // extracting the user id
  const { user } = useAuth();
  const userId = user?.id;
  const queryClient = useQueryClient(); // ✅
  // callback component for loading
  const loading = () => (
    <div className="w-full inset-0 h-full flex items-center justify-center text-xl text-nevy_blue font-bold ">
      <Label text="Loading..." />
    </div>
  );

  // search term state
  const [searchTerm, setSearchTerm] = useState("");

  // search boolean
  const [searching, setSearching] = useState(false);
  // toggling the searching boolean value once the user starts to type something on the search bar
  useEffect(() => {
    if (searchTerm !== "") setSearching(true);
    else setSearching(false);
  }, [searchTerm]);

  // local jobs state
  const [jobs, setJobs] = useState([]);
  const {
    data: jobsData,
    isLoading,
    error: jobsError,
  } = useQuery({
    queryKey: ["jobs", userId],
    queryFn: async () =>
      await getByUserIdService("api/dr/get/user-id", "job_info", userId),
    enabled: !!userId && !searching,
    staleTime: 1000 * 60 * 5,
  });
  // filtering the jobs data
  const filteredJobs = useMemo(async () => {
    if (searchTerm === "") return jobsData?.data;
    const searchedJobs = await searchJobs(
      searchTerm.toLocaleLowerCase().trim(),
    );
    return searchedJobs;
  }, [searchTerm, jobsData]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postNewJob, setPostNewJob] = useState(false);

  const ITEMS_PER_PAGE = 100;

  // ✅ single invalidation helper — pass this down to children
  const refetchJobs = () =>
    queryClient.invalidateQueries({ queryKey: ["jobs", userId] });
  // handling moving between the frames : next or previous
  const handlePreviousPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const handleNextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  const totalPages = Math.ceil(jobsData?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = jobsData?.data?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // ✅ Handle loading and error states early
  if (isLoading) return loading();
  // showing an error if failed to load the data
  if (jobsError) return showError(jobsError.message || "Something went wrong");

  return (
    <section className="w-full h-full flex flex-col pb-10 overflow-y-auto">
      {/* ── Header ── */}
      <header className="sticky top-0 z-20 w-full gap-4 flex flex-col p-4 backdrop-blur-sm mt-8">
        <div className="w-full flex flex-row items-center justify-between">
          <div>
            <Label
              class_name="text-xl font-semibold text-text_b"
              text="Active Job Listings"
            />
            <Label
              class_name="text-sm text-text_b_l opacity-70"
              text="Recruitment Management Dashboard"
            />
          </div>

          <div
            onClick={() => setPostNewJob(true)}
            className="min-w-35 hover:scale-[1.02] duration-150 bg-g_btn text-text_white flex items-center justify-center cursor-pointer py-1.5 px-4 rounded-small space-x-1"
          >
            <Icon icon="ri-add-line" />
            <Label text="Post New Job" />
          </div>
        </div>

        <SearchInput setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      </header>

      {/* ── Body ── */}
      <div className="flex flex-col pt-6 pb-20 gap-6">
        {jobsData?.data?.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            {searchTerm
              ? "No jobs matching your search."
              : "No job listings available."}
          </div>
        )}

        {/* {!isLoading && filteredJobs.length > 0 && (
          <div className="w-full flex justify-between items-center px-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        )} */}

        {paginatedJobs.length > 0 && (
          <ul className="flex flex-col gap-6">
            {paginatedJobs.map((card) => (
              <li key={card?.id}>
                <Job_Card card={card} onMutate={refetchJobs} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Job Form Modal ── */}
      {postNewJob && (
        <JobForm setClosing={setPostNewJob} onSuccess={refetchJobs} />
      )}
    </section>
  );
}

export default Jobs;
