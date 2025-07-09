import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Optional: Session expiry (1 hari)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const expiry = 24 * 60 * 60 * 1000; // 1 hari
      const lastLogin = localStorage.getItem("lastLogin");

      if (!lastLogin || Date.now() - lastLogin > expiry) {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("lastLogin", Date.now());
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
