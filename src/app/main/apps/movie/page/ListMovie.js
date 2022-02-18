import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import ItemMovie from './ItemMovie';

import { getDataMovie } from '../store/topRatedSlice';

const ListMovie = () => {
  const { t } = useTranslation('movie');
  const dispatch = useDispatch();

  const listMoviesWithPageIndex = useSelector(
    (state) => state.movie.topRated.listMoviesWithPageIndex
  );

  useEffect(() => {
    dispatch(getDataMovie());
  }, []);
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
