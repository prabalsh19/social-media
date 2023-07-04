import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { EditProfile, PostCard } from "../../components/index";
import { useFeedContext, useLoginContext } from "../../contexts/index";
import {
  followUserService,
  getUserService,
  unfollowUserService,
} from "../../services/services";
import "./Profile.css";
import { formatDate } from "../../utils/helper";
import { defaultBackdrop } from "../../utils/constants";

export const Profile = () => {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const { userDetails, setIsLoggedIn, setUserDetails } = useLoginContext();
  const {
    state: { posts },
  } = useFeedContext();

  const dateStr = formatDate(selectedUser?.createdAt);

  const { username } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserService(username);
        setSelectedUser(response.data.user);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [username, userDetails]);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setUserDetails({});
    localStorage.clear();
  };
  const followHandler = async (_id) => {
    try {
      const response = await followUserService(_id);
      setUserDetails(response.data.user);
    } catch (e) {
      console.error(e);
    }
  };
  const unfollowHandler = async (_id) => {
    try {
      const response = await unfollowUserService(_id);
      setUserDetails(response.data.user);
    } catch (e) {
      console.error(e);
    }
  };

  const userFollowsThisProfile = userDetails.following.some(
    (user) => user.username === selectedUser.username
  );
  const loggedInUserProfile = username === userDetails.username;
  return (
    <>
      {selectedUser._id && (
        <div className="profile-container outlet-container">
          {showEditProfileModal && (
            <EditProfile setShowEditProfileModal={setShowEditProfileModal} />
          )}
          <img
            className="profile_backdrop"
            src={selectedUser.backdrop || defaultBackdrop}
            alt="profile backdrop"
          />
          <div className="profile-action">
            <img className="profile__avatar" src={selectedUser.avatar} alt="" />
            {loggedInUserProfile ? (
              <div>
                <button
                  className="profile-edit-btn"
                  onClick={() => setShowEditProfileModal(true)}
                >
                  Edit Profile
                </button>
                <button className="logout-btn" onClick={logoutHandler}>
                  Logout
                </button>
              </div>
            ) : userFollowsThisProfile ? (
              <button
                className="profile-edit-btn"
                onClick={() => unfollowHandler(selectedUser._id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="profile-edit-btn"
                onClick={() => followHandler(selectedUser._id)}
              >
                Follow
              </button>
            )}
          </div>

          <div className="profile-details">
            <div className="profile-details-sub-container">
              <b>{selectedUser.fullName}</b>
              <small>@{selectedUser.username}</small>
              <p>{selectedUser.bio}</p>
              <a
                className="defaultLink"
                href={`https://${selectedUser.portfolio}`}
              >
                {selectedUser.portfolio}
              </a>
            </div>
            <div className="follow-details">
              <span>{selectedUser?.followers?.length} Followers</span>
              <span>{selectedUser?.following?.length} Following</span>
            </div>
            <span>Member Since: {dateStr}</span>
          </div>
          <div className="user-posts">
            {posts
              .filter((post) => post.username === selectedUser.username)
              .map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};
