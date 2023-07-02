import axios from "axios";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import "./PostMenuOptions.css";
import { useFeedContext } from "../../contexts/FeedContext/feedContext";
export const PostMenuOptions = ({ _id, setShowEditPostModal, username }) => {
  const { userDetails, setUserDetails } = useLoginContext();
  const { dispatch } = useFeedContext();
  const deletePostHandler = async (_id) => {
    const encodedToken = localStorage.getItem("encodedToken");
    try {
      const response = await axios.delete(`/api/posts/${_id}`, {
        headers: { authorization: encodedToken },
      });

      dispatch({ type: "UPDATE_FEED", payload: response.data.posts });
    } catch (e) {
      console.error(e);
    }
  };
  const userDoesFollow = userDetails.following.some(
    (following) => following.username === username
  );
  const unfollowHandler = async (_id) => {
    const encodedToken = localStorage.getItem("encodedToken");

    try {
      const response = await axios.post(
        `/api/users/unfollow/${_id}`,
        {},
        {
          headers: { authorization: encodedToken },
        }
      );

      setUserDetails(response.data.user);
    } catch (e) {
      console.error(e);
    }
  };
  const followHandler = async (_id) => {
    const encodedToken = localStorage.getItem("encodedToken");
    try {
      const response = await axios.post(
        `/api/users/follow/${_id}`,
        {},
        {
          headers: { authorization: encodedToken },
        }
      );
      setUserDetails(response.data.user);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="menu-options">
      {userDetails.username === username ? (
        <>
          <span onClick={() => setShowEditPostModal(true)}>Edit</span>
          <span onClick={() => deletePostHandler(_id)}>Delete</span>
        </>
      ) : userDoesFollow ? (
        <span onClick={() => unfollowHandler(_id)}>Unfollow</span>
      ) : (
        <span onClick={() => followHandler(_id)}>Follow</span>
      )}
    </div>
  );
};
