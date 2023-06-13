import { useState, useContext, createContext } from "react";

const loginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userDetails,
    setUserDetails,
  };
  return (
    <loginContext.Provider value={value}>{children}</loginContext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(loginContext);
};
