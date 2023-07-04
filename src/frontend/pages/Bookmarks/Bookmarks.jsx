import "./Bookmarks.css";
import { useFeedContext, useLoginContext } from "../../contexts/index";

import { PostCard } from "../../components/index";

export const Bookmarks = () => {
  const { bookmarks: bookmarksList } = useLoginContext();
  const {
    state: { posts },
  } = useFeedContext();
  const bookmarks = posts.filter((post) =>
    bookmarksList.some((bookmark) => bookmark._id === post._id)
  );
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
