import { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const loginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const encodedToken = localStorage.getItem("encodedToken");
    const userDetailsFromLocal = localStorage.getItem("userDetails");
    if (encodedToken !== null) {
      setIsLoggedIn(true);
      setUserDetails(JSON.stringify(userDetailsFromLocal));
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
