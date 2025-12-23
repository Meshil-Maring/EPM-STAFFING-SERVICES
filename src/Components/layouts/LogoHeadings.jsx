import React from "react";
import Label from "../common/Label";
import Logo from "../common/Logo";

function ButtonHeadings() {
  return (
    <div className="flex flex-row gap-2  ">
      {/* <Logo /> */}
      <div className="h-12 rounded-full flex items-center justify-center">
        <img
          src="https://i.ibb.co/nMCqWxFP/healthcarelogo1.jpg"
          alt=""
          className="h-full object-cover rounded-full"
        />
      </div>
      <div className="flex w-full flex-col items-start leading-4 justify-center">
        <Label
          text={"EMP STAFFING SERVICES OPC PVT.LTD."}
          font_size={"xl"}
          color={"secondary"}
        />
        <Label
          text={"Recruitement Management Dashboard"}
          font_size={"sm"}
          color={"light"}
        />
      </div>
    </div>
  );
}

export default ButtonHeadings;
