import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

import PropTypes from 'prop-types';

GeneralAmenities.propTypes = {
  data: PropTypes.object,
};
export default function GeneralAmenities({ data }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack
          sx={{ border: '1px solid', padding: 0.2, borderRadius: 2 }}
          direction="row"
          spacing={1}
          justifyContent="space-between"
        >
          <Box sx={{ padding: 1, borderRadius: 1, width: '100%', textAlign: 'center' }}>
            <Typography>Properties with upto 3 amenities</Typography>
            <Typography>{data?.generalAmenities['3 or fewer'] || 0}</Typography>
          </Box>
          <Box sx={{ padding: 1, borderRadius: 1, width: '100%', textAlign: 'center' }}>
            <Typography>Properties with upto 6 amenities</Typography>
            <Typography>{data?.generalAmenities['4-6'] || 0}</Typography>
          </Box>
          <Box sx={{ padding: 1, borderRadius: 1, width: '100%', textAlign: 'center' }}>
            <Typography>Properties with upto 9 amenities</Typography>
            <Typography>{data?.generalAmenities['7-9'] || 0}</Typography>
          </Box>
          <Box sx={{ padding: 1, borderRadius: 1, width: '100%', textAlign: 'center' }}>
            <Typography>Properties with upto 12 amenities</Typography>
            <Typography>{data?.generalAmenities['more than 9'] || 0}</Typography>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
