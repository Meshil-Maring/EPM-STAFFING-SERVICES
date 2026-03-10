import React from "react";
import Label from "../../common/Label";
import Image from "../../common/Image";

function ButtonHeadings() {
  return (
    <div className="flex flex-row text-text_b items-center justify-start gap-3">
      <div className="shrink-0 py-2">
        <Image
          link="https://i.ibb.co/LDNxqKYW/Logo-EPM-1.png"
          alt="EPM Staffing Services Logo"
          width="56"
          height="56"
          class_name="h-12 w-12 rounded-full object-cover shadow-sm"
        />
      </div>

      <div className="flex flex-col items-start justify-center">
        <Label
          as="h2"
          text="EPM STAFFING SERVICES"
          class_name="text-[clamp(1em,2vw,1.2em)] font-semibold leading-tight text-text_b"
        />
        <div className="flex flex-wrap gap-x-1 items-baseline">
          <Label
            as="span"
            text="OPC PVT. LTD."
            class_name="text-[clamp(0.6em,1.5vw,0.8em)] font-lighter text-text_b opacity-60"
          />
          <Label
            as="p"
            text="Recruitment Management Dashboard"
            class_name="text-xs md:text-sm font-medium text-text_b_l tracking-wide"
          />
        </div>
      </div>
    </div>
  );
}

export default ButtonHeadings;
