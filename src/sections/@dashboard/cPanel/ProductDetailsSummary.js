import PropTypes from 'prop-types';
// @mui
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import UniqueCode from './UniqueCode';

// ----------------------------------------------------------------------

ProductDetailsSummary.propTypes = {
  cart: PropTypes.array,
  onAddCart: PropTypes.func,
  product: PropTypes.object,
  onGotoStep: PropTypes.func,
};

export default function ProductDetailsSummary({ product, ...other }) {
  const {
    createdAt,
    depositPrice,
    budget,
    posterType,
    type,
    action,
    units,
    address,
    preferences,
    amenities,
  } = product;

  return (
    <Box>
      {product ? (
        <Box>
          <Typography variant="h5" sx={{ mt: 2 }}>
            {!action ? 'Property' : 'Tenant'}
          </Typography>

          <Box sx={{ mx: 2, my: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Id Code</Typography>
            <Box>{<UniqueCode code={product.standardCode} /> || 'N/A'}</Box>
          </Box>
          {action && (
            <Box sx={{ mx: 2, my: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Budget</Typography>
              <Typography variant="body2">{budget || 'N/A'}</Typography>
            </Box>
          )}

          <Box sx={{ mx: 2, my: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Type</Typography>
            <Typography variant="body2">{type || 'N/A'}</Typography>
          </Box>

          {!action && (
            <Box>
              <Box sx={{ mx: 2, my: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Poster Type</Typography>
                <Typography variant="body2">{posterType || 'N/A'}</Typography>
              </Box>
              <Box sx={{ mx: 2, my: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Deposit Price</Typography>
                <Typography variant="body2">{depositPrice || 'N/A'}</Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ mx: 2, my: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Posted On</Typography>
            <Typography variant="body2">
              {moment(createdAt).format('DD-MM-YYYY') || 'N/A'}
            </Typography>
          </Box>
          {!action && (
            <Box sx={{ mx: 2, my: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Available quantity</Typography>
              <Typography variant="body2">{units?.length || 'N/A'} units</Typography>
            </Box>
          )}

          <Typography>{!action ? 'Property Address' : 'Tenant Address'}</Typography>

          <Box sx={{ mx: 2, my: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Floor Number</Typography>
            <Typography variant="body2">{address.floorNumber || 'N/A'}</Typography>
          </Box>
          <Box sx={{ mx: 2, my: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Apartment Number</Typography>
            <Typography variant="body2">{address.appartmentNumber || 'N/A'}</Typography>
          </Box>
          <Box sx={{ mx: 2, my: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Building Name</Typography>
            <Typography variant="body2">{address.buildingName || 'N/A'}</Typography>
          </Box>
          <Box sx={{ mx: 2, my: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Area</Typography>
            <Typography variant="body2">{address.location || 'N/A'}</Typography>
          </Box>
          <Box sx={{ mx: 2, my: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">City</Typography>
            <Typography variant="body2">{address.city || 'N/A'}</Typography>
          </Box>

          <Box sx={{ mx: 2, my: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography>Social Preferences</Typography>
              <ul style={{ listStyleType: 'none', marginLeft: 0 }}>
                {Object.entries(preferences).map(([preference, value], index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>
                    <Typography variant="body2" style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '8px', fontSize: '18px' }}>•</span>
                      <span>
                        {preference}: {value?.toString()}
                      </span>
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>

            <Box>
              <Typography textDecoration="underlined">Amenities</Typography>
              <ul style={{ listStyleType: 'none', mx: 2 }}>
                {amenities.map((amenity, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>
                    <Typography variant="body2" style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '8px', fontSize: '18px' }}>•</span>
                      {amenity}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
}
