import "./Nav.css";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import { NavLink } from "react-router-dom";
export const Nav = () => {
  const { userDetails, isLoggedIn } = useLoginContext();
  const { fullName } = userDetails;

  return (
    <nav className="nav">
      <h1 className="logo">SOCIALS</h1>
      {isLoggedIn && (
        <NavLink to="/profile">
          <img
            className="profile-avatar"
            src={`https://source.unsplash.com/random/?avatar,${fullName}`}
            alt=""
          />
        </NavLink>
      )}
    </nav>
  );
};
