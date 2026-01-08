import React, { lazy, Suspense, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const SearchInput = lazy(() => import("../common/SearchInput"));
const Job_Card = lazy(() => import("../layouts/Dashboard/Job_Card"));
const Label = lazy(() => import("../common/Label"));
const ButtonIcon = lazy(() => import("../common/ButtonIcon"));

function Jobs() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!target || !container) return;
    const updateScroll = () => {
      if (container.scrollTop > target.scrollTop) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    container.addEventListener("scroll", updateScroll);
    return () => container.removeEventListener("scroll", updateScroll);
  }, []);

  const cardDetails = [
    {
      job_name: "Senior Software Engineer",
      status: "Active",
      location: "Bangalore, India",
      contract_type: "Full-time",
      stipend_range: "15-20 LPA",
      slots_available: "25 available",
      date_posted: "4 days ago",
    },
    {
      job_name: "Product Manager",
      status: "Active",
      location: "Mumbai, India",
      contract_type: "Full-time",
      stipend_range: "20-30 LPA",
      slots_available: "10 available",
      date_posted: "5 days ago",
    },
    {
      job_name: "DevOps",
      status: "Active",
      location: "Pune, India",
      contract_type: "Contract",
      stipend_range: "18-28 LPA",
      slots_available: "25 available",
      date_posted: "6 days ago",
    },
  ];

  const handlePostJob = () => {
    navigate("JobForm");
  };

  return (
    <Suspense fallback={<div>Loading Content...</div>}>
      <div
        ref={containerRef}
        className="w-full gap-5 px-6 pt-4 pb-10 flex flex-col overflow-y-auto shadow-inner-lighter h-screen"
      >
        <motion.div
          ref={targetRef}
          animate={{
            boxShadow: scrolled
              ? " 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
              : "0 0px 0px rgba(0, 0, 0, 0)",
          }}
          className="sticky top-0 z-10 w-full gap-4 flex flex-col p-4 rounded-small bg-white backdrop-blur-md"
        >
          <div className="w-full flex flex-row items-center justify-start">
            <div className="flex w-full flex-1 flex-col items-start leading-4 justify-center">
              <Label class_name="text-lg" text="Active Job Listings" />
              <Label
                class_name="text-sm"
                text="Recruitment Management Dashboard"
              />
            </div>
            <span className="min-w-35 flex h-10">
              <ButtonIcon
                text="Post New Job"
                icon="ri-add-line"
                id="nav"
                onSelect={handlePostJob}
                clicked
                set_gradient={true}
                shadow={true}
              />
            </span>
          </div>
          <SearchInput />
        </motion.div>
        <div className="flex flex-col items-start pb-10 justify-center gap-10">
          {cardDetails.map((card, index) => (
            <Job_Card key={index} {...card} />
          ))}
        </div>
      </div>
    </Suspense>
  );
}

export default Jobs;
