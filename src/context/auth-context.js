"use client";

import { createContext, useContext } from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";

const AuthContext = createContext();

// This is a wrapper component that provides the SessionProvider
export function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  );
}

// This is the actual context provider that uses useSession
function AuthContextProvider({ children }) {
  const session = useSession();

  return (
    <AuthContext.Provider value={{ 
      session, 
      signIn, 
      signOut,
      isAuthenticated: !!session?.data 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
