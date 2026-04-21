import React, { useEffect, useState } from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const navBarButtons = [
  {
    name: "Client Management",
    icon: "ri-user-settings-line",
    id: "client_management",
  },
  {
    name: "Submitted Candidates",
    icon: "ri-send-plane-line",
    id: "submitted_candidates",
  },
  {
    name: "Follow Clients",
    icon: "ri-user-add-line",
    id: "follow_clients",
  },
  {
    name: "Listed Jobs",
    icon: "ri-survey-line",
    id: "listed_jobs",
  },
  {
    name: "Settings",
    icon: "ri-settings-5-line",
    id: "admin_settings",
  },
];

function AdminNavBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [current_navbutton, setCurrent_navbutton] =
    useState("client_management");
  const handleNavigating = (name) => {
    // Navigate to appropriate route

    if (name === "client_management") navigate("/admin/management");
    else navigate(name);
  };

  useEffect(() => {
    const nav_btn = pathname.split("/").at(-1);
    if (nav_btn === "management") {
      sessionStorage.setItem("current_navbutton", "client_management");
      setCurrent_navbutton("client_management");
      return;
    }
    setCurrent_navbutton(nav_btn);
    sessionStorage.setItem("current_navbutton", nav_btn);
  }, [pathname]);

  return (
    <div className="flex flex-col border-r border-lighter items-center justify-start w-90 h-full overflow-y-auto z-1">
      <header className="w-full border-b border-lighter flex flex-row items-center justify-start p-4">
        <div
          className="w-10 h-10 flex bg-g_btn text-white items-center justify-center rounded-small shrink-0 shadow-sm"
          aria-hidden="true"
        >
          <Icon icon="ri-building-line" class_name="text-xl" />
        </div>
        <div className="flex flex-col items-start justify-center ml-3">
          <Label
            as="h2"
            text="EPM Staffing"
            class_name="font-semibold text-[clamp(1.2em,2vw,1.4em)] text-text_b"
          />
          <Label
            as="span"
            text="Services Platform"
            class_name="text-[clamp(0.7em,1vw,0.9em)] uppercase tracking-tighter text-text_b_l opacity-70 tracking-wide"
          />
        </div>
      </header>

      <nav
        className="flex flex-col items-center justify-start w-full flex-1 gap-2 px-4 py-4"
        aria-label="Admin Side Navigation"
      >
        <ul className="w-full h-full list-none p-0 m-0 flex flex-col gap-2">
          <AnimatePresence>
            {navBarButtons.map((button, index) => {
              const isCurrent = button.id === current_navbutton;
              return (
                <motion.li
                  onClick={() => handleNavigating(button.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={button.name}
                  className={`w-full flex flex-row items-center justify-start space-x-2 py-1.5 px-4 rounded-small cursor-pointer transition-all ease-in-out duration-150 ${
                    button.name === "Settings" ? "mt-auto" : ""
                  } ${isCurrent ? "bg-g_btn text-text_white rounded" : "border border-lighter hover:bg-lighter "}`}
                >
                  <Icon icon={button.icon} class_name="" />
                  <Label text={button.name} />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </nav>
    </div>
  );
}

export default AdminNavBar;
