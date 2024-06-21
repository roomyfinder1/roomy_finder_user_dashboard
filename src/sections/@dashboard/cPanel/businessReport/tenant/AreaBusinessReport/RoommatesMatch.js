import { Grid, Card, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useSnackbar } from '../../../../../../components/snackbar';
import axiosInstance from '../../../../../../utils/axios';
import { API_URL } from '../../../../../../config-global';

RoommatesMatch.propTypes = {
  title: PropTypes.string,
  area: PropTypes.string,
  budget: PropTypes.string,
};
export default function RoommatesMatch({ title, area, budget }) {
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getMatchedRoommates = async () => {
      try {
        const { data } = await axiosInstance.get(
          `${API_URL}/c_panel/roommates_match_business_report/${area}?budget=${budget}`
        );

        setUsers(data);
      } catch (error) {
        enqueueSnackbar('error.response.data.message');
      }
    };

    getMatchedRoommates();
  }, [enqueueSnackbar, area, budget]);
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

          <Typography textAlign="center">{users?.maleUsers?.length || 0}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography
            textAlign="center"
            sx={{ backgroundColor: '#F2A4FF', fontWeight: 600, minWidth: '100px', paddingY: 0.5 }}
          >
            Female
          </Typography>

          <Typography textAlign="center">{users?.femaleUsers?.length || 0}</Typography>
        </Grid>

        <Button>Get Details</Button>
      </Grid>
    </Card>
  );
}
