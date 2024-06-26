import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import "../css/auth.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, usernameError, passwordError } = useSignup();

  const handleSumbit = async (e: any) => {
    e.preventDefault();

    await signup(username, password);
  };

  return (
    <div id="auth-container">
      <img src="./images/fearless-girl.jpg" alt="fearless-girl" />
      <form onSubmit={handleSumbit} className="auth-form signup">
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input
          id="username-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          required
        />
        <div className="error username">{usernameError}</div>

        <label htmlFor="password">Password</label>
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          name="password"
          required
        />
        <div className="error password">{passwordError}</div>
        <button id="submit-btn" disabled={isLoading}>
          Sign Up
        </button>
        <Link to="/login">or login</Link>
      </form>
    </div>
  );
}

export default Login;
