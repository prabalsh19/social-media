import "./Nav.css";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import { NavLink } from "react-router-dom";
import { defaultProfile } from "../../utils/constants";
export const Nav = () => {
  const { userDetails, isLoggedIn } = useLoginContext();

  return (
    <nav className="nav">
      <NavLink to={"/"}>
        <h1 className="logo">SOCIALS</h1>
      </NavLink>
      {isLoggedIn && (
        <NavLink to={`/profile/${userDetails.username}`}>
          <img
            className="profile-avatar"
            src={userDetails.avatar || defaultProfile}
            alt=""
          />
        </NavLink>
      )}
    </nav>
  );
};
