import { useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../types/User";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser(decoded as UserType);
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (credentials: string) => {
    const decoded = jwtDecode(credentials);
    setUser(decoded as UserType);
    localStorage.setItem("token", credentials);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
