import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./PostCard.css";
export const PostCard = ({ fullName, _id, username, content, createdAt }) => {
  const date = new Date(createdAt);
  const longFormatDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="post-card">
      <div className="post-info">
        <div className="post-info-subcontainer">
          <img
            className="profile-avatar"
            src={`https://source.unsplash.com/random/?avatar,${fullName}`}
            alt="profile-avatar"
          />
          <div>
            <p>{fullName}</p>
            <small>@{username}</small>
          </div>
        </div>
        <div className="post-info-subcontainer">
          <small>{longFormatDate}</small>
          <MoreHorizIcon />
        </div>
      </div>
      <div className="post-text">
        <img
          className="post-img"
          src={"https://source.unsplash.com/featured/300x20" + _id}
          alt="post"
        />
        <small>{content}</small>
      </div>
      <div className="post-actions"></div>
    </div>
  );
};
