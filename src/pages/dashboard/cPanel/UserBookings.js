import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// @mui
import { Container, Grid, Card, Button, Typography, Stack, Box } from '@mui/material';

import { useSettingsContext } from '../../../components/settings';
import PercentagePieChart from '../../../components/chart/PercentagePieChart';
import { getUserBookings } from '../../../redux/slices/userCPanel';
import { useDispatch, useSelector } from '../../../redux/store';
import { fCurrency } from '../../../utils/formatNumber';
import { LoadingSection } from '../../../components/loading';
import { PATH_DASHBOARD } from '../../../routes/paths';

export default function UserBookings() {
  const { themeStretch } = useSettingsContext();
  const defaultValues = {
    Active: [],
    Pending: [],
    Cancelled: [],
    activePercentage: 0,
    pendingPercentage: 0,
    cancelledPercentage: 0,
    activeRentFee: 0,
    pendingRentFee: 0,
    cancelledRentFee: 0,
  };

  const navigate = useNavigate();

  const { userId } = useParams();

  const dispatch = useDispatch();

  const { userBookings, isLoading } = useSelector((store) => store.userCPanel);

  const [bookingStatus, setBookingStatus] = useState(defaultValues);

  const calculateRentFee = (bookings) => {
    const fee = bookings.reduce((acc, { rentFee }) => acc + rentFee, 0);
    return fee;
  };

  const calculatePercentages = (bookings) => {
    const percentageObj = { Active: [], Pending: [], Cancelled: [] };
    bookings.forEach((booking) => {
      if (!percentageObj[booking.status]) percentageObj[booking.status] = [];

      percentageObj[booking.status].push(booking);
    });
    const activePercentage = (percentageObj.Active.length / bookings.length) * 100 || 0;
    const pendingPercentage = (percentageObj.Pending.length / bookings.length) * 100 || 0;
    const cancelledPercentage = (percentageObj.Cancelled.length / bookings.length) * 100 || 0;

    const activeRentFee = calculateRentFee(percentageObj.Active);
    const pendingRentFee = calculateRentFee(percentageObj.Pending);
    const cancelledRentFee = calculateRentFee(percentageObj.Cancelled);
    Object.assign(percentageObj, {
      activePercentage,
      pendingPercentage,
      cancelledPercentage,
      activeRentFee,
      pendingRentFee,
      cancelledRentFee,
    });

    return percentageObj;
  };

  useEffect(() => {
    if (userBookings && userBookings.length > 0) {
      setBookingStatus((prev) => ({ ...prev, ...calculatePercentages(userBookings) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userBookings]);

  useEffect(() => {
    dispatch(getUserBookings(userId));
  }, [dispatch, userId]);

  const handleNavigateToBookingHistory = () => {
    navigate(PATH_DASHBOARD.c_panel.user_booking_history(userId));
  };

  return (
    <Container maxWidth={themeStretch ? false : '90%'}>
      {isLoading ? (
        <LoadingSection />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button color="error" variant="contained" onClick={handleNavigateToBookingHistory}>
              History of Bookings
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <BookingStatusDetails
              title="Pending"
              color="#FFA500"
              bookings={bookingStatus.Pending}
              percentage={bookingStatus.pendingPercentage}
              rentFee={bookingStatus.pendingRentFee}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <BookingStatusDetails
              title="Active"
              color="#008000"
              bookings={bookingStatus.Active}
              percentage={bookingStatus.activePercentage}
              rentFee={bookingStatus.activeRentFee}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <BookingStatusDetails
              title="Cancelled"
              color="#FF0000"
              bookings={bookingStatus.Cancelled}
              percentage={bookingStatus.cancelledPercentage}
              rentFee={bookingStatus.cancelledRentFee}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

UnitBookingCard.propTypes = {
  booking: PropTypes.object,
};

export function UnitBookingCard({ booking }) {
  const { adUnitCode, ad, standardCode, client, paymentMethod, rentFee } = booking;
  return (
    <Card sx={{ padding: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography>
            {adUnitCode || 'N/A'}, {ad?.address?.buildingName || 'N/A'}
          </Typography>
          <Typography>{standardCode || 'N/A'}</Typography>
          <Typography>{client?.standardCode || 'N/A'}</Typography>
        </Box>
        <Box>
          <Typography>{paymentMethod || 'N/A'}</Typography>
          <Typography variant="h6">{fCurrency(rentFee) || 0} AED</Typography>
        </Box>
      </Stack>
    </Card>
  );
}

NoDataFoundCard.propTypes = {
  label: PropTypes.string,
};

export function NoDataFoundCard({ label }) {
  return (
    <Card sx={{ padding: 2 }}>
      <Typography textAlign="center" variant="h6">
        No {label} found
      </Typography>
    </Card>
  );
}

BookingStatusDetails.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  bookings: PropTypes.array,
  percentage: PropTypes.number,
  rentFee: PropTypes.number,
};

export function BookingStatusDetails({ title, color, bookings, percentage, rentFee }) {
  const styles = {
    currencyCard: {
      width: 120,
      height: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
  return (
    <Stack spacing={3}>
      <Stack>
        <Card
          sx={{
            backgroundColor: color,
            textAlign: 'center',
          }}
        >
          {title}
        </Card>
        <Card sx={{ padding: 2, height: 135 }}>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Typography variant="h5">{bookings.length}</Typography>
            <PercentagePieChart percent={percentage} colors={[color]} />
            <Card
              sx={{
                ...styles.currencyCard,
                backgroundColor: color,
              }}
            >
              <Typography variant="h6">{fCurrency(rentFee) || 0} AED</Typography>
            </Card>
          </Stack>
        </Card>
      </Stack>
      {!bookings.length ? (
        <NoDataFoundCard label="Units" />
      ) : (
        bookings.map((booking) => <UnitBookingCard booking={booking} />)
      )}
    </Stack>
  );
}
