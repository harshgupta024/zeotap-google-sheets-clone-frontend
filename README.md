# Spreadsheet Web App - Frontend

This is the **frontend** of a web application that mimics Google Sheets, providing a spreadsheet interface with mathematical and data quality functions.

## 🚀 Features

- Google Sheets-like UI with toolbar, formula bar, and grid structure.
- Cell formatting options (bold, italic, font size, color).
- Mathematical functions: `SUM`, `AVERAGE`, `MAX`, `MIN`, `COUNT`.
- Data quality functions: `TRIM`, `UPPER`, `LOWER`, `REMOVE_DUPLICATES`, `FIND_AND_REPLACE`.
- Ability to add, delete, and resize rows/columns.
- Real-time updates for formulas based on cell dependencies.

## 🛠️ Tech Stack

- **React.js**: For building the UI.
- **React Hooks & Context API**: For state management.
- **Tailwind CSS**: For styling.
- **Axios**: For API communication with the backend.
- **Local Storage**: For persisting user data.

## 📂 Project Structure

```
frontend/
│—— src/
│   ├─ api/                 # API calls
│   ├─ components/          # UI components (spreadsheet, toolbar, formula bar)
│   ├─ pages/               # Page components
│   ├─ utils/               # Utility functions
│   ├─ App.js               # Main App component
│   ├─ index.js             # Entry point
│   ├─ styles.css           # Global styles
│—— public/                  # Static assets
│—— package.json             # Dependencies
│—— README.md                # Documentation
```

## 📦 Installation & Setup

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## 💽 API Communication

The frontend interacts with the backend via **REST API calls** to fetch and store spreadsheet data.

## ✨ Future Enhancements

- Implement **drag-and-drop functionality** for cells.
- Introduce **charts and graphs** for data visualization.
- Support **Excel file import/export**.

---
