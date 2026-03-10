import React from "react";
export const admin_accounts = createContext(null);
function AdminAccountsContext({ children }) {
  const [admin_accounts, setAdmin_accounts] = useState({});
  const save_admin_accounts = (accounts) => setCompany_accounts(accounts);

  const values = {
    admin_accounts,
    save_admin_accounts,
  };
  return (
    <admin_accounts.Provider value={values}>{children}</admin_accounts.Provider>
  );
}

export default AdminAccountsContext;
