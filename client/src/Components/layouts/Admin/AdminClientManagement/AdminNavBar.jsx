import React, { useContext } from "react";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";
import ButtonIcon from "../../../common/ButtonIcon";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { admin_navbar_context } from "../../../../context/AdminNavContext";

const navBarButtons = [
  {
    name: "Client Management",
    icon: "ri-suitcase-line",
    id: "nav",
  },
  {
    name: "Submitted Candidates",
    icon: "ri-group-line",
    id: "nav",
  },
  {
    name: "Settings",
    icon: "ri-settings-5-line",
    id: "nav",
  },
];

function AdminNavBar() {
  const navigate = useNavigate();
  const { section, setSection } = useContext(admin_navbar_context);

  const handleNavigating = (name) => {
    setSection(name);

    // Navigate to appropriate route
    let path = "/admin/management";
    switch (name) {
      case "Submitted Candidates":
        path = "/admin/management/submittedCandidates";
        break;
      case "Settings":
        path = "/admin/management/AdminSettings";
        break;
    }
    navigate(path);
  };

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
              const isCurrent = button.name === section;
              return (
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={button.name}
                  className={`w-full ${
                    button.name === "Settings" ? "mt-auto" : ""
                  }`}
                >
                  <ButtonIcon
                    text={button.name}
                    icon={button.icon}
                    id={button.id}
                    onSelect={handleNavigating}
                    clicked={isCurrent}
                    aria-current={isCurrent ? "page" : undefined}
                    class_name="w-full justify-start whitespace-nowrap transition-all duration-200"
                  />
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
