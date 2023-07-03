import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AvatarOptions, FollowSuggestion } from "../../components/index";
import { useLoginContext } from "../../contexts/index";
import { editUserService } from "../../services/services";
import "./Welcome.css";

export const Welcome = () => {
  const { userDetails, setUserDetails } = useLoginContext();
  const [previewAvatar, setPreviewAvatar] = useState();

  const navigate = useNavigate();

  const getStartedHandler = async () => {
    try {
      const response = await editUserService({
        avatar: previewAvatar,
      });
      setUserDetails(response.data.user);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="welcome-container">
      <h1>Welcome, Just Few Steps To Go...</h1>
      <div>
        <span id="choose-avatar">
          Choose your favourite avatar
          <AvatarOptions
            setFormData={setUserDetails}
            setPreviewAvatar={setPreviewAvatar}
          />
        </span>
      </div>
      {previewAvatar && (
        <div className="avatar-preview">
          <b>Your Avatar</b>
          <img src={previewAvatar} className="profile-avatar" alt="" />
        </div>
      )}
      <span id="choose-avatar">Last Step Follow Atleast 3 People</span>
      <FollowSuggestion />

      <button
        disabled={userDetails.following.length < 3 || !previewAvatar}
        className="get-started-btn"
        onClick={getStartedHandler}
      >
        Get Started
      </button>
    </div>
  );
};
