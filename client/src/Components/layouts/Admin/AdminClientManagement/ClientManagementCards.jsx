import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ListView from "./ListView";
import CompanyCard from "./CompanyCard";
import { motion, AnimatePresence } from "framer-motion";
import { listGridViewContext } from "../../../../context/ListGridViewContext";
import { Company_context } from "../../../../context/AccountsContext";

function ClientManagementCards({ clients = {} }) {
  const { view } = useContext(listGridViewContext);
  const navigate = useNavigate();

  const clientEntries = useMemo(() => Object.entries(clients), [clients]);
  const { toggleFollowStatus } = useContext(Company_context) || {};

  const gridStyles = {
    apps: "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6",
    list: "flex flex-col gap-6 w-full",
  };

  const handleClicking = (companyId) => {
    navigate(`/admin/management/company/${companyId}`);
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
            const handleFollowChange = () => {
              if (typeof toggleFollowStatus === "function")
                toggleFollowStatus(id);
            };

            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "tween" }}
                key={id}
                className="list-none outline-none"
              >
                {view === "list" ? (
                  <ListView
                    company={company}
                    companyId={id}
                    handleClicking={handleClicking}
                    handleFollowChange={handleFollowChange}
                  />
                ) : (
                  <div onClick={() => handleClicking(id)}>
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
