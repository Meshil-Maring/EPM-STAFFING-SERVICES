import React from "react";
import Label from "../../common/Label";
import Image from "../../common/Image";

function TopHeader() {
  return (
    <header className="flex px-4 absolute py-2 space-x-2 top-0 items-center justify-start flex-row bg-white/80 backdrop-blur-md border border-gray-100/50 shadow-sm w-full z-50 rounded-b-xl">
      <Image
        link="https://i.ibb.co/LDNxqKYW/Logo-EPM-1.png"
        alt="EPM Staffing Services Logo"
        width="50"
        height="50"
        class_name="object-cover w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md border-2 border-gray-100"
      />
      <div className="flex flex-col items-start">
        <Label
          text="EPM STAFFING SERVICES"
          class_name="text-base md:text-lg lg:text-xl font-bold tracking-tight text-gray-900"
        />
        <Label
          text="OPC PVT. LTD."
          class_name="text-[10px] md:text-xs font-medium text-gray-600 -mt-0.5"
        />
      </div>
    </header>
  );
}

export default TopHeader;
