import React from "react";
import "../Style/LoginComponent.css";
import { Link } from "react-router-dom";

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
                minLength={6}
              />
            </div>
            <input type="submit" value="Sign in" />
          </form>
          <div className="others">
            <Link  className="link" to={"/register"}><span className="register">register</span></Link>
            <span className="forgot">forgot the password</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
