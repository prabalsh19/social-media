import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import "./PostMenuOptions.css";
export const PostMenuOptions = ({ setShowEditPostModal, username }) => {
  const { userDetails } = useLoginContext();

  return (
    <div className="menu-options">
      {userDetails.username === username ? (
        <>
          <span onClick={() => setShowEditPostModal(true)}>Edit</span>
          <span>Delete</span>
        </>
      ) : (
        <span>Unfollow</span>
      )}
    </div>
  );
};
