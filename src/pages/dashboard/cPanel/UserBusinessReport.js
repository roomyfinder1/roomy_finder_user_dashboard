import { Container, Grid, Typography, Card, Select, Box, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { useParams } from 'react-router-dom';
import { useSettingsContext } from '../../../components/settings';

import { useDispatch, useSelector } from '../../../redux/store';

import {
  CustomerMonthlyGrowth,
  CustomerCityInformation,
  CustomerInTheArea,
  AverageUnitPrice,
  ClicksPerPost,
  UnitNumber,
  PostsNumber,
  Memberships,
  CompareClicks,
  GeneralAmenities,
  CompareBookings,
  ComparePrices,
  CompareDeposits,
  CompareAgentCommission,
  PropertiesInArea,
} from '../../../sections/@dashboard/cPanel/businessReport';
import {
  getCompetitorBusinessData,
  getTenantBusinessData,
} from '../../../redux/slices/businessReport';
import { CardLoading } from '../../../components/loading';

export default function UserBusinessReport() {
  const { themeStretch } = useSettingsContext();

  const [selectedCity, setSelectedCity] = useState('');

  const { tenantBusinessReport, isLoading, competitorBusinessReport } = useSelector(
    (store) => store.businessReport
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTenantBusinessData('user'));
    dispatch(getCompetitorBusinessData('user'));
  }, [dispatch]);

  useEffect(() => {
    const cities = Object.keys(competitorBusinessReport);
    setSelectedCity(cities[0]);
  }, [competitorBusinessReport]);

  return (
    <>
      <Helmet>
        <title> Business Report | CRM </title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : '90%'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 2 }}>
              <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
                Tenant
              </Typography>
              <Grid container spacing={3}>
                <Grid item container xs={12}>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="h6">customer Information</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    {isLoading ? (
                      <CardLoading />
                    ) : (
                      <CustomerCityInformation data={tenantBusinessReport?.cityReports || {}} />
                    )}
                  </Grid>
                </Grid>

                <Grid item container xs={12}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Average Unit Price</Typography>
                  </Grid>

                  <Grid item xs={9}>
                    {isLoading ? (
                      <CardLoading />
                    ) : (
                      <AverageUnitPrice data={tenantBusinessReport?.cityReports || {}} />
                    )}
                  </Grid>
                </Grid>

                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Customer Monthly Growth</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    {isLoading ? (
                      <CardLoading />
                    ) : (
                      <CustomerMonthlyGrowth data={tenantBusinessReport?.cityReports || {}} />
                    )}
                  </Grid>
                </Grid>

                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Clicks Per Post</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    {isLoading ? (
                      <CardLoading />
                    ) : (
                      <ClicksPerPost data={tenantBusinessReport?.properties || []} />
                    )}
                  </Grid>
                </Grid>

                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Customers in the Area</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    {isLoading ? (
                      <CardLoading />
                    ) : (
                      <CustomerInTheArea data={tenantBusinessReport?.cityReports || {}} />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* competitor */}
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 2 }}>
              <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
                Competitor
              </Typography>
              <Box sx={{ position: 'absolute', right: 10, top: 10 }}>
                <Select
                  size="small"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  {Object.keys(competitorBusinessReport)?.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Grid container spacing={3}>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Properties in the area</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    {isLoading ? (
                      <CardLoading />
                    ) : (
                      <PropertiesInArea data={competitorBusinessReport[selectedCity]} />
                    )}
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Unit Number</Typography>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    {isLoading ? (
                      <CardLoading />
                    ) : (
                      <UnitNumber data={competitorBusinessReport[selectedCity]} />
                    )}
                  </Grid>
                </Grid>

                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Posts Number</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    {isLoading ? (
                      <CardLoading />
                    ) : (
                      <PostsNumber data={competitorBusinessReport[selectedCity]} />
                    )}
                  </Grid>
                </Grid>

                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Memberships</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    {isLoading ? (
                      <CardLoading />
                    ) : (
                      <Memberships data={competitorBusinessReport[selectedCity]} />
                    )}
                  </Grid>
                </Grid>

                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Compare Clicks</Typography>
                  </Grid>
                  <Grid item container xs={9} spacing={2}>
                    <Grid item xs={12}>
                      {isLoading ? (
                        <CardLoading />
                      ) : (
                        <CompareClicks data={competitorBusinessReport[selectedCity]} />
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                {/* general amenities */}
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="h6">General Amenities</Typography>
                  </Grid>
                  <Grid item container xs={9} spacing={2}>
                    <Grid item xs={12}>
                      {isLoading ? (
                        <CardLoading />
                      ) : (
                        <GeneralAmenities data={competitorBusinessReport[selectedCity]} />
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                {/* compare bookings */}
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Compare Bookings</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    {isLoading ? (
                      <CardLoading />
                    ) : (
                      <CompareBookings data={competitorBusinessReport[selectedCity]} />
                    )}
                  </Grid>
                </Grid>

                {/* compare prices */}
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Compare Prices</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    {isLoading ? (
                      <CardLoading />
                    ) : (
                      <ComparePrices data={competitorBusinessReport[selectedCity]} />
                    )}
                  </Grid>
                </Grid>
                {/* compare deposit */}
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Compare Deposit</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    {isLoading ? (
                      <CardLoading />
                    ) : (
                      <CompareDeposits data={competitorBusinessReport[selectedCity]} />
                    )}
                  </Grid>
                </Grid>
                {/* compare Agent commission */}
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="h6">Compare Agent Commission</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    {isLoading ? (
                      <CardLoading />
                    ) : (
                      <CompareAgentCommission data={competitorBusinessReport[selectedCity]} />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
