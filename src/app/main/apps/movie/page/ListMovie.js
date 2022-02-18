import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import ItemMovie from './ItemMovie';

const ListMovie = ({ page }) => {
  const { t } = useTranslation('movie');
  const dispatch = useDispatch();

  const listMoviesWithPageIndex = useSelector((state) => {
    if (page === 'top-rated') return state.movie.topRated.listMoviesWithPageIndex;
    return state.movie.nowPlaying.listMoviesWithPageIndex;
  });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {listMoviesWithPageIndex.length
        ? listMoviesWithPageIndex.map((movie, index) => {
            return <ItemMovie movie={movie} key={index} />;
          })
        : null}
    </div>
  );
};
export default ListMovie;
