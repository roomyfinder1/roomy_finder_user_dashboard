import { Card, Grid, Typography } from '@mui/material';

import React from 'react';
import PropTypes from 'prop-types';
import PropertyViewsCard from './components/PropertyViewsCard';

PropertyViews.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};
export default function PropertyViews({ title, data }) {
  return (
    <Card sx={{ padding: 2, border: '1px solid #DADADA', height: '100%' }}>
      <Typography sx={{ color: '#1E01D2', fontWeight: 'bold', paddingX: '30px', mb: 3 }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {data.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property}>
            <PropertyViewsCard property={property} />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
