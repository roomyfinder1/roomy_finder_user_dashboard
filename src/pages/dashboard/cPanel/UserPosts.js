import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

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
  TableCell,
  TableRow,
  Button,
} from '@mui/material';
import { useSettingsContext } from '../../../components/settings';
import { useDispatch, useSelector } from '../../../redux/store';
import { getUserMembershipPosts, getUserPosts } from '../../../redux/slices/userCPanel';
import { LoadingSection } from '../../../components/loading';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  emptyRows,
  useTable,
} from '../../../components/table';
import Scrollbar from '../../../components/scrollbar';
import { LoadingSkeleton } from '../../../sections/@dashboard/general/app';
import { PATH_DASHBOARD } from '../../../routes/paths';

const defaultValues = {
  activePremiumPost: 0,
  regularPremiumPost: 0,
  easyBook: 0,
  postOnly: 0,
  mixUnit: 0,
  differentPrice: 0,
};

const POST_HISTORY_TABLE_HEAD = [
  { id: 'Post Id', label: 'Post Id', align: 'left' },
  { id: 'Type', label: 'Type', align: 'left' },
  { id: 'Status', label: 'Status', align: 'left' },
  { id: '' },
];

const MEMBERSHIP_POST_TABLE_HEAD = [
  { id: 'Membership Type', label: 'Membership Type', align: 'left' },
  { id: 'Purchase Date', label: 'Purchase Date', align: 'left' },
  { id: 'Exp. Date', label: 'Exp. Date', align: 'left' },
  { id: 'Property id', label: 'Property ID', align: 'left' },
  { id: 'Post Type', label: 'Post Type', align: 'left' },
  { id: '' },
];

export default function UserPosts() {
  const dispatch = useDispatch();

  const { userId } = useParams();
  const { themeStretch } = useSettingsContext();

  const { userMembershipPosts, userPosts, isLoading } = useSelector((store) => store.userCPanel);
  const [postsData, setPostsData] = useState(defaultValues);

  const getPostsData = (posts) => {
    const postsObj = { ...defaultValues };
    const currentDate = new Date();

    posts.forEach((post) => {
      if (
        post.isPremium &&
        new Date(post.endDate) > currentDate &&
        new Date(post.startDate) <= currentDate
      ) {
        postsObj.activePremiumPost += 1;
      } else if (
        !post.isPremium &&
        new Date(post.endDate) > currentDate &&
        new Date(post.startDate) <= currentDate
      ) {
        postsObj.regularPremiumPost += 1;
      }
      if (post?.property?.isBookable) {
        postsObj.easyBook += 1;
      } else if (!post?.property?.isBookable) {
        postsObj.postOnly += 1;
      }
      if (post?.property?.haveDifferentUnitPrices) {
        postsObj.differentPrice += 1;
      }
      if (post?.property?.type === 'Mix') {
        postsObj.mixUnit += 1;
      }
    });

    setPostsData(postsObj);
  };

  useEffect(() => {
    if (userPosts.length > 0) {
      getPostsData([...userPosts, ...userMembershipPosts]);
    }
  }, [userPosts, userMembershipPosts]);

  useEffect(() => {
    dispatch(getUserPosts(userId));
    dispatch(getUserMembershipPosts(userId));
  }, [dispatch, userId]);

  return (
    <Container maxWidth={themeStretch ? false : '90%'}>
      {isLoading ? (
        <LoadingSection count={6} />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <CountCard title="Active Premium posts" value={postsData.activePremiumPost} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CountCard title="Active Regular posts" value={postsData.regularPremiumPost} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CountCard title="Easy Book" value={postsData.easyBook} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CountCard title="Post Only" value={postsData.postOnly} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CountCard title="Mix Unit Price Post" value={postsData.mixUnit} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CountCard title="Different Price Post" value={postsData.differentPrice} />
          </Grid>
          <Grid item xs={12}>
            <PostsTable
              title="Posts History"
              data={userPosts}
              TABLE_HEAD={POST_HISTORY_TABLE_HEAD}
              loading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <PostsTable
              title="Membership Posts"
              data={userMembershipPosts}
              TABLE_HEAD={MEMBERSHIP_POST_TABLE_HEAD}
              loading={isLoading}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

CountCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
};

export function CountCard({ title, value }) {
  return (
    <Card sx={{ padding: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography>{title}</Typography>
        <Typography>{value}</Typography>
      </Stack>
    </Card>
  );
}

PostsTable.propTypes = {
  title: PropTypes.string,
  TABLE_HEAD: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export function PostsTable({ title, TABLE_HEAD, data, loading }) {
  const {
    dense,
    page,
    rowsPerPage,
    //

    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const dataFiltered = data;

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered?.length;

  return (
    <Card>
      <Typography sx={{ px: 2, py: 1 }}>{title}</Typography>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <TableHeadCustom headLabel={TABLE_HEAD} />
            {loading && !data.length ? (
              <LoadingSkeleton rows={6} columns={4} />
            ) : (
              <TableBody>
                {dataFiltered
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) =>
                    title === 'Posts History' ? (
                      <PostTableRow key={row._id} row={row} />
                    ) : (
                      <MembershipPostTableRow key={row._id} row={row} />
                    )
                  )}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, data?.length)}
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
  );
}

PostTableRow.propTypes = {
  row: PropTypes.object,
};

export function PostTableRow({ row }) {
  const navigate = useNavigate();
  const currentDate = new Date();
  return (
    <TableRow>
      <TableCell>{row?.standardCode || 'N/A'}</TableCell>
      <TableCell>{row?.property?.type || 'N/A'}</TableCell>
      <TableCell>
        {new Date(row.startDate) <= currentDate && new Date(row.endDate) >= currentDate
          ? 'Active'
          : 'Finish' || 'N/A'}
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate(PATH_DASHBOARD.c_panel.view_post(row._id), { state: row })}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}

MembershipPostTableRow.propTypes = {
  row: PropTypes.object,
};

export function MembershipPostTableRow({ row }) {
  const navigate = useNavigate();
  const currentDate = new Date();
  return (
    <TableRow>
      <TableCell>{row?.standardCode || 'N/A'}</TableCell>
      <TableCell>{row?.property?.type || 'N/A'}</TableCell>
      <TableCell>{row?.property?.type || 'N/A'}</TableCell>
      <TableCell>{row?.property?.type || 'N/A'}</TableCell>
      <TableCell>
        {new Date(row.startDate) <= currentDate && new Date(row.endDate) >= currentDate
          ? 'Active'
          : 'Finish' || 'N/A'}
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate(PATH_DASHBOARD.c_panel.view_post(row._id), { state: row })}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
