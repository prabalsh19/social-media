import { PostCard } from "../../components/Post/PostCard";
import { useFeedContext } from "../../contexts/FeedContext/feedContext";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import "./Profile.css";
export const Profile = () => {
  const { userDetails } = useLoginContext();

  const { fullName } = userDetails;
  const date = new Date(userDetails.createdAt);
  const dateString = date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const { sortedPost: posts } = useFeedContext();

  return (
    <div className="profile">
      <img
        className="profile_backdrop"
        src={`https://source.unsplash.com/random/?background,gradient`}
        alt="profile backdrop"
      />
      <div className="profile-action">
        <img
          className="profile__avatar"
          src={`https://source.unsplash.com/random/?avatar,${fullName}`}
          alt=""
        />
        <button className="profile-edit-btn">Edit Profile</button>
      </div>
      <div className="profile-details">
        <div className="profile-details-sub-container">
          <b>{userDetails.fullName}</b>
          <small>@{userDetails.username}</small>
          <p>{userDetails.bio}</p>
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
