import React, {
  useEffect,
  useState,
} from "react";
import "./MovieList.scss";
import {
  SwiperSlide,
  Swiper,
} from "swiper/react";
import axios from "../../Api/axios";
import MovieCard from "../movie-card/MovieCard";

function MovieList({ fetchUrl }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setItems(request.data.results);
        return request;
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [fetchUrl]);

  var category = null;
  if (fetchUrl.includes("movie")) {
    category = "movie";
  } else {
    category = "tv";
  }
  return (
    <div className="movie-list">
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={"auto"}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard
              item={item}
              category={category}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MovieList;

// useEffect(() => {
//   const getList = async () => {
//     let response = null;
//     if (type !== "similar") {
//       switch (category) {
//         case movie:
//           response = await axios.get(
//             tmdbApi.movies.getPopularList,
//             { params: {} }
//           );
//           break;

//         default:
//           response = await axios.get(
//             tmdbApi.tv.getPopularList,
//             { params: {} }
//           );
//       }
//     } else {
//       response = await axios.get(
//         tmdbApi.movies.getSimilar({ id }),
//         tmdbApi.tv.getSimilar({ id })
//       );
//     }
//     setItems(response.data.results);
//   };
//   getList();
// }, []);
