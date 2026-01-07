import React from "react";
import Label from "../../common/Label";
import Image from "../../common/image";

function ButtonHeadings() {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <div className="h-12 rounded-full flex items-center justify-center">
        <Image link="https://i.ibb.co/LDNxqKYW/Logo-EPM-1.png" />
      </div>
      <div className="flex w-full flex-col items-start leading-4 justify-center">
        <Label
          text={"EMP STAFFING SERVICES OPC PVT.LTD."}
          class_name="text-sm text-primary text-bold"
        />
        <Label
          text={"Recruitement Management Dashboard"}
          class_name="text-sm text-light"
        />
      </div>
    </div>
  );
}

export default ButtonHeadings;
