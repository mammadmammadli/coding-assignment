import { Link, NavLink, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "../styles/header.scss";
import { debounce } from "../utils";

const Header = ({ searchMovies,resetSearch }) => {
  const { starredMovies } = useSelector((state) => state.starred);
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search');
  
  return (
    <header>
      <Link to="/" data-testid="home" onClick={resetSearch}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          to="/starred"
          data-testid="nav-starred"
          className="nav-starred"
        >
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
          onKeyUp={debounce((e) => searchMovies(e.target.value))}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
      </div>
    </header>
  );
};

export default Header;
