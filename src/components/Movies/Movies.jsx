import Movie from "./Movie";

import "../../styles/movies.scss";

const Movies = ({ viewTrailer, movies }) => {
  return (
    <div data-testid="movies" className="movies">
      {movies?.map((movie, index) => {
        return <Movie movie={movie} key={index} viewTrailer={viewTrailer} />;
      })}
    </div>
  );
};

export default Movies;
