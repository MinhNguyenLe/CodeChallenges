import i18next from 'i18next';

import vi from './navigation-i18n/vi';
import en from './navigation-i18n/en';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('vi', 'navigation', vi);

const navigationConfig = [
  {
    id: 'movie',
    title: 'Movie',
    translate: 'MOVIE',
    type: 'group',
    icon: 'people',
    children: [
      {
        id: 'top rated',
        title: 'Top rated',
        translate: 'TOP_RATED',
        type: 'item',
        icon: 'trending_up',
        url: '/apps/movie/top-rated',
      },
      {
        id: 'now playing',
        title: 'Now playing',
        translate: 'NOW_PLAYING',
        type: 'item',
        icon: 'trending_up',
        url: '/apps/movie/now-playing',
      },
    ],
  },
];
export default navigationConfig;
