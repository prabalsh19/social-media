import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
export const Signup = () => {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { setIsLoggedIn, setUserDetails } = useLoginContext();
  const inputChangeHandler = (e) => {
    setSignupData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/auth/signup", { ...signupData });
    setIsLoggedIn(true);
    setUserDetails(response.data.createdUser);
    localStorage.setItem("encodedToken", response.data.encodedToken);
    localStorage.setItem(
      "userDetails",
      JSON.stringify(response.data.createdUser)
    );
    navigate("/");
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
          type="password"
          value={signupData.password}
          onChange={(e) => inputChangeHandler(e)}
          name="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={signupData.confirmPassword}
          onChange={(e) => inputChangeHandler(e)}
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <button>Signup</button>
        <p>
          Already have an account? <NavLink to={"/login"}>Login</NavLink>
        </p>
      </div>
    </form>
  );
};
