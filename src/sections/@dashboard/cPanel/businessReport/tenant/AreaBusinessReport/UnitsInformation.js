import { Card, Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Image from '../../../../../../components/image';

// images
import Studio from '../../../../../../assets/icons/unitsIcons/studio-black.png';
import Partition from '../../../../../../assets/icons/unitsIcons/partition-black.png';
import MasterRoom from '../../../../../../assets/icons/unitsIcons/masterRoom-black.png';
import Room from '../../../../../../assets/icons/unitsIcons/room-black.png';
import BedSpace from '../../../../../../assets/icons/unitsIcons/bed-black.png';

UnitsInformation.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
};

export default function UnitsInformation({ title, data }) {
  const units = [
    { image: BedSpace, name: 'Bed Space', value: data['Bed Space'] || 0 },
    { image: Partition, name: 'Partition', value: data.Partition || 0 },
    { image: Room, name: 'Room', value: data['Regular Room'] || 0 },
    { image: MasterRoom, name: 'Master Room', value: data['Master Room'] || 0 },
    { image: Studio, name: 'Studio', value: data.Studio || 0 },
  ];

  return (
    <Card sx={{ padding: 2, border: '1px solid #DADADA', height: '100%' }}>
      <Typography sx={{ color: '#1E01D2', fontWeight: 'bold', paddingX: '30px' }}>
        {title}
      </Typography>
      <Grid container spacing={3}>
        {units.slice(0, 3).map((unit) => (
          <Grid item xs={12} sm={4} md={4} key={unit.name}>
            <UnitCard unit={unit} />
          </Grid>
        ))}
        <Grid item xs={false} sm={3} md={1} /> {/* Empty item for spacing */}
        {units.slice(3).map((unit) => (
          <Grid item xs={12} sm={3} md={5} key={unit.name}>
            <UnitCard unit={unit} />
          </Grid>
        ))}
        <Grid item xs={false} sm={3} md={1} /> {/* Empty item for spacing */}
      </Grid>
    </Card>
  );
}

UnitCard.propTypes = {
  unit: PropTypes.object.isRequired,
};

function UnitCard({ unit }) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Image alt={unit.name} src={unit.image} ratio="4/3" />
      <Typography variant="body1" sx={{ mt: 1 }}>
        {unit.name}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        {Math.ceil(unit.value).toLocaleString()} AED
      </Typography>
    </Box>
  );
}
