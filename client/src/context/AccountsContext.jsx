/**
 * AccountsContext - Context provider for company account management
 *
 * This context manages company account data including company information,
 * follow status, and account updates. It provides state management for
 * company-related operations throughout the application with sessionStorage
 * persistence for data retention across browser sessions.
 */

import React, { createContext, useState, useEffect, useMemo } from "react";
import { showSuccess } from "../utils/toastUtils";

// Create the context with default null value
export const Company_context = createContext(null);

/**
 * CompanyProvider component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 * @returns {JSX.Element} Context provider with company account management functionality
 */
function CompanyProvider({ children }) {
  // Initialize state by parsing the string from sessionStorage
  const [company_accounts, setCompany_accounts] = useState(() => {
    const saved = sessionStorage.getItem("company_accounts");
    if (!saved) return {};
    try {
      const parsed = JSON.parse(saved);
      if (typeof parsed === "string") return JSON.parse(parsed);
      return parsed;
    } catch (e) {
      console.log("failed to parse company_accounts, ", e);
      return {};
    }
  });

  // Keep sessionStorage in sync whenever the 'company_accounts' state changes
  useEffect(() => {
    if (company_accounts && typeof company_accounts === "object") {
      sessionStorage.setItem(
        "company_accounts",
        JSON.stringify(company_accounts),
      );
    }
  }, [company_accounts]);

  /**
   * Update company information in the accounts
   * @param {string} comp_id - The company ID to update
   * @param {Object} updated_comp - The updated company data
   */
  const update_company_info = (comp_id, updated_comp) => {
    setCompany_accounts((prev) => ({ ...prev, [comp_id]: updated_comp }));
    showSuccess("Changes saved successfully!");
  };

  /**
   * Save all company accounts data
   * @param {Object} accounts - Complete accounts data object
   */
  const save_company_accounts = (accounts) => setCompany_accounts(accounts);

  /**
   * Toggle the follow status of a company
   * @param {string} companyId - The ID of the company to toggle
   */
  const toggleFollowStatus = (companyId) => {
    setCompany_accounts((prevAccounts) => ({
      ...prevAccounts,
      [companyId]: {
        ...prevAccounts[companyId],
        "follow status": !prevAccounts[companyId]["follow status"],
      },
    }));
  };

  return (
    <Company_context.Provider
      value={{
        // Data access methods
        company_accounts,
        save_company_accounts,
        toggleFollowStatus,
        update_company_info,
      }}
    >
      {children}
    </Company_context.Provider>
  );
}

export default CompanyProvider;
