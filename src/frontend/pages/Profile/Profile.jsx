import { useEffect, useState } from "react";
import { EditProfile } from "../../components/EditProfile/EditProfile";
import { PostCard } from "../../components/Post/PostCard";
import { useFeedContext } from "../../contexts/FeedContext/feedContext";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import "./Profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { defaultProfile } from "../../utils/constants";

export const Profile = () => {
  const { userDetails, setIsLoggedIn, setUserDetails } = useLoginContext();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const date = new Date(selectedUser.createdAt);
  const dateString = date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const {
    state: { posts },
  } = useFeedContext();
  const logoutHandler = () => {
    setIsLoggedIn(false);
    setUserDetails({});
    localStorage.clear();
  };
  const { _id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/users/${_id}`);
        setSelectedUser(response.data.user);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [_id, userDetails]);
  const userFollowsThisProfile = userDetails.following.some(
    (user) => user.username === selectedUser.username
  );
  const followHandler = async (_id) => {
    const encodedToken = localStorage.getItem("encodedToken");
    try {
      const response = await axios.post(
        `/api/users/follow/${_id}`,
        {},
        {
          headers: { authorization: encodedToken },
        }
      );
      setUserDetails(response.data.user);
    } catch (e) {
      console.error(e);
    }
  };
  const unfollowHandler = async (_id) => {
    const encodedToken = localStorage.getItem("encodedToken");

    try {
      const response = await axios.post(
        `/api/users/unfollow/${_id}`,
        {},
        {
          headers: { authorization: encodedToken },
        }
      );
      setUserDetails(response.data.user);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {selectedUser._id && (
        <div className="profile-container outlet-container">
          {showEditProfileModal && (
            <EditProfile setShowEditProfileModal={setShowEditProfileModal} />
          )}
          <img
            className="profile_backdrop"
            src={`https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80`}
            alt="profile backdrop"
          />
          <div className="profile-action">
            <img
              className="profile__avatar"
              src={selectedUser.avatar || defaultProfile}
              alt=""
            />
            {selectedUser.username === userDetails.username ? (
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
                onClick={() => unfollowHandler(_id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="profile-edit-btn"
                onClick={() => followHandler(_id)}
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
              <a href={`https://${selectedUser.portfolio}`}>
                {selectedUser.portfolio}
              </a>
            </div>
            <div className="follow-details">
              <span>{selectedUser?.followers?.length} Followers</span>
              <span>{selectedUser?.following?.length} Following</span>
            </div>
            <span>Member Since: {dateString}</span>
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
