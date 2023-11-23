import MovieCard from "./Movie/MovieCard";

import "../../styles/movies.scss";

const Movies = ({ viewTrailer, movies }) => {
  return (
    <div data-testid="movies" className="movies">
      {movies?.length > 0 ? (
        movies?.map((movie, index) => {
          return (
            <MovieCard movie={movie} key={index} viewTrailer={viewTrailer} />
          );
        })
      ) : (
        <h1 data-testid="movies-empty">No movies found</h1>
      )}
    </div>
  );
};

export default Movies;
