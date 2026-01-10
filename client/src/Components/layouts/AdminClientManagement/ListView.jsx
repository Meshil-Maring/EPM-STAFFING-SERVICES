import React from "react";
import Label from "../../common/Label";
import ListFirstPart from "./ListFirstPart";
import SecondPart from "./SecondPart";
import ButtonsPart from "./ButtonsPart";

function ListView({ company }) {
  const splitted_name = company.name.split(" ");
  const letter1 = splitted_name[0] ? splitted_name[0].slice(0, 1) : "";
  const letter2 = splitted_name[1] ? splitted_name[1].slice(0, 1) : "";
  const name_prefix = (letter1 + letter2).toUpperCase();
  return (
    <div className="flex flex-row items-center justify-start gap-4 w-full hover:bg-lighter px-1 rounded-small transition-all ease-in-out duration-120">
      {/* Company name, Prefix, field and status */}
      <ListFirstPart
        field={company.field}
        name={company.name}
        name_prefix={name_prefix}
        status={company.status}
      />
      {/* active or pending jobs */}
      <SecondPart
        active_jobs={company.active_jobs}
        pending_jobs={company.pending_jobs}
      />
      {/* view details and manage buttons */}
      <ButtonsPart email={company.email} joined_date={company.joined_date} />
      <div className="flex flex-col items-center justify-center text-[0.6em] font-lighter">
        <Label text={company.positions} class_name="font-semibold text-sm" />
        <Label text="Positions" class_name="" />
      </div>
    </div>
  );
}

export default ListView;
