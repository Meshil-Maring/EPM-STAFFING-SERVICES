import React from "react";
import Icon from "../../common/Icon";
import Label from "../../common/Label";
import more_details_job_elements from "../../dummy_data_structures/more_details_job_elements.json";
import { getSalaryRange } from "../Admin/common/GetSalaryRange";
function MoreDetails({ selected_job }) {
  return (
    <div className="w-full flex flex-col items-start gap-6">
      {/* Title Section */}
      <Label
        text={selected_job.status}
        class_name={`w-fit rounded-full text-[10px] font-bold py-1 px-3 uppercase tracking-widest ${
          selected_job.status === "Active"
            ? "bg-light_green text-text_green"
            : selected_job.status === "Snoozed"
              ? "text-Darkgold bg-gold_lighter"
              : "text-red-dark bg-red-light"
        }`}
      />

      {/* Info Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {more_details_job_elements.map((info, index) => {
          const isSalary = info.label.toLocaleLowerCase() === "current ctc";
          const isExperience = info.label === "Experience";
          const value = isExperience
            ? selected_job["experience required"]
            : isSalary
              ? getSalaryRange(selected_job["expected ctc"])
              : selected_job[info.label.toLowerCase()];

          return (
            <div
              key={index}
              className="flex flex-row items-start justify-center gap-1 p-1.5 rounded-small border border-lighter bg-b_white/50 hover:bg-b_white transition-colors"
            >
              <div className="flex w-4 h-4 items-center justify-center">
                <Icon icon={info.icon} class_name="text-nevy_blue text-lg" />
              </div>
              <div className="flex flex-col flex-1">
                <Label
                  text={info.label}
                  class_name="text-[10px] uppercase font-semibold text-text_b/80 whitespace-nowrap tracking-wide"
                />

                <Label
                  text={value}
                  class_name="text-sm font-semibold text-text_b"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Description */}
      <div className="flex flex-col p-2 rounded-lg bg-blue-50/30 border border-blue-100/50 w-full">
        <header className="flex flex-row items-center text-nevy_blue">
          <Icon icon="ri-file-text-line" class_name="text-lg" />
          <Label text="Job Description" class_name="font-bold text-sm" />
        </header>
        <p className="text-sm leading-relaxed text-text_l_b">
          {selected_job["job description"]}
        </p>
      </div>
    </div>
  );
}

export default MoreDetails;
