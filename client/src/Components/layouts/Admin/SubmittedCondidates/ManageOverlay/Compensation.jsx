import React from "react";
import Label from "../../../../common/Label";
import Icon from "../../../../common/Icon";
import { getSalaryRange } from "../../common/GetSalaryRange";

function Compensation({ heading_class, job, candidate }) {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-1">
      <Label text={"Compensation"} class_name={heading_class} />
      <div className="w-full grid grid-cols-2 gap-4">
        {[
          {
            label: "Current Salary",
            val: candidate
              ? getSalaryRange(candidate["current ctc"])
              : "Not specified",
          },
          {
            label: "Expected Salary",
            val: job ? getSalaryRange(job["expected ctc"]) : "Not specified",
          },
        ].map((item, i) => {
          return (
            <div
              key={`comp-${i}`}
              className="w-full bg-red-lighter/20 border border-red-dark/40 p-2 rounded-small flex flex-row items-center justify-start gap-1"
            >
              <Icon
                icon={"ri-line-chart-line"}
                class_name="text-text_white bg-red-dark rounded-small p-2 text-sm flex items-center justify-center"
              />
              <div className="flex flex-col items-start justify-start">
                <Label text={item.label} class_name={""} />
                {item.label !== "Resume"}
                <Label text={item.val} class_name={""} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Compensation;
