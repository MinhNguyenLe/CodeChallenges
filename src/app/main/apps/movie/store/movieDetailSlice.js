import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import url, { THE_MOVIE_DB, apiKey } from 'axios/axios-config';

export const getDataMovie = createAsyncThunk(
  'movie/movieDetail/getDataMovie',
  async (params, { dispatch, getState }) => {
    THE_MOVIE_DB.get(url.movieById(params.id), {
      params: {
        api_key: apiKey,
      },
    })
      .then(async (res) => {
        dispatch(setDataMovie(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const initialState = {
  movie: {},
};

const movieDetailSlice = createSlice({
  name: 'movie/movieDetail',
  initialState,
  reducers: {
    setDataMovie: (state, action) => {
      state.movie = action.payload;
    },
    setDefault: (state, action) => {
      state.movie = {};
    },
  },
});

export const { setDataMovie, setDefault } = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
