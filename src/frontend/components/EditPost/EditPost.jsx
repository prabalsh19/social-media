import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useState } from "react";

import { useFeedContext } from "../../contexts/index";
import { editPostService } from "../../services/services";
import { getBase64 } from "../../utils/helper";

export const EditPost = ({ _id, showEditPostModal, setShowEditPostModal }) => {
  const { state, dispatch } = useFeedContext();

  const selectedPost = state.posts.find((post) => post._id === _id);

  const [formData, setFormData] = useState({
    previewImg: selectedPost.postImage,
    caption: selectedPost.content,
  });
  const { previewImg, caption } = formData;

  const fileUploadHandler = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      setFormData((prev) => ({ ...prev, previewImg: base64 }));
    });
    e.target.value = "";
  };

  const editPostHandler = async (e) => {
    e.preventDefault();
    if (previewImg === "") {
      return alert("Please select an image");
    }

    try {
      const response = await editPostService(_id, {
        postImage: previewImg,
        content: caption,
      });
      dispatch({ type: "UPDATE_FEED", payload: response.data.posts });
      setShowEditPostModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div
        className="overlay"
        onClick={() => setShowEditPostModal(false)}
        id={showEditPostModal ? "" : "hide"}
      ></div>
      <form onSubmit={editPostHandler}>
        <div className="create-modal" id={showEditPostModal ? "" : "hide"}>
          <img className="preview-img" src={previewImg} id="img" alt="" />
          <label className="upload-img-btn">
            <CameraAltIcon
              sx={{
                backgroundColor: "white",
                color: "#6648fc",
                borderRadius: "50%",
                padding: "5px",
              }}
            />
            <input
              type="file"
              accept="image"
              onChange={(e) => fileUploadHandler(e)}
            />
            Change Image
          </label>

          <textarea
            className="caption-container"
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, caption: e.target.value }))
            }
          ></textarea>
          <button className="post-btn">Submit</button>
        </div>
      </form>
    </>
  );
};
