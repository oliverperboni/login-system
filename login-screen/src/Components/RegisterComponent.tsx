import React, { useState, FormEvent } from "react";
import "../Style/RegisterComponent.css";
import { Link } from "react-router-dom";
import { registerUser } from "../API/utils";
import { AuthenticationResponse } from "../Types/types";

const RegisterComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [registerResponse, setRegisterResponse] =
  useState<AuthenticationResponse | undefined>(undefined);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password1 !== password2) {
      setError("Passwords do not match");
      return;
    }

    // Process the registration (e.g., API call)
    registerUserData()
  };
  
  function registerUserData() {
    registerUser(
      username,
      password1,
      email,
      "USER"
    ).then((res) => setRegisterResponse(res));
  }
  return (
    <>
      <div className="container">
        <div className="loginBox">
          <form className="user-form" onSubmit={handleSubmit}>
            <h2 className="title">Register</h2>
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
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                name="user-password1"
                placeholder="Password"
                minLength={6}
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                required
              />
              <input
                type="password"
                name="user-password2"
                placeholder="Password again"
                minLength={6}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <input type="submit" value="Register" />
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterComponent;
