import React from "react";
import { Link } from "react-router-dom";
const ResetPass = () => {
  return (
    <section className="login-container">
      <div className="login-form">
        <div className="login-heading">
          <h1>Reset Password</h1>
          <p>Enter new password to reset your password</p>
        </div>
        <div className="login-inputs">
          <label for="pass">Password</label>
          <input type="password" id="pass" />
          <label for="re-enter">Re-enter Password</label>
          <input type="password" id="re-enter" />
          <div className="btn">
            <button className="login-btn">
              <Link to={"/"}>Reset</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPass;
