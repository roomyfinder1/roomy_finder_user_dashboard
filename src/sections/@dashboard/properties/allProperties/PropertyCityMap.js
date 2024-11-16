/* eslint-disable import/no-extraneous-dependencies */
import { Box, Container, Grid, Typography } from '@mui/material';
import { VectorMap } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';
import { useDispatch } from '../../../../redux/store';
import { setCity } from '../../../../redux/slices/notification';
import { useSettingsContext } from '../../../../components/settings';

export default function WorldMap() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  return (
    <Container maxWidth={themeStretch ? false : 'xl'} padding={2}>
      <Box>
        <Typography variant="h5" mb={2}>
          World Map
        </Typography>
      </Box>

      <Grid sx={{ height: '300px' }}>
        <VectorMap
          map={worldMill}
          backgroundColor=""
          regionStyle={{
            initial: {
              fill: '#D1D5DB',
              'fill-opacity': 1,
              stroke: '#265cff',
              'stroke-width': 0,
              'stroke-opacity': 0,
            },
            hover: {
              'fill-opacity': 0.8,
              fill: '',
              stroke: '#2b2b2b',
            },
            selected: {
              fill: '#FFFB00',
            },
          }}
          series={{
            regions: [
              {
                scale: ['#08F26E', '#07DA63'],
                values: {
                  AE: 1,
                  SA: 1,
                  US: 1,
                },
                min: 0,
                max: 100,
              },
            ],
          }}
          // markers={{ name: 'Qatar', latLng: [25.354826, 51.183884] }}
          onRegionClick={(event, label) => {
            dispatch(setCity(label));
          }}
        />
      </Grid>
    </Container>
  );
}

// 7780212949
