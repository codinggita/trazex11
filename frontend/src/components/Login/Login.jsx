import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://trazex11-6.onrender.com/users/login', 
        formData, 
        { headers: { 'Content-Type': 'application/json' } } // ✅ Fix content-type
      );
  
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId || ""); // Store user ID
  
      console.log("Stored User ID:", localStorage.getItem("userId"));
  
      navigate('/home');
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Login failed. Please try again.");
    }
  };
  

  return (
    <div className="login-container">
      {/* Left side illustration */}
      <div className="login-illustration">
        <img 
          src="https://res-console.cloudinary.com/dbrb9ptmn/media_explorer_thumbnails/39f4821eaf276362d0697de76607c4ce/detailed" 
          alt="Login illustration" 
          className="illustration-image"
        />
      </div>

      {/* Right side login form */}
      <div className="login-form-container">
        <div className="login-card">
          <div className="logo-container">
            <img src="https://res.cloudinary.com/dbrb9ptmn/image/upload/v1738654508/oj7qqwdo1uimyam74bvh.png" alt="Trazex Logo" />
          </div>

          <h2 className="welcome-text">Welcome back!</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-inputs">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input-field"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input-field"
                onChange={handleChange}
                required
              />
            </div>

            <div className="button-container">
              <button type="submit" className="login-button2">
                Log-In
              </button>
            </div>

            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
