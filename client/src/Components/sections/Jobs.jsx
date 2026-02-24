import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../common/SearchInput";
import Job_Card from "../layouts/Dashboard/Job_Card";
import Label from "../common/Label";
import ButtonIcon from "../common/ButtonIcon";
import { Jobs_context } from "../../context/JobsContext";
import JobForm from "../sections/JobForm";

// Search function to filter jobs
const filterJobs = (jobs, searchTerm) => {
  if (!searchTerm.trim()) return jobs;

  const searchLower = searchTerm.toLowerCase();

  return Object.keys(jobs).reduce((filtered, key) => {
    const job = jobs[key];

    // Check if job matches search criteria (title, location, job type)
    const matches =
      job.title?.toLowerCase().includes(searchLower) ||
      job.location?.toLowerCase().includes(searchLower) ||
      job.job_type?.toLowerCase().includes(searchLower) ||
      job.description?.toLowerCase().includes(searchLower) ||
      job.department?.toLowerCase().includes(searchLower);

    if (matches) {
      filtered[key] = job;
    }

    return filtered;
  }, {});
};

function Jobs() {
  // jobs context
  const { jobs } = useContext(Jobs_context);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const [postNewJob, setPostNewJob] = useState(false);
  // Filter jobs based on search term
  const filteredJobs = filterJobs(jobs, searchTerm);

  // Calculate pagination
  const allJobsList = Object.entries(filteredJobs || {});
  const totalPages = Math.ceil(allJobsList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedJobs = allJobsList.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScroll = () => {
      if (container.scrollTop > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    container.addEventListener("scroll", updateScroll, { passive: true });
    return () => container.removeEventListener("scroll", updateScroll);
  }, []);

  const handleSearching = (searchValue) => {
    setSearchTerm(searchValue);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePostNewJob = () => {
    setPostNewJob(true);
  };

  return (
    <section
      ref={containerRef}
      className="w-full h-full flex flex-col px-6 pb-10 overflow-y-auto shadow-inner-lighter bg-white"
    >
      <header
        ref={targetRef}
        animate={{
          boxShadow: scrolled
            ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
            : "0 0px 0px rgba(0, 0, 0, 0)",
          borderBottom: scrolled
            ? "1px solid #f1f5f9"
            : "1px solid transparent",
        }}
        className="sticky top-0 z-20 w-full gap-4 flex flex-col p-4 rounded-small bg-b_white/60 backdrop-blur-sm "
      >
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-col items-start leading-tight justify-center">
            <Label
              class_name="text-xl font-semibold text-text_b"
              text="Active Job Listings"
            />
            <Label
              class_name="text-sm text-text_b_l opacity-70"
              text="Recruitment Management Dashboard"
            />
          </div>
          <div className="min-w-35">
            <ButtonIcon
              text="Post New Job"
              icon="ri-add-line"
              id="nav"
              onSelect={handlePostNewJob}
              clicked
              set_gradient={true}
              shadow={true}
            />
          </div>
        </div>
        <SearchInput onSearchChange={handleSearching} />
      </header>

      <div className="flex flex-col items-start pt-6 pb-20 justify-start gap-6">
        <Label text="Recent Openings" class_name="sr-only" />

        {/* Pagination Controls */}
        {allJobsList.length > 0 && (
          <div className="w-full flex items-center justify-between px-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-shadow"
            >
              ← Previous
            </button>
            <span className="text-sm font-medium text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-shadow"
            >
              Next →
            </button>
          </div>
        )}

        {allJobsList.length === 0 && searchTerm === "" && (
          <div className="w-full text-center py-10">
            <Label
              text="No job listings available"
              class_name="text-gray-500"
            />
          </div>
        )}

        {allJobsList.length === 0 && searchTerm !== "" && (
          <div className="w-full text-center py-10">
            <Label
              text="No jobs matching your search"
              class_name="text-gray-500"
            />
          </div>
        )}

        {allJobsList.length > 0 && (
          <ul className="w-full flex flex-col gap-6 list-none p-0">
            {paginatedJobs.map(([key, card], index) => (
              <li key={`${key}-${currentPage}`} className="w-full">
                <Job_Card card={card} Card_index={key} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {postNewJob && <JobForm setClosing={setPostNewJob} />}
    </section>
  );
}

export default Jobs;
