import { useState } from "react";
import "./Filters.css";
export const Filters = () => {
  const [trendingIsSelected, setTrendingIsSelected] = useState(true);
  return (
    <div className="filters-container">
      <span
        className={trendingIsSelected ? "active" : ""}
        onClick={() => setTrendingIsSelected(true)}
      >
        Trending
      </span>
      <span
        className={trendingIsSelected ? "" : "active"}
        onClick={() => setTrendingIsSelected(false)}
      >
        Latest
      </span>
    </div>
  );
};
