import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    // reset error
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      console.log(data);

      if (data.errors) {
        setErrorMsg(data.errors.msg);
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
        <button onClick={onSubmit}>Log in</button>
        <Link to="/">or sign up</Link>
      </form>
    </div>
  );
}

export default Login;
