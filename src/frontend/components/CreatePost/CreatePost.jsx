import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useState } from "react";

import { useFeedContext, useLoginContext } from "../../contexts/index";
import { createPostService } from "../../services/services";
import "./CreatePost.css";
import { getBase64 } from "../../utils/helper";

export const CreatePost = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ previewImg: "", caption: "" });
  const { previewImg, caption } = formData;

  const { dispatch } = useFeedContext();
  const {
    userDetails: { fullName },
  } = useLoginContext();

  const fileUploadHandler = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      setFormData((prev) => ({
        ...prev,
        previewImg: base64,
      }));
    });
  };

  const createPostHandler = async (e) => {
    e.preventDefault();
    if (previewImg === "") {
      return alert("Please select an image");
    }

    try {
      const response = await createPostService({
        postImage: previewImg,
        content: caption,
        fullName,
        comments: [],
      });
      dispatch({ type: "UPDATE_FEED", payload: response.data.posts });

      setShowModal(false);
      setFormData({ previewImg: "", caption: "" });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div
        className="overlay"
        onClick={() => setShowModal(false)}
        id={showModal ? "" : "hide"}
      ></div>
      <form onSubmit={createPostHandler}>
        <div className="create-modal" id={showModal ? "" : "hide"}>
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
            Add Image
          </label>

          <textarea
            className="caption-container"
            placeholder="Caption"
            value={caption}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, caption: e.target.value }))
            }
          ></textarea>
          <button className="post-btn">POST</button>
        </div>
      </form>

      <div onClick={() => setShowModal(true)} className="create-btn">
        <AddIcon
          sx={{
            color: "white",
            backgroundColor: "#6648fc",
            borderRadius: "50%",
            padding: "15px",
          }}
        />
      </div>
    </>
  );
};
