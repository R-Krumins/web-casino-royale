import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, errorMsg } = useLogin();
  const navigate = useNavigate();

  const handleSumbit = async (e: any) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSumbit} className="auth-form signup">
        <h2>Login</h2>

        <div className="error username">{errorMsg}</div>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          name="password"
          required
        />
        <button disabled={isLoading}>Log in</button>
        <Link to="/signup">or sign up</Link>
      </form>
    </div>
  );
}

export default Login;
