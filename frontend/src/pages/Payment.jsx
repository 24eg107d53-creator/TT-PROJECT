import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import "../styles/Payment.css";

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const bookingData = location.state;

  const [loading, setLoading] = useState(false);

  if (!bookingData) {
    return <h2 style={{ padding: "100px" }}>Invalid Payment Access</h2>;
  }

  const { car, startDate, endDate, totalPrice } = bookingData;

  const handleCashPayment = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      await api.post("/bookings", {
        user: { id: Number(userId) },
        car: { id: car.id },
        startDate,
        endDate,
        totalPrice
      });

      alert("Booking Confirmed! Pay cash at pickup.");
      navigate("/bookings");

    } catch (error) {
      console.error(error);
      alert("Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment</h1>

      <div className="payment-card">
        <h2>{car.name}</h2>
        <p>Total Amount: ₹{totalPrice}</p>

        <div className="payment-options">
          <button
            className="cash-btn"
            onClick={handleCashPayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Cash"}
          </button>

          <button className="online-btn" disabled>
            Pay Online (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}