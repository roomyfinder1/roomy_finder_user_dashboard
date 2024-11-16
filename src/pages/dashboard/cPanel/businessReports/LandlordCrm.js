import React, { useState, useEffect } from 'react';
import { Box, Card, Container, Grid, Typography, Button, Skeleton, Tooltip } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { API_URL } from '../../../../config-global';
import Image from '../../../../components/image';

export default function LandlordCrm() {
  const { userId } = useParams();
  const [properties, setProperties] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [income, setIncome] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [estimatedIncome, setEstimatedIncome] = useState(0);

  const handleToggle = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  useEffect(() => {
    const getProperties = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { data } = await axios.get(
          `${API_URL}/c_panel/business_report/landlord_properties/${userId}`
        );
        setProperties(data?.propertiesIncomeData);
        setIncome(data?.totalIncomeAcrossAllProperties);
        setEstimatedIncome(data?.estimatedAnnualIncomeAllProperties);
      } catch (error) {
        setIsError(true);
        toast.error(error?.response?.data?.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    getProperties();
  }, [userId]);

  return (
    <Container sx={{ my: 5 }}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 4, color: '#333' }}>
        Landlord Properties
      </Typography>

      <Grid container spacing={3}>
        {!isLoading &&
          !isError &&
          properties.map((property, index) => (
            <Grid item xs={12} sm={6} md={4} key={property._id}>
              <Card
                sx={{
                  padding: 3,
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: '0.3s',
                  '&:hover': { boxShadow: 6 },
                }}
              >
                <Box>
                  <Box
                    sx={{
                      border: '1px solid #ccc',
                      width: '100%',
                      height: 200,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 2,
                      overflow: 'hidden',
                      borderRadius: 1,
                    }}
                  >
                    <Image
                      src={property?.images[0]}
                      alt="Property Image"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {property?.propertyName || 'Property Name'}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Units:</strong> {property?.actualIncomePerUnit?.length}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Income:</strong> {property?.totalActualIncome || 0}k
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Estimated Income:</strong> {property?.totalEstimatedAnnualIncome || 0}k
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: '#1976d2' }}
                  >
                    UNITS
                  </Typography>
                  <Grid container spacing={2}>
                    {(expanded[index]
                      ? property.actualIncomePerUnit
                      : property.actualIncomePerUnit.slice(0, 1)
                    ).map((unit) => (
                      <Grid item xs={12} key={unit.unitId}>
                        <Box
                          sx={{
                            border: '1px solid #ddd',
                            padding: 2,
                            borderRadius: 1,
                            marginBottom: 2,
                            backgroundColor: '#f5f5f5',
                            boxShadow: 1,
                          }}
                        >
                          <Typography variant="body2">
                            <strong>Unit ID:</strong> {unit.unitId}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Income:</strong> {unit?.actualMonthlyIncome}k
                          </Typography>
                          <Typography variant="body2">
                            <strong>Estimated:</strong> {unit?.estimatedAnnualIncome}k
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  {property?.actualIncomePerUnit.length > 1 && (
                    <Box textAlign="center" marginTop={2}>
                      <Button variant="outlined" size="small" onClick={() => handleToggle(index)}>
                        {expanded[index] ? 'See Less' : 'See More'}
                      </Button>
                    </Box>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}

        {isLoading &&
          Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ padding: 3, minHeight: '450px' }}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton width="60%" height={30} sx={{ my: 2 }} />
                <Skeleton width="80%" height={20} />
                <Skeleton width="40%" height={20} />
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" height={20} />
              </Card>
            </Grid>
          ))}

        {isError && (
          <Grid item xs={12}>
            <Typography variant="h6" color="error" textAlign="center">
              Failed to load data.
            </Typography>
            <Grid container spacing={3}>
              {Array.from(new Array(3)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ padding: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Dummy Property {index + 1}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Units: {Math.floor(Math.random() * 10) + 1}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Income: 0k
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Estimated Income: 0k
                    </Typography>
                    <Typography variant="body2">
                      This is a dummy property used for display purposes when the API call fails.
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
      <Toaster />
    </Container>
  );
}
