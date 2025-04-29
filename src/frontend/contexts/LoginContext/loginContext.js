import { useState, useContext, createContext, useEffect } from 'react';

const loginContext = createContext();

const LOCAL_STORAGE_KEY = 'login_context_state';

export const LoginContextProvider = ({ children }) => {
  const getInitialState = () => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          isLoggedIn: parsed.isLoggedIn || false,
          userDetails: parsed.userDetails || {},
          bookmarks: parsed.bookmarks || [],
        };
      }
    } catch (e) {
      console.error('Error reading login state from localStorage', e);
    }
    return {
      isLoggedIn: false,
      userDetails: {},
      bookmarks: [],
    };
  };

  const initialState = getInitialState();

  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);
  const [userDetails, setUserDetails] = useState(initialState.userDetails);
  const [bookmarks, setBookmarks] = useState(initialState.bookmarks);

  // Persist state to localStorage whenever any value changes
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ isLoggedIn, userDetails, bookmarks })
    );
  }, [isLoggedIn, userDetails, bookmarks]);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userDetails,
    setUserDetails,
    bookmarks,
    setBookmarks,
  };

  return (
    <loginContext.Provider value={value}>{children}</loginContext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(loginContext);
};
