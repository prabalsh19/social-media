import { createContext, useContext, useEffect, useReducer } from 'react';
import { useLoginContext } from '../LoginContext/loginContext';
import { getPostsService } from '../../services/services';

const FeedContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL_FEED_FETCH': {
      return { ...state, posts: action.payload, infinitePost: action.payload };
    }
    case 'CHANGE_SORT': {
      return {
        ...state,
        selectedCategory: action.payload,
      };
    }
    case 'UPDATE_FEED': {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case 'UPDATE_INFINTIE_POST': {
      return {
        ...state,
        posts: state.posts.concat(
          state.posts.filter(({ username }) => username !== action.payload)
        ),
      };
    }
    case 'RESET_INFINITE_POST': {
      return {
        ...state,
        posts: state.posts.filter(
          (item, index) => state.posts.indexOf(item) === index
        ),
      };
    }
    default:
      return state;
  }
};

const LOCAL_STORAGE_KEY = 'feed_state';

export const FeedContextProvider = ({ children }) => {
  const { userDetails } = useLoginContext();

  const getInitialState = () => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return {
      posts: [],
      selectedCategory: 'LATEST',
    };
  };

  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);

  // Save to localStorage on every state change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Fetch posts only if not already loaded
  useEffect(() => {
    if (state.posts.length === 0) {
      (async () => {
        try {
          const response = await getPostsService();
          dispatch({
            type: 'INITIAL_FEED_FETCH',
            payload: response.data.posts,
          });
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [state.posts.length]);

  const filteredPost = state.posts.filter(
    (post) =>
      userDetails?.following?.some(
        (following) => following.username === post.username
      ) || post.username === userDetails.username
  );

  const sortedPost = [...filteredPost].sort((a, b) =>
    state.selectedCategory === 'TRENDING'
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
