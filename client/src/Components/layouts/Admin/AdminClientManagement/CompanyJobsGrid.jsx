import React, { useEffect, useState } from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";

function CompanyJobsGrid({
  relatedJobs,
  jobs,
  onJobAction,
  heading_class,
  getTotal,
  getDays,
}) {
  const [all, setAll] = useState(false);
  const displayed_jobs = all ? relatedJobs : relatedJobs.slice(0, 3);
  return (
    <div className="w-full gap-2 grid grid-cols-1 items-center">
      <div
        className={`gap-2 flex flex-row items-center justify-start ${heading_class}`}
      >
        <Label
          text={`Active Job Openings (${relatedJobs.length})`}
          class_name={""}
        />
        <div
          onClick={() => setAll((prev) => !prev)}
          className="flex items-center justify-center h-fit w-fit cursor-pointer"
        >
          <Label
            text={all ? "Show Less" : "Show All"}
            class_name="text-nevy_blue font-lighter text-xs tracking-wide"
          />
        </div>
      </div>
      <div
        className={`w-full flex flex-col items-start justify-start gap-2 h-full overflow-y-auto no-scrollbar sticky top-10 overflow-hidden`}
      >
        {displayed_jobs.map((key, i) => {
          const job = jobs[key];
          const total_candidates = getTotal(key);
          const days_posted = getDays(key);
          return (
            <div
              key={`job-${i}`}
              className="w-full gap-2 flex flex-row items-start jsutify-start ga-2 p-2 rounded-small bg-lighter"
            >
              <Icon
                icon={"ri-suitcase-line"}
                class_name="w-8 h-8 text-[clamp(1.2em,1vw,1.4em)] rounded-small p-1 bg-nevy_blue text-text_white"
              />
              <div className="flex-1 items-start justify-start flex flex-col">
                <div className="flex flex-row items-center justify-start gap-2">
                  <Label text={job["job title"]} class_name={""} />
                  <Label
                    text={"Add list"}
                    class_name="px-2 py-0.5 rounded-small bg-g_btn text-text_white text-xs cursor-pointer hover:scale-[1.04] transition-all duration-200 ease-in-out"
                  />
                </div>
                <div className="flex-1 text-[10px] gap-1 flex flex-row items-center justify-start">
                  <Label text={job["contract type"]} />
                  <span>•</span>
                  <Label
                    text={
                      total_candidates === 0
                        ? "No candidates yet"
                        : `${total_candidates} candidates`
                    }
                  />
                  <span>•</span>
                  <Label
                    text={`Posted ${days_posted === 0 ? "today" : `${days_posted} days ago`}`}
                  />
                </div>
              </div>
              <div className="flex text-xs flex-row gap-2 items-center justify-center">
                <div
                  onClick={() => onJobAction("View", job)}
                  className="w-fit cursor-pointer p-1 border border-light/50 rounded-small flex items-center justify-center hover:bg-lighter"
                >
                  <Icon icon={"ri-eye-line"} class_name="h-4 w-4 mr-1" />
                  <Label text={"View"} class_name="" />
                </div>
                <div
                  onClick={() => onJobAction("Submit", job)}
                  className="w-fit bg-Darkgold text-text_white cursor-pointer p-1 border border-light/50 rounded-small flex items-center justify-center hover:scale-[1.02]"
                >
                  <Label text={"Submit"} class_name="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CompanyJobsGrid;
