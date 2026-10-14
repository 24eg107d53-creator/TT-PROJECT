import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Admin.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newCar, setNewCar] = useState({
    name: "",
    pricePerDay: "",
    imageUrl: "",
    available: true
  });

  // Protect Admin Page
  useEffect(() => {
    if (role !== "ADMIN") {
      navigate("/");
    }
  }, [role, navigate]);

  useEffect(() => {
    fetchCars();
    fetchBookings();
  }, []);

  const fetchCars = async () => {
    const res = await api.get("/cars");
    setCars(res.data);
  };

  const fetchBookings = async () => {
    const res = await api.get("/bookings");
    setBookings(res.data);
  };

  const handleCarChange = (e) => {
    setNewCar({
      ...newCar,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCar = async (e) => {
    e.preventDefault();

    if (!newCar.name || !newCar.pricePerDay || !newCar.imageUrl) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    await api.post("/cars", newCar);
    setLoading(false);

    alert("Car Added Successfully");

    setNewCar({
      name: "",
      pricePerDay: "",
      imageUrl: "",
      available: true
    });

    fetchCars();
  };

  const handleDeleteCar = async (id) => {
    const confirmDelete = window.confirm("Delete this car?");
    if (!confirmDelete) return;

    await api.delete(`/cars/${id}`);
    fetchCars();
  };

  const handleToggleAvailability = async (car) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${
        car.available ? "disable" : "enable"
      } this car?`
    );

    if (!confirmAction) return;

    const newStatus = !car.available;

    await api.put(`/cars/${car.id}/availability?status=${newStatus}`);

    fetchCars();
  };

  // Statistics
  const totalCars = cars.length;
  const availableCars = cars.filter(c => c.available).length;
  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + (booking.totalPrice || 0),
    0
  );

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {/* Statistics Section */}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Cars</h3>
          <p>{totalCars}</p>
        </div>

        <div className="stat-card">
          <h3>Available Cars</h3>
          <p>{availableCars}</p>
        </div>

        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>
      </div>

      {/* Add Car Section */}
      <div className="admin-section">
        <h2>Add New Car</h2>

        <form onSubmit={handleAddCar} className="admin-form">
          <input
            type="text"
            name="name"
            placeholder="Car Name"
            value={newCar.name}
            onChange={handleCarChange}
          />

          <input
            type="number"
            name="pricePerDay"
            placeholder="Price Per Day"
            value={newCar.pricePerDay}
            onChange={handleCarChange}
          />

          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={newCar.imageUrl}
            onChange={handleCarChange}
          />

          <button type="submit">
            {loading ? "Adding..." : "Add Car"}
          </button>
        </form>
      </div>

      {/* Cars List */}
      <div className="admin-section">
        <h2>All Cars</h2>

        <div className="admin-grid">
          {cars.map((car) => (
            <div key={car.id} className="admin-card">

              <img src={car.imageUrl} alt={car.name} />

              <h3>{car.name}</h3>

              <p className="price">
                ₹{car.pricePerDay} / day
              </p>

              <span
                className={`badge ${
                  car.available ? "badge-green" : "badge-red"
                }`}
              >
                {car.available ? "Available" : "Unavailable"}
              </span>

              <div className="admin-actions">
                <button
                  className={`toggle-btn ${
                    car.available ? "disable-btn" : "enable-btn"
                  }`}
                  onClick={() => handleToggleAvailability(car)}
                >
                  {car.available ? "Disable" : "Enable"}
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDeleteCar(car.id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Bookings Section */}
      <div className="admin-section">
        <h2>All Bookings</h2>

        {bookings.map((booking) => (
          <div key={booking.id} className="admin-booking-card">
            <div>
              <strong>{booking.user?.name}</strong> booked{" "}
              <strong>{booking.car?.name}</strong>
            </div>
            <div>
              ₹{booking.totalPrice}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}