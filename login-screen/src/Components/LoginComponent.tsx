import React, { useState, FormEvent } from "react";
import "../Style/LoginComponent.css";
import { Link } from "react-router-dom";

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Placeholder for login logic
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    // Process the login (e.g., API call)
    console.log("Logging in with:", { email, password });
  };

  return (
    <>
      <div className="container">
        <div className="loginBox">
          <form className="user-form" onSubmit={handleSubmit}>
            <h2 className="title">Login</h2>
            <div className="input-fields">
              <input
                type="email"
                name="user-email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                name="user-password"
                placeholder="Password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <input type="submit" value="Sign in" />
          </form>
          <div className="others">
            <Link className="link" to="/register">
              <span className="register">Register</span>
            </Link>
            <Link className="link" to="/reset-password">
              <span className="forgot">Forgot the password</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
