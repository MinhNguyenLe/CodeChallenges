import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import url, { THE_MOVIE_DB, apiKey } from 'axios/axios-config';

export const getDataMovie = createAsyncThunk(
  'movie/nowPlaying/getDataMovie',
  async (params, { dispatch, getState }) => {
    THE_MOVIE_DB.get(url.nowPlaying, {
      params: {
        api_key: apiKey,
        page: params?.pageIndex || getState().movie.nowPlaying.pageIndex,
      },
    })
      .then(async (res) => {
        dispatch(
          setListMoviesWithPageIndex([
            ...getState().movie.nowPlaying.listMoviesWithPageIndex,
            ...res.data.results,
          ])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const getDataWhenUpdatePageIndex = createAsyncThunk(
  'movie/nowPlaying/getDataMovie',
  async (params, { dispatch, getState }) => {
    dispatch(setPageIndex(params.pageIndex));
    dispatch(getDataMovie({ pageIndex: params.pageIndex }));
  }
);

const initialState = {
  listMoviesWithPageIndex: [],
  pageIndex: 1,
};

const nowPlayingSlice = createSlice({
  name: 'movie/nowPlaying',
  initialState,
  reducers: {
    setListMoviesWithPageIndex: (state, action) => {
      state.listMoviesWithPageIndex = action.payload;
    },
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },
  },
});

export const { setListMoviesWithPageIndex, setPageIndex } = nowPlayingSlice.actions;

export default nowPlayingSlice.reducer;
