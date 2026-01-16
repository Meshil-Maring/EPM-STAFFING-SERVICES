import React, { useContext, useMemo } from "react";
import client_management_display_data from "../../dummy_data_structures/client_management_display_data.json";
import { listGridViewContext } from "../../../context/ListGridViewContext";
import ListView from "./ListView";
import CompanyCard from "./CompanyCard";
import { motion, AnimatePresence } from "framer-motion";

function ClientManagementCards() {
  const { view } = useContext(listGridViewContext);

  const clientEntries = useMemo(
    () => Object.entries(client_management_display_data),
    []
  );

  const gridStyles = {
    apps: "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6",
    list: "flex flex-col gap-6 w-full",
  };

  return (
    <section className="w-full h-fit">
      <ul
        className={`transition-all duration-300 ease-in-out ${
          gridStyles[view] || gridStyles.list
        }`}
      >
        <AnimatePresence>
          {clientEntries.map(([id, company], index) => (
            <motion.li
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={id}
              className="list-none outline-none"
            >
              {view === "list" ? (
                <ListView company={company} />
              ) : (
                <CompanyCard company={company} />
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}

export default ClientManagementCards;
