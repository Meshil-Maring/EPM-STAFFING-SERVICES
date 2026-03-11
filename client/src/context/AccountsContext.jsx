import React, { createContext, useState, useEffect } from "react";

export const Company_context = createContext(null);

export function CompanyProvider({ children }) {
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
    const result = {};
    Object.entries(company_accounts).forEach(([id, company]) => {
      if (company.status === status) {
        result[id] = company;
      }
    });
    return result;
  };

  // Get companies by field/industry
  const getCompaniesByField = (field) => {
    const result = {};
    Object.entries(company_accounts).forEach(([id, company]) => {
      if (company.field === field) {
        result[id] = company;
      }
    });
    return result;
  };

  // Get companies by follow status
  const getCompaniesByFollowStatus = (followStatus) => {
    const result = {};
    Object.entries(company_accounts).forEach(([id, company]) => {
      if (company["follow status"] === followStatus) {
        result[id] = company;
      }
    });
    return result;
  };

  // Get companies by city
  const getCompaniesByCity = (city) => {
    const result = {};
    Object.entries(company_accounts).forEach(([id, company]) => {
      if (company.city === city) {
        result[id] = company;
      }
    });
    return result;
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
      const { [companyId]: deletedCompany, ...remainingCompanies } = prev;
      return remainingCompanies;
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
        branches: [...(prevAccounts[companyId].branches || []), branchData],
      },
    }));
  };

  // Update branch
  const updateBranch = (companyId, branchIndex, updatedBranchData) => {
    setCompany_accounts((prevAccounts) => ({
      ...prevAccounts,
      [companyId]: {
        ...prevAccounts[companyId],
        branches: prevAccounts[companyId].branches.map((branch, index) =>
          index === branchIndex ? { ...branch, ...updatedBranchData } : branch,
        ),
      },
    }));
  };

  // Delete branch
  const deleteBranch = (companyId, branchIndex) => {
    setCompany_accounts((prevAccounts) => ({
      ...prevAccounts,
      [companyId]: {
        ...prevAccounts[companyId],
        branches: prevAccounts[companyId].branches.filter(
          (_, index) => index !== branchIndex,
        ),
      },
    }));
  };

  // Update branch field
  const updateBranchField = (companyId, branchIndex, field, value) => {
    setCompany_accounts((prevAccounts) => ({
      ...prevAccounts,
      [companyId]: {
        ...prevAccounts[companyId],
        branches: prevAccounts[companyId].branches.map((branch, index) =>
          index === branchIndex ? { ...branch, [field]: value } : branch,
        ),
      },
    }));
  };

  // Search companies by name or email
  const searchCompanies = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    const result = {};
    Object.entries(company_accounts).forEach(([id, company]) => {
      const matches =
        company.name.toLowerCase().includes(term) ||
        company.email.toLowerCase().includes(term);
      if (matches) {
        result[id] = company;
      }
    });
    return result;
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
