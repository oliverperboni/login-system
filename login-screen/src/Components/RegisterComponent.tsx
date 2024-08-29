import React from "react";
import "../Style/RegisterComponent.css";
import { Link } from "react-router-dom";

function RegisterComponent() {
  return (
    <>
      <div className="container">
        <div className="loginBox">
          <form className="user-form">
            <h2 className="title">Register</h2>
            <div className="input-fields">
              <input type="email" name="user-email" placeholder="Email" />
              <input type="text" placeholder="Username" />
              <input
                type="password"
                name="user-password1"
                placeholder="Password"
                minLength={6}
              />
              <label ></label>
              <input
                type="password"
                name="user-password2"
                placeholder="Password again"
                minLength={6}
              />
            </div>
            <input type="submit" value="Register" />
          </form>
    
        </div>
      </div>
    </>
  );
}

export default RegisterComponent;
