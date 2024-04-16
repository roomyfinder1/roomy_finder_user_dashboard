import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { NoData } from '../../../../../components/loading';

CustomerCityInformation.propTypes = {
  data: PropTypes.object,
};

export default function CustomerCityInformation({ data }) {
  return (
    <Grid container spacing={2}>
      {Object.keys(data)?.map((city) => (
        <Grid item xs={6} key={city}>
          <Box sx={{ border: '1px solid', padding: 2, borderRadius: 2, height: '100%' }}>
            <Typography textAlign="center" sx={{ fontWeight: 600 }}>
              {city}
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    backgroundColor: 'green',
                    padding: 1,
                    borderRadius: 2,
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  <Typography>Male</Typography>
                  <Typography>{data[city]?.maleUsers || 0}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    backgroundColor: 'orange',
                    padding: 1,
                    borderRadius: 2,
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  <Typography>Female</Typography>
                  <Typography>{data[city]?.femaleUsers || 0}</Typography>
                </Box>
              </Grid>
            </Grid>
            <Typography>Top Nationalities</Typography>
            {/* Access topNationalities directly from data[city] */}
            {data[city]?.topNationalities?.map((country, index) => (
              <Typography key={country}>
                {index + 1}. {country}
              </Typography>
            ))}
            {!data[city]?.topNationalities.length && (
              <Typography variant="h6" textAlign="center">
                No Data Found
              </Typography>
            )}
          </Box>
        </Grid>
      ))}
      {!Object.keys(data).length && (
        <Grid item xs={12}>
          <NoData />
        </Grid>
      )}
    </Grid>
  );
}
