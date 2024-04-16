import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

PostsNumber.propTypes = {
  data: PropTypes.object,
};
export default function PostsNumber({ data }) {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ border: '1px solid', padding: 0.2, borderRadius: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ padding: 1, borderRadius: 1, width: '100%', textAlign: 'center' }}>
            <Typography>Premium</Typography>
            <Typography>{data?.postsNumber?.premium || 0}</Typography>
          </Box>
          <Box sx={{ padding: 1, borderRadius: 1, width: '100%', textAlign: 'center' }}>
            <Typography>Regular</Typography>
            <Typography>{data?.postsNumber?.regular || 0}</Typography>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
