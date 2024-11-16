import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import {
  Card,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Typography,
  Box,
  IconButton,
  Popover,
  Button,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useDispatch, useSelector } from '../../../../redux/store';
// components
import Scrollbar from '../../../../components/scrollbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../../components/table';
// sections
import { UserTableToolbar } from '../../accounts/Landlord/list';
import LoadingSkeleton from '../../statstics/UserIncomeProgress/LoadingSkeleton';
import { getUsersPromoCodes } from '../../../../redux/slices/promoCodes';
import axiosInstance from '../../../../utils/axios';
import { useSnackbar } from '../../../../components/snackbar';
import { API_URL } from '../../../../config-global';

// ----------------------------------------------------------------------

const ROLE_OPTIONS = [
  'all',
  'ux designer',
  'full stack designer',
  'backend developer',
  'project manager',
  'leader',
  'ui designer',
  'ui/ux designer',
  'front end developer',
  'full stack developer',
];

const TABLE_HEAD = [
  { id: 'Promo Code', label: 'Promo Code', align: 'left' },
  { id: 'Users Count', label: 'Users Count', align: 'left' },
  { id: 'Usage', label: 'Usage', align: 'left' },
  { id: 'Post Type', label: 'Post Type', align: 'left' },
  { id: 'Premium', label: 'Premium', align: 'left' },
  { id: 'Status', label: 'Status', align: 'left' },
  { id: 'Expires ON', label: 'Expires On', align: 'left' },
  { id: 'extra', label: '', align: 'left' },
];
// ----------------------------------------------------------------------

export default function UsersPromoCodes() {
  const dispatch = useDispatch();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangeRowsPerPage,
  } = useTable();

  const { usersPromoCodes, isLoading } = useSelector((store) => store.promoCodes);

  const [filterName, setFilterName] = useState('');

  const dataFiltered = usersPromoCodes.users;

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName('');
  };

  useEffect(() => {
    let timer = null;
    if (filterName === '') {
      dispatch(getUsersPromoCodes({ page: 0, limit: rowsPerPage, filterName }));
    } else {
      timer = setTimeout(() => {
        dispatch(getUsersPromoCodes({ page: 0, limit: rowsPerPage, filterName }));
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, rowsPerPage, filterName]);

  // page change
  const onChangePage = (e, newPage) => {
    console.log(newPage);
    dispatch(getUsersPromoCodes({ page: newPage, limit: rowsPerPage, filterName }));
  };

  console.log(usersPromoCodes);

  return (
    <Card>
      <UserTableToolbar
        filterName={filterName}
        optionsRole={ROLE_OPTIONS}
        onFilterName={handleFilterName}
        onResetFilter={handleResetFilter}
      />

      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <TableSelectedAction
          dense={dense}
          numSelected={selected?.length}
          rowCount={usersPromoCodes?.total}
          onSelectAllRows={(checked) =>
            onSelectAllRows(
              checked,
              usersPromoCodes?.users?.map((row) => row.id)
            )
          }
        />

        <Scrollbar>
          <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={usersPromoCodes?.total}
              numSelected={selected?.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  usersPromoCodes?.users?.map((row) => row.id)
                )
              }
            />
            {isLoading ? (
              <LoadingSkeleton rows={4} columns={3} />
            ) : (
              <TableBody>
                {dataFiltered
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <NotificationTableRow key={`${row.id}`} row={row} />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, usersPromoCodes?.total)}
                />

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            )}
          </Table>
        </Scrollbar>
      </TableContainer>
      <TablePaginationCustom
        count={usersPromoCodes?.total || 0}
        page={usersPromoCodes?.currentPage || 0}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        //
        dense={dense}
        onChangeDense={onChangeDense}
      />
    </Card>
  );
}

export function filterUser({ inputData, filterName }) {
  if (filterName) {
    inputData = inputData.filter(
      (data) =>
        data.title.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        data.body.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }
  return inputData;
}

NotificationTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  userNotification: PropTypes.bool,
};

export function NotificationTableRow({ row, selected, userNotification }) {
  const { code, isPremium, status, users, expireAt, postType, maxNumberOfUsage } = row;
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'user-id-popover' : undefined;

  const sendNotification = async (promoCode, allUsers) => {
    try {
      enqueueSnackbar('Notification was being sent');

      const { data } = await axiosInstance.post(
        `${API_URL}/promo_code/send_promo_code_notification`,
        { code: promoCode, users: allUsers }
      );

      if (data) {
        enqueueSnackbar('Notification was sent');
      }
      console.log(data);
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || 'Something went wrong', {
        variant: 'error',
      });
    }
  };

  return (
    <TableRow key={row.id} hover selected={selected}>
      <TableCell>{code}</TableCell>
      <TableCell>
        <Typography
          onClick={handleClick}
          sx={{ whiteSpace: 'noWrap', display: 'flex', alignItems: 'center' }}
        >
          {users?.length >= 1 && (
            <IconButton>
              {users?.length || 1}
              <KeyboardArrowDownIcon />
            </IconButton>
          )}
        </Typography>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          sx={{ passing: 2 }}
        >
          <Box>
            {users?.map((target, index) => (
              <Typography
                onClick={() =>
                  navigate(`/dashboard/user/profile/${target._id}`, {
                    state: { state: target },
                  })
                }
                sx={{ whiteSpace: 'nowrap' }}
              >
                {target.standardCode}
              </Typography>
            ))}
          </Box>
        </Popover>
      </TableCell>

      <TableCell>{maxNumberOfUsage}</TableCell>

      <TableCell>{postType}</TableCell>
      <TableCell>{isPremium ? 'Premium' : 'Regular'}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{new Date(expireAt).toLocaleString()}</TableCell>
      <TableCell>
        <Button onClick={() => sendNotification(code, users)}>Send Notification</Button>
      </TableCell>
    </TableRow>
  );
}
