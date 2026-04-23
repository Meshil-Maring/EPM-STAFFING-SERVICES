import React from "react";
import Image from "../common/Image";
import Label from "../common/Label";

function HeaderSection({ clientData }) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl my-2 flex flex-row items-center gap-4 justify-center text-Darkgold font-bold uppercase tracking-wide">
        <Image
          link={"/Logo-EPM-1.png"}
          class_name={
            "h-16 w-16 object-cover rounded-full flex itemd-center justify-center border border-lighter"
          }
        />
        <span>EPM Staffing Services (OPC) Pvt. Ltd.</span>
      </h1>
      <div className="w-full grid grid-cols-3 items-center justify-center gap-2">
        <div className="w-full flex flex-col items-start justify-start">
          <Label text="Imphal, Manipur - 795001" />
          <Label text="CIN: U78100MN2025OPC015365" />
        </div>
        <Label
          text="Talent Delivered"
          class_name=" py-1 px-2 rounded-sm bg-b_white text-d_blue/80 text-2xl font-semibold italic"
        />
        <div className="w-full flex flex-col items-start justify-start">
          {[
            "+91 9862279597",
            "admin@epmstaffingservices.com",
            "careerepmstaffingservices@gmail.com",
          ].map((item, i) => {
            return (
              <div
                key={i}
                className="flex flex-row items-center justify-start gap-2"
              >
                <span className="p-1 rounded-full bg-Darkgold" />
                <Label key={i} text={item} />
              </div>
            );
          })}
        </div>
      </div>
      <hr className="my-4 border-2 border-d_blue/60" />
      <hr className="-mt-2.5 mb-4 border-0.5 border-Darkgold" />
      <div className="w-full my-2 flex text-red flex-row items-center justify-start gap-4">
        <span>No.</span>
        <Label text="015/EPMSS-CMA/2026-27" />
      </div>
      <h2 className="text-xl w-fit mx-auto text-d_blue/80 font-bold border-b-2">
        COMMERCIAL EMPANELMENT AGREEMENT
      </h2>
    </div>
  );
}

export default HeaderSection;
