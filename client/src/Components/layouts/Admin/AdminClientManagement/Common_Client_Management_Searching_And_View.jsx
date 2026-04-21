import React, { useContext, useEffect } from "react";
import Icon from "../../../common/Icon";
import Input from "../../../common/Input";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function Common_Client_Management_Searching_And_View({
  scrolled,
  onSearchChange,
}) {
  return (
    <motion.section
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 0)",
        backdropFilter: scrolled ? "blur(8px)" : "blur(0px)",
        padding: scrolled ? "1rem" : "0.5rem 0rem",
      }}
      transition={{ duration: 0.2 }}
      className="sticky top-0 z-50 w-full flex flex-row items-center justify-between gap-4 rounded-small shrink-0"
    >
      <div className="relative w-full max-w-full group">
        <label htmlFor="client-search" className="sr-only">
          Search clients by name, industry, or status
        </label>
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text_b_l opacity-60 group-focus-within:opacity-100 transition-opacity pointer-events-none"
          aria-hidden="true"
        >
          <Icon icon="ri-search-line" class_name="text-lg" />
        </div>
        <Input
          id="client-search"
          placeholder="Search clients by name, industry, status, or email..."
          type="search"
          onchange={onSearchChange}
          class_name="w-full bg-b_white focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-transparent rounded-small py-2.5 pl-10 pr-4 border border-lighter transition-all hover:border-lighter/50"
        />
      </div>
    </motion.section>
  );
}

export default Common_Client_Management_Searching_And_View;
