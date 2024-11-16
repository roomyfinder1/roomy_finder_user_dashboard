import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// @mui
import {
  Container,
  Card,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';

import { useSettingsContext } from '../../../components/settings';
import Scrollbar from '../../../components/scrollbar';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  emptyRows,
  useTable,
} from '../../../components/table';
import { LoadingSkeleton } from '../../../sections/@dashboard/general/app';
import { useDispatch, useSelector } from '../../../redux/store';
import { getUserNotifications } from '../../../redux/slices/userCPanel';
import { fDateTime } from '../../../utils/formatTime';

const TABLE_HEAD = [
  { id: 'Title', label: 'Title', align: 'left' },
  { id: 'Body', label: 'Body', align: 'left' },
  { id: 'Send at', label: 'Send at', align: 'left' },
];

export default function UserNotifications() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { themeStretch } = useSettingsContext();

  const { userNotifications, isLoading } = useSelector((store) => store.userCPanel);

  const {
    dense,
    page,
    rowsPerPage,
    //

    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const dataFiltered = userNotifications;

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered?.length;

  useEffect(() => {
    dispatch(getUserNotifications(userId));
  }, [dispatch, userId]);

  return (
    <Container maxWidth={themeStretch ? false : '90%'}>
      <Card>
        <Typography sx={{ px: 2, py: 1 }}>Notifications</Typography>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
              <TableHeadCustom headLabel={TABLE_HEAD} />
              {isLoading && !userNotifications.length ? (
                <LoadingSkeleton rows={3} columns={4} />
              ) : (
                <TableBody>
                  {dataFiltered
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <NotificationTableRow key={row._id} row={row} />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, userNotifications?.length)}
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
  );
}

NotificationTableRow.propTypes = {
  row: PropTypes.object,
};

export function NotificationTableRow({ row }) {
  return (
    <TableRow>
      <TableCell>{row?.title || 'N/A'}</TableCell>
      <TableCell>{row?.body || 'N/A'}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDateTime(row?.createdAt) || 'N/A'}</TableCell>
    </TableRow>
  );
}
