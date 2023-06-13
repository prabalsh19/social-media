import { PostCard } from "../../components/Post/PostCard";
import "./Home.css";
import { Filters } from "../../components/Filters/Filters";
import { useFeedContext } from "../../contexts/FeedContext/feedContext";
import { CreatePost } from "../../components/CreatePost/CreatePost";

export const Home = () => {
  const { sortedPost: posts } = useFeedContext();

  return posts.length === 0 ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Filters />
      <div className="home-container">
        <CreatePost />
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
};
