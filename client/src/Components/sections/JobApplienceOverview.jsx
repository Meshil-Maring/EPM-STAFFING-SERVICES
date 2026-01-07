import React, { useEffect, useRef, useState } from "react";
import ButtonIcon from "../common/ButtonIcon";
import InforCards from "../layouts/Dashboard/InforCards";
import Label from "../common/Label";
import CardJobDetails from "../layouts/Dashboard/CardJobDetails";
import OverviewCards from "../layouts/Dashboard/OverviewCards";
import { candidate_details } from "../dummy_data_structures/candidate_details";
import { motion } from "framer-motion";

function JobApplienceOverview() {
  const handlePostJob = () => {
    alert("Hello");
  };

  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    const container = containerRef.current;
    if (!target || !container) return;
    const updateScroll = () => {
      if (container.scrollTop > target.scrollTop) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    container.addEventListener("scroll", updateScroll);
    return () => {
      container.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full items-start text-primary justify-start flex flex-col px-6 pt-8 pb-60 overflow-y-auto gap-4"
    >
      {/* Full stack header */}
      <motion.div
        animate={{
          boxShadow: isScrolled
            ? " 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
            : "0 0px 0px rgba(0, 0, 0, 0)",
        }}
        ref={targetRef}
        className="sticky w-full top-0 z-10 flex flex-row items-center justify-between bg-white backdrop-blur-md rounded-small p-4"
      >
        <div className="flex flex-1 flex-col items-start leading-4 justify-center">
          <Label
            text="Full Stack Developer - Candidate Pipeline"
            class_name="text-xl"
          />
          <Label
            text="Manage candidates for this position"
            class_name="text-sm"
          />
        </div>

        <span className="w-40 flex h-10">
          <ButtonIcon
            text="32 Total"
            id="nav"
            icon="ri-group-line"
            onSelect={handlePostJob}
          />
        </span>
      </motion.div>

      {/* OverView cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, type: "tween" }}
        className="py-2 w-full"
      >
        <InforCards />
      </motion.div>

      {/* Job Details Card */}
      <CardJobDetails />

      {/* Candidate Overview Cards */}
      {candidate_details.map((candidate, index) => (
        <OverviewCards candidate={candidate} key={index} id={index} />
      ))}
    </div>
  );
}

export default JobApplienceOverview;
