import React from "react";
import "../Style/LoginComponent.css";

function LoginComponent() {
  return (
    <>
      <div className="container">
        <div className="loginBox">
          <form className="user-form">
            <h2 className="title">Login</h2>
            <div className="input-fields">
              <input type="email" name="user-email" placeholder="Email" />
              <input
                type="password"
                name="user-password"
                placeholder="Password"
              />
            </div>
            <input type="submit" value="Sign in" />
          </form>
          <div className="others">
            <span className="register">register</span>
            <span className="forgot">forgot the password</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
