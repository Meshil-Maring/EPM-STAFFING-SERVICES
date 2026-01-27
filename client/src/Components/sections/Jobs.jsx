import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../common/SearchInput";
import Job_Card from "../layouts/Dashboard/Job_Card";
import Label from "../common/Label";
import ButtonIcon from "../common/ButtonIcon";
import { motion, AnimatePresence } from "framer-motion";
import { Jobs_context } from "../../context/JobsContext";

function Jobs() {
  // jobs context
  const { jobs } = useContext(Jobs_context);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

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
      className="w-full h-full flex flex-col px-6 pt-4 pb-10 overflow-y-auto shadow-inner-lighter bg-white"
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
        className={`sticky top-0 z-20 w-full gap-4 flex flex-col p-4 rounded-small bg-b_white/60 backdrop-blur-sm `}
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
        <SearchInput />
      </header>

      <div className="flex flex-col items-start pt-6 pb-20 justify-start gap-6">
        <Label text="Recent Openings" class_name="sr-only" />
        <ul className="w-full flex flex-col gap-6 list-none p-0">
          <AnimatePresence>
            {jobs.map((card, index) => (
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={card.id}
                className="w-full"
              >
                <Job_Card card={card} Card_index={index} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}

export default Jobs;
