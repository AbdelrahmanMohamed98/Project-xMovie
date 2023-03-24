import axios from "../../Api/axios";
import React, {
  useState,
  useEffect,
} from "react";
import "./Banner.css";
import requests from "../../Api/Requests";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        requests.fetchNetflixOriginals
      );
      setMovie(
        request.data.results[
          Math.floor(
            Math.random() *
              request.data.results.length -
              1
          )
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}>
      <div className="bannerContents">
        <h1 className="bannerTitle">
          {movie?.name ||
            movie?.title ||
            movie?.original_name}
        </h1>
        <div className="bannerButtons">
          <button className="bannerButton">
            Play
          </button>
          <button className="bannerButton">
            My List
          </button>
        </div>
        <h1 className="bannerDiscription">
          {movie?.overview}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
