import "../styles/Home.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const Home = () => {

  const navigate = useNavigate();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    api.get("/cars")
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Rent Your Dream Car Today </h1>
          <p>Premium cars at affordable prices</p>
          <button onClick={() => navigate("/cars")}>
            Explore Cars
          </button>
        </div>
      </section>

      {/* FEATURED CARS */}
      <section className="featured">
        <h2>Featured Cars</h2>

        <div className="car-grid">

          {cars
            .filter(car => car.available)
            .slice(0, 3)
            .map((car) => (

            <Link to={`/cars/${car.id}`} key={car.id} className="car-card">

              <img src={car.imageUrl} alt={car.name} />

              <div className="car-info">
                <h3>{car.name}</h3>
                <p>₹{car.pricePerDay} / day</p>
              </div>

            </Link>

          ))}

        </div>

        {/* VIEW MORE BUTTON */}
        <div className="view-more">
          <button onClick={() => navigate("/cars")}>
            View More Cars
          </button>
        </div>

      </section>
  <section className="why-us">

  <h2>Why Choose Us?</h2>

  <div className="why-grid">

    <div className="why-item">
      <h4>Affordable Pricing</h4>
      <p>No hidden charges.</p>
    </div>

    <div className="why-item">
      <h4>Easy Booking</h4>
      <p>Book in just 2 minutes.</p>
    </div>

    <div className="why-item">
      <h4>24/7 Support</h4>
      <p>We are always here for you.</p>
    </div>

  </div>

</section>

    </div>
  );
};

export default Home;