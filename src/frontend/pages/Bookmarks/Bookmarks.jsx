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
    <>
      <div className="bookmarks-container outlet-container">
        <h2>Bookmarks</h2>
        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <PostCard key={bookmark._id} {...bookmark} />
          ))
        ) : (
          <div className="bookmarks-container outlet-container">
            <h2>No bookmarks yet!</h2>
          </div>
        )}
      </div>
    </>
  );
};
