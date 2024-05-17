import { createSlice } from '@reduxjs/toolkit';
import storage from '../../Storage/storage';

const initialState = {
  favoriteMovies: [],
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    loadFavorites: (state, action) => {
      state.favoriteMovies = action.payload;
    },
    addFavorite: (state, action) => {
      const movie = action.payload;
      state.favoriteMovies.push(movie);
      storage.save({
        key: 'favorites',
        data: state.favoriteMovies,
      });
    },
    removeFavorite: (state, action) => {
      const movieId = action.payload;
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id !== movieId
      );
      storage.save({
        key: 'favorites',
        data: state.favoriteMovies,
      });
    },
  },
});

export const { loadFavorites, addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
