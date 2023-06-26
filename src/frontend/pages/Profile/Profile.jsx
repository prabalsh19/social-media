import { useState } from "react";
import { EditProfile } from "../../components/EditProfile/EditProfile";
import { PostCard } from "../../components/Post/PostCard";
import { useFeedContext } from "../../contexts/FeedContext/feedContext";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import "./Profile.css";
export const Profile = () => {
  const { userDetails } = useLoginContext();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const date = new Date(userDetails.createdAt);
  const dateString = date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const { sortedPost: posts } = useFeedContext();

  return (
    <div className="profile">
      {showEditProfileModal && (
        <EditProfile setShowEditProfileModal={setShowEditProfileModal} />
      )}
      <img
        className="profile_backdrop"
        src={`https://source.unsplash.com/random/?background,gradient`}
        alt="profile backdrop"
      />
      <div className="profile-action">
        <img className="profile__avatar" src={userDetails.avatar} alt="" />
        <button
          className="profile-edit-btn"
          onClick={() => setShowEditProfileModal(true)}
        >
          Edit Profile
        </button>
      </div>
      <div className="profile-details">
        <div className="profile-details-sub-container">
          <b>{userDetails.fullName}</b>
          <small>@{userDetails.username}</small>
          <p>{userDetails.bio}</p>
          <a href={userDetails.portfolio}>{userDetails.portfolio}</a>
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
  );
};
