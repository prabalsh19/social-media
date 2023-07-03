import { useFeedContext } from "../../contexts/index";
import { deletePostService } from "../../services/services";
import "./PostMenuOptions.css";

export const PostMenuOptions = ({ _id, setShowEditPostModal }) => {
  const { dispatch } = useFeedContext();

  const deletePostHandler = async (_id) => {
    try {
      const response = await deletePostService(_id);
      dispatch({ type: "UPDATE_FEED", payload: response.data.posts });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="menu-options">
      <span onClick={() => setShowEditPostModal(true)}>Edit</span>
      <span onClick={() => deletePostHandler(_id)}>Delete</span>
    </div>
  );
};
