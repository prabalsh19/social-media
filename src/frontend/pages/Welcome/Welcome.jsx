import { useState } from "react";
import { AvatarOptions } from "../../components/AvatarOptions/AvatarOptions";
import "./Welcome.css";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import { FollowSuggestion } from "../../components/FollowSuggestion/FollowSuggestion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const Welcome = () => {
  const { userDetails, setUserDetails } = useLoginContext();

  const [previewAvatar, setPreviewAvatar] = useState();
  const navigate = useNavigate();
  const getStartedHandler = async () => {
    const encodedToken = localStorage.getItem("encodedToken");
    try {
      const response = await axios.post(
        "/api/users/edit",
        {
          userData: { ...userDetails, avatar: previewAvatar },
        },
        {
          headers: { authorization: encodedToken },
        }
      );
      console.log(response);
      setUserDetails(response.data.user);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
    navigate("/");
  };
  console.log(previewAvatar);
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
      <span id="choose-avatar">Last Step Follow Few People</span>
      <FollowSuggestion />

      <button
        disabled={userDetails?.following?.length < 3 && !previewAvatar}
        className="get-started-btn"
        onClick={getStartedHandler}
      >
        Get Started
      </button>
    </div>
  );
};
