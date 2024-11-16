import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  Card,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { TableHeadCustom } from '../../../../components/table';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import Scrollbar from '../../../../components/scrollbar';

const TABLE_HEAD = [
  { id: 'Property area inside', label: 'Property area inside', align: 'left' },
  { id: 'Properties', label: 'Properties', align: 'center' },
  { id: '' },
];

PropertySendCity.propTypes = {
  sx: PropTypes.object,
  locationDataCount: PropTypes.object,
  selectCityFromBooking: PropTypes.array,
  locationData: PropTypes.object,
  bookings: PropTypes.object,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      percent: PropTypes.string.isRequired,
    })
  ).isRequired,
};

PropertySendCity.defaultProps = {
  sx: {},
};

function PropertySendCity({
  title,
  locationDataCount,
  selectCityFromBooking,
  locationData,
  bookings,
  data,
  sx,
  ...other
}) {
  const navigate = useNavigate();
  const NavigateToViewArea = (area) => {
    navigate(PATH_DASHBOARD.properties.property_view_area, {
      state: { properties: locationData[area], area, bookings: bookings[area] },
    });
  };

  const [filterName, setFilterName] = useState('');

  const dataFiltered = filterUser({
    inputData: Object.keys(locationData),
    filterName,
  });

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', p: 3, ...sx }} {...other}>
      <Box>
        <Typography variant="h5">{`${title} Dubai`}</Typography>
      </Box>

      <TextField
        sx={{ my: 2 }}
        placeholder="Search for a city"
        onChange={(e) => setFilterName(e.target.value)}
      />

      <TableContainer sx={{ position: 'relative', maxHeight: 400, overflow: 'auto' }}>
        <Scrollbar>
          <Table size="medium" sx={{ minWidth: '100%', height: 400 }}>
            <TableHeadCustom headLabel={TABLE_HEAD} />

            <TableBody>
              {dataFiltered?.map((area) => (
                <TableRow key={area}>
                  <TableCell align="left">{area}</TableCell>
                  <TableCell align="center">{locationData[area].length}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#6A0066' }}
                      onClick={() => {
                        NavigateToViewArea(area);
                      }}
                    >
                      View Area
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

export default PropertySendCity;

export function filterUser({ inputData, filterName }) {
  if (filterName) {
    inputData = inputData.filter(
      (user) => user.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
