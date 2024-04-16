import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

import PropTypes from 'prop-types';
import { fCurrency } from '../../../../../utils/formatNumber';

CompareDeposits.propTypes = {
  data: PropTypes.object,
};
export default function CompareDeposits({ data }) {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ border: '1px solid', padding: 0.2, borderRadius: 2 }}>
        <Stack>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>Average Area Deposit</Typography>
            </Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>Properties with Deposit</Typography>
            </Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>Properties without Deposit</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>
                {fCurrency(data?.compareDeposits[0]?.averageDeposit) || 0} AED
              </Typography>
            </Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>{data?.compareDeposits[0]?.propertiesWithDeposits || 0}</Typography>
            </Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>{data?.compareDeposits[0]?.propertiesWithoutDeposits || 0}</Typography>
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
