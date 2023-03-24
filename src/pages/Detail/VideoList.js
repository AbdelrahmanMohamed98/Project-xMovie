import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../Api/Requests";
import axios from "../../Api/axios";

function VideoList({ id }) {
  const { category } = useParams();
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const getVideo = async () => {
      var response = null;
      if (category === "movie") {
        response = await axios.get(
          tmdbApi.movies.getVideos({ id: id })
        );
      } else {
        response = await axios.get(
          tmdbApi.tv.getVideos({ id: id })
        );
      }
      setVideo(response.data.results.slice(0, 5));
    };
    getVideo();
  }, [category, id]);

  return (
    <>
      {video.map((item, i) => (
        <Video key={i} item={item} />
      ))}
    </>
  );
}

const Video = ({ item }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const height =
      (iframeRef.current.offsetWidth * 9) / 16 +
      "px";
    iframeRef.current.setAttribute(
      "height",
      height
    );
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        title="video"
        width="100%"></iframe>
    </div>
  );
};

export default VideoList;
