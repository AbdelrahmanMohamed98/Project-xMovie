import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import "./MovieGrid.scss";
import MovieCard from "../movie-card/MovieCard";
import {
  useHistory,
  useParams,
} from "react-router-dom";
import axios from "../../Api/axios";
import tmdbApi from "../../Api/Requests";
import Button, {
  OutlineButton,
} from "../Button/Button";
import Input from "../Input/Input";

function MovieGrid({ category }) {
  const [item, setItem] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { keyword } = useParams();
  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        if (category === "movie") {
          response = await axios.get(
            tmdbApi.movies.getUpcomingList,
            { params: {} }
          );
        } else {
          response = await axios.get(
            tmdbApi.tv.getOn_the_airList,
            { params: {} }
          );
        }
      } else {
        if (category === "movie") {
          response = await axios.get(
            tmdbApi.movies.getSearch,
            { params: { query: keyword } }
          );
        } else {
          response = await axios.get(
            tmdbApi.tv.getSearch,
            { params: { query: keyword } }
          );
        }
      }
      setItem(response.data.results);
      setTotalPage(response.data.total_pages);
    };
    getList();
  }, [category, keyword]);

  const loadMore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = { page: page + 1 };
      if (category === "movie") {
        response = await axios.get(
          tmdbApi.movies.getUpcomingList,
          { params: params }
        );
      } else {
        response = await axios.get(
          tmdbApi.tv.getPopularList,
          { params: params }
        );
      }
    } else {
      if (category === "movie") {
        response = await axios.get(
          tmdbApi.movies.getSearch,
          { params: { query: keyword } }
        );
      } else {
        response = await axios.get(
          tmdbApi.tv.getSearch,
          { params: { query: keyword } }
        );
      }
    }

    setItem([...item, ...response.data.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch
          category={category}
          keyword={keyword}
        />
      </div>
      <div className="movie-grid">
        {item.map((item, i) => (
          <MovieCard
            category={category}
            item={item}
            key={i}
          />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton
            className="small"
            onClick={loadMore}>
            Load More
          </OutlineButton>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

const MovieSearch = ({ category }) => {
  //to do
  const history = useHistory();
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(
      `/${category}/search/${keyword}`
    );
  };

  return (
    <div className="movie-search">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter Keyword"
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
        />
        <Button
          className="small"
          onClick={handleSubmit}>
          Search
        </Button>
      </form>
    </div>
  );
};

export default MovieGrid;
