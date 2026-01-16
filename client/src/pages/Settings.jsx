import React, { useEffect, useRef, useState } from "react";
import Label from "../Components/common/Label";
import CompanyInformation from "../Components/layouts/Settings/CompanyInformation";
import ContactInformation from "../Components/layouts/Settings/ContactInformation";
import LocationInformation from "../Components/layouts/Settings/LocationInformation";
import Settings_data from "../Components/layouts/Settings/Settings_data.json";
import { motion } from "framer-motion";
import Button from "../Components/common/Button";
import Icon from "../Components/common/Icon";
import MainTop from "../Components/layouts/Settings/MainTop";
function Settings() {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleSaveChanges = () => {
    alert("changes saved");
  };
  const handleCanceling = (name) => {
    alert(`button ${name} clicked!`);
  };
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return null;
    const updateScroll = () => {
      if (container.scrollTop > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    container.addEventListener("scroll", updateScroll);
    return () => container.removeEventListener("scroll", updateScroll);
  }, []);
  return (
    <div
      ref={containerRef}
      className="w-full relative p-6 overflow-y-auto h-full flex flex-col items-start justify-start gap-4 text-text_b_l text-sm"
    >
      <motion.header
        animate={{
          boxShadow: isScrolled
            ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
            : "0 0px 0px rgba(0 0 0 / 0)",
          borderBottom: isScrolled
            ? "1px solid #e5e7eb"
            : "1px solid transparent",
        }}
        className="w-full sticky top-0 z-20 flex flex-col items-start justify-center bg-b_white/80 backdrop-blur-md rounded-small p-4"
      >
        <Label
          text="Company Settings"
          class_name="font-semibold text-2xl text-text_b"
        />
        <Label
          text="Manage your company information and preferences"
          class_name="font-lighter text-sm opacity-80"
        />
      </motion.header>

      <div className="flex w-full flex-col items-center justify-start gap-10 max-w-5xl mx-auto">
        <MainTop infor={Settings_data.main_top} />
        <CompanyInformation
          company_information={Settings_data.company_information}
        />
        <ContactInformation
          contact_information={Settings_data.contact_information}
        />
        <LocationInformation
          location_information={Settings_data.branch_locations}
        />
      </div>
      <div
        onClick={handleSaveChanges}
        className="sticky bottom-0 ml-auto flex items-center justify-center gap-4 flex-row"
      >
        <Button
          onclick={handleCanceling}
          text="Cancel"
          class_name="border px-4 shadow-sm py-1.5 rounded-small border-lighter font-lighter bg-lighter"
        />
        <div className="bg-g_btn shadow-red-light hover:scale-[1.05] transition-all  duration-120 ease-in-out cursor-pointer rounded-small flex flex-row items-center justify-center py-1.5 px-2 text-text_white ">
          <Icon icon={"ri-save-line"} class_name="w-5 h-5" />
          <Label text="Save All Changes" class_name="" />
        </div>
      </div>
    </div>
  );
}

export default Settings;
