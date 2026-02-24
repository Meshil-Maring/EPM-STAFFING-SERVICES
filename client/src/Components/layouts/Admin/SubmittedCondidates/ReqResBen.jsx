import React, { useState } from "react";
import Label from "../../../common/Label";

function ReqResBen({ job = {} }) {
  const [requirements, setRequirements] = useState(
    Array.isArray(job.requirements) ? [...job.requirements] : [],
  );
  const [responsibilities, setResponsibilities] = useState(
    Array.isArray(job.responsibilities) ? [...job.responsibilities] : [],
  );
  const [benefits, setBenefits] = useState(
    Array.isArray(job.benefits) ? [...job.benefits] : [],
  );
  return (
    <div className="w-full gap-8 flex flex-col justify-start text-sm">
      <div className="w-full flex flex-col gap-2 justify-center">
        <Label
          text={"Requirements"}
          class_name={"font-semibold pb-2 px-2 border-b border-lighter"}
        />
        {requirements.map((req, i) => {
          return (
            <div key={`req-${i}`} className="w-full flex flex-col">
              <div className="flex flex-row gap-1 items-center">
                <span className="w-4 h-4 rounded-full border-4 border-red-dark" />
                <Label text={req} className="" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex flex-col gap-2 justify-center">
        <Label
          text={"Responsibilities"}
          class_name={"font-semibold pb-2 px-2 border-b border-lighter"}
        />
        {responsibilities.map((res, i) => {
          return (
            <div key={`res-${i}`} className="w-full flex flex-col">
              <div className="flex flex-row gap-1 items-center">
                <span className="w-4 h-4 rounded-full border-4 border-red-dark" />
                <Label text={res} className="" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex flex-col gap-2 justify-center">
        <Label
          text={"Benefits & Perks"}
          class_name={"font-semibold pb-2 px-2 border-b border-lighter"}
        />
        {benefits.map((ben, i) => {
          return (
            <div key={`ben-${i}`} className="w-full flex flex-col">
              <div className="flex flex-row gap-1 items-center">
                <span className="w-4 h-4 rounded-full border-4 border-red-dark" />
                <Label text={ben} className="" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReqResBen;
