import { useDispatch, useSelector } from "react-redux";
import moviesSlice from "../../data/moviesSlice";
import Spinner from "../Spinner";

import Movies from "./Movies";
import MovieVideo from "./Movie/MovieVideo";
import useFetchMoviesOnScroll from "../../hooks/useFetchMoviesOnScroll";

const MovieWrapper = ({ viewTrailer }) => {
  const { page, fetchStatus, movies, totalResults } = useSelector(
    (state) => state.movies
  );
  const dispatch = useDispatch();
  const { setPage } = moviesSlice.actions;

  useFetchMoviesOnScroll(() => {
    dispatch(setPage(page + 1));
  }, fetchStatus !== "loading" && movies.length !== totalResults);

  return (
    <>
      {movies?.length > 0 && (
        <Movies movies={movies} viewTrailer={viewTrailer} />
      )}
      {fetchStatus === "loading" && (
        <div className="movies__loading">
          <Spinner />
        </div>
      )}
      <MovieVideo />
    </>
  );
};

export default MovieWrapper;
