import React, { useContext, useState, useMemo, useEffect } from "react";
import ListView from "./ListView";
import CompanyCard from "./CompanyCard";
import { motion, AnimatePresence } from "framer-motion";
import { Company_context } from "../../../../context/AccountsContext";
import { grid_list_context } from "../../../../context/GridListViewContext";
import { updatefollowClient } from "./end-point-function/client_management";
import { showError } from "../../../../utils/toastUtils";

function ClientManagementCards({ clients = {}, refresh }) {
  // checking the view: grid, list or apps state
  const { view } = useContext(grid_list_context);

  // handling follow status toggle (dummy function for now)
  const handleFollowChange = async (companyId, user_id, status) => {
    try {
      await updatefollowClient(companyId, user_id, status);
    } catch (e) {
      console.log(`Error: ${e}`);
      showError("Could not save follow status!");
    }
  };

  // view state mapper
  const gridStyles = {
    apps: "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 ",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6",
    list: "flex flex-col gap-6 w-full",
  };

  return (
    <main className="w-full h-fit">
      <section
        className={`transition-all duration-300 ease-in-out ${
          gridStyles[view] || gridStyles.list
        }`}
      >
        <AnimatePresence>
          {clients?.map((company, i) => {
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1, type: "tween" }}
                key={i}
                className="list-none outline-none"
              >
                {view === "list" ? (
                  <ListView
                    company={company}
                    companyId={company.user_id}
                    handleFollowChange={handleFollowChange}
                  />
                ) : (
                  <div>
                    <CompanyCard
                      refresh={refresh}
                      companyId={company.user_id}
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
