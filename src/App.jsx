import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import EventSelection from "./pages/EventSelection";
import EventDetails from "./pages/EventDetails";
import FoodSelection from "./pages/FoodSelection";
import Decoration from "./pages/Decoration";
import Recommendation from "./pages/Recommendation";
import BookingSummary from "./pages/BookingSummary";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import ChatBot from "./components/ChatBot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<EventSelection />} />
        <Route path="/details" element={<EventDetails />} />
        <Route path="/food" element={<FoodSelection />} />
        <Route path="/decoration" element={<Decoration />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/summary" element={<BookingSummary />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />
      </Routes>

      <ChatBot />
    </BrowserRouter>
  );
}

export default App;