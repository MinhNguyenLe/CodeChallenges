import { combineReducers } from '@reduxjs/toolkit';
import topRated from './topRatedSlice';
import movieDetail from './movieDetailSlice';
import nowPlaying from './nowPlayingSlice';

const reducer = combineReducers({
  topRated,
  movieDetail,
  nowPlaying,
});

export default reducer;
