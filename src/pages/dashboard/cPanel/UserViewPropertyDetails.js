/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Container, Grid, Stack, Card, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { useDispatch, useSelector } from '../../../redux/store';
import { getPropertyDetails } from '../../../redux/slices/userCPanel';

// components
import { useSettingsContext } from '../../../components/settings';
import { BookingBookedRoom, AppCurrentDownload } from '../../../sections/@dashboard/general/app';
import { CardLoading, CardStackLoading, LoadingSection } from '../../../components/loading';
import { LiveTime } from '../../../components/time';
import { PATH_DASHBOARD } from '../../../routes/paths';

// assets
// import { BedSpaceIllustration } from '../../../assets/illustrations';

export default function UserViewPropertyDetails() {
  const { themeStretch } = useSettingsContext();
  const { propertyId } = useParams();
  const theme = useTheme();

  const dispatch = useDispatch();

  const { propertyDetails, isLoading } = useSelector((store) => store.userCPanel);

  const [bookings, setBookings] = useState({
    Active: 0,
    Pending: 0,
    Cancelled: 0,
  });
  const [bookingCharges, setBookingCharges] = useState({
    rentFee: 0,
    vat: 0,
  });

  const [unitsDetails, setUnitsDetails] = useState({
    availableUnits: 0,
    bookedUnits: 0,
    bedSpace: 0,
    masterRoom: 0,
    room: 0,
    partition: 0,
  });

  const unitsData = (property) => {
    const { units } = property;
    const currentDate = new Date();
    const bookedUnits = units?.filter(
      (unit) => !unit?.availabilityDate || new Date(unit?.availabilityDate) >= currentDate
    );
    const availableUnits = units?.filter(
      (unit) => unit?.availabilityDate && new Date(unit?.availabilityDate) < currentDate
    );
    const bedSpace = units?.filter((unit) => unit.type === 'Bed Space')?.length;
    const masterRoom = units?.filter((unit) => unit.type === 'Master Room')?.length;
    const room = units?.filter((unit) => unit.type === 'Regular Room')?.length;
    const partition = units?.filter((unit) => unit.type === 'Partition')?.length;
    setUnitsDetails({
      availableUnits: availableUnits?.length,
      bookedUnits: bookedUnits?.length,
      bedSpace,
      masterRoom,
      room,
      partition,
    });
  };
  const getBookingsData = (bookingsData) => {
    const bookingObj = {};
    bookingsData?.forEach((booking) => {
      if (!bookingObj[booking?.status]) bookingObj[booking?.status] = 0;

      bookingObj[booking.status] += 1;
    });
    setBookings((prev) => ({ ...prev, ...bookingObj }));

    bookingsData?.forEach((booking) => {
      const { rentFee, vatPercentage } = booking;
      const vat = (vatPercentage * rentFee) / 100;
      setBookingCharges({ vat, rentFee });
    });
  };

  // bookings data
  useEffect(() => {
    if (propertyDetails && propertyDetails?.property) unitsData(propertyDetails.property);

    if (propertyDetails && propertyDetails.bookings) {
      if (propertyDetails.bookings?.length === 0) {
        setBookings({ Active: 0, Pending: 0, Cancelled: 0 });
        setBookingCharges({ rentFee: 0, vat: 0 });
      } else {
        getBookingsData(propertyDetails.bookings);
      }
    }
  }, [propertyDetails, propertyDetails?.bookings]);

  useEffect(() => {
    dispatch(getPropertyDetails(propertyId));
  }, [propertyId, dispatch]);

  return (
    <>
      <Helmet>
        <title>View Property Details | CRM</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : '90%'}>
        {isLoading ? (
          <LoadingSection />
        ) : (
          <Grid container spacing={3}>
            <Grid item sx={12} sm={6} md={3}>
              <Card sx={{ padding: 2 }}>
                <Typography sx={{ whiteSpace: 'nowrap' }}>
                  Property Id: {propertyDetails?.property?.standardCode}
                </Typography>
              </Card>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Card sx={{ padding: 2 }}>
                <Typography sx={{ whiteSpace: 'nowrap' }}>
                  Available Units: {unitsDetails.availableUnits}
                </Typography>
              </Card>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Card sx={{ padding: 2 }}>
                <Typography sx={{ whiteSpace: 'nowrap' }}>
                  Booked Units: {unitsDetails.bookedUnits}
                </Typography>
              </Card>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <LiveTime />
            </Grid>

            <Grid item container xs={12} md={4} spacing={3} sx={{ height: 440 }}>
              <Grid item container xs={12} md={8} spacing={3}>
                <Grid item xs={6}>
                  <Card sx={{ padding: 2, background: '#BD02FE' }}>
                    <Typography textAlign="center">Bed Space</Typography>
                    <Typography variant="h5" textAlign="center">
                      {unitsDetails.bedSpace || 0}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ padding: 2, background: 'orange' }}>
                    <Typography textAlign="center">Master Room</Typography>
                    <Typography variant="h5" textAlign="center">
                      {unitsDetails.masterRoom || 0}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ padding: 2, background: 'orange' }}>
                    <Typography textAlign="center">Room</Typography>
                    <Typography variant="h5" textAlign="center">
                      {unitsDetails.room || 0}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ padding: 2, background: '#BD02FE' }}>
                    <Typography textAlign="center">Partition</Typography>
                    <Typography variant="h5" textAlign="center">
                      {unitsDetails.partition || 0}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>

              <Grid item container xs={12} md={4} spacing={3}>
                <Grid item xs={12}>
                  <Card sx={{ padding: 2, background: '#BD02FE' }}>
                    <Typography textAlign="center">Property Nationality</Typography>
                    <Typography variant="h5" textAlign="center">
                      {propertyDetails?.property?.preferences?.nationality
                        ? propertyDetails?.property?.preferences?.nationality
                        : 'N/A'}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card sx={{ padding: 2, background: 'orange' }}>
                    <Typography textAlign="center">Gender</Typography>
                    <Typography variant="h5" textAlign="center">
                      {propertyDetails?.property?.preferences?.gender
                        ? propertyDetails?.property?.preferences?.gender
                        : 'N/A'}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                {isLoading ? (
                  <CardLoading height={300} />
                ) : (
                  <BookingBookedRoom
                    title="Booked Room"
                    data={[
                      {
                        status: 'Pending',
                        value: bookings?.Pending || 0,
                        quantity: bookings?.Pending || 0,
                      },
                      {
                        status: 'Active',
                        value: bookings?.Active || 0,
                        quantity: bookings?.Active || 0,
                      },
                      {
                        status: 'Cancelled',
                        value: bookings?.Cancelled || 0,
                        quantity: bookings?.Cancelled || 0,
                      },
                    ]}
                  />
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              {isLoading ? (
                <CardLoading height={500} />
              ) : (
                <AppCurrentDownload
                  title="Booking Fees"
                  height={440}
                  chart={{
                    colors: [
                      theme.palette.primary.main,
                      theme.palette.warning.main,
                      theme.palette.warning.dark,
                    ],
                    series: [
                      {
                        label: 'Rent',
                        value: bookingCharges.rentFee,
                      },
                      { label: 'VAT', value: bookingCharges.vat },
                    ],
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {isLoading && !propertyDetails?.property?.length ? (
                <CardStackLoading count={4} />
              ) : !isLoading && !propertyDetails?.property?.units?.length ? (
                <Card sx={{ padding: 2 }}>
                  <Typography textAlign="center" variant="h6">
                    No Units Found
                  </Typography>
                </Card>
              ) : (
                <Stack spacing={3}>
                  {propertyDetails?.property?.units?.map((unit) => (
                    <UnitDetailsCard
                      unit={unit}
                      property={propertyDetails?.property}
                      key={unit?._id}
                    />
                  ))}
                </Stack>
              )}
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}

UnitDetailsCard.propTypes = {
  unit: PropTypes.object,
  property: PropTypes.object,
};

export function UnitDetailsCard({ unit, property }) {
  const navigate = useNavigate();
  const availabilityDate = unit?.availabilityDate ? new Date(unit.availabilityDate) : null;
  const currentDate = new Date();
  const unAvailable = availabilityDate && availabilityDate >= currentDate;

  return (
    <Card sx={{ padding: 2 }}>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack spacing={2}>
          <Typography>Unit Code: </Typography>
          <Typography>Available: </Typography>
          <Typography>Booked: </Typography>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <Typography>{unit.code}</Typography>
          <Typography>{!unAvailable ? <CheckIcon color="primary" /> : ''}</Typography>
          <Typography>{unAvailable ? <ClearIcon color="error" /> : ''}</Typography>
        </Stack>
        <Stack spacing={2} justifyContent="flex-end">
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              navigate(PATH_DASHBOARD.c_panel.user_view_unit_details, { state: { unit, property } })
            }
          >
            View
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
