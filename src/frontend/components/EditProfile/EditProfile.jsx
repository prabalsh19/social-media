import { useLoginContext } from "../../contexts/index";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import "./EditProfile.css";
import { useState } from "react";
import { AvatarOptions } from "../index";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { editUserService } from "../../services/services";
import { getBase64 } from "../../utils/helper";
import { defaultBackdrop } from "../../utils/constants";
export const EditProfile = ({ setShowEditProfileModal }) => {
  const { userDetails, setUserDetails } = useLoginContext();
  const [preview, setPreview] = useState({
    avatar: userDetails.avatar,
    backdrop: userDetails.backdrop,
  });

  const [formData, setFormData] = useState(userDetails);
  const [showAvatars, setShowAvatars] = useState(false);
  const updateBio = (e) => {
    setFormData((prev) => ({ ...prev, bio: e.target.value }));
  };
  const updatePortfolio = (e) => {
    setFormData((prev) => ({ ...prev, portfolio: e.target.value }));
  };
  const editProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await editUserService(formData);

      setUserDetails(response.data.user);
      setShowEditProfileModal(false);
    } catch (e) {
      console.error(e);
    }
  };
  const fileUploadHandler = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: base64 }));

      setPreview((prev) => ({ ...prev, [e.target.name]: base64 }));
    });
  };

  return (
    <>
      <div
        className="overlay"
        onClick={() => setShowEditProfileModal(false)}
      ></div>
      <div className="edit-profile">
        <h2>Edit Profile</h2>
        <form onSubmit={editProfileHandler}>
          <div className="edit-profile-actions">
            <div className="edit-profile-action">
              <label>Avatar</label>
              <img className="profile-avatar" src={preview.avatar} alt="" />

              <label name="update-avatar">
                <AddToPhotosIcon
                  sx={{ color: "var(--secondary-color)", cursor: "pointer" }}
                />
                <input
                  name="avatar"
                  type="file"
                  accept="image"
                  onChange={(e) => fileUploadHandler(e)}
                />
              </label>
              <span
                className="avatar-options-wrapper"
                onClick={() => setShowAvatars((prev) => !prev)}
              >
                <SupervisedUserCircleIcon
                  fontSize="large"
                  sx={{ color: "var(--secondary-color)" }}
                />
                <small>Avatars</small>
                {showAvatars && (
                  <AvatarOptions
                    setFormData={setFormData}
                    setPreview={setPreview}
                  />
                )}
              </span>
            </div>
            <div className="edit-profile-action">
              <label htmlFor="">Backdrop</label>
              <img
                className="profile-avatar"
                src={preview.backdrop || defaultBackdrop}
                alt=""
              />
              <label name="update-avatar">
                <AddToPhotosIcon
                  sx={{ color: "var(--secondary-color)", cursor: "pointer" }}
                />
                <input
                  name="backdrop"
                  type="file"
                  accept="image"
                  onChange={(e) => fileUploadHandler(e)}
                />
              </label>
            </div>
            <div className="edit-profile-action">
              <label>Name</label>
              <span>{userDetails.fullName}</span>
            </div>
            <div className="edit-profile-action">
              <label>Username</label>
              <span>@{userDetails.username}</span>
            </div>
            <div className="edit-profile-action">
              <label>Bio</label>
              <input
                value={formData.bio}
                onChange={(e) => updateBio(e)}
                type="text"
              />
            </div>
            <div className="edit-profile-action">
              <label>Porfolio</label>
              <input
                placeholder="www.example.com"
                value={formData.portfolio}
                onChange={(e) => updatePortfolio(e)}
                type="text"
              />
            </div>
            <button className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};
