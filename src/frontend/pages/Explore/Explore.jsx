import { useEffect, useState } from "react";
import { PostCard } from "../../components/index";
import { useFeedContext, useLoginContext } from "../../contexts/index";
import ClipLoader from "react-spinners/ClipLoader";
import "./Explore.css";
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop";

export const Explore = () => {
  const {
    state: { posts },
    dispatch,
  } = useFeedContext();

  const { userDetails } = useLoginContext();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const infiniteScrollHandler = () => {
    setShowScrollTop(false);
    const innerHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    if (innerHeight + scrollTop + 1 >= scrollHeight - 20) {
      dispatch({ type: "UPDATE_INFINTIE_POST", payload: userDetails.username });
    }
    if (scrollTop > 8000) {
      setShowScrollTop(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollHandler);
    return () => {
      window.removeEventListener("scroll", infiniteScrollHandler);
      dispatch({ type: "RESET_INFINITE_POST" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="explore-container outlet-container">
      <h2>Explore</h2>
      {showScrollTop && <ScrollToTop />}
      {posts.map((post, index) => (
        <PostCard key={post._id + index} {...post} />
      ))}
      <span className="spinner">
        <ClipLoader aria-label="Loading Spinner" data-testid="loader" />
      </span>
    </div>
  );
};
