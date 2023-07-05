import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { useState } from "react";
import { Link } from "react-router-dom";

import "./PostCard.css";
import { useFeedContext, useLoginContext } from "../../contexts/index";
import { CommentModal, EditPost, PostMenuOptions } from "../index";
import {
  addToBookmarkService,
  dislikePostService,
  likePostService,
  removeFromBookmarkService,
} from "../../services/services";
import { formatDate } from "../../utils/helper";

export const PostCard = ({
  _id,
  fullName,
  postImage,
  username,
  content,
  createdAt,
  comments,
  avatar,
  likes: { likeCount, likedBy },
}) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);

  const { dispatch } = useFeedContext();
  const { userDetails, bookmarks, setBookmarks } = useLoginContext();

  const dateStr = formatDate(createdAt);

  const isLiked = likedBy.find(
    (user) => user.username === userDetails.username
  );
  console.log(likedBy);
  const isBookmarked = bookmarks.find((bookmark) => bookmark._id === _id);
  const likeHandler = async (_id) => {
    try {
      const response = await likePostService(_id);

      dispatch({ type: "UPDATE_FEED", payload: response.data.posts });
    } catch (e) {
      console.error(e);
    }
  };
  const dislikeHandler = async (_id) => {
    try {
      const response = await dislikePostService(_id);

      dispatch({ type: "UPDATE_FEED", payload: response.data.posts });
    } catch (e) {
      console.error(e);
    }
  };

  const addToBookmarkHandler = async () => {
    try {
      const response = await addToBookmarkService(_id);

      setBookmarks(response.data.bookmarks);
    } catch (e) {
      console.error(e);
    }
  };
  const removeFromBookmarkHandler = async () => {
    try {
      const response = await removeFromBookmarkService(_id);
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

      <div className="post-card">
        <div className="post-info">
          <div className="post-info-subcontainer">
            <Link to={`/profile/${username}`}>
              <img
                className="profile-avatar"
                src={loggedInUserPost ? userDetails.avatar : avatar}
                alt="profile-avatar"
              />
            </Link>
            <div>
              <p>{fullName}</p>
              <small>@{username}</small>
            </div>
          </div>
          <div className="post-info-subcontainer">
            <small>{dateStr}</small>
            {loggedInUserPost && (
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
            )}
          </div>
        </div>
        <div className="post-text">
          <img className="post-img" src={postImage} alt="post" />
          <small>{content}</small>
        </div>
        <div className="post-actions">
          <div className="post-actions-inner-container">
            <div className="action">
              {isLiked ? (
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
              <span onClick={() => setShowCommentModal(true)}>
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
