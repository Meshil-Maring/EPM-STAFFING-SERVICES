import React, { useState, useEffect, useContext } from "react";
import Icon from "../../../common/Icon";
import Input from "../../../common/Input";
import Label from "../../../common/Label";
import { useLocation } from "react-router-dom";
import { filterJobs } from "../../../../utils/filterJobs";

/**
 * CandidateNavBar component - Navigation bar for filtering candidates or jobs
 * @param {Object} props - Component props
 * @param {Function} props.setFilteredData - Function to set filtered data
 * @param {Object} props.candidates - Candidates data
 * @param {Object} props.jobs - Jobs data
 * @param {boolean} props.isListed_jobs - Flag indicating if we're in listed_jobs view
 * @returns {JSX.Element} Rendered navigation bar component
 */
function CandidateNavBar({
  setFilteredData,
  candidates,
  jobs,
  isListed_jobs = false,
}) {
  // Get current route path to determine view mode
  const { pathname } = useLocation();
  const section = pathname.split("/").at(-1);
  // State for clicked button filter
  const [clickedBtn, setClickedBtn] = useState("All");
  // State for search key
  const [search_key, setSearch_key] = useState("All");
  // State for pagination frame number
  const [f_number, setF_number] = useState(1);
  // State for filtered list
  const [filtered_list, setFiltered_list] = useState(
    section === "listed_jobs" ? jobs : candidates || {},
  );

  // Filter buttons options
  const buttons = ["All", "Pending", "Interviewed", "Accepted", "Rejected"];

  /**
   * Handle button click for status filtering
   * @param {string} name - Status name to filter by
   */
  const handleBtnClick = (name) => {
    setClickedBtn(name);
    setSearch_key(name);
    setF_number(1);
  };

  // Filter data based on search key and view mode
  useEffect(() => {
    const s_key = (search_key || "").toLocaleLowerCase().trim();
    let filtered = section === "listed_jobs" ? jobs : candidates || {};
    const isJobLIst = section === "listed_jobs";
    const isNavButton =
      search_key === "Pending" ||
      search_key === "Interviewed" ||
      search_key === "Accepted" ||
      search_key === "Rejected";

    if (search_key !== "All") {
      if (isNavButton) {
        // Filter by status for candidates
        filtered = Object.keys(candidates || {}).reduce((acc, key) => {
          const candidate = candidates[key];
          const offerStatus = candidate?.["offer status"];
          if (
            candidate &&
            offerStatus &&
            typeof offerStatus === "string" &&
            offerStatus.toLocaleLowerCase() ===
              search_key.trim().toLocaleLowerCase()
          ) {
            acc[key] = candidate;
          }
          return acc;
        }, {});
      } else if (isJobLIst) {
        // Filter jobs using filterJobs utility
        filtered = filterJobs(jobs, s_key);
      } else {
        // Filter candidates by name, status, or job title
        filtered = Object.keys(candidates || {}).reduce((acc, key) => {
          const candidate = candidates[key];
          if (!candidate) return acc;

          const name =
            typeof candidate?.name === "string"
              ? candidate.name.toLocaleLowerCase()
              : "";
          const status =
            typeof candidate?.["offer status"] === "string"
              ? candidate["offer status"].toLocaleLowerCase()
              : "";
          const jobTitles = Array.isArray(candidate["job id"])
            ? candidate["job id"]
                .map((job_id) => {
                  const job = jobs?.[job_id];
                  return job && typeof job["job title"] === "string"
                    ? job["job title"].toLocaleLowerCase()
                    : "";
                })
                .filter(Boolean)
            : [];

          if (
            name.includes(s_key) ||
            status.includes(s_key) ||
            jobTitles.some((title) => title.includes(s_key))
          ) {
            acc[key] = candidate;
          }
          return acc;
        }, {});
      }
    }

    setFiltered_list(filtered);
    setF_number(1); // Reset to first page
  }, [search_key, candidates, jobs, section]);

  /**
   * Handle typing in search input
   * @param {string} value - Search input value
   * @param {string} id - Input field ID
   */
  const handleTypingSearchKey = (value, id) => {
    setSearch_key(value);
  };

  /**
   * Calculate total number of pagination frames
   * @returns {number} Total number of frames
   */
  const get_frames = () => {
    const total = Object.keys(filtered_list).length;
    const frames = Math.ceil(total / 6); // Changed from 5 to 6 candidates per frame
    return frames;
  };

  // Total frames count
  const t_frame = get_frames();

  /**
   * Handle pagination navigation
   * @param {string} direction - Navigation direction ("prev" or "next")
   */
  const handleFrames = (direction) => {
    if (direction === "prev") {
      setF_number((prev) => (prev > 1 ? prev - 1 : prev));
    } else if (direction === "next") {
      setF_number((prev) => (prev < t_frame ? prev + 1 : prev));
    }
  };

  // Apply pagination to the filtered data
  useEffect(() => {
    const total_data_items = Object.keys(filtered_list);
    const pageSize = 6;
    const startIndex = (f_number - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedKeys = total_data_items.slice(startIndex, endIndex);
    const paginated_data_items = paginatedKeys.reduce((acc, key) => {
      acc[key] = filtered_list[key];
      return acc;
    }, {});

    setFilteredData(paginated_data_items);
  }, [filtered_list, f_number]);

  // Navigation arrows styling
  const navArrows = `font-semibold py-3  w-20 border border-light flex transition-all duration-200 ease-in-out cursor-pointer items-center justify-center rounded-small text-[clamp(1.2em,2vw,1.4em)] text-text_white ${t_frame > 1 ? "bg-blue/80 hover:bg-blue" : "bg-blue/20 cursor-not-allowed"}`;

  return (
    <div className="w-full sticky top-0 bg-b_white z-20 py-4 flex flex-col gap-4 items-end">
      {/* Search and filter section */}
      <div className="w-full flex flex-row gap-4 items-center text-[clamp(1em,1vw,1.2em)] justify-between">
        <div className="relative rounded-small flex-1">
          <Icon
            icon={"ri-search-line"}
            class_name="absolute left-2 top-0 bottom-0 font-lighter"
          />
          <Input
            onchange={handleTypingSearchKey}
            placeholder={
              isListed_jobs
                ? "Search Jobs by title, status..."
                : "Search Candidates by name, job title, status..."
            }
            class_name={
              "w-full px-10 py-1.5 rounded-small border border-inputBorder focus:ring ring-highLightBorder focus:outline-none focus:border-none"
            }
          />
        </div>
        <div className="flex flex-row items-center justify-start gap-2 flex-wrap">
          {buttons.map((btn, i) => {
            const isActive = btn === clickedBtn;
            return (
              <div
                className={`w-fit px-2 py-1 cursor-pointer rounded-small border-lighter ${isActive ? "bg-g_btn text-text_white" : "hover:bg-light hover:text-text_white"}`}
                key={i}
                onClick={() => handleBtnClick(btn)}
              >
                <Label text={btn} className="" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination section */}
      <div className="w-full text-[clamp(0.6em,1vw,0.8em)] flex flex-row items-center justify-between gap-4">
        <span onClick={() => handleFrames("prev")} className={navArrows}>
          <Icon icon={"ri-arrow-left-line"} class_name={"w-4 h-4"} />
        </span>
        <div className="flex flex-row items-center justify-center gap-1">
          <Label text={f_number} class_name={""} />/
          <Label text={"Out of " + t_frame} />
        </div>
        <span onClick={() => handleFrames("next")} className={navArrows}>
          <Icon icon={"ri-arrow-right-line"} class_name={"w-4 h-4"} />
        </span>
      </div>
    </div>
  );
}

export default CandidateNavBar;
