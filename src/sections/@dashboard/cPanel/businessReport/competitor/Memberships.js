/* eslint-disable no-nested-ternary */
import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

import PropTypes from 'prop-types';

Memberships.propTypes = {
  data: PropTypes.object,
};

export default function Memberships({ data }) {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ border: '1px solid', padding: 0.2, borderRadius: 2 }}>
        <Stack direction="row" spacing={1} justifyContent="space-between" sx={{ padding: 1 }}>
          <Box
            sx={{
              width: '100%',
              padding: 1,
              borderRadius: 1,
              backgroundColor: '#FFCD00',
              textAlign: 'center',
            }}
          >
            <Typography>Gold</Typography>
            <Typography>{data?.memberships.Gold || 0}</Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              padding: 1,
              borderRadius: 1,
              backgroundColor: '#CCCCCC',
              textAlign: 'center',
            }}
          >
            <Typography>Silver</Typography>
            <Typography>{data?.memberships?.Silver || 0}</Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              padding: 1,
              borderRadius: 1,
              backgroundColor: '#933A00',
              textAlign: 'center',
            }}
          >
            <Typography>Bronze</Typography>
            <Typography>{data?.memberships?.Bronze || 0}</Typography>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
