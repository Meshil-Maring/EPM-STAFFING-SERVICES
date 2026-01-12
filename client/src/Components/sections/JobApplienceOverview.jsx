import React, { useEffect, useRef, useState } from "react";
import { candidate_details } from "../dummy_data_structures/candidate_details";
import Icon from "../common/Icon";
import Label from "../common/Label";
import InforCards from "../layouts/Dashboard/InforCards";
import CardJobDetails from "../layouts/Dashboard/CardJobDetails";
import OverviewCards from "../layouts/Dashboard/OverviewCards";
import { motion } from "framer-motion";
function JobApplienceOverview() {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScroll = () => {
      if (container.scrollTop > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    container.addEventListener("scroll", updateScroll, { passive: true });
    return () => container.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-full flex flex-col px-6 pt-8 pb-20 overflow-y-auto gap-4 scroll-smooth"
    >
      <motion.header
        ref={targetRef}
        animate={{
          boxShadow: isScrolled
            ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
            : "0 0px 0px rgba(0, 0, 0, 0)",
          borderBottom: isScrolled
            ? "1px solid #e5e7eb"
            : "1px solid transparent",
        }}
        className="sticky top-0 z-20 flex flex-row items-center justify-between bg-white/80 backdrop-blur-md rounded-small p-4"
      >
        <div className="flex flex-1 flex-col items-start justify-center">
          <Label
            as="h1"
            text="Full Stack Developer - Candidate Pipeline"
            class_name="text-xl font-semibold text-text_b"
          />
          <Label
            as="p"
            text="Manage candidates for this position"
            class_name="text-sm text-text_b_l"
          />
        </div>

        <div className="w-10 h-10 flex items-center justify-center">
          <Icon icon="ri-more-2-fill" />
        </div>
      </motion.header>

      <div className="w-full">
        <InforCards />
      </div>

      <section aria-label="Job details">
        <CardJobDetails />
      </section>

      <div className="w-full flex flex-col gap-4">
        <Label
          as="h2"
          text="Candidates"
          class_name="text-lg font-medium mt-4"
        />
        <ul className="w-full flex flex-col gap-4 list-none p-0">
          {candidate_details.map((candidate, index) => (
            <li key={candidate.id || index}>
              <OverviewCards candidate={candidate} id={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default JobApplienceOverview;
