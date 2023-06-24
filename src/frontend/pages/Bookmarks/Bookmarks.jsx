import { useEffect } from "react";
import "./Bookmarks.css";
import axios from "axios";
import { useLoginContext } from "../../contexts/LoginContext/loginContext";
import { PostCard } from "../../components/Post/PostCard";

export const Bookmarks = () => {
  const { bookmarks, setBookmarks } = useLoginContext();

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
      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <PostCard key={bookmark._id} {...bookmark} />
        ))
      ) : (
        <h1>No bookmarks yet!</h1>
      )}
    </div>
  );
};
