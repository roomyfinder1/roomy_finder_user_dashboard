import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import {
  Card,
  Grid,
  Table,
  Tooltip,
  TableBody,
  TableRow,
  TableCell,
  Container,
  IconButton,
  TableContainer,
} from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import {
  useTable,
  getComparator,
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
import { getUserTenantChat } from '../../../redux/slices/userCPanel';
import { LoadingSkeleton } from '../../../sections/@dashboard/general/app';
import { fDate } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Membership', label: 'Membership', align: 'left' },
  { id: 'Purchase Date', label: 'Purchase Date', align: 'left' },
  { id: 'Exp. Date', label: 'Exp. Date', align: 'left' },
  { id: 'Cost', label: 'Cost', align: 'left' },
  { id: 'Membership Type', label: 'Membership Type', align: 'left' },
  { id: 'Status', label: 'Status', align: 'left' },
  {
    id: 'Tenant Interaction Count.',
    label: 'Tenant Interaction Count.',
    align: 'left',
  },
];
// ----------------------------------------------------------------------

export default function UserTenantChat() {
  const dispatch = useDispatch();

  const { userId } = useParams();
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

  const { userTenantChat, isLoading } = useSelector((store) => store.userCPanel);

  const { themeStretch } = useSettingsContext();

  const dataFiltered = userTenantChat
    .slice()
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered?.length;

  useEffect(() => {
    const getLandlords = async () => {
      await dispatch(getUserTenantChat(userId));
    };
    getLandlords();
  }, [dispatch, userId]);

  return (
    <>
      <Helmet>
        <title> User Tenant Chat | CRM</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : '90%'}>
        <CustomBreadcrumbs
          heading="User Tenant Chat Details"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'User' }]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <TableSelectedAction
                  dense={dense}
                  numSelected={selected?.length}
                  rowCount={userTenantChat?.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      userTenantChat?.map((row) => row.id)
                    )
                  }
                  action={
                    <Tooltip title="Delete">
                      <IconButton color="primary">
                        <Iconify icon="eva:trash-2-outline" />
                      </IconButton>
                    </Tooltip>
                  }
                />

                <Scrollbar>
                  <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                    <TableHeadCustom
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={userTenantChat?.length}
                      numSelected={selected?.length}
                      onSort={onSort}
                      onSelectAllRows={(checked) =>
                        onSelectAllRows(
                          checked,
                          userTenantChat?.map((row) => row.id)
                        )
                      }
                    />
                    {isLoading && !userTenantChat.length ? (
                      <LoadingSkeleton rows={7} columns={4} />
                    ) : (
                      <TableBody>
                        {dataFiltered
                          ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <TenantChatTableRow key={row.standardCode} row={row} />
                          ))}

                        <TableEmptyRows
                          height={denseHeight}
                          emptyRows={emptyRows(page, rowsPerPage, userTenantChat?.length)}
                        />

                        <TableNoData isNotFound={isNotFound} />
                      </TableBody>
                    )}
                  </Table>
                </Scrollbar>
              </TableContainer>
              <TablePaginationCustom
                count={userTenantChat.length}
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
      </Container>
    </>
  );
}

TenantChatTableRow.propTypes = {
  row: PropTypes.object,
};

export function TenantChatTableRow({ row }) {
  const { type, status, startDate, endDate, price, currency, interactionCount } = row;

  // const navigate = useNavigate();

  return (
    <TableRow hover>
      <TableCell>{type !== 'TENANT CHAT' ? 'Yes' : 'No'}</TableCell>
      <TableCell>{fDate(startDate)}</TableCell>
      <TableCell>{fDate(endDate)}</TableCell>
      <TableCell>
        {price} {currency}
      </TableCell>
      <TableCell sx={{ textTransform: 'capitalize' }}>{type}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell align="center">{interactionCount}</TableCell>
    </TableRow>
  );
}
