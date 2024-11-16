// @mui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import AppWidgetSummary from '../AppWidgetSummary';
import { useSelector } from '../../../../../redux/store';
// components

export default function UserPieCharts() {
  const theme = useTheme();

  const { allTodayUsers, allUsersPercentages, allUsersCount, allUsersMonthWiseData } = useSelector(
    (store) => store.accounts
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Users"
          percent={allUsersPercentages.allUsers || 0}
          total={allUsersCount ? allUsersCount?.allUsers?.length : null}
          today={allTodayUsers?.allUsers ? allTodayUsers?.allUsers.length : null}
          color="primary"
          chart={{
            colors: [theme.palette.primary.main],
            series:
              (allUsersMonthWiseData &&
                allUsersMonthWiseData.allUsers &&
                Object.keys(allUsersMonthWiseData.allUsers).map(
                  (month) => allUsersMonthWiseData.allUsers[month]
                )) ||
              [],
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Landlords"
          percent={allUsersPercentages.landlords || 0}
          total={allUsersCount ? allUsersCount?.landlords?.length : null}
          today={allTodayUsers?.landlords ? allTodayUsers?.landlords.length : null}
          color="secondary"
          chart={{
            colors: [theme.palette.info.main],
            series:
              (allUsersMonthWiseData &&
                allUsersMonthWiseData.landlords &&
                Object.keys(allUsersMonthWiseData.landlords).map(
                  (month) => allUsersMonthWiseData.landlords[month]
                )) ||
              [],
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Roommates"
          percent={allUsersPercentages.roommates || 0}
          total={allUsersCount ? allUsersCount?.roommates?.length : null}
          today={allTodayUsers?.roommates ? allTodayUsers?.roommates.length : null}
          color="warning"
          chart={{
            colors: [theme.palette.info.main],
            series:
              (allUsersMonthWiseData &&
                allUsersMonthWiseData.roommates &&
                Object.keys(allUsersMonthWiseData.roommates).map(
                  (month) => allUsersMonthWiseData.roommates[month]
                )) ||
              [],
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Tenants"
          percent={allUsersPercentages.tenants || 0}
          total={allUsersCount ? allUsersCount?.tenants?.length : null}
          today={allTodayUsers?.tenants ? allTodayUsers?.tenants.length : null}
          color="error"
          chart={{
            colors: [theme.palette.info.main],
            series:
              (allUsersMonthWiseData &&
                allUsersMonthWiseData.tenants &&
                Object.keys(allUsersMonthWiseData.tenants).map(
                  (month) => allUsersMonthWiseData.tenants[month]
                )) ||
              [],
          }}
        />
      </Grid>
    </Grid>
  );
}
