import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./CreatePost.css";
import { useState } from "react";
import axios from "axios";
import { useFeedContext } from "../../contexts/FeedContext/feedContext";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";

export const CreatePost = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ caption: "" });
  const [previewImg, setPreviewImg] = useState("");
  const { dispatch } = useFeedContext();
  const { userDetails } = useLoginContext();
  const fileUploadHandler = (e) => {
    const file = e.target.files[0];
    getBase64(file)
      .then((base64) => {
        setFormData((prev) => ({ ...prev, img: JSON.stringify(base64) }));
        localStorage.setItem("fileBase64", base64);
      })
      .then(() => {
        let dataImage = localStorage.getItem("fileBase64");
        // let previewImg = document.getElementById("img");
        // previewImg.src = dataImage;
        setPreviewImg(dataImage);
      });
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  const createPostHandler = async (e) => {
    e.preventDefault();
    if (previewImg === "") {
      alert("Please select an image");
      return;
    }
    const encodedToken = localStorage.getItem("encodedToken");
    const img = localStorage.getItem("fileBase64");
    const response = await axios.post(
      "/api/posts",
      {
        postData: {
          postImage: img,
          content: formData.caption,
          fullName: userDetails.fullName,
          comments: [],
        },
      },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    dispatch({ type: "UPDATE_FEED", payload: response.data.posts });

    setShowModal(false);
    localStorage.removeItem("fileBase64");
    setPreviewImg("");
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
          <input
            className="caption-container"
            type="text"
            placeholder="Caption"
            value={formData.caption}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, caption: e.target.value }))
            }
          />
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
