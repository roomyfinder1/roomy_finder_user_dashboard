import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { fCurrency } from '../../../../../utils/formatNumber';

ComparePrices.propTypes = {
  prices: PropTypes.object,
};

export default function ComparePrices({ prices }) {
  const data = [
    { label: 'Average price for similar unit in the area', value: prices[0]?.averagePrice || 0 },
    { label: 'Highest price in the area', value: prices[0]?.highestPrice || 0 },
    { label: 'Lowest price in the area', value: prices[0]?.lowestPrice || 0 },
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
            textAlign: 'center',
            marginBottom: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            {item.label}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mt: 1 }}>
            {fCurrency(item.value)} AED
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
