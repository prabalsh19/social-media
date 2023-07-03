import "./Filters.css";
import { useFeedContext } from "../../contexts/index";
export const Filters = () => {
  const {
    state: { selectedCategory },
    dispatch,
  } = useFeedContext();
  return (
    <div className="filters-container">
      <span
        className={selectedCategory === "LATEST" ? "activeCategory" : ""}
        onClick={() => dispatch({ type: "CHANGE_SORT", payload: "LATEST" })}
      >
        Latest
      </span>
      <span
        className={selectedCategory === "TRENDING" ? "activeCategory" : ""}
        onClick={() => dispatch({ type: "CHANGE_SORT", payload: "TRENDING" })}
      >
        Trending
      </span>
    </div>
  );
};
