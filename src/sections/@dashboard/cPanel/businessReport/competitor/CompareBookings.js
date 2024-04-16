import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

import PropTypes from 'prop-types';
import { formatNumberWithTwoDecimals } from '../../../../../utils/formatNumber';

CompareBookings.propTypes = {
  data: PropTypes.object,
};

export default function CompareBookings({ data }) {
  return (
    <Stack sx={{ border: '1px solid', padding: 2, borderRadius: 2 }}>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography>Your total bookings</Typography>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography>Your average number of bookings per unit</Typography>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography>Average number of bookings per unit in the area</Typography>
        </Box>
      </Stack>
      <Stack direction="row" spacing={1} justifyContent="space-around">
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography>{data?.compareBookings?.userBookings || 0}</Typography>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography>{data?.compareBookings?.userBookingsPerUnit || 0}</Typography>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography>
            {data?.compareBookings?.bookingsPerUnit
              ? formatNumberWithTwoDecimals(data?.compareBookings?.bookingsPerUnit)
              : 0}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
