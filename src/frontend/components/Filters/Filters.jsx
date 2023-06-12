import "./Filters.css";
import { useFeedContext } from "../../contexts/FeedContext/feedContext";
export const Filters = () => {
  const {
    state: { selectedCategory },
    dispatch,
  } = useFeedContext();
  return (
    <div className="filters-container">
      <span
        className={selectedCategory === "TRENDING" && "active"}
        onClick={() => dispatch({ type: "CHANGE_SORT", payload: "TRENDING" })}
      >
        Trending
      </span>
      <span
        className={selectedCategory === "LATEST" && "active"}
        onClick={() => dispatch({ type: "CHANGE_SORT", payload: "LATEST" })}
      >
        Latest
      </span>
    </div>
  );
};
