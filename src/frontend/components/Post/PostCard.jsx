import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "./PostCard.css";
import axios from "axios";
import { useFeedContext } from "../../contexts/FeedContext/feedContext";
import { useState } from "react";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import { CommentModal } from "../CommentModal/CommentModal";
import { EditPost } from "../EditPost/EditPost";
import { PostMenuOptions } from "../PostMenuOptions/PostMenuOptions";
import { defaultProfile } from "../../utils/constants";
import { Link } from "react-router-dom";
export const PostCard = ({
  _id,
  id,
  fullName,
  postImage,
  username,
  content,
  createdAt,
  comments,
  avatar = defaultProfile,
  likes: { likeCount, likedBy },
}) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);

  const { dispatch } = useFeedContext();
  const date = new Date(createdAt);
  const longFormatDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const { userDetails, bookmarks, setBookmarks } = useLoginContext();
  const [liked, setLiked] = useState(
    likedBy.find((user) => user.username === userDetails.username)
  );
  const [isBookmarked, setIsBookmarked] = useState(
    bookmarks.find((bookmark) => bookmark._id === _id)
  );

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
  const commentBtnHandler = () => {
    setShowCommentModal(true);
  };
  const addToBookmarkHandler = async () => {
    setIsBookmarked(true);
    const encodedToken = localStorage.getItem("encodedToken");
    try {
      const response = await axios.post(
        `/api/users/bookmark/${_id}`,
        {},
        { headers: { authorization: encodedToken } }
      );

      setBookmarks(response.data.bookmarks);
    } catch (e) {
      console.error(e);
    }
  };
  const removeFromBookmarkHandler = async () => {
    setIsBookmarked(false);
    const encodedToken = localStorage.getItem("encodedToken");
    try {
      const response = await axios.post(
        `/api/users/remove-bookmark/${_id}`,
        {},
        { headers: { authorization: encodedToken } }
      );
      setBookmarks(response.data.bookmarks);
    } catch (e) {
      console.error(e);
    }
  };
  const loggedInUserPost = username === userDetails.username;

  return (
    <>
      {showCommentModal && (
        <CommentModal _id={_id} setShowCommentModal={setShowCommentModal} />
      )}
      {showEditPostModal && (
        <EditPost
          _id={_id}
          showEditPostModal={showEditPostModal}
          setShowEditPostModal={setShowEditPostModal}
        />
      )}
      <EditPost />
      <div className="post-card">
        <div className="post-info">
          <div className="post-info-subcontainer">
            <Link to={`profile/${_id}`}>
              <img
                className="profile-avatar"
                src={
                  loggedInUserPost
                    ? userDetails.avatar ?? defaultProfile
                    : avatar
                }
                alt="profile-avatar"
              />
            </Link>
            <div>
              <p>{fullName}</p>
              <small>@{username}</small>
            </div>
          </div>
          <div className="post-info-subcontainer">
            <small>{longFormatDate}</small>
            <span
              className="menu-icon"
              onClick={() => setShowMenuOptions(!showMenuOptions)}
            >
              <MoreHorizIcon />
              {showMenuOptions && (
                <PostMenuOptions
                  _id={_id}
                  username={username}
                  setShowEditPostModal={setShowEditPostModal}
                />
              )}
            </span>
          </div>
        </div>
        <div className="post-text">
          <img className="post-img" src={postImage} alt="post" />
          <small>{content}</small>
        </div>
        <div className="post-actions">
          <div className="post-actions-inner-container">
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
              <span onClick={commentBtnHandler}>
                <CommentIcon />
              </span>
              <span>{comments.length}</span>
            </div>
          </div>
          <div className="action">
            {isBookmarked ? (
              <span onClick={removeFromBookmarkHandler}>
                <BookmarkIcon />
              </span>
            ) : (
              <span onClick={addToBookmarkHandler}>
                <BookmarkBorderIcon />
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
