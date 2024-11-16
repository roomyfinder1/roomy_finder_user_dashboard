import PropTypes from 'prop-types';
// @mui
import { Card, Typography, Box, LinearProgress } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

PropertyWidgetTwoSummary.propTypes = {
  icon: PropTypes.node,
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  title2: PropTypes.string,
  total2: PropTypes.number,
};

export default function PropertyWidgetTwoSummary({
  title,
  total,
  total2,
  title2,
  icon,
  sx,
  ...other
}) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        pl: 2,
        ...sx,
      }}
      {...other}
    >
      <div>
        <Typography variant="h3" textAlign="center">
          {fShortenNumber(total || <LinearProgress />)}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </div>
{
  title2 && (
      <div>
        <Typography variant="h3" textAlign="center">
          {fShortenNumber(total2 || <LinearProgress />)}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {title2}
        </Typography>
      </div>

  )
}

      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          backgroundColor: 'background.neutral',
        }}
      >
        {icon}
      </Box>
    </Card>
  );
}
