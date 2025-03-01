import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [sheets, setSheets] = useState([]);
  const [sheetName, setSheetName] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch Sheets from Backend
  const fetchSheets = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/sheets");
      const data = await response.json();
      setSheets(data);
    } catch (error) {
      console.error("Error fetching sheets:", error);
    }
  };

  useEffect(() => {
    fetchSheets();
  }, []);

  // ✅ Create a New Sheet
  const createSheet = async () => {
    if (!sheetName.trim()) return;
    try {
      const response = await fetch("http://localhost:5000/api/sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sheetName }),
      });

      if (response.ok) {
        fetchSheets();
        setSheetName("");
      }
    } catch (error) {
      console.error("Error creating sheet:", error);
    }
  };

  // ✅ Delete a Sheet
  const deleteSheet = async (sheetName) => {
    try {
      await fetch(`http://localhost:5000/api/sheets/${sheetName}`, {
        method: "DELETE",
      });
      fetchSheets(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting sheet:", error);
    }
  };

  return (
    <div className="home-container">
      <h1>Google Sheets Clone</h1>
      <div className="input-container">
        <input
          type="text"
          value={sheetName}
          onChange={(e) => setSheetName(e.target.value)}
          placeholder="Enter Sheet Name"
        />
        <button onClick={createSheet}>Create Sheet</button>
      </div>

      <h2>Sheets List</h2>
      <div className="sheet-list">
        {sheets.length > 0 ? (
          sheets.map((sheet) => (
            <div className="sheet-item" key={sheet.name}>
              <span className="sheet-title">{sheet.name}</span>
              <button
                className="edit-button"
                onClick={() => navigate(`/sheet/${sheet.name}`)}
              >
                ✏️ Edit
              </button>
              <button
                className="delete-button"
                onClick={() => deleteSheet(sheet.name)}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        ) : (
          <p>No sheets available. Create one!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
