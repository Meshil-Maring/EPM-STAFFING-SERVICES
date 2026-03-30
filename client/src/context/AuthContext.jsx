import React, { createContext, useEffect, useState } from "react";
import { checkSession } from "../services/session.service.js";
import { showError } from "../utils/toastUtils";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await checkSession();

        if (res.loggedIn) {
          setUser({
            id: res.userId,
            email: res.email,
            role: res.role,
          });
        }
      } catch (err) {
        showError("User not found!");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
