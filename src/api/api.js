import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/sheets"; // Ensure this matches the backend

export const getSheets = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching sheets:", error);
    return [];
  }
};

export const createSheet = async (name) => {
  try {
    const response = await axios.post(API_BASE_URL, { name });
    return response.data;
  } catch (error) {
    console.error("❌ Error creating sheet:", error);
  }
};

export const getSheetById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching sheet:", error);
    return null;
  }
};

export const updateSheet = async (id, rows) => {
  try {
    await axios.put(`${API_BASE_URL}/${id}`, { rows });
  } catch (error) {
    console.error("❌ Error updating sheet:", error);
  }
};
