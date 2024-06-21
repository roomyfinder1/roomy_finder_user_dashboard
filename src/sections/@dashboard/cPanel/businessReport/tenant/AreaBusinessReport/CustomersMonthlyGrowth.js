import React from 'react';
import PropTypes from 'prop-types';
import { Card, Box, Typography } from '@mui/material';

import MovingUpIcon from '@mui/icons-material/Moving';
import MovingDownIcon from '@mui/icons-material/TrendingDown';

CustomersMonthlyGrowth.propTypes = {
  title: PropTypes.string,
  data: PropTypes.number.isRequired,
};
export default function CustomersMonthlyGrowth({ title, data }) {
  return (
    <Card sx={{ padding: 2, border: '1px solid #DADADA', height: '100%' }}>
      <Typography sx={{ color: '#1E01D2', fontWeight: 'bold', paddingX: '30px' }}>
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography
          sx={{
            fontSize: 100,
            fontWeight: 'bold',
            color: data > 0 ? '#00B41D' : 'red',
            textAlign: 'center',
            alignContent: 'center',
          }}
        >
          {data > 0 ? <MovingUpIcon /> : <MovingDownIcon />}
          {data}%
        </Typography>
      </Box>
    </Card>
  );
}
