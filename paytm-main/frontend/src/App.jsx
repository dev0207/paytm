import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import NotFound404 from "./Pages/NotFound404";
import DashboardPage from "./Pages/DashboardPage";
import SendPage from "./Pages/SendPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/transfer" element={<SendPage />} />
        <Route path="/*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
}

export default App;
