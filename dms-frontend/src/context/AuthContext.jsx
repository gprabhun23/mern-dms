import { createContext, useContext, useState } from "react";
import { getToken,removeToken } from "../utils/auth";
import axios from "axios";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
        return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
    }
});


  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Persist user data
  };

  const logout = async () => {
    const token = getToken(); // Retrieve token from localStorage/sessionStorage
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await axios.get(`${API_URL}/api/documents`);
    if (!token) {
        removeToken();
    }

    try {
        const cal = await axios.post(`${API_URL}/api/auth/logout`);
        removeToken();
        
    } catch (error) {
        console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuth = () => useContext(AuthContext);
