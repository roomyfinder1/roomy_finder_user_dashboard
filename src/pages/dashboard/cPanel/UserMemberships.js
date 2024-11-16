import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { getUserMemberships } from '../../../redux/slices/userCPanel';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Membership Id', label: 'Membership Id', align: 'left', width: 150 },
  { id: 'Membership type', label: 'Membership type', align: 'left', width: 200 },
  { id: 'Purchase Date', label: 'Purchase Date', align: 'left', width: 200 },
  { id: 'Exp. Date', label: 'Exp. Date', align: 'left', width: 200 },
  { id: 'Cost', label: 'Cost', align: 'left', width: 100 },
  { id: 'Property No.', label: 'Property No.', align: 'left', width: 150 },
  { id: 'No. Posts', label: 'No. Posts', align: 'left', width: 150 },
  { id: 'details', label: '', align: 'left' },
];
// ----------------------------------------------------------------------

export default function UserMemberships() {
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

  const { userMemberships, isLoading } = useSelector((store) => store.userCPanel);

  const { themeStretch } = useSettingsContext();

  const dataFiltered = filterUser({
    inputData: userMemberships,
    comparator: getComparator(order, orderBy),
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered?.length;

  useEffect(() => {
    const getLandlords = async () => {
      await dispatch(getUserMemberships(userId));
    };
    getLandlords();
  }, [dispatch, userId]);

  return (
    <>
      <Helmet>
        <title> User Memberships List | CRM</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : '90%'}>
        <CustomBreadcrumbs
          heading="User Membership Details"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'User' }]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <TableSelectedAction
                  dense={dense}
                  numSelected={selected?.length}
                  rowCount={userMemberships?.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      userMemberships?.map((row) => row.id)
                    )
                  }
                />

                <Scrollbar>
                  <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                    <TableHeadCustom
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={userMemberships?.length}
                      numSelected={selected?.length}
                      onSort={onSort}
                      onSelectAllRows={(checked) =>
                        onSelectAllRows(
                          checked,
                          userMemberships?.map((row) => row.id)
                        )
                      }
                    />
                    {isLoading && !userMemberships.length ? (
                      <>
                        <TableSkeleton />
                        <TableSkeleton />
                      </>
                    ) : (
                      <TableBody>
                        {dataFiltered
                          ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <MembershipTableRow key={row.id} row={row} />
                          ))}

                        <TableEmptyRows
                          height={denseHeight}
                          emptyRows={emptyRows(page, rowsPerPage, userMemberships?.length)}
                        />

                        <TableNoData isNotFound={isNotFound} />
                      </TableBody>
                    )}
                  </Table>
                </Scrollbar>
              </TableContainer>
              <TablePaginationCustom
                count={userMemberships.length}
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

MembershipTableRow.propTypes = {
  row: PropTypes.object,
};

export function MembershipTableRow({ row }) {
  const { standardCode, startDate, endDate, price, currency, type, premiumPost, premiumPostLeft } =
    row;

  const navigate = useNavigate();

  return (
    <TableRow hover>
      <TableCell>{standardCode}</TableCell>
      <TableCell>{type}</TableCell>

      <TableCell>{new Date(startDate).toLocaleString()}</TableCell>
      <TableCell>{new Date(endDate).toLocaleString()}</TableCell>

      <TableCell sx={{ textTransform: 'capitalize' }}>
        {price} {currency}
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{premiumPost}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{premiumPostLeft}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        <Button
          onClick={() => navigate(PATH_DASHBOARD.c_panel.user_memberships_details, { state: row })}
        >
          Details
        </Button>
      </TableCell>
    </TableRow>
  );
}
