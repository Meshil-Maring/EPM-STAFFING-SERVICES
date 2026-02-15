import React, { useContext } from "react";
import Label from "../../../common/Label";
import { motion } from "framer-motion";
import { Candidates_context } from "../../../../context/CandidatesContext";
import { Jobs_context } from "../../../../context/JobsContext";
import { formatValue } from "../../../common/formatText";

function Details({ cand_index }) {
  const { candidates } = useContext(Candidates_context) || {};
  const { jobs } = useContext(Jobs_context) || {};
  const labels = ["Experience", "Expected", "Submitted"];

  // Check if candidate data exists
  const candidate = candidates?.[cand_index];
  if (!candidate) {
    return (
      <div className="w-full flex flex-row items-start justify-between gap-4">
        {labels.map((label, i) => (
          <div
            key={i}
            className="w-full flex flex-col py-1 items-center justify-center bg-b_light_blue rounded-small"
          >
            <Label
              text={label}
              class_name="text-xs font-lighter text-primary mt-1"
            />
            <Label text="N/A" class_name={"text-xs font-semibold"} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-row items-start justify-between gap-4">
      {labels.map((label, i) => {
        let value = "N/A";
        switch (label) {
          case "Experience":
            value = candidate.experience || "N/A";
            break;
          case "Expected":
            const job_id = candidate["job id"];
            const jobData = jobs?.[job_id];
            if (jobData && jobData["current ctc"]) {
              const salary = jobData["current ctc"];
              const [min, max] = salary.split("-");
              value = `${formatValue(min.trim())} - ${formatValue(max.trim())}`;
            } else {
              value = "N/A";
            }
            break;
          case "Submitted":
            value = candidate["date applied"] || "N/A";
            break;
        }
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * i, type: "tween" }}
            key={i}
            className="w-full flex flex-col py-1 items-center justify-center bg-b_light_blue rounded-small"
          >
            <Label
              text={label}
              class_name="text-xs font-lighter text-primary mt-1"
            />
            <Label text={value} class_name={"text-xs font-semibold"} />
          </motion.div>
        );
      })}
    </div>
  );
}

export default Details;
