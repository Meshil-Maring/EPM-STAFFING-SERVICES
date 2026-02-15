import React from "react";
import JobRequirements from "../../dummy_data_structures/JobRequirements.json";
import Label from "../../common/Label";

function MoreDetailsRequirements() {
  const keys = Object.keys(JobRequirements);

  return (
    <div className="flex flex-col gap-8 w-full">
      {keys.map((key, index) => {
        return (
          <div key={index} className="w-full flex flex-col gap-4">
            <div
              className={`flex items-center gap-2 border-l-4  pl-3 capitalize ${
                key === "requirements"
                  ? "border-nevy_blue"
                  : key === "responsibilities"
                    ? "border-red-dark"
                    : key === "benefits"
                      ? "border-Darkgold"
                      : ""
              }`}
            >
              <Label text={key} class_name="font-bold text-text_b text-md" />
            </div>

            <ul className="grid grid-cols-1 gap-2 px-1">
              {JobRequirements[key].map((item, i) => (
                <li key={i} className="flex flex-row gap-2 items-center group">
                  <span
                    className={`w-4 h-4 rounded-full border-5 ${
                      key === "requirements"
                        ? "border-nevy_blue"
                        : key === "responsibilities"
                          ? "border-red-dark"
                          : key === "benefits"
                            ? "border-Darkgold"
                            : ""
                    }`}
                  />
                  <span className="text-sm text-text_l_b group-hover:text-text_b transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default MoreDetailsRequirements;
