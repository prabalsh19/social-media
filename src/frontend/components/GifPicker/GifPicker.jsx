import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./GifPicker.css";

export const GifPicker = ({ setFormData, setShowGifSelector }) => {
  const [gifs, setGifs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const search_url =
    "https://tenor.googleapis.com/v2/search?q=" +
    searchQuery +
    "&key=" +
    process.env.REACT_APP_Tenor_API_KEY +
    "&client_key=" +
    process.env.REACT_APP_clientkey +
    "&limit=" +
    process.env.REACT_APP_lmt;

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery !== "") {
        try {
          const response = await fetch(search_url);
          const result = await response.json();
          setGifs(result.results);
          console.log(result);
        } catch (e) {
          console.error(e);
        }
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, search_url]);
  const uploadGifHandler = (gif) => {
    setFormData((prev) => ({ ...prev, previewImg: gif }));
  };
  return (
    <div className="gif-picker">
      <span onClick={() => setShowGifSelector(false)} className="close-btn">
        <CloseIcon />
      </span>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {gifs.length > 0 && searchQuery !== "" ? (
        <div className="gifs-container">
          {gifs.map((gif) => (
            <img
              className="gif"
              src={gif.media_formats.nanogif.url}
              alt="gif"
              onClick={() => uploadGifHandler(gif.media_formats.gif.url)}
            />
          ))}
        </div>
      ) : (
        <h3 className="align-center">Search For Gifs</h3>
      )}
    </div>
  );
};
