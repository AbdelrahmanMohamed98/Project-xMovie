import React from "react";
import requests from "../../Api/Requests";
import Banner from "../../components/Banner/Banner";
import "./HomeScreen.css";
import Navbar from "../../components/Navbar/Navbar";
import Row from "../../components/Row/Row";
import Hero from "../../components/Hero-slide/Hero";
import { Link } from "react-router-dom";
import { OutlineButton } from "../../components/Button/Button";
import MovieList from "../../components/movie-list/MovieList";
import tmdbApi from "../../Api/Requests";

function HomeScreen() {
  return (
    <>
      <Hero />
      <div className="continer">
        <div className="section mb-3">
          <div className="section_header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MovieList
            fetchUrl={
              tmdbApi.movies.getPopularList
            }
          />
        </div>

        <div className="section mb-3">
          <div className="section_header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MovieList
            fetchUrl={
              tmdbApi.movies.getTop_ratedList
            }
          />
        </div>

        <div className="section mb-3">
          <div className="section_header mb-2">
            <h2>Trending TV Series</h2>
            <Link to="/movie">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MovieList
            fetchUrl={tmdbApi.tv.getPopularList}
          />
        </div>

        <div className="section mb-3">
          <div className="section_header mb-2">
            <h2>Top Rated TV Series</h2>
            <Link to="/movie">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MovieList
            fetchUrl={tmdbApi.tv.getTop_ratedList}
          />
        </div>
      </div>
    </>
    // <div className="homeScreen">
    //   <Navbar />
    //   <Banner />
    //   <Row
    //     title="Netflix Originals"
    //     fetchUrl={requests.fetchNetflixOriginals}
    //     isLargeRow
    //   />
    //   <Row
    //     title="Trending Now"
    //     fetchUrl={requests.fetchTrending}
    //   />
    //   <Row
    //     title="Top Rated"
    //     fetchUrl={requests.fetchTopRated}
    //   />
    //   <Row
    //     title="Action Movies"
    //     fetchUrl={requests.fetchActionMovies}
    //   />
    //   <Row
    //     title="Comedy Movies"
    //     fetchUrl={requests.fetchComedyMovies}
    //   />
    //   <Row
    //     title="Horror Movies"
    //     fetchUrl={requests.fetchHorrorMovies}
    //   />
    //   <Row
    //     title="Romance Movies"
    //     fetchUrl={requests.fetchRomanceMovies}
    //   />
    //   <Row
    //     title="Documentaries"
    //     fetchUrl={requests.fetchDocumentaries}
    //   />
    // </div>
  );
}

export default HomeScreen;
