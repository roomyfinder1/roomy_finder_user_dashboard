import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import {
  Card,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Container,
  TableContainer,
} from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
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
  TableSkeleton,
} from '../../../components/table';
// redux
import { useSelector, useDispatch } from '../../../redux/store';
import { getUserPurchases } from '../../../redux/slices/userCPanel';
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Transaction Id', label: 'Transaction Id', align: 'left', width: 150 },
  { id: 'Purchase Date', label: 'Purchase Date', align: 'left', width: 200 },
  { id: 'Service Type', label: 'Service Type', align: 'left, width: 150 ' },
  { id: 'Cost', label: 'Cost', align: 'left', width: 150 },
  { id: 'VAT', label: 'VAT', align: 'left', width: 150 },
  { id: 'Payment method', label: 'Payment method', align: 'left', width: 150 },
];
// ----------------------------------------------------------------------

export default function UserPurchases() {
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

  const { userPurchases, isLoading } = useSelector((store) => store.userCPanel);

  const { themeStretch } = useSettingsContext();

  const dataFiltered = filterUser({
    inputData: userPurchases,
    comparator: getComparator(order, orderBy),
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered?.length;

  useEffect(() => {
    const getLandlords = async () => {
      await dispatch(getUserPurchases(userId));
    };
    getLandlords();
  }, [dispatch, userId]);

  return (
    <>
      <Helmet>
        <title> User Purchases List | CRM</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : '90%'}>
        <CustomBreadcrumbs
          heading="User Purchases Details"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'User' }]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <TableSelectedAction
                  dense={dense}
                  numSelected={selected?.length}
                  rowCount={userPurchases?.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      userPurchases?.map((row) => row.id)
                    )
                  }
                />

                <Scrollbar>
                  <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                    <TableHeadCustom
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={userPurchases?.length}
                      numSelected={selected?.length}
                      onSort={onSort}
                      onSelectAllRows={(checked) =>
                        onSelectAllRows(
                          checked,
                          userPurchases?.map((row) => row.id)
                        )
                      }
                    />
                    {isLoading && !userPurchases.length ? (
                      <>
                        <TableSkeleton />
                        <TableSkeleton />
                      </>
                    ) : (
                      <TableBody>
                        {dataFiltered
                          ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <MaintenanceTableRow key={row.id} row={row} />
                          ))}

                        <TableEmptyRows
                          height={denseHeight}
                          emptyRows={emptyRows(page, rowsPerPage, userPurchases?.length)}
                        />

                        <TableNoData isNotFound={isNotFound} />
                      </TableBody>
                    )}
                  </Table>
                </Scrollbar>
              </TableContainer>
              <TablePaginationCustom
                count={userPurchases.length}
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

MaintenanceTableRow.propTypes = {
  row: PropTypes.object,
};

export function MaintenanceTableRow({ row }) {
  const { standardCode, createdAt, object, amount, currency, vat, service } = row;

  // const navigate = useNavigate();

  return (
    <TableRow hover>
      <TableCell>{standardCode}</TableCell>

      <TableCell>{fDate(createdAt)}</TableCell>
      <TableCell>{object}</TableCell>

      <TableCell sx={{ textTransform: 'capitalize' }}>
        {fCurrency(amount)} {currency}
      </TableCell>
      <TableCell sx={{ textTransform: 'capitalize' }}>
        {fCurrency(vat) || 0} {currency}
      </TableCell>
      <TableCell>{service}</TableCell>
    </TableRow>
  );
}

export function filterUser({ inputData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = inputData?.map((el, index) => [el, index]);

  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis?.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) =>
        user?.firstName?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1 ||
        user?.standardCode?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1 ||
        parseInt(user?.standardCode?.split('#')[1].substring(2), 10)
          .toString()
          .toLowerCase()
          .indexOf(filterName.toLowerCase()) !== -1 ||
        user?.lastName?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1 ||
        user?.email?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1
    );
  }

  if (filterStatus && filterStatus !== 'all') {
    inputData = inputData.filter((user) => user?.status === filterStatus);
  }

  if (filterRole && filterRole !== 'all') {
    inputData = inputData.filter((user) => user?.role === filterRole);
  }

  return inputData;
}
