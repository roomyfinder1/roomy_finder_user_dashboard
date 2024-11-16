import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

import PropTypes from 'prop-types';
import { formatNumberWithTwoDecimals } from '../../../../../utils/formatNumber';

CompareClicks.propTypes = {
  clicks: PropTypes.object,
};
export default function CompareClicks({ clicks }) {
  return (
    <Stack sx={{ border: '1px solid', padding: 0.2, borderRadius: 2 }}>
      <Stack direction="row" spacing={1} justifyContent="space-around">
        <Box sx={{ padding: 1, borderRadius: 1, width: '100%', textAlign: 'center' }}>
          <Typography>Your Post Clicks</Typography>
        </Box>
        <Box sx={{ padding: 1, borderRadius: 1, width: '100%', textAlign: 'center' }}>
          <Typography>Total Clicks</Typography>
        </Box>
        <Box sx={{ padding: 1, borderRadius: 1, width: '100%', textAlign: 'center' }}>
          <Typography>Area Average Clicks</Typography>
        </Box>
      </Stack>
      <Stack direction="row" spacing={1} justifyContent="space-around">
        <Box sx={{ padding: 1, borderRadius: 1, width: '100%', textAlign: 'center' }}>
          <Typography>{clicks?.userPostClicks || 0}</Typography>
        </Box>
        <Box sx={{ padding: 1, borderRadius: 1, width: '100%', textAlign: 'center' }}>
          <Typography>{clicks?.allPostClicks || 0}</Typography>
        </Box>
        <Box sx={{ padding: 1, borderRadius: 1, width: '100%', textAlign: 'center' }}>
          <Typography>{formatNumberWithTwoDecimals(clicks?.averageAreaClicks) || 0}</Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
