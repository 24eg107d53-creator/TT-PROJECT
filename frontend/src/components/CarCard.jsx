import { useNavigate } from "react-router-dom";
import "../styles/Cars.css";

export default function CarCard({ car }) {
  const navigate = useNavigate();

  const handleBooking = () => {
    if (!car.available) return;
    navigate(`/booking/${car.id}`);
  };

  return (
    <div className="car-card">

      <img src={car.imageUrl} alt={car.name} />

      <h3>{car.name}</h3>

      <p className="price">₹{car.pricePerDay} / day</p>

      {/* Availability Badge */}
      <span
        className={`availability-badge ${
          car.available ? "available-user" : "unavailable-user"
        }`}
      >
        {car.available ? "Available" : "Not Available"}
      </span>

      {/* Booking Button */}
      <button
        className="book-btn"
        disabled={!car.available}
        onClick={handleBooking}
      >
        {car.available ? "Book Now" : "Unavailable"}
      </button>

    </div>
  );
}