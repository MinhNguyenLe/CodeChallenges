import i18next from 'i18next';
import { lazy } from 'react';
import { authRoles } from 'app/auth';

import vi from './i18n/vi';
import en from './i18n/en';

i18next.addResourceBundle('en', 'movie', en);
i18next.addResourceBundle('vi', 'movie', vi);

const MovieConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/movie/detail/:id',
      component: lazy(() => import('./page/MovieDetail')),
      auth: authRoles.customer,
    },
    {
      path: '/apps/movie/top-rated',
      component: lazy(() => import('./page/TopRated')),
      auth: authRoles.customer,
    },
    {
      path: '/apps/movie/now-playing',
      component: lazy(() => import('./page/NowPlaying')),
      auth: authRoles.customer,
    },
  ],
};

export default MovieConfig;
