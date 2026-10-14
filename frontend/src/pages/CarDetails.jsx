import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/CarDetails.css";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch car by ID
  useEffect(() => {
    api.get(`/cars/${id}`)
      .then((res) => {
        setCar(res.data);
      })
      .catch((err) => {
        console.error("Error fetching car:", err);
        setCar(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Handle Book Now
  const handleBookNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to book a car.");
      navigate("/login");
      return;
    }

    navigate(`/booking/${car.id}`);
  };

  // Loading state
  if (loading) {
    return <h2 style={{ padding: "100px", textAlign: "center" }}>Loading...</h2>;
  }

  // If car not found
  if (!car) {
    return <h2 style={{ padding: "100px", textAlign: "center" }}>Car Not Found</h2>;
  }

  return (
    <div className="car-details">
      <img src={car.imageUrl} alt={car.name} />

      <div className="details-info">
        <h1>{car.name}</h1>
        <p>Price: ₹{car.pricePerDay} per day</p>
        
        <button onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
}