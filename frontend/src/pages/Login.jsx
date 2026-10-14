import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import "../styles/Auth.css";

export default function Login() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const res = await api.post("/auth/login", formData);

      console.log("FULL RESPONSE:", res);

      const token = res.data.token || res.data;

      if (!token) {
        throw new Error("Token not received");
      }

      const decoded = jwtDecode(token);

      console.log("DECODED TOKEN:", decoded);

      login(token, decoded);

      alert("Login Successful");

      navigate("/");

    } catch (error) {

      console.error("LOGIN ERROR:", error);

      alert(
        error.response?.data ||
        error.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="auth-container">

      <form className="auth-form" onSubmit={handleSubmit}>

        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </form>

    </div>
  );
}