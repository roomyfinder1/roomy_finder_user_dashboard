import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

GeneralAmenities.propTypes = {
  amenities: PropTypes.object,
};

export default function GeneralAmenities({ amenities }) {
  const data = [
    { label: 'Properties with up to 3 amenities', value: amenities['3 or fewer'] || 0 },
    { label: 'Properties with 4 to 6 amenities', value: amenities['4-6'] || 0 },
    { label: 'Properties with 7 to 9 amenities', value: amenities['7-9'] || 0 },
    { label: 'Properties with more than 9 amenities', value: amenities['more than 9'] || 0 },
  ];

  return (
    <Box
      sx={{
        padding: 3,
        border: '1px solid #ddd',
        borderRadius: 2,
        backgroundColor: 'background.paper',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {data.map((item, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            textAlign: 'center',
            marginBottom: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            {item.label}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mt: 1 }}>
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
