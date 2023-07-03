import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useLoginContext } from "../../contexts/index";
import { followUserService, getUsersService } from "../../services/services";
import "./FollowSuggestion.css";

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

  const followHandler = async (_id) => {
    try {
      const response = await followUserService(_id);
      setUserDetails(response?.data?.user);
    } catch (e) {
      console.error(e);
    }
  };

  const suggestedUsers = users.filter(
    (user) =>
      !userDetails?.following?.some(({ _id }) => _id === user._id) &&
      userDetails.username !== user.username
  );

  return (
    <>
      {suggestedUsers.length > 0 && (
        <div className="suggested-users">
          {suggestedUsers
            .slice(0, 6)
            .map(({ _id, username, avatar, fullName }) => (
              <div key={_id} className="suggested-user">
                <NavLink to={`/profile/${username}`}>
                  <img
                    className="profile-avatar"
                    src={avatar}
                    alt="profile avatar"
                  />
                </NavLink>
                <span className="suggested-user__full-name">{fullName}</span>
                <button onClick={() => followHandler(_id)}>Follow</button>
              </div>
            ))}
        </div>
      )}
    </>
  );
};
