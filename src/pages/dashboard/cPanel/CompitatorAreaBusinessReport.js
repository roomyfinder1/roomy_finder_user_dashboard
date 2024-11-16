import { Container, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../redux/store';
import { getCompetitorBusinessData } from '../../../redux/slices/businessReport';
import {
  PropertyViews,
  TenantsInformation,
  UnitsInformation,
} from '../../../sections/@dashboard/cPanel/businessReport/tenant/AreaBusinessReport';
import {
  CompareAgentCommission,
  CompareBookings,
  CompareDeposits,
  ComparePrices,
  GeneralAmenities,
} from '../../../sections/@dashboard/cPanel/businessReport';

export default function CompetitorAreaBusinessReport() {
  const dispatch = useDispatch();
  const { area, userId } = useParams();
  const { competitorBusinessReport } = useSelector((store) => store.businessReport);

  useEffect(() => {
    dispatch(getCompetitorBusinessData('userId', area));
  }, [dispatch, userId, area]);

  return (
    <>
      <Helmet>
        <title>Competitor Area Business Report</title>
      </Helmet>
      <Container>
        <Typography textAlign="center" variant="h5" sx={{ padding: 2 }}>
          {area} Competitor Business Report
        </Typography>

        <Grid container spacing={3}>
          {/* General Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              General Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TenantsInformation
              title="Total Properties Number"
              data={competitorBusinessReport?.propertyPostsCount || {}}
              obj={Object.keys(competitorBusinessReport?.propertyPostsCount || {}).map((key) => ({
                label: key,
                value: competitorBusinessReport?.propertyPostsCount[key],
              }))}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4}>
            <PropertyViews
              title="Property Views"
              data={competitorBusinessReport?.properties || []}
            />
          </Grid> */}
          <Grid item xs={12} sm={6} md={4}>
            <GeneralAmenities amenities={competitorBusinessReport?.amenities || {}} />
          </Grid>

          {/* Financial Metrics */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Financial Metrics
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <UnitsInformation
              title="Average Units Income"
              data={competitorBusinessReport?.averageUnitsIncome || {}}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ComparePrices prices={competitorBusinessReport?.prices || []} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CompareDeposits deposits={competitorBusinessReport?.deposits || []} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CompareAgentCommission commission={competitorBusinessReport?.agentCommission || []} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CompareBookings bookings={competitorBusinessReport?.bookings || []} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
