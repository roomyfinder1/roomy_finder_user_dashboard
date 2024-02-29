import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Card,
  Table,
  TableBody,
  Container,
  TableContainer,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';

// components
import Scrollbar from '../../../components/scrollbar';
import { useSettingsContext } from '../../../components/settings';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../components/table';
// sections

// redux
import { useSelector, useDispatch } from '../../../redux/store';
import { getUserBookings } from '../../../redux/slices/userCPanel';
import { fDate, fDateTime } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
import { LoadingSkeleton } from '../../../components/loading-screen';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Booking Id', label: 'Booking Id', align: 'left' },
  { id: 'Booking Date', label: 'Booking Date', align: 'left' },
  { id: 'Check In', label: 'Check In', align: 'left' },
  { id: 'Check Out', label: 'Check Out', align: 'left' },
  { id: 'Property Id', label: 'Property Id', align: 'left' },
  { id: 'Unit Type', label: 'Unit Type', align: 'left' },
  { id: 'Tenant Name', label: 'Tenant Name', align: 'left', width: 100 },
  { id: 'Rent Price', label: 'Rent Price', align: 'left' },
  { id: 'Payment Type', label: 'Payment Type', align: 'left' },
  { id: 'Vat', label: 'Vat', align: 'left' },
];
// ----------------------------------------------------------------------

export default function UserBookingHistory() {
  const dispatch = useDispatch();

  const { userId } = useParams();
  const {
    dense,
    page,
    rowsPerPage,
    //
    selected,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { userBookings, isLoading } = useSelector((store) => store.userCPanel);

  const { themeStretch } = useSettingsContext();

  const dataFiltered = userBookings;

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered?.length;

  useEffect(() => {
    dispatch(getUserBookings(userId));
  }, [dispatch, userId]);

  return (
    <>
      <Helmet>
        <title> History of Bookings | CRM</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : '90%'}>
        <Card>
          <Typography variant="h5" sx={{ my: 2 }}>
            History of Bookings
          </Typography>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected?.length}
              rowCount={userBookings?.length}
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />
                {isLoading && !userBookings.length ? (
                  <LoadingSkeleton rows={10} columns={5} />
                ) : (
                  <TableBody>
                    {dataFiltered
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <BookingHistoryRow key={row._id} row={row} />
                      ))}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(page, rowsPerPage, userBookings?.length)}
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
      </Container>
    </>
  );
}

BookingHistoryRow.propTypes = {
  row: PropTypes.object,
};
export function BookingHistoryRow({ row }) {
  const {
    standardCode,
    createdAt,
    checkIn,
    checkOut,
    ad,
    adUnitCode,
    client,
    rentFee,
    paymentMethod,
    vatPercentage,
  } = row;
  return (
    <TableRow hover>
      <TableCell>{standardCode || 'N/A'}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDateTime(createdAt) || 'N/A'}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDate(checkIn) || 'N/A'}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDate(checkOut) || 'N/A'}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{ad?.standardCode || 'N/A'}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{adUnitCode || 'N/A'}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{client?.fullName || 'N/A'}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fCurrency(rentFee)} AED</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{paymentMethod || 'N/A'}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {fCurrency((vatPercentage * rentFee) / 100) || 'N/A'} AED
      </TableCell>
    </TableRow>
  );
}
