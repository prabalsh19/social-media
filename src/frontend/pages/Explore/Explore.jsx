import { PostCard } from "../../components/Post/PostCard";
import { useFeedContext } from "../../contexts/FeedContext/feedContext";
import "./Explore.css";
export const Explore = () => {
  const {
    state: { posts },
  } = useFeedContext();

  return (
    <div className="explore-container">
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  );
};
