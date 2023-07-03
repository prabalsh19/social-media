import {
  PostCard,
  Filters,
  CreatePost,
  FollowSuggestion,
} from "../../components/index";
import { useFeedContext } from "../../contexts/index";
import "./Home.css";

export const Home = () => {
  const { sortedPost: posts } = useFeedContext();

  return (
    <div className="outlet-container">
      <Filters />
      <div className="home-container">
        <CreatePost />
        <FollowSuggestion />
        {posts.length === 0 ? (
          <h1>No Posts</h1>
        ) : (
          posts.map((post) => <PostCard key={post._id} {...post} />)
        )}
      </div>
    </div>
  );
};
