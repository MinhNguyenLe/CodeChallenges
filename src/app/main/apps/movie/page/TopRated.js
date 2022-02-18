import { useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';

import withReducer from 'app/store/withReducer';
import FusePageSimple from '@fuse/core/FusePageSimple';

import FuseLoading from '@fuse/core/FuseLoading';

import { GlobalStyles } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import reducer from '../store';

import SideBarHeader from './SideBarHeader';
import ListMovie from './ListMovie';

import { getDataWhenUpdatePageIndex, getDataMovie } from '../store/topRatedSlice';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    minHeight: 72,
    height: 72,
    background: 'transparent',
    [theme.breakpoints.up('lg')]: {
      minHeight: 136,
      height: 136,
    },
  },
  '& .FusePageSimple-wrapper': {
    minHeight: 0,
  },
  '& .FusePageSimple-contentWrapper': {
    padding: '16px 20px',
    [theme.breakpoints.up('lg')]: {
      padding: '2.4rem 1.6rem 1.6rem 0',
      height: '100%',
    },
  },
  '& .FusePageSimple-content': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  '& .FusePageSimple-sidebar': {
    width: 360,
    border: 0,
  },
}));

const FrameAction = styled('div')(({ theme }) => ({
  paddingBottom: '1rem',
}));

const TopRated = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('movie');
  const listMoviesWithPageIndex = useSelector(
    (state) => state.movie.topRated.listMoviesWithPageIndex
  );

  useEffect(() => {
    dispatch(getDataMovie());
  }, []);

  const pageIndex = useSelector((state) => state.movie.topRated.pageIndex);

  const pageLayout = useRef();
  const Content = () => {
    return (
      <main>
        <FrameAction>
          <AppBar className="w-full" elevation={0} position="static">
            <Toolbar className="px-16" aria-label="simple table">
              <Hidden lgUp>
                <IconButton
                  onClick={(ev) => {
                    pageLayout.current.toggleLeftSidebar();
                  }}
                  aria-label="open left sidebar"
                  size="large"
                >
                  <Icon>menu</Icon>
                </IconButton>
              </Hidden>
              <div className="flex items-center cursor-pointer" role="button" tabIndex={0}>
                <Typography color="inherit" className="text-18 font-semibold px-4">
                  {t('TOP_RATED')}
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
          <ListMovie page="top-rated" />
          {listMoviesWithPageIndex.length ? (
            <Button
              onClick={() => dispatch(getDataWhenUpdatePageIndex({ pageIndex: pageIndex + 1 }))}
              component="button"
              role="button"
              variant="contained"
              color="secondary"
              style={{ width: '100%', height: 40 }}
            >
              {t('LOAD_MORE')}
            </Button>
          ) : (
            <FuseLoading />
          )}
        </FrameAction>
      </main>
    );
  };
  const SidebarContent = () => {
    return (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <SideBarHeader />
        </div>
        {
          // <List />
        }
      </div>
    );
  };
  return (
    <>
      <GlobalStyles
        styles={(theme) => ({
          '#fuse-main': {
            height: '100vh',
          },
        })}
      />
      <Root
        ref={pageLayout}
        sidebarInner
        innerScroll
        content={Content()}
        leftSidebarContent={SidebarContent()}
      />
    </>
  );
};

export default withReducer('movie', reducer)(TopRated);
