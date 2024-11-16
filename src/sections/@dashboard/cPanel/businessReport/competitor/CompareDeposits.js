import { Box, Stack, Typography, Divider } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { fCurrency } from '../../../../../utils/formatNumber';

CompareDeposits.propTypes = {
  deposits: PropTypes.object,
};

export default function CompareDeposits({ deposits }) {
  const data = [
    { label: 'Average Area Deposit', value: fCurrency(deposits[0]?.averageDeposit) || '0 AED' },
    { label: 'Properties with Deposit', value: deposits[0]?.propertiesWithDeposits || 0 },
    { label: 'Properties without Deposit', value: deposits[0]?.propertiesWithoutDeposits || 0 },
  ];

  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 3,
          color: 'text.primary',
        }}
      >
        Deposit Comparison
      </Typography>

      <Stack spacing={3} divider={<Divider flexItem />}>
        {data.map((item, index) => (
          <Box key={index} sx={{ textAlign: 'center' }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 'medium', color: 'text.secondary', mb: 1 }}
            >
              {item.label}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'success.main' }}>
              {item.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
