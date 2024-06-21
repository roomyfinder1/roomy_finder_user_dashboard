import { Paper, Box } from '@mui/material';
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PropTypes from 'prop-types';
import Image from '../../../../../../../components/image';
import Label from '../../../../../../../components/label';

PropertyViewsCard.propTypes = {
  property: PropTypes.object,
};
export default function PropertyViewsCard({ property }) {
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
          {'  '}
          {property?.viewCounts || 0}
        </Label>

        <Image alt="cover" src={property?.images[0]} ratio="3/4" sx={{ borderRadius: 1.5 }} />
      </Box>
    </Paper>
  );
}
