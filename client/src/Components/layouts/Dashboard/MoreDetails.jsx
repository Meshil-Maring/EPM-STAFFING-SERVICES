import React from "react";
import { MoreJobInfor } from "../../dummy_data_structures/MoreJobInfor";
import Icon from "../../common/Icon";
import Label from "../../common/Label";

function MoreDetails({ card }) {
  const JobDescription =
    "We are looking for a creative UI/UX Designer to create beautiful, intuitive user interfaces and enhance user experiences across our product suite. You will work closely with developers and product managers to turn requirements into functional designs.";

  return (
    <div className="w-full flex flex-col items-start gap-6">
      {/* Title Section */}
      <div className="flex flex-col gap-2">
        <Label
          text={card.job_name}
          class_name="text-2xl font-semibold text-text_b leading-tight"
        />
        <Label
          text={card.status}
          class_name={`w-fit rounded-full text-[10px] font-bold py-1 px-3 uppercase tracking-widest ${
            card.status === "Active"
              ? "bg-light_green text-text_green"
              : card.status === "Pending"
              ? "text-Darkgold bg-gold_lighter"
              : ""
          }`}
        />
      </div>

      {/* Info Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MoreJobInfor.map((info, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-3 p-3 rounded-lg border border-lighter bg-b_white/50 hover:bg-b_white transition-colors"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-lighter">
              <Icon icon={info.icon} class_name="text-nevy_blue text-lg" />
            </div>
            <div className="flex flex-col">
              <Label
                text={info.label}
                class_name="text-[10px] uppercase font-bold opacity-50 tracking-wide"
              />

              <Label
                text={info.value}
                class_name="text-sm font-semibold text-text_b"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-3 p-4 rounded-lg bg-blue-50/30 border border-blue-100/50 w-full">
        <header className="flex flex-row items-center gap-2 text-nevy_blue">
          <Icon icon="ri-file-text-line" class_name="text-lg" />
          <Label text="Job Description" class_name="font-bold text-sm" />
        </header>
        <p className="text-sm leading-relaxed text-text_l_b">
          {JobDescription}
        </p>
      </div>
    </div>
  );
}

export default MoreDetails;
