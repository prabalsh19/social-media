import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./CreatePost.css";
import { useState } from "react";

export const CreatePost = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ caption: "" });
  const fileUploadHandler = (e) => {
    const file = e.target.files[0];
    getBase64(file)
      .then((base64) => {
        setFormData((prev) => ({ ...prev, img: JSON.stringify(base64) }));
        localStorage.setItem("fileBase64", base64);
      })
      .then(() => {
        let dataImage = localStorage.getItem("fileBase64");
        let previewImg = document.getElementById("img");
        previewImg.src = dataImage;
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
  // const createPostHandler = async (e) => {
  //   e.preventDefault();
  //   const img = localStorage.getItem("fileBase64");
  //   const response = await axios.post(
  //     "/api/posts",
  //     {
  //       headers: {
  //         authorization: auth,
  //       },
  //     },
  //     {
  //       postData: { img },
  //     }
  //   );
  //   console.log(response);
  // };
  return (
    <>
      <div
        className="overlay"
        onClick={() => setShowModal(false)}
        id={showModal ? "" : "hide"}
      ></div>
      <form>
        <div className="create-modal" id={showModal ? "" : "hide"}>
          <img className="preview-img" id="img" alt="" />
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
