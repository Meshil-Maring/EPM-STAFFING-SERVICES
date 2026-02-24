import React, { useContext } from "react";
import Label from "../../../common/Label";
import { Jobs_context } from "../../../../context/JobsContext";
import { getSalaryRange } from "../common/GetSalaryRange";

function Details({ candidate }) {
  const { jobs } = useContext(Jobs_context) || {};

  const salary = jobs?.[candidate["job id"]]["expected ctc"] || "N/A - N/A";

  const label_elements = [
    { label: "Experience", value: candidate.experience },
    {
      label: "Expected",
      value: getSalaryRange(salary),
    },
    { label: "Submitted", value: candidate["date applied"] },
  ];

  // Check if candidate data exists

  return (
    <div className="w-full flex flex-row items-start justify-between gap-4">
      {label_elements.map((label, i) => {
        return (
          <div
            key={i}
            className={`w-full flex flex-col py-1 items-center justify-center bg-b_light_blue rounded-small ${label.label.toLocaleLowerCase() === "expected" ? "flex-2" : "flex-1"}`}
          >
            <Label
              text={label.label}
              class_name="text-xs font-lighter text-primary mt-1"
            />
            <Label text={label.value} class_name={"text-xs font-semibold"} />
          </div>
        );
      })}
    </div>
  );
}

export default Details;
