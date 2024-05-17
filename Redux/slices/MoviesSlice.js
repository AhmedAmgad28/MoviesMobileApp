import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTJhNDJmNDc1MWIzOWU4Y2E3OWI4Y2RkZTNiZDFmZCIsInN1YiI6IjY2NDcyNzY4ZjZlMTQyZTViYTM0NTkzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ig7-Z4kKnibkkfhPeAml6eQtGHpAPo2K4U2pq0lVXpA",
};

const initialState = {
  nowPlayingMovies: [],
  upcomingMovies: [],
  popularMovies: [],
  topratedMovies: [],
  similarMovies: [],
  filteredMovies: [],
  loading: false,
  error: null,
};

export const getNowPlayingMovies = createAsyncThunk(
  "movies/getNowPlayingMovies",
  async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing",
        { headers }
      );
      return response.data.results; // Directly return the results array
    } catch (error) {
      throw new Error("Failed to fetch movies.");
    }
  }
);

export const getPopularMovies = createAsyncThunk(
  "movies/getPopularMovies",
  async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        { headers }
      );
      return response.data.results;
    } catch (error) {
      throw new Error("Failed to fetch movies.");
    }
  }
);

export const getUpcomingMovies = createAsyncThunk(
  "movies/getUpcomingMovies",
  async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming",
        { headers }
      );
      return response.data.results;
    } catch (error) {
      throw new Error("Failed to fetch movies.");
    }
  }
);

export const getTopratedMovies = createAsyncThunk(
  "movies/getTopratedMovies",
  async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated",
        { headers }
      );
      return response.data.results;
    } catch (error) {
      throw new Error("Failed to fetch movies.");
    }
  }
);

export const getSimilarMovies = createAsyncThunk(
  "movies/getSimilarMovies",
  async (movieID) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}/similar`,
        { headers }
      );
      return response.data.results;
    } catch (error) {
      throw new Error("Failed to fetch movies.");
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    searchMovies: (state, action) => {
      const query = action.payload.toLowerCase();
      const allMovies = [
        ...state.nowPlayingMovies,
        ...state.upcomingMovies,
        ...state.popularMovies,
        ...state.topratedMovies,
      ];

      state.filteredMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(query)
      );

      // Removing duplicates
      const seenIds = {};
      state.filteredMovies = state.filteredMovies.filter((movie) => {
        if (!seenIds[movie.id]) {
          seenIds[movie.id] = true;
          return true;
        }
        return false;
      });
    },

    clearSearchResults: (state) => {
      state.filteredMovies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNowPlayingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNowPlayingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.nowPlayingMovies = action.payload;
      })
      .addCase(getNowPlayingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getUpcomingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingMovies = action.payload;
      })
      .addCase(getUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload;
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getTopratedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopratedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.topratedMovies = action.payload;
      })
      .addCase(getTopratedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getSimilarMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSimilarMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.similarMovies = action.payload;
      })
      .addCase(getSimilarMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { searchMovies, clearSearchResults } = movieSlice.actions;
export default movieSlice.reducer;
