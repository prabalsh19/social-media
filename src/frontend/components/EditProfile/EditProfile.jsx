import axios from "axios";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import "./EditProfile.css";
import { useState } from "react";
import { AvatarOptions } from "../AvatarOptions/AvatarOptions";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { defaultProfile } from "../../utils/constants";
export const EditProfile = ({ setShowEditProfileModal }) => {
  const { userDetails, setUserDetails } = useLoginContext();
  const [previewAvatar, setPreviewAvatar] = useState(
    userDetails.avatar || defaultProfile
  );
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
    const encodedToken = localStorage.getItem("encodedToken");
    try {
      const response = await axios.post(
        "/api/users/edit",
        {
          userData: formData,
        },
        {
          headers: { authorization: encodedToken },
        }
      );

      setUserDetails(response.data.user);
      setShowEditProfileModal(false);
    } catch (e) {
      console.error(e);
    }
  };
  const fileUploadHandler = (e) => {
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      localStorage.setItem("avatar", base64);
      setFormData((prev) => ({ ...prev, avatar: base64 }));
      setPreviewAvatar(base64);
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
              <img className="profile-avatar" src={previewAvatar} alt="" />

              <label name="update-avatar">
                <AddToPhotosIcon
                  sx={{ color: "var(--secondary-color)", cursor: "pointer" }}
                />
                <input
                  name="update-avatar"
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
                    setPreviewAvatar={setPreviewAvatar}
                  />
                )}
              </span>
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
