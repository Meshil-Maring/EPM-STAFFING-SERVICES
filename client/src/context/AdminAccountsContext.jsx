import React, { createContext, useState, useEffect } from "react";

export const admin_accounts_context = createContext(null);

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

  const save_admin_accounts = (accounts) => setAdminAccounts(accounts);

  // Get admin by ID
  const getAdminById = (adminId) => adminAccounts[adminId] || null;

  // Get admin by email
  const getAdminByEmail = (email) => {
    return Object.values(adminAccounts).find((admin) => admin.email === email);
  };

  // Update entire admin account
  const updateAdmin = (adminId, updatedAdmin) => {
    setAdminAccounts((prevAdmins) => ({
      ...prevAdmins,
      [adminId]: {
        ...prevAdmins[adminId],
        ...updatedAdmin,
      },
    }));
  };

  // Update specific field of an admin
  const updateAdminField = (adminId, field, value) => {
    setAdminAccounts((prevAdmins) => ({
      ...prevAdmins,
      [adminId]: {
        ...prevAdmins[adminId],
        [field]: value,
      },
    }));
  };

  // Add new admin
  const addAdmin = (newAdmin) => {
    const newAdminId = `admin-${Date.now()}`;
    setAdminAccounts((prevAdmins) => ({
      ...prevAdmins,
      [newAdminId]: newAdmin,
    }));
    return newAdminId;
  };

  // Delete admin
  const deleteAdmin = (adminId) => {
    setAdminAccounts((prev) => {
      const { [adminId]: deletedAdmin, ...remainingAdmins } = prev;
      return remainingAdmins;
    });
  };

  // Bulk update admins
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

  // Search admins by name or email
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

  // Get admin statistics
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
