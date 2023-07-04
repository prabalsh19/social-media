import { useState } from "react";
import "./GifPicker.css";
export const GifPicker = () => {
  const [gifs, setGifs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const search_term = "hello";
  const apikey = "AIzaSyB5c9awNzcCdbCv1vzmVN3OlV0opqsMCHU";
  const clientkey = "socials";
  const lmt = 8;
  const search_url =
    "https://tenor.googleapis.com/v2/search?q=" +
    search_term +
    "&key=" +
    apikey +
    "&client_key=" +
    clientkey +
    "&limit=" +
    lmt;
  return (
    <div className="gif-picker">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
