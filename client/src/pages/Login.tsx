import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import "../css/auth.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, errorMsg } = useLogin();

  const handleSumbit = async (e: any) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <div id="auth-container">
      <img src="./images/bull.jpg" alt="bull" />
      <form onSubmit={handleSumbit} className="auth-form signup">
        <h2>Login</h2>

        <div className="error username">{errorMsg}</div>

        <label htmlFor="username">Username</label>
        <input
          id="username-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          name="password"
          required
        />
        <button id="submit-btn" disabled={isLoading}>
          Log in
        </button>
        <Link to="/signup">or sign up</Link>
      </form>
    </div>
  );
}

export default Login;
