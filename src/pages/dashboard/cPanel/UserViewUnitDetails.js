import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// @mui
import {
  Container,
  Grid,
  Card,
  Typography,
  Stack,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
  TableSkeleton,
} from '../../../components/table';
import { useSettingsContext } from '../../../components/settings';
import { LiveTime } from '../../../components/time';
import Scrollbar from '../../../components/scrollbar';
import { getUnitBookings } from '../../../redux/slices/userCPanel';
import { useDispatch, useSelector } from '../../../redux/store';
import { fDateTime } from '../../../utils/formatTime';
import UnitBookingCalenderWithLineStrikeOut from '../../../sections/@dashboard/cPanel/UnitBookingsCalender';
import { LoadingSection } from '../../../components/loading';

const TABLE_HEAD = [
  { id: 'Tenant Id', label: 'Tenant Id' },
  { id: 'Check In', label: 'Check In' },
  { id: 'Check Out', label: 'Check Out' },
  { id: 'Status', label: 'Status' },
  { id: 'Booking ID', label: 'Booking ID' },
  { id: 'Rent Price', label: 'Rent Price' },
];

export default function UserViewUnitDetails() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const { unitBookings, isLoading } = useSelector((store) => store.userCPanel);
  const d = new Date(new Date().getYear(), new Date().getMonth() + 1, 0);
  const [monthBookingsDays, setMonthBookingsDays] = useState({
    available: d.getDate(),
    booked: 0,
  });
  const [unitBookingIncome, setUnitBookingIncome] = useState(0);
  const [monthUnitBookings, setMonthUnitBookings] = useState(0);

  const { state } = useLocation();

  const { property, unit } = state;

  const dataFiltered = unitBookings;

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !unitBookings?.length;

  const calculateMonthIncome = (bookings) =>
    bookings.reduce((acc, booking) => acc + booking.rentFee, 0);

  const getThisMonthBookingsCount = (bookings) =>
    bookings.reduce((acc, booking) => {
      const bookingMonth = new Date(booking.checkIn).getMonth();
      const currentMonth = new Date().getMonth();

      if (bookingMonth === currentMonth) {
        return acc + 1;
      }
      return acc;
    }, 0);

  const calculateBookingDays = (bookings) => {
    let totalBookingDays = 0;
    const targetMonth = new Date().getMonth(); // Get the current month

    // Assuming bookings is an array containing booking objects
    bookings.forEach((booking) => {
      const { checkIn, checkOut } = booking;

      // Convert checkIn and checkOut dates to JavaScript Date objects
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      // Check if the booking is within the target month
      const bookingMonth = checkInDate.getMonth();
      const bookingYear = checkInDate.getFullYear();

      if (bookingMonth === targetMonth) {
        // If check-out date is in the next month, limit the check-out date to the last day of the target month
        if (checkOutDate.getMonth() !== targetMonth) {
          const lastDayOfMonth = new Date(bookingYear, targetMonth + 1, 0).getDate();
          if (checkInDate.getDate() === lastDayOfMonth) {
            totalBookingDays += 1;
          } else {
            const daysInBetween = Math.abs(checkInDate.getDate() - lastDayOfMonth);
            totalBookingDays += daysInBetween;
          }
        } else {
          // Calculate the number of days booked within the target month
          const daysBooked = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
          totalBookingDays += daysBooked;
        }
      }
    });

    const totalDaysInTheMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();
    const totalAvailableDays = totalDaysInTheMonth - totalBookingDays;
    return { available: totalAvailableDays, booked: totalBookingDays };
  };

  useEffect(() => {
    dispatch(getUnitBookings(property._id, unit.code));
  }, [dispatch, property, unit]);

  useEffect(() => {
    if (unitBookings.length) {
      setUnitBookingIncome(calculateMonthIncome(unitBookings));
      setMonthBookingsDays(calculateBookingDays(unitBookings));
      setMonthUnitBookings(getThisMonthBookingsCount(unitBookings));
    }
  }, [unitBookings]);

  return (
    <>
      <Helmet>
        <title>Unit Details | CRM</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : '90%'}>
        {isLoading ? (
          <LoadingSection count={6} />
        ) : (
          <Grid container spacing={3}>
            <Grid item container xs={12} justifyContent="space-between">
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ padding: 3 }}>
                  <Typography textAlign="center">Property Id: {property?.standardCode}</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <LiveTime />
              </Grid>
            </Grid>
            <Grid item container xs={12} justifyContent="space-between">
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ padding: 3 }}>
                  <Typography>Unit Code: {unit?.code}</Typography>
                  <Typography>Available: {monthBookingsDays.available} Days</Typography>
                  <Typography>Booked: {monthBookingsDays.booked} Days</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Stack spacing={2}>
                  <Card sx={{ padding: 2 }}>
                    <Typography textAlign="center">
                      Unit Month Income: {unitBookingIncome} AED
                    </Typography>
                  </Card>
                  <Card sx={{ padding: 2 }}>
                    <Typography textAlign="center">
                      Unit Month bookings: {monthUnitBookings}
                    </Typography>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <UnitBookingCalenderWithLineStrikeOut
                bookings={unitBookings}
                month={new Date().getMonth()}
              />
            </Grid>
            <Grid item xs={6}>
              <UnitBookingCalenderWithLineStrikeOut
                bookings={unitBookings}
                month={new Date().getMonth() + 1}
              />
              {/* <UnitBookingCalendar bookings={unitBookings} month={new Date().getMonth() + 2} /> */}
            </Grid>

            <Grid item xs={12}>
              <Card>
                <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                  <TableSelectedAction dense={dense} rowCount={unitBookings?.length} />

                  <Scrollbar>
                    <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                      <TableHeadCustom
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={unitBookings?.length}
                        numSelected={selected?.length}
                        onSort={onSort}
                        onSelectAllRows={(checked) =>
                          onSelectAllRows(
                            checked,
                            unitBookings?.map((row) => row.id)
                          )
                        }
                      />
                      {isLoading && !unitBookings.length ? (
                        <>
                          <TableSkeleton key={1} />
                          <TableSkeleton key={2} />
                        </>
                      ) : (
                        <TableBody>
                          {dataFiltered
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                              <BookingTableRow key={row._id} row={row} />
                            ))}

                          <TableEmptyRows
                            height={denseHeight}
                            emptyRows={emptyRows(page, rowsPerPage, unitBookings?.length)}
                          />

                          <TableNoData isNotFound={isNotFound} />
                        </TableBody>
                      )}
                    </Table>
                  </Scrollbar>
                </TableContainer>
                <TablePaginationCustom
                  count={dataFiltered?.length}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  onPageChange={onChangePage}
                  onRowsPerPageChange={onChangeRowsPerPage}
                  //
                  dense={dense}
                  onChangeDense={onChangeDense}
                />
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}

BookingTableRow.propTypes = {
  row: PropTypes.object,
};
export function BookingTableRow({ row }) {
  const { client, checkIn, checkOut, status, standardCode, rentFee } = row;
  return (
    <>
      {row && (
        <TableRow>
          <TableCell>{client?.standardCode || 'N/A'}</TableCell>
          <TableCell>{fDateTime(checkIn) || 'N/A'}</TableCell>
          <TableCell>{fDateTime(checkOut) || 'N/A'}</TableCell>
          <TableCell>{status || 'N/A'}</TableCell>
          <TableCell>{standardCode || 'N/A'}</TableCell>
          <TableCell>{rentFee || 'N/A'}</TableCell>
        </TableRow>
      )}
    </>
  );
}
