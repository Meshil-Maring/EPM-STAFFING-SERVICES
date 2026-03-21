import React, { useContext, useState, useMemo, useEffect } from "react";
import ListView from "./ListView";
import CompanyCard from "./CompanyCard";
import { motion, AnimatePresence } from "framer-motion";
import { Company_context } from "../../../../context/AccountsContext";
import { grid_list_context } from "../../../../context/GridListViewContext";

function ClientManagementCards({ clients = {} }) {
  const { view } = useContext(grid_list_context);

  // Validate company data before rendering
  const isValidCompany = (company) => {
    return (
      company &&
      company.name &&
      company.name.trim() !== "" &&
      typeof company["follow status"] === "boolean"
    );
  };

  // Filter out invalid companies
  const validClients = Object.entries(clients).filter(([id, company]) =>
    isValidCompany(company),
  );

  const clientEntries = useMemo(() => validClients, [clients]);
  const { toggleFollowStatus } = useContext(Company_context) || {};
  const gridStyles = {
    apps: "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 ",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6",
    list: "flex flex-col gap-6 w-full",
  };

  const handleFollowChange = (id) => {
    if (typeof toggleFollowStatus === "function") {
      toggleFollowStatus(id);
    } else {
      console.error("toggleFollowStatus is not a function");
    }
  };

  return (
    <main className="w-full h-fit">
      <section
        className={`transition-all duration-300 ease-in-out ${
          gridStyles[view] || gridStyles.list
        }`}
      >
        <AnimatePresence>
          {clientEntries.map(([id, company], index) => {
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1, type: "tween" }}
                key={id}
                className="list-none outline-none"
              >
                {view === "list" ? (
                  <ListView
                    company={company}
                    companyId={id}
                    handleFollowChange={handleFollowChange}
                  />
                ) : (
                  <div>
                    <CompanyCard
                      companyId={id}
                      company={company}
                      handleFollowChange={handleFollowChange}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </section>
    </main>
  );
}

export default ClientManagementCards;
