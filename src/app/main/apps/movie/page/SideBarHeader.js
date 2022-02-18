import { useRef } from 'react';
import { Paper, Input, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';

import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: theme.palette.background.paper,
    padding: '2.4rem 1.6rem 1.6rem 1.6rem',
    justifyContent: 'center',
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  batch: {},
}));

export default function SideBarHeader() {
  const { t } = useTranslation('movie');

  const dispatch = useDispatch();
  const classes = useStyles();

  const searchInput = useRef();

  return (
    <Container className={classes.container}>
      <Paper
        style={{ width: '100%' }}
        className={classes.search}
        component={motion.div}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      >
        <Input
          inputRef={searchInput}
          placeholder={t('ENTER_NAME_PROJECT')}
          className="flex flex-1 px-16"
          disableUnderline
          fullWidth
          inputProps={{
            'aria-label': 'Search',
          }}
        />
      </Paper>
      <Button
        component="button"
        role="button"
        variant="contained"
        color="secondary"
        style={{ height: 40, marginLeft: '8px' }}
      >
        {t('SEARCH')}
      </Button>
    </Container>
  );
}
