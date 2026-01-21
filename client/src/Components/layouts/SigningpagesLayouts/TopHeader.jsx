import React from "react";
import Label from "../../common/Label";
import Image from "../../common/Image";

function TopHeader() {
  return (
    <header className="flex px-10 py-2 gap-3 absolute top-0 left-0 items-center justify-start flex-row shadow-md w-full bg-white z-50">
      <Image
        link="https://i.ibb.co/LDNxqKYW/Logo-EPM-1.png"
        alt="EMP Staffing Services Logo"
        width="60"
        height="60"
        class_name="object-cover w-14 h-14 rounded-full shadow-sm"
      />
      <div className="flex flex-col items-start">
        <Label
          as="h1"
          text="EMP STAFFING SERVICES"
          class_name="text-xl md:text-2xl font-bold tracking-tight text-text_b"
        />
        <Label
          as="span"
          text="OPC PVT. LTD."
          class_name="text-[10px] md:text-xs font-medium text-text_b_l -mt-1 opacity-80"
        />
      </div>
    </header>
  );
}

export default TopHeader;
