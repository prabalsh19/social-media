import { useState, useContext, createContext } from "react";

const loginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  console.log(userDetails);
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
