import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Spreadsheet from "./components/Spreadsheet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sheet/:sheetName" element={<Spreadsheet />} />{" "}
        {/* ✅ Ensure this exists */}
      </Routes>
    </Router>
  );
}

export default App;
