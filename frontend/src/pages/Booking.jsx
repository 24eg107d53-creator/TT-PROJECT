import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Booking.css";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch car from backend
  useEffect(() => {
    api.get(`/cars/${id}`)
      .then((res) => setCar(res.data))
      .catch((err) => {
        console.error("Error fetching car:", err);
        setCar(null);
      });
  }, [id]);

  // Loading state
  if (!car) {
    return (
      <h2 style={{ padding: "100px", textAlign: "center" }}>
        Loading...
      </h2>
    );
  }

  // Calculate total days
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const totalDays = calculateDays();
  const totalPrice = totalDays * car.pricePerDay;

  // Navigate to payment page
  const handleBooking = () => {
    if (!startDate || !endDate) {
      alert("Please select dates.");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      alert("End date must be after start date.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to continue.");
      navigate("/login");
      return;
    }

    // Navigate to payment page with booking details
    navigate(`/payment/${car.id}`, {
      state: {
        car,
        startDate,
        endDate,
        totalPrice
      }
    });
  };

  return (
    <div className="booking-page">
      <h1>Book {car.name}</h1>

      <div className="booking-form">
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <h3>Total Days: {totalDays}</h3>
        <h2>Total Price: ₹{totalPrice}</h2>

        <button onClick={handleBooking}>
          Continue to Payment
        </button>
      </div>
    </div>
  );
}