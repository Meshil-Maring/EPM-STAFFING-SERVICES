import React, { useState, useEffect, useContext } from "react";
import Icon from "../../../common/Icon";
import Input from "../../../common/Input";
import { motion } from "framer-motion";
import Label from "../../../common/Label";
import { Jobs_context } from "../../../../context/JobsContext";

function CandidateNavBar({ setFilterdCandidates, candidates }) {
  const { jobs } = useContext(Jobs_context) || {};
  const [clickedBtn, setClickedBtn] = useState("All");
  const [search_key, setSearch_key] = useState("All");
  const [f_number, setF_number] = useState(1);
  const [filteredCandidates, setFilteredCandidates] = useState(
    candidates || {},
  );
  const buttons = ["All", "Pending", "Interviewed", "Accepted", "Rejected"];
  const handleBtnClick = (name) => {
    setClickedBtn(name);

    setSearch_key(name);
    // Reset to first page when filter changes
    setF_number(1);
  };

  useEffect(() => {
    let filtered = candidates || {};
    const isNavButton =
      search_key === "Pending" ||
      search_key === "Interviewed" ||
      search_key === "Accepted" ||
      search_key === "Rejected";
    if (search_key !== "All") {
      if (isNavButton) {
        filtered = Object.keys(candidates || {}).reduce((acc, key) => {
          const candidate = candidates[key];
          if (candidate && candidate.status === search_key.trim()) {
            acc[key] = candidate;
          }
          return acc;
        }, {});
      } else {
        const s_key = (search_key || "").toLocaleLowerCase().trim();
        filtered = Object.keys(candidates || {}).reduce((acc, key) => {
          const candidate = candidates[key];
          const name =
            typeof candidate?.name === "string"
              ? candidate.name.toLocaleLowerCase()
              : "";
          const status =
            typeof candidate?.status === "string"
              ? candidate.status.toLocaleLowerCase()
              : "";
          const jobTitle =
            jobs?.[candidate?.["job id"]]?.["job title"] &&
            typeof jobs[candidate["job id"]]["job title"] === "string"
              ? jobs[candidate["job id"]]["job title"].toLocaleLowerCase()
              : "";

          if (
            name.includes(s_key) ||
            status.includes(s_key) ||
            jobTitle.includes(s_key)
          ) {
            acc[key] = candidate;
          }
          return acc;
        }, {});
      }
    }

    setFilteredCandidates(filtered);
    setF_number(1); // Reset to first page
  }, [search_key, candidates]);

  const handleTypingSearchKey = (value, id) => {
    setSearch_key(value);
  };

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

  const navArrows = `font-semibold py-3  w-20 border border-light flex transition-all duration-200 ease-in-out cursor-pointer items-center justify-center rounded-small text-[clamp(1.2em,2vw,1.4em)] text-text_white ${t_frame > 1 ? "bg-blue/80 hover:bg-blue" : "bg-blue/20 cursor-not-allowed"}`;

  return (
    <div className="w-full sticky top-0 bg-b_white z-20 py-4 flex flex-col gap-4 items-end">
      <div className="w-full flex flex-row gap-4 items-center text-[clamp(1em,1vw,1.2em)] justify-between">
        <div className="relative rounded-small flex-1">
          <Icon
            icon={"ri-search-line"}
            class_name="absolute left-2 top-0 bottom-0 font-lighter"
          />
          <Input
            onchange={handleTypingSearchKey}
            placeholder={"Search Candidates by name, job title, status..."}
            class_name={
              "w-full px-10 py-1.5 rounded-small border border-inputBorder focus:ring ring-highLightBorder focus:outline-none focus:border-none"
            }
          />
        </div>
        <div className="flex flex-row items-center justify-start gap-2 flex-wrap">
          {buttons.map((btn, i) => {
            const isActive = btn === clickedBtn;
            return (
              <div
                className={`w-fit px-2 py-1 cursor-pointer rounded-small border-lighter ${isActive ? "bg-g_btn text-text_white" : "hover:bg-light hover:text-text_white"}`}
                key={i}
                onClick={() => handleBtnClick(btn)}
              >
                <Label text={btn} className="" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full text-[clamp(0.6em,1vw,0.8em)] flex flex-row items-center justify-between gap-4">
        <span onClick={() => handleFrames("prev")} className={navArrows}>
          <Icon icon={"ri-arrow-left-line"} class_name={"w-4 h-4"} />
        </span>
        <div className="flex flex-row items-center justify-center gap-1">
          <Label text={f_number} class_name={""} />/
          <Label text={"Out of " + t_frame} />
        </div>
        <span onClick={() => handleFrames("next")} className={navArrows}>
          <Icon icon={"ri-arrow-right-line"} class_name={"w-4 h-4"} />
        </span>
      </div>
    </div>
  );
}

export default CandidateNavBar;
