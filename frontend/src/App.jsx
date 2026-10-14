import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cars from "./pages/Cars"
import CarDetails from "./pages/CarDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Contact from "./pages/Contact";
import Payment from "./pages/Payment";
function App() {
  return (
    <Router>

      {/* Navbar stays OUTSIDE Routes */}
      <Navbar />

      {/* Add spacing because navbar is fixed */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="register" element={<Register/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/bookings" element={<ProtectedRoute> <MyBookings />  </ProtectedRoute>} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/contact" element={<Contact />} />
<Route path="/payment/:id" element={<Payment />} />

        </Routes>
      </div>

    </Router>
  );
}

export default App;