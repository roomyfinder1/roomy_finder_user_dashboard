import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';

PropertiesInArea.propTypes = {
  data: PropTypes.object,
};
export default function PropertiesInArea({ data }) {
  return (
    <Grid container>
      <Grid
        item
        xs={4}
        sx={{ border: '1px solid', padding: 1, borderRadius: 2, textAlign: 'center' }}
      >
        <Typography>{data?.propertiesCount || 0} Properties</Typography>
      </Grid>
    </Grid>
  );
}
