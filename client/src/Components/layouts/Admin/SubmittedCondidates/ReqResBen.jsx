import React, { useState } from "react";
import Label from "../../../common/Label";
import { motion, AnimatePresence } from "framer-motion";

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
            <motion.div
              key={`req-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", duration: 0.2, delay: 0.8 * i }}
              className="w-full flex flex-col"
            >
              <div className="flex flex-row gap-1 items-center">
                <span className="w-4 h-4 rounded-full border-4 border-red-dark" />
                <Label text={req} className="" />
              </div>
            </motion.div>
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
            <motion.div
              key={`res-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", duration: 0.2, delay: 0.9 * i }}
              className="w-full flex flex-col"
            >
              <div className="flex flex-row gap-1 items-center">
                <span className="w-4 h-4 rounded-full border-4 border-red-dark" />
                <Label text={res} className="" />
              </div>
            </motion.div>
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
            <motion.div
              key={`ben-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", duration: 0.2, delay: 1 * i }}
              className="w-full flex flex-col"
            >
              <div className="flex flex-row gap-1 items-center">
                <span className="w-4 h-4 rounded-full border-4 border-red-dark" />
                <Label text={ben} className="" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default ReqResBen;
