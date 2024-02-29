/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// @mui
import { Container, Grid, Card, Stack, Box, Typography } from '@mui/material';
import { useSettingsContext } from '../../../components/settings';
import { fCurrency } from '../../../utils/formatNumber';
import { fDate } from '../../../utils/formatTime';
import { useDispatch, useSelector } from '../../../redux/store';
import { getUserRentPayments } from '../../../redux/slices/userCPanel';
import { NoDataFoundCard } from './UserBookings';
import { LoadingSection } from '../../../components/loading';

export default function UserRentPayments() {
  const { themeStretch } = useSettingsContext();
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRentPayments(userId));
  }, [dispatch, userId]);

  const { userRentPayments, isLoading } = useSelector((store) => store.userCPanel) || {
    userRentPayments: [],
    isLoading: true,
  }; // Handle initial state

  return (
    <>
      <Helmet>
        <title> Rent Payments | CRM </title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : '90%'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ padding: 2 }}>
              <Typography variant="h6">Rent Payments</Typography>
            </Card>
          </Grid>
          {isLoading && !userRentPayments?.length ? (
            <Grid item xs={12}>
              <LoadingSection count={4} />
            </Grid>
          ) : !isLoading && !userRentPayments.length ? (
            <Grid item xs={12}>
              <NoDataFoundCard label="payments" />
            </Grid>
          ) : (
            userRentPayments.map((payment) => (
              <Grid item xs={12} sm={6} md={4} key={payment._id}>
                <RentPaymentCard payment={payment} style={{ height: '100%' }} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
}

export function RentPaymentCard({ payment }) {
  const { objectId, createdAt } = payment || {};
  return (
    <Card sx={{ padding: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography
            sx={{
              maxWidth: '176px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {objectId?.adUnitCode || 'N/A'}, {objectId?.ad?.address?.buildingName || 'N/A'}
          </Typography>
          <Typography>Paid By {objectId?.client?.fullName || 'N/A'}</Typography>
          <Typography>{fDate(createdAt) || 'N/A'}</Typography>
        </Box>
        <Box>
          <Typography>{objectId?.paymentMethod || 'N/A'}</Typography>
          <Typography variant="h6">{fCurrency(objectId?.rentFee) || 0} AED</Typography>
        </Box>
      </Stack>
    </Card>
  );
}

RentPaymentCard.propTypes = {
  payment: PropTypes.object.isRequired,
};
