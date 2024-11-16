import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../redux/store';
import { getTenantAreaBusinessData } from '../../../redux/slices/businessReport';
import {
  Commercials,
  CustomerNationality,
  CustomersMonthlyGrowth,
  PropertyViews,
  RoommatesMatch,
  Services,
  TenantsInformation,
  UnitsInformation,
} from '../../../sections/@dashboard/cPanel/businessReport/tenant/AreaBusinessReport';

export default function TenantAreaBusinessReport() {
  const dispatch = useDispatch();
  const { area, userId } = useParams();

  const { tenantAreaBusinessReport } = useSelector((store) => store.businessReport);

  useEffect(() => {
    dispatch(getTenantAreaBusinessData(userId, area));
  }, [dispatch, userId, area]);

  const getBudget = () => {
    let budget = 0;

    tenantAreaBusinessReport?.properties
      ?.flatMap((property) => property?.units || [])
      .forEach((unit) => {
        if (unit.monthlyPrice && budget <= unit.monthlyPrice) {
          budget = unit.monthlyPrice;
        }
      });

    return budget;
  };

  return (
    <>
      <Helmet>
        <title>Tenant Area Business Report</title>
      </Helmet>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack>
              <Typography textAlign="center" variant="h5" sx={{ padding: 2 }}>
                {area} Business Report
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TenantsInformation
              title="Total Tenant Number"
              data={tenantAreaBusinessReport?.tenantsCount || {}}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <UnitsInformation
              title="Units Information"
              data={tenantAreaBusinessReport?.averageUnitPrices || {}}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomersMonthlyGrowth
              title="Customers Monthly Growth"
              data={tenantAreaBusinessReport?.monthlyGrowth || 0}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomerNationality
              title="Customer Nationalities"
              data={tenantAreaBusinessReport?.customerNationalities || {}}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <PropertyViews
              title="Property Views"
              data={tenantAreaBusinessReport?.properties || []}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <RoommatesMatch
              title="Roommates match your Property"
              area={area}
              budget={getBudget()}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Commercials
              title="Commercial Title"
              description="Commercial Description"
              action={<Button>Go Now</Button>}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Services />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
