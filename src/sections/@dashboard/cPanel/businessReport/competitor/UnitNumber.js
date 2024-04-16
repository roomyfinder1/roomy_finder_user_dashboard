import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

import PropTypes from 'prop-types';

UnitNumber.propTypes = {
  data: PropTypes.object,
};

const units = [
  { unit: 'Master Room', code: 'MR' },
  { unit: 'Regular Room', code: 'RE' },
  { unit: 'Partition', code: 'PA' },
  { unit: 'Bed Space', code: 'BE' },
];

export default function UnitNumber({ data }) {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ border: '1px solid', borderRadius: 2 }}>
        <Stack direction="row" spacing={1} justifyContent="space-around">
          {units?.map((unit, index) => (
            <Box key={unit} sx={{ padding: 1, textAlign: 'center' }}>
              <Typography>{unit?.code || 'N/A'}</Typography>
              <Typography>{data?.unitNumbers[unit.unit] || 0} units</Typography>
            </Box>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
