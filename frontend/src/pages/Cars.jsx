import { useEffect, useState } from "react";
import api from "../services/api";
import CarCard from "../components/CarCard";
import "../styles/Cars.css";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadCars = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await api.get("/cars", { signal: controller.signal });
        setCars(Array.isArray(response.data) ? response.data : []);
      } catch {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadCars();
    return () => controller.abort();
  }, [retryCount]);

  return (
    <div className="cars-page">
      <h1>Available Cars</h1>

      {loading && <p className="cars-status" role="status">Loading car availability...</p>}

      {error && (
        <div className="cars-status cars-status--error" role="alert">
          <p>We couldn't load the cars. Please try again.</p>
          <button type="button" onClick={() => setRetryCount((count) => count + 1)}>
            Retry
          </button>
        </div>
      )}

      <div className="cars-grid">
        {!loading && !error && cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {!loading && !error && cars.length === 0 && (
        <p className="cars-status" role="status">No cars are listed right now.</p>
      )}
    </div>
  );
}