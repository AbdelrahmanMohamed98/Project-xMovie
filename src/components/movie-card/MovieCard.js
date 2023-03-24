import React from "react";
import "./MovieCard.scss";

import { Link } from "react-router-dom";
import Button from "../Button/Button";
import apiConfig from "../../Api/apiConfig";

const cate = {
  movie: "movie",
  tv: "tv",
};
function MovieCard({ item, category }) {
  const bg = apiConfig.w500Image(
    item.poster_path || item.backdrop_path
  );
  const link =
    "/" + cate[category] + "/" + item.id;
  return (
    <Link to={link}>
      <div
        className="movie-card"
        style={{
          backgroundImage: `url(${bg})`,
        }}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
}

export default MovieCard;
