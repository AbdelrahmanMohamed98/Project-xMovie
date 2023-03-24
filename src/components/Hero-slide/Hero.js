import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import "./Hero.scss";
import tmdbApi from "../../Api/Requests";
import axios from "../../Api/axios";
import {
  Swiper,
  SwiperSlide,
} from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import apiConfig from "../../Api/apiConfig";
import { useHistory } from "react-router-dom";
import Button, {
  OutlineButton,
} from "../Button/Button";
import Modal, {
  ModalContent,
} from "../Modal/Modal";
function Hero() {
  const [movieItems, setMovieItems] = useState(
    []
  );
  SwiperCore.use([Autoplay]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          tmdbApi.movies.getPopularList,
          { params: { page: 1 } }
        );
        setMovieItems(
          response.data.results.slice(0, 4)
        );
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  return (
    <div className="Hero">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}>
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${
                  isActive ? "active" : ""
                }`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  );
}

const HeroSlideItem = ({ item, className }) => {
  let history = useHistory();
  const background = apiConfig.originalImage(
    item.backdrop_path
      ? item.backdrop_path
      : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(
      `#modal_${item.id}`
    );
    const videos = await axios.get(
      tmdbApi.movies.getVideos({ id: item.id })
    );
    if (videos.data.results.length > 0) {
      const videoSrc =
        "https://www.youtube.com/embed/" +
        videos.data.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videoSrc);
    } else {
      modal.querySelector(
        ".modal__content > iframe"
      ).innerHTML = "No Trailer";
    }

    modal.classList.toggle("active");
  };
  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{
        backgroundImage: `url(${background})`,
      }}>
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">
            {item.overview}
          </div>
          <div className="btns">
            <Button
              onClick={() =>
                history.push("/movie/" + item.id)
              }>
              Watch Now
            </Button>
            <OutlineButton
              onClick={setModalActive}>
              Watch Trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img
            src={apiConfig.w500Image(
              item.poster_path
            )}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ item }) => {
  const iframeRef = useRef(null);
  const onClose = () =>
    iframeRef.current.setAttribute("src", "");
  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          title="trailer"></iframe>
      </ModalContent>
    </Modal>
  );
};
export default Hero;
