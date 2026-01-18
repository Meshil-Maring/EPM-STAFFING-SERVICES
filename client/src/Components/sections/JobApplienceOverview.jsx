import React, { useEffect, useRef, useState, useMemo } from "react";
import { candidate_details } from "../dummy_data_structures/candidate_details";
import Icon from "../common/Icon";
import Label from "../common/Label";
import InforCards from "../layouts/Dashboard/InforCards";
import CardJobDetails from "../layouts/Dashboard/CardJobDetails";
import OverviewCards from "../layouts/Dashboard/OverviewCards";
import { AnimatePresence, motion } from "framer-motion";

function JobApplienceOverview() {
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const updateScroll = () => setIsScrolled(container.scrollTop > 20);
    container.addEventListener("scroll", updateScroll, { passive: true });
    return () => container.removeEventListener("scroll", updateScroll);
  }, []);

  const candidates = useMemo(() => candidate_details, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-full flex flex-col px-6 pt-8 pb-20 overflow-y-auto gap-4 scroll-smooth relative"
    >
      <motion.header
        animate={{
          boxShadow: isScrolled ? "0 10px 15px -3px rgb(0 0 0 / 0.1)" : "none",
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.8)",
        }}
        className="sticky top-0 z-20 flex flex-row items-center justify-between backdrop-blur-md rounded-small p-4 transition-colors"
      >
        <div className="flex flex-1 flex-col items-start justify-center">
          <Label
            as="h1"
            text="Full Stack Developer"
            class_name="text-xl font-semibold text-text_b"
          />
          <Label
            as="p"
            text="Candidate Pipeline"
            class_name="text-sm text-text_b_l"
          />
        </div>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full">
          <Icon icon="ri-more-2-fill" />
        </button>
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

          <div className="w-full flex flex-col gap-4">
            <Label text="Candidates" class_name="text-lg font-medium mt-4" />
            <ul className="w-full flex flex-col gap-4 list-none p-0">
              {candidates.map((candidate, index) => {
                {
                  /* FIX 2: Ensure a truly unique fallback key */
                }
                const uniqueKey = candidate.id || `-${index}`;

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
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default JobApplienceOverview;
