import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const FeedContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL_FEED_FETCH": {
      return { ...state, posts: action.payload };
    }
    case "CHANGE_SORT": {
      return {
        ...state,
        selectedCategory: action.payload,
      };
    }
    default:
      return state;
  }
};

export const FeedContextProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/posts");
      dispatch({ type: "INITIAL_FEED_FETCH", payload: response.data.posts });
    })();
  }, []);

  const [state, dispatch] = useReducer(reducer, {
    posts: [],
    selectedCategory: "LATEST",
  });
  const sortedPost = [...state.posts].sort((a, b) =>
    state.selectedCategory === "TRENDING"
      ? b.likes.likeCount - a.likes.likeCount
      : new Date(b.createdAt) - new Date(a.createdAt)
  );
  const value = {
    state,
    dispatch,
    sortedPost,
  };
  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
};

export const useFeedContext = () => useContext(FeedContext);
