import React from "react";
import { Outlet } from "react-router-dom";
import Image from "../Components/common/image";
import Label from "../Components/common/Label";

function WelcomePage() {
  return (
    <div className="flex flex-col items-start justify-center w-full h-fit bg-b_cream text-text_l_b p-8">
      <div className="flex gap-2 items-center justify-start flex-row">
        <Image
          link="https://i.ibb.co/LDNxqKYW/Logo-EPM-1.png"
          class_name="object-cover w-18 h-18 rounded-full flex items-center justify-center"
        />
        <Label
          text="EMP STAFFING SERVICES OPC PVT.LTD."
          class_name="text-2xl font-semibold"
        />
      </div>
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}

export default WelcomePage;
