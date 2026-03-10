import React, { createContext, useState, useEffect } from "react";
import Accounts from "../Components/dummy_data_structures/Accounts.json";

export const Company_context = createContext(null);

export function CompanyProvider({ children }) {
  // Initialize state by parsing the string from sessionStorage
  const [company_accounts, setCompany_accounts] = useState({});

  const save_company_accounts = (accounts) => setCompany_accounts(accounts);

  // Get all companies
  const getAllCompanies = () => company_accounts;

  // Get company by ID
  const getCompanyById = (companyId) => company_accounts[companyId] || null;

  // Get company by email
  const getCompanyByEmail = (email) => {
    return Object.values(company_accounts).find(
      (company) => company.email === email,
    );
  };

  // Get companies by status
  const getCompaniesByStatus = (status) => {
    return Object.entries(company_accounts).reduce((acc, [id, company]) => {
      if (company.status === status) {
        acc[id] = company;
      }
      return acc;
    }, {});
  };

  // Get companies by field/industry
  const getCompaniesByField = (field) => {
    return Object.entries(company_accounts).reduce((acc, [id, company]) => {
      if (company.field === field) {
        acc[id] = company;
      }
      return acc;
    }, {});
  };

  // Get companies by follow status
  const getCompaniesByFollowStatus = (followStatus) => {
    return Object.entries(company_accounts).reduce((acc, [id, company]) => {
      if (company["follow status"] === followStatus) {
        acc[id] = company;
      }
      return acc;
    }, {});
  };

  // Get companies by city
  const getCompaniesByCity = (city) => {
    return Object.entries(company_accounts).reduce((acc, [id, company]) => {
      if (company.city === city) {
        acc[id] = company;
      }
      return acc;
    }, {});
  };

  // Update entire company
  const updateWholeCompany = (companyId, updatedObject) => {
    setCompany_accounts((prev) => ({
      ...prev,
      [companyId]: updatedObject,
    }));
  };

  // Update specific field of a company
  const updateCompany = (companyId, key, newValue) => {
    setCompany_accounts((prev) => ({
      ...prev,
      [companyId]: {
        ...prev[companyId],
        [key]: newValue,
      },
    }));
  };

  // Add new company
  const addCompany = (newCompany) => {
    const newCompanyId = `company-${Date.now()}`;
    setCompany_accounts((prev) => ({
      ...prev,
      [newCompanyId]: newCompany,
    }));
    return newCompanyId;
  };

  // Delete company
  const deleteCompany = (companyId) => {
    setCompany_accounts((prev) => {
      const newCopy = { ...prev };
      delete newCopy[companyId];
      return newCopy;
    });
  };

  // Toggle follow status
  const toggleFollowStatus = (companyId) => {
    setCompany_accounts((prevAccounts) => ({
      ...prevAccounts,
      [companyId]: {
        ...prevAccounts[companyId],
        "follow status": !prevAccounts[companyId]["follow status"],
      },
    }));
  };

  // Add branch to company
  const addBranch = (companyId, branchData) => {
    setCompany_accounts((prevAccounts) => ({
      ...prevAccounts,
      [companyId]: {
        ...prevAccounts[companyId],
        branches: [...prevAccounts[companyId].branches, branchData],
      },
    }));
  };

  // Update branch
  const updateBranch = (companyId, branchIndex, updatedBranchData) => {
    setCompany_accounts((prevAccounts) => {
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

  // Delete branch
  const deleteBranch = (companyId, branchIndex) => {
    setCompany_accounts((prevAccounts) => {
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

  // Update branch field
  const updateBranchField = (companyId, branchIndex, field, value) => {
    setCompany_accounts((prevAccounts) => {
      if (!prevAccounts[companyId]) return prevAccounts;

      const updatedBranches = prevAccounts[companyId].branches.map(
        (branch, index) =>
          index === branchIndex ? { ...branch, [field]: value } : branch,
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

  // Search companies by name or email
  const searchCompanies = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return Object.entries(company_accounts).reduce((acc, [id, company]) => {
      const matches =
        company.name.toLowerCase().includes(term) ||
        company.email.toLowerCase().includes(term);
      if (matches) {
        acc[id] = company;
      }
      return acc;
    }, {});
  };

  // Get company statistics
  const getCompanyStats = () => {
    const stats = {
      total: Object.keys(company_accounts).length,
      active: 0,
      closed: 0,
      followed: 0,
      fields: {},
      cities: {},
    };

    Object.values(company_accounts).forEach((company) => {
      // Count by status
      if (company.status === "Active") stats.active++;
      else if (company.status === "Closed") stats.closed++;

      // Count by follow status
      if (company["follow status"]) stats.followed++;

      // Count by field
      const field = company.field || "Unknown";
      stats.fields[field] = (stats.fields[field] || 0) + 1;

      // Count by city
      const city = company.city || "Unknown";
      stats.cities[city] = (stats.cities[city] || 0) + 1;
    });

    return stats;
  };

  return (
    <Company_context.Provider
      value={{
        // Data access methods
        company_accounts,
        save_company_accounts,
        getAllCompanies,
        getCompanyById,
        getCompanyByEmail,
        getCompaniesByStatus,
        getCompaniesByField,
        getCompaniesByFollowStatus,
        getCompaniesByCity,
        searchCompanies,
        getCompanyStats,

        // CRUD operations
        updateWholeCompany,
        updateCompany,
        addCompany,
        deleteCompany,
        toggleFollowStatus,

        // Branch operations
        addBranch,
        updateBranch,
        deleteBranch,
        updateBranchField,
      }}
    >
      {children}
    </Company_context.Provider>
  );
}
