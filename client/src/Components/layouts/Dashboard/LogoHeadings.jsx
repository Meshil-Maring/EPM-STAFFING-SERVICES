import React from "react";
import Label from "../../common/Label";
import Image from "../../common/image";

function ButtonHeadings() {
  return (
    <div className="flex flex-row text-primary items-center justify-start gap-4">
      <Image
        link="https://i.ibb.co/LDNxqKYW/Logo-EPM-1.png"
        class_name="-m-3 ml-none h-14 w-14 rounded-full object-contaicover "
      />
      <div className="flex w-full flex-col items-start leading-4 justify-center">
        <Label
          text={"EMP STAFFING SERVICES OPC PVT.LTD."}
          class_name="text-xl font-semibold"

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
