/**
 * AdminAccountsContext - Context provider for admin account management
 *
 * This context manages admin account data including admin information,
 * CRUD operations, and search functionality. It provides state management
 * for admin-related operations throughout the application with sessionStorage
 * persistence for data retention across browser sessions.
 */

import React, { createContext, useState, useEffect } from "react";

// Create the context with default null value
export const admin_accounts_context = createContext(null);

/**
 * AdminAccountsContext provider component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 * @returns {JSX.Element} Context provider with admin account management functionality
 */
function AdminAccountsContext({ children }) {
  // Initialize state by parsing the string from sessionStorage
  const [adminAccounts, setAdminAccounts] = useState(() => {
    const savedAdmins = sessionStorage.getItem("adminAccounts");
    // If sessionStorage is empty, use an empty object, otherwise parse saved data
    if (!savedAdmins) return {};
    try {
      const parsed = JSON.parse(savedAdmins);
      return typeof parsed === "object" ? parsed : {};
    } catch (err) {
      console.error("Failed to parse admin accounts from sessionStorage:", err);
      return {};
    }
  });

  // Keep sessionStorage in sync whenever the 'adminAccounts' state changes
  useEffect(() => {
    sessionStorage.setItem("adminAccounts", JSON.stringify(adminAccounts));
  }, [adminAccounts]);

  /**
   * Save all admin accounts data
   * @param {Object} accounts - Complete admin accounts data object
   */
  const save_admin_accounts = (accounts) => setAdminAccounts(accounts);

  /**
   * Get admin by their unique ID
   * @param {string} adminId - The admin ID to retrieve
   * @returns {Object|null} Admin object if found, null otherwise
   */
  const getAdminById = (adminId) => adminAccounts[adminId] || null;

  /**
   * Get admin by their email address
   * @param {string} email - The email address to search for
   * @returns {Object|null} Admin object if found, null otherwise
   */
  const getAdminByEmail = (email) => {
    return Object.values(adminAccounts).find((admin) => admin.email === email);
  };

  /**
   * Update an entire admin account
   * @param {string} adminId - The ID of the admin to update
   * @param {Object} updatedAdmin - The updated admin data
   */
  const updateAdmin = (adminId, updatedAdmin) => {
    setAdminAccounts((prevAdmins) => ({
      ...prevAdmins,
      [adminId]: {
        ...prevAdmins[adminId],
        ...updatedAdmin,
      },
    }));
  };

  /**
   * Update a specific field of an admin account
   * @param {string} adminId - The ID of the admin to update
   * @param {string} field - The field name to update
   * @param {any} value - The new value for the field
   */
  const updateAdminField = (adminId, field, value) => {
    setAdminAccounts((prevAdmins) => ({
      ...prevAdmins,
      [adminId]: {
        ...prevAdmins[adminId],
        [field]: value,
      },
    }));
  };

  /**
   * Add a new admin account
   * @param {Object} newAdmin - The new admin data to add
   * @returns {string} The generated admin ID
   */
  const addAdmin = (newAdmin) => {
    const newAdminId = `admin-${Date.now()}`;
    setAdminAccounts((prevAdmins) => ({
      ...prevAdmins,
      [newAdminId]: newAdmin,
    }));
    return newAdminId;
  };

  /**
   * Delete an admin account
   * @param {string} adminId - The ID of the admin to delete
   */
  const deleteAdmin = (adminId) => {
    setAdminAccounts((prev) => {
      const { [adminId]: deletedAdmin, ...remainingAdmins } = prev;
      return remainingAdmins;
    });
  };

  /**
   * Perform bulk updates on multiple admin accounts at once
   * @param {Object} updatesMap - Object mapping admin IDs to their updates
   */
  const bulkUpdateAdmins = (updatesMap) => {
    setAdminAccounts((prevAdmins) => {
      const updated = { ...prevAdmins };
      Object.entries(updatesMap).forEach(([id, updates]) => {
        if (updated[id]) {
          updated[id] = { ...updated[id], ...updates };
        }
      });
      return updated;
    });
  };

  /**
   * Search admins by name or email
   * @param {string} searchTerm - The term to search for
   * @returns {Object} Admins matching the search term
   */
  const searchAdmins = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    const result = {};
    Object.entries(adminAccounts).forEach(([id, admin]) => {
      const matches =
        admin.name.toLowerCase().includes(term) ||
        admin.email.toLowerCase().includes(term);
      if (matches) {
        result[id] = admin;
      }
    });
    return result;
  };

  /**
   * Get comprehensive statistics about admin accounts
   * @returns {Object} Statistics including total count and role distribution
   */
  const getAdminStats = () => {
    const stats = {
      total: Object.keys(adminAccounts).length,
      roles: {},
    };

    Object.values(adminAccounts).forEach((admin) => {
      const role = admin.role || "Unknown";
      stats.roles[role] = (stats.roles[role] || 0) + 1;
    });

    return stats;
  };

  const values = {
    adminAccounts,
    save_admin_accounts,
    // Data access methods
    getAdminById,
    getAdminByEmail,
    searchAdmins,
    getAdminStats,
    // CRUD operations
    updateAdmin,
    updateAdminField,
    addAdmin,
    deleteAdmin,
    bulkUpdateAdmins,
  };

  return (
    <admin_accounts_context.Provider value={values}>
      {children}
    </admin_accounts_context.Provider>
  );
}

export default AdminAccountsContext;
