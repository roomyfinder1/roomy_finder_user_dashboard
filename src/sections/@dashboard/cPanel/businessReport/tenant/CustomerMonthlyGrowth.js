import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import PropTypes from 'prop-types';
import { fPercent } from '../../../../../utils/formatNumber';
import { NoData } from '../../../../../components/loading';

CustomerMonthlyGrowth.propTypes = {
  data: PropTypes.object,
};
export default function CustomerMonthlyGrowth({ data }) {
  return (
    <Grid container spacing={2}>
      {Object.keys(data)?.map((city) => (
        <Grid item xs={12} sm={4} key={city}>
          <Box sx={{ border: '1px solid', borderRadius: 2, height: '100%' }}>
            <Typography textAlign="center" sx={{ fontWeight: 600 }}>
              {city}
            </Typography>
            <Typography
              textAlign="center"
              sx={{ color: data[city]?.tenantsMonthlyGrowth >= 0 ? 'green' : 'red', padding: 1 }}
            >
              {fPercent(data[city]?.tenantsMonthlyGrowth) || '0%'}
            </Typography>
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
