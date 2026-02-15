import React, { useContext } from "react";
import { motion } from "framer-motion";
import Label from "../../../common/Label";
import { Jobs_context } from "../../../../context/JobsContext";
import { Company_context } from "../../../../context/AccountsContext";
import NameInitials from "../../../common/NameInitials";
import Icon from "../../../common/Icon";
import ManageElements from "./ManageElements";

function ViewDetailsOverlay({ candidate, setClosing }) {
  const { jobs } = useContext(Jobs_context) || {};
  const { companyAccounts } = useContext(Company_context) || {};
  const job = jobs?.[candidate["job id"]];
  const job_name = job?.["job title"];
  const company = companyAccounts?.[candidate["company id"]];
  const comp_name = company?.name;

  return (
    <div
      onClick={() => setClosing(false)}
      className="w-full z-20 h-full absolute top-0 left-0 bg-light_black flex items-center justify-center"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
        className="w-[40%] h-[80%] bg-b_white flex flex-col text-sm rounded-small overflow-hidden items-center justify-start"
      >
        <header className="w-full font-lighter text-[clamp(1em,2vw,1.2em)] flex flex-row items-center justify-between py-2 px-4 bg-g_btn text-text_white">
          <div className="flex flex-row items-center justify-start gap-2">
            <NameInitials name={comp_name} class_name="w-10 h-10" />
            <div className="flex flex-col items-start justify-start">
              <Label text={comp_name} class_name={""} />
              <Label text={job_name} class_name={"text-xs"} />
            </div>
          </div>
          <span
            onClick={() => setClosing(false)}
            className="flex p-1 items-center justify-center hover:bg-lighter transition-all duration-200 ease-in-out hover:text-red-dark cursor-pointer rounded-full"
          >
            <Icon
              icon={"ri-close-line"}
              class_name="w-5 h-5 rounded-full flex items-center justify-center"
            />
          </span>
        </header>
        <div className="w-full p-4 flex flex-col items-start justify-start gap-4 no-scrollbar overflow-y-auto">
          <Label
            text={job.status}
            class_name={`py-1 font-semibold px-2 rounded-small ${job.status === "Active" ? "bg-b_light_blue text-d_blue" : "bg-red-light text-red-dark"}`}
          />
          <ManageElements job={job} company={company} />
        </div>
      </motion.div>
    </div>
  );
}

export default ViewDetailsOverlay;
