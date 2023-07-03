import "./Nav.css";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  const {
    userDetails: { username, avatar },
    isLoggedIn,
  } = useLoginContext();

  return (
    <nav className="nav">
      <NavLink to={"/"}>
        <h1 className="logo">SOCIALS</h1>
      </NavLink>
      {isLoggedIn && (
        <NavLink to={`/profile/${username}`}>
          <img className="profile-avatar" src={avatar} alt="profile avatar" />
        </NavLink>
      )}
    </nav>
  );
};
