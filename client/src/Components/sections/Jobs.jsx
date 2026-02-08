import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../common/SearchInput";
import Job_Card from "../layouts/Dashboard/Job_Card";
import Label from "../common/Label";
import ButtonIcon from "../common/ButtonIcon";
import { motion, AnimatePresence } from "framer-motion";
import { Jobs_context } from "../../context/JobsContext";

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

  // Filter jobs based on search term
  const filteredJobs = filterJobs(jobs, searchTerm);

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

  const handlePostJob = () => {
    navigate("Job-form");
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
              onSelect={handlePostJob}
              clicked
              set_gradient={true}
              shadow={true}
            />
          </div>
        </div>
        <SearchInput onSearchChange={setSearchTerm} />
      </header>

      <div className="flex flex-col items-start pt-6 pb-20 justify-start gap-6">
        <Label text="Recent Openings" class_name="sr-only" />
        <ul className="w-full flex flex-col gap-6 list-none p-0">
          <AnimatePresence>
            {Object.keys(filteredJobs).map((key, index) => {
              const card = filteredJobs[key];
              return (
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={key}
                  className="w-full"
                >
                  <Job_Card card={card} Card_index={key} />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}

export default Jobs;
