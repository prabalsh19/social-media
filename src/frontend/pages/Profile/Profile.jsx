import { useState } from "react";
import { EditProfile } from "../../components/EditProfile/EditProfile";
import { PostCard } from "../../components/Post/PostCard";
import { useFeedContext } from "../../contexts/FeedContext/feedContext";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import "./Profile.css";

export const Profile = () => {
  const { userDetails, setIsLoggedIn, setUserDetails } = useLoginContext();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const date = new Date(userDetails.createdAt);
  const dateString = date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const { sortedPost: posts } = useFeedContext();
  const logoutHandler = () => {
    setIsLoggedIn(false);
    setUserDetails({});
    localStorage.clear();
  };
  return (
    <>
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
          <img className="profile__avatar" src={userDetails.avatar} alt="" />
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
        </div>
        <div className="profile-details">
          <div className="profile-details-sub-container">
            <b>{userDetails.fullName}</b>
            <small>@{userDetails.username}</small>
            <p>{userDetails.bio}</p>
            <a href={`https://${userDetails.portfolio}`}>
              {userDetails.portfolio}
            </a>
          </div>
          <div className="follow-details">
            <span>{userDetails?.followers?.length} Followers</span>
            <span>{userDetails?.following?.length} Following</span>
          </div>
          <span>Member Since: {dateString}</span>
        </div>
        <div className="user-posts">
          {posts
            .filter((post) => post.username === userDetails.username)
            .map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
        </div>
      </div>
    </>
  );
};
