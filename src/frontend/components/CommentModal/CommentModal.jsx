import { useFeedContext } from "../../contexts/index";
import "./CommentModal.css";

export const CommentModal = ({ _id, setShowCommentModal }) => {
  const {
    state: { posts },
  } = useFeedContext();

  const selectedPost = posts.find((post) => post._id === _id);
  const { comments } = selectedPost || true;

  return (
    selectedPost._id && (
      <>
        <div
          className="overlay"
          onClick={() => setShowCommentModal(false)}
        ></div>
        <div className="comment-modal">
          <b className="comment-heading">Comments</b>
          {comments.length > 0 ? (
            comments.map(({ _id, profileAvatar, comment }) => (
              <div key={_id} className="comment">
                <img
                  className="profile-avatar"
                  src={profileAvatar}
                  alt="profile avatar"
                />
                <p className="comment__content">{comment}</p>
              </div>
            ))
          ) : (
            <>
              <p className="comment__content">No comments yet!</p>
            </>
          )}
        </div>
      </>
    )
  );
};
