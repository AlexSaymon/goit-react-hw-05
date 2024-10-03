import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchTrendingMovies } from "../../services/api";
import SearchBar from "../../components/SearchBar/SearchBar";
import { toast, ToastContainer } from "react-toast";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleMovies, setVisibleMovies] = useState(false);

  const query = searchParams.get("query") ?? "";

  const filteredData = useMemo(
    () =>
      movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase())),
    [query, movies]
  );

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);

      if (filteredData.length < 1 && query !== "") {
        toast.error("No results found");
      }
    };

    getData();
  }, [filteredData.length, query]);

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      return searchParams({});
    }
    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
    setVisibleMovies(true);
  };

  return (
    <div>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {visibleMovies && (
        <ul style={{ listStyleType: "none" }}>
          {filteredData.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
      <ToastContainer />
    </div>
  );
};

export default MoviesPage;
