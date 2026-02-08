import React, { useState, useEffect } from "react";
import Icon from "../../../common/Icon";
import Input from "../../../common/Input";
import { motion } from "framer-motion";
import Label from "../../../common/Label";
import Candidates_Information from "../../../dummy_data_structures/Candidate_information.json";

function CandidateNavBar({ setFilterdCandidates }) {
  const [clickedBtn, setClickedBtn] = useState("All");
  const [search_key, setSearch_key] = useState("All");
  const [f_number, setF_number] = useState(1);
  const [filteredCandidates, setFilteredCandidates] = useState(
    Candidates_Information,
  );
  const buttons = ["All", "Pending", "Interviewing", "Accepted", "Rejected"];
  const handleBtnClick = (name) => {
    setClickedBtn(name);

    setSearch_key(name);
    // Reset to first page when filter changes
    setF_number(1);
  };

  useEffect(() => {
    let filtered = Candidates_Information;

    if (search_key !== "All") {
      filtered = Object.keys(Candidates_Information).reduce((acc, key) => {
        const candidate = Candidates_Information[key];
        if (candidate.status === search_key.trim()) {
          acc[key] = candidate;
        }
        return acc;
      }, {});
    }

    setFilteredCandidates(filtered);
    setF_number(1); // Reset to first page
  }, [search_key]);

  const get_frames = () => {
    const total = Object.keys(filteredCandidates).length;
    const frames = Math.ceil(total / 6); // Changed from 5 to 6 candidates per frame
    return frames;
  };

  const t_frame = get_frames();

  const handleFrames = (direction) => {
    if (direction === "prev") {
      setF_number((prev) => (prev > 1 ? prev - 1 : prev));
    } else if (direction === "next") {
      setF_number((prev) => (prev < t_frame ? prev + 1 : prev));
    }
  };

  // Apply pagination to the filtered candidates
  useEffect(() => {
    const totalCandidates = Object.keys(filteredCandidates);
    const pageSize = 6;
    const startIndex = (f_number - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedKeys = totalCandidates.slice(startIndex, endIndex);

    // Create paginated candidate object
    const paginatedCandidates = paginatedKeys.reduce((acc, key) => {
      acc[key] = filteredCandidates[key];
      return acc;
    }, {});

    setFilterdCandidates(paginatedCandidates);
  }, [filteredCandidates, f_number]);
  return (
    <div className="w-full sticky top-0 bg-b_white z-20 py-4 flex flex-col gap-4 items-end">
      <div className="w-full flex flex-row gap-4 items-center text-[clamp(1em,1vw,1.2em)] justify-between">
        <div className="relative rounded-small flex-1">
          <Icon
            icon={"ri-search-line"}
            class_name="absolute left-2 top-0 bottom-0 font-lighter"
          />
          <Input
            placeholder={"Search Candidates by name, job title, status..."}
            class_name={
              "w-full px-8 py-1.5 rounded-small border border-inputBorder focus:ring ring-highLightBorder focus:outline-none focus:border-none"
            }
          />
        </div>
        <div className="flex flex-row items-center justify-start gap-2 flex-wrap">
          {buttons.map((btn, i) => {
            const isActive = btn === clickedBtn;
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  type: "tween",
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
                className={`w-fit px-2 py-1 rounded-small border-lighter ${isActive ? "bg-g_btn text-text_white" : "hover:bg-light hover:text-text_white"}`}
                key={i}
                onClick={() => handleBtnClick(btn)}
              >
                <Label text={btn} className="" />
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="w-full text-[clamp(0.6em,1vw,0.8em)] flex flex-row items-center justify-end gap-4">
        <span
          onClick={() => handleFrames("prev")}
          className="font-semibold py-1 px-2 border border-light flex hover:bg-lighter transition-all duration-200 ease-in-out cursor-pointer items-center justify-center rounded-small text-[clamp(1em,2vw,1.2em)]"
        >
          <Icon icon={"ri-arrow-left-line"} class_name={"w-4 h-4"} />
        </span>
        <div className="flex flex-row items-center justify-center gap-1">
          <Label text={f_number} class_name={""} />/
          <Label text={"Out of " + t_frame} />
        </div>
        <span
          onClick={() => handleFrames("next")}
          className="font-semibold py-1 px-2 border border-light flex hover:bg-lighter transition-all duration-200 ease-in-out cursor-pointer items-center justify-center rounded-small text-[clamp(1em,2vw,1.2em)]"
        >
          <Icon icon={"ri-arrow-right-line"} class_name={"w-4 h-4"} />
        </span>
      </div>
    </div>
  );
}

export default CandidateNavBar;
