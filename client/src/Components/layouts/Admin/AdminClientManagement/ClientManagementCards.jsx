import React, { useContext, useState } from "react";
import ListView from "./ListView";
import CompanyCard from "./CompanyCard";
import { motion, AnimatePresence } from "framer-motion";
import { updateFollowClient } from "./end-point-function/client_management";
import { showError } from "../../../../utils/toastUtils";

function ClientManagementCards({ clients = {}, refresh }) {
  const [isLoading, setIsLoading] = useState(false);

  // handling follow status toggle (dummy function for now)
  const handleFollowChange = async (companyId, user_id, status) => {
    try {
      const res = await updateFollowClient(companyId, user_id, status);

      return res;
    } catch (e) {
      showError("Could not save follow status!");
    }
  };

  return (
    <main className="w-full h-fit">
      <section
        className={`transition-all duration-300 ease-in-out grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10`}
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
                <div>
                  <CompanyCard companyId={company.user_id} company={company} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </section>
    </main>
  );
}

export default ClientManagementCards;
