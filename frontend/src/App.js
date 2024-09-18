import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import LoginPage from "./components/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Homepage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
