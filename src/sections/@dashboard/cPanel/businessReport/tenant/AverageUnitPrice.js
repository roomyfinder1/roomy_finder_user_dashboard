import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { fCurrency } from '../../../../../utils/formatNumber';
import { NoData } from '../../../../../components/loading';

AverageUnitPrice.propTypes = {
  data: PropTypes.object,
};

const units = [
  { unit: 'Master Room', code: 'MR' },
  { unit: 'Regular Room', code: 'RE' },
  { unit: 'Partition', code: 'PA' },
  { unit: 'Bed Space', code: 'BE' },
];

export default function AverageUnitPrice({ data }) {
  return (
    <Grid container spacing={2}>
      {Object.keys(data)?.map((city) => (
        <Grid key={city} item xs={12}>
          <Box sx={{ border: '1px solid', borderRadius: 2, height: '100%' }}>
            <Typography textAlign="center" sx={{ fontWeight: 600 }}>
              {city}
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="space-around">
              {units.map((unit, index) => (
                <Box key={unit} sx={{ padding: 1, textAlign: 'center' }}>
                  <Typography>{unit.code || 'N/A'}</Typography>
                  <Typography>
                    {fCurrency(data[city]?.averageUnitPrices[unit.unit]) || 0} AED
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>
      ))}

      {!Object.keys(data).length && (
        <Grid item xs={12}>
          <NoData />
        </Grid>
      )}
    </Grid>
  );
}
