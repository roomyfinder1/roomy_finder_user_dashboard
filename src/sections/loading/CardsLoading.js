import React from 'react';
import PropTypes from 'prop-types';

import { Container, Grid, Skeleton } from '@mui/material';
import { useSettingsContext } from '../../components/settings';

CardsLoading.propTypes = {
  count: PropTypes.number.isRequired,
};
export default function CardsLoading({ count }) {
  const { themeStretch } = useSettingsContext();

  const loadingCards = Array.from({ length: count }, (_, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Skeleton variant="rectangular" width="100%" height={118} />
      <Skeleton />
      <Skeleton width="60%" />
    </Grid>
  ));

  return (
    <Container maxWidth={themeStretch ? false : '90%'}>
      <Grid container spacing={3} sx={{ my: 2 }}>
        {loadingCards}
      </Grid>
    </Container>
  );
}
