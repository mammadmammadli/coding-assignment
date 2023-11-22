import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moviesSlice from "../../data/moviesSlice";
import Spinner from "../Spinner";
import useScrollDirection from "../../hooks/useScrollDirection";

import Movies from "./Movies";
import MovieVideo from "./Movie/MovieVideo";

const MovieWrapper = ({ viewTrailer }) => {
  const { page, fetchStatus, movies, totalResults } = useSelector(
    (state) => state.movies
  );
  const dispatch = useDispatch();
  const { setPage } = moviesSlice.actions;
  const scrollDirection = useScrollDirection();

  const scrollHandler = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (
      scrollTop + clientHeight >= scrollHeight &&
      fetchStatus !== "loading" &&
      movies.length !== totalResults &&
      scrollDirection === "down"
    ) {
      dispatch(setPage(page + 1));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [page, setPage, scrollHandler, scrollDirection, movies]);

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
