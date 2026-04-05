import React, { useRef, useState, useEffect, useContext } from "react";
import SearchInput from "../common/SearchInput";
import Job_Card from "../layouts/Dashboard/Job_Card";
import Label from "../common/Label";
import { Jobs_context } from "../../context/JobsContext";
import JobForm from "../sections/JobForm";
import Icon from "../common/Icon";

import { useJobs } from "../../hooks/useJobs";
import { useAuth } from "../../hooks/useAuth";

// ─── Transform API → UI format ────────────────────────────────────────────────
const transformJobs = (jobsArray) => {
  if (!jobsArray || !Array.isArray(jobsArray)) return {};

  const result = {};

  jobsArray.forEach((job, index) => {
    if (!job.job_name || !job.job_type) {
      console.warn(`Skipping invalid job at index ${index}:`, job);
      return;
    }

    // ✅ Handles: plain strings, arrays of objects like [{"0":"Html","1":"Css"}]
    const parseArray = (value) => {
      if (!value) return [];

      // Plain string array
      if (Array.isArray(value) && typeof value[0] === "string") return value;

      // Array of objects with numeric keys → flatten all values
      if (Array.isArray(value)) {
        return value.flatMap((item) => {
          if (typeof item === "string") return item;
          if (typeof item === "object" && item !== null) {
            return Object.values(item);
          }
          return [];
        });
      }

      // JSON string fallback
      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);
          return parseArray(parsed);
        } catch {
          return [];
        }
      }

      return [];
    };

    result[index] = {
      id: job.id,
      "job title": job.job_name,
      status: job.active ? "Active" : "Inactive",
      priority: job.urgent || false,

      "max applications": Number(job.max_applications) || 0,
      applicants: Number(job.applicants) || 0,

      "date posted": new Date(job.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),

      job_type: job.job_type,
      location: job.location || "Not specified",
      salary: `${job.salary_min} - ${job.salary_max}`,
      experience: job.experience_years
        ? `${job.experience_years} ${
            job.experience_years === "Fresher" ? "" : "years"
          }`.trim()
        : "Not specified",
      description: job.description,
      deadline: job.deadline
        ? new Date(job.deadline).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : null,

      requirements: parseArray(job.requirements),
      responsibilities: parseArray(job.responsibilities),
      benefits: parseArray(job.benefits),
    };
  });

  return result;
};

// ─── Filter jobs by search term ───────────────────────────────────────────────
const filterJobs = (jobs, searchTerm) => {
  if (!searchTerm.trim()) return jobs;

  const searchLower = searchTerm.toLowerCase();

  return Object.keys(jobs).reduce((filtered, key) => {
    const job = jobs[key];

    const matches =
      job["job title"]?.toLowerCase().includes(searchLower) ||
      job.job_type?.toLowerCase().includes(searchLower) ||
      job.location?.toLowerCase().includes(searchLower) ||
      job.description?.toLowerCase().includes(searchLower);

    if (matches) filtered[key] = job;

    return filtered;
  }, {});
};

// ─── Main Component ───────────────────────────────────────────────────────────
function Jobs() {
  const { jobs } = useContext(Jobs_context);
  const { user } = useAuth();
  const { data, isLoading, error } = useJobs(user?.id);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postNewJob, setPostNewJob] = useState(false);

  const ITEMS_PER_PAGE = 5;

  const jobsData = transformJobs(data?.jobsData) || jobs || {};
  const filteredJobs = filterJobs(jobsData, searchTerm);

  const allJobsList = Object.entries(filteredJobs || {});
  const totalPages = Math.ceil(allJobsList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = allJobsList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePreviousPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  const handleNextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  const handleSearching = (searchValue) => {
    setSearchTerm(searchValue);
    setCurrentPage(1);
  };

  return (
    <section className="w-full h-full flex flex-col px-6 pb-10 overflow-y-auto bg-white">
      {/* ── Header ── */}
      <header className="sticky top-0 z-20 w-full gap-4 flex flex-col p-4 bg-b_white/60 backdrop-blur-sm">
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

        <SearchInput onSearchChange={handleSearching} />
      </header>

      {/* ── Body ── */}
      <div className="flex flex-col pt-6 pb-20 gap-6">
        {/* Loading */}
        {isLoading && (
          <div className="text-center py-10 text-gray-500">Loading jobs...</div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-10 text-red-500">
            Failed to load jobs. Please try again later.
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && allJobsList.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            {searchTerm
              ? "No jobs matching your search."
              : "No job listings available."}
          </div>
        )}

        {/* Pagination Controls */}
        {!isLoading && allJobsList.length > 0 && (
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
        )}

        {/* Job List */}
        {!isLoading && allJobsList.length > 0 && (
          <ul className="flex flex-col gap-6">
            {paginatedJobs.map(([key, card]) => (
              <li key={`${key}-${currentPage}`}>
                <Job_Card card={card} Card_index={key} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Job Form Modal ── */}
      {postNewJob && <JobForm setClosing={setPostNewJob} />}
    </section>
  );
}

export default Jobs;
