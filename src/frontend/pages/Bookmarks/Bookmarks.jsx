import { useEffect } from "react";
import "./Bookmarks.css";
import axios from "axios";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import { PostCard } from "../../components/Post/PostCard";
import { useFeedContext } from "../../contexts/FeedContext/feedContext";

export const Bookmarks = () => {
  const { bookmarks, setBookmarks } = useLoginContext();
  const {
    state: { posts },
  } = useFeedContext();
  const bookmarksList = posts.filter((post) =>
    bookmarks.some((id) => id === post._id)
  );

  useEffect(() => {
    const encodedToken = localStorage.getItem("encodedToken");
    try {
      (async () => {
        const response = await axios.get("/api/users/bookmark/", {
          headers: { authorization: encodedToken },
        });
        setBookmarks(response.data.bookmarks);
      })();
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bookmarks-container">
      {bookmarksList.length > 0 ? (
        bookmarksList.map((bookmark) => (
          <PostCard key={bookmark._id} {...bookmark} />
        ))
      ) : (
        <h1>No bookmarks yet!</h1>
      )}
    </div>
  );
};
