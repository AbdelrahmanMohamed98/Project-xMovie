import React, {
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../Api/Requests";
import axios from "../../Api/axios";
import apiConfig from "../../Api/apiConfig";
function CastList({ id }) {
  const { category } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      var response = null;
      if (category === "movie") {
        response = await axios.get(
          tmdbApi.movies.getCredits({ id: id })
        );
      } else {
        response = await axios.get(
          tmdbApi.tv.getCredits({ id: id })
        );
      }
      setCasts(response.data.cast.slice(0, 5));
    };
    getCredits();
  }, [category, id]);

  return (
    <div className="casts">
      {casts.map((item, i) => (
        <div key={i} className="casts__item">
          <div
            className="casts__item__img"
            style={{
              backgroundImage: `url(${apiConfig.w500Image(
                item.profile_path
              )})`,
            }}></div>
          <p className="casts__item__name">
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CastList;
