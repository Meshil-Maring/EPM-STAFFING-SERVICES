import React, { createContext, useEffect, useState } from "react";
import { checkSession } from "../services/session.service.js";

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
            id: res?.userId,
            email: res?.email,
            role: res?.role,
          });
        }
      } catch (err) {
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
