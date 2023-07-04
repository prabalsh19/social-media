import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AvatarOptions, FollowSuggestion } from "../../components/index";
import { useLoginContext } from "../../contexts/index";
import { editUserService } from "../../services/services";
import "./Welcome.css";

export const Welcome = () => {
  const { userDetails, setUserDetails } = useLoginContext();
  const [preview, setPreview] = useState({ avatar: "" });

  const navigate = useNavigate();

  const getStartedHandler = async () => {
    try {
      const response = await editUserService({
        avatar: preview.avatar,
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
          <AvatarOptions setFormData={setUserDetails} setPreview={setPreview} />
        </span>
      </div>
      {preview.avatar && (
        <div className="avatar-preview">
          <b>Your Avatar</b>
          <img src={preview.avatar} className="profile-avatar" alt="" />
        </div>
      )}
      <span id="choose-avatar">Last Step Follow Atleast 3 People</span>
      <FollowSuggestion />

      <button
        disabled={userDetails.following.length < 3 || !preview.avatar}
        className="get-started-btn"
        onClick={getStartedHandler}
      >
        Get Started
      </button>
    </div>
  );
};
