import React from "react";
import Label from "../../common/Label";

function CompanyCardTopPart({
  name_prefix,
  field,
  status,
  positions,
  company_name,
}) {
  const isActive = status === "Active";

  return (
    <header className="flex gap-3 flex-row w-full items-center justify-start border-b border-lighter/30 pb-3">
      <div
        className="h-12 w-12 text-white bg-d_blue rounded-small text-xl font-bold flex items-center justify-center shrink-0 shadow-sm"
        aria-hidden="true"
      >
        <span>{name_prefix}</span>
      </div>

      <div className="flex flex-col items-start justify-center overflow-hidden flex-1">
        <Label
          as="h3"
          text={company_name}
          class_name="text-base md:text-lg font-bold truncate w-full text-text_b leading-tight"
        />

        <div className="flex flex-row text-[11px] font-bold items-center justify-start gap-3 mt-1 uppercase tracking-wide">
          <Label
            as="span"
            text={field}
            class_name="px-2 py-0.5 rounded-small bg-lighter text-text_b_l border border-lighter"
          />
          <div className="flex items-center gap-1.5 ml-1">
            <span
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-Darkgold" : "bg-nevy_blue"
              }`}
              aria-hidden="true"
            />
            <Label
              as="span"
              text={status}
              class_name={isActive ? "text-Darkgold" : "text-nevy_blue"}
            />
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-center ml-auto justify-center px-3 py-1 bg-hover-light/50 rounded-small shrink-0 border border-lighter/50"
        aria-label={`${positions} open positions`}
      >
        <Label
          as="span"
          text={positions}
          class_name="text-lg font-extrabold text-text_b"
        />
        <Label
          as="span"
          text="Openings"
          class_name="text-[10px] font-bold opacity-70"
        />
      </div>
    </header>
  );
}

export default CompanyCardTopPart;
