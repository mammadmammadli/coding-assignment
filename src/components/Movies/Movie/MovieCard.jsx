import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import placeholder from "../../../assets/not-found-500X750.jpeg";
import starredSlice from "../../../data/starredSlice";
import watchLaterSlice from "../../../data/watchLaterSlice";

import "../../../styles/moviecard.scss";

const MovieCard = ({ movie, viewTrailer }) => {
  const dispatch = useDispatch();
  const { starredMovies } = useSelector((state) => state.starred);
  const { watchLaterMovies } = useSelector((state) => state.watchLater);
  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;
  const [showContent, setShowContent] = useState(false);

  const isStarred = starredMovies.some(
    (starredMovie) => starredMovie.id === movie.id
  );

  const isWatchLater = watchLaterMovies.some(
    (watchLaterMovie) => watchLaterMovie.id === movie.id
  );

  return (
    <div className="movie-card">
      <div
        className="body"
        onMouseEnter={() => setShowContent(true)}
        onMouseLeave={() => setShowContent(false)}
        onClick={() => setShowContent(!showContent)}
      >
        <div className={`image-container ${showContent ? 'open' : ''}`}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : placeholder
            }
            alt="Movie poster"
          />
        </div>

        <div className={`content content.open ${showContent ? "open" : ""}`}>
          <h2 className="title">{movie.title}</h2>

          <div className="info-wrapper">
            <span>{movie.overview}</span>
          </div>

          <div className="year">
            <span>{movie.release_date}</span>
          </div>

          <div className="actions">
            {isStarred ? (
              <button
                className="star"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(unstarMovie(movie));
                }}
              >
                <i className="bi bi-star-fill" />
              </button>
            ) : (
              <button
                className="star"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    starMovie({
                      id: movie.id,
                      overview: movie.overview,
                      release_date: movie.release_date?.substring(0, 4),
                      poster_path: movie.poster_path,
                      title: movie.title,
                    })
                  );
                }}
              >
                <i className="bi bi-star" />
              </button>
            )}
            {isWatchLater ? (
              <button
                className="watch-later"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeFromWatchLater(movie));
                }}
              >
                <i className="bi bi-check" />
              </button>
            ) : (
              <button
                className="watch-later"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    addToWatchLater({
                      id: movie.id,
                      overview: movie.overview,
                      release_date: movie.release_date?.substring(0, 4),
                      poster_path: movie.poster_path,
                      title: movie.title,
                    })
                  );
                }}
              >
                <i className="bi bi-clock" />
              </button>
            )}
            <button
              className="trailer"
              onClick={(e) => {
                e.stopPropagation();
                viewTrailer(movie);
              }}
            >
              <i className="bi bi-eye" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
