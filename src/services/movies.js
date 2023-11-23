import { API_KEY, ENDPOINT, ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from "../constants";

const getMovies = async (page = 1) => {
  try {
    const response = await fetch(`${ENDPOINT_DISCOVER}&page=${page}`);

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
}

const searchMovie = async (query, page = 1) => {
  try {
    const response = await fetch(`${ENDPOINT_SEARCH}&query=${query}&page=${page}`);

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

const getMovie = async (id) => {
  try {
    const response = await fetch(`${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`);

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
}

const movieService = {
  getMovies,
  searchMovie,
  getMovie
}

export default movieService;