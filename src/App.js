import { useEffect } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import moviesSlice, { fetchMovies, searchMovies } from './data/moviesSlice'
import Header from './components/Header'
import Starred from './pages/Starred'
import WatchLater from './pages/WatchLater'

import './app.scss'
import 'reactjs-popup/dist/index.css'
import movieService from './services/movies'
import MovieWrapper from './components/Movies'
import Home from './pages'

const App = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const { addSelectedMovie } = moviesSlice.actions;
  const { page } = useSelector(state => state.movies)

  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(searchMovies({ query }))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies(1))
      setSearchParams()
    }
  }

  const resetSearch = () => {
    window.scrollTo(0, 0);
    setSearchParams()
    dispatch(fetchMovies(1))
  }

  const _searchMovies = (query) => {
    window.scrollTo(0, 0);
    getSearchResults(query)
  }

  const getMovies = () => {
    if (searchQuery) {
      dispatch(searchMovies({ query: searchQuery, page }))
    } else {
      dispatch(fetchMovies(page))
    }
  };

  const viewTrailer = (movie) => {
    getMovie(movie.id)
  }

  const getMovie = async (id) => {
    dispatch(addSelectedMovie({
      data: null,
      fetchStatus: 'loading'
    }))

    const videoData = await movieService.getMovie(id);

    const trailer = videoData.videos?.results?.find(vid => vid.type === 'Trailer')

    dispatch(addSelectedMovie({
      data: {
        ...videoData,
        videoKey: trailer ? trailer.key : videoData.videos.results[0]?.key ?? ''
      },
      fetchStatus: 'success'
    }))
  }

  useEffect(() => {
    getMovies()
  }, [page])

  return (
    <div className="App">
      <Header searchMovies={_searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} resetSearch={resetSearch} />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home viewTrailer={viewTrailer} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
