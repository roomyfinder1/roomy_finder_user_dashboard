import PropTypes from 'prop-types';
// @mui
import { Stack, TableRow, TableCell } from '@mui/material';
import { useNavigate } from 'react-router';
// components
import { UniqueCode } from '../general/app';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onPostPropertyRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function UserTableRow({
  row,
  selected,
  onPostPropertyRow,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}) {
  const { standardCode, address, type, quantity, quantityTaken } = row;

  const navigate = useNavigate();

  return (
    <TableRow hover selected={selected}>
      <TableCell>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          onClick={() => navigate(PATH_DASHBOARD.property.view_property_details, { state: row })}
        >
          {standardCode ? <UniqueCode code={standardCode} /> : '-'}
        </Stack>
      </TableCell>

      <TableCell align="center">{address.countryCode}</TableCell>

      <TableCell align="center">{address.city}</TableCell>

      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
        {address.location}
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>DXB</TableCell>

      <TableCell align="center">{type}</TableCell>

      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
        {quantity - quantityTaken}
      </TableCell>
      <TableCell
        sx={{
          textAlign: 'center',
        }}
      >
        {quantityTaken}
      </TableCell>
    </TableRow>
  );
}
