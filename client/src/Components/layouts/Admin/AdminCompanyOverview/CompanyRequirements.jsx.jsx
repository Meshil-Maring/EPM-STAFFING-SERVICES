import React from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

function CompanyRequirements({ company }) {
  return (
    <div className="w-full flex flex-row items-start justify-start gap-2">
      <Icon
        icon={"ri-suitcase-line"}
        class_name="p-2 rounded-small flex items-center justify-center bg-goldColor text-[clamp(1em,1vw,1.2em)]"
      />
      <div className="flex-1 flex flex-col items-center justify-start gap-2">
        <div className="flex flex-col items-start justify-start">
          <Label text={"Job Requirements"} class_name={""} />
          <Label
            text={`${company.name} - ${company["experience required"]}`}
            class_name={""}
          />
        </div>
      </div>
    </div>
  );
}

export default CompanyRequirements;
