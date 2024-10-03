import MovieList from "../../components/MovieList/MovieList";

import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div>
      <h2 className={s.header}>Trending today</h2>
      <MovieList />
    </div>
  );
};

export default HomePage;
