import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

UniqueCode.propTypes = {
  code: PropTypes.string,
};

function UniqueCode({ code }) {
  return (
    <>
      {code ? (
        <Box variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {/* <Typography sx={{ color: 'red', display: 'inline' }}>{code.substring(0, 3)}</Typography>
          <Typography sx={{ display: 'inline' }}>{code.substring(3, 4)}</Typography>
          <Typography sx={{ color: '#08f26e', display: 'inline' }}>
            {code.substring(4, 6)}
          </Typography>
          <Typography sx={{ display: 'inline' }}>{code.substring(6)}</Typography> */}
          <Typography sx={{ display: 'inline' }}>{code}</Typography>
        </Box>
      ) : (
        'N/A'
      )}
    </>
  );
}

export default UniqueCode;
