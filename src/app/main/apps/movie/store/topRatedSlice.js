import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import url, { THE_MOVIE_DB, apiKey } from 'axios/axios-config';

export const getDataMovie = createAsyncThunk(
  'movie/topRated/getDataMovie',
  async (params, { dispatch, getState }) => {
    THE_MOVIE_DB.get(url.topRated, {
      params: {
        api_key: apiKey,
        page: params?.pageIndex || getState().movie.topRated.pageIndex,
      },
    })
      .then(async (res) => {
        dispatch(
          setListMoviesWithPageIndex([
            ...getState().movie.topRated.listMoviesWithPageIndex,
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
  'movie/topRated/getDataMovie',
  async (params, { dispatch, getState }) => {
    dispatch(setPageIndex(params.pageIndex));
    dispatch(getDataMovie({ pageIndex: params.pageIndex }));
  }
);

const initialState = {
  listMoviesWithPageIndex: [],
  pageIndex: 1,
};

const topRatedSlice = createSlice({
  name: 'movie/topRated',
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

export const { setListMoviesWithPageIndex, setPageIndex } = topRatedSlice.actions;

export default topRatedSlice.reducer;
