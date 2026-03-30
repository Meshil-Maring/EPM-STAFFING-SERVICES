import React from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

/**
 * EmploymentDetails component - Displays employment details for the OfferReleased section
 * This component shows job-related information including employment type, notice period,
 * working hours, reporting structure, and office location
 *
 * @param {Object} props - Component props
 * @param {Object} props.job - Job object containing employment details
 * @returns {JSX.Element} Rendered employment details component
 */
function EmploymentDetails({ job }) {
  // employment details section - structured to match the image layout
  const employment_details = {
    top: [
      {
        label: "Employment Type",
        id: "employment_type",
        value: job?.["contract type"] || "N/A", // Using correct key from job data
      },
      {
        label: "Notice Period",
        id: "notice_period",
        value: job?.["notice period"] || "N/A", // Using correct key from job data
      },
      {
        label: "Working Hours",
        id: "working_hours",
        value: job?.["working hours"] || "N/A", // Using correct key from job data
      },
    ],
    middle: [
      {
        label: "Reporting To",
        id: "reporting_to",
        icon: "ri-user-line",
        res_personnel_name: job?.["personnel"] || "N/A",
        res_personnel_title: job?.["personnel title"] || "N/A", // Using correct key from job data
      },
    ],
    bottom: [
      {
        label: "Office Location",
        id: "office_location",
        icon: "ri-map-pin-line",
        location: job?.["location"] || "N/A",
      },
    ],
  };
  const elements_keys = Object.keys(employment_details);
  return (
    <div className="w-full grid grid-cols-1 border border-light/60 rounded-small p-2 text-xs items-center justify-start">
      <div className="w-full items-center justify-start gap-1 flex text-sm">
        <Icon
          icon="ri-suitcase-line"
          class_name="p-1 w-8 h-8 rounded-small bg-blue/80 text-text_white text-lg"
        />
        <Label text="Employment Details" class_name="font-semibold" />
      </div>
      {elements_keys.map((key) => {
        return (
          <div
            key={key}
            className={`flex w-full items-center justify-between flex-row flex-wrap gap-4 ${key !== "top" ? "border-t border-light/60" : ""}`}
          >
            {employment_details[key].map((item) => {
              return (
                <div
                  key={item.id}
                  className={`w-fit flex flex-1 p-2 rounded-small flex-col`}
                >
                  <Label text={item.label} />
                  <div className={`flex flex-row items-center justify-start`}>
                    {item.icon && <Icon icon={item.icon} class_name="-ml-1" />}
                    {item.id === "reporting_to" ? (
                      // Special rendering for Reporting To section
                      <div className="flex flex-row items-center justify-center">
                        <Label
                          text={item.res_personnel_name}
                          class_name="font-semibold"
                        />
                        -
                        <Label
                          text={item.res_personnel_title}
                          class_name="text-text_l_b"
                        />
                      </div>
                    ) : item.id === "office_location" ? (
                      // Special rendering for Office Location section
                      <Label text={item.location} class_name="font-semibold" />
                    ) : (
                      // Default rendering for other sections
                      <Label text={item.value} class_name="font-semibold" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default EmploymentDetails;
