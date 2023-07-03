import { useEffect } from "react";
import "./Bookmarks.css";
import { useLoginContext } from "../../contexts/index";

import { getAllBookmarksService } from "../../services/services";
import { PostCard } from "../../components/index";

export const Bookmarks = () => {
  const { bookmarks, setBookmarks } = useLoginContext();

  useEffect(() => {
    try {
      (async () => {
        try {
          const response = await getAllBookmarksService();
          setBookmarks(response.data.bookmarks);
        } catch (e) {
          console.error(e);
        }
      })();
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
