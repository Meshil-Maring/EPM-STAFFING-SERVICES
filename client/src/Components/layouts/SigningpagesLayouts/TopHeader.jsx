import React from "react";
import Label from "../../common/Label";
import Image from "../../common/image";

function TopHeader() {
  return (
    <div className="flex px-10 gap-2 absolute top-0 left-0 items-center justify-start flex-row shadow-lg w-full">
      <Image
        link="https://i.ibb.co/LDNxqKYW/Logo-EPM-1.png"
        class_name="object-cover w-18 h-18 rounded-full flex items-center justify-center"
      />
      <Label
        text="EMP STAFFING SERVICES OPC PVT.LTD."
        class_name="text-2xl font-semibold"
      />
    </div>
  );
}

export default TopHeader;
