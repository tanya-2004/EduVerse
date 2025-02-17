import axios from "axios";

const API_URL = "https://eduversebackend-re0v.onrender.com/api/learners";

// 📌 Check if Progress Exists
export const checkProgress = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/check/${userId}`);
    return response.data.exists;
  } catch (error) {
    console.error(
      "Error checking progress:",
      error.response?.data || error.message
    );
    return false;
  }
};

// 📌 Get User Progress
export const getProgress = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching progress:",
      error.response?.data || error.message
    );
    return null; // Handle failure gracefully
  }
};
