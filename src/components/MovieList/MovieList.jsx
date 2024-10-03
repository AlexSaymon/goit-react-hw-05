import { useState } from "react";
import { useEffect } from "react";
import { fetchTrendingMovies } from "../../services/api";
import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const getData = async () => {
      const data = await fetchTrendingMovies();
      setTrendingMovies(data);
    };
    getData();
  }, []);

  return (
    <div>
      <ul className={s.list}>
        {trendingMovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
