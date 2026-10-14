import { createContext, useState } from "react";

// create context
export const AuthContext = createContext();

// provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [user, setUser] = useState({
    email: localStorage.getItem("userEmail"),
    role: localStorage.getItem("role")
  });

  const login = (token, decoded) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userEmail", decoded.sub);
    localStorage.setItem("role", decoded.role);
    localStorage.setItem("userId", decoded.userId || decoded.id);

    setIsLoggedIn(true);
    setUser({
      email: decoded.sub,
      role: decoded.role
    });
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};