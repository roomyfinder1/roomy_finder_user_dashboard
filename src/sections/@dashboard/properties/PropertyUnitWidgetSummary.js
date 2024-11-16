import PropTypes from 'prop-types';
// @mui
import { Card, Typography, Stack, Grid, Box } from '@mui/material';

// utils
import PropertyUnitsPopover from './PropertyUnits';

// ----------------------------------------------------------------------

PropertyUnitWidgetSummary.propTypes = {
  sx: PropTypes.object,
  country: PropTypes.string,
  gender: PropTypes.string,
  booking: PropTypes.bool,
  icon: PropTypes.node,
  units: PropTypes.array,
  propertyId: PropTypes.string,
};

export default function PropertyUnitWidgetSummary({
  icon,
  units,
  country,
  gender,
  booking,
  propertyId,
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
      <Grid maxHeight={120}>
        <PropertyUnitsPopover units={units} booking={booking} propertyId={propertyId} />
      </Grid>

      <Stack
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          ml: 2,
        }}
      >
        {country && (
          <>
            <Typography variant="h4">{country}</Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Nationality
            </Typography>
          </>
        )}

        {gender && (
          <>
            <Typography variant="h4">{gender}</Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Gender
            </Typography>
          </>
        )}

        {!gender && !country && (
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
        )}
      </Stack>
    </Card>
  );
}
