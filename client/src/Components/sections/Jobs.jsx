import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../common/SearchInput";
import Job_Card from "../layouts/Dashboard/Job_Card";
import Label from "../common/Label";
import ButtonIcon from "../common/ButtonIcon";
import { motion, AnimatePresence } from "framer-motion";
function Jobs() {
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

  const cardDetails = [
    {
      id: "job-1",
      job_name: "Senior Software Engineer",
      status: "Active",
      location: "Bangalore, India",
      contract_type: "Full-time",
      stipend_range: "15-20 LPA",
      slots_available: "25 available",
      date_posted: "4 days ago",
    },
    {
      id: "job-2",
      job_name: "Product Manager",
      status: "Snoozing",
      location: "Mumbai, India",
      contract_type: "Full-time",
      stipend_range: "20-30 LPA",
      slots_available: "10 available",
      date_posted: "5 days ago",
    },
    {
      id: "job-3",
      job_name: "DevOps",
      status: "UnActive",
      location: "Pune, India",
      contract_type: "Contract",
      stipend_range: "18-28 LPA",
      slots_available: "25 available",
      date_posted: "6 days ago",
    },
  ];

  const handlePostJob = () => {
    navigate("Job-form");
  };

  return (
    <section
      ref={containerRef}
      className="w-full relative h-full flex flex-col px-6 pt-4 pb-10 overflow-y-auto shadow-inner-lighter bg-white"
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
            {cardDetails.map((card, index) => (
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={card.id}
                className="w-full"
              >
                <Job_Card card={card} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}

export default Jobs;
