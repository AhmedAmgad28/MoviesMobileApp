import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/MoviesSlice';
import favoriteReducer from './slices/FavouriteSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    favorites: favoriteReducer,
  },
});

export default store;
