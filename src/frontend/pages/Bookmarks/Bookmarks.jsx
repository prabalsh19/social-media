import "./Bookmarks.css";
import { useLoginContext } from "../../contexts/index";

import { PostCard } from "../../components/index";

export const Bookmarks = () => {
  const {
    userDetails: { bookmarks },
  } = useLoginContext();

  return (
    <>
      {bookmarks.length > 0 ? (
        <div className="bookmarks-container outlet-container">
          <h2>Bookmarks</h2>
          {bookmarks.map((bookmark) => (
            <PostCard key={bookmark._id} {...bookmark} />
          ))}
        </div>
      ) : (
        <div className="bookmarks-container outlet-container">
          <h2>No bookmarks yet!</h2>
        </div>
      )}
    </>
  );
};
