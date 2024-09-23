import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import LoginPage from "./components/Login";
import Reservation from "./components/Reservation";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
