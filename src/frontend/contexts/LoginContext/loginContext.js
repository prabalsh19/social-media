import { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const loginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const encodedToken = localStorage.getItem("encodedToken");
    const userDetailsFromLocal = localStorage.getItem("userDetails");

    if (encodedToken !== null) {
      setIsLoggedIn(true);
      setUserDetails(JSON.parse(userDetailsFromLocal));
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
