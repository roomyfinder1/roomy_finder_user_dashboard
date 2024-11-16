import { Box, Stack, Typography, Divider } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { formatNumberWithTwoDecimals } from '../../../../../utils/formatNumber';

CompareBookings.propTypes = {
  bookings: PropTypes.object,
};

export default function CompareBookings({ bookings }) {
  return (
    <Box
      sx={{
        padding: 4,
        border: '1px solid #ddd',
        borderRadius: 2,
        backgroundColor: 'background.paper',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', marginBottom: 2 }}>
        Booking Overview
      </Typography>

      <Stack
        spacing={2}
        sx={{
          width: '100%',
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
            Total Bookings
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', color: 'primary.main', marginTop: 0.5 }}
          >
            {bookings?.userBookings || 0}
          </Typography>
        </Box>
        <Divider flexItem />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
            Avg. Bookings per Unit
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', color: 'primary.main', marginTop: 0.5 }}
          >
            {/* {bookings?.userBookingsPerUnit || 0} */}
            {bookings?.bookingsPerUnit
              ? formatNumberWithTwoDecimals(bookings.userBookingsPerUnit)
              : 0}
          </Typography>
        </Box>
        <Divider flexItem />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
            Avg. Bookings per Unit (Area)
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', color: 'primary.main', marginTop: 0.5 }}
          >
            {bookings?.bookingsPerUnit ? formatNumberWithTwoDecimals(bookings.bookingsPerUnit) : 0}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
