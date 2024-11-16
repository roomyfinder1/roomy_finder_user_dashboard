import { Box, Stack, Typography, Divider } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { fCurrency } from '../../../../../utils/formatNumber';

CompareAgentCommission.propTypes = {
  commission: PropTypes.object,
};

export default function CompareAgentCommission({ commission }) {
  const data = [
    { label: 'Average Commission', value: fCurrency(commission[0]?.averageCommission) || 0 },
    { label: 'Properties with Commission', value: commission[0]?.propertiesWithCommission || 0 },
    {
      label: 'Properties without Commission',
      value: commission[0]?.propertiesWithoutCommission || 0,
    },
  ];

  return (
    <Box
      sx={{
        padding: 4,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: 'text.primary',
          marginBottom: 3,
        }}
      >
        Agent Commission Overview
      </Typography>

      <Stack spacing={3} divider={<Divider flexItem />} sx={{ width: '100%' }}>
        {data.map((item, index) => (
          <Box key={index} sx={{ textAlign: 'center' }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 'medium', color: 'text.secondary', marginBottom: 1 }}
            >
              {item.label}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {item.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
