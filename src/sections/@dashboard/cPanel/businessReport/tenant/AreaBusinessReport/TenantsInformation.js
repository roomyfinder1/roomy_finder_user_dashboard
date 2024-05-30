import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomersPieChart from './components/CustomersPieChart';

TenantsInformation.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};
export default function TenantsInformation({ title, data }) {
  const theme = useTheme();

  const { maleCustomers, femaleCustomers } = data;
  return (
    <Card sx={{ padding: 1, border: '1px solid #DADADA' }}>
      <Typography sx={{ color: '#1E01D2', fontWeight: 'bold', paddingX: '30px' }}>
        {title}
      </Typography>
      <CustomersPieChart
        title=""
        chart={{
          colors: [theme.palette.info.main, theme.palette.info.light, theme.palette.info.dark],

          series: [
            {
              label: 'Male',
              value: maleCustomers ?? 5,
            },
            {
              label: 'Female',
              value: femaleCustomers ?? 9,
            },
          ],
        }}
      />
    </Card>
  );
}
