import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    // reset errors
    setUsernameError("");
    setPasswordError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      console.log(data);

      if (data.errors) {
        setUsernameError(data.errors.username);
        setPasswordError(data.errors.password);
      }

      if (data.user) {
        navigate("/portfolio");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <form action="" className="auth-form signup">
        <h2>Sign Up</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          required
        />
        <div className="error username">{usernameError}</div>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          name="password"
          required
        />
        <div className="error password">{passwordError}</div>
        <button onClick={onSubmit}>Sign Up</button>
        <Link to="/login">or login</Link>
      </form>
    </div>
  );
}

export default Login;
