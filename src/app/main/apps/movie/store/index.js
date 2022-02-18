import { combineReducers } from '@reduxjs/toolkit';
import topRated from './topRatedSlice';
import movieDetail from './movieDetailSlice';

const reducer = combineReducers({
  topRated,
  movieDetail,
});

export default reducer;
