import React from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import DetailContainer from "../../../common/DetailContainer";

function CompanyInfoSection({
  company,
  contactElements,
  businessDetails,
  heading_class,
}) {
  return (
    <div className="w-full gap-10 flex flex-col items-center justify-start">
      <div className="w-full flex flex-col items-start justify--start">
        <Label text={"Contact Information"} class_name={heading_class} />
        <div className="w-full grid grid-cols-2 gap-4 items-center justify-center overflow-hidden">
          {contactElements.map((el, i) => (
            <DetailContainer
              key={`element-${i}`}
              icon={el.icon}
              label={el.label}
              value={
                company[el.key] || company[el.label.toLowerCase()] || "N/A"
              }
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-start">
        <Label text={"Business Details"} class_name={heading_class} />
        <div className="w-full flex flex-row gap-4 items-start justify-start flex-wrap">
          {businessDetails.map((item, i) => (
            <DetailContainer
              key={`business-${i}`}
              icon={item.icon}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-start">
        <Label text={"Notes (Description)"} class_name={heading_class} />
        <div className="w-full flex flex-row items-start justify-start gap-1 p-2 bg-nevy_blue/10 rounded-small">
          <Icon icon={"ri-file-text-line"} class_name="text-lg w-5 h-5" />
          <Label text={company.description} class_name={""} />
        </div>
      </div>
    </div>
  );
}

export default CompanyInfoSection;
