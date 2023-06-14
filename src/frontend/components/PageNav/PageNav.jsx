import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import "./PageNav.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
export const PageNav = () => {
  const [active, setActive] = useState("HOME");
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
    </div>
  );
};
