import { Grid, Card, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

CustomerNationality.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};
export default function CustomerNationality({ title, data }) {
  return (
    <Card sx={{ padding: 2, border: '1px solid #DADADA', height: '100%' }}>
      <Typography sx={{ color: '#1E01D2', fontWeight: 'bold', paddingX: '30px', mb: 3 }}>
        {title}
      </Typography>
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item xs={6}>
          <Typography
            textAlign="center"
            sx={{ backgroundColor: '#9CA6FF', fontWeight: 600, minWidth: '100px', paddingY: 0.5 }}
          >
            Male
          </Typography>

          <ol>
            {data?.maleNationalities?.length ? (
              data?.maleNationalities?.map((nationality) => (
                <li key={nationality}>
                  {nationality === 'United Arab Emirates' ? 'UAE' : nationality}
                </li>
              ))
            ) : (
              <p>No Data Found</p>
            )}
          </ol>
        </Grid>

        <Grid item xs={6}>
          <Typography
            textAlign="center"
            sx={{ backgroundColor: '#F2A4FF', fontWeight: 600, minWidth: '100px', paddingY: 0.5 }}
          >
            Female
          </Typography>
          <ol>
            {data?.femaleNationalities?.length ? (
              data?.femaleNationalities?.map((nationality) => (
                <li key={nationality}>
                  {nationality === 'United Arab Emirates' ? 'UAE' : nationality}
                </li>
              ))
            ) : (
              <p>No Data Found</p>
            )}
          </ol>
        </Grid>
      </Grid>
    </Card>
  );
}
