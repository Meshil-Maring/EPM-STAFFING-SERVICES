import React, { createContext, useState } from "react";
import Accounts from "../Components/dummy_data_structures/Accounts.json";

export const Company_context = createContext(null);

export function CompanyProvider({ children }) {
  const [companyAccounts, setCompanyAccounts] = useState(Accounts);

  const updateWholeCompany = (companyId, updatedObject) => {
    setCompanyAccounts((prev) => ({
      ...prev,
      [companyId]: updatedObject,
    }));
  };

  const updateCompany = (companyId, key, newValue) => {
    setCompanyAccounts((prev) => ({
      ...prev,
      [companyId]: {
        ...prev[companyId],
        [key]: newValue,
      },
    }));
  };

  const deleteCompany = (companyId) => {
    setCompanyAccounts((prev) => {
      const newCopy = { ...prev };
      delete newCopy[companyId];
      return newCopy;
    });
  };

  const deleteBranch = (companyId, branchIndex) => {
    setCompanyAccounts((prevAccounts) => {
      if (!prevAccounts[companyId]) return prevAccounts;

      const updatedBranches = prevAccounts[companyId].branches.filter(
        (_, index) => index !== branchIndex,
      );

      return {
        ...prevAccounts,
        [companyId]: {
          ...prevAccounts[companyId],
          branches: updatedBranches,
        },
      };
    });
  };

  const updateBranch = (companyId, branchIndex, updatedBranchData) => {
    setCompanyAccounts((prevAccounts) => {
      if (!prevAccounts[companyId]) return prevAccounts;

      const updatedBranches = prevAccounts[companyId].branches.map(
        (branch, index) =>
          index === branchIndex ? { ...branch, ...updatedBranchData } : branch,
      );

      return {
        ...prevAccounts,
        [companyId]: {
          ...prevAccounts[companyId],
          branches: updatedBranches,
        },
      };
    });
  };

  const toggleFollowStatus = (companyId) => {
    setCompanyAccounts((prevAccounts) => ({
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
        companyAccounts,
        updateCompany,
        updateWholeCompany,
        deleteCompany,
        deleteBranch,
        updateBranch,
        toggleFollowStatus,
      }}
    >
      {children}
    </Company_context.Provider>
  );
}
