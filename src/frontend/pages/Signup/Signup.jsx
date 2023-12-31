import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { signUpService } from "../../services/services";
import { useLoginContext } from "../../contexts/index";
import "./Signup.css";

export const Signup = () => {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });
  const { setIsLoggedIn, setUserDetails } = useLoginContext();

  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    setSignupData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Confirm Password does not match!");
      return;
    }
    try {
      const response = await signUpService(signupData);
      setIsLoggedIn(true);
      setUserDetails(response.data.createdUser);
      localStorage.setItem("encodedToken", response.data.encodedToken);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(response.data.createdUser)
      );
      navigate("/getting-started");
    } catch (e) {
      console.error(e);
    }
  };
  const setShowPasswordsHandler = (e) => {
    setShowPasswords((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };
  return (
    <form className="signup-form" onSubmit={submitHandler} autoComplete="off">
      <div className="signup-container">
        <h2>Signup</h2>
        <input
          type="text"
          value={signupData.firstName}
          onChange={(e) => inputChangeHandler(e)}
          name="firstName"
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={signupData.lastName}
          onChange={(e) => inputChangeHandler(e)}
          name="lastName"
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          value={signupData.email}
          onChange={(e) => inputChangeHandler(e)}
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={signupData.username}
          onChange={(e) => inputChangeHandler(e)}
          name="username"
          placeholder="Username"
          required
        />

        <input
          type={showPasswords.password ? "text" : "password"}
          value={signupData.password}
          onChange={(e) => inputChangeHandler(e)}
          name="password"
          placeholder="Password"
          required
        />
        <div className="show-password">
          <input
            value={showPasswords.password}
            type="checkbox"
            onChange={(e) => setShowPasswordsHandler(e)}
            name="password"
            id="password"
          />
          <label htmlFor="password">Show Password</label>
        </div>
        <input
          type={showPasswords.confirmPassword ? "text" : "password"}
          value={signupData.confirmPassword}
          onChange={(e) => inputChangeHandler(e)}
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <div className="show-password">
          <input
            value={showPasswords.confirmPassword}
            onChange={(e) => setShowPasswordsHandler(e)}
            type="checkbox"
            name="confirmPassword"
            id="confirmPassword"
          />
          <label htmlFor="confirmPassword">Show Confirm Password</label>
        </div>
        <button>Signup</button>
        <p>
          Already have an account?{" "}
          <NavLink to={"/login"} className={"defaultLink"}>
            Login
          </NavLink>
        </p>
      </div>
    </form>
  );
};
