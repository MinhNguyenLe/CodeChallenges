import axios from 'axios';

export const THE_MOVIE_DB = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 5000,
});

export const IMAGE_DB = 'https://image.tmdb.org/t/p/original';

export default { THE_MOVIE_DB, IMAGE_DB };
