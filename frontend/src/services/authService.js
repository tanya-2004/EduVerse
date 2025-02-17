import axios from "axios";

const API_URL = "https://eduversebackend-re0v.onrender.com/auth";

// Signup
export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

// Login
export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

// Get User Profile
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

// Logout
export const logout = async () => {
  localStorage.removeItem("token");
};
