import React, { useEffect, useRef, useState, useMemo, useContext } from "react";
import { Candidates_context } from "../../context/CandidatesContext";
import Icon from "../common/Icon";
import Label from "../common/Label";
import InforCards from "../layouts/Dashboard/InforCards";
import CardJobDetails from "../layouts/Dashboard/CardJobDetails";
import OverviewCards from "../layouts/Dashboard/OverviewCards";
import { AnimatePresence, motion } from "framer-motion";
import Input from "../common/Input";
import { selected_job_context } from "../../context/SelectedJobContext";

function JobApplienceOverview() {
  const { selected_job } = useContext(selected_job_context);
  const { candidates } = useContext(Candidates_context) || {};
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const updateScroll = () => setIsScrolled(container.scrollTop > 20);
    container.addEventListener("scroll", updateScroll, { passive: true });
    return () => container.removeEventListener("scroll", updateScroll);
  }, []);

  const candidatesData = useMemo(() => candidates || {}, [candidates]);

  // Filter candidates based on search query
  const filteredCandidates = useMemo(() => {
    if (!searchQuery.trim()) {
      return candidatesData;
    }

    const query = searchQuery.toLowerCase();
    return Object.values(candidatesData).filter((candidate) =>
      candidate.name.toLowerCase().includes(query),
    );
  }, [candidatesData, searchQuery]);

  const handleSearching = (value, id) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Calculate pagination
  const allCandidatesList = Object.entries(filteredCandidates || {});
  const totalPages = Math.ceil(allCandidatesList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCandidates = allCandidatesList.slice(startIndex, endIndex);
  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <section
      ref={containerRef}
      className="w-full h-full flex flex-col px-6 pb-20 overflow-y-auto gap-4 scroll-smooth"
    >
      <motion.header
        animate={{
          boxShadow: isScrolled ? "0 10px 15px -3px rgb(0 0 0 / 0.1)" : "none",
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.8)",
        }}
        className="sticky top-0 z-20 flex flex-row items-center justify-between backdrop-blur-md rounded-small rounded-tr-none rounded-tl-none p-4 transition-colors"
      >
        <div className="flex flex-1 flex-col items-start justify-center">
          <Label
            as="h1"
            text={selected_job["job title"]}
            class_name="text-xl font-semibold text-text_b"
          />
          <Label
            as="p"
            text="Candidate Pipeline"
            class_name="text-sm text-text_b_l"
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {/* FIX 1: One single motion wrapper inside AnimatePresence */}
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-10"
        >
          <InforCards />

          <section aria-label="Job details">
            <CardJobDetails />
          </section>
          <div className="flex w-full relative">
            <Icon
              icon={"ri-search-line"}
              class_name="absolute top-0 flex items-center justify-center bottom-0 left-2 font-semibold text-[clamp(1em,1vw,1.4em)] text-text_b"
            />

            <Input
              placeholder={"Search by name..."}
              id={"searchQuery"}
              class_name={
                "pl-8 border border-border1 w-full py-2 rounded-small focus:outline-none focus:ring-1 ring-border1 text-[clamp(1em,1vw,1.4em)]"
              }
              onchange={handleSearching}
            />
          </div>

          <div className="w-full flex flex-col gap-10">
            <div className="w-full flex flex-row items-center justify-between gap-10">
              <Label text="Candidates" class_name="text-lg font-medium" />
              {allCandidatesList.length > 0 && (
                <div className="text-sm w-[50%] text-text_l_b flex flex-row items-center justify-between gap-4">
                  <span
                    onClick={handlePreviousPage}
                    className="font-semibold py-2 px-4 flex hover:bg-blue-900 transition-all duration-200 ease-in-out cursor-pointer items-center justify-center rounded-small bg-nevy_blue text-text_white"
                  >
                    <Icon icon={"ri-arrow-left-line"} class_name={"w-4 h-4"} />
                  </span>
                  <span className="text-center">
                    {currentPage} / {`Out of ${totalPages}` || 1}
                  </span>
                  <span
                    onClick={handleNextPage}
                    className="font-semibold py-2 px-4 flex hover:bg-blue-900 transition-all duration-200 ease-in-out cursor-pointer items-center justify-center rounded-small bg-nevy_blue text-text_white"
                  >
                    <Icon icon={"ri-arrow-right-line"} class_name={"w-4 h-4"} />
                  </span>
                </div>
              )}
            </div>
            {paginatedCandidates.length > 0 ? (
              <ul className="w-full flex flex-col gap-10 list-none p-0">
                {paginatedCandidates.map(([key, candidate], i) => {
                  const uniqueKey = `${i + 1}`;
                  return (
                    <motion.li
                      key={uniqueKey}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <OverviewCards candidate={candidate} id={uniqueKey} />
                    </motion.li>
                  );
                })}
              </ul>
            ) : allCandidatesList.length === 0 ? (
              <div className="w-full flex flex-col items-center justify-center py-8">
                <Icon
                  icon="ri-user-line"
                  class_name="text-4xl text-gray-400 mb-2"
                />
                <Label
                  text="No candidates found"
                  class_name="text-sm text-gray-500"
                />
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center py-8">
                <Icon
                  icon="ri-search-line"
                  class_name="text-4xl text-gray-400 mb-2"
                />
                <Label
                  text="No candidates matching your search"
                  class_name="text-sm text-gray-500"
                />
                <Label
                  text="Try adjusting your search terms"
                  class_name="text-xs text-gray-400"
                />
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default JobApplienceOverview;
