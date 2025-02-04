import React, { useState, useContext } from "react";
import UserContext from "../UserContext";
import "../styles/Profile.css";

function Profile({ updateUserProfile }) {
  const { currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(evt) {
    evt.preventDefault();

    const updatedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password || undefined, // Only send if changed
    };

    let result = await updateUserProfile(currentUser.username, updatedData);
    if (result.success) {
      setSuccessMessage("Profile updated successfully!");
      setErrors([]);
    } else {
      setErrors(result.errors);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Username (Cannot be changed)</label>
        <input name="username" value={formData.username} disabled />

        <label>First Name</label>
        <input name="firstName" value={formData.firstName} onChange={handleChange} required />

        <label>Last Name</label>
        <input name="lastName" value={formData.lastName} onChange={handleChange} required />

        <label>Email</label>
        <input name="email" value={formData.email} onChange={handleChange} required />

        <label>New Password (Optional)</label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} />

        <button type="submit">Save Changes</button>
      </form>

      {errors.length > 0 && (
        <div className="error-message">
          <p>Error updating profile:</p>
          <ul>{errors.map((err, idx) => <li key={idx}>{err}</li>)}</ul>
        </div>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default Profile;
