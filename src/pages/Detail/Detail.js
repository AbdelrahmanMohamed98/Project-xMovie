import React, {
  useEffect,
  useState,
} from "react";
import "./detail.scss";
import { useParams } from "react-router-dom";
import tmdbApi from "../../Api/Requests";
import axios from "../../Api/axios";
import apiConfig from "../../Api/apiConfig";
import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from "../../components/movie-list/MovieList";
function Detail() {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  useEffect(() => {
    const getDetail = async () => {
      var response = null;
      if (category === "movie") {
        response = await axios.get(
          tmdbApi.movies.getDetail({ id: id })
        );
      } else {
        response = await axios.get(
          tmdbApi.tv.getDetail({ id: id })
        );
      }
      setItem(response.data);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path ||
                  item.poster_path
              )})`,
            }}></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path ||
                      item.backdrop_path
                  )})`,
                }}></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">
                {item.title || item.name}
              </h1>
              <div className="genres">
                {item.genres &&
                  item.genres
                    .slice(0, 5)
                    .map((genre, i) => (
                      <span
                        className="genres__item"
                        key={i}>
                        {genre.name}
                      </span>
                    ))}
              </div>
              <p className="overview">
                {item.overview}
              </p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>
          <div className="section mb-3">
            <VideoList id={item.id} />
          </div>
          <div className="section mb-3">
            <div className="section__header mb-2">
              <h2>Similar</h2>
            </div>
            {category === "movie" ? (
              <MovieList
                fetchUrl={tmdbApi.movies.getSimilar(
                  { id: id }
                )}
              />
            ) : (
              <MovieList
                fetchUrl={tmdbApi.tv.getSimilar({
                  id: id,
                })}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Detail;
