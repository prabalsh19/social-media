import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import "./PageNav.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import { defaultProfile } from "../../utils/constants";

export const PageNav = () => {
  const [active, setActive] = useState("HOME");
  const { userDetails } = useLoginContext();
  return (
    <div className="page-nav">
      <NavLink onClick={() => setActive("HOME")} to="/">
        {active === "HOME" ? (
          <HomeRoundedIcon sx={{ fontSize: "1.9rem" }} />
        ) : (
          <HomeOutlinedIcon sx={{ fontSize: "1.9rem" }} />
        )}
      </NavLink>
      <NavLink onClick={() => setActive("EXPLORE")} to="/explore">
        {active === "EXPLORE" ? (
          <ExploreIcon sx={{ fontSize: "1.9rem" }} />
        ) : (
          <ExploreOutlinedIcon sx={{ fontSize: "1.9rem" }} />
        )}
      </NavLink>
      <NavLink onClick={() => setActive("BOOKMARKS")} to="/bookmarks">
        {active === "BOOKMARKS" ? (
          <BookmarkIcon sx={{ fontSize: "1.9rem" }} />
        ) : (
          <BookmarkBorderOutlinedIcon sx={{ fontSize: "1.9rem" }} />
        )}
      </NavLink>

      <NavLink
        onClick={() => setActive("PROFILE")}
        to={`/profile/${userDetails._id}`}
      >
        <img
          className="nav__profile-avatar"
          src={userDetails.avatar || defaultProfile}
          alt=""
        />
      </NavLink>
    </div>
  );
};
