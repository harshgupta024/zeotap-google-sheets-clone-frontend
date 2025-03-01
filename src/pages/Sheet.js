import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSheetById, updateSheet } from "../api/api";
import Spreadsheet from "../components/Spreadsheet";

const Sheet = () => {
  const { sheetId } = useParams();
  const navigate = useNavigate();
  const [sheet, setSheet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch the sheet data
  const fetchSheet = useCallback(async () => {
    try {
      console.log("🔄 Fetching sheet with ID:", sheetId);
      const data = await getSheetById(sheetId);
      if (data && data._id) {
        setSheet(data);
      } else {
        setError("Sheet not found");
      }
    } catch (error) {
      console.error("❌ Error fetching sheet:", error);
      setError("Failed to load sheet");
    } finally {
      setLoading(false);
    }
  }, [sheetId]);

  useEffect(() => {
    fetchSheet();
  }, [fetchSheet]);

  // ✅ Update sheet function (Fixed call to `updateSheet`)
  const handleUpdateSheet = async (updatedGrid) => {
    try {
      await updateSheet(sheetId, updatedGrid);
      fetchSheet(); // Refresh data after update
    } catch (error) {
      console.error("❌ Error updating sheet:", error);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return sheet ? (
    <div style={{ padding: "20px" }}>
      {/* ✅ Page Title */}
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        {sheet.name || "Untitled Sheet"}
      </h1>

      {/* ✅ Navigation Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
          padding: "10px",
          backgroundColor: "#f8f9fa",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <button onClick={() => navigate("/")} style={buttonStyle}>
          🏠 Home
        </button>
        <button onClick={fetchSheet} style={buttonStyle}>
          🔄 Refresh
        </button>
      </div>

      {/* ✅ Spreadsheet Component */}
      <Spreadsheet sheet={sheet} updateSheet={handleUpdateSheet} />
    </div>
  ) : (
    <h2>Sheet not found</h2>
  );
};

// ✅ Button Styles
const buttonStyle = {
  padding: "8px 15px",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default Sheet;
