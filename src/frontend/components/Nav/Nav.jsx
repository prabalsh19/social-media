import "./Nav.css";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import { NavLink } from "react-router-dom";
export const Nav = () => {
  const { userDetails, isLoggedIn } = useLoginContext();

  return (
    <nav className="nav">
      <NavLink to={"/"}>
        <h1 className="logo">SOCIALS</h1>
      </NavLink>
      {isLoggedIn && (
        <NavLink to={`/profile/${userDetails._id}`}>
          <img className="profile-avatar" src={userDetails.avatar} alt="" />
        </NavLink>
      )}
    </nav>
  );
};
