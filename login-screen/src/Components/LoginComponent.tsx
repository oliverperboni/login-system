import React, { useState, FormEvent } from "react";
import "../Style/LoginComponent.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../API/utils";
import { AuthenticationResponse } from "../Types/types";

const LoginComponent = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const [_, setLoginResponse] =
    useState<AuthenticationResponse | undefined>(undefined);

  const navigate = useNavigate();

  const loginUserData = async (email: string, password: string) => {
    try {
      const res = await loginUser(email, password, email, "ADMIN");
      localStorage.setItem("token", res.access_token);
      console.log(res);
      navigate("/sucesess")
    } catch (err: any) {
      setError("Login failed. Please check your credentials.");
      setPassword("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Placeholder for login logic
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    await loginUserData(email, password);
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
