import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ login }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
  
    if (result && result.success) {
      navigate("/");
    } else {
      setErrors(result?.errors || ["An unexpected error occurred."]);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={e => setFormData({ ...formData, username: e.target.value })} />
        <input name="password" type="password" placeholder="Password" onChange={e => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
      {errors.length ? <p>{errors}</p> : null}
    </div>
  );
}

export default Login;
