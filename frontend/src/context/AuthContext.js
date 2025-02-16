import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const AuthContext = createContext();

// Custom hook to use authentication
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(storedUser);
    }
  }, []);

  const loginUser = (userData) => {
    const formattedUser = { ...userData.user, id: userData.user._id }; // Ensure `id` exists
    localStorage.setItem("user", JSON.stringify(formattedUser));
    localStorage.setItem("token", userData.token);
    setUser(formattedUser);
    navigate("/");
  };
  
  // const loginUser = (userData) => {
  //   localStorage.setItem("user", JSON.stringify(userData.user));
  //   localStorage.setItem("token", userData.token);
  //   setUser(userData.user);
  //   navigate("/");
  // };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully!"); // ✅ Show success message
    navigate("/profile");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
