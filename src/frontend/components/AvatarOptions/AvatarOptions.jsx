import "./AvatarOptions.css";

const avatarImg = [
  "https://images.unsplash.com/photo-1636041282858-351171ff944c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXZhdGFyLEV0aGFufHx8fHx8MTY4NzgwMjM1OQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  "https://images.unsplash.com/photo-1561031454-4f1331bd2a34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXZhdGFyLEV0aGFufHx8fHx8MTY4NzgwMjM4OQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",

  "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXZhdGFyLEFyaWF8fHx8fHwxNjg3ODAyNDA3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",

  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXZhdGFyLE9saXZlcnx8fHx8fDE2ODc4MDI0MzU&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",

  "https://images.unsplash.com/photo-1594616838951-c155f8d978a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXZhdGFyLFNvcGhpZXx8fHx8fDE2ODc4MDI0NTE&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",

  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
];
export const AvatarOptions = ({ setFormData, setPreview }) => {
  const setAvatar = (avatar) => {
    setFormData((prev) => ({ ...prev, avatar: avatar }));
    setPreview((prev) => ({ ...prev, avatar }));
  };

  return (
    <>
      <div className="avatar-options">
        {avatarImg.map((avatar, index) => (
          <img
            key={index}
            className="profile-avatar avatar_options_avatar"
            alt="avatar"
            src={avatar}
            onClick={() => setAvatar(avatar)}
          />
        ))}
      </div>
    </>
  );
};
