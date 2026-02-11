import React from "react";
import { motion } from "framer-motion";
import Label from "../../../common/Label";
import NameInitials from "../../../common/NameInitials";
import Icon from "../../../common/Icon";

function CompanyViewOverlay({ company, setClosing }) {
  if (!company) return null;
  const contact_info = [{ label: "Contact Person", icon }];
  return (
    <div
      onClick={() => setClosing(false)}
      className="w-full z-200 h-full absolute top-0 left-0 bg-light_black flex items-center justify-center"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
        className="w-[30%] h-[70%] bg-b_white flex flex-col text-sm rounded-small overflow-hidden items-center justify-start"
      >
        <header className="w-full font-lighter text-[clamp(1em,2vw,1.2em)] flex flex-row items-center justify-between py-2 px-4 bg-g_btn text-text_white">
          <div className="flex flex-row items-center justify-start gap-2">
            <NameInitials
              name={company.name}
              class_name="w-10 h-10 shadow-xl"
            />
            <div className="flex flex-col items-start justify-start">
              <Label text={company.name} class_name={"font-semibold"} />
              <Label text={company.field} class_name={"text-xs"} />
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
        <div className="w-full p-4 flex flex-col items-start justify-start gap-4 overflow-y-auto no-scrollbar">
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="p-3 rounded-small border bg-gray-50">
              <Label text={"Email"} class_name={"text-xs font-semibold"} />
              <Label text={company.email || "-"} />
            </div>
            <div className="p-3 rounded-small border bg-gray-50">
              <Label text={"Joined"} class_name={"text-xs font-semibold"} />
              <Label text={company["joined date"] || "-"} />
            </div>
            <div className="p-3 rounded-small border bg-gray-50">
              <Label
                text={"Active Jobs"}
                class_name={"text-xs font-semibold"}
              />
              <Label text={company["active jobs"] || 0} />
            </div>
            <div className="p-3 rounded-small border bg-gray-50">
              <Label
                text={"Pending Jobs"}
                class_name={"text-xs font-semibold"}
              />
              <Label text={company["pending jobs"] || 0} />
            </div>
          </div>
          <div className="w-full">
            <Label text={"About"} class_name={"font-semibold mb-2"} />
            <Label text={company.description || "No description provided."} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CompanyViewOverlay;
