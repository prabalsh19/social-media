import { useEffect, useState } from "react";
import axios from "axios";
import { PostCard } from "../../components/Post/PostCard";
import "./Home.css";
import { Filters } from "../../components/Filters/Filters";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/posts");
      setPosts(response.data.posts);
    })();
  }, []);

  return posts.length === 0 ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Filters />
      <div className="home-container">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
};
