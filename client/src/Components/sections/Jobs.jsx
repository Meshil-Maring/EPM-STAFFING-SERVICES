import React, { useState, useEffect } from "react";
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

  // extracting the user id
  const { user } = useAuth();
  const userId = user?.id;
  const queryClient = useQueryClient(); // ✅

  // local jobs state
  const [jobs, setJobs] = useState([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs", userId],
    queryFn: async () =>
      await getByUserIdService("api/dr/get/user-id", "job_info", userId),
    enabled: !!userId && !searching,
    staleTime: 1000 * 60 * 5,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [postNewJob, setPostNewJob] = useState(false);

  const ITEMS_PER_PAGE = 100;

  //  API returns { data: [...] } — extract the array
  const jobsList = data?.data || [];

  // ✅ Use useEffect to update jobs when data changes
  useEffect(() => {
    if (data?.data) {
      setJobs(data?.data);
    }
  }, [data]);

  // handling searching: sending searchKey to the backend
  const {
    data: searchedJobs,
    isLoading: isLoadingJobs,
    error: searchingJobsError,
  } = useQuery({
    queryKey: ["searchedJobs", searchTerm],
    queryFn: async () =>
      await searchJobs(searchTerm.toLocaleLowerCase().trim()),
    enabled: searching,
  });

  // ✅ Use useEffect to update jobs when search results change
  useEffect(() => {
    if (searchedJobs) {
      setJobs(searchedJobs);
    }
  }, [searchedJobs]);

  // ✅ single invalidation helper — pass this down to children
  const refetchJobs = () =>
    queryClient.invalidateQueries({ queryKey: ["jobs", userId] });
  // handling moving between the frames : next or previous
  const handlePreviousPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const handleNextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  const totalPages = Math.ceil(jobs?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = jobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // ✅ Handle loading and error states early
  const isLoading_current = isLoading || isLoadingJobs;
  const error_current = error || searchingJobsError;

  if (isLoading_current && jobs.length === 0) {
    return loading();
  }

  if (error_current) {
    return (
      <div className="w-full inset-0 h-full flex items-center justify-center text-xl text-red-500 font-bold">
        <Label text={error_current?.message || "Something went wrong!"} />
      </div>
    );
  }

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
        {isLoading_current && (
          <div className="text-center py-10 text-gray-500">Loading jobs...</div>
        )}

        {error_current && (
          <div className="text-center py-10 text-red-500">
            Failed to load jobs. Please try again later.
          </div>
        )}

        {!isLoading_current && !error_current && jobs.length === 0 && (
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

        {!isLoading_current && paginatedJobs.length > 0 && (
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
