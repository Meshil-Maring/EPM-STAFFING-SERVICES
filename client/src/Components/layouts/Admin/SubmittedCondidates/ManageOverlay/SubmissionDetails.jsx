import React from "react";
import Label from "../../../../common/Label";
import Icon from "../../../../common/Icon";
import NameInitials from "../../../../common/NameInitials";

function SubmissionDetails({ submission_details, company, heading_class }) {
  return (
    <div className="w-full flex gap-2 flex-col items-start">
      <Label text={"Submission Details"} class_name={heading_class} />
      <div className="w-full flex flex-row text-xs items-start justify-between gap-2">
        {submission_details.map((item, i) => {
          return item.label === "Client Company" ? (
            <div
              key={`submission-${i}`}
              className="w-full whitespace-nowrap flex items-start gap-2 justify-start flex-row"
            >
              <NameInitials
                name={company?.name}
                class_name="w-8 h-8 bg-[#dd6b20] rounded-small text-text_white flex items-center justify-center"
              />
              <div
                className={`w-full flex flex-col items-start justify-between`}
              >
                <Label
                  text={item.label}
                  class_name={"font-lighter text-xs text-nevy_blue"}
                />
                <Label text={item.val1} class_name={"font-semibold text-sm"} />
                <Label
                  text={`Submitted on: ${item.val2}`}
                  class_name={"text-xs"}
                />
              </div>
            </div>
          ) : (
            <div
              key={`submission-${i}`}
              className={`items-start w-full flex flex-col ${i === 1 ? "border-l border-r border-light px-1" : ""}`}
            >
              <Label
                text={item.label}
                class_name={"font-lighter text-nevy_blue"}
              />
              <Label text={item.val} class_name={""} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SubmissionDetails;
