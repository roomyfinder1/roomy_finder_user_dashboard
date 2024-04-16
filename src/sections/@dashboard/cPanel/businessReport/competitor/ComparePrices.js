import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

import PropTypes from 'prop-types';
import { fCurrency } from '../../../../../utils/formatNumber';

ComparePrices.propTypes = {
  data: PropTypes.object,
};
export default function ComparePrices({ data }) {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ border: '1px solid', padding: 0.2, borderRadius: 2 }}>
        <Stack>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>Average price for similar unit in the area</Typography>
            </Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>Highest price in the area</Typography>
            </Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>Lowest price in the area</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>{fCurrency(data?.comparePrices[0]?.averagePrice) || 0} AED</Typography>
            </Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>{fCurrency(data?.comparePrices[0]?.highestPrice) || 0} AED</Typography>
            </Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>{fCurrency(data?.comparePrices[0]?.lowestPrice) || 0} AED</Typography>
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
