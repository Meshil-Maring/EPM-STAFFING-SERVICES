import React from "react";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import NameInitials from "../../../common/NameInitials";

function CompanyManageOverlay({ company, setClosing }) {
  if (!company)
    return (
      <div className="w-full h-full flex items-center justify-center bg-lighter p-2">
        <p className="font-semibold text-lg text-text_l_b">
          No Information Loaded about this Company
        </p>
      </div>
    );

  return (
    <div
      onClick={() => setClosing(false)}
      className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-light_black z-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[40%] overflow-hidden h-[80%] rounded-small bg-b_white flex flex-col justify-start gap-4"
      >
        <header className="w-full flex flex-row items-center justify-between p-4 border-b border-lighter">
          <div className="flex items-center gap-2">
            <NameInitials
              name={company.name}
              class_name="w-10 h-10 shadow-xl"
            />
            <div className="flex flex-col">
              <Label text={company.name} class_name="font-semibold" />
              <Label text={company.field} class_name="text-xs" />
            </div>
          </div>
          <span
            onClick={() => setClosing(false)}
            className="cursor-pointer w-8 h-8 transition-all duration-200 ease-in-out flex items-center justify-start p-2 rounded-full hover:bg-lighter"
          >
            <Icon
              icon={"ri-close-line"}
              class_name="w-full h-full flex items-center justify-center font-semibold text-lg"
            />
          </span>
        </header>
        <div className="w-full p-4 overflow-y-auto no-scrollbar flex flex-col gap-4">
          <div>
            <Label text={"Contact"} class_name="font-semibold" />
            <Label text={`Email: ${company.email || "-"}`} />
            <Label text={`Phone: ${company.phone || "-"}`} />
            <Label text={`Address: ${company.address || "-"}`} />
          </div>
          <div>
            <Label text={"Stats"} class_name="font-semibold" />
            <Label text={`Active Jobs: ${company["active jobs"] || 0}`} />
            <Label text={`Pending Jobs: ${company["pending jobs"] || 0}`} />
            <Label text={`Positions: ${company.positions || 0}`} />
          </div>
          <div>
            <Label text={"Notes"} class_name="font-semibold" />
            <Label text={company.notes || "No notes"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyManageOverlay;
