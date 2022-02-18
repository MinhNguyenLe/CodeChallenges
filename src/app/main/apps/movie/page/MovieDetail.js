import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';

import withReducer from 'app/store/withReducer';

import { useDispatch, useSelector } from 'react-redux';

import { IMAGE_DB } from 'axios/axios-config';
import reducer from '../store';
import { getDataMovie, setDefault } from '../store/movieDetailSlice';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function MovieDetail() {
  const [expanded, setExpanded] = React.useState(false);

  const routerParams = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie.movieDetail.movie);

  React.useEffect(() => {
    dispatch(getDataMovie({ id: routerParams.id }));
    return dispatch(setDefault());
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {movie && movie.id ? (
        <div className="p-24">
          <img
            src={IMAGE_DB + movie?.poster_path}
            alt="beach"
            style={{
              maxWidth: '640px',
              width: '100%',
            }}
            className="rounded-6"
          />
          <h1 className="py-16 font-semibold">{movie?.title}</h1>
          <h4 className="pb-12 font-medium">{movie?.release_date}</h4>
          <p> {movie?.overview}</p>
        </div>
      ) : (
        <FuseLoading />
      )}
    </>
  );
}
export default withReducer('movie', reducer)(MovieDetail);
