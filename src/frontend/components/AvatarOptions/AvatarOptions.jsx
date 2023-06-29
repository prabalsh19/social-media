import "./AvatarOptions.css";

const avatarImg = [
  "https://images.unsplash.com/photo-1636041282858-351171ff944c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXZhdGFyLEV0aGFufHx8fHx8MTY4NzgwMjM1OQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  "https://images.unsplash.com/photo-1561031454-4f1331bd2a34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXZhdGFyLEV0aGFufHx8fHx8MTY4NzgwMjM4OQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",

  "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXZhdGFyLEFyaWF8fHx8fHwxNjg3ODAyNDA3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",

  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXZhdGFyLE9saXZlcnx8fHx8fDE2ODc4MDI0MzU&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",

  "https://images.unsplash.com/photo-1594616838951-c155f8d978a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXZhdGFyLFNvcGhpZXx8fHx8fDE2ODc4MDI0NTE&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
];
export const AvatarOptions = ({
  setShowAvatarOptions,
  setFormData,
  setPreviewAvatar,
}) => {
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
  const setAvatar = (avatar) => {
    localStorage.setItem("avatar", avatar);
    setFormData((prev) => ({ ...prev, avatar: avatar }));
    setPreviewAvatar(avatar);
    setShowAvatarOptions(false);
  };

  return (
    <>
      <div className="avatar-options">
        <label name="update-avatar">
          <input
            name="update-avatar"
            type="file"
            accept="image"
            onChange={(e) => fileUploadHandler(e)}
          />
        </label>
      </div>
    </>
  );
};
