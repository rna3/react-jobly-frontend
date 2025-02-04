import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

function Signup({ signup }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  /** Handle form submission */
  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
  
    if (result && result.success) {
      navigate("/");
    } else {
      setErrors(result?.errors || ["An unexpected error occurred."]);
    }
  }

  /** Update form data when inputs change */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {errors.length > 0 && (
        <div className="error-message">
          <p>Errors:</p>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Signup;
