import { Grid, Typography } from '@mui/material';

import PropTypes from 'prop-types';
import React from 'react';
import Image from '../../../../../components/image';
import { NoData } from '../../../../../components/loading';

ClicksPerPost.propTypes = {
  data: PropTypes.object,
};

export default function ClicksPerPost({ data }) {
  return (
    <Grid container sx={{ border: '1px solid', borderRadius: 2 }}>
      {data?.map((property) => (
        <Grid item key={property?._id} xs={12} sm={6} sx={{ padding: 2, borderRadius: 2 }}>
          <Image
            src={property?.images[0]}
            width="80px"
            ratio="1/1"
            alt="property"
            sx={{ borderRadius: 2 }}
          />
          <Typography textAlign="center">{property.viewCounts || 0} Views</Typography>
        </Grid>
      ))}

      {!data.length && (
        <Grid item xs={12}>
          <NoData />
        </Grid>
      )}
    </Grid>
  );
}
