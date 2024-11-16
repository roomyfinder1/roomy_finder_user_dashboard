// @mui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import AppCurrentDownload from '../AppCurrentDownload';
import { useSelector } from '../../../../../redux/store';
import UserDataPieChart from './UsersDataPieChart';
// components

export default function UserPieCharts() {
  const theme = useTheme();

  const { allTodayUsers, allUsersCount } = useSelector((store) => store.accounts);

  const { allUsers, landlords, roommates, tenants, maintainers } = allUsersCount;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <UserDataPieChart
          title="Landlords"
          chart={{
            colors: [theme.palette.info.main, theme.palette.info.dark, theme.palette.primary.main],

            series: [
              {
                label: 'Total landlords',
                value: landlords?.length ? landlords?.length : 0,
              },
              {
                label: 'Today landlords',
                value: allTodayUsers?.landlords?.length ? allTodayUsers?.landlords?.length : 0,
              },
              {
                label: 'Other users',
                value:
                  allUsers?.length && landlords?.length
                    ? allUsers.length - landlords.length - allTodayUsers.landlords.length
                    : 0,
              },
            ],
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <UserDataPieChart
          title="Tenants"
          chart={{
            colors: [
              theme.palette.warning.main,
              theme.palette.warning.dark,
              theme.palette.primary.main,
            ],
            series: [
              { label: 'Total Tenants', value: tenants?.length ? tenants?.length : 0 },
              {
                label: 'Today',
                value: allTodayUsers?.tenants?.length ? allTodayUsers?.tenants?.length : 0,
              },
              {
                label: 'Other users',
                value:
                  allUsers && tenants && allUsers.length && tenants.length
                    ? allUsers.length - tenants.length - allTodayUsers.tenants.length
                    : 0,
              },
            ],
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <UserDataPieChart
          title="Roommates"
          chart={{
            colors: [
              theme.palette.secondary.main,
              theme.palette.secondary.dark,
              theme.palette.primary.main,
            ],

            series: [
              {
                label: 'Total roommates',
                value: roommates?.length ? roommates?.length : 0,
              },
              {
                label: 'Today',
                value: allTodayUsers?.roommates?.length ? allTodayUsers?.roommates?.length : 0,
              },
              {
                label: 'Other users',
                value:
                  allUsers && roommates && allUsers.length && roommates.length
                    ? allUsers.length - roommates.length - allTodayUsers.roommates.length
                    : 0,
              },
            ],
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <UserDataPieChart
          title="Maintainers"
          chart={{
            colors: [
              theme.palette.error.darker,
              theme.palette.error.main,
              theme.palette.primary.main,
            ],

            series: [
              {
                label: 'Total Maintainers',
                value: maintainers?.length ? maintainers?.length : 0,
              },
              {
                label: 'Today',
                value: allTodayUsers?.maintainers?.length ? allTodayUsers?.maintainers?.length : 0,
              },
              {
                label: 'Other users',
                value:
                  allUsers && maintainers && allUsers.length && maintainers.length
                    ? allUsers.length - maintainers.length - allTodayUsers.maintainers.length
                    : 0,
              },
            ],
          }}
        />
      </Grid>
    </Grid>
  );
}
