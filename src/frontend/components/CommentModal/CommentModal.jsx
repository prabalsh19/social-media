import { useEffect, useState } from "react";
import { useFeedContext } from "../../contexts/index";
import "./CommentModal.css";
// import { useLoginContext } from "../../contexts/LoginContext/loginContext";
export const CommentModal = ({ _id, setShowCommentModal }) => {
  const [selectedPost, setSelectedPost] = useState({});
  const { comments } = selectedPost || {};
  const {
    state: { posts },
  } = useFeedContext();
  //   const { userDetails } = useLoginContext();
  //   const { fullName } = userDetails;
  useEffect(() => {
    setSelectedPost(() => posts.find((post) => post._id === _id));
  }, [posts, _id]);

  return (
    selectedPost._id && (
      <>
        <div
          className="overlay"
          onClick={() => setShowCommentModal(false)}
        ></div>
        <div className="comment-modal">
          {/* <div className="comment-input-container">
            <img
              className="profile-avatar"
              src={`https://source.unsplash.com/random/?avatar,${fullName}`}
              alt=""
            />
            <div className="comment-input">
              <input placeholder="Write a comment" />
              <button>Post</button>
            </div>
          </div> */}

          <b className="comment-heading">Comments</b>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="comment">
                <img
                  className="profile-avatar"
                  src={comment.profileAvatar}
                  alt=""
                />
                <p className="comment__content">{comment.comment}</p>
              </div>
            ))
          ) : (
            <>
              <p className="comment__content">No comments yet!</p>
              {/* <p className="comment__content">Be the first to comment.</p> */}
            </>
          )}
        </div>
      </>
    )
  );
};
