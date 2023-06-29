import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import "./FollowSuggestion.css";

export const FollowSuggestion = () => {
  const { userDetails, setUserDetails } = useLoginContext();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/users");
      setUsers(response.data.users);
    })();
  }, []);
  const suggestedUsers = users.filter(
    (user) =>
      !userDetails.following.some(({ _id }) => _id === user._id) &&
      user.username !== userDetails.username
  );
  const followHandler = async (_id) => {
    const encodedToken = localStorage.getItem("encodedToken");
    const response = await axios.post(
      `/api/users/follow/${_id}`,
      {},
      {
        headers: { authorization: encodedToken },
      }
    );
    setUserDetails(response.data.user);
  };
  return (
    <div className="suggested-users">
      {suggestedUsers.map((user) => (
        <div key={user._id} className="suggested-user">
          <img className="profile-avatar" src={user.avatar} alt="" />
          <span className="suggested-user__full-name">{user.fullName}</span>
          <button onClick={() => followHandler(user._id)}>Follow</button>
        </div>
      ))}
    </div>
  );
};
