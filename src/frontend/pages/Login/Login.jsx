import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { useLoginContext } from "../../contexts/index";
import { loginService } from "../../services/services";

export const Login = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const { setIsLoggedIn, setUserDetails } = useLoginContext();

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService(loginData);

      setIsLoggedIn(true);
      setUserDetails(response.data.foundUser);
      localStorage.setItem("encodedToken", response.data.encodedToken);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(response.data.foundUser)
      );

      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  const inputChangeHandler = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const guestLoginHandler = () => {
    setLoginData({ username: "prabalsh19", password: "123456789" });
  };

  return (
    <form onSubmit={loginHandler}>
      <div className="login-container">
        <h2>Login</h2>
        <input
          type="text"
          value={loginData.username}
          onChange={(e) => inputChangeHandler(e)}
          name="username"
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={loginData.password}
          onChange={(e) => inputChangeHandler(e)}
          name="password"
          placeholder="Password"
          required
        />
        <button>Login</button>
        <button onClick={guestLoginHandler}>Guest Login</button>
        <p>
          Don't have an account? <NavLink to={"/signup"}>Signup</NavLink>
        </p>
      </div>
    </form>
  );
};
