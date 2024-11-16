import { Paper, Box } from '@mui/material';
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PropTypes from 'prop-types';
import Label from '../../../../../../../components/label';
import ImageCard from '../../../../../../../components/ImageCard/ImageCard';

PropertyViewsCard.propTypes = {
  property: PropTypes.object,
};
export default function PropertyViewsCard({ property }) {
  const regex = /\d+/g;

  return (
    <Paper>
      <Box sx={{ p: 1, position: 'relative' }}>
        <Label
          variant="filled"
          color="warning"
          sx={{
            right: 16,
            zIndex: 9,
            bottom: 16,
            position: 'absolute',
          }}
        >
          <VisibilityIcon />
          {property?.viewCounts || 0}
        </Label>
        <Label
          variant="filled"
          sx={{
            right: 16,
            zIndex: 9,
            position: 'absolute',
          }}
        >
          {property?.standardCode.split('#')[0] || ''}
          {property?.standardCode?.match(regex) || ''}
        </Label>

        <ImageCard imageUrls={property?.files} />
      </Box>
    </Paper>
  );
}
