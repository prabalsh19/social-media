import { useEffect, useState } from "react";
import { useLoginContext } from "../../contexts/index";
import "./FollowSuggestion.css";
import { NavLink } from "react-router-dom";
import { followUserService, getUsersService } from "../../services/services";

export const FollowSuggestion = () => {
  const { userDetails, setUserDetails } = useLoginContext();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await getUsersService();
        setUsers(response.data.users);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  const suggestedUsers = users.filter(
    (user) =>
      !userDetails?.following?.some(({ _id }) => _id === user._id) &&
      user.username !== userDetails.username
  );
  const followHandler = async (_id) => {
    try {
      const response = await followUserService(_id);
      setUserDetails(response.data.user);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {suggestedUsers.length > 0 && (
        <div className="suggested-users">
          {suggestedUsers.slice(0, 6).map((user) => (
            <div key={user._id} className="suggested-user">
              <NavLink to={`/profile/${user.username}`}>
                <img className="profile-avatar" src={user.avatar} alt="" />
              </NavLink>
              <span className="suggested-user__full-name">{user.fullName}</span>
              <button onClick={() => followHandler(user._id)}>Follow</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
