import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const DUMMY_USER = { email: "prachigarg858@gmail.com", password: "prachi@123" };

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
   
    const savedLogin = localStorage.getItem("isLoggedIn");
    return savedLogin === "true";
  });

  const login = (email, password) => {
    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  // Optional: persist state on refresh
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}