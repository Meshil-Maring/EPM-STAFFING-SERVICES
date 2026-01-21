import React, { useMemo } from "react";
import Label from "../../common/Label";
import ListFirstPart from "./ListFirstPart";
import SecondPart from "./SecondPart";
import ButtonsPart from "./ButtonsPart";

function ListView({ company }) {
  const name_prefix = useMemo(() => {
    const splitted_name = company.name.trim().split(/\s+/);
    const letter1 = splitted_name[0] ? splitted_name[0].charAt(0) : "";
    const letter2 = splitted_name[1] ? splitted_name[1].charAt(0) : "";
    return (letter1 + letter2).toUpperCase();
  }, [company.name]);

  return (
    <li className="flex flex-row items-center justify-between transition-all duration-200">
      <div className="flex flex-row items-center justify-start gap-2 flex-1">
        <ListFirstPart
          field={company.field}
          name={company.name}
          name_prefix={name_prefix}
          status={company.status}
        />
      </div>

      <div className="flex flex-row items-center justify-between gap-2">
        <SecondPart
          active_jobs={company.active_jobs}
          pending_jobs={company.pending_jobs}
        />

        <div className="flex font-semibold flex-col items-center justify-center shrink-0">
          <Label text={company.positions} class_name="text-sm text-text_b" />
          <Label
            as="span"
            text="Openings"
            class_name="text-[10px] text-text_b_l opacity-60 uppercase tracking-wide"
          />
        </div>

        <ButtonsPart email={company.email} joined_date={company.joined_date} />
      </div>
    </li>
  );
}

export default ListView;
