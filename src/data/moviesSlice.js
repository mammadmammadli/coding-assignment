import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import movieService from "../services/movies";

export const fetchMovies = createAsyncThunk('fetch-movies', (page) => movieService.getMovies(page));

export const searchMovies = createAsyncThunk('search-movies', ({ query, page }) => {
	return movieService.searchMovie(query, page);
});

const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		page: 1,
		movies: [],
		selectedMovie: null,
		fetchStatus: '',
		totalResults: 0,
	},
	reducers: {
		addSelectedMovie: (state, action) => {
			state.selectedMovie = action.payload;
		},
		setPage: (state, page) => {
			state.page = page.payload;
		},
		removeSelectedMovie: (state) => {
			state.selectedMovie = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMovies.fulfilled, (state, action) => {
			state.page = action.payload.page;
			if (action.payload.page === 1) {
				state.movies = action.payload.results
			} else {
				state.movies = [...state.movies, ...action.payload.results]
			}

			state.totalResults = action.payload.total_results;
			state.fetchStatus = 'success'
		}).addCase(fetchMovies.pending, (state) => {
			state.fetchStatus = 'loading'
		}).addCase(fetchMovies.rejected, (state) => {
			state.fetchStatus = 'error'
		}).addCase(searchMovies.fulfilled, (state, action) => {
			if (action.payload.page === 1) {
				state.movies = action.payload.results
			} else {
				state.movies = [...state.movies, ...action.payload.results]
			}
			state.page = action.payload.page;
			state.totalResults = action.payload.total_results;
			state.fetchStatus = 'success'
		}).addCase(searchMovies.pending, (state) => {
			state.fetchStatus = 'loading'
		}).addCase(searchMovies.rejected, (state) => {
			state.fetchStatus = 'error'
		});
	}
})

export default moviesSlice
