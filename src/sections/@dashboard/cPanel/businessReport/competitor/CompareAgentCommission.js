import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

import PropTypes from 'prop-types';
import { fCurrency } from '../../../../../utils/formatNumber';

CompareAgentCommission.propTypes = {
  data: PropTypes.object,
};

export default function CompareAgentCommission({ data }) {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ border: '1px solid', padding: 0.2, borderRadius: 2 }}>
        <Stack>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>Average Area Commission</Typography>
            </Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>Properties with Commission</Typography>
            </Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>Properties without Commission</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>
                {fCurrency(data?.compareAgentCommission[0]?.averageCommission) || 0} AED
              </Typography>
            </Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>
                {data?.compareAgentCommission[0]?.propertiesWithCommission || 0}
              </Typography>
            </Box>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography>
                {data?.compareAgentCommission[0]?.propertiesWithoutCommission || 0}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
