import React, { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkSession } from "../services/session.service.js";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const {
    data: user,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await checkSession();

      if (res.loggedIn) {
        return {
          id: res?.userId,
          email: res?.email,
          role: res?.role,
        };
      }

      return null;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <AuthContext.Provider value={{ user, loading, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
