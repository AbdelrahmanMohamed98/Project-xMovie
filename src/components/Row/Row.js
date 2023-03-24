import axios from "../../Api/axios";
import React, {
  useEffect,
  useState,
} from "react";
import "./Row.css";

function Row({
  title,
  fetchUrl,
  isLargeRow = false,
}) {
  const [movies, setMovies] = useState([]);
  const baseUrl =
    "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        return request;
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="rowPosters">
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              className="rowPoster"
              key={movie.id}
              src={`${baseUrl}${movie.poster_path}`}
              alt={
                movie?.name ||
                movie?.title ||
                movie?.original_name
              }
            />
            <p className="rowTitle">
              {movie?.name ||
                movie?.title ||
                movie?.original_name}
            </p>
            <p className="rowDate">
              {new Date(
                movie?.release_date ||
                  movie?.first_air_date
              ).toLocaleString("default", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
