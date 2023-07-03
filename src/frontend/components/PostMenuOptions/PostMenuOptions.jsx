import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import "./PostMenuOptions.css";
import { useFeedContext } from "../../contexts/FeedContext/feedContext";
import {
  deletePostService,
  followUserService,
  unfollowUserService,
} from "../../services/services";
export const PostMenuOptions = ({ _id, setShowEditPostModal, username }) => {
  const { userDetails, setUserDetails } = useLoginContext();
  const { dispatch } = useFeedContext();
  const deletePostHandler = async (_id) => {
    try {
      const response = await deletePostService(_id);

      dispatch({ type: "UPDATE_FEED", payload: response.data.posts });
    } catch (e) {
      console.error(e);
    }
  };
  const userDoesFollow = userDetails.following.some(
    (following) => following.username === username
  );
  console.log(userDetails);
  const unfollowHandler = async (_id) => {
    try {
      const response = await unfollowUserService(_id);
      console.log(response);
      setUserDetails(response.data.user);
    } catch (e) {
      console.error(e);
    }
  };
  const followHandler = async (_id) => {
    try {
      const response = await followUserService(_id);
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
