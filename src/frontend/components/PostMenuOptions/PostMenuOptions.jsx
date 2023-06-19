import axios from "axios";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import "./PostMenuOptions.css";
import { useFeedContext } from "../../contexts/FeedContext/feedContext";
export const PostMenuOptions = ({ _id, setShowEditPostModal, username }) => {
  const { userDetails } = useLoginContext();
  const { dispatch } = useFeedContext();
  const deletePostHandler = async (_id) => {
    const encodedToken = localStorage.getItem("encodedToken");
    const response = await axios.delete(`/api/posts/${_id}`, {
      headers: { authorization: encodedToken },
    });

    dispatch({ type: "UPDATE_FEED", payload: response.data.posts });
  };
  return (
    <div className="menu-options">
      {userDetails.username === username ? (
        <>
          <span onClick={() => setShowEditPostModal(true)}>Edit</span>
          <span onClick={() => deletePostHandler(_id)}>Delete</span>
        </>
      ) : (
        <span>Unfollow</span>
      )}
    </div>
  );
};
