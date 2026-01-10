import React, { useContext } from "react";
import Input from "../../common/Input";
import Icon from "../../common/Icon";
import { motion } from "framer-motion";
import { listGridViewContext } from "../../../context/ListGridViewContext";

function Common_Client_Management_Searching_And_View({ refer, scrolled }) {
  const { view, changeView } = useContext(listGridViewContext);

  const handleView = () => {
    if (view === "apps") {
      changeView("grid");
    } else if (view === "grid") {
      changeView("list");
    } else if (view === "list") {
      changeView("apps");
    }
  };
  return (
    <motion.div
      ref={refer}
      animate={{
        backgroundColor: scrolled ? "var(--color-b_white)" : "",
        transition: {
          duration: 0.2,
          ease: "easeInOut",
        },
      }}
      className={`sticky top-0 gap-4 w-full flex flex-row z-50 items-center justify-between rounded-small shrink-0 ${
        scrolled ? "shadow-2xl p-4" : "p-0"
      }`}
    >
      <Icon
        icon="ri-search-line"
        class_name={`text-xl absolute hover:font-semibold transition-all duration-120 ease-in-out cursor-pointer w-8 h-8 top-0 bottom-0 my-auto ${
          scrolled ? "left-5" : "left-1"
        }`}
      />
      <Input
        placeholder="Search clients by name, industry, or status"
        type="text"
        class_name="w-full focus:outline-none focus:ring-2 focus:ring-light rounded-small pr-2 py-1.5 border border-light pl-8"
      />
      <span
        onClick={handleView}
        className={`w-fit h-fit items-center justify-center rounded-small`}
      >
        <Icon
          icon={
            view === "apps"
              ? "ri-grid-fill"
              : view === "grid"
              ? "ri-list-unordered"
              : view === "list"
              ? "ri-apps-fill"
              : ""
          }
          class_name="w-8 h-8 hover:scale-[1.05] rounded-small border border-light transition-all duration-120 ease-in-out hover:text-2xl text-xl flex items-center justify-center"
        />
      </span>
    </motion.div>
  );
}

export default Common_Client_Management_Searching_And_View;
