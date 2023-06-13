import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import "./PostCard.css";
import axios from "axios";
import { useFeedContext } from "../../contexts/FeedContext/feedContext";
import { useState } from "react";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
export const PostCard = ({
  _id,
  fullName,
  postImage,
  username,
  content,
  createdAt,
  comments,
  likes: { likeCount, likedBy },
}) => {
  const { dispatch } = useFeedContext();
  const date = new Date(createdAt);
  const longFormatDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const { userDetails } = useLoginContext();
  const [liked, setLiked] = useState(likedBy.includes(userDetails.username));
  const likeHandler = async (_id) => {
    setLiked(true);
    const encodedToken = localStorage.getItem("encodedToken");
    try {
      const response = await axios.post(
        `/api/posts/like/${_id}`,
        {},
        {
          headers: { authorization: encodedToken },
        }
      );
      dispatch({ type: "UPDATE_FEED", payload: response.data.posts });
    } catch (e) {
      console.error(e);
    }
  };
  const dislikeHandler = async (_id) => {
    setLiked(false);
    const encodedToken = localStorage.getItem("encodedToken");
    try {
      const response = await axios.post(
        `/api/posts/dislike/${_id}`,
        {},
        {
          headers: { authorization: encodedToken },
        }
      );
      dispatch({ type: "UPDATE_FEED", payload: response.data.posts });
    } catch (e) {
      console.error(e);
    }
  };
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
        <img className="post-img" src={postImage} alt="post" />
        <small>{content}</small>
      </div>
      <div className="post-actions">
        <div className="action">
          {liked ? (
            <span onClick={() => dislikeHandler(_id)}>
              <FavoriteIcon sx={{ color: "#ff3040" }} />
            </span>
          ) : (
            <span onClick={() => likeHandler(_id)}>
              <FavoriteBorderIcon />
            </span>
          )}

          <span>{likeCount}</span>
        </div>
        <div className="action">
          <span>
            <CommentIcon />
          </span>
          <span>{comments.length}</span>
        </div>
        <div className="action">
          <span>
            <BookmarkBorderIcon />
          </span>
        </div>
      </div>
    </div>
  );
};
