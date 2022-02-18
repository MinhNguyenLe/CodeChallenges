import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useParams } from 'react-router-dom';

import withReducer from 'app/store/withReducer';

import { useDispatch, useSelector } from 'react-redux';

import { IMAGE_DB } from 'axios/axios-config';
import reducer from '../store';
import { getDataMovie } from '../store/movieDetailSlice';

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
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 220 }} className="mr-24 mb-12 mt-12" style={{ cursor: 'pointer' }}>
      <CardHeader
        style={{ height: '120px' }}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={movie?.title}
        subheader={movie?.release_date}
      />
      <CardMedia
        component="img"
        height="280"
        image={IMAGE_DB + movie?.poster_path}
        alt="Paella dish"
      />
      <CardContent>
        <Typography noWrap variant="body2" color="text.secondary">
          {movie?.overview}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
export default withReducer('movie', reducer)(MovieDetail);
