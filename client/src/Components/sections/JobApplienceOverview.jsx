import React, { useEffect, useRef, useState, useMemo, useContext } from "react";
import candidate_information from "../dummy_data_structures/Candidate_information.json";
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
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const updateScroll = () => setIsScrolled(container.scrollTop > 20);
    container.addEventListener("scroll", updateScroll, { passive: true });
    return () => container.removeEventListener("scroll", updateScroll);
  }, []);

  const candidates = useMemo(() => candidate_information, []);

  // Filter candidates based on search query
  const filteredCandidates = useMemo(() => {
    if (!searchQuery.trim()) {
      return candidates;
    }

    const query = searchQuery.toLowerCase();
    return Object.values(candidates).filter((candidate) =>
      candidate.name.toLowerCase().includes(query),
    );
  }, [candidates, searchQuery]);

  const handleSearching = (value, id) => {
    setSearchQuery(value);
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
          className="flex flex-col gap-4"
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

          <div className="w-full flex flex-col gap-4">
            <Label text="Candidates" class_name="text-lg font-medium mt-4" />
            {Object.values(filteredCandidates).length > 0 ? (
              <ul className="w-full flex flex-col gap-4 list-none p-0">
                {Object.keys(filteredCandidates).map((key, index) => {
                  {
                    /* Ensure a truly unique fallback key */
                  }
                  const candidate = filteredCandidates[key];
                  const uniqueKey = `-${index + 1}`;
                  return (
                    <motion.li
                      key={uniqueKey}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <OverviewCards candidate={candidate} id={uniqueKey} />
                    </motion.li>
                  );
                })}
              </ul>
            ) : (
              <div className="w-full flex flex-col items-center justify-center py-8">
                <Icon
                  icon="ri-search-line"
                  class_name="text-4xl text-gray-400 mb-2"
                />
                <Label
                  text="No candidates found"
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
