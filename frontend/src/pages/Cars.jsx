import { useEffect, useState } from "react";
import api from "../services/api";
import CarCard from "../components/CarCard";
import "../styles/Cars.css";

export default function Cars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    api.get("/cars")
      .then((res) => setCars(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="cars-page">
      <h1>Available Cars</h1>

      <div className="cars-grid">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}