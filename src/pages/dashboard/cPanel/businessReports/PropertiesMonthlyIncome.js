import { Container, Grid, Typography, Card, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import LineGraph from '../../../../sections/@dashboard/cPanel/businessReport/landlord/lineGraph';
import { API_URL } from '../../../../config-global';

export default function PropertiesMonthlyIncome() {
  const { userId } = useParams();
  const [properties, setProperties] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const getPropertiesIncome = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${API_URL}/c_panel/business_report/landlord_properties_income/${userId}`
        );

        // Set available years and current year data
        setAvailableYears(data?.availableYears || []);
        setCurrentYear(data?.currentYear || new Date().getFullYear());

        setProperties(data?.propertiesIncomeData || []);
      } catch (error) {
        setIsError(error?.response?.data?.message || 'Something went wrong');
        toast.error(error?.response?.data?.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    getPropertiesIncome();
  }, [userId]);

  return (
    <Container>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Properties Monthly Income
      </Typography>

      <Grid container spacing={3}>
        {isLoading && <div>Loading...</div>}

        {!isLoading &&
          properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.propertyId}>
              <Card
                sx={{
                  padding: 3,
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  minHeight: '350px',
                }}
              >
                {/* Property Name */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {property?.propertyName || 'Property Name'}
                </Typography>

                {/* Line Graph for Property's Monthly Income */}
                <Box>
                  <LineGraph
                    title="Monthly Income"
                    total={property?.monthlyIncomeData.reduce((sum, income) => sum + income, 0)}
                    chart={{
                      series: property?.monthlyIncomeData || [],
                    }}
                    availableYears={availableYears}
                    loading={isLoading}
                  />
                </Box>
              </Card>
            </Grid>
          ))}

        {isError && <div>Error: {isError}</div>}
      </Grid>
      <Toaster />
    </Container>
  );
}
