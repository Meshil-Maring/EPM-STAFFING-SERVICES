import React from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";
import { getSalaryRange } from "../common/GetSalaryRange";

function CompanyRequirements({ job }) {
  const icons = [
    {
      icon: "₹",
      label: "Expected CTC",
      value: getSalaryRange(job["expected ctc"]),
    },
    { label: "Location", icon: "ri-map-pin-line", value: job.location },
    {
      label: "Experience",
      icon: "ri-time-line",
      value: job["experience required"],
    },
    {
      label: "Job type",
      icon: "ri-suitcase-line",
      value: job["contract type"],
    },
  ];

  const icon_style = `text-lg font-lighter bg-b_white rounded-small w-10 flex items-center justify-center h-10`;
  const label_style = "font-semibold text-xs uppercase text-text_b/50";
  const value_style = "font-semibold text-sm text-text_l_b/90";

  return (
    <div className="w-full flex flex-row items-start justify-start gap-4">
      <Icon
        icon={"ri-suitcase-line"}
        class_name="p-2 rounded-small bg-Darkgold text-text_white flex items-center justify-center bg-goldColor w-12 h-12 text-[clamp(1.2em,2vw,1.4em)]"
      />
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <div className="flex flex-col items-start justify-start">
          <Label text={"Job Requirements"} class_name={""} />
          <Label
            text={`${job["job title"]} - ${job["experience required"]}`}
            class_name={""}
          />
        </div>
        <div className="gap-10 flex flex-row items-start justify-between">
          {icons.map((icon) => {
            const isSalary = icon.label === "Expected CTC";
            return (
              <div
                key={icon.label}
                className={`gap-2 flex flex-row items-start justify-start ${icon.label.toLocaleLowerCase() === "expected ctc" || icon.label.toLocaleLowerCase() === "location" ? "text-red-dark" : ""}`}
              >
                {isSalary ? (
                  <span className={icon_style}>{icon.icon}</span>
                ) : (
                  <Icon icon={icon.icon} class_name={icon_style} />
                )}
                <div className="flex flex-col items-start justify-start">
                  <Label text={icon.label} class_name={label_style} />
                  <Label text={icon.value} class_name={value_style} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CompanyRequirements;
