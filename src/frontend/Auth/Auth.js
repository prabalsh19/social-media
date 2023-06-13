import { Navigate, useLocation } from "react-router-dom";
import { useLoginContext } from "../contexts/LoginContext/loginContext";

export const Auth = ({ children }) => {
  const { isLoggedIn } = useLoginContext();
  const location = useLocation();

  return isLoggedIn ? children : <Navigate to="/login" state={{ location }} />;
};
