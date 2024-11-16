import PropTypes from 'prop-types';
// @mui
import { Box } from '@mui/material';
// components
import { SkeletonProductItem } from '../../../../components/skeleton';
//
import PropertyProductCard from './PropertyProductCard';

// ----------------------------------------------------------------------

PropertyProductList.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default function PropertyProductList({ products, loading, ...other }) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      {...other}
    >
      {(loading ? [...Array(4)] : products)?.map((product, index) =>
        product ? (
          <PropertyProductCard key={product.id} product={product} />
        ) : (
          <SkeletonProductItem key={index} />
        )
      )}
    </Box>
  );
}
