import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
	const response = await fetch(apiUrl)
	return response.json()
})

const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		movies: [],
		selectedMovie: null,
		fetchStatus: '',
	},
	reducers: {
		addSelectedMovie: (state, action) => {
			state.selectedMovie = action.payload;
		},
		removeSelectedMovie: (state) => {
			state.selectedMovie = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMovies.fulfilled, (state, action) => {
			state.movies = action.payload
			state.fetchStatus = 'success'
		}).addCase(fetchMovies.pending, (state) => {
			state.fetchStatus = 'loading'
		}).addCase(fetchMovies.rejected, (state) => {
			state.fetchStatus = 'error'
		})
	}
})

export default moviesSlice
