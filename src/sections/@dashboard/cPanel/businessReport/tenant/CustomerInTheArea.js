import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import PropTypes from 'prop-types';
import { NoData } from '../../../../../components/loading';

CustomerInTheArea.propTypes = {
  data: PropTypes.object,
};
export default function CustomerInTheArea({ data }) {
  return (
    <Grid container spacing={2}>
      {Object.keys(data).map((city) => (
        <Grid key={city} item xs={12} sm={4}>
          <Box sx={{ border: '1px solid', borderRadius: 2, height: '100%' }}>
            <Typography textAlign="center" sx={{ fontWeight: 600 }}>
              {city}
            </Typography>
            <Typography textAlign="center">{data[city].tenants || 0}</Typography>
          </Box>
        </Grid>
      ))}

      {!Object.keys(data).length && (
        <Grid item xs={12}>
          <NoData />
        </Grid>
      )}
    </Grid>
  );
}
