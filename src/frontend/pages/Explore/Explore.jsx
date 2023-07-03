import { PostCard } from "../../components/index";
import { useFeedContext } from "../../contexts/index";
import "./Explore.css";

export const Explore = () => {
  const {
    state: { posts },
  } = useFeedContext();

  return (
    <div className="explore-container outlet-container">
      <h2>Explore</h2>
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  );
};
