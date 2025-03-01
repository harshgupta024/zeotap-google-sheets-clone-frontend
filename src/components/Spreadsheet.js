import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Spreadsheet.css";

const Spreadsheet = () => {
  const { sheetName } = useParams();
  const navigate = useNavigate();
  const [grid, setGrid] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCell, setSelectedCell] = useState(null);
  const [formulaBar, setFormulaBar] = useState("");
  const [styles, setStyles] = useState({});

  // ✅ Default 5x5 Grid Generator
  const generateDefaultGrid = () =>
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(""));

  // ✅ Save Changes to Backend (Persist Data)
  const updateSheet = useCallback(
    async (updatedGrid) => {
      setGrid(updatedGrid);
      try {
        await fetch(`http://localhost:5000/api/sheets/${sheetName}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rows: updatedGrid }),
        });
      } catch (error) {
        console.error("Error updating sheet:", error);
      }
    },
    [sheetName]
  );

  // ✅ Fetch Sheet Data from Backend
  const fetchSheet = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/sheets/${sheetName}`
      );
      const data = await response.json();
      if (data.rows && data.rows.length > 0) {
        setGrid(data.rows);
      } else {
        const defaultGrid = generateDefaultGrid();
        setGrid(defaultGrid);
        updateSheet(defaultGrid);
      }
    } catch (error) {
      console.error("Error fetching sheet:", error);
    } finally {
      setLoading(false);
    }
  }, [sheetName, updateSheet]);

  useEffect(() => {
    fetchSheet();
    if (grid.length === 0) {
      const defaultGrid = generateDefaultGrid();
      setGrid(defaultGrid);
      updateSheet(defaultGrid);
    }
  }, [fetchSheet, grid.length, updateSheet]);

  // ✅ Handle Cell Changes
  const handleCellChange = (row, col, value) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r, i) =>
        i === row ? r.map((c, j) => (j === col ? value : c)) : r
      );
      updateSheet(newGrid);
      return newGrid;
    });
  };

  // ✅ Handle FX (Formula Bar) Changes
  const handleFormulaBarChange = (value) => {
    if (!selectedCell) return;
    setFormulaBar(value);
    handleCellChange(selectedCell.row, selectedCell.col, value);
  };

  // ✅ Data Quality Functions
  const applyDataQualityFunction = (funcType) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    let updatedValue = grid[row][col];

    switch (funcType) {
      case "TRIM":
        updatedValue = updatedValue.trim();
        break;
      case "UPPER":
        updatedValue = updatedValue.toUpperCase();
        break;
      case "LOWER":
        updatedValue = updatedValue.toLowerCase();
        break;
      default:
        return;
    }

    handleCellChange(row, col, updatedValue);
  };

  // ✅ Remove Duplicates from the Grid
  const removeDuplicates = () => {
    const uniqueRows = Array.from(
      new Set(grid.map(JSON.stringify)),
      JSON.parse
    );
    updateSheet(uniqueRows);
  };

  // ✅ Find and Replace
  const findAndReplace = () => {
    const searchText = prompt("Enter the text to find:");
    const replaceText = prompt("Enter the replacement text:");

    if (!searchText || replaceText === null) return;

    const newGrid = grid.map((row) =>
      row.map((cell) =>
        cell.includes(searchText)
          ? cell.replace(new RegExp(searchText, "g"), replaceText)
          : cell
      )
    );

    updateSheet(newGrid);
  };

  // ✅ Row & Column Operations
  const addRow = () => updateSheet([...grid, Array(grid[0].length).fill("")]);
  const deleteRow = () => grid.length > 1 && updateSheet(grid.slice(0, -1));
  const addColumn = () => updateSheet(grid.map((row) => [...row, ""]));
  const deleteColumn = () =>
    grid[0].length > 1 && updateSheet(grid.map((row) => row.slice(0, -1)));

  // ✅ Apply Styles
  const applyStyle = (styleType, value) => {
    if (!selectedCell) return;
    const key = `${selectedCell.row}-${selectedCell.col}`;
    setStyles((prev) => ({
      ...prev,
      [key]: { ...prev[key], [styleType]: value },
    }));
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="spreadsheet-container">
      {/* ✅ Header Section */}
      <header className="spreadsheet-header">
        <h2 className="spreadsheet-title">{sheetName}</h2>
        <button className="back-button" onClick={() => navigate("/")}>
          🔙 Back
        </button>
      </header>

      {/* ✅ Formula Bar (FX) */}
      <div className="formula-bar">
        <span className="fx-label">fx</span>
        <input
          type="text"
          value={formulaBar}
          onChange={(e) => handleFormulaBarChange(e.target.value)}
          placeholder="Enter formula or value"
        />
      </div>

      {/* ✅ Toolbar (All Buttons Restored) */}
      <div className="toolbar">
        <button className="tool-button" onClick={addRow}>
          ➕ Add Row
        </button>
        <button className="tool-button" onClick={deleteRow}>
          ➖ Delete Row
        </button>
        <button className="tool-button" onClick={addColumn}>
          ➕ Add Column
        </button>
        <button className="tool-button" onClick={deleteColumn}>
          ➖ Delete Column
        </button>

        {/* 🔠 Text Formatting */}
        <button
          className="tool-button"
          onClick={() => applyStyle("fontWeight", "bold")}
        >
          B
        </button>
        <button
          className="tool-button"
          onClick={() => applyStyle("fontStyle", "italic")}
        >
          I
        </button>
        <select
          className="tool-select"
          onChange={(e) => applyStyle("fontSize", `${e.target.value}px`)}
        >
          <option value="14">14px</option>
          <option value="16">16px</option>
          <option value="18">18px</option>
        </select>
        <input
          type="color"
          className="tool-color-picker"
          onChange={(e) => applyStyle("color", e.target.value)}
        />

        {/* 🔍 Data Quality Functions */}
        <button
          className="tool-button"
          onClick={() => applyDataQualityFunction("TRIM")}
        >
          ✂ TRIM
        </button>
        <button
          className="tool-button"
          onClick={() => applyDataQualityFunction("UPPER")}
        >
          🔠 UPPER
        </button>
        <button
          className="tool-button"
          onClick={() => applyDataQualityFunction("LOWER")}
        >
          🔡 LOWER
        </button>
        <button className="tool-button" onClick={removeDuplicates}>
          🗑 Remove Duplicates
        </button>
        <button className="tool-button" onClick={findAndReplace}>
          🔍 Find & Replace
        </button>
      </div>

      {/* ✅ Spreadsheet Table */}
      <table className="spreadsheet-table">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                const key = `${rowIndex}-${colIndex}`;
                return (
                  <td
                    key={colIndex}
                    contentEditable
                    onBlur={(e) =>
                      handleCellChange(rowIndex, colIndex, e.target.innerText)
                    }
                    onClick={() => {
                      setSelectedCell({ row: rowIndex, col: colIndex });
                      setFormulaBar(grid[rowIndex][colIndex]);
                    }}
                    style={styles[key]}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
