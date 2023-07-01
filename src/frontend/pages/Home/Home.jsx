import { PostCard } from "../../components/Post/PostCard";
import "./Home.css";
import { Filters } from "../../components/Filters/Filters";
import { useFeedContext } from "../../contexts/FeedContext/feedContext";
import { CreatePost } from "../../components/CreatePost/CreatePost";
import { FollowSuggestion } from "../../components/FollowSuggestion/FollowSuggestion";

export const Home = () => {
  const { sortedPost: posts } = useFeedContext();

  return posts.length === 0 ? (
    <>
      <h1>No Posts</h1>
    </>
  ) : (
    <>
      <div className="outlet-container">
        <Filters />
        <div className="home-container">
          <CreatePost />
          <FollowSuggestion />
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </>
  );
};
