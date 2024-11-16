import PropTypes from 'prop-types';
import { useState } from 'react';
import { MenuItem, Stack, Grid, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router';

import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';
import { PATH_DASHBOARD } from '../../../routes/paths';

PropertyUnitsPopover.propTypes = {
  units: PropTypes.array,
  booking: PropTypes.bool,
};

export default function PropertyUnitsPopover({ units, booking }) {
  const navigate = useNavigate();
  const [openPopover, setOpenPopover] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const dataFiltered = filterInput(units, searchInput);

  return (
    <>
      <Grid maxHeight={120}>
        <Box>
          <TextField
            label="search"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
        </Box>
      </Grid>
      <Grid>
        <IconButtonAnimate
          onClick={handleOpenPopover}
          sx={{
            ...(openPopover && {
              bgcolor: 'action.selected',
              mr: 1,
            }),
          }}
        >
          Search unit
        </IconButtonAnimate>
      </Grid>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 230, maxHeight: 500, overflow: 'auto' }}
      >
        <Stack spacing={0.75}>
          {units ? (
            dataFiltered?.map((unit) => (
              <MenuItem
                key={unit._id}
                onClick={() => {
                  navigate(PATH_DASHBOARD.property.view_property_unit, {
                    state: { unit },
                  });
                  // if (booking) {
                  //   navigate(PATH_DASHBOARD.property.view_property_unit, { state: unit });
                  // } else {
                  //   navigate(PATH_DASHBOARD.bookings.all_bookings_tables, { state: unit });
                  // }
                }}
              >
                {unit.standardCode}#{unit.code}
              </MenuItem>
            ))
          ) : (
            <MenuItem>No units found</MenuItem>
          )}
        </Stack>
      </MenuPopover>
    </>
  );
}

export function filterInput(inputData, filterName) {
  if (filterName) {
    inputData = inputData.filter(
      (unit) => unit.code.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }
  return inputData;
}
