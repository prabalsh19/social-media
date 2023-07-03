import { createContext, useContext, useEffect, useReducer } from "react";
import { useLoginContext } from "../LoginContext/loginContext";
import { getPostsService } from "../../services/services";

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
    case "UPDATE_FEED": {
      return {
        ...state,
        posts: action.payload,
      };
    }
    default:
      return state;
  }
};

export const FeedContextProvider = ({ children }) => {
  const { userDetails } = useLoginContext();
  useEffect(() => {
    (async () => {
      try {
        const response = await getPostsService();
        dispatch({ type: "INITIAL_FEED_FETCH", payload: response.data.posts });
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const [state, dispatch] = useReducer(reducer, {
    posts: [],
    selectedCategory: "LATEST",
  });

  const filteredPost = state.posts.filter(
    (post) =>
      userDetails?.following?.some(
        (following) => following.username === post.username
      ) || post.username === userDetails.username
  );
  const sortedPost = [...filteredPost].sort((a, b) =>
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
