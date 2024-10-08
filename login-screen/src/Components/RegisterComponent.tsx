import React, { useState, FormEvent } from "react";
import "../Style/RegisterComponent.css";
import { registerUser } from "../API/utils";
import { AuthenticationResponse } from "../Types/types";
import { useNavigate } from "react-router-dom";

const RegisterComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [_, setRegisterResponse] =
    useState<AuthenticationResponse | undefined>(undefined);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password1 !== password2) {
      setError("Passwords do not match");
      return;
    }
    registerUserData()
  };

  const registerUserData = async () => {
    try {
      const res = await registerUser(email,password1,email, "ADMIN")
      setRegisterResponse(res)
      navigate("/")
    } catch (error :any) {
      setError("error in the register")
    }
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
