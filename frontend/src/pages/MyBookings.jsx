import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/MyBookings.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    // 🔒 if not logged in → redirect
    if (!userId) {
      console.log("User not logged in, redirecting...");
      navigate("/login");
      return;
    }

    // fetch bookings
    api.get(`/bookings/user/${userId}`)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);

        // if token expired or unauthorized
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // 🔄 loading state
  if (loading) {
    return (
      <div className="bookings-page">
        <h2>Loading your bookings...</h2>
      </div>
    );
  }

  return (
    <div className="bookings-page">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h3>{booking.car?.name}</h3>
              <p>Start: {booking.startDate}</p>
              <p>End: {booking.endDate}</p>
              <h4>Total: ₹{booking.totalPrice}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}