import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Button,
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
// sections
import { filterUser } from '../../../sections/@dashboard/general/app/filterUser';

// redux
import { useSelector, useDispatch } from '../../../redux/store';
import { getUserMaintenances } from '../../../redux/slices/userCPanel';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Maintenance Id', label: 'Maintenance Id', align: 'left', width: 150 },
  { id: 'Purchase Date', label: 'Purchase Date', align: 'left', width: 200 },
  { id: 'Exp. Date', label: 'Exp. Date', align: 'left, width: 150 ' },
  { id: 'Cost', label: 'Cost', align: 'left', width: 150 },
  { id: 'details', label: '', align: 'left' },
];
// ----------------------------------------------------------------------

export default function UserMaintenance() {
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

  const { userMaintenances, isLoading } = useSelector((store) => store.userCPanel);

  const { themeStretch } = useSettingsContext();

  const dataFiltered = filterUser({
    inputData: userMaintenances,
    comparator: getComparator(order, orderBy),
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered?.length;

  useEffect(() => {
    const getLandlords = async () => {
      await dispatch(getUserMaintenances(userId));
    };
    getLandlords();
  }, [dispatch, userId]);

  return (
    <>
      <Helmet>
        <title> User Maintenance List | CRM</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : '90%'}>
        <CustomBreadcrumbs
          heading="User Maintenance Details"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'User' }]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <TableSelectedAction
                  dense={dense}
                  numSelected={selected?.length}
                  rowCount={userMaintenances?.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      userMaintenances?.map((row) => row.id)
                    )
                  }
                />

                <Scrollbar>
                  <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                    <TableHeadCustom
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={userMaintenances?.length}
                      numSelected={selected?.length}
                      onSort={onSort}
                      onSelectAllRows={(checked) =>
                        onSelectAllRows(
                          checked,
                          userMaintenances?.map((row) => row.id)
                        )
                      }
                    />
                    {isLoading && !userMaintenances.length ? (
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
                          emptyRows={emptyRows(page, rowsPerPage, userMaintenances?.length)}
                        />

                        <TableNoData isNotFound={isNotFound} />
                      </TableBody>
                    )}
                  </Table>
                </Scrollbar>
              </TableContainer>
              <TablePaginationCustom
                count={userMaintenances.length}
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
  const { standardCode, startDate, endDate, price, currency } = row;

  const navigate = useNavigate();

  return (
    <TableRow hover>
      <TableCell>{standardCode}</TableCell>

      <TableCell>{new Date(startDate).toLocaleString()}</TableCell>
      <TableCell>{new Date(endDate).toLocaleString()}</TableCell>

      <TableCell sx={{ textTransform: 'capitalize' }}>
        {price} {currency}
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        <Button
          onClick={() =>
            navigate(PATH_DASHBOARD.c_panel.user_maintenance_details(row._id), { state: row })
          }
        >
          Details
        </Button>
      </TableCell>
    </TableRow>
  );
}
