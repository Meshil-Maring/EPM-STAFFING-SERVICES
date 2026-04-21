import React, { useContext } from "react";
import ListView from "./ListView";
import CompanyCard from "./CompanyCard";
import { motion, AnimatePresence } from "framer-motion";
import { updateFollowClient } from "./end-point-function/client_management";
import { showError } from "../../../../utils/toastUtils";

/**
 * ClientManagementCards - Renders a list or grid of company cards based on view mode
 * Supports three view modes: grid, list, and apps. Handles follow/unfollow functionality
 * and renders appropriate card component based on selected view.
 *
 * @param {Object} props - Component props
 * @param {Array} props.clients - Array of company/client data objects
 * @param {Function} props.refresh - Function to refresh parent component data
 */
function ClientManagementCards({ clients = {} }) {
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
